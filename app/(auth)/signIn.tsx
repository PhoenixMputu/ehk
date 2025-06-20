import { StatusBar } from 'expo-status-bar';
import { Image, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import Input from '@/components/ui/Input';
import LargeButton from '@/components/ui/LargeButton';
import { WIDTH } from '@/constants/sizes';
import { Link } from 'expo-router';
import { useForm } from 'react-hook-form';

type FormValues = {
  email: string;
  password: string;
};

export default function SignIn() {
  const { control, handleSubmit, formState: { errors } } = useForm<FormValues>();

  const onSubmit = (data: FormValues) => {
    console.log(data);
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" animated />
      <Image
        source={require('@/assets/images/Logo.png')}
        style={{ width: 126, height: 80, resizeMode: 'contain', marginBottom: 56 }}
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
        placeholder="********"
        keyboardType="default"
        secureTextEntry
        rules={{
          required: 'Mot de passe requis',
          minLength: {
            value: 6,
            message: 'Minimum 6 caractères'
          }
        }}
        error={errors.password?.message}
      />
        <Link style={styles.forgetLink} href='/(app)/home'>Mot de passe oublie ?</Link>
      </View>
      <LargeButton title='Se Connecter' onPress={handleSubmit(onSubmit)} />
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
  title: {
    fontFamily: 'Inter_700Bold',
    fontSize: 36,
    fontWeight: '700'
  },
  form: {
    flexDirection: 'column',
    width: '100%',
    gap: 24,
    marginTop: 38
  },
  forgetLink: {
    textAlign: 'right',
    fontSize: 18,
    color: '#275A7D',
    fontFamily: 'Inter_400Regular',
    marginBottom: 18
  }
});
