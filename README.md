# 🎭 SBTI 人格测试 (SBTI Personality Test)

> MBTI 已经过时，SBTI 来了！发现你内心深处的“真实”人格。

这是一个基于 React + Tailwind CSS 构建的现代化、极简风的娱乐向人格测试 Web 应用。排版与交互灵感来源于 16 Personalities，但内容更加“真实”、幽默、甚至带点冒犯。准备好面对真实的自己了吗？

## ✨ 核心特性

- 🎨 **优雅的 UI 设计**：采用翠绿色调（Emerald）与极简卡片排版，完美适配 PC 与移动端（Mobile-first）。
- 🌊 **丝滑的交互体验**：基于 `framer-motion` 实现沉浸式的一题一答模式，选中选项后自动平滑过渡到下一题。
- 🧠 **15 维度深度解析**：从自我、情感、态度、行动、社交 5 大模型，15 个维度对你的灵魂进行“精准打击”。
- 🎲 **动态题目逻辑**：内置隐藏触发机制（例如“酒鬼”专属路线），系统会根据你的特定回答动态插入后续问题。
- 📊 **详尽的结果展示**：包含主类型、匹配度、雷达维度解析、专属人格海报以及“扎心”的深度解读。

## 🛠️ 技术栈

- **前端框架**: [React 19](https://react.dev/)
- **构建工具**: [Vite](https://vitejs.dev/)
- **样式方案**: [Tailwind CSS v4](https://tailwindcss.com/)
- **动画库**: [Motion (Framer Motion)](https://motion.dev/)
- **图标库**: [Lucide React](https://lucide.dev/)
- **语言**: TypeScript

## 🚀 本地运行

确保你的电脑上已经安装了 [Node.js](https://nodejs.org/) (推荐 v18+)。

1. **克隆项目**
   ```bash
   git clone https://github.com/你的用户名/sbti-test.git
   cd sbti-test
   ```

2. **安装依赖**
   ```bash
   npm install
   ```

3. **启动开发服务器**
   ```bash
   npm run dev
   ```
   打开浏览器访问 `http://localhost:3000` 即可预览。

4. **打包构建**
   ```bash
   npm run build
   ```
   构建产物将生成在 `dist` 目录中。

## 📁 目录结构

```text
├── public/
│   └── image/             # 人格结果海报图片
├── src/
│   ├── components/        # React 组件
│   │   ├── Home.tsx       # 首页组件
│   │   ├── Test.tsx       # 答题页组件
│   │   └── Result.tsx     # 结果页组件
│   ├── data.ts            # 题库、维度定义、人格图鉴数据
│   ├── utils.ts           # 核心算法：计算匹配度与人格类型
│   ├── App.tsx            # 根组件，控制页面路由与状态
│   ├── index.css          # 全局样式与 Tailwind 引入
│   └── main.tsx           # 项目入口
```

## 💡 算法说明

测试结果的计算并非随机。系统会将用户的选择转化为 15 个维度的 `L(低)`、`M(中)`、`H(高)` 向量，并与内置的 25 种标准人格模式（Pattern）进行距离计算。
- 距离越近，匹配度越高。
- 当匹配度低于 60% 时，系统会触发“强制兜底”机制分配特殊人格。
- 触发特定选项时，会直接接管结果（如：酒精异常因子）。

## 🙏 致谢

- **内容原作者**：B站 [@蛆肉儿串儿](https://space.bilibili.com/417038183)
- **声明**：本测试仅供娱乐，别拿它当诊断、面试、相亲、分手、招魂、算命或人生判决书。你可以笑，但别太当真。

## 📄 开源协议

本项目采用 [MIT License](LICENSE) 开源协议。欢迎 Fork、提交 PR 或提出 Issue！
