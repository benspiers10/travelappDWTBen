import { Alert, Image, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Colors } from '@/constants/theme';
import { useTrips } from '@/context/TripsContext';
import { useColorScheme } from '@/hooks/use-color-scheme';

export default function TripsScreen() {
  const colorScheme = useColorScheme() ?? 'dark';
  const colors = Colors[colorScheme];

  const { trips, deleteTrip } = useTrips();

  const formatCoordinate = (value: number | null) => {
    if (value === null) return 'No data';
    return value.toFixed(4);
  };

  const handleDeleteTrip = (tripId: string) => {
    Alert.alert(
      'Delete trip',
      'Are you sure you want to delete this saved trip?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => deleteTrip(tripId),
        },
      ]
    );
  };

  const handleEditTrip = () => {
    Alert.alert(
      'Edit trip',
      'Editing can be added next. For now this button is a placeholder.'
    );
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <Text style={[styles.title, { color: colors.text }]}>Trips</Text>
        <Text style={[styles.subtitle, { color: colors.textSecondary }]}>
          View completed journeys saved on this device.
        </Text>

        {trips.length === 0 ? (
          <View
            style={[
              styles.card,
              { backgroundColor: colors.card, borderColor: colors.border },
            ]}
          >
            <Text style={[styles.cardTitle, { color: colors.text }]}>
              No Trips Recorded
            </Text>
            <Text style={[styles.cardText, { color: colors.textSecondary }]}>
              Start and finish a journey on the Track tab to save it here.
            </Text>
          </View>
        ) : (
          trips.map((trip, index) => (
            <View
              key={trip.id}
              style={[
                styles.card,
                { backgroundColor: colors.card, borderColor: colors.border },
              ]}
            >
              <View style={styles.headerRow}>
                <Text style={[styles.cardTitle, { color: colors.text }]}>
                  Trip {trips.length - index}
                </Text>

                <View style={styles.buttonGroup}>
                  <Pressable
                    style={[styles.smallButton, { backgroundColor: colors.buttonSecondary }]}
                    onPress={handleEditTrip}
                  >
                    <Text style={[styles.smallButtonText, { color: colors.buttonText }]}>
                      Edit
                    </Text>
                  </Pressable>

                  <Pressable
                    style={[styles.smallButton, { backgroundColor: '#9b2c2c' }]}
                    onPress={() => handleDeleteTrip(trip.id)}
                  >
                    <Text style={[styles.smallButtonText, { color: '#ffffff' }]}>
                      Delete
                    </Text>
                  </Pressable>
                </View>
              </View>

              <View style={styles.section}>
                <Text style={[styles.label, { color: colors.textSecondary }]}>
                  Start
                </Text>
                <Text style={[styles.value, { color: colors.text }]}>
                  {trip.startCity ?? 'Unknown area'}
                </Text>
                <Text style={[styles.metaText, { color: colors.textSecondary }]}>
                  {trip.startTime ?? 'No time recorded'}
                </Text>
                <Text style={[styles.metaText, { color: colors.textSecondary }]}>
                  {formatCoordinate(trip.startLatitude)}, {formatCoordinate(trip.startLongitude)}
                </Text>
              </View>

              <View style={styles.section}>
                <Text style={[styles.label, { color: colors.textSecondary }]}>
                  End
                </Text>
                <Text style={[styles.value, { color: colors.text }]}>
                  {trip.endCity ?? 'Unknown area'}
                </Text>
                <Text style={[styles.metaText, { color: colors.textSecondary }]}>
                  {trip.endTime ?? 'No time recorded'}
                </Text>
                <Text style={[styles.metaText, { color: colors.textSecondary }]}>
                  {formatCoordinate(trip.endLatitude)}, {formatCoordinate(trip.endLongitude)}
                </Text>
              </View>

              <View style={styles.photoRow}>
                <View style={styles.photoBlock}>
                  <Text style={[styles.label, { color: colors.textSecondary }]}>
                    Start Photo
                  </Text>
                  {trip.startPhoto ? (
                    <Image source={{ uri: trip.startPhoto }} style={styles.photoPreview} />
                  ) : (
                    <View
                      style={[
                        styles.photoPlaceholder,
                        {
                          borderColor: colors.border,
                          backgroundColor: colors.background,
                        },
                      ]}
                    >
                      <Text style={[styles.placeholderText, { color: colors.textSecondary }]}>
                        No photo
                      </Text>
                    </View>
                  )}
                </View>

                <View style={styles.photoBlock}>
                  <Text style={[styles.label, { color: colors.textSecondary }]}>
                    End Photo
                  </Text>
                  {trip.endPhoto ? (
                    <Image source={{ uri: trip.endPhoto }} style={styles.photoPreview} />
                  ) : (
                    <View
                      style={[
                        styles.photoPlaceholder,
                        {
                          borderColor: colors.border,
                          backgroundColor: colors.background,
                        },
                      ]}
                    >
                      <Text style={[styles.placeholderText, { color: colors.textSecondary }]}>
                        No photo
                      </Text>
                    </View>
                  )}
                </View>
              </View>
            </View>
          ))
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    padding: 20,
    paddingBottom: 32,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 15,
    marginBottom: 24,
    lineHeight: 22,
  },
  card: {
    borderRadius: 16,
    padding: 18,
    marginBottom: 16,
    borderWidth: 1,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    gap: 12,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '600',
    flex: 1,
  },
  section: {
    marginBottom: 14,
  },
  label: {
    fontSize: 13,
    fontWeight: '600',
    marginBottom: 4,
  },
  value: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 2,
  },
  metaText: {
    fontSize: 13,
    lineHeight: 18,
  },
  cardText: {
    fontSize: 15,
    lineHeight: 22,
  },
  buttonGroup: {
    flexDirection: 'row',
    gap: 8,
  },
  smallButton: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 10,
  },
  smallButtonText: {
    fontSize: 13,
    fontWeight: '600',
  },
  photoRow: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 8,
  },
  photoBlock: {
    flex: 1,
  },
  photoPreview: {
    width: '100%',
    height: 110,
    borderRadius: 12,
  },
  photoPlaceholder: {
    height: 110,
    borderRadius: 12,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 8,
  },
  placeholderText: {
    fontSize: 13,
  },
});