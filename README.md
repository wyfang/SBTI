# SBTI 人格测试

> MBTI 已经过时，SBTI 来了！发现你内心深处的"真实"人格。

一个基于 React + Tailwind CSS 构建的娱乐向人格测试 Web 应用，灵感来源于 16 Personalities，内容更加真实、幽默。

**在线体验**: https://wangyifang.com/web/SBTI/

## 特性

- **优雅 UI 设计**: 翠绿色调与极简卡片排版，完美适配 PC 与移动端
- **丝滑交互体验**: 基于 `motion` 实现沉浸式一题一答模式
- **15 维度深度解析**: 从自我、情感、态度、行动、社交 5 大模型解析人格
- **动态题目逻辑**: 内置隐藏触发机制，根据回答动态插入后续问题
- **详尽结果展示**: 主类型、匹配度、雷达图解析、人格海报及深度解读

## 技术栈

- **前端框架**: React 19
- **构建工具**: Vite
- **样式方案**: Tailwind CSS v4
- **动画库**: Motion (Framer Motion)
- **图标库**: Lucide React
- **语言**: TypeScript

## 本地运行

确保已安装 [Node.js](https://nodejs.org/) (推荐 v18+)

```bash
# 安装依赖
npm install

# 启动开发服务器
npm run dev
# 访问 http://localhost:3000

# 打包构建
npm run build
```

## 项目结构

```
├── dist/                   # 构建产物
├── public/
│   └── image/              # 人格结果海报图片
├── src/
│   ├── components/
│   │   ├── Home.tsx       # 首页
│   │   ├── Test.tsx       # 答题页
│   │   └── Result.tsx     # 结果页
│   ├── data.ts            # 题库、维度定义、人格数据
│   ├── utils.ts           # 核心算法
│   ├── App.tsx            # 根组件
│   ├── index.css          # 全局样式
│   └── main.tsx           # 入口文件
├── index.html
├── package.json
├── tsconfig.json
└── vite.config.ts
```

## 算法说明

测试结果通过将用户选择转化为 15 个维度的向量，与 25 种标准人格模式进行距离计算：
- 距离越近，匹配度越高
- 匹配度低于 60% 时触发"兜底"机制
- 特定选项会直接接管结果

## 致谢

- **内容原作者**: B站 [@蛆肉儿串儿](https://space.bilibili.com/417038183)
- **声明**: 本测试仅供娱乐，别拿它当诊断、面试、相亲、分手、招魂、算命或人生判决书

## 开源协议

[MIT License](LICENSE)
