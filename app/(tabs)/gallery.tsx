import { Text, View, FlatList, TouchableOpacity } from "react-native";
import { useRouter, useFocusEffect } from "expo-router";
import { useState, useCallback } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { ScreenContainer } from "@/components/screen-container";

const DEMON_SLAYER_CHARACTERS = [
  { id: 0, name: "灶门炭治郎", rarity: "R", emoji: "🗡️" },
  { id: 1, name: "竈門禰豆子", rarity: "R", emoji: "👹" },
  { id: 2, name: "我妻善逸", rarity: "R", emoji: "⚡" },
  { id: 3, name: "嘴平伊之助", rarity: "SR", emoji: "🐗" },
  { id: 4, name: "冨岡義勇", rarity: "SR", emoji: "💧" },
  { id: 5, name: "蝶屋敷", rarity: "SR", emoji: "🦋" },
  { id: 6, name: "鬼舞辻無慘", rarity: "SSR", emoji: "👿" },
  { id: 7, name: "猗窝座", rarity: "SSR", emoji: "🔥" },
  { id: 8, name: "黑死牟", rarity: "SSR", emoji: "🌙" },
];

export default function GalleryScreen() {
  const router = useRouter();
  const [unlockedCards, setUnlockedCards] = useState<number[]>([]);
  const [loading, setLoading] = useState(true);

  useFocusEffect(
    useCallback(() => {
      const loadCards = async () => {
        try {
          const appState = await AsyncStorage.getItem("appState");
          if (appState) {
            const state = JSON.parse(appState);
            setUnlockedCards(state.unlockedCards || []);
          }
        } catch (error) {
          console.error("Failed to load cards:", error);
        } finally {
          setLoading(false);
        }
      };

      loadCards();
    }, [])
  );

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case "SSR":
        return "bg-yellow-100 border-yellow-400";
      case "SR":
        return "bg-purple-100 border-purple-400";
      default:
        return "bg-blue-100 border-blue-400";
    }
  };

  const renderCard = ({ item }: { item: typeof DEMON_SLAYER_CHARACTERS[0] }) => {
    const isUnlocked = unlockedCards.includes(item.id);

    return (
      <View className="flex-1 p-2">
        <View
          className={`rounded-xl p-4 items-center justify-center aspect-square border-2 ${
            isUnlocked
              ? getRarityColor(item.rarity)
              : "bg-slate-200 border-slate-300"
          }`}
        >
          {isUnlocked ? (
            <View className="items-center gap-2">
              <Text className="text-4xl">{item.emoji}</Text>
              <Text className="text-xs font-semibold text-center text-slate-700">
                {item.name}
              </Text>
              <Text className="text-xs text-slate-600">{item.rarity}</Text>
            </View>
          ) : (
            <View className="items-center gap-2">
              <Text className="text-3xl">❓</Text>
              <Text className="text-xs text-slate-500">未解锁</Text>
            </View>
          )}
        </View>
      </View>
    );
  };

  if (loading) {
    return (
      <ScreenContainer className="items-center justify-center">
        <Text className="text-foreground">加载中...</Text>
      </ScreenContainer>
    );
  }

  const progress = `${unlockedCards.length}/9`;
  const progressPercent = Math.round((unlockedCards.length / 9) * 100);

  return (
    <ScreenContainer className="p-4">
      {/* Header */}
      <View className="gap-4 mb-4">
        <View className="flex-row justify-between items-center">
          <View>
            <Text className="text-3xl font-bold text-foreground">
              我的图鉴
            </Text>
            <Text className="text-muted">鬼灭之刃</Text>
          </View>
          <TouchableOpacity
            onPress={() => router.back()}
            className="w-10 h-10 rounded-full bg-surface items-center justify-center"
          >
            <Text className="text-foreground font-bold">✕</Text>
          </TouchableOpacity>
        </View>

        {/* Progress */}
        <View className="gap-2">
          <View className="flex-row justify-between items-center">
            <Text className="text-foreground font-semibold">收集进度</Text>
            <Text className="text-primary font-bold">{progress}</Text>
          </View>
          <View className="h-3 bg-surface rounded-full overflow-hidden">
            <View
              className="h-full bg-gradient-to-r from-primary to-purple-500"
              style={{ width: `${progressPercent}%` }}
            />
          </View>
          <Text className="text-muted text-xs">{progressPercent}% 完成</Text>
        </View>
      </View>

      {/* Gallery Grid */}
      <FlatList
        data={DEMON_SLAYER_CHARACTERS}
        renderItem={renderCard}
        keyExtractor={(item) => item.id.toString()}
        numColumns={3}
        scrollEnabled={true}
        contentContainerStyle={{ paddingBottom: 20 }}
      />

      {/* Motivation */}
      {unlockedCards.length < 9 && (
        <View className="bg-surface rounded-lg p-4 mt-4">
          <Text className="text-foreground font-semibold mb-2">
            🎯 继续加油！
          </Text>
          <Text className="text-muted text-sm">
            还有 {9 - unlockedCards.length} 个角色等你解锁。每完成一个任务，就有机会获得新的卡片！
          </Text>
        </View>
      )}

      {unlockedCards.length === 9 && (
        <View className="bg-gradient-to-r from-yellow-400 to-orange-400 rounded-lg p-4 mt-4">
          <Text className="text-white font-bold text-lg mb-1">
            🎉 恭喜！
          </Text>
          <Text className="text-white text-sm">
            你已集齐所有角色！你是真正的学霸！
          </Text>
        </View>
      )}
    </ScreenContainer>
  );
}
