import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Image, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import Input from '@/components/ui/Input';
import { WIDTH } from '@/constants/sizes';
import { RegisterForm } from '@/types/form.type';
import LargeButton from '@/components/ui/LargeButton';

const signUp = () => {
    const { 
        control, 
        handleSubmit, 
        formState: { errors, isSubmitting } 
      } = useForm<RegisterForm>();
    const [isSubmited, setIsSubmited] = useState<boolean>(false);

    const onSubmit = (data:RegisterForm) => {
        setIsSubmited(true);
        console.log(data);
        console.log(data);
        setIsSubmited(false);
    }
      
    return (
        <SafeAreaView style={styles.container}>
            <StatusBar style="dark" animated />
            <Image
                source={require('@/assets/images/Logo.png')}
                style={styles.logo}
            />
            <Text style={styles.title}>Creer votre compte</Text>
            <View style={styles.form}>
                <Input
                    control={control}
                    name="firstName"
                    icon="user"
                    placeholder="Prenom"
                    keyboardType="default"
                    returnKeyType="next"
                    autoCapitalize="none"
                    autoCorrect={false}
                    rules={{
                    required: 'Prenom requis',
                    pattern: {
                        value: /^[\p{L}]+(?:[ '\-][\p{L}]+)*$/u,
                        message: 'Format email invalide'
                    }
                    }}
                    error={errors.firstName?.message}
                />

                <Input
                    control={control}
                    name="name"
                    icon="user"
                    placeholder="Nom"
                    keyboardType="default"
                    returnKeyType="next"
                    autoCapitalize="none"
                    autoCorrect={false}
                    rules={{
                    required: 'Prenom requis',
                    pattern: {
                        value: /^[\p{L}]+(?:[ '\-][\p{L}]+)*$/u,
                        message: 'Format email invalide'
                    }
                    }}
                    error={errors.name?.message}
                />

                <Input
                    control={control}
                    name="phone"
                    icon="phone"
                    placeholder="+243811533644"
                    keyboardType="phone-pad"
                    returnKeyType="next"
                    autoCapitalize="none"
                    autoCorrect={false}
                    rules={{
                    required: 'Telephone requis',
                    pattern: {
                        value: /^(?:0\d{9}|\+243\d{9})$/,
                        message: 'Format telephone invalide'
                    }
                    }}
                    error={errors.phone?.message}
                />

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
                    placeholder="Confirmer votre password"
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

                <LargeButton 
                    title='Creer un compte' 
                    onPress={handleSubmit(onSubmit)}
                    disabled={isSubmitting}
                    submited={isSubmited}
                />
            </View>
        </SafeAreaView>
    )
}

export default signUp

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
        marginBottom: 28
    },
    title: {
        fontFamily: 'Inter_700Bold',
        fontSize: 32,
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
    
})