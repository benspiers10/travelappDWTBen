import { sendTripToServer } from '@/services/tripsApi';
import * as ImagePicker from 'expo-image-picker';
import * as Location from 'expo-location';
import { useState } from 'react';
import {
  Alert,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { useTrips } from '@/context/TripsContext';
import { Trip } from '@/types/trip';

import { Colors } from '@/constants/theme';
import { useAppTheme } from '@/context/ThemeContext';

export default function TrackScreen() {
  // Get the current colour scheme and matching colours.
  const { theme } = useAppTheme();
  const colors = Colors[theme];


  const [startPhoto, setStartPhoto] = useState<string | null>(null);
  const [endPhoto, setEndPhoto] = useState<string | null>(null);

  const [isTravelling, setIsTravelling] = useState(false);

  const { addTrip } = useTrips();

  const [startTime, setStartTime] = useState<string | null>(null);
  const [endTime, setEndTime] = useState<string | null>(null);

  const [startLatitude, setStartLatitude] = useState<number | null>(null);
  const [startLongitude, setStartLongitude] = useState<number | null>(null);
  const [endLatitude, setEndLatitude] = useState<number | null>(null);
  const [endLongitude, setEndLongitude] = useState<number | null>(null);

  // Ask for location permission and return the current location.
  const getCurrentLocation = async () => {
  try {
    console.log('Requesting location permission...');

    const permissionResult = await Location.requestForegroundPermissionsAsync();
    console.log('Permission status:', permissionResult.status);

    if (permissionResult.status !== 'granted') {
      Alert.alert(
        'Location permission needed',
        'Please enable location access in your phone settings.'
      );
      return null;
    }

    console.log('Getting location...');

    const location = await Location.getCurrentPositionAsync({
      accuracy: Location.Accuracy.Balanced, // faster + more reliable
    });

    console.log('Location received:', location.coords);
    return location;

  } catch (error) {
    console.error('Location error:', error);
    Alert.alert('Location Error', 'Unable to get your location.');
    return null;
  }
};
  // Convert coordinates into a more human-readable location name.
  const getCityName = async (latitude: number, longitude: number) => {
    try {
      const results = await Location.reverseGeocodeAsync({
        latitude,
        longitude,
      });

      if (results.length > 0) {
        const place = results[0];
        return place.city || place.region || place.subregion || 'Unknown area';
      }

      return 'Unknown area';
    } catch (error) {
      console.error('Failed to reverse geocode location:', error);
      return 'Unknown area';
    }
  };

  // Start a journey by taking a photo and recording location/time.
  const handleStartTravel = async () => {
    const cameraPermission = await ImagePicker.requestCameraPermissionsAsync();

    if (!cameraPermission.granted) {
      Alert.alert(
        'Camera permission needed',
        'You must allow camera access to take a start photo.'
      );
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      mediaTypes: ['images'],
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.7,
    });

    if (result.canceled) {
      return;
    }

    const location = await getCurrentLocation();

    if (!location) {
      return;
    }

    const photoUri = result.assets[0].uri;

    // Save start-trip data.
    setStartPhoto(photoUri);
    setStartTime(new Date().toLocaleString());
    setStartLatitude(location.coords.latitude);
    setStartLongitude(location.coords.longitude);

    // Reset end-trip data for a fresh journey.
    setEndPhoto(null);
    setEndTime(null);
    setEndLatitude(null);
    setEndLongitude(null);

    setIsTravelling(true);
  };

  // End a journey by taking a photo, recording location/time, saving locally,
  // and attempting to send to the server.
  const handleStopTravel = async () => {
    if (!isTravelling) {
      Alert.alert('No active trip', 'Start a journey first.');
      return;
    }

    const cameraPermission = await ImagePicker.requestCameraPermissionsAsync();

    if (!cameraPermission.granted) {
      Alert.alert(
        'Camera permission needed',
        'You must allow camera access to take an end photo.'
      );
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      mediaTypes: ['images'],
      allowsEditing: false,
      quality: 0.4,
    });

    if (result.canceled) {
      return;
    }

    const location = await getCurrentLocation();

    if (!location) {
      return;
    }

    const photoUri = result.assets[0].uri;
    const completedEndTime = new Date().toLocaleString();

    const startCityName =
      startLatitude !== null && startLongitude !== null
        ? await getCityName(startLatitude, startLongitude)
        : 'Unknown area';

    const endCityName = await getCityName(
      location.coords.latitude,
      location.coords.longitude
    );

    // Build the completed trip object.
    const completedTrip: Trip = {
      id: Date.now().toString(),
      startPhoto,
      endPhoto: photoUri,
      startTime,
      endTime: completedEndTime,
      startLatitude,
      startLongitude,
      endLatitude: location.coords.latitude,
      endLongitude: location.coords.longitude,
      startCity: startCityName,
      endCity: endCityName,
      status: 'completed',
    };

    // Save locally first.
    addTrip(completedTrip);

    // Then try to send to the server.
    try {
      await sendTripToServer(completedTrip);
      Alert.alert('Trip saved', 'Trip saved locally and sent to server.');
    } catch (error) {
      console.error('Server upload failed:', error);
      Alert.alert('Trip saved', 'Trip saved locally. Server sync unavailable.');
    }

      // Update UI state so the completed trip is briefly visible.
      setEndPhoto(photoUri);
      setEndTime(completedEndTime);
      setEndLatitude(location.coords.latitude);
      setEndLongitude(location.coords.longitude);
      setIsTravelling(false);

    // Reset the screen after saving so the user can begin a new trip.
    setStartPhoto(null);
    setEndPhoto(null);
    setStartTime(null);
    setEndTime(null);
    setStartLatitude(null);
    setStartLongitude(null);
    setEndLatitude(null);
    setEndLongitude(null);
    setIsTravelling(false);
  };

  // Format coordinates so the screen looks cleaner.
  const formatCoordinate = (value: number | null) => {
    if (value === null) return 'No data';
    return value.toFixed(5);
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <Text style={[styles.title, { color: colors.text }]}>Track Travel</Text>
        <Text style={[styles.subtitle, { color: colors.textSecondary }]}>
          Start and end a journey with a photo, time, and location record.
        </Text>

        {/* Action buttons placed near the top so they are easy to reach */}
        <View style={styles.buttonRow}>
          {!isTravelling ? (
            <Pressable
              style={[
                styles.actionButton,
                styles.primaryButton,
                { backgroundColor: colors.buttonPrimary },
              ]}
              onPress={handleStartTravel}
            >
              <Text style={[styles.buttonText, { color: colors.buttonText }]}>
                Start Travel
              </Text>
            </Pressable>
          ) : (
            <Pressable
              style={[
                styles.actionButton,
                styles.secondaryButton,
                { backgroundColor: colors.buttonSecondary },
              ]}
              onPress={handleStopTravel}
            >
              <Text style={[styles.buttonText, { color: colors.buttonText }]}>
                Stop Travel
              </Text>
            </Pressable>
          )}
        </View>

        {/* Simple status card */}
        <View
          style={[
            styles.card,
            { backgroundColor: colors.card, borderColor: colors.border },
          ]}
        >
          <Text style={[styles.cardTitle, { color: colors.text }]}>Journey Status</Text>
          <Text style={[styles.cardText, { color: colors.textSecondary }]}>
            {isTravelling ? 'Journey in progress' : 'Ready to start a new journey'}
          </Text>
        </View>

        {/* Time information */}
        <View
          style={[
            styles.card,
            { backgroundColor: colors.card, borderColor: colors.border },
          ]}
        >
          <Text style={[styles.cardTitle, { color: colors.text }]}>Journey Times</Text>

          <View style={styles.infoRow}>
            <View style={styles.infoBlock}>
              <Text style={[styles.infoLabel, { color: colors.textSecondary }]}>Start</Text>
              <Text style={[styles.infoValue, { color: colors.text }]}>
                {startTime ?? 'Not started yet'}
              </Text>
            </View>

            <View style={styles.infoBlock}>
              <Text style={[styles.infoLabel, { color: colors.textSecondary }]}>End</Text>
              <Text style={[styles.infoValue, { color: colors.text }]}>
                {endTime ?? 'Not ended yet'}
              </Text>
            </View>
          </View>
        </View>

        {/* Location information side by side */}
        <View
          style={[
            styles.card,
            { backgroundColor: colors.card, borderColor: colors.border },
          ]}
        >
          <Text style={[styles.cardTitle, { color: colors.text }]}>Journey Locations</Text>

          <View style={styles.infoRow}>
            <View style={styles.infoBlock}>
              <Text style={[styles.infoLabel, { color: colors.textSecondary }]}>
                Start Location
              </Text>
              <Text style={[styles.cardText, { color: colors.text }]}>
                Lat: {formatCoordinate(startLatitude)}
              </Text>
              <Text style={[styles.cardText, { color: colors.text }]}>
                Lng: {formatCoordinate(startLongitude)}
              </Text>
            </View>

            <View style={styles.infoBlock}>
              <Text style={[styles.infoLabel, { color: colors.textSecondary }]}>
                End Location
              </Text>
              <Text style={[styles.cardText, { color: colors.text }]}>
                Lat: {formatCoordinate(endLatitude)}
              </Text>
              <Text style={[styles.cardText, { color: colors.text }]}>
                Lng: {formatCoordinate(endLongitude)}
              </Text>
            </View>
          </View>
        </View>

        {/* Photo previews side by side */}
        <View
          style={[
            styles.card,
            { backgroundColor: colors.card, borderColor: colors.border },
          ]}
        >
          <Text style={[styles.cardTitle, { color: colors.text }]}>Travel Photos</Text>

          <View style={styles.photoRow}>
            <View style={styles.photoBlock}>
              <Text style={[styles.infoLabel, { color: colors.textSecondary }]}>
                Start Photo
              </Text>
              {startPhoto ? (
                <Image source={{ uri: startPhoto }} style={styles.smallPhotoPreview} />
              ) : (
                <View
                  style={[
                    styles.photoPlaceholder,
                    { borderColor: colors.border, backgroundColor: colors.background },
                  ]}
                >
                  <Text style={[styles.placeholderText, { color: colors.textSecondary }]}>
                    No photo
                  </Text>
                </View>
              )}
            </View>

            <View style={styles.photoBlock}>
              <Text style={[styles.infoLabel, { color: colors.textSecondary }]}>
                End Photo
              </Text>
              {endPhoto ? (
                <Image source={{ uri: endPhoto }} style={styles.smallPhotoPreview} />
              ) : (
                <View
                  style={[
                    styles.photoPlaceholder,
                    { borderColor: colors.border, backgroundColor: colors.background },
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
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    padding: 20,
    paddingBottom: 32,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
  },
  subtitle: {
    fontSize: 15,
    marginBottom: 20,
    lineHeight: 22,
  },
  buttonRow: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 18,
  },
  actionButton: {
    flex: 1,
    paddingVertical: 14,
    borderRadius: 12,
  },
  primaryButton: {},
  secondaryButton: {},
  buttonText: {
    textAlign: 'center',
    fontSize: 16,
    fontWeight: '600',
  },
  card: {
    borderRadius: 16,
    padding: 16,
    marginBottom: 14,
    borderWidth: 1,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 12,
  },
  cardText: {
    fontSize: 14,
    lineHeight: 20,
  },
  infoRow: {
    flexDirection: 'row',
    gap: 12,
  },
  infoBlock: {
    flex: 1,
  },
  infoLabel: {
    fontSize: 13,
    fontWeight: '600',
    marginBottom: 6,
  },
  infoValue: {
    fontSize: 14,
    lineHeight: 20,
  },
  photoRow: {
    flexDirection: 'row',
    gap: 12,
  },
  photoBlock: {
    flex: 1,
  },
  smallPhotoPreview: {
    width: '100%',
    height: 120,
    borderRadius: 12,
  },
  photoPlaceholder: {
    height: 120,
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