import { useState } from 'react';
import {
  Alert,
  Image,
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Colors } from '@/constants/theme';
import { useAppTheme } from '@/context/ThemeContext';
import { useTrips } from '@/context/TripsContext';

export default function TripsScreen() {
  // Get the current colour scheme and matching colours.
   const { theme } = useAppTheme();
   const colors = Colors[theme];

  // Read trips and available actions from shared context.
  const { trips, deleteTrip, updateTrip } = useTrips();

  // Store whether the edit modal is open.
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);

  // Store the id of the trip being edited.
  const [selectedTripId, setSelectedTripId] = useState<string | null>(null);

  // Store the new title typed by the user.
  const [editedTitle, setEditedTitle] = useState('');

  // Format coordinates so they are shorter and easier to read.
  const formatCoordinate = (value: number | null) => {
    if (value === null) return 'No data';
    return value.toFixed(4);
  };

  // Open the edit modal and preload the current title if it exists.
  const handleOpenEditModal = (tripId: string, currentTitle?: string) => {
    setSelectedTripId(tripId);
    setEditedTitle(currentTitle ?? '');
    setIsEditModalVisible(true);
  };

  // Save the new trip title.
  const handleSaveEdit = () => {
    if (!selectedTripId) return;

    // Prevent an empty title from being saved.
    if (editedTitle.trim().length === 0) {
      Alert.alert('Invalid title', 'Please enter a trip title before saving.');
      return;
    }

    // Update the selected trip in shared state.
    updateTrip(selectedTripId, { title: editedTitle.trim() });

    // Close the modal and clear temporary edit state.
    setIsEditModalVisible(false);
    setSelectedTripId(null);
    setEditedTitle('');
  };

  // Delete a trip after confirmation.
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
                {/* Show a custom title if the user has edited the trip name */}
                <Text style={[styles.cardTitle, { color: colors.text }]}>
                  {trip.title ? trip.title : `Trip ${trips.length - index}`}
                </Text>

                <View style={styles.buttonGroup}>
                  <Pressable
                    style={[styles.smallButton, { backgroundColor: colors.buttonSecondary }]}
                    onPress={() => handleOpenEditModal(trip.id, trip.title)}
                  >
                    <Text style={[styles.smallButtonText, { color: colors.buttonText }]}>
                      Edit
                    </Text>
                  </Pressable>

                  <Pressable
                    style={[styles.smallButton, styles.deleteButton]}
                    onPress={() => handleDeleteTrip(trip.id)}
                  >
                    <Text style={styles.deleteButtonText}>Delete</Text>
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

      {/* Modal used to edit the title of a saved trip */}
      <Modal
        visible={isEditModalVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setIsEditModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View
            style={[
              styles.modalCard,
              { backgroundColor: colors.card, borderColor: colors.border },
            ]}
          >
            <Text style={[styles.modalTitle, { color: colors.text }]}>Edit Trip Title</Text>
            <Text style={[styles.modalSubtitle, { color: colors.textSecondary }]}>
              Enter a new name for this trip.
            </Text>

            <TextInput
              value={editedTitle}
              onChangeText={setEditedTitle}
              placeholder="e.g. Weekend in Manchester"
              placeholderTextColor={colors.textSecondary}
              style={[
                styles.input,
                {
                  color: colors.text,
                  borderColor: colors.border,
                  backgroundColor: colors.background,
                },
              ]}
            />

            <View style={styles.modalButtonRow}>
              <Pressable
                style={[styles.modalButton, { backgroundColor: colors.buttonSecondary }]}
                onPress={() => {
                  setIsEditModalVisible(false);
                  setSelectedTripId(null);
                  setEditedTitle('');
                }}
              >
                <Text style={[styles.smallButtonText, { color: colors.buttonText }]}>
                  Cancel
                </Text>
              </Pressable>

              <Pressable
                style={[styles.modalButton, { backgroundColor: colors.buttonPrimary }]}
                onPress={handleSaveEdit}
              >
                <Text style={[styles.smallButtonText, { color: colors.buttonText }]}>
                  Save
                </Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
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
    marginBottom: 12,
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
  deleteButton: {
    backgroundColor: '#9b2c2c',
  },
  deleteButtonText: {
    color: '#ffffff',
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
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: 'rgba(0,0,0,0.45)',
  },
  modalCard: {
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 8,
  },
  modalSubtitle: {
    fontSize: 14,
    marginBottom: 16,
    lineHeight: 20,
  },
  input: {
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 15,
    marginBottom: 16,
  },
  modalButtonRow: {
    flexDirection: 'row',
    gap: 12,
  },
  modalButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: 'center',
  },
});