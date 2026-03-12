# 学霸盲盒 (Learning Blind Box)

一款为青少年设计的学习激励应用，通过盲盒收集机制和游戏化设计，帮助学生提升专注力、克服拖延症，并在学习中获得持续的成就感。

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![React Native](https://img.shields.io/badge/React%20Native-0.81-green.svg)
![Expo](https://img.shields.io/badge/Expo-54-blue.svg)
![TypeScript](https://img.shields.io/badge/TypeScript-5.9-blue.svg)

## 📱 应用特性

### 核心功能
- **⏱️ 专注计时器** - 设定学习目标和时长，进入沉浸式专注模式
- **🎁 盲盒奖励系统** - 完成任务即可随机解锁喜爱的动漫角色卡片
- **🖼️ 收藏图鉴** - 集齐所有角色，追踪收集进度
- **🎨 主题定制** - 支持多个预设主题（鬼灭之刃、航海王、我的英雄学院等）
- **💾 本地数据存储** - 所有数据保存在手机上，无需云同步

### 用户体验
- 现代化的iOS风格设计，完全符合苹果人机界面指南
- 流畅的页面过渡和动画效果
- 深色模式支持
- 触觉反馈增强交互体验
- 响应式布局，适配所有iPhone屏幕尺寸

## 🚀 快速开始

### 前置要求
- Node.js 18+ 和 npm/pnpm
- Expo CLI (`npm install -g expo-cli`)
- iOS 13+ 或 Android 5.0+

### 安装

1. **克隆仓库**
```bash
git clone https://github.com/SunnyCao-web/learning-blind-box.git
cd learning-blind-box
```

2. **安装依赖**
```bash
pnpm install
```

3. **启动开发服务器**
```bash
pnpm dev
```

4. **在手机上运行**
   - **iOS**: 按 `i` 打开iOS模拟器，或扫描二维码在Expo Go中打开
   - **Android**: 按 `a` 打开Android模拟器，或扫描二维码在Expo Go中打开
   - **Web**: 按 `w` 在浏览器中打开

### 使用Expo Go体验

最简单的方式是使用Expo Go应用：

1. 在手机上下载 [Expo Go](https://expo.dev/client)
2. 运行 `pnpm dev`
3. 扫描终端显示的二维码
4. 应用会在Expo Go中加载

## 📖 使用指南

### 首次启动流程

1. **欢迎屏幕** - 了解应用的核心功能
2. **选择主题** - 选择您最喜欢的动漫作品作为盲盒主题
3. **创建任务** - 输入学习目标（如"完成5道数学题"）
4. **专注学习** - 进入全屏计时器，专注学习
5. **判定成果** - 选择"我解开了谜题"或"开启侦探模式"
6. **开启盲盒** - 点击宝箱，随机获得角色卡片
7. **查看图鉴** - 在收藏图鉴中查看已解锁的卡片

### 主要屏幕说明

| 屏幕 | 功能 |
|------|------|
| **欢迎屏幕** | 应用启动时显示，介绍核心功能 |
| **主题选择** | 选择预设主题或自定义主题 |
| **主界面** | 显示当前主题、收集进度、创建任务 |
| **任务创建** | 输入任务描述，选择专注时长 |
| **计时器** | 全屏倒计时，防止分心 |
| **成果判定** | 评估学习成果，选择奖励方式 |
| **开盲盒** | 动画展示，随机解锁卡片 |
| **图鉴** | 网格展示所有卡片和收集进度 |

## 🏗️ 项目结构

```
learning-blind-box/
├── app/                          # Expo Router应用目录
│   ├── (tabs)/                   # 标签栏导航
│   │   ├── index.tsx            # 主界面
│   │   ├── theme-selection.tsx  # 主题选择
│   │   ├── focus.tsx            # 任务创建和计时器
│   │   ├── blind-box.tsx        # 开盲盒屏幕
│   │   └── gallery.tsx          # 收藏图鉴
│   ├── welcome.tsx              # 欢迎屏幕
│   └── _layout.tsx              # 根布局
├── components/                   # 可复用组件
│   ├── screen-container.tsx     # 屏幕容器（处理SafeArea）
│   └── ui/
│       └── icon-symbol.tsx      # 图标映射
├── hooks/                        # 自定义Hooks
│   ├── use-colors.ts            # 主题颜色Hook
│   ├── use-color-scheme.ts      # 深色模式Hook
│   └── use-auth.ts              # 认证Hook
├── lib/                          # 工具库
│   ├── utils.ts                 # 工具函数
│   └── theme-provider.tsx       # 主题提供者
├── constants/                    # 常量
│   └── theme.ts                 # 主题配置
├── assets/                       # 静态资源
│   └── images/                  # 应用图标和启动画面
├── design.md                     # 设计文档
├── todo.md                       # 项目任务清单
├── app.config.ts                # Expo配置
├── tailwind.config.js           # Tailwind配置
├── theme.config.js              # 主题令牌配置
└── package.json                 # 项目依赖

```

## 🎨 设计系统

### 颜色方案

| 用途 | 颜色 | 十六进制 |
|------|------|---------|
| 主色 | 深蓝 | #0a7ea4 |
| 背景 | 白色/深灰 | #ffffff / #151718 |
| 表面 | 浅灰 | #f5f5f5 |
| 文字 | 深灰/白色 | #11181C / #ECEDEE |
| 成功 | 绿色 | #22C55E |
| 警告 | 橙色 | #F59E0B |

### 样式框架

应用使用 **NativeWind** (Tailwind CSS for React Native) 进行样式管理：

```tsx
<View className="flex-1 items-center justify-center p-4">
  <Text className="text-2xl font-bold text-foreground">Hello</Text>
</View>
```

## 🔧 技术栈

- **框架**: React Native 0.81 + Expo 54
- **语言**: TypeScript 5.9
- **样式**: NativeWind 4 (Tailwind CSS)
- **路由**: Expo Router 6
- **状态管理**: React Context + AsyncStorage
- **动画**: React Native Reanimated 4
- **图标**: Expo Vector Icons
- **触觉反馈**: Expo Haptics

## 📦 核心依赖

```json
{
  "react": "19.1.0",
  "react-native": "0.81.5",
  "expo": "~54.0.29",
  "expo-router": "~6.0.19",
  "nativewind": "^4.2.1",
  "react-native-reanimated": "~4.1.6",
  "@react-native-async-storage/async-storage": "^2.2.0"
}
```

## 🎮 核心功能实现

### 本地数据存储

应用使用 AsyncStorage 存储用户数据：

```typescript
interface AppState {
  currentTheme: string;
  unlockedCards: number[];
  totalCards: number;
}

// 保存状态
await AsyncStorage.setItem('appState', JSON.stringify(state));

// 加载状态
const state = await AsyncStorage.getItem('appState');
```

### 盲盒随机抽取

```typescript
// 从未解锁的卡片中随机选择
const availableCards = CHARACTERS.filter(
  card => !unlockedIds.includes(card.id)
);
const randomCard = availableCards[
  Math.floor(Math.random() * availableCards.length)
];
```

### 计时器实现

```typescript
useEffect(() => {
  let interval: ReturnType<typeof setInterval>;
  
  if (isRunning && timeLeft > 0) {
    interval = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          setIsRunning(false);
          setMode('judgment');
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  }
  
  return () => clearInterval(interval);
}, [isRunning, timeLeft]);
```

## 🧪 测试

运行单元测试：

```bash
pnpm test
```

运行类型检查：

```bash
pnpm check
```

## 🚀 构建和部署

### 构建iOS应用

```bash
eas build --platform ios
```

### 构建Android应用

```bash
eas build --platform android
```

### 本地构建（需要Xcode）

```bash
eas build --platform ios --local
```

## 📋 项目路线图

### ✅ 已完成 (v0.1 - Alpha)
- [x] 核心UI屏幕
- [x] 专注计时器
- [x] 盲盒随机抽取
- [x] 本地数据存储
- [x] 主题选择

### 🔄 进行中 (v0.2 - Beta)
- [ ] 侦探模式完整实现
- [ ] 自定义主题上传
- [ ] 用户引导流程
- [ ] 设置屏幕
- [ ] 动画优化

### 📅 计划中 (v1.0 - Release)
- [ ] 社交分享功能
- [ ] 排行榜系统
- [ ] 成就徽章
- [ ] 数据分析
- [ ] 云同步（可选）
- [ ] 多语言支持

## 🐛 已知问题

- 在某些低端Android设备上，动画可能不够流畅
- 侦探模式的完整逻辑还在开发中

## 🤝 贡献指南

欢迎提交Issue和Pull Request！

1. Fork本仓库
2. 创建特性分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 开启Pull Request

## 📄 许可证

本项目采用 MIT 许可证。详见 [LICENSE](LICENSE) 文件。

## 👨‍💻 作者

**Sunny Cao** - GitHub: [@SunnyCao-web](https://github.com/SunnyCao-web)

## 🙏 致谢

- 感谢 [Expo](https://expo.dev/) 提供的优秀框架
- 感谢 [NativeWind](https://www.nativewind.dev/) 的Tailwind CSS支持
- 感谢所有为这个项目提供反馈和建议的用户

## 📞 联系方式

如有问题或建议，欢迎通过以下方式联系：

- 📧 Email: dev@example.com
- 🐛 Issue: [GitHub Issues](https://github.com/SunnyCao-web/learning-blind-box/issues)
- 💬 Discussions: [GitHub Discussions](https://github.com/SunnyCao-web/learning-blind-box/discussions)

---

**Made with ❤️ by Manus AI**

最后更新: 2026年3月10日
