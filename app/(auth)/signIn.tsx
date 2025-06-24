import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { Alert, Image, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Link } from 'expo-router';
import { useForm } from 'react-hook-form';
import FontAwesome from '@expo/vector-icons/FontAwesome';

import Input from '@/components/ui/Input';
import LargeButton from '@/components/ui/LargeButton';
import { WIDTH } from '@/constants/sizes';

import { LoginForm } from '@/types/form.type';
import { auth } from '@/services/firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';

export default function SignIn() {
  const { 
    control, 
    handleSubmit, 
    formState: { errors, isSubmitting } 
  } = useForm<LoginForm>();
  const [isSubmited, setIsSubmited] = useState<boolean>(false);

  const onSubmit = (data: LoginForm) => {
    setIsSubmited(true);
    signInWithEmailAndPassword(auth, data.email, data.password)
      .then((userCredential) => {
        const user = userCredential.user;
        Alert.alert('Connexion réussie !', `Bonjour, ${user.email}`);
        setIsSubmited(false)
      })
      .catch((error) => {
        Alert.alert('Échec de la connexion', error.message);
        setIsSubmited(false)
      });
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" animated />
      <Image
        source={require('@/assets/images/Logo.png')}
        style={styles.logo}
      />
      <Text style={styles.subTitle}>Connectez-vous à votre compte</Text>
      
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
        submited={isSubmited}
      />
      
      {/* Section "Ou" avec séparateurs */}
      <View style={styles.orContainer}>
        <View style={styles.orLine} />
        <Text style={styles.orText}>Ou</Text>
        <View style={styles.orLine} />
      </View>
      
      {/* Section Connexion avec réseaux sociaux */}
      <Text style={styles.socialTitle}>Connectez-vous avec</Text>
      
      <View style={styles.socialButtonsContainer}>
        <View style={styles.socialButton}>
          <Image 
            source={require('@/assets/images/google-logo.png')} 
            style={styles.socialIcon} 
          />
        </View>
        
        <View style={styles.socialButton}>
          <FontAwesome name="facebook" size={28} color="black" style={styles.socialIcon} />
        </View>
      </View>
      
      <View style={styles.footer}>
        <Text style={styles.footerText}>Vous n'avez pas de compte ? </Text>
        <Link href="/(auth)/signUp" style={styles.footerLink}>Inscrivez-vous</Link>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
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
  subTitle: {
    fontFamily: 'Inter_700Bold',
    fontSize: 24,
    fontWeight: '700',
    color: '#1A1A1A',
    textAlign: 'center',
    marginBottom: 38
  },
  form: {
    width: '100%',
    gap: 16,
    marginBottom: 24
  },
  forgetLink: {
    textAlign: 'right',
    fontSize: 16,
    color: '#275A7D',
    fontFamily: 'Inter_600SemiBold',
    marginTop: 8
  },
  button: {
    backgroundColor: '#275A7D',
    borderRadius: 10,
    width: '100%',
  },
  orContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    marginVertical: 24
  },
  orLine: {
    flex: 1,
    height: 1,
    backgroundColor: '#E0E0E0'
  },
  orText: {
    fontFamily: 'Inter_500Medium',
    fontSize: 16,
    color: '#757575',
    marginHorizontal: 16
  },
  socialTitle: {
    fontFamily: 'Inter_500Medium',
    fontSize: 16,
    color: '#757575',
    marginBottom: 16,
    alignSelf: 'center'
  },
  socialButtonsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 16,
    width: '100%',
    marginBottom: 32
  },
  socialButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 100,
    padding: 16,
  },
  socialIcon: {
    width: 24,
    height: 24,
    color: '#3C5A99',
    textAlign: 'center'
  },
  footer: {
    flexDirection: 'row',
    marginTop: 'auto',
    marginBottom: 32,
    justifyContent: 'center',
    alignItems: 'center'
  },
  footerText: {
    fontFamily: 'Inter_400Regular',
    fontSize: 16,
    color: '#1A1A1A'
  },
  footerLink: {
    fontFamily: 'Inter_600SemiBold',
    fontSize: 16,
    color: '#275A7D',
    textDecorationLine: 'underline'
  }
});