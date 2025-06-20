import { Inter_400Regular, Inter_600SemiBold, Inter_700Bold, useFonts } from "@expo-google-fonts/inter";
import * as SplashScreen from 'expo-splash-screen';

import { useEffect } from "react";

import { Stack } from "expo-router";
import { AuthProvider } from "@/contexts/AuthContext";

export default function AuthLayout() {

  return (
    <AuthProvider>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="(app)" />
        <Stack.Screen name="(auth)" />
      </Stack>
    </AuthProvider>
  );
}
