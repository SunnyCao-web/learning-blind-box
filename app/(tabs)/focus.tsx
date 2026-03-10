import { Text, View, TouchableOpacity, ScrollView, TextInput } from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";
import { useState, useEffect } from "react";
import * as Haptics from "expo-haptics";

import { ScreenContainer } from "@/components/screen-container";

type FocusMode = "setup" | "timer" | "judgment";

export default function FocusScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const [mode, setMode] = useState<FocusMode>("setup");
  const [taskName, setTaskName] = useState("");
  const [duration, setDuration] = useState(25);
  const [timeLeft, setTimeLeft] = useState(25 * 60);
  const [isRunning, setIsRunning] = useState(false);

  // Timer logic
  useEffect(() => {
    let interval: ReturnType<typeof setInterval> | undefined;

    if (isRunning && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            setIsRunning(false);
            setMode("judgment");
            Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [isRunning, timeLeft]);

  const handleStartFocus = async () => {
    if (!taskName.trim()) {
      alert("请输入任务描述");
      return;
    }

    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    setTimeLeft(duration * 60);
    setMode("timer");
    setIsRunning(true);
  };

  const handleGiveUp = async () => {
    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    setIsRunning(false);
    router.back();
  };

  const handleCorrect = async () => {
    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    router.push("/(tabs)/blind-box");
  };

  const handleDetective = async () => {
    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    alert("侦探模式：请完成探案报告后，稍后领取奖励");
    router.back();
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  // Setup Mode
  if (mode === "setup") {
    return (
      <ScreenContainer className="p-4">
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
          <View className="flex-1 gap-6">
            <View className="gap-2">
              <Text className="text-3xl font-bold text-foreground">
                创建新任务
              </Text>
              <Text className="text-muted">
                描述你今天的学习目标
              </Text>
            </View>

            {/* Task Input */}
            <View className="gap-3">
              <Text className="text-foreground font-semibold">任务描述</Text>
              <TextInput
                placeholder="例如：完成5道数学题"
                placeholderTextColor="#999"
                value={taskName}
                onChangeText={setTaskName}
                className="bg-surface border border-border rounded-lg p-4 text-foreground"
                multiline
                numberOfLines={3}
              />
            </View>

            {/* Duration Selection */}
            <View className="gap-3">
              <Text className="text-foreground font-semibold">专注时长</Text>
              <View className="flex-row gap-3">
                {[15, 25, 45].map((min) => (
                  <TouchableOpacity
                    key={min}
                    onPress={() => setDuration(min)}
                    className={`flex-1 py-3 rounded-lg border-2 items-center ${
                      duration === min
                        ? "bg-primary border-primary"
                        : "bg-surface border-border"
                    }`}
                  >
                    <Text
                      className={`font-semibold ${
                        duration === min ? "text-background" : "text-foreground"
                      }`}
                    >
                      {min}分钟
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            {/* Info */}
            <View className="bg-surface rounded-lg p-4">
              <Text className="text-muted text-sm">
                💡 在专注时间内，请关闭手机通知，全力投入学习。完成后，你将有机会开启盲盒！
              </Text>
            </View>
          </View>
        </ScrollView>

        {/* Start Button */}
        <TouchableOpacity
          onPress={handleStartFocus}
          className="w-full bg-primary py-4 rounded-full items-center mt-6"
        >
          <Text className="text-background font-bold text-lg">开始专注</Text>
        </TouchableOpacity>
      </ScreenContainer>
    );
  }

  // Timer Mode
  if (mode === "timer") {
    return (
      <ScreenContainer
        className="items-center justify-center"
        containerClassName="bg-gradient-to-b from-primary to-purple-600"
      >
        <View className="flex-1 items-center justify-center gap-8">
          {/* Time Display */}
          <Text className="text-9xl font-bold text-white">
            {formatTime(timeLeft)}
          </Text>

          {/* Task Name */}
          <View className="items-center gap-2">
            <Text className="text-white/80 text-sm">当前任务</Text>
            <Text className="text-white font-semibold text-lg text-center px-6">
              {taskName}
            </Text>
          </View>

          {/* Give Up Button */}
          <TouchableOpacity
            onPress={handleGiveUp}
            className="mt-auto mb-8 px-8 py-3 bg-white/20 rounded-full"
          >
            <Text className="text-white font-semibold">放弃</Text>
          </TouchableOpacity>
        </View>
      </ScreenContainer>
    );
  }

  // Judgment Mode
  if (mode === "judgment") {
    return (
      <ScreenContainer className="p-4">
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
          <View className="flex-1 items-center justify-center gap-8">
            {/* Celebration */}
            <View className="items-center gap-4">
              <Text className="text-7xl">🎉</Text>
              <Text className="text-3xl font-bold text-foreground text-center">
                恭喜完成专注！
              </Text>
              <Text className="text-muted text-center">
                请判定你的成果
              </Text>
            </View>

            {/* Task Summary */}
            <View className="w-full bg-surface rounded-xl p-4 gap-2">
              <View className="flex-row justify-between">
                <Text className="text-muted">任务</Text>
                <Text className="text-foreground font-semibold">{taskName}</Text>
              </View>
              <View className="h-px bg-border" />
              <View className="flex-row justify-between">
                <Text className="text-muted">专注时长</Text>
                <Text className="text-foreground font-semibold">{duration} 分钟</Text>
              </View>
            </View>
          </View>
        </ScrollView>

        {/* Action Buttons */}
        <View className="gap-3 mt-6">
          <TouchableOpacity
            onPress={handleCorrect}
            className="w-full bg-primary py-4 rounded-full items-center"
          >
            <Text className="text-white font-bold text-lg">
              🎁 我解开了谜题！
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={handleDetective}
            className="w-full bg-warning py-4 rounded-full items-center"
          >
            <Text className="text-white font-bold text-lg">
              🔍 开启侦探模式
            </Text>
          </TouchableOpacity>
        </View>
      </ScreenContainer>
    );
  }

  return null;
}
