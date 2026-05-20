import React, { useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  Pressable,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Feather } from "@expo/vector-icons";

import { BottomNav } from "../components/layout/BottomNav";

/* ✅ TRANSLATIONS */
const translations = {
  en: {
    settings: "Settings",
    subtitle: "Personalization and Security",
    language: "Language",
    protection: "Protection Level",
    high: "High",
    medium: "Medium",
    low: "Low",
    highDesc: "Block all suspicious calls",
    mediumDesc: "Warn about suspicious calls",
    lowDesc: "Only block obvious fraud",
    whitelist: "White List of Numbers",
    whitelistDesc: "Numbers that are not blocked",
    clear: "Clear History",
    clearDesc: "Delete all records",
    privacy: "Privacy Policy",
    privacyDesc: "How we protect your data",
    contact: "Contact Team",
    contactDesc: "Support",
    cleared: "History cleared",
  },
  ru: {
    settings: "Настройки",
    subtitle: "Персонализация и безопасность",
    language: "Язык",
    protection: "Уровень защиты",
    high: "Высокий",
    medium: "Средний",
    low: "Низкий",
    highDesc: "Блокировать все подозрительные звонки",
    mediumDesc: "Предупреждать о подозрительных звонках",
    lowDesc: "Блокировать только явный мошенничество",
    whitelist: "Белый список",
    whitelistDesc: "Номера, которые не блокируются",
    clear: "Очистить историю",
    clearDesc: "Удалить все записи",
    privacy: "Политика конфиденциальности",
    privacyDesc: "Как мы защищаем ваши данные",
    contact: "Связаться с командой",
    contactDesc: "Поддержка",
    cleared: "История очищена",
  },
  kk: {
    settings: "Баптаулар",
    subtitle: "Жекелендіру және қауіпсіздік",
    language: "Тіл",
    protection: "Қорғаныс деңгейі",
    high: "Жоғары",
    medium: "Орташа",
    low: "Төмен",
    highDesc: "Барлық күмәнді қоңырауларды бұғаттау",
    mediumDesc: "Күмәнді қоңыраулар туралы ескерту",
    lowDesc: "Тек анық алаяқтықты бұғаттау",
    whitelist: "Ақ тізім",
    whitelistDesc: "Бұғатталмайтын нөмірлер",
    clear: "Тарихты тазалау",
    clearDesc: "Барлық жазбаларды жою",
    privacy: "Құпиялылық саясаты",
    privacyDesc: "Деректерді қалай қорғаймыз",
    contact: "Командамен байланыс",
    contactDesc: "Қолдау",
    cleared: "Тарих тазартылды",
  },
};

export default function SettingsScreen() {
  const [language, setLanguage] = useState<"ru" | "kk" | "en">("en");
  const [protectionLevel, setProtectionLevel] = useState<
    "high" | "medium" | "low"
  >("high");

  const t = translations[language];

  const handleClearHistory = () => {
    Alert.alert("✔", t.cleared);
  };

  return (
    <SafeAreaView style={styles.safe}>
      <View style={{ flex: 1 }}>
        <ScrollView contentContainerStyle={styles.container}>
          {/* Header */}
          <Text style={styles.title}>{t.settings}</Text>
          <Text style={styles.subtitle}>{t.subtitle}</Text>

          {/* Language */}
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Feather name="globe" size={16} color="#6B7280" />
              <Text style={styles.sectionTitle}>{t.language}</Text>
            </View>

            <View style={styles.row}>
              {["kk", "ru", "en"].map((lang) => (
                <Pressable
                  key={lang}
                  style={[
                    styles.option,
                    language === lang && styles.optionActive,
                  ]}
                  onPress={() => setLanguage(lang as any)}
                >
                  {language === lang && (
                    <Feather name="check" size={14} color="#E594A3" />
                  )}
                  <Text style={styles.optionText}>
                    {lang === "kk"
                      ? "Қазақша"
                      : lang === "ru"
                        ? "Русский"
                        : "English"}
                  </Text>
                </Pressable>
              ))}
            </View>
          </View>

          {/* Protection Level */}
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Feather name="shield" size={16} color="#6B7280" />
              <Text style={styles.sectionTitle}>{t.protection}</Text>
            </View>

            {(["high", "medium", "low"] as const).map((level) => (
              <Pressable
                key={level}
                style={[
                  styles.levelCard,
                  protectionLevel === level && styles.levelActive,
                ]}
                onPress={() => setProtectionLevel(level)}
              >
                <View>
                  <Text
                    style={[
                      styles.levelTitle,
                      protectionLevel === level && { color: "#E594A3" },
                    ]}
                  >
                    {t[level]}
                  </Text>

                  <Text style={styles.levelDesc}>
                    {level === "high"
                      ? t.highDesc
                      : level === "medium"
                        ? t.mediumDesc
                        : t.lowDesc}
                  </Text>
                </View>

                {protectionLevel === level && (
                  <View style={styles.checkCircle}>
                    <Feather name="check" size={14} color="#fff" />
                  </View>
                )}
              </Pressable>
            ))}
          </View>

          {/* Menu */}
          <View style={styles.section}>
            {[
              {
                icon: "phone",
                title: t.whitelist,
                desc: t.whitelistDesc,
              },
              {
                icon: "trash-2",
                title: t.clear,
                desc: t.clearDesc,
                onPress: handleClearHistory,
                danger: true,
              },
              {
                icon: "file-text",
                title: t.privacy,
                desc: t.privacyDesc,
              },
              {
                icon: "mail",
                title: t.contact,
                desc: t.contactDesc,
              },
            ].map((item, i) => (
              <Pressable key={i} style={styles.menuItem} onPress={item.onPress}>
                <View
                  style={[
                    styles.menuIcon,
                    item.danger && { backgroundColor: "#FEE2E2" },
                  ]}
                >
                  <Feather
                    name={item.icon as any}
                    size={18}
                    color={item.danger ? "#DC2626" : "#6B7280"}
                  />
                </View>

                <View style={{ flex: 1 }}>
                  <Text style={styles.menuTitle}>{item.title}</Text>
                  <Text style={styles.menuDesc}>{item.desc}</Text>
                </View>

                <Feather name="chevron-right" size={18} color="#9CA3AF" />
              </Pressable>
            ))}
          </View>

          {/* Footer */}
          <View style={styles.footer}>
            <Text style={styles.footerText}>Testify Kazakhstan</Text>
            <Text style={styles.footerSub}>
              Version 1.0.0 • Technovation 2026
            </Text>
          </View>
        </ScrollView>
        <BottomNav />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: "#FFFFFF" },
  container: { padding: 20, gap: 20 },

  title: { fontSize: 24, fontWeight: "800" },
  subtitle: { fontSize: 14, color: "#6B7280" },

  section: { gap: 10 },

  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  sectionTitle: { fontSize: 14, fontWeight: "600" },

  row: { flexDirection: "row", gap: 10 },

  option: {
    flex: 1,
    padding: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
    gap: 5,
  },
  optionActive: {
    borderColor: "#E594A3",
    backgroundColor: "#FDF2F8",
  },
  optionText: { fontSize: 13 },

  levelCard: {
    padding: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  levelActive: {
    borderColor: "#E594A3",
    backgroundColor: "#FDF2F8",
  },
  levelTitle: { fontSize: 14, fontWeight: "600" },
  levelDesc: { fontSize: 12, color: "#6B7280" },

  checkCircle: {
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: "#E594A3",
    alignItems: "center",
    justifyContent: "center",
  },

  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    paddingVertical: 10,
  },
  menuIcon: {
    width: 36,
    height: 36,
    borderRadius: 10,
    backgroundColor: "#F3F4F6",
    alignItems: "center",
    justifyContent: "center",
  },
  menuTitle: { fontSize: 14, fontWeight: "600" },
  menuDesc: { fontSize: 12, color: "#6B7280" },

  footer: { alignItems: "center", marginTop: 20 },
  footerText: { fontSize: 12, fontWeight: "600" },
  footerSub: { fontSize: 11, color: "#9CA3AF" },
});
