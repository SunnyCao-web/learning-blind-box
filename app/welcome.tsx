import { Text, View, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import * as Haptics from "expo-haptics";

import { ScreenContainer } from "@/components/screen-container";

export default function WelcomeScreen() {
  const router = useRouter();

  const handleStart = async () => {
    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    router.replace("/(tabs)/theme-selection");
  };

  return (
    <ScreenContainer className="items-center justify-center p-6">
      <View className="flex-1 items-center justify-center gap-8">
        {/* Logo Area */}
        <View className="items-center gap-4">
          <Text className="text-6xl">📦</Text>
          <Text className="text-4xl font-bold text-foreground text-center">
            学霸盲盒
          </Text>
          <Text className="text-lg text-muted text-center">
            通过盲盒激励，让学习更有趣
          </Text>
        </View>

        {/* Features Preview */}
        <View className="bg-surface rounded-2xl p-6 w-full gap-4">
          <View className="flex-row gap-3">
            <Text className="text-2xl">⏱️</Text>
            <View className="flex-1">
              <Text className="text-foreground font-semibold">专注计时</Text>
              <Text className="text-muted text-sm">
                设定目标，进入深度专注状态
              </Text>
            </View>
          </View>

          <View className="h-px bg-border" />

          <View className="flex-row gap-3">
            <Text className="text-2xl">🎁</Text>
            <View className="flex-1">
              <Text className="text-foreground font-semibold">开启盲盒</Text>
              <Text className="text-muted text-sm">
                完成任务即可随机解锁奖励
              </Text>
            </View>
          </View>

          <View className="h-px bg-border" />

          <View className="flex-row gap-3">
            <Text className="text-2xl">🖼️</Text>
            <View className="flex-1">
              <Text className="text-foreground font-semibold">收藏图鉴</Text>
              <Text className="text-muted text-sm">
                集齐你最爱的角色和作品
              </Text>
            </View>
          </View>
        </View>
      </View>

      {/* CTA Button */}
      <TouchableOpacity
        onPress={handleStart}
        className="w-full bg-primary py-4 rounded-full items-center mb-8"
        activeOpacity={0.8}
      >
        <Text className="text-background font-bold text-lg">出发</Text>
      </TouchableOpacity>
    </ScreenContainer>
  );
}
