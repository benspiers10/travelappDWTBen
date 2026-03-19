import { StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';


export default function ProfileScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Profile</Text>
        <Text style={styles.subtitle}>
          This is a placeholder page for now.
        </Text>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>User Details</Text>
          <Text style={styles.cardText}>Profile information will go here.</Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Emergency Contact</Text>
          <Text style={styles.cardText}>
            Contact details can be added later.
          </Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>App Settings</Text>
          <Text style={styles.cardText}>
            Tracking interval and preferences will go here.
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