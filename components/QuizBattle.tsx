'use client';

import { useState } from 'react';
import { Brain, CheckCircle2, XCircle, Trophy } from 'lucide-react';

interface QuizBattleProps {
  addPoints: (points: number) => void;
}

const triviaQuestions = [
  {
    question: "What is the 50-30-20 budgeting rule?",
    options: [
      "50% needs, 30% wants, 20% savings",
      "50% savings, 30% needs, 20% wants",
      "50% wants, 30% savings, 20% needs",
      "Equal distribution across all categories"
    ],
    correct: 0
  },
  {
    question: "What is compound interest?",
    options: [
      "Interest on your principal only",
      "Interest on principal + accumulated interest",
      "A type of bank account",
      "Interest paid monthly"
    ],
    correct: 1
  },
  {
    question: "What does APR stand for?",
    options: [
      "Annual Payment Rate",
      "Average Price Ratio",
      "Annual Percentage Rate",
      "Automatic Payment Request"
    ],
    correct: 2
  },
  {
    question: "What is an emergency fund for?",
    options: [
      "Buying luxury items",
      "Unexpected expenses & emergencies",
      "Investing in stocks",
      "Vacation savings"
    ],
    correct: 1
  }
];

export default function QuizBattle({ addPoints }: QuizBattleProps) {
  const [isActive, setIsActive] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [lastScore, setLastScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);

  const handleStart = () => {
    setIsActive(true);
    setCurrentQuestion(0);
    setScore(0);
    setSelectedAnswer(null);
    setShowResult(false);
  };

  const handleAnswer = (answerIndex: number) => {
    setSelectedAnswer(answerIndex);
    const isCorrect = answerIndex === triviaQuestions[currentQuestion].correct;
    
    setTimeout(() => {
      if (isCorrect) {
        setScore(prev => prev + 100);
        addPoints(100);
      }

      if (currentQuestion < triviaQuestions.length - 1) {
        setCurrentQuestion(prev => prev + 1);
        setSelectedAnswer(null);
      } else {
        const finalScore = isCorrect ? score + 100 : score;
        setLastScore(finalScore);
        setShowResult(true);
      }
    }, 1500);
  };

  const handleRestart = () => {
    setIsActive(false);
    setCurrentQuestion(0);
    setScore(0);
    setSelectedAnswer(null);
    setShowResult(false);
  };

  if (!isActive) {
    return (
      <div className="max-w-2xl mx-auto">
        <div className="pixel-border border-blue-500 rounded-2xl p-8 md:p-12 bg-gray-800/50 glow-blue text-center">
          <div className="inline-block pixel-border border-blue-400 rounded-3xl p-8 bg-blue-500/10 mb-6">
            <Brain className="w-16 h-16 md:w-20 md:h-20 text-blue-500 mx-auto" />
          </div>
          <h2 className="text-xl md:text-2xl text-white mb-3" style={{ fontFamily: 'var(--font-pixel)' }}>
            🧠 Finance Trivia Battle
          </h2>
          <p className="text-xs md:text-sm text-gray-400 mb-6" style={{ fontFamily: 'var(--font-pixel)' }}>
            Mine knowledge, earn XP!
          </p>
          
          <div className="pixel-border border-gray-700 rounded-xl p-4 md:p-6 bg-gray-900 mb-6 text-left">
            <p className="text-xs text-white mb-3" style={{ fontFamily: 'var(--font-pixel)' }}>
              ⚡ 4 Questions
            </p>
            <p className="text-xs text-emerald-500 mb-3" style={{ fontFamily: 'var(--font-pixel)' }}>
              💎 100 XP per correct answer
            </p>
            <p className="text-xs text-yellow-500" style={{ fontFamily: 'var(--font-pixel)' }}>
              🏆 Max 400 XP reward
            </p>
          </div>

          {lastScore > 0 && (
            <div className="pixel-border border-yellow-500 rounded-xl p-4 bg-yellow-500/10 mb-6">
              <p className="text-xs text-yellow-500" style={{ fontFamily: 'var(--font-pixel)' }}>
                Last Score: {lastScore} XP
              </p>
            </div>
          )}

          <button
            onClick={handleStart}
            className="w-full md:w-auto px-8 py-4 bg-blue-500 hover:bg-blue-600 text-white rounded-xl pixel-border border-blue-400 glow-blue transition-all text-sm"
            style={{ fontFamily: 'var(--font-pixel)' }}
          >
            ⛏️ Start Mining
          </button>
        </div>
      </div>
    );
  }

  if (showResult) {
    return (
      <div className="max-w-2xl mx-auto">
        <div className="pixel-border border-emerald-500 rounded-2xl p-8 md:p-12 bg-gray-800/50 glow-emerald text-center">
          <div className="inline-block pixel-border border-emerald-400 rounded-3xl p-8 bg-emerald-500/10 mb-6">
            <Trophy className="w-16 h-16 md:w-20 md:h-20 text-emerald-500 mx-auto" />
          </div>
          <h2 className="text-xl md:text-2xl text-white mb-3" style={{ fontFamily: 'var(--font-pixel)' }}>
            Quest Complete!
          </h2>
          <p className="text-3xl md:text-4xl text-emerald-500 mb-6" style={{ fontFamily: 'var(--font-pixel)' }}>
            +{lastScore} XP
          </p>
          <p className="text-xs text-gray-400 mb-8" style={{ fontFamily: 'var(--font-pixel)' }}>
            You got {lastScore / 100} out of 4 questions correct!
          </p>
          <button
            onClick={handleRestart}
            className="w-full md:w-auto px-8 py-4 bg-blue-500 hover:bg-blue-600 text-white rounded-xl pixel-border border-blue-400 glow-blue transition-all text-sm"
            style={{ fontFamily: 'var(--font-pixel)' }}
          >
            🔄 Mine Again
          </button>
        </div>
      </div>
    );
  }

  const question = triviaQuestions[currentQuestion];
  
  return (
    <div className="max-w-3xl mx-auto">
      <div className="pixel-border border-blue-500 rounded-2xl p-6 md:p-8 bg-gray-800/50 glow-blue">
        {/* Progress */}
        <div className="flex items-center justify-between mb-6">
          <p className="text-xs text-gray-400" style={{ fontFamily: 'var(--font-pixel)' }}>
            Question {currentQuestion + 1}/4
          </p>
          <p className="text-xs text-emerald-500" style={{ fontFamily: 'var(--font-pixel)' }}>
            Score: {score} XP
          </p>
        </div>

        {/* Question */}
        <div className="pixel-border border-gray-700 rounded-xl p-4 md:p-6 bg-gray-900 mb-6">
          <p className="text-sm md:text-base text-white" style={{ fontFamily: 'var(--font-pixel)' }}>
            {question.question}
          </p>
        </div>

        {/* Options */}
        <div className="grid grid-cols-1 gap-3">
          {question.options.map((option, index) => {
            const isSelected = selectedAnswer === index;
            const isCorrect = index === question.correct;
            const showFeedback = selectedAnswer !== null;

            let buttonClass = 'pixel-border border-gray-600 bg-gray-700 hover:bg-gray-600';
            
            if (showFeedback) {
              if (isSelected && isCorrect) {
                buttonClass = 'pixel-border border-emerald-500 bg-emerald-500/20 glow-emerald';
              } else if (isSelected && !isCorrect) {
                buttonClass = 'pixel-border border-red-500 bg-red-500/20 glow-orange';
              } else if (isCorrect) {
                buttonClass = 'pixel-border border-emerald-500 bg-emerald-500/10';
              }
            }

            return (
              <button
                key={index}
                onClick={() => selectedAnswer === null && handleAnswer(index)}
                disabled={selectedAnswer !== null}
                className={`p-4 rounded-xl transition-all text-left flex items-center gap-3 ${buttonClass}`}
              >
                <div className="w-8 h-8 pixel-border border-gray-500 rounded-lg bg-gray-800 flex items-center justify-center flex-shrink-0">
                  <span className="text-xs text-white" style={{ fontFamily: 'var(--font-pixel)' }}>
                    {['A', 'B', 'C', 'D'][index]}
                  </span>
                </div>
                <span className="text-xs md:text-sm text-white flex-1" style={{ fontFamily: 'var(--font-pixel)' }}>
                  {option}
                </span>
                {showFeedback && isSelected && (
                  isCorrect ? (
                    <CheckCircle2 className="w-6 h-6 text-emerald-500 flex-shrink-0" />
                  ) : (
                    <XCircle className="w-6 h-6 text-red-500 flex-shrink-0" />
                  )
                )}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
