import { Trip } from '@/types/trip';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createContext, ReactNode, useContext, useEffect, useState } from 'react';

type TripsContextType = {
  trips: Trip[];

  // Add a newly completed trip.
  addTrip: (trip: Trip) => void;

  // Delete an existing trip.
  deleteTrip: (tripId: string) => void;

  // Update an existing trip.
  updateTrip: (tripId: string, updatedData: Partial<Trip>) => void;
};

const TripsContext = createContext<TripsContextType | undefined>(undefined);

type TripsProviderProps = {
  children: ReactNode;
};

export function TripsProvider({ children }: TripsProviderProps) {
  // Store all trips in shared state.
  const [trips, setTrips] = useState<Trip[]>([]);

  // Wait until data has loaded before saving again.
  const [isLoaded, setIsLoaded] = useState(false);

  // Load trips from local storage when the app starts.
  useEffect(() => {
    const loadTrips = async () => {
      try {
        const storedTrips = await AsyncStorage.getItem('trips');
        if (storedTrips) {
          setTrips(JSON.parse(storedTrips));
        }
      } catch (error) {
        console.error('Failed to load trips:', error);
      } finally {
        setIsLoaded(true);
      }
    };

    loadTrips();
  }, []);

  // Save trips whenever the list changes.
  useEffect(() => {
    if (!isLoaded) return;

    const saveTrips = async () => {
      try {
        await AsyncStorage.setItem('trips', JSON.stringify(trips));
      } catch (error) {
        console.error('Failed to save trips:', error);
      }
    };

    saveTrips();
  }, [trips, isLoaded]);

  // Add a new trip to the start of the list.
  const addTrip = (trip: Trip) => {
    setTrips((currentTrips) => [trip, ...currentTrips]);
  };

  // Delete a trip using its id.
  const deleteTrip = (tripId: string) => {
    setTrips((currentTrips) => currentTrips.filter((trip) => trip.id !== tripId));
  };

  // Update a trip by merging new values into the existing trip object.
  const updateTrip = (tripId: string, updatedData: Partial<Trip>) => {
    setTrips((currentTrips) =>
      currentTrips.map((trip) =>
        trip.id === tripId ? { ...trip, ...updatedData } : trip
      )
    );
  };

  return (
    <TripsContext.Provider value={{ trips, addTrip, deleteTrip, updateTrip }}>
      {children}
    </TripsContext.Provider>
  );
}

export function useTrips() {
  const context = useContext(TripsContext);

  if (!context) {
    throw new Error('useTrips must be used inside a TripsProvider');
  }

  return context;
}