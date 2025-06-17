import { Redirect } from 'expo-router';
import { useAuth } from '@/contexts/AuthContext';

export default function Index() {
  const { token, isLoading } = useAuth();

  if (isLoading) return null;

  return token ? <Redirect href="/(app)/home" /> : <Redirect href="/(auth)/signIn" />;
}