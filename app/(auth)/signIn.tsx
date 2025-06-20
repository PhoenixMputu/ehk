import { StatusBar } from 'expo-status-bar';
import { Alert, Image, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Link } from 'expo-router';
import { useForm } from 'react-hook-form';

import Input from '@/components/ui/Input';
import LargeButton from '@/components/ui/LargeButton';
import { WIDTH } from '@/constants/sizes';

import { LoginForm } from '@/types/form.type';
import { app, auth } from '@/services/firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';

// Solution alternative 2 : Importer directement
// import { auth, signInWithEmailAndPassword } from '@/services/firebase';

export default function SignIn() {
  const { 
    control, 
    handleSubmit, 
    formState: { errors, isSubmitting } 
  } = useForm<LoginForm>();

  const onSubmit = (data: LoginForm) => {
    signInWithEmailAndPassword(auth, data.email, data.password)
      .then((userCredential) => {
        const user = userCredential.user;
        Alert.alert('Login successful!', `Hello, ${user.email}`);
      })
      .catch((error) => {
        Alert.alert('Login failed!', error.message);
      });
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" animated />
      <Image
        source={require('@/assets/images/Logo.png')}
        style={styles.logo}
      />
      <Text style={styles.title}>Connectez-vous à votre compte</Text>
      <View style={styles.form}>
        <Input
          control={control}
          name="email"
          icon="mail"
          placeholder="Adresse email"
          keyboardType="email-address"
          returnKeyType="next"
          autoCapitalize="none"
          autoCorrect={false}
          rules={{
            required: 'Email requis',
            pattern: {
              value: /^\S+@\S+\.\S+$/,
              message: 'Format email invalide'
            }
          }}
          error={errors.email?.message}
        />
        <Input
          control={control}
          name="password"
          icon="lock"
          placeholder="Mot de passe"
          secureTextEntry
          returnKeyType="done"
          rules={{
            required: 'Mot de passe requis',
            minLength: {
              value: 6,
              message: 'Minimum 6 caractères'
            }
          }}
          error={errors.password?.message}
        />
        <Link href="/(app)/home" style={styles.forgetLink}>
          Mot de passe oublié ?
        </Link>
      </View>
      <LargeButton 
        title='Se Connecter' 
        onPress={handleSubmit(onSubmit)}
        disabled={isSubmitting}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    paddingHorizontal: Math.max(WIDTH * 0.05, 16),
    alignItems: 'center'
  },
  logo: {
    width: 126,
    height: 80,
    resizeMode: 'contain',
    marginBottom: 56
  },
  title: {
    fontFamily: 'Inter_700Bold',
    fontSize: 24,
    fontWeight: '700',
    textAlign: 'center'
  },
  form: {
    width: '100%',
    gap: 16,
    marginTop: 38,
    marginBottom: 8
  },
  forgetLink: {
    textAlign: 'right',
    fontSize: 16,
    color: '#275A7D',
    fontFamily: 'Inter_400Regular',
    marginTop: 8
  }
});