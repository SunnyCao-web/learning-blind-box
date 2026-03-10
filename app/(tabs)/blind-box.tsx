import { Text, View, TouchableOpacity, Animated } from "react-native";
import { useRouter } from "expo-router";
import { useState, useEffect, useRef } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Haptics from "expo-haptics";

import { ScreenContainer } from "@/components/screen-container";

const DEMON_SLAYER_CHARACTERS = [
  { id: 0, name: "灶门炭治郎", rarity: "R" },
  { id: 1, name: "竈門禰豆子", rarity: "R" },
  { id: 2, name: "我妻善逸", rarity: "R" },
  { id: 3, name: "嘴平伊之助", rarity: "SR" },
  { id: 4, name: "冨岡義勇", rarity: "SR" },
  { id: 5, name: "蝶屋敷", rarity: "SR" },
  { id: 6, name: "鬼舞辻無慘", rarity: "SSR" },
  { id: 7, name: "猗窝座", rarity: "SSR" },
  { id: 8, name: "黑死牟", rarity: "SSR" },
];

type BlindBoxMode = "closed" | "opening" | "revealed";

export default function BlindBoxScreen() {
  const router = useRouter();
  const [mode, setMode] = useState<BlindBoxMode>("closed");
  const [unlockedCard, setUnlockedCard] = useState<typeof DEMON_SLAYER_CHARACTERS[0] | null>(null);
  const scaleAnim = useRef(new Animated.Value(1)).current;

  const handleOpenBox = async () => {
    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
    setMode("opening");

    // Animate scale
    Animated.sequence([
      Animated.timing(scaleAnim, {
        toValue: 1.2,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnim, {
        toValue: 0.8,
        duration: 200,
        useNativeDriver: true,
      }),
    ]).start();

    // Simulate opening animation
    setTimeout(async () => {
      await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);

      // Get unlocked card
      try {
        const appState = await AsyncStorage.getItem("appState");
        if (appState) {
          const state = JSON.parse(appState);
          const unlockedIds = state.unlockedCards || [];

          // Find an unlocked card
          const availableCards = DEMON_SLAYER_CHARACTERS.filter(
            (card) => !unlockedIds.includes(card.id)
          );

          if (availableCards.length > 0) {
            const randomCard =
              availableCards[Math.floor(Math.random() * availableCards.length)];
            setUnlockedCard(randomCard);

            // Update state
            const newUnlockedIds = [...unlockedIds, randomCard.id];
            state.unlockedCards = newUnlockedIds;
            await AsyncStorage.setItem("appState", JSON.stringify(state));
          }
        }
      } catch (error) {
        console.error("Failed to unlock card:", error);
      }

      setMode("revealed");
    }, 800);
  };

  const handleCollect = async () => {
    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    router.replace("/(tabs)");
  };

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case "SSR":
        return "bg-yellow-400";
      case "SR":
        return "bg-purple-400";
      default:
        return "bg-blue-400";
    }
  };

  // Closed Box Mode
  if (mode === "closed") {
    return (
      <ScreenContainer
        className="items-center justify-center"
        containerClassName="bg-gradient-to-b from-slate-900 to-slate-800"
      >
        <View className="flex-1 items-center justify-center gap-8">
          {/* Title */}
          <View className="items-center gap-2">
            <Text className="text-white/80 text-lg">准备好了吗？</Text>
            <Text className="text-white font-bold text-2xl">点击开启宝箱</Text>
          </View>

          {/* Box */}
          <Animated.View
            style={{
              transform: [{ scale: scaleAnim }],
            }}
          >
            <TouchableOpacity
              onPress={handleOpenBox}
              activeOpacity={0.9}
              className="w-40 h-40 bg-gradient-to-b from-blue-600 to-blue-800 rounded-2xl items-center justify-center shadow-2xl border-4 border-yellow-400"
            >
              <Text className="text-6xl">📦</Text>
            </TouchableOpacity>
          </Animated.View>

          {/* Hint */}
          <Text className="text-white/60 text-sm text-center px-6">
            每完成一个任务，就能开启一个新的盲盒。坚持学习，集齐所有角色！
          </Text>
        </View>
      </ScreenContainer>
    );
  }

  // Opening Mode
  if (mode === "opening") {
    return (
      <ScreenContainer
        className="items-center justify-center"
        containerClassName="bg-gradient-to-b from-yellow-400 to-orange-500"
      >
        <View className="flex-1 items-center justify-center gap-8">
          <Text className="text-6xl animate-bounce">✨</Text>
          <Text className="text-white font-bold text-2xl">开启中...</Text>
          <Text className="text-white/80">准备好惊喜了吗？</Text>
        </View>
      </ScreenContainer>
    );
  }

  // Revealed Mode
  if (mode === "revealed" && unlockedCard) {
    return (
      <ScreenContainer className="p-4">
        <View className="flex-1 items-center justify-center gap-6">
          {/* Celebration */}
          <Text className="text-7xl">🎊</Text>

          {/* Card */}
          <View className="w-full max-w-xs bg-gradient-to-b from-slate-100 to-slate-200 rounded-2xl p-6 shadow-lg items-center gap-4">
            {/* Character Emoji */}
            <View className="w-32 h-32 bg-gradient-to-br from-blue-300 to-purple-400 rounded-xl items-center justify-center">
              <Text className="text-6xl">🗡️</Text>
            </View>

            {/* Character Name */}
            <Text className="text-2xl font-bold text-slate-900">
              {unlockedCard.name}
            </Text>

            {/* Rarity */}
            <View className={`px-4 py-2 rounded-full ${getRarityColor(unlockedCard.rarity)}`}>
              <Text className="text-white font-bold text-sm">
                {unlockedCard.rarity}
              </Text>
            </View>

            {/* ID */}
            <Text className="text-slate-500 text-sm">
              No. {unlockedCard.id + 1}/9
            </Text>
          </View>

          {/* Message */}
          <View className="items-center gap-2">
            <Text className="text-foreground font-semibold text-lg">
              恭喜获得！
            </Text>
            <Text className="text-muted text-center">
              继续完成任务，集齐所有角色吧！
            </Text>
          </View>
        </View>

        {/* Collect Button */}
        <TouchableOpacity
          onPress={handleCollect}
          className="w-full bg-primary py-4 rounded-full items-center mt-6"
        >
          <Text className="text-background font-bold text-lg">
            收入图鉴
          </Text>
        </TouchableOpacity>
      </ScreenContainer>
    );
  }

  return null;
}
