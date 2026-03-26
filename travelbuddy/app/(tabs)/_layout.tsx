import { Colors } from '@/constants/theme'; // adjust path if needed
import { useColorScheme } from '@/hooks/use-color-scheme';
import Ionicons from "@expo/vector-icons/Ionicons";
import { Tabs } from "expo-router";


export default function TabsLayout() {

  const colorScheme = useColorScheme() ?? "dark";

  return (
    <Tabs
      screenOptions={{
       headerShown: false,
        //   { backgroundColor: Colors[colorScheme].background,
        // headerTintColor: Colors[colorScheme].text},

        tabBarStyle: {
          backgroundColor: Colors[colorScheme].card,
          borderTopColor: Colors[colorScheme].border,
        },

        tabBarActiveTintColor: Colors[colorScheme].tint,
        tabBarInactiveTintColor: Colors[colorScheme].icon,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home" size={size} color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="track"
        options={{
          title: "Track",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="location" size={size} color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="trips"
        options={{
          title: "Trips",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="map" size={size} color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="person" size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}