import { ScrollView, Text, View, TouchableOpacity, Pressable } from "react-native";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { ScreenContainer } from "@/components/screen-container";
import { useColors } from "@/hooks/use-colors";
import * as Haptics from "expo-haptics";

interface AppState {
  currentTheme: string | null;
  unlockedCards: number[];
  totalCards: number;
}

const THEMES = {
  "demon-slayer": {
    name: "鬼灭之刃",
    totalCards: 9,
    characters: [
      "灶门炭治郎",
      "竈門禰豆子",
      "我妻善逸",
      "嘴平伊之助",
      "冨岡義勇",
      "蝶屋敷",
      "鬼舞辻無慘",
      "猗窝座",
      "黑死牟"
    ]
  },
  "one-piece": {
    name: "航海王",
    totalCards: 9,
    characters: [
      "蒙奇·D·路飞",
      "罗罗诺亚·索隆",
      "娜美",
      "乌索普",
      "文斯莫克·山治",
      "托尼托尼·乔巴",
      "妮可·罗宾",
      "弗兰基",
      "布鲁克"
    ]
  }
};

export default function HomeScreen() {
  const router = useRouter();
  const colors = useColors();
  const [appState, setAppState] = useState<AppState>({
    currentTheme: null,
    unlockedCards: [],
    totalCards: 9,
  });
  const [isLoading, setIsLoading] = useState(true);

  // Load app state from AsyncStorage
  useEffect(() => {
    const loadAppState = async () => {
      try {
        const savedState = await AsyncStorage.getItem("appState");
        if (savedState) {
          setAppState(JSON.parse(savedState));
        } else {
          // First time - show welcome screen
          router.replace("/welcome");
        }
      } catch (error) {
        console.error("Failed to load app state:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadAppState();
  }, []);

  const handleCreateTask = async () => {
    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    router.push("/(tabs)/focus");
  };

  const handleViewGallery = async () => {
    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    router.push("/(tabs)/gallery");
  };

  if (isLoading) {
    return (
      <ScreenContainer className="items-center justify-center">
        <Text className="text-lg text-foreground">加载中...</Text>
      </ScreenContainer>
    );
  }

  if (!appState.currentTheme) {
    return (
      <ScreenContainer className="items-center justify-center">
        <Text className="text-lg text-foreground">请先选择主题</Text>
        <TouchableOpacity
          onPress={() => router.replace("/(tabs)/theme-selection")}
          className="mt-6 bg-primary px-6 py-3 rounded-full"
        >
          <Text className="text-background font-semibold">选择主题</Text>
        </TouchableOpacity>
      </ScreenContainer>
    );
  }

  const currentThemeName = THEMES[appState.currentTheme as keyof typeof THEMES]?.name || "未知主题";
  const progress = `${appState.unlockedCards.length}/${appState.totalCards}`;

  return (
    <ScreenContainer className="p-4">
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View className="flex-1 gap-6">
          {/* Progress Banner */}
          <Pressable
            onPress={handleViewGallery}
            style={({ pressed }) => [
              {
                opacity: pressed ? 0.7 : 1,
              },
            ]}
          >
            <View className="bg-gradient-to-r from-primary to-purple-500 rounded-xl p-4 shadow-md">
              <Text className="text-white font-semibold text-sm mb-2">
                当前主题
              </Text>
              <View className="flex-row justify-between items-center">
                <Text className="text-white font-bold text-xl">
                  {currentThemeName}
                </Text>
                <View className="bg-white/20 px-3 py-1 rounded-full">
                  <Text className="text-white font-semibold text-sm">
                    已收集：{progress}
                  </Text>
                </View>
              </View>
            </View>
          </Pressable>

          {/* Main CTA Button */}
          <View className="flex-1 items-center justify-center">
            <Pressable
              onPress={handleCreateTask}
              style={({ pressed }) => [
                {
                  transform: [{ scale: pressed ? 0.95 : 1 }],
                },
              ]}
            >
              <View className="w-32 h-32 bg-primary rounded-full items-center justify-center shadow-lg">
                <Text className="text-6xl text-white font-bold">+</Text>
              </View>
            </Pressable>
            <Text className="text-foreground font-semibold text-lg mt-6">
              创建新任务
            </Text>
            <Text className="text-muted text-sm mt-2 text-center">
              点击开始一次专注学习
            </Text>
          </View>

          {/* Quick Stats */}
          <View className="bg-surface rounded-xl p-4 gap-3">
            <View className="flex-row justify-between items-center">
              <Text className="text-foreground font-semibold">总专注时长</Text>
              <Text className="text-primary font-bold text-lg">0 分钟</Text>
            </View>
            <View className="h-px bg-border" />
            <View className="flex-row justify-between items-center">
              <Text className="text-foreground font-semibold">已完成任务</Text>
              <Text className="text-primary font-bold text-lg">0 个</Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </ScreenContainer>
  );
}
