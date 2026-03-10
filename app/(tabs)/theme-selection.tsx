import { Text, View, TouchableOpacity, ScrollView } from "react-native";
import { useRouter } from "expo-router";
import { useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Haptics from "expo-haptics";

import { ScreenContainer } from "@/components/screen-container";

const THEMES = [
  {
    id: "demon-slayer",
    name: "鬼灭之刃",
    emoji: "👹",
    color: "from-red-500 to-purple-600",
    description: "集齐所有柱的力量"
  },
  {
    id: "one-piece",
    name: "航海王",
    emoji: "🏴‍☠️",
    color: "from-yellow-500 to-orange-600",
    description: "成为海贼王的冒险"
  },
  {
    id: "my-hero",
    name: "我的英雄学院",
    emoji: "💥",
    color: "from-red-600 to-yellow-500",
    description: "成为最强英雄"
  }
];

export default function ThemeSelectionScreen() {
  const router = useRouter();
  const [selectedTheme, setSelectedTheme] = useState<string | null>(null);

  const handleSelectTheme = async (themeId: string) => {
    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    setSelectedTheme(themeId);
  };

  const handleConfirm = async () => {
    if (!selectedTheme) return;

    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);

    try {
      const appState = {
        currentTheme: selectedTheme,
        unlockedCards: [],
        totalCards: 9,
      };
      await AsyncStorage.setItem("appState", JSON.stringify(appState));
      router.replace("/(tabs)");
    } catch (error) {
      console.error("Failed to save theme:", error);
    }
  };

  return (
    <ScreenContainer className="p-4">
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View className="flex-1 gap-6">
          {/* Header */}
          <View className="gap-2">
            <Text className="text-3xl font-bold text-foreground">
              选择你的宝藏主题
            </Text>
            <Text className="text-muted">
              选择你最喜欢的作品，为学习增添动力
            </Text>
          </View>

          {/* Theme Cards */}
          <View className="gap-4 flex-1">
            {THEMES.map((theme) => (
              <TouchableOpacity
                key={theme.id}
                onPress={() => handleSelectTheme(theme.id)}
                activeOpacity={0.7}
              >
                <View
                  className={`rounded-2xl p-6 border-2 ${
                    selectedTheme === theme.id
                      ? "border-primary bg-primary/10"
                      : "border-border bg-surface"
                  }`}
                >
                  <View className="flex-row items-start gap-4">
                    <Text className="text-5xl">{theme.emoji}</Text>
                    <View className="flex-1">
                      <Text className="text-xl font-bold text-foreground">
                        {theme.name}
                      </Text>
                      <Text className="text-muted text-sm mt-1">
                        {theme.description}
                      </Text>
                      {selectedTheme === theme.id && (
                        <View className="mt-3 flex-row items-center gap-2">
                          <Text className="text-primary font-semibold">✓ 已选择</Text>
                        </View>
                      )}
                    </View>
                  </View>
                </View>
              </TouchableOpacity>
            ))}
          </View>

          {/* Custom Theme Option */}
          <View className="bg-surface rounded-2xl p-6 border border-dashed border-border">
            <Text className="text-foreground font-semibold mb-2">
              🎨 自定义主题
            </Text>
            <Text className="text-muted text-sm">
              上传你最喜欢的漫画、游戏或其他作品的图片，创建属于你的盲盒主题
            </Text>
            <Text className="text-primary text-sm font-semibold mt-3">
              敬请期待 →
            </Text>
          </View>
        </View>
      </ScrollView>

      {/* Confirm Button */}
      <TouchableOpacity
        onPress={handleConfirm}
        disabled={!selectedTheme}
        className={`w-full py-4 rounded-full items-center mt-6 ${
          selectedTheme ? "bg-primary" : "bg-muted/30"
        }`}
        activeOpacity={0.8}
      >
        <Text
          className={`font-bold text-lg ${
            selectedTheme ? "text-background" : "text-muted"
          }`}
        >
          就选它了！
        </Text>
      </TouchableOpacity>
    </ScreenContainer>
  );
}
