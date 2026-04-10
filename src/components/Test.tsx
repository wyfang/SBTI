import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowLeft, ArrowRight, CheckCircle2 } from 'lucide-react';
import { Question } from '../data';

interface TestProps {
  questions: Question[];
  answers: Record<string, number>;
  onAnswer: (questionId: string, value: number) => void;
  onComplete: () => void;
}

export default function Test({ questions, answers, onAnswer, onComplete }: TestProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const currentQuestion = questions[currentIndex];
  const totalQuestions = questions.length;
  const progress = ((currentIndex) / totalQuestions) * 100;
  const isLastQuestion = currentIndex === totalQuestions - 1;
  const hasAnsweredCurrent = answers[currentQuestion.id] !== undefined;

  // Auto-advance logic
  const handleOptionClick = (value: number) => {
    onAnswer(currentQuestion.id, value);
    
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    
    // Auto advance after a short delay if not the last question
    if (!isLastQuestion) {
      timeoutRef.current = setTimeout(() => {
        setDirection(1);
        setCurrentIndex(prev => {
          if (prev < totalQuestions - 1) return prev + 1;
          return prev;
        });
      }, 400);
    }
  };

  const handleNext = () => {
    if (currentIndex < totalQuestions - 1 && answers[currentQuestion.id] !== undefined) {
      setDirection(1);
      setCurrentIndex(prev => prev + 1);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setDirection(-1);
      setCurrentIndex(prev => prev - 1);
    }
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Enter' && hasAnsweredCurrent) {
        if (isLastQuestion) {
          onComplete();
        } else {
          handleNext();
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentIndex, hasAnsweredCurrent, isLastQuestion]);

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 50 : -50,
      opacity: 0
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 50 : -50,
      opacity: 0
    })
  };

  return (
    <div className="min-h-screen flex flex-col pb-24">
      <div className="flex-1 flex flex-col max-w-4xl mx-auto w-full px-4 py-8">
        {/* Progress Bar */}
        <div className="w-full mb-8 md:mb-12">
          <div className="flex justify-between text-sm font-medium text-gray-500 mb-3">
            <span>测试进度</span>
            <span>{Math.round(progress)}%</span>
          </div>
          <div className="h-2.5 w-full bg-gray-200 rounded-full overflow-hidden">
            <motion.div 
              className="h-full bg-emerald-500 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            />
          </div>
        </div>

        {/* Question Container */}
        <div className="flex-1 relative flex flex-col justify-center">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={currentQuestion.id}
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="w-full max-w-2xl mx-auto"
            >
              <div className="text-center mb-8 md:mb-10">
                <span className="inline-block px-3 py-1 mb-4 md:mb-6 text-xs font-semibold tracking-wider text-emerald-600 uppercase bg-emerald-50 rounded-full">
                  Question {currentIndex + 1} of {totalQuestions}
                </span>
                <h2 className="text-lg md:text-xl font-medium text-gray-900 leading-relaxed">
                  {currentQuestion.text}
                </h2>
              </div>

              <div className="space-y-3 md:space-y-4">
                {currentQuestion.options.map((option, idx) => {
                  const isSelected = answers[currentQuestion.id] === option.value;
                  const letters = ['A', 'B', 'C', 'D'];
                  
                  return (
                    <button
                      key={option.value}
                      onClick={() => handleOptionClick(option.value)}
                      className={`w-full group relative flex items-center p-4 md:p-5 rounded-2xl border-2 transition-all duration-200 text-left
                        ${isSelected 
                          ? 'border-emerald-500 bg-emerald-50/50 shadow-md shadow-emerald-100' 
                          : 'border-gray-200 bg-white hover:border-emerald-200 hover:bg-gray-50'
                        }`}
                    >
                      <div className={`flex items-center justify-center w-8 h-8 rounded-full border-2 mr-4 flex-shrink-0 transition-colors
                        ${isSelected 
                          ? 'border-emerald-500 bg-emerald-500 text-white' 
                          : 'border-gray-300 text-gray-500 group-hover:border-emerald-300'
                        }`}
                      >
                        {isSelected ? <CheckCircle2 className="w-5 h-5" /> : <span className="text-sm font-bold">{letters[idx]}</span>}
                      </div>
                      <span className={`text-base md:text-lg transition-colors ${isSelected ? 'text-emerald-900 font-medium' : 'text-gray-700'}`}>
                        {option.label}
                      </span>
                    </button>
                  );
                })}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Navigation Controls - Fixed at bottom */}
      <div className="fixed bottom-0 left-0 right-0 bg-white/90 backdrop-blur-md border-t border-gray-200 p-4 z-50 shadow-[0_-4px_20px_rgba(0,0,0,0.05)]">
        <div className="max-w-2xl mx-auto flex items-center justify-between w-full">
          <button
            onClick={handlePrev}
            disabled={currentIndex === 0}
            className={`flex items-center gap-2 px-6 py-3 rounded-full font-medium transition-colors
              ${currentIndex === 0 
                ? 'text-gray-300 cursor-not-allowed' 
                : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
              }`}
          >
            <ArrowLeft className="w-5 h-5" />
            上一题
          </button>

          {isLastQuestion ? (
            <button
              onClick={onComplete}
              disabled={!hasAnsweredCurrent}
              className={`flex items-center gap-2 px-8 py-3 rounded-full font-bold transition-all
                ${hasAnsweredCurrent
                  ? 'bg-emerald-600 text-white hover:bg-emerald-700 hover:shadow-lg hover:shadow-emerald-200 hover:-translate-y-0.5'
                  : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                }`}
            >
              查看结果
              <ArrowRight className="w-5 h-5" />
            </button>
          ) : (
            <button
              onClick={handleNext}
              disabled={!hasAnsweredCurrent}
              className={`flex items-center gap-2 px-8 py-3 rounded-full font-bold transition-all
                ${hasAnsweredCurrent
                  ? 'bg-gray-900 text-white hover:bg-gray-800 hover:shadow-lg hover:-translate-y-0.5'
                  : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                }`}
            >
              下一题
              <ArrowRight className="w-5 h-5" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
