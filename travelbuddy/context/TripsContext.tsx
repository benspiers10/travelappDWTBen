import { Trip } from '@/types/trip';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createContext, ReactNode, useContext, useEffect, useState } from 'react';

type TripsContextType = {
  trips: Trip[];
  addTrip: (trip: Trip) => void;
  deleteTrip: (tripId: string) => void;
};

const TripsContext = createContext<TripsContextType | undefined>(undefined);

type TripsProviderProps = {
  children: ReactNode;
};

export function TripsProvider({ children }: TripsProviderProps) {
  const [trips, setTrips] = useState<Trip[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

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

  const addTrip = (trip: Trip) => {
    setTrips((currentTrips) => [trip, ...currentTrips]);
  };

  const deleteTrip = (tripId: string) => {
    setTrips((currentTrips) => currentTrips.filter((trip) => trip.id !== tripId));
  };

  return (
    <TripsContext.Provider value={{ trips, addTrip, deleteTrip }}>
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