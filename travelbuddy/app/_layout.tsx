import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import 'react-native-reanimated';

import { ThemeProviderCustom } from '@/context/ThemeContext';
import { TripsProvider } from '@/context/TripsContext';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import AppLaunchScreen from '../assets/components/AppLaunchScreen';


export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsReady(true);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  if (!isReady) {
    return <AppLaunchScreen />;
  }

  return (
    <SafeAreaProvider>
      <TripsProvider>
        <ThemeProviderCustom>
          <Stack>
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          </Stack>
          <StatusBar style="auto" />
        </ThemeProviderCustom>
      </TripsProvider>
    </SafeAreaProvider>
  );
}