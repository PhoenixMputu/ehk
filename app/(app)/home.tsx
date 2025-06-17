import AuthGuard from '@/components/AuthGuard';
import { Text, View } from 'react-native';

export default function Home() {
  return (
    <AuthGuard>
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Bienvenue sur l'écran d'accueil!</Text>
      </View>
    </AuthGuard>
  );
}