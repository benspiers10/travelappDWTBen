import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';

export default function ProfileScreen() {
  const colorScheme = useColorScheme() ?? 'dark';
  const colors = Colors[colorScheme];

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={styles.content}>
        <Text style={[styles.title, { color: colors.text }]}>Profile</Text>
        <Text style={[styles.subtitle, { color: colors.textSecondary }]}>
          This is a placeholder page for now.
        </Text>

        <View style={[styles.card, { backgroundColor: colors.card, borderColor: colors.border }]}>
          <Text style={[styles.cardTitle, { color: colors.text }]}>User Details</Text>
          <Text style={[styles.cardText, { color: colors.textSecondary }]}>
            Profile information will go here.
          </Text>
        </View>

        <View style={[styles.card, { backgroundColor: colors.card, borderColor: colors.border }]}>
          <Text style={[styles.cardTitle, { color: colors.text }]}>Emergency Contact</Text>
          <Text style={[styles.cardText, { color: colors.textSecondary }]}>
            Contact details can be added later.
          </Text>
        </View>

        <View style={[styles.card, { backgroundColor: colors.card, borderColor: colors.border }]}>
          <Text style={[styles.cardTitle, { color: colors.text }]}>App Settings</Text>
          <Text style={[styles.cardText, { color: colors.textSecondary }]}>
            Tracking interval and preferences will go here.
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