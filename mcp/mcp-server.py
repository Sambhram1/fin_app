#!/usr/bin/env python3
"""
Solana MCP Server with A2A (Agent-to-Agent) Support
===================================================
- Base: FastMCP 2.0
- Added: A2A JSON-RPC WebSocket endpoint for Groq or LangGraph agents
- Secure access via MCP + A2A for AI agents to request blockchain data
"""

import asyncio
from typing import Dict, Any
from fastmcp import FastMCP
from solana.rpc.async_api import AsyncClient
from solders.pubkey import Pubkey
import logging
import multiprocessing
import json
import websockets

# =============================
# Configuration
# =============================

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger("SolanaA2A")

SOLANA_RPC_URL = "https://api.mainnet-beta.solana.com"
A2A_PORT = 8765  # WebSocket port for A2A communication

mcp = FastMCP("Solana Blockchain Tools")

# =============================
# Core MCP Tools
# =============================

@mcp.tool()
async def get_balance(address: str) -> Dict[str, Any]:
    """Fetches SOL balance for a given address."""
    try:
        # Validate address early and return a friendly error if invalid
        try:
            pubkey = Pubkey.from_string(address)
        except Exception as e:
            return {"success": False, "error": f"Invalid Solana address: {str(e)}"}

        async with AsyncClient(SOLANA_RPC_URL) as client:
            response = await client.get_balance(pubkey)
            balance_lamports = response.value
            sol_balance = balance_lamports / 1_000_000_000
            return {
                "success": True,
                "address": address,
                "lamports": balance_lamports,
                "sol": sol_balance,
                "formatted": f"{sol_balance:.4f} SOL"
            }
    except Exception as e:
        return {"success": False, "error": str(e)}


@mcp.tool()
async def get_latest_transactions(address: str, limit: int = 5) -> Dict[str, Any]:
    """Fetches recent transactions for an address."""
    try:
        # Validate address before making RPC calls
        try:
            pubkey = Pubkey.from_string(address)
        except Exception as e:
            return {"success": False, "error": f"Invalid Solana address: {str(e)}"}

        async with AsyncClient(SOLANA_RPC_URL) as client:
            response = await client.get_signatures_for_address(pubkey, limit=limit)
            txs = [
                {
                    "signature": str(tx.signature),
                    "slot": tx.slot,
                    "block_time": tx.block_time,
                    "status": tx.confirmation_status.name if tx.confirmation_status else None,
                }
                for tx in response.value or []
            ]
            return {"success": True, "address": address, "transactions": txs}
    except Exception as e:
        return {"success": False, "error": str(e)}

# =============================
# A2A WebSocket Layer
# =============================


async def _call_tool(tool_obj, *args, **kwargs):
    """Call a tool which may be wrapped by the MCP decorator.

    Some MCP frameworks wrap the original coroutine in a FunctionTool object.
    This helper attempts to unwrap common wrapper attributes to find the
    original coroutine and invoke it. Falls back to calling any callable.
    """
    fn = tool_obj

    # If the object has a wrapped coroutine, prefer that
    if not asyncio.iscoroutinefunction(fn):
        if hasattr(fn, '__wrapped__') and asyncio.iscoroutinefunction(fn.__wrapped__):
            fn = fn.__wrapped__
        elif hasattr(fn, 'fn') and asyncio.iscoroutinefunction(fn.fn):
            fn = fn.fn
        elif hasattr(fn, 'call') and asyncio.iscoroutinefunction(fn.call):
            fn = fn.call
        elif hasattr(fn, '__call__') and asyncio.iscoroutinefunction(fn.__call__):
            fn = fn.__call__

    # If it's an async function, await it
    if asyncio.iscoroutinefunction(fn):
        return await fn(*args, **kwargs)

    # If it's a regular callable, call it synchronously
    if callable(fn):
        return fn(*args, **kwargs)

    return {"error": "Tool not callable"}

async def handle_a2a(websocket):
    """
    A2A protocol handler.
    Groq / LangGraph agents can send JSON-RPC-like requests:
    { "action": "get_balance", "address": "..." }
    """
    try:
        async for message in websocket:
            logger.info(f"A2A received message: {message}")
            try:
                data = json.loads(message)
                action = data.get("action")

                if action == "get_balance":
                    result = await _call_tool(get_balance, data.get("address"))
                elif action == "get_latest_transactions":
                    result = await _call_tool(get_latest_transactions, data.get("address"), data.get("limit", 5))
                else:
                    result = {"error": f"Unknown action: {action}"}

                logger.info(f"A2A sending response: {result}")
                await websocket.send(json.dumps(result))
            except Exception as e:
                logger.exception("Error handling A2A message")
                await websocket.send(json.dumps({"error": str(e)}))
    except websockets.ConnectionClosed:
        logger.info("A2A connection closed.")


async def start_a2a_server():
    """Starts A2A WebSocket server for agent-to-agent communication."""
    async with websockets.serve(handle_a2a, "0.0.0.0", A2A_PORT):
        logger.info(f"A2A WebSocket server running on ws://localhost:{A2A_PORT}")
        await asyncio.Future()  # Keep alive


def _run_a2a_process():
    """Helper used to run the A2A server in a separate process.

    This isolates the websockets server from the FastMCP runtime and avoids
    event-loop lifecycle interactions that can cancel tasks.
    """
    try:
        # Use a fresh event loop in the child process
        asyncio.run(start_a2a_server())
    except Exception as e:
        logger.exception("A2A process crashed")

# =============================
# Run both MCP + A2A servers
# =============================

def main():
    # Start A2A server in a separate process so it won't be cancelled
    # by FastMCP's event loop lifecycle.
    proc = multiprocessing.Process(target=_run_a2a_process, daemon=True)
    proc.start()
    logger.info(f"Started A2A process (pid={proc.pid})")

    # Run the FastMCP server (stdio transport)
    mcp.run()

if __name__ == "__main__":
    main()
