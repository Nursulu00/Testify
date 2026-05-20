import React from "react";
import { View, Text, Pressable, StyleSheet } from "react-native";
import { router, usePathname, type Href } from "expo-router";
import { Home, Search, BookOpen, Settings, Mic } from "lucide-react-native";

type NavItem = {
  icon: React.ComponentType<{ size: number; color: string }>;
  label: string;
  path: string;
};

const navItems: NavItem[] = [
  { icon: Home, label: "Home", path: "/dashboard" },
  { icon: Mic, label: "AI", path: "/live-monitor" },
  { icon: Search, label: "Check", path: "/verify" },
  { icon: BookOpen, label: "Learn", path: "/education" },
  { icon: Settings, label: "Settings", path: "/settings" },
];

export function BottomNav() {
  const pathname = usePathname();

  return (
    <View style={styles.wrapper}>
      <View style={styles.container}>
        {navItems.map((item) => {
          const isActive = pathname === item.path;
          const Icon = item.icon;

          return (
            <Pressable
              key={String(item.path)}
              onPress={() => router.replace(item.path as Href)}
              style={[styles.item, isActive && styles.activeItem]}
            >
              <Icon size={20} color={isActive ? "#FF8FA3" : "#C1C1C1"} />
              <Text
                style={[
                  styles.label,
                  { color: isActive ? "#FF8FA3" : "#C1C1C1" },
                ]}
              >
                {item.label}
              </Text>
            </Pressable>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "transparent",
  },
  container: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    paddingTop: 10,
    paddingBottom: 16,
    paddingHorizontal: 12,
    backgroundColor: "#FFFFFF",
    borderTopWidth: 1,
    borderTopColor: "rgba(0,0,0,0.06)",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.08,
    shadowRadius: 10,
    elevation: 12,
  },
  item: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 14,
    minWidth: 62,
  },
  activeItem: {
    backgroundColor: "rgba(255, 143, 163, 0.10)",
  },
  label: {
    marginTop: 4,
    fontSize: 11,
    fontWeight: "500",
  },
});
