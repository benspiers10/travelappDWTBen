import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function HomeScreen() {
  const colorScheme = useColorScheme() ?? 'dark';
  const colors = Colors[colorScheme];

  return (
    // This is a placeholder screen for the Home tab. It will be updated with real data and functionality in future iterations.
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={styles.content}>
        {/* Placeholder content for the Home tab */}
        <Text style={[styles.title, { color: colors.text }]}>Solo Traveller Tracker</Text>
        <Text style={[styles.subtitle, { color: colors.textSecondary }]}>
          Hello! Use the tabs below to navigate through the app and explore its features. Happy travels!
        </Text>

            <View style={[styles.card, { backgroundColor: colors.card, borderColor: colors.border }]}>
              <Text style={[styles.cardTitle, { color: colors.text }]}>Last Trip</Text>
          <Text style={[styles.cardText, { color: colors.textSecondary }]}>Link to last trip details</Text>
        </View>

      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: { flex: 1, padding: 20 },
  title: { fontSize: 28, fontWeight: '700' },
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