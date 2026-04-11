import { StyleSheet, Switch, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Colors } from '@/constants/theme';
import { useAppTheme } from '@/context/ThemeContext';
import { useTrips } from '@/context/TripsContext';

export default function HomeScreen() {
  // Read the selected theme from custom context.
  const { theme, toggleTheme } = useAppTheme();
  const colors = Colors[theme];

  // Read all saved trips from shared state.
  const { trips } = useTrips();

  // Get the latest saved trip if one exists.
  const latestTrip = trips.length > 0 ? trips[0] : null;

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={styles.content}>
        <Text style={[styles.title, { color: colors.text }]}>TravelBuddy</Text>
        <Text style={[styles.subtitle, { color: colors.textSecondary }]}>
          Your solo travel dashboard
        </Text>

        {/* Stats card */}
        <View
          style={[
            styles.card,
            { backgroundColor: colors.card, borderColor: colors.border },
          ]}
        >
          <Text style={[styles.cardTitle, { color: colors.text }]}>Trip Stats</Text>

          <View style={styles.statsRow}>
            <View style={styles.statBox}>
              <Text style={[styles.statNumber, { color: colors.text }]}>
                {trips.length}
              </Text>
              <Text style={[styles.statLabel, { color: colors.textSecondary }]}>
                Trips Saved
              </Text>
            </View>

          </View>
        </View>

        {/* Latest trip preview */}
        <View
          style={[
            styles.card,
            { backgroundColor: colors.card, borderColor: colors.border },
          ]}
        >
          <Text style={[styles.cardTitle, { color: colors.text }]}>Latest Trip</Text>

          {latestTrip ? (
            <>
              <Text style={[styles.cardText, { color: colors.text }]}>
                {latestTrip.title ? latestTrip.title : 'Untitled Trip'}
              </Text>
              <Text style={[styles.cardText, { color: colors.textSecondary }]}>
                Start: {latestTrip.startCity ?? 'Unknown area'}
              </Text>
              <Text style={[styles.cardText, { color: colors.textSecondary }]}>
                End: {latestTrip.endCity ?? 'Unknown area'}
              </Text>
              <Text style={[styles.cardText, { color: colors.textSecondary }]}>
                {latestTrip.startTime ?? 'No date recorded'}
              </Text>
            </>
          ) : (
            <Text style={[styles.cardText, { color: colors.textSecondary }]}>
              No trips saved yet.
            </Text>
          )}
        </View>

        {/* Theme toggle placed outside the cards */}
        <View
          style={[
            styles.themeToggleRow,
            {
              backgroundColor: colors.card,
              borderColor: colors.border,
            },
          ]}
        >
          <View style={styles.themeTextWrap}>
            <Text style={[styles.themeTitle, { color: colors.text }]}>App Theme</Text>
              <Text style={[styles.statNumber, { color: colors.text }]}>
                {theme === 'dark' ? 'Dark' : 'Light'}
              </Text>
          </View>

          

          <Switch
            value={theme === 'dark'}
            onValueChange={toggleTheme}
            trackColor={{
              false: '#a9c3ae',
              true: colors.buttonPrimary,
            }}
            thumbColor={theme === 'dark' ? '#f1f5e9' : '#2e7d32'}
            ios_backgroundColor="#a9c3ae"
          />
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 15,
    marginBottom: 20,
    lineHeight: 22,
  },
  card: {
    borderRadius: 16,
    padding: 18,
    marginBottom: 16,
    borderWidth: 1,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 12,
  },
  cardText: {
    fontSize: 15,
    lineHeight: 22,
    marginBottom: 4,
  },
  statsRow: {
    flexDirection: 'row',
    gap: 12,
  },
  statBox: {
    flex: 1,
  },
  statNumber: {
    fontSize: 28,
    fontWeight: '700',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 14,
  },
  themeToggleRow: {
    borderWidth: 1,
    borderRadius: 16,
    paddingHorizontal: 18,
    paddingVertical: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 16,
  },
  themeTextWrap: {
    flex: 1,
  },
  themeTitle: {
    fontSize: 17,
    fontWeight: '600',
    marginBottom: 4,
  },
  themeSubtitle: {
    fontSize: 14,
    lineHeight: 20,
  },
});