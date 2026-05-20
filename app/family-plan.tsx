import React from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  Pressable,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { Feather, Ionicons } from "@expo/vector-icons";

const benefits = [
  { icon: "bell", label: "General scammers notification system" },
  { icon: "users", label: "Protection for parents and loved ones" },
  { icon: "database", label: "Shared database of suspicious numbers" },
  { icon: "smartphone", label: "Single subscription for multiple devices" },
];

const familyMembers = ["Mom", "Dad", "Sister", "Brother", "Grandmother"];

export default function FamilyPlanScreen() {
  const navigation = useNavigation<any>();

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView contentContainerStyle={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <Pressable
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <Feather name="arrow-left" size={20} color="#1F2937" />
          </Pressable>

          <Text style={styles.title}>Family Plan</Text>
        </View>

        {/* Hero */}
        <View style={styles.hero}>
          <Feather name="shield" size={48} color="#fff" />
          <Text style={styles.heroTitle}>Protect Your Entire Family</Text>
          <Text style={styles.heroText}>
            Suspicious calls detected by one family member will alert all
          </Text>
        </View>

        {/* Family Graph */}
        <View style={styles.familyBox}>
          <Text style={styles.sectionTitle}>Your Family Group</Text>

          <View style={styles.familyCenter}>
            <View style={styles.mainAccount}>
              <Feather name="shield" size={30} color="#fff" />
            </View>
            <Text style={styles.mainLabel}>Main Account</Text>
          </View>

          <View style={styles.familyMembers}>
            {familyMembers.map((m) => (
              <View key={m} style={styles.member}>
                <View style={styles.memberIcon}>
                  <Feather name="user" size={18} color="#E594A3" />
                </View>
                <Text style={styles.memberText}>{m}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Benefits */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Benefits</Text>

          {benefits.map((b, i) => (
            <View key={i} style={styles.benefitCard}>
              <View style={styles.benefitIcon}>
                <Feather name={b.icon as any} size={20} color="#E594A3" />
              </View>
              <Text style={styles.benefitText}>{b.label}</Text>
            </View>
          ))}
        </View>

        {/* CTA */}
        <Pressable
          style={styles.cta}
          onPress={() =>
            Alert.alert(
              "Thank you for your interest!",
              "The family plan will be available soon.",
            )
          }
        >
          <Text style={styles.ctaText}>Go to Family Plan</Text>
        </Pressable>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  container: {
    padding: 20,
    gap: 20,
  },

  header: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  backButton: {
    padding: 10,
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
  },
  title: {
    fontSize: 20,
    fontWeight: "700",
    color: "#1F2937",
  },

  hero: {
    backgroundColor: "#FE9AA4",
    borderRadius: 24,
    padding: 24,
    alignItems: "center",
  },
  heroTitle: {
    fontSize: 20,
    fontWeight: "800",
    color: "#fff",
    marginTop: 10,
  },
  heroText: {
    fontSize: 13,
    color: "#fff",
    textAlign: "center",
    marginTop: 6,
  },

  familyBox: {
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 20,
  },
  familyCenter: {
    alignItems: "center",
    marginBottom: 16,
  },
  mainAccount: {
    width: 60,
    height: 60,
    borderRadius: 16,
    backgroundColor: "#FE9AA4",
    alignItems: "center",
    justifyContent: "center",
  },
  mainLabel: {
    marginTop: 6,
    fontSize: 12,
  },

  familyMembers: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: 10,
  },
  member: {
    alignItems: "center",
  },
  memberIcon: {
    width: 40,
    height: 40,
    borderRadius: 10,
    backgroundColor: "#FEE2E2",
    alignItems: "center",
    justifyContent: "center",
  },
  memberText: {
    fontSize: 11,
    marginTop: 4,
  },

  section: {
    gap: 10,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#1F2937",
    paddingBottom: 20,
  },

  benefitCard: {
    flexDirection: "row",
    alignItems: "center",
    gap: 7,
    padding: 12,
    borderRadius: 16,
    backgroundColor: "#fff",
  },
  benefitIcon: {
    width: 40,
    height: 40,
    borderRadius: 10,
    backgroundColor: "#FEE2E2",
    alignItems: "center",
    justifyContent: "center",
  },
  benefitText: {
    fontSize: 14,
    color: "#1F2937",
  },

  cta: {
    marginTop: 10,
    backgroundColor: "#FE9AA4",
    padding: 16,
    borderRadius: 16,
    alignItems: "center",
  },
  ctaText: {
    color: "#fff",
    fontWeight: "700",
  },
});
