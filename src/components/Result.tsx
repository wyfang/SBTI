import React from 'react';
import { motion } from 'motion/react';
import { RotateCcw } from 'lucide-react';
import { TYPE_IMAGES, dimensionOrder, dimensionMeta, DIM_EXPLANATIONS } from '../data';

interface ResultProps {
  resultData: any;
  onRestart: () => void;
}

export default function Result({ resultData, onRestart }: ResultProps) {
  const { finalType, modeKicker, badge, sub, special, levels, rawScores } = resultData;
  const imageSrc = TYPE_IMAGES[finalType.code];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="min-h-screen max-w-5xl mx-auto px-4 py-8 md:py-12"
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Avatar & Main Type */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white rounded-3xl p-6 shadow-sm border border-emerald-100 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-50 rounded-bl-full -z-10" />
            
            <div className="aspect-square rounded-2xl overflow-hidden bg-gray-50 mb-6 relative group">
              {imageSrc ? (
                <img 
                  src={imageSrc} 
                  alt={finalType.cn} 
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-gray-400">
                  无图片
                </div>
              )}
            </div>

            <div className="space-y-4 text-center">
              <div className="inline-block px-3 py-1 text-xs font-bold tracking-wider text-emerald-600 uppercase bg-emerald-50 rounded-full">
                {modeKicker}
              </div>
              
              <div>
                <h1 className="text-4xl font-black text-gray-900 mb-2">
                  {finalType.code}
                </h1>
                <h2 className="text-2xl font-bold text-gray-700">
                  {finalType.cn}
                </h2>
              </div>

              <div className="inline-flex items-center justify-center px-4 py-2 bg-gray-900 text-white text-sm font-medium rounded-full">
                {badge}
              </div>
              
              <p className="text-sm text-gray-500 leading-relaxed">
                {sub}
              </p>
            </div>
          </div>
        </div>

        {/* Right Column: Details & Dimensions */}
        <div className="lg:col-span-7 space-y-6">
          {/* Description */}
          <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100">
            <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-3">
              <span className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center text-sm">
                01
              </span>
              人格深度解析
            </h3>
            <p className="text-gray-700 leading-relaxed text-lg">
              {finalType.desc}
            </p>
          </div>

          {/* Dimensions */}
          <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100">
            <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-3">
              <span className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center text-sm">
                02
              </span>
              十五维度雷达
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {dimensionOrder.map(dim => {
                const level = levels[dim];
                const score = rawScores[dim];
                const meta = dimensionMeta[dim];
                const explanation = DIM_EXPLANATIONS[dim][level];
                
                return (
                  <div key={dim} className="p-4 rounded-2xl bg-gray-50 border border-gray-100 hover:border-emerald-200 transition-colors">
                    <div className="flex justify-between items-start mb-2">
                      <div className="font-bold text-gray-900">{meta.name}</div>
                      <div className="text-emerald-600 font-black bg-emerald-50 px-2 py-0.5 rounded text-sm">
                        {level} <span className="text-emerald-400/50">|</span> {score}
                      </div>
                    </div>
                    <p className="text-sm text-gray-600 leading-relaxed">
                      {explanation}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Footer Note */}
          <div className="bg-gray-50 rounded-3xl p-6 text-sm text-gray-500 text-center border border-gray-100">
            <p>
              {special 
                ? '本测试仅供娱乐。隐藏人格和傻乐兜底都属于作者故意埋的损招，请勿把它当成医学、心理学、相学、命理学或灵异学依据。'
                : '本测试仅供娱乐，别拿它当诊断、面试、相亲、分手、招魂、算命或人生判决书。你可以笑，但别太当真。'}
            </p>
          </div>
        </div>
      </div>

      {/* Restart Button at the bottom */}
      <div className="mt-12 flex justify-center pb-12">
        <button
          onClick={onRestart}
          className="flex items-center justify-center gap-2 px-10 py-4 bg-emerald-600 text-white rounded-full font-bold hover:bg-emerald-700 transition-colors shadow-lg hover:shadow-xl hover:-translate-y-1"
        >
          <RotateCcw className="w-5 h-5" />
          重新答题
        </button>
      </div>
    </motion.div>
  );
}
