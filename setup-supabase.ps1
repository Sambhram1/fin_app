# FinBuddy - Quick Supabase Setup

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  FinBuddy Supabase Setup" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

Write-Host "This script will help you configure your Supabase credentials" -ForegroundColor Yellow
Write-Host ""

# Check if .env.local exists
if (Test-Path ".env.local") {
    Write-Host "✓ .env.local file found" -ForegroundColor Green
    $content = Get-Content ".env.local" -Raw
    
    if ($content -match "your_supabase") {
        Write-Host "! .env.local needs to be configured" -ForegroundColor Yellow
    } else {
        Write-Host "✓ .env.local appears to be configured" -ForegroundColor Green
        Write-Host ""
        Write-Host "Would you like to reconfigure? (y/n): " -ForegroundColor Cyan -NoNewline
        $reconfigure = Read-Host
        if ($reconfigure -ne "y") {
            Write-Host "Skipping configuration..." -ForegroundColor Yellow
            exit
        }
    }
} else {
    Write-Host "✗ .env.local file not found" -ForegroundColor Red
    exit 1
}

Write-Host ""
Write-Host "Please enter your Supabase credentials:" -ForegroundColor Cyan
Write-Host ""

Write-Host "Supabase Project URL (e.g., https://xxxxx.supabase.co): " -ForegroundColor Green -NoNewline
$supabaseUrl = Read-Host

Write-Host "Supabase Anon Key: " -ForegroundColor Green -NoNewline
$supabaseKey = Read-Host

# Validate inputs
if ([string]::IsNullOrWhiteSpace($supabaseUrl) -or [string]::IsNullOrWhiteSpace($supabaseKey)) {
    Write-Host ""
    Write-Host "✗ Both URL and Key are required!" -ForegroundColor Red
    exit 1
}

# Update .env.local
$envContent = @"
# Supabase Configuration
# Get these from your Supabase project settings -> API
NEXT_PUBLIC_SUPABASE_URL=$supabaseUrl
NEXT_PUBLIC_SUPABASE_ANON_KEY=$supabaseKey
"@

Set-Content -Path ".env.local" -Value $envContent

Write-Host ""
Write-Host "========================================" -ForegroundColor Green
Write-Host "✓ Configuration saved successfully!" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Green
Write-Host ""
Write-Host "Next steps:" -ForegroundColor Cyan
Write-Host "1. Make sure you've run the SQL schema in Supabase SQL Editor" -ForegroundColor White
Write-Host "2. Disable email confirmation in Supabase Auth settings (for testing)" -ForegroundColor White
Write-Host "3. Restart your dev server: npm run dev" -ForegroundColor White
Write-Host ""
Write-Host "See SUPABASE_SETUP.md for detailed instructions" -ForegroundColor Yellow
Write-Host ""
