import { StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';


export default function TripsScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Trips</Text>
        <Text style={styles.subtitle}>
          Previous journeys will be shown here later.
        </Text>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Trip History</Text>
          <Text style={styles.cardText}>No trips recorded yet</Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Future Features</Text>
          <Text style={styles.cardText}>
            Start time, end time, start photo, end photo, and trip status.
          </Text>
        </View>
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
    lineHeight: 22,
  },
});