import React, { useState } from "react";
import { ScrollView, StyleSheet, Text, View, Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";
import { Ionicons, Feather } from "@expo/vector-icons";
import { BottomNav } from "../components/layout/BottomNav";

type ActionStatus = "danger" | "warning" | "safe";

interface RecentAction {
  id: string;
  type: "call_blocked" | "sms_verified" | "link_checked";
  title: string;
  description: string;
  status: ActionStatus;
  timestamp: Date;
}

export default function DashboardScreen() {
  const [isProtectionEnabled, setIsProtectionEnabled] = useState(true);

  const [stats] = useState({
    blockedCalls: 12,
    verifiedMessages: 28,
    reportsSent: 5,
  });

  const [recentActions] = useState<RecentAction[]>([
    {
      id: "1",
      type: "call_blocked",
      title: "Call is blocked",
      description: "+7 701 *** ** 23 (commonly reported)",
      status: "danger",
      timestamp: new Date(Date.now() - 1000 * 60 * 30),
    },
    {
      id: "2",
      type: "sms_verified",
      title: "SMS Verified",
      description: "Phishing link detected",
      status: "warning",
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2),
    },
    {
      id: "3",
      type: "link_checked",
      title: "Link is safe",
      description: "kaspi.kz — official website",
      status: "safe",
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 5),
    },
  ]);

  const toggleProtection = () => {
    setIsProtectionEnabled((prev) => !prev);
  };

  const getStatusColors = (status: ActionStatus) => {
    switch (status) {
      case "danger":
        return {
          bg: "rgba(255, 107, 107, 0.12)",
          text: "#FF6B6B",
          badgeBg: "rgba(255, 107, 107, 0.10)",
          badgeText: "#FF6B6B",
          label: "Danger",
        };
      case "warning":
        return {
          bg: "rgba(255, 199, 95, 0.12)",
          text: "#FFC75F",
          badgeBg: "rgba(255, 199, 95, 0.10)",
          badgeText: "#D4940A",
          label: "Warning",
        };
      case "safe":
        return {
          bg: "rgba(107, 203, 119, 0.12)",
          text: "#6BCB77",
          badgeBg: "rgba(107, 203, 119, 0.10)",
          badgeText: "#2D8A40",
          label: "Safe",
        };
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={{ flex: 1 }}>
        <ScrollView
          style={styles.container}
          contentContainerStyle={[
            styles.contentContainer,
            { paddingBottom: 120 }, // IMPORTANT
          ]}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.headerRow}>
            <View>
              <Text style={styles.appTitle}>Testify</Text>
              <Text style={styles.appSubtitle}>Protection from Scammers</Text>
            </View>

            <View
              style={[
                styles.statusPill,
                {
                  backgroundColor: isProtectionEnabled ? "#D8F3DC" : "#FFE0E0",
                },
              ]}
            >
              <Text
                style={[
                  styles.statusPillText,
                  { color: isProtectionEnabled ? "#2D6A4F" : "#D00000" },
                ]}
              >
                {isProtectionEnabled ? "Active" : "Disabled"}
              </Text>
            </View>
          </View>

          <View style={styles.protectionCard}>
            <View style={styles.protectionDecorBig} />
            <View style={styles.protectionDecorSmall} />

            <View style={styles.protectionContent}>
              <View style={styles.shieldIconBox}>
                {isProtectionEnabled ? (
                  <Feather name="shield" size={32} color="#FFFFFF" />
                ) : (
                  <Feather name="shield-off" size={32} color="#FFFFFF" />
                )}
              </View>

              <View style={styles.protectionTextBox}>
                <Text style={styles.protectionTitle}>
                  {isProtectionEnabled
                    ? "Protection is active"
                    : "Protection is disabled"}
                </Text>
                <Text style={styles.protectionSubtitle}>
                  {isProtectionEnabled
                    ? "You are protected from scammers"
                    : "Enable for security"}
                </Text>
              </View>

              <Pressable style={styles.toggleButton} onPress={toggleProtection}>
                <Text style={styles.toggleButtonText}>
                  {isProtectionEnabled
                    ? "Disable protection"
                    : "Enable protection"}
                </Text>
              </Pressable>
            </View>
          </View>

          <View style={styles.featureGrid}>
            <Pressable
              style={styles.featureCard}
              onPress={() => router.push({ pathname: "/verify" as any })}
            >
              <View
                style={[
                  styles.featureIconBox,
                  { backgroundColor: "rgba(255, 123, 84, 0.12)" },
                ]}
              >
                <Feather name="phone" size={20} color="#FF7B54" />
              </View>
              <Text style={styles.featureTitle}>Verify Number</Text>
              <Text style={styles.featureSubtitle}>Learn about the caller</Text>
            </Pressable>

            <Pressable
              style={styles.featureCard}
              onPress={() =>
                router.push({
                  pathname: "/verify" as any,
                  params: { tab: "sms" },
                })
              }
            >
              <View
                style={[
                  styles.featureIconBox,
                  { backgroundColor: "rgba(255, 199, 95, 0.15)" },
                ]}
              >
                <Feather name="message-square" size={20} color="#FFC75F" />
              </View>
              <Text style={styles.featureTitle}>Verify SMS</Text>
              <Text style={styles.featureSubtitle}>Links and Messages</Text>
            </Pressable>
          </View>

          <View style={styles.statsCard}>
            <View style={styles.statsHeader}>
              <Text style={styles.sectionHeading}>Statistics</Text>
              <Text style={styles.sectionMeta}>This month</Text>
            </View>

            <View style={styles.statsGrid}>
              <View
                style={[
                  styles.statItem,
                  { backgroundColor: "rgba(255, 107, 107, 0.1)" },
                ]}
              >
                <Text style={[styles.statValue, { color: "#FF6B6B" }]}>
                  {stats.blockedCalls}
                </Text>
                <Text style={styles.statLabel}>Blocked</Text>
              </View>

              <View
                style={[
                  styles.statItem,
                  { backgroundColor: "rgba(107, 203, 119, 0.1)" },
                ]}
              >
                <Text style={[styles.statValue, { color: "#6BCB77" }]}>
                  {stats.verifiedMessages}
                </Text>
                <Text style={styles.statLabel}>Verified</Text>
              </View>

              <View
                style={[
                  styles.statItem,
                  { backgroundColor: "rgba(255, 199, 95, 0.1)" },
                ]}
              >
                <Text style={[styles.statValue, { color: "#FFC75F" }]}>
                  {stats.reportsSent}
                </Text>
                <Text style={styles.statLabel}>Reports</Text>
              </View>
            </View>
          </View>

          <Pressable
            style={styles.familyCard}
            onPress={() => router.push("/family-plan")}
          >
            <View style={styles.familyIconBox}>
              <Feather name="users" size={24} color="#FFFFFF" />
            </View>

            <View style={styles.familyTextBox}>
              <Text style={styles.familyTitle}>Family Plan</Text>
              <Text style={styles.familySubtitle}>
                Protect up to 5 loved ones with one subscription
              </Text>
            </View>

            <Feather name="chevron-right" size={20} color="#94A3B8" />
          </Pressable>

          <View style={styles.recentSection}>
            <View style={styles.recentHeader}>
              <View style={styles.recentHeaderLeft}>
                <Feather name="clock" size={16} color="#64748B" />
                <Text style={styles.sectionHeading}>Recent Actions</Text>
              </View>

              <Pressable style={styles.historyButton}>
                <Text style={styles.historyButtonText}>History</Text>
                <Feather name="chevron-right" size={14} color="#2563EB" />
              </Pressable>
            </View>

            <View style={styles.recentList}>
              {recentActions.slice(0, 3).map((action) => {
                const colors = getStatusColors(action.status);

                return (
                  <View key={action.id} style={styles.recentCard}>
                    <View
                      style={[
                        styles.recentIconBox,
                        { backgroundColor: colors.bg },
                      ]}
                    >
                      <Ionicons
                        name="warning-outline"
                        size={20}
                        color={colors.text}
                      />
                    </View>

                    <View style={styles.recentTextBox}>
                      <Text style={styles.recentTitle} numberOfLines={1}>
                        {action.title}
                      </Text>
                      <Text style={styles.recentDescription} numberOfLines={1}>
                        {action.description}
                      </Text>
                    </View>

                    <View
                      style={[
                        styles.badge,
                        { backgroundColor: colors.badgeBg },
                      ]}
                    >
                      <Text
                        style={[styles.badgeText, { color: colors.badgeText }]}
                      >
                        {colors.label}
                      </Text>
                    </View>
                  </View>
                );
              })}
            </View>
          </View>
        </ScrollView>
        <BottomNav />
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
  },
  contentContainer: {
    padding: 20,
    paddingBottom: 32,
  },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 24,
  },
  appTitle: {
    fontSize: 28,
    fontWeight: "800",
    color: "#1F2937",
  },
  appSubtitle: {
    marginTop: 4,
    fontSize: 14,
    color: "#6B7280",
  },
  statusPill: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 999,
  },
  statusPillText: {
    fontSize: 12,
    fontWeight: "700",
  },
  protectionCard: {
    position: "relative",
    overflow: "hidden",
    borderRadius: 28,
    padding: 24,
    backgroundColor: "#FE9AA4",
    marginBottom: 16,
  },
  protectionDecorBig: {
    position: "absolute",
    right: -30,
    top: -30,
    width: 130,
    height: 130,
    borderRadius: 65,
    backgroundColor: "rgba(255,255,255,0.25)",
  },
  protectionDecorSmall: {
    position: "absolute",
    left: -12,
    bottom: -12,
    width: 90,
    height: 90,
    borderRadius: 45,
    backgroundColor: "rgba(255,255,255,0.18)",
  },
  protectionContent: {
    alignItems: "center",
  },
  shieldIconBox: {
    width: 64,
    height: 64,
    borderRadius: 20,
    backgroundColor: "rgba(255,255,255,0.25)",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 12,
  },
  protectionTextBox: {
    alignItems: "center",
    marginBottom: 12,
  },
  protectionTitle: {
    fontSize: 22,
    fontWeight: "800",
    color: "#FFFFFF",
    marginBottom: 4,
  },
  protectionSubtitle: {
    fontSize: 14,
    color: "rgba(255,255,255,0.85)",
  },
  toggleButton: {
    marginTop: 8,
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 18,
  },
  toggleButtonText: {
    color: "#FF6B6B",
    fontSize: 14,
    fontWeight: "700",
  },
  featureGrid: {
    flexDirection: "row",
    gap: 12,
    marginBottom: 16,
  },
  featureCard: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    padding: 16,
    shadowColor: "#E8B7A5",
    shadowOpacity: 0.18,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    elevation: 3,
  },
  featureIconBox: {
    width: 40,
    height: 40,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 12,
  },
  featureTitle: {
    fontSize: 14,
    fontWeight: "700",
    color: "#1F2937",
  },
  featureSubtitle: {
    marginTop: 4,
    fontSize: 12,
    color: "#6B7280",
  },
  statsCard: {
    backgroundColor: "#FFFDF9",
    borderRadius: 20,
    padding: 16,
    marginBottom: 16,
  },
  statsHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 12,
    alignItems: "center",
  },
  sectionHeading: {
    fontSize: 16,
    fontWeight: "700",
    color: "#1F2937",
  },
  sectionMeta: {
    fontSize: 12,
    color: "#6B7280",
  },
  statsGrid: {
    flexDirection: "row",
    gap: 8,
  },
  statItem: {
    flex: 1,
    borderRadius: 14,
    paddingVertical: 14,
    paddingHorizontal: 8,
    alignItems: "center",
  },
  statValue: {
    fontSize: 24,
    fontWeight: "800",
  },
  statLabel: {
    marginTop: 4,
    fontSize: 12,
    color: "#6B7280",
    textAlign: "center",
  },
  familyCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    padding: 16,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "#F1E7E1",
  },
  familyIconBox: {
    width: 48,
    height: 48,
    borderRadius: 14,
    backgroundColor: "#FE9AA4",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 14,
  },
  familyTextBox: {
    flex: 1,
  },
  familyTitle: {
    fontSize: 14,
    fontWeight: "700",
    color: "#1F2937",
  },
  familySubtitle: {
    marginTop: 4,
    fontSize: 12,
    color: "#6B7280",
  },
  recentSection: {
    marginTop: 4,
  },
  recentHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 12,
  },
  recentHeaderLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  historyButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 2,
  },
  historyButtonText: {
    fontSize: 12,
    fontWeight: "600",
    color: "#2563EB",
  },
  recentList: {
    gap: 8,
  },
  recentCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 14,
    padding: 12,
    flexDirection: "row",
    alignItems: "center",
    shadowColor: "#E8B7A5",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  recentIconBox: {
    width: 40,
    height: 40,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  recentTextBox: {
    flex: 1,
  },
  recentTitle: {
    fontSize: 14,
    fontWeight: "600",
    color: "#1F2937",
  },
  recentDescription: {
    marginTop: 2,
    fontSize: 12,
    color: "#6B7280",
  },
  badge: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 999,
    marginLeft: 8,
  },
  badgeText: {
    fontSize: 11,
    fontWeight: "700",
  },
});
