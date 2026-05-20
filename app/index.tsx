import {
  StyleSheet,
  View,
  Text,
  Pressable,
  Animated,
  Dimensions,
} from "react-native";

import React, { useRef, useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { Feather, Ionicons } from "@expo/vector-icons";
import { useAppState } from "../hooks/use-app-state";

const { width } = Dimensions.get("window");

const slides = [
  {
    iconSet: "Feather",
    iconName: "alert-triangle",
    title: "Scammer are getting smarter",
    description:
      "Fraudulent calls and messages are becoming more sophisticated. Especially in Kazakhstan.",
    iconColor: "#E5484D",
    iconBg: "#FDECEC",
  },
  {
    iconSet: "Feather",
    iconName: "shield",
    title: "Your Protection",
    description:
      "The app identifies scammers, explains the reason for blocking, and teaches you how to protect yourself.",
    iconColor: "#4F46E5",
    iconBg: "#EEF2FF",
  },

  {
    iconSet: "Ionicons",
    iconName: "globe-outline",
    title: "For Kazakhstan",
    description:
      "Adapted for Kazakhstan: Kazakh and Russian languages, local fraud schemes.",
    iconColor: "#0EA5E9",
    iconBg: "#E0F2FE",
  },

  {
    iconSet: "Ionicons",
    iconName: "lock-closed-outline",
    title: "Your Data is Protected",
    description:
      "Some checks run directly on your device. Your privacy is our priority.",
    iconColor: "#16A34A",
    iconBg: "#EAF8EE",
  },
] as const;

export default function Onboarding() {
  const router = useRouter();
  const [currentSlide, setCurrentSlide] = useState(0);
  const { setHasCompletedOnboarding } = useAppState();
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const translateAnim = useRef(new Animated.Value(30)).current;
  const scaleAnim = useRef(new Animated.Value(0.9)).current;
  const slide = slides[currentSlide];
  useEffect(() => {
    fadeAnim.setValue(0);
    translateAnim.setValue(30);
    scaleAnim.setValue(0.9);
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 280,
        useNativeDriver: true,
      }),
      Animated.timing(translateAnim, {
        toValue: 0,
        duration: 280,
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        friction: 6,
        tension: 90,
        useNativeDriver: true,
      }),
    ]).start();
  }, [currentSlide, fadeAnim, translateAnim, scaleAnim]);
  const finishOnboarding = () => {
    setHasCompletedOnboarding(true);
    router.replace("/onboarding");
  };
  const handleNext = () => {
    if (currentSlide < slides.length - 1) {
      setCurrentSlide((prev) => prev + 1);
      return;
    }
    finishOnboarding();
  };
  const handlePrev = () => {
    if (currentSlide > 0) {
      setCurrentSlide((prev) => prev - 1);
    }
  };
  const renderSlideIcon = () => {
    if (slide.iconSet === "Feather") {
      return (
        <Feather
          name={slide.iconName as React.ComponentProps<typeof Feather>["name"]}
          size={64}
          color={slide.iconColor}
        />
      );
    }
    return (
      <Ionicons
        name={slide.iconName as React.ComponentProps<typeof Ionicons>["name"]}
        size={64}
        color={slide.iconColor}
      />
    );
  };
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={{ flex: 1 }}>
        <View style={styles.container}>
          <View style={styles.topBar}>
            <Pressable onPress={finishOnboarding} style={styles.skipButton}>
              <Text style={styles.skipText}>Skip</Text>
            </Pressable>
          </View>
          <View style={styles.content}>
            <Animated.View
              style={[
                styles.slideWrapper,
                {
                  opacity: fadeAnim,
                  transform: [{ translateX: translateAnim }],
                },
              ]}
            >
              <Animated.View
                style={[
                  styles.iconBox,
                  {
                    backgroundColor: slide.iconBg,
                    transform: [{ scale: scaleAnim }],
                  },
                ]}
              >
                {renderSlideIcon()}
              </Animated.View>
              <Text style={styles.title}>{slide.title}</Text>
              <Text style={styles.description}>{slide.description}</Text>
            </Animated.View>
          </View>
          <View style={styles.bottom}>
            <View style={styles.dotsRow}>
              {slides.map((_, index) => (
                <Pressable
                  key={index}
                  onPress={() => setCurrentSlide(index)}
                  style={[
                    styles.dot,
                    index === currentSlide
                      ? styles.activeDot
                      : styles.inactiveDot,
                  ]}
                />
              ))}
            </View>
            <View style={styles.navigationRow}>
              {currentSlide > 0 ? (
                <Pressable onPress={handlePrev} style={styles.backButton}>
                  <Feather name="chevron-left" size={20} color="#111827" />
                </Pressable>
              ) : (
                <View style={styles.backButtonPlaceholder} />
              )}
              <Pressable onPress={handleNext} style={styles.nextButton}>
                <Text style={styles.nextButtonText}>
                  {currentSlide === slides.length - 1 ? "Get Started" : "Next"}
                </Text>
                <Feather name="chevron-right" size={20} color="#FFFFFF" />
              </Pressable>
            </View>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#FFFFF",
  },
  container: {
    flex: 1,
    backgroundColor: "#FFFFF",
    paddingHorizontal: 24,
  },
  topBar: {
    paddingTop: 8,
    alignItems: "flex-end",
  },
  skipButton: {
    paddingVertical: 8,
    paddingHorizontal: 6,
  },
  skipText: {
    color: "#716D6A",
    fontSize: 15,
    fontWeight: "500",
  },
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  slideWrapper: {
    width: width - 48,
    alignItems: "center",
  },
  iconBox: {
    width: 128,
    height: 128,
    borderRadius: 28,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 32,
  },
  title: {
    fontSize: 28,
    lineHeight: 34,
    fontWeight: "700",
    color: "#black",
    textAlign: "center",
    marginBottom: 16,
  },
  description: {
    fontSize: 17,
    lineHeight: 26,
    color: "#716D6A",
    textAlign: "center",
    maxWidth: 310,
  },
  bottom: {
    paddingBottom: 24,
    paddingTop: 12,
  },
  dotsRow: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 28,
    gap: 8,
  },
  dot: {
    height: 8,
    borderRadius: 999,
  },
  activeDot: {
    width: 32,
    backgroundColor: "#FE9AA4",
  },
  inactiveDot: {
    width: 8,
    backgroundColor: "rgba(156, 163, 175, 0.35)",
  },
  navigationRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  backButton: {
    width: 56,
    height: 56,
    borderRadius: 16,
    backgroundColor: "#F3F4F6",
    justifyContent: "center",
    alignItems: "center",
  },
  backButtonPlaceholder: {
    width: 56,
  },
  nextButton: {
    flex: 1,
    height: 56,
    borderRadius: 16,
    backgroundColor: "#FE9AA4",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 8,
  },
  nextButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "700",
  },
});
