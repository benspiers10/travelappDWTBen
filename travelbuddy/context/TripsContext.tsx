import { createContext, ReactNode, useContext, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Trip } from '@/types/trip';

type TripsContextType = {
  trips: Trip[];
  addTrip: (trip: Trip) => void;
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

        console.log('Loading trips from AsyncStorage...');
        console.log('Stored trips raw value:', storedTrips);

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
        console.log('Saving trips to AsyncStorage...');
        console.log('Trips to save:', trips);

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

  return (
    <TripsContext.Provider value={{ trips, addTrip }}>
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