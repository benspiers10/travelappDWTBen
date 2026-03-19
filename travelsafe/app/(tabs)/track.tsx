import { Pressable, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';

export default function TrackScreen() {
  const colorScheme = useColorScheme() ?? 'dark';
  const colors = Colors[colorScheme];

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={styles.content}>
        <Text style={[styles.title, { color: colors.text }]}>Track Travel</Text>
        <Text style={[styles.subtitle, { color: colors.textSecondary }]}>
          This page will handle starting and ending a journey.
        </Text>

        <View style={[styles.card, { backgroundColor: colors.card, borderColor: colors.border }]}>
          <Text style={[styles.cardTitle, { color: colors.text }]}>Journey Status</Text>
          <Text style={[styles.cardText, { color: colors.textSecondary }]}>Not currently travelling</Text>
        </View>

        <View style={[styles.card, { backgroundColor: colors.card, borderColor: colors.border }]}>
          <Text style={[styles.cardTitle, { color: colors.text }]}>Start Photo</Text>
          <Text style={[styles.cardText, { color: colors.textSecondary }]}>No photo captured</Text>
        </View>

        <View style={[styles.card, { backgroundColor: colors.card, borderColor: colors.border }]}>
          <Text style={[styles.cardTitle, { color: colors.text }]}>End Photo</Text>
          <Text style={[styles.cardText, { color: colors.textSecondary }]}>No photo captured</Text>
        </View>

        <Pressable style={[styles.primaryButton, { backgroundColor: colors.buttonPrimary }]}>
          <Text style={[styles.buttonText, { color: colors.buttonText }]}>Start Travel</Text>
        </Pressable>

        <Pressable style={[styles.secondaryButton, { backgroundColor: colors.buttonSecondary }]}>
          <Text style={[styles.buttonText, { color: colors.buttonText }]}>Stop Travel</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: { flex: 1, padding: 20 },
  title: { fontSize: 28, fontWeight: '700', marginBottom: 8 },
  subtitle: { fontSize: 15, marginBottom: 24, lineHeight: 22 },
  card: {
    borderRadius: 16,
    padding: 18,
    marginBottom: 16,
    borderWidth: 1,
  },
  cardTitle: { fontSize: 18, fontWeight: '600', marginBottom: 8 },
  cardText: { fontSize: 15 },
  primaryButton: {
    paddingVertical: 14,
    borderRadius: 12,
    marginTop: 8,
    marginBottom: 12,
  },
  secondaryButton: {
    paddingVertical: 14,
    borderRadius: 12,
  },
  buttonText: {
    textAlign: 'center',
    fontSize: 16,
    fontWeight: '600',
  },
});