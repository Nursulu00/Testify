import React, { useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  Animated,
  Alert,
  ScrollView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";
import {
  Phone,
  MessageSquare,
  Bell,
  Shield,
  ChevronRight,
  Info,
} from "lucide-react-native";

const permissions = [
  {
    icon: Phone,
    title: "Access to Calls",
    description: "Identify incoming calls and warn about scammers",
  },
  {
    icon: MessageSquare,
    title: "Access to SMS",
    description: "Check messages for phishing links",
  },
  {
    icon: Bell,
    title: "Notifications",
    description: "Instantly warn about suspicious activity",
  },
];

export default function Permissions() {
  const [permissionStates, setPermissionStates] = useState(
    permissions.map(() => false),
  );

  const fadeAnim = useRef(new Animated.Value(0)).current;
  const headerY = useRef(new Animated.Value(-20)).current;
  const cardsOpacity = useRef(
    permissions.map(() => new Animated.Value(0)),
  ).current;
  const cardsY = useRef(permissions.map(() => new Animated.Value(20))).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 350,
        useNativeDriver: true,
      }),
      Animated.timing(headerY, {
        toValue: 0,
        duration: 350,
        useNativeDriver: true,
      }),
    ]).start();

    permissions.forEach((_, index) => {
      Animated.parallel([
        Animated.timing(cardsOpacity[index], {
          toValue: 1,
          duration: 300,
          delay: index * 100,
          useNativeDriver: true,
        }),
        Animated.timing(cardsY[index], {
          toValue: 0,
          duration: 300,
          delay: index * 100,
          useNativeDriver: true,
        }),
      ]).start();
    });
  }, []);

  const handleGrant = (index: number) => {
    const newStates = [...permissionStates];
    newStates[index] = true;
    setPermissionStates(newStates);
  };

  const handleContinue = () => {
    router.replace("/dashboard");
  };

  const handlePrivacyInfo = () => {
    Alert.alert(
      "About Data Protection",
      "We use permissions only for security functions. Your data is not shared without necessity.",
    );
  };

  const allGranted = permissionStates.every(Boolean);

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        {/* Header */}
        <Animated.View
          style={[
            styles.header,
            {
              opacity: fadeAnim,
              transform: [{ translateY: headerY }],
            },
          ]}
        >
          <View style={styles.headerRow}>
            <View style={styles.logoBox}>
              <Shield size={24} color="#FFFFFF" />
            </View>

            <View style={styles.headerTextBox}>
              <Text style={styles.headerTitle}>Setup Protection</Text>
              <Text style={styles.headerSubtitle}>
                Grant access for full protection
              </Text>
            </View>
          </View>
        </Animated.View>

        {/* Permissions list */}
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {permissions.map((permission, index) => {
            const IconComponent = permission.icon;
            const isGranted = permissionStates[index];

            return (
              <Animated.View
                key={index}
                style={[
                  styles.permissionCard,
                  isGranted && styles.permissionCardGranted,
                  {
                    opacity: cardsOpacity[index],
                    transform: [{ translateY: cardsY[index] }],
                  },
                ]}
              >
                <View style={styles.permissionRow}>
                  <View
                    style={[
                      styles.iconContainer,
                      isGranted
                        ? styles.iconContainerGranted
                        : styles.iconContainerDefault,
                    ]}
                  >
                    <IconComponent
                      size={24}
                      color={isGranted ? "#16A34A" : "#E594A3"}
                    />
                  </View>

                  <View style={styles.permissionTextBox}>
                    <Text style={styles.permissionTitle}>
                      {permission.title}
                    </Text>
                    <Text style={styles.permissionDescription}>
                      {permission.description}
                    </Text>
                  </View>

                  <Pressable
                    onPress={() => handleGrant(index)}
                    disabled={isGranted}
                    style={[
                      styles.grantButton,
                      isGranted
                        ? styles.grantButtonDone
                        : styles.grantButtonActive,
                    ]}
                  >
                    <Text
                      style={[
                        styles.grantButtonText,
                        isGranted && styles.grantButtonTextDone,
                      ]}
                    >
                      {isGranted ? "✓" : "Allow"}
                    </Text>
                  </Pressable>
                </View>
              </Animated.View>
            );
          })}
        </ScrollView>

        {/* Footer */}
        <View style={styles.footer}>
          <Pressable style={styles.infoButton} onPress={handlePrivacyInfo}>
            <Info size={16} color="#9CA3AF" />
            <Text style={styles.infoButtonText}>
              More about data protection
            </Text>
          </Pressable>

          <Pressable
            onPress={handleContinue}
            style={[
              styles.continueButton,
              allGranted
                ? styles.continueButtonActive
                : styles.continueButtonInactive,
            ]}
          >
            <Text
              style={[
                styles.continueButtonText,
                !allGranted && styles.continueButtonTextInactive,
              ]}
            >
              Continue
            </Text>
            <ChevronRight
              size={20}
              color={allGranted ? "#FFFFFF" : "#6B7280"}
            />
          </Pressable>
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
  header: {
    paddingTop: 12,
    paddingBottom: 20,
  },
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  logoBox: {
    width: 48,
    height: 48,
    borderRadius: 16,
    backgroundColor: "#FF9BA2",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  headerTextBox: {
    flex: 1,
  },
  headerTitle: {
    color: "#black",
    fontSize: 22,
    fontWeight: "700",
    marginBottom: 2,
  },
  headerSubtitle: {
    color: "#716D6A",
    fontSize: 14,
  },
  scrollContent: {
    paddingBottom: 20,
    gap: 14,
  },
  permissionCard: {
    backgroundColor: "#FFF6EF",
    borderWidth: 1,
    borderColor: "#FFF6EF",
    borderRadius: 20,
    padding: 16,
  },
  permissionCardGranted: {
    backgroundColor: "white",
    borderColor: "white",
  },
  permissionRow: {
    flexDirection: "row",
    alignItems: "flex-start",
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 14,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 14,
  },
  iconContainerDefault: {
    backgroundColor: "rgba(229, 148, 163, 0.2)",
  },
  iconContainerGranted: {
    backgroundColor: "white",
  },
  permissionTextBox: {
    flex: 1,
    paddingRight: 10,
  },
  permissionTitle: {
    color: "#black",
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 4,
  },
  permissionDescription: {
    color: "#716D6A",
    fontSize: 13,
    lineHeight: 18,
  },
  grantButton: {
    minHeight: 36,
    paddingHorizontal: 12,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
  },
  grantButtonActive: {
    backgroundColor: "#FE9AA4",
  },
  grantButtonDone: {
    backgroundColor: "rgba(22, 163, 74, 0.12)",
    borderWidth: 1,
    borderColor: "rgba(22, 163, 74, 0.35)",
  },
  grantButtonText: {
    color: "#FFFFFF",
    fontSize: 13,
    fontWeight: "600",
  },
  grantButtonTextDone: {
    color: "#16A34A",
  },
  footer: {
    paddingTop: 10,
    paddingBottom: 24,
    gap: 14,
  },
  infoButton: {
    height: 44,
    borderRadius: 14,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    gap: 8,
  },
  infoButtonText: {
    color: "#9CA3AF",
    fontSize: 14,
    fontWeight: "500",
  },
  continueButton: {
    height: 56,
    borderRadius: 16,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 8,
  },
  continueButtonActive: {
    backgroundColor: "#FF98A9",
  },
  continueButtonInactive: {
    backgroundColor: "#FAF5F2",
  },
  continueButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "700",
  },
  continueButtonTextInactive: {
    color: "#6B7280",
  },
});
