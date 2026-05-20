import React, { useState } from "react";
import {
  View,
  Text,
  Pressable,
  StyleSheet,
  TextInput,
  Alert,
  ScrollView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { router, useLocalSearchParams } from "expo-router";
import { Feather } from "@expo/vector-icons";
import { BottomNav } from "../components/layout/BottomNav"; // adjust path
type ReportType = "call" | "sms";
type FraudCategory = "bank" | "egov" | "package" | "lottery" | "other";

const categories = [
  { value: "bank", label: "Bank", icon: "home" },
  { value: "egov", label: "eGov", icon: "credit-card" },
  { value: "package", label: "Package", icon: "package" },
  { value: "lottery", label: "Lottery", icon: "gift" },
  { value: "other", label: "Other", icon: "help-circle" },
];

export default function ReportScreen() {
  const params = useLocalSearchParams();
  const initialPhone = typeof params.phone === "string" ? params.phone : "";
  const initialType =
    params.type === "sms" || params.type === "call" ? params.type : "call";

  const [phoneNumber, setPhoneNumber] = useState(initialPhone);
  const [reportType, setReportType] = useState<ReportType>(initialType);
  const [category, setCategory] = useState<FraudCategory | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async () => {
    if (!phoneNumber || !category) return;

    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);

      Alert.alert("Success", "Reports are sent anonymously.");
    }, 1500);
  };

  // ✅ SUCCESS SCREEN
  if (isSubmitted) {
    return (
      <SafeAreaView style={styles.safe}>
        <View style={styles.center}>
          <View style={styles.successIcon}>
            <Feather name="check-circle" size={48} color="#16A34A" />
          </View>

          <Text style={styles.successTitle}>Thank you!</Text>

          <Text style={styles.successText}>
            Your report will help protect other users
          </Text>

          <Pressable
            style={styles.primaryBtn}
            onPress={() => router.replace("/dashboard")}
          >
            <Text style={styles.primaryText}>Return to Main</Text>
          </Pressable>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safe}>
      <View style={{ flex: 1 }}>
        <ScrollView
          contentContainerStyle={[styles.container, { paddingBottom: 120 }]}
        >
          {/* Header */}
          <Text style={styles.title}>Report a Scammer</Text>
          <Text style={styles.subtitle}>Help protect other users</Text>

          {/* Phone */}
          <View>
            <Text style={styles.label}>Phone Number</Text>
            <View style={styles.inputBox}>
              <Feather name="phone" size={18} color="#6B7280" />
              <TextInput
                placeholder="+7 (___) ___ __ __"
                value={phoneNumber}
                onChangeText={setPhoneNumber}
                style={styles.input}
                keyboardType="phone-pad"
              />
            </View>
          </View>

          {/* Type */}
          <View>
            <Text style={styles.label}>Report Type</Text>
            <View style={styles.row}>
              {["call", "sms"].map((type) => (
                <Pressable
                  key={type}
                  style={[
                    styles.option,
                    reportType === type && styles.optionActive,
                  ]}
                  onPress={() => setReportType(type as ReportType)}
                >
                  <Feather
                    name={type === "call" ? "phone" : "message-square"}
                    size={18}
                    color={reportType === type ? "#FE9AA4" : "#6B7280"}
                  />
                  <Text
                    style={[
                      styles.optionText,
                      reportType === type && styles.optionTextActive,
                    ]}
                  >
                    {type === "call" ? "Call" : "SMS"}
                  </Text>
                </Pressable>
              ))}
            </View>
          </View>

          {/* Category */}
          <View>
            <Text style={styles.label}>Category</Text>

            <View style={styles.grid}>
              {categories.map((cat) => (
                <Pressable
                  key={cat.value}
                  style={[
                    styles.catCard,
                    category === cat.value && styles.catActive,
                  ]}
                  onPress={() => setCategory(cat.value as FraudCategory)}
                >
                  <Feather
                    name={cat.icon as any}
                    size={20}
                    color={category === cat.value ? "#FE9AA4" : "#6B7280"}
                  />
                  <Text style={styles.catText}>{cat.label}</Text>
                </Pressable>
              ))}
            </View>
          </View>

          {/* Submit */}
          <Pressable
            style={[
              styles.submit,
              (!phoneNumber || !category) && { opacity: 0.5 },
            ]}
            disabled={!phoneNumber || !category || isSubmitting}
            onPress={handleSubmit}
          >
            <Text style={styles.submitText}>
              {isSubmitting ? "Отправляем..." : "Отправить жалобу"}
            </Text>
          </Pressable>

          <Text style={styles.footer}>Данные отправляются анонимно</Text>
        </ScrollView>
        <BottomNav />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: "#FFFFFF" },
  container: { padding: 20, gap: 18 },

  title: { fontSize: 24, fontWeight: "800" },
  subtitle: { fontSize: 14, color: "#6B7280" },

  label: { fontSize: 14, fontWeight: "600" },

  inputBox: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    backgroundColor: "#fff",
    padding: 14,
    borderRadius: 14,
  },
  input: { flex: 1 },

  row: { flexDirection: "row", gap: 10 },

  option: {
    flex: 1,
    padding: 14,
    borderRadius: 12,
    backgroundColor: "#fff",
    alignItems: "center",
    gap: 6,
  },
  optionActive: {
    borderWidth: 1,
    borderColor: "#FE9AA4",
    backgroundColor: "#FEE2E2",
  },
  optionText: { fontSize: 13 },
  optionTextActive: { color: "#FE9AA4" },

  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
  },
  catCard: {
    width: "30%",
    padding: 12,
    borderRadius: 12,
    backgroundColor: "#fff",
    alignItems: "center",
    gap: 6,
  },
  catActive: {
    borderWidth: 1,
    borderColor: "#FE9AA4",
    backgroundColor: "#E0F2FE",
  },
  catText: { fontSize: 12 },

  submit: {
    backgroundColor: "#FFFFFF",
    padding: 16,
    borderRadius: 14,
    alignItems: "center",
  },
  submitText: {
    color: "#fff",
    fontWeight: "700",
  },

  footer: {
    textAlign: "center",
    fontSize: 11,
    color: "#6B7280",
  },

  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  successIcon: {
    backgroundColor: "#DCFCE7",
    padding: 20,
    borderRadius: 50,
    marginBottom: 20,
  },
  successTitle: {
    fontSize: 24,
    fontWeight: "800",
    marginBottom: 8,
  },
  successText: {
    textAlign: "center",
    marginBottom: 20,
    color: "#6B7280",
  },

  primaryBtn: {
    backgroundColor: "#FE9AA4",
    padding: 14,
    borderRadius: 12,
  },
  primaryText: {
    color: "#fff",
    fontWeight: "700",
  },
});
