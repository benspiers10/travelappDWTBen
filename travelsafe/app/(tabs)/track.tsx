import { Pressable, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';


export default function TrackScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Track Travel</Text>
        <Text style={styles.subtitle}>
          This page will handle starting and ending a journey.
        </Text>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Journey Status</Text>
          <Text style={styles.cardText}>Not currently travelling</Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Start Photo</Text>
          <Text style={styles.cardText}>No photo captured</Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>End Photo</Text>
          <Text style={styles.cardText}>No photo captured</Text>
        </View>

        <Pressable style={styles.primaryButton}>
          <Text style={styles.primaryButtonText}>Start Travel</Text>
        </Pressable>

        <Pressable style={styles.secondaryButton}>
          <Text style={styles.secondaryButtonText}>Stop Travel</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0f172a",
  },
  content: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: "700",
    color: "#ffffff",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 15,
    color: "#cbd5e1",
    marginBottom: 24,
    lineHeight: 22,
  },
  card: {
    backgroundColor: "#1e293b",
    borderRadius: 16,
    padding: 18,
    marginBottom: 16,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#ffffff",
    marginBottom: 8,
  },
  cardText: {
    fontSize: 15,
    color: "#cbd5e1",
  },
  primaryButton: {
    backgroundColor: "#2563eb",
    paddingVertical: 14,
    borderRadius: 12,
    marginTop: 8,
    marginBottom: 12,
  },
  primaryButtonText: {
    textAlign: "center",
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "600",
  },
  secondaryButton: {
    backgroundColor: "#334155",
    paddingVertical: 14,
    borderRadius: 12,
  },
  secondaryButtonText: {
    textAlign: "center",
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "600",
  },
});