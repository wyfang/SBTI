import React, { useState, useEffect } from 'react';
import Home from './components/Home';
import Test from './components/Test';
import Result from './components/Result';
import { questions, specialQuestions, Question, TYPE_LIBRARY, dimensionOrder } from './data';
import { computeResult } from './utils';

type Screen = 'home' | 'test' | 'result';

export default function App() {
  const [screen, setScreen] = useState<Screen>('home');
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [shuffledQuestions, setShuffledQuestions] = useState<Question[]>([]);
  const [resultData, setResultData] = useState<any>(null);

  const startTest = () => {
    // Shuffle regular questions
    const shuffledRegular = [...questions].sort(() => Math.random() - 0.5);
    // Insert the first special question at a random position
    const insertIndex = Math.floor(Math.random() * shuffledRegular.length) + 1;
    const newShuffled = [
      ...shuffledRegular.slice(0, insertIndex),
      specialQuestions[0],
      ...shuffledRegular.slice(insertIndex)
    ];
    
    setShuffledQuestions(newShuffled);
    setAnswers({});
    setScreen('test');
  };

  const handleAnswer = (questionId: string, value: number) => {
    setAnswers(prev => {
      const newAnswers = { ...prev, [questionId]: value };
      
      // Handle special logic for drink_gate_q1
      if (questionId === 'drink_gate_q1') {
        if (value !== 3) {
          // Remove answer for drink_gate_q2 if it exists
          delete newAnswers['drink_gate_q2'];
        }
      }
      
      return newAnswers;
    });
  };

  const handleComplete = () => {
    const result = computeResult(answers);
    setResultData(result);
    setScreen('result');
  };

  const goHome = () => {
    setScreen('home');
    setAnswers({});
    setResultData(null);
  };

  // Easter egg: Press P to random result
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key.toLowerCase() === 'p' && screen !== 'result') {
        const typeCodes = Object.keys(TYPE_LIBRARY);
        const randomCode = typeCodes[Math.floor(Math.random() * typeCodes.length)];
        const randomType = TYPE_LIBRARY[randomCode];
        // Generate random levels and scores for radar chart
        const levels: Record<string, string> = {};
        const rawScores: Record<string, number> = {};
        dimensionOrder.forEach(dim => {
          const score = Math.floor(Math.random() * 3) + 1;
          rawScores[dim] = score;
          levels[dim] = score === 1 ? 'L' : score === 2 ? 'M' : 'H';
        });
        setResultData({
          finalType: randomType,
          modeKicker: '测试员专用',
          badge: '🎲 随机人格',
          sub: '这是开发者彩蛋，随机生成的人格仅供参考娱乐',
          special: false,
          levels,
          rawScores
        });
        setScreen('result');
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [screen]);

  // Compute visible questions dynamically based on answers
  const getVisibleQuestions = () => {
    const visible = [...shuffledQuestions];
    const gateIndex = visible.findIndex(q => q.id === 'drink_gate_q1');
    
    if (gateIndex !== -1 && answers['drink_gate_q1'] === 3) {
      // Add drink_gate_q2 right after drink_gate_q1 if not already there
      if (!visible.find(q => q.id === 'drink_gate_q2')) {
        visible.splice(gateIndex + 1, 0, specialQuestions[1]);
      }
    } else {
      // Remove drink_gate_q2 if present
      const q2Index = visible.findIndex(q => q.id === 'drink_gate_q2');
      if (q2Index !== -1) {
        visible.splice(q2Index, 1);
      }
    }
    return visible;
  };

  return (
    <div className="min-h-screen bg-gray-50/50 font-sans text-gray-900 selection:bg-emerald-200">
      {screen === 'home' && <Home onStart={startTest} />}
      
      {screen === 'test' && (
        <Test 
          questions={getVisibleQuestions()} 
          answers={answers} 
          onAnswer={handleAnswer} 
          onComplete={handleComplete} 
        />
      )}
      
      {screen === 'result' && resultData && (
        <Result 
          resultData={resultData} 
          onRestart={goHome} 
        />
      )}
    </div>
  );
}

