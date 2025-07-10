import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Link } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Alert, Image, StyleSheet, Text, View } from 'react-native';
import { RFPercentage } from "react-native-responsive-fontsize";
import { SafeAreaView } from 'react-native-safe-area-context';

import Input from '@/components/ui/Input';
import LargeButton from '@/components/ui/LargeButton';
import { WIDTH } from '@/constants/sizes';

import { auth } from '@/services/firebase';
import { RegisterForm } from '@/types/form.type';
import { signInWithEmailAndPassword } from 'firebase/auth';

export default function SignUp() {
  const { 
    control, 
    handleSubmit, 
    formState: { errors } 
  } = useForm<RegisterForm>();
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const onSubmit = (data: RegisterForm) => {
    setIsSubmitting(true);
    signInWithEmailAndPassword(auth, data.email, data.password)
      .then((userCredential) => {
        const user = userCredential.user;
        Alert.alert('Connexion réussie !', `Bonjour, ${user.email}`);
        setIsSubmitting(false);
      })
      .catch((error) => {
        Alert.alert('Échec de la connexion', error.message);
        setIsSubmitting(false);
      });
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" animated />
      <Image
        source={require('@/assets/images/Logo.png')}
        style={styles.logo}
      />
      <Text style={styles.subTitle}>Rejoinez-nous et trouvez le logement de votre rêves</Text>
      
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

        <Input
          control={control}
          name="confirmPassword"
          icon="lock"
          placeholder="Confirme Mot de passe"
          secureTextEntry
          returnKeyType="done"
          rules={{
            required: 'Mot de passe requis',
            minLength: {
              value: 6,
              message: 'Minimum 6 caractères'
            }
          }}
          error={errors.confirmPassword?.message}
        />
        
      </View>
      
      <LargeButton 
        title="Continuer"
        onPress={handleSubmit(onSubmit)}
        disabled={isSubmitting}
        submited={isSubmitting}
      />
      
      <View style={styles.orContainer}>
        <View style={styles.orLine} />
        <Text style={styles.orText}>Ou</Text>
        <View style={styles.orLine} />
      </View>
      
      <Text style={styles.socialTitle}>Continuez avec</Text>
      
      <View style={styles.socialButtonsContainer}>
        <View style={styles.socialButton}>
          <Image 
            source={require('@/assets/images/google-logo.png')} 
            style={styles.socialIcon} 
          />
        </View>
        
        <View style={styles.socialButton}>
          <FontAwesome name="facebook" size={24} color="#3C5A99" />
        </View>
      </View>
      
      <View style={styles.footer}>
        <Text style={styles.footerText}>{"J'ai deja un compte ? "}</Text>
        <Link href="/(auth)/signIn" style={styles.footerLink}>Se Connecter</Link>
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
    marginBottom: 56,
    marginTop: 24
  },
  subTitle: {
    fontFamily: 'Inter_700Bold',
    fontSize: RFPercentage(3),
    fontWeight: '700',
    color: '#1A1A1A',
    textAlign: 'left',
    marginBottom: 38
  },
  form: {
    width: '100%',
    gap: 16,
    marginBottom: 24
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
    gap: 24,
    width: '100%',
    marginBottom: 32,
    justifyContent: 'center'
  },
  socialButton: {
    width: 60,
    height: 60,
    borderRadius: 30,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    justifyContent: 'center',
    alignItems: 'center'
  },
  socialIcon: {
    width: 24,
    height: 24
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