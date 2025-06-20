import { Stack } from 'expo-router';
import AuthGuard from '@/components/AuthGuard';

export default function AppLayout() {
  return (
    <AuthGuard>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="home" />
      </Stack>
    </AuthGuard>
  );
}