# SBTI 人格测试

> MBTI 已经过时，SBTI 来了。发现你内心深处的“真实”人格。

一个基于 React + Tailwind CSS 构建的娱乐向人格测试 Web 应用，灵感来源于 [16Personalities](https://www.16personalities.com/)，内容更抽象、更真实、也更幽默。

在线体验：[wangyifang.com/web/SBTI](https://wangyifang.com/web/SBTI/)

## 特性

- 优雅 UI 设计：翠绿色调与极简卡片排版，适配 PC 与移动端
- 丝滑交互体验：基于 `motion` 实现沉浸式一题一答模式
- 15 维度深度解析：从自我、情感、态度、行动、社交 5 大模型解析人格
- 动态题目逻辑：内置隐藏触发机制，根据回答动态插入后续问题
- 详尽结果展示：主类型、匹配度、雷达图解析、人格海报及深度解读
- 结果素材重绘：Wi-Fi 按当前项目风格重绘了一套结果素材，统一放在 [`public/Test`](./public/Test) 中
- 开发者彩蛋：在首页或答题页按 `P`，可以直接随机查看一个结果页

## 技术栈

- 前端框架：React 19
- 构建工具：Vite
- 样式方案：Tailwind CSS v4
- 动画库：Motion
- 图标库：Lucide React
- 语言：TypeScript

## 本地运行

确保已安装 [Node.js](https://nodejs.org/)（推荐 v18+）

```bash
npm install
npm run dev
```

默认访问 [http://localhost:3000](http://localhost:3000)

构建产物：

```bash
npm run build
```

## 项目结构

```text
├── public/
│   ├── image/              # 原始结果图片与兼容资源
│   └── Test/               # Wi-Fi 重绘后的结果素材
├── src/
│   ├── components/
│   │   ├── Home.tsx        # 首页
│   │   ├── Test.tsx        # 答题页
│   │   └── Result.tsx      # 结果页
│   ├── data.ts             # 题库、维度定义、人格数据
│   ├── utils.ts            # 核心算法
│   ├── App.tsx             # 根组件与彩蛋逻辑
│   ├── index.css           # 全局样式
│   └── main.tsx            # 入口文件
├── README.md
├── LICENSE
└── package.json
```

## 算法说明

测试结果会将用户选择转化为 15 个维度的向量，再与多种标准人格模式进行距离计算：

- 距离越近，匹配度越高
- 匹配度低于 60% 时触发“兜底”机制
- 特定选项会直接接管结果

## 素材与版权

- 内容原作者：B 站 [@蛆肉儿串儿](https://space.bilibili.com/417038183)
- 视觉灵感来源：[16Personalities](https://www.16personalities.com/)
- 结果素材更新：Wi-Fi 已对结果页素材进行统一重绘，当前推荐使用 [`public/Test`](./public/Test) 下的版本
- 原始结果资源可见：[`public/image`](./public/image)
- 本项目代码协议见 [`LICENSE`](./LICENSE)

## 声明

本测试仅供娱乐，别拿它当诊断、面试、相亲、分手、招魂、算命或人生判决书。
