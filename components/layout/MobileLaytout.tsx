import React, { ReactNode, useEffect, useRef } from "react";
import { View, StyleSheet, Animated, ViewStyle, StyleProp } from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";

import { BottomNav } from "./BottomNav";

interface MobileLayoutProps {
  children: ReactNode;
  showNav?: boolean;
  contentStyle?: StyleProp<ViewStyle>;
}

export function MobileLayout({
  children,
  showNav = true,
  contentStyle,
}: MobileLayoutProps) {
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 220,
      useNativeDriver: true,
    }).start();
  }, [fadeAnim]);

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Animated.View
          style={[
            styles.main,
            showNav && styles.mainWithNav,
            contentStyle,
            { opacity: fadeAnim },
          ]}
        >
          {children}
        </Animated.View>

        {showNav && <BottomNav />}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#0B0F1A",
  },
  container: {
    flex: 1,
    backgroundColor: "#0B0F1A",
    position: "relative",
  },
  main: {
    flex: 1,
  },
  mainWithNav: {
    paddingBottom: 88,
  },
});
