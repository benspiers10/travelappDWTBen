import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';

export default function HomeScreen() {
  const colorScheme = useColorScheme() ?? 'dark';
  const colors = Colors[colorScheme];

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={styles.content}>
        <Text style={[styles.title, { color: colors.text }]}>Solo Traveller Tracker</Text>
        <Text style={[styles.subtitle, { color: colors.textSecondary }]}>
          Welcome back. This will become your main dashboard.
        </Text>

        <View style={[styles.card, { backgroundColor: colors.card, borderColor: colors.border }]}>
          <Text style={[styles.cardTitle, { color: colors.text }]}>Travel Status</Text>
          <Text style={[styles.cardText, { color: colors.textSecondary }]}>No active trip</Text>
        </View>

        <View style={[styles.card, { backgroundColor: colors.card, borderColor: colors.border }]}>
          <Text style={[styles.cardTitle, { color: colors.text }]}>Last Known Update</Text>
          <Text style={[styles.cardText, { color: colors.textSecondary }]}>No location updates yet</Text>
        </View>

        <View style={[styles.card, { backgroundColor: colors.card, borderColor: colors.border }]}>
          <Text style={[styles.cardTitle, { color: colors.text }]}>Next Step</Text>
          <Text style={[styles.cardText, { color: colors.textSecondary }]}>
            Add start travel and stop travel actions on the Track page.
          </Text>
        </View>
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
  cardText: { fontSize: 15, lineHeight: 22 },
});