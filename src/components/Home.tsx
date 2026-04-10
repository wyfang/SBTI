import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';

interface HomeProps {
  onStart: () => void;
}

export default function Home({ onStart }: HomeProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="min-h-[80vh] flex flex-col items-center justify-center text-center px-4"
    >
      <div className="max-w-3xl mx-auto space-y-8">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-50 border border-emerald-100 text-emerald-800 text-sm font-medium">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          MBTI已经过时，SBTI来了
        </div>
        
        <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-gray-900 leading-tight">
          发现你内心深处的
          <br className="hidden md:block" />
          <span className="text-emerald-600">真实人格</span>
        </h1>
        
        <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
          通过一系列精心设计（且可能有些冒犯）的问题，探索你的自我、情感、态度、行动和社交模型。准备好面对真实的自己了吗？
        </p>

        <div className="pt-8">
          <button
            onClick={onStart}
            className="group relative inline-flex items-center justify-center gap-3 px-8 py-4 text-lg font-bold text-white bg-emerald-600 rounded-full overflow-hidden transition-transform hover:scale-105 hover:shadow-xl hover:shadow-emerald-600/20 active:scale-95"
          >
            <span className="relative z-10">开始测试</span>
            <ArrowRight className="relative z-10 w-5 h-5 transition-transform group-hover:translate-x-1" />
            <div className="absolute inset-0 bg-gradient-to-r from-emerald-600 to-emerald-500 opacity-0 group-hover:opacity-100 transition-opacity" />
          </button>
        </div>

        <div className="pt-16 flex flex-col items-center gap-2 text-sm text-gray-400">
          <p>原作者：B站@蛆肉儿串儿</p>
          <p>本测试仅供娱乐，请勿当真</p>
        </div>
      </div>
    </motion.div>
  );
}
