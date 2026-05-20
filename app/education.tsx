import React, { useMemo, useState } from "react";
import {
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  Ionicons,
  MaterialIcons,
  Feather,
  FontAwesome5,
} from "@expo/vector-icons";

import { BottomNav } from "../components/layout/BottomNav"; // adjust path

type LessonIconName = "warning" | "message" | "phone" | "shield";

interface Lesson {
  id: string;
  title: string;
  description: string;
  icon: LessonIconName;
  content: string[];
}

interface QuizQuestion {
  question: string;
  options: string[];
  correct: number;
  explanation: string;
}

const lessons: Lesson[] = [
  {
    id: "recognize",
    title: "How to recognize scammers",
    description: "5 main signs",
    icon: "warning",
    content: [
      "🚨 Urgency — scammers rush you: «Act immediately!»",
      "💰 Money — they ask to transfer money or provide card details",
      "🎭 Masquerade — they pose as bank, police, or eGov",
      "😰 Fear — they intimidate with blocking, fines, or criminal cases",
      "🔗 Links — they send suspicious links for data input",
    ],
  },
  {
    id: "phrases",
    title: "Dangerous Phrases",
    description: "What Scammers Say",
    icon: "message",
    content: [
      "«Your card is blocked» — bank never calls like this",
      "«Transfer money to a secure account» — such accounts do not exist",
      "«You are eligible for compensation» — do not trust unexpected payments",
      "«Name the code from the SMS» — never disclose codes to anyone",
      "«This is the bank's security service» — call back directly using the number on your card",
    ],
  },
  {
    id: "action",
    title: "What to do if you answered",
    description: "Emergency actions if you shared data",
    icon: "phone",
    content: [
      "1️⃣ Immediately stop communication and do not follow any instructions from scammers",
      "2️⃣ Block the card through mobile banking or call center",
      "3️⃣ Call the bank directly using the number on your card",
      "4️⃣ Change the passwords for important accounts",
      "5️⃣ File a report with the police (can be done online)",
    ],
  },
  {
    id: "voice",
    title: "Voice deepfakes",
    description: "New threat — AI voices",
    icon: "shield",
    content: [
      "🎙️ Scammers can imitate the voices of relatives using AI",
      "📞 «Mom, I've been kidnapped» — a popular scheme with voice impersonation",
      "✅ Always call relatives directly",
      "🔑 Agree on a secret word with your family",
      "⏰ Do not act under pressure — this is a sign of fraud",
    ],
  },
];

const quizQuestions: QuizQuestion[] = [
  {
    question:
      "The call is coming from «bank security» and asks for the code from SMS. What to do?",
    options: [
      "Tell the code",
      "Put the phone down",
      "Ask for the operator's name",
    ],
    correct: 1,
    explanation:
      "Banks never ask for SMS codes. This is a common scam to gain access to your account.",
  },
  {
    question: "SMS: «You got bonus of 50000 KZT. Go to the link». Is...",
    options: ["Real", "Scam", "Need to check"],
    correct: 1,
    explanation: "Unexpected bonuses with links — a typical phishing scheme.",
  },
  {
    question:
      "The call is coming from «mom» and asks you to transfer money urgently. The voice sounds familiar. What to do?",
    options: [
      "Transfer the money immediately",
      "Call your mom directly",
      "Ask to call back",
    ],
    correct: 1,
    explanation:
      "AI can imitate voices. Always call relatives directly to verify.",
  },
];

function LessonIcon({
  name,
  size = 24,
  color = "#E594A3",
}: {
  name: LessonIconName;
  size?: number;
  color?: string;
}) {
  switch (name) {
    case "warning":
      return <Ionicons name="warning-outline" size={size} color={color} />;
    case "message":
      return <Feather name="message-square" size={size} color={color} />;
    case "phone":
      return <Feather name="phone" size={size} color={color} />;
    case "shield":
      return <Feather name="shield" size={size} color={color} />;
    default:
      return <Feather name="circle" size={size} color={color} />;
  }
}

export default function EducationScreen() {
  const [selectedLesson, setSelectedLesson] = useState<Lesson | null>(null);
  const [showQuiz, setShowQuiz] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);

  const currentQuiz = useMemo(
    () => quizQuestions[currentQuestion],
    [currentQuestion],
  );

  const handleAnswer = (index: number) => {
    if (selectedAnswer !== null) return;
    setSelectedAnswer(index);

    if (index === currentQuiz.correct) {
      setScore((prev) => prev + 1);
    }
  };

  const nextQuestion = () => {
    if (currentQuestion < quizQuestions.length - 1) {
      setCurrentQuestion((prev) => prev + 1);
      setSelectedAnswer(null);
    } else {
      setShowResult(true);
    }
  };

  const resetQuiz = () => {
    setShowQuiz(false);
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setShowResult(false);
    setScore(0);
  };

  return (
    <SafeAreaView style={styles.safe}>
      <View style={{ flex: 1 }}>
        <ScrollView
          style={styles.container}
          contentContainerStyle={styles.contentContainer}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.header}>
            <Text style={styles.title}>Education</Text>
            <Text style={styles.subtitle}>
              Learn to protect yourself from scammers
            </Text>
          </View>

          <Pressable style={styles.quizCard} onPress={() => setShowQuiz(true)}>
            <View style={styles.quizBubble} />
            <View style={styles.quizTextWrap}>
              <View style={styles.quizMiniRow}>
                <Feather name="book-open" size={16} color="#FEF4F5" />
                <Text style={styles.quizMiniText}>Mini-Test</Text>
              </View>

              <Text style={styles.quizTitle}>Scam or not?</Text>
              <Text style={styles.quizSubtitle}>
                Check your knowledge in 2 minutes
              </Text>
            </View>

            <Feather name="arrow-right" size={20} color="#FEF4F5" />
          </Pressable>

          <View style={styles.lessonsSection}>
            <Text style={styles.sectionTitle}>Lessons</Text>

            {lessons.map((lesson) => (
              <Pressable
                key={lesson.id}
                style={styles.lessonCard}
                onPress={() => setSelectedLesson(lesson)}
              >
                <View style={styles.lessonIconBox}>
                  <LessonIcon name={lesson.icon} size={24} color="#E594A3" />
                </View>

                <View style={styles.lessonTextWrap}>
                  <Text style={styles.lessonTitle}>{lesson.title}</Text>
                  <Text style={styles.lessonDescription}>
                    {lesson.description}
                  </Text>
                </View>

                <Feather name="chevron-right" size={20} color="#94A3B8" />
              </Pressable>
            ))}
          </View>
        </ScrollView>

        <BottomNav />

        <Modal
          visible={selectedLesson !== null}
          animationType="slide"
          transparent
          onRequestClose={() => setSelectedLesson(null)}
        >
          <View style={styles.modalOverlay}>
            <Pressable
              style={styles.overlayTouchable}
              onPress={() => setSelectedLesson(null)}
            />

            <View style={styles.bottomSheet}>
              {selectedLesson && (
                <ScrollView
                  showsVerticalScrollIndicator={false}
                  contentContainerStyle={styles.sheetContent}
                >
                  <View style={styles.dragHandle} />

                  <View style={styles.lessonHeaderRow}>
                    <View style={styles.lessonHeaderIcon}>
                      <LessonIcon
                        name={selectedLesson.icon}
                        size={28}
                        color="#E594A3"
                      />
                    </View>

                    <View style={{ flex: 1 }}>
                      <Text style={styles.sheetTitle}>
                        {selectedLesson.title}
                      </Text>
                      <Text style={styles.sheetSubtitle}>
                        {selectedLesson.description}
                      </Text>
                    </View>
                  </View>

                  <View style={styles.lessonItemsWrap}>
                    {selectedLesson.content.map((item, index) => (
                      <View key={index} style={styles.lessonItem}>
                        <Text style={styles.lessonItemText}>{item}</Text>
                      </View>
                    ))}
                  </View>

                  <Pressable
                    style={styles.primaryButton}
                    onPress={() => setSelectedLesson(null)}
                  >
                    <Text style={styles.primaryButtonText}>Understood</Text>
                  </Pressable>
                </ScrollView>
              )}
            </View>
          </View>
        </Modal>

        <Modal
          visible={showQuiz}
          animationType="slide"
          onRequestClose={resetQuiz}
        >
          <SafeAreaView style={styles.quizScreen}>
            {showResult ? (
              <View style={styles.resultWrap}>
                <View
                  style={[
                    styles.resultIconCircle,
                    score === quizQuestions.length
                      ? styles.resultPerfect
                      : styles.resultNormal,
                  ]}
                >
                  {score === quizQuestions.length ? (
                    <Ionicons
                      name="checkmark-circle"
                      size={52}
                      color="#16A34A"
                    />
                  ) : (
                    <FontAwesome5 name="shield-alt" size={42} color="#E594A3" />
                  )}
                </View>

                <Text style={styles.resultTitle}>
                  {score === quizQuestions.length
                    ? "Excellent!"
                    : "Good result!"}
                </Text>

                <Text style={styles.resultScore}>
                  Correct answers: {score} out of {quizQuestions.length}
                </Text>

                <Text style={styles.resultDescription}>
                  {score === quizQuestions.length
                    ? "You are excellent at identifying scam schemes!"
                    : "Keep learning to better protect yourself"}
                </Text>

                <Pressable style={styles.primaryButton} onPress={resetQuiz}>
                  <Text style={styles.primaryButtonText}>Complete</Text>
                </Pressable>
              </View>
            ) : (
              <View style={styles.quizWrap}>
                <View style={styles.quizTopRow}>
                  <Pressable onPress={resetQuiz} style={styles.ghostButton}>
                    <Text style={styles.ghostButtonText}>Exit</Text>
                  </Pressable>

                  <Text style={styles.progressText}>
                    {currentQuestion + 1} / {quizQuestions.length}
                  </Text>
                </View>

                <View style={styles.quizMain}>
                  <Text style={styles.questionText}>
                    {currentQuiz.question}
                  </Text>

                  <View style={styles.optionsWrap}>
                    {currentQuiz.options.map((option, index) => {
                      const isSelected = selectedAnswer === index;
                      const isCorrect = index === currentQuiz.correct;
                      const showFeedback = selectedAnswer !== null;

                      return (
                        <Pressable
                          key={index}
                          onPress={() => handleAnswer(index)}
                          disabled={showFeedback}
                          style={[
                            styles.optionCard,
                            showFeedback && isCorrect && styles.optionCorrect,
                            showFeedback &&
                              isSelected &&
                              !isCorrect &&
                              styles.optionWrong,
                            showFeedback &&
                              !isSelected &&
                              !isCorrect &&
                              styles.optionMuted,
                          ]}
                        >
                          <View style={styles.optionRow}>
                            <View
                              style={[
                                styles.optionBadge,
                                showFeedback &&
                                  isCorrect &&
                                  styles.optionBadgeCorrect,
                                showFeedback &&
                                  isSelected &&
                                  !isCorrect &&
                                  styles.optionBadgeWrong,
                              ]}
                            >
                              {showFeedback && isCorrect ? (
                                <Ionicons
                                  name="checkmark"
                                  size={18}
                                  color="#FFFFFF"
                                />
                              ) : showFeedback && isSelected ? (
                                <Ionicons
                                  name="close"
                                  size={18}
                                  color="#FFFFFF"
                                />
                              ) : (
                                <Text style={styles.optionBadgeText}>
                                  {String.fromCharCode(65 + index)}
                                </Text>
                              )}
                            </View>

                            <Text style={styles.optionText}>{option}</Text>
                          </View>
                        </Pressable>
                      );
                    })}
                  </View>

                  {selectedAnswer !== null && (
                    <View style={styles.explanationBox}>
                      <Text style={styles.explanationText}>
                        {currentQuiz.explanation}
                      </Text>
                    </View>
                  )}
                </View>

                {selectedAnswer !== null && (
                  <View style={styles.quizFooter}>
                    <Pressable
                      style={styles.primaryButton}
                      onPress={nextQuestion}
                    >
                      <Text style={styles.primaryButtonText}>
                        {currentQuestion < quizQuestions.length - 1
                          ? "Next"
                          : "Result"}
                      </Text>
                    </Pressable>
                  </View>
                )}
              </View>
            )}
          </SafeAreaView>
        </Modal>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  contentContainer: {
    padding: 20,
    paddingBottom: 32,
  },
  header: {
    marginBottom: 24,
  },
  title: {
    fontSize: 28,
    fontWeight: "800",
    color: "#0F172A",
    marginBottom: 6,
  },
  subtitle: {
    fontSize: 14,
    color: "#64748B",
  },
  quizCard: {
    backgroundColor: "#FE9AA4",
    borderRadius: 22,
    padding: 20,
    minHeight: 120,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    overflow: "hidden",
    marginBottom: 24,
  },
  quizBubble: {
    position: "absolute",
    right: -20,
    top: -20,
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: "rgba(255,255,255,0.12)",
  },
  quizTextWrap: {
    flex: 1,
    paddingRight: 16,
  },
  quizMiniRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    marginBottom: 8,
  },
  quizMiniText: {
    color: "#FEF4F5",
    fontSize: 13,
    fontWeight: "600",
  },
  quizTitle: {
    color: "#FFFFFF",
    fontSize: 20,
    fontWeight: "800",
    marginBottom: 4,
  },
  quizSubtitle: {
    color: "#FEF4F5",
    fontSize: 14,
  },
  lessonsSection: {
    gap: 12,
  },
  sectionTitle: {
    fontSize: 15,
    fontWeight: "700",
    color: "#0F172A",
    marginBottom: 4,
  },
  lessonCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 18,
    padding: 16,
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#FEF4F5",
  },
  lessonIconBox: {
    width: 48,
    height: 48,
    borderRadius: 14,
    backgroundColor: "#FEF4F5",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 14,
  },
  lessonTextWrap: {
    flex: 1,
  },
  lessonTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#0F172A",
    marginBottom: 3,
  },
  lessonDescription: {
    fontSize: 13,
    color: "#64748B",
  },
  modalOverlay: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "rgba(15, 23, 42, 0.35)",
  },
  overlayTouchable: {
    flex: 1,
  },
  bottomSheet: {
    maxHeight: "85%",
    backgroundColor: "#FFFFFF",
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    overflow: "hidden",
  },
  sheetContent: {
    padding: 24,
    paddingBottom: 30,
  },
  dragHandle: {
    width: 52,
    height: 5,
    borderRadius: 999,
    backgroundColor: "#E594A3",
    alignSelf: "center",
    marginBottom: 20,
  },
  lessonHeaderRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
    marginBottom: 20,
  },
  lessonHeaderIcon: {
    width: 56,
    height: 56,
    borderRadius: 18,
    backgroundColor: "#FEF4F5",
    alignItems: "center",
    justifyContent: "center",
  },
  sheetTitle: {
    fontSize: 22,
    fontWeight: "800",
    color: "#0F172A",
    marginBottom: 4,
  },
  sheetSubtitle: {
    fontSize: 14,
    color: "#64748B",
  },
  lessonItemsWrap: {
    gap: 12,
  },
  lessonItem: {
    backgroundColor: "#F1F5F9",
    borderRadius: 16,
    padding: 14,
  },
  lessonItemText: {
    fontSize: 15,
    lineHeight: 22,
    color: "#0F172A",
  },
  primaryButton: {
    marginTop: 20,
    backgroundColor: "#FE9AA4",
    borderRadius: 16,
    paddingVertical: 16,
    paddingHorizontal: 32,
    alignItems: "center",
    justifyContent: "center",
  },
  primaryButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "700",
  },
  quizScreen: {
    flex: 1,
    backgroundColor: "#F8FAFC",
  },
  quizWrap: {
    flex: 1,
    padding: 20,
  },
  quizTopRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 24,
  },
  ghostButton: {
    paddingVertical: 8,
    paddingHorizontal: 6,
  },
  ghostButtonText: {
    fontSize: 15,
    color: "#FE9AA4",
    fontWeight: "600",
  },
  progressText: {
    fontSize: 14,
    color: "#64748B",
    fontWeight: "600",
  },
  quizMain: {
    flex: 1,
  },
  questionText: {
    fontSize: 24,
    lineHeight: 32,
    fontWeight: "800",
    color: "#0F172A",
    marginBottom: 24,
  },
  optionsWrap: {
    gap: 12,
  },
  optionCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#E2E8F0",
    padding: 14,
  },
  optionCorrect: {
    borderColor: "#16A34A",
    backgroundColor: "#DCFCE7",
  },
  optionWrong: {
    borderColor: "#DC2626",
    backgroundColor: "#FEE2E2",
  },
  optionMuted: {
    opacity: 0.55,
  },
  optionRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  optionBadge: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "#E2E8F0",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },
  optionBadgeCorrect: {
    backgroundColor: "#16A34A",
  },
  optionBadgeWrong: {
    backgroundColor: "#DC2626",
  },
  optionBadgeText: {
    color: "#475569",
    fontSize: 13,
    fontWeight: "700",
  },
  optionText: {
    flex: 1,
    fontSize: 15,
    color: "#0F172A",
    fontWeight: "600",
  },
  explanationBox: {
    marginTop: 20,
    backgroundColor: "#E2E8F0",
    borderRadius: 16,
    padding: 14,
  },
  explanationText: {
    color: "#0F172A",
    fontSize: 14,
    lineHeight: 21,
  },
  quizFooter: {
    paddingTop: 16,
  },
  resultWrap: {
    flex: 1,
    padding: 24,
    alignItems: "center",
    justifyContent: "center",
  },
  resultIconCircle: {
    width: 110,
    height: 110,
    borderRadius: 55,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 24,
  },
  resultPerfect: {
    backgroundColor: "#FFFFFF",
  },
  resultNormal: {
    backgroundColor: "#FFFFFF",
  },
  resultTitle: {
    fontSize: 28,
    fontWeight: "800",
    color: "#0F172A",
    marginBottom: 8,
  },
  resultScore: {
    fontSize: 16,
    color: "#475569",
    marginBottom: 10,
  },
  resultDescription: {
    fontSize: 14,
    lineHeight: 21,
    color: "#64748B",
    textAlign: "center",
    maxWidth: 280,
    marginBottom: 24,
  },
});
