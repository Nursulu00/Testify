import React, { useState } from "react";
import {
  View,
  Text,
  Pressable,
  StyleSheet,
  TextInput,
  ScrollView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons, Feather } from "@expo/vector-icons";
import { router, useLocalSearchParams } from "expo-router";

import { BottomNav } from "../components/layout/BottomNav";

type TabType = "phone" | "sms";
type ResultStatus = "safe" | "warning" | "danger" | null;

export default function VerifyScreen() {
  const params = useLocalSearchParams();
  const initialTab: TabType = params.tab === "sms" ? "sms" : "phone";

  const [activeTab, setActiveTab] = useState<TabType>(initialTab);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [smsContent, setSmsContent] = useState("");
  const [isChecking, setIsChecking] = useState(false);
  const [result, setResult] = useState<ResultStatus>(null);
  const [resultDetails, setResultDetails] = useState<string[]>([]);

  const handleCheck = () => {
    setIsChecking(true);

    setTimeout(() => {
      const rand = Math.random();

      if (rand < 0.4) {
        setResult("danger");
        setResultDetails(["Phishing link detected", "Domain created recently"]);
      } else if (rand < 0.7) {
        setResult("warning");
        setResultDetails(["There are suspicious signs"]);
      } else {
        setResult("safe");
        setResultDetails(["No threats detected"]);
      }

      setIsChecking(false);
    }, 1200);
  };

  const reset = () => {
    setResult(null);
    setPhoneNumber("");
    setSmsContent("");
  };

  const handleReport = () => {
    router.push({
      pathname: "/report" as any,
      params: {
        phone: phoneNumber,
        type: activeTab,
      },
    });
  };

  const isDisabled =
    activeTab === "phone"
      ? phoneNumber.trim().length === 0
      : smsContent.trim().length === 0;

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.screen}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={[styles.container, { paddingBottom: 120 }]}
        >
          <Text style={styles.title}>Check</Text>
          <Text style={styles.subtitle}>
            Check a phone number or message for fraud
          </Text>

          {/* Tabs */}
          <View style={styles.tabsWrapper}>
            <Pressable
              style={[styles.tab, activeTab === "phone" && styles.tabActive]}
              onPress={() => {
                setActiveTab("phone");
                reset();
              }}
            >
              <Feather name="phone" size={22} />
              <Text>Phone Number</Text>
            </Pressable>

            <Pressable
              style={[styles.tab, activeTab === "sms" && styles.tabActive]}
              onPress={() => {
                setActiveTab("sms");
                reset();
              }}
            >
              <Feather name="message-square" size={22} />
              <Text>SMS / Link</Text>
            </Pressable>
          </View>

          {/* INPUT */}
          {!result && (
            <>
              {activeTab === "phone" ? (
                <TextInput
                  placeholder="+7 (___) ___ __ __"
                  value={phoneNumber}
                  onChangeText={setPhoneNumber}
                  style={styles.input}
                />
              ) : (
                <TextInput
                  placeholder="Enter message or link"
                  value={smsContent}
                  onChangeText={setSmsContent}
                  style={[styles.input, { height: 100 }]}
                  multiline
                />
              )}

              <Pressable
                style={[styles.mainButton, isDisabled && { opacity: 0.5 }]}
                onPress={handleCheck}
                disabled={isDisabled}
              >
                <Text style={styles.mainButtonText}>
                  {isChecking ? "Checking..." : "Check"}
                </Text>
              </Pressable>
            </>
          )}

          {/* RESULT UI */}
          {result && (
            <View style={styles.resultCard}>
              <View style={styles.iconWrapper}>
                <View style={styles.iconCircle}>
                  <Ionicons name="close" size={30} color="#F0646A" />
                </View>
              </View>

              <Text style={styles.resultTitle}>
                {result === "danger"
                  ? "Dangerous!"
                  : result === "warning"
                    ? "Suspicious"
                    : "Safe"}
              </Text>

              <View style={styles.detailsWrap}>
                {resultDetails.map((d, i) => (
                  <Text key={i} style={styles.resultDetail}>
                    • {d}
                  </Text>
                ))}
              </View>

              <View style={styles.actionsRow}>
                <Pressable style={styles.secondary} onPress={reset}>
                  <Text>Reset</Text>
                </Pressable>

                {result !== "safe" && (
                  <Pressable style={styles.primary} onPress={handleReport}>
                    <Text style={{ color: "#fff" }}>Report</Text>
                  </Pressable>
                )}
              </View>
            </View>
          )}
        </ScrollView>

        <BottomNav />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: "#FFFFFF" },
  screen: { flex: 1 },

  container: {
    padding: 20,
    gap: 16,
  },

  title: { fontSize: 28, fontWeight: "800" },
  subtitle: { color: "#666" },

  tabsWrapper: {
    flexDirection: "row",
    backgroundColor: "#eee",
    borderRadius: 16,
    padding: 6,
  },

  tab: {
    flex: 1,
    alignItems: "center",
    padding: 12,
    borderRadius: 12,
  },

  tabActive: {
    backgroundColor: "#fff",
  },

  input: {
    backgroundColor: "#f5f5f5",
    padding: 14,
    borderRadius: 12,
  },

  mainButton: {
    backgroundColor: "#F08DA2",
    padding: 16,
    borderRadius: 14,
    alignItems: "center",
  },

  mainButtonText: {
    color: "#fff",
    fontWeight: "700",
  },

  /* RESULT CARD */
  resultCard: {
    backgroundColor: "#FDECEC",
    borderRadius: 24,
    padding: 24,
    alignItems: "center",
  },

  iconWrapper: {
    width: 90,
    height: 90,
    borderRadius: 45,
    backgroundColor: "#FAD4D6",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 12,
  },

  iconCircle: {
    width: 50,
    height: 50,
    borderRadius: 25,
    borderWidth: 2,
    borderColor: "#F0646A",
    alignItems: "center",
    justifyContent: "center",
  },

  resultTitle: {
    fontSize: 22,
    fontWeight: "800",
    color: "#F0646A",
    marginBottom: 10,
  },

  detailsWrap: {
    alignItems: "center",
    marginBottom: 14,
  },

  resultDetail: {
    fontSize: 15,
    color: "#555",
  },

  actionsRow: {
    flexDirection: "row",
    gap: 10,
    width: "100%",
  },

  primary: {
    flex: 1,
    backgroundColor: "#F08DA2",
    padding: 14,
    borderRadius: 12,
    alignItems: "center",
  },

  secondary: {
    flex: 1,
    backgroundColor: "#EAEAEA",
    padding: 14,
    borderRadius: 12,
    alignItems: "center",
  },
});
