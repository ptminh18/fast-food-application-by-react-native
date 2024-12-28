import { Tabs } from 'expo-router';
import React from 'react';
import { Platform } from 'react-native';
import { IconSymbol } from '@/src/components/ui/IconSymbol';
import { Colors } from '@/src/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import { HapticTab } from '@/src/components/HapticTab';

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors.light.background,
        tabBarInactiveTintColor: 'gainsboro',
        headerShown: false, // show header or not
        tabBarButton: HapticTab,
        
        tabBarStyle: Platform.select({
          ios: {
            // Use a transparent background on iOS to show the blur effect
            backgroundColor: Colors.light.tint,
            position: 'absolute',
          },
          default: {},
        }),
      }}>
      <Tabs.Screen
        name="menu"
        options={{
          title: 'Menu',
          headerShown: false, //hide header
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="digitalcrown.horizontal.arrow.counterclockwise.fill" color={color} />,
        }}
      />
      <Tabs.Screen
        name="orders"
        options={{
          title: 'Orders',
          headerShown: false, //hide header
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="list.bullet" color={color} />,
        }}
      />
    </Tabs>
  );
}
