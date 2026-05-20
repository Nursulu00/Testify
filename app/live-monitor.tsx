import React, { useState } from "react";
import {
  View,
  Text,
  Pressable,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Feather } from "@expo/vector-icons";
import { Audio } from "expo-av";

import { BottomNav } from "../components/layout/BottomNav";
import { checkFraudText } from "../api/fraudApi";

interface AnalysisResult {
  risk: "low" | "medium" | "high";
  label: string;
  confidence: number;
}

export default function LiveCallMonitorScreen() {
  const [recording, setRecording] = useState<Audio.Recording | null>(null);
  const [isRecording, setIsRecording] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [analysis, setAnalysis] = useState<AnalysisResult | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  // 🎤 START RECORDING
  const startRecording = async () => {
    try {
      await Audio.requestPermissionsAsync();

      await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        playsInSilentModeIOS: true,
      });

      const newRecording = new Audio.Recording();
      await newRecording.prepareToRecordAsync(
        Audio.RecordingOptionsPresets.HIGH_QUALITY,
      );

      await newRecording.startAsync();

      setRecording(newRecording);
      setIsRecording(true);
      setTranscript("");
      setAnalysis(null);
    } catch (err) {
      console.error(err);
      Alert.alert("Error", "Failed to start recording");
    }
  };

  // 🛑 STOP RECORDING
  const stopRecording = async () => {
    try {
      setIsRecording(false);

      await recording?.stopAndUnloadAsync();
      const uri = recording?.getURI();

      setRecording(null);

      if (uri) {
        sendAudioToBackend(uri);
      }
    } catch (err) {
      console.error(err);
    }
  };

  // 🔁 TOGGLE
  const toggleRecording = async () => {
    if (isRecording) {
      await stopRecording();
    } else {
      await startRecording();
    }
  };

  // 📡 AUDIO → TEXT (backend)
  const sendAudioToBackend = async (uri: string) => {
    setIsAnalyzing(true);

    try {
      const formData = new FormData();

      formData.append("file", {
        uri,
        name: "audio.wav",
        type: "audio/wav",
      } as any);

      const res = await fetch("http://192.168.1.73:8081/transcribe");

      const data = await res.json();

      const text = data.text || "";
      setTranscript(text);

      if (text) {
        await analyzeTranscript(text);
      }
    } catch (e) {
      console.error(e);
      Alert.alert("Error", "Failed to process audio");
      setIsAnalyzing(false);
    }
  };

  // 🧠 TEXT → FRAUD MODEL
  const analyzeTranscript = async (text: string) => {
    try {
      const data = await checkFraudText(text);
      setAnalysis(data);

      if (data.risk === "high") {
        Alert.alert("⚠️ Error!", "Suspicious signs detected");
      }
    } catch (e) {
      console.error(e);
      Alert.alert("Error", "Model is not responding");
    } finally {
      setIsAnalyzing(false);
    }
  };

  // 🎨 UI helpers
  const getRiskColor = () => {
    if (!analysis) return "#CBD5F5";
    if (analysis.risk === "high") return "#FF6B6B";
    if (analysis.risk === "medium") return "#FFC75F";
    return "#6BCB77";
  };

  const getRiskLabel = () => {
    if (!analysis) return "Waiting...";
    if (analysis.risk === "high") return "Dangerous!";
    if (analysis.risk === "medium") return "Suspicious";
    return "Safe";
  };

  return (
    <SafeAreaView style={styles.safe}>
      <View style={{ flex: 1 }}>
        <ScrollView
          contentContainerStyle={[styles.container, { paddingBottom: 120 }]}
        >
          <Text style={styles.title}>AI-Assistant</Text>
          <Text style={styles.subtitle}>Call Analysis via Audio</Text>

          {/* Risk */}
          <View style={[styles.riskCard, { borderColor: getRiskColor() }]}>
            <Text style={[styles.riskText, { color: getRiskColor() }]}>
              {getRiskLabel()}
            </Text>

            {analysis && (
              <>
                <Text style={styles.confidence}>
                  Confidence: {Math.round(analysis.confidence * 100)}%
                </Text>
                <Text style={styles.reason}>Type: {analysis.label}</Text>
              </>
            )}
          </View>

          {isAnalyzing && <ActivityIndicator size="small" color="#FE9AA4" />}

          {/* Mic */}
          <Pressable style={styles.micButton} onPress={toggleRecording}>
            <Feather
              name={isRecording ? "mic-off" : "mic"}
              size={36}
              color="#fff"
            />
          </Pressable>

          <Text style={styles.hint}>
            {isRecording ? "Recording..." : "Press to record"}
          </Text>

          {/* Transcript */}
          {transcript !== "" && (
            <View style={styles.transcriptBox}>
              <Text style={styles.transcriptTitle}>Transcript:</Text>
              <Text>{transcript}</Text>
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
  container: { padding: 20, gap: 16 },

  title: { fontSize: 26, fontWeight: "800" },
  subtitle: { fontSize: 14, color: "#6B7280" },

  riskCard: {
    borderWidth: 2,
    borderRadius: 20,
    padding: 16,
    backgroundColor: "#fff",
  },
  riskText: { fontSize: 20, fontWeight: "800" },
  confidence: { fontSize: 12, marginTop: 4 },
  reason: { fontSize: 13, marginTop: 4 },

  micButton: {
    width: 90,
    height: 90,
    borderRadius: 50,
    alignSelf: "center",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
    backgroundColor: "#FE9AA4",
  },

  hint: { textAlign: "center", fontSize: 12, color: "#6B7280" },

  transcriptBox: {
    backgroundColor: "#fff",
    padding: 14,
    borderRadius: 14,
  },
  transcriptTitle: {
    fontSize: 12,
    color: "#6B7280",
    marginBottom: 4,
  },
});
