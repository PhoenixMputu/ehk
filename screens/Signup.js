import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  Alert,
  TouchableOpacity,
  ActivityIndicator
} from 'react-native'
import React, { useCallback, useEffect, useReducer, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { COLORS, SIZES, icons, images } from '../constants'
import { reducer } from '../utils/reducers/formReducers'
import { validateInput } from '../utils/actions/formActions'
import { verifyUser } from '../services/api'
import useUserStore from '../utils/store'
import Input from '../components/Input'
import Button from '../components/Button'

const initialState = {
  inputValues: {
    email: '',
    password: '',
  },
  inputValidities: {
    email: false,
    password: false,
  },
  formIsValid: false,
}

const Signup = ({ navigation }) => {
  const [formState, dispatchFormState] = useReducer(reducer, initialState)
  const [uploading, setUploading] = useState(false)

  const inputChangedHandler = useCallback(
    (inputId, inputValue) => {
      const result = validateInput(inputId, inputValue)
      dispatchFormState({ inputId, validationResult: result, inputValue })
    },
    [dispatchFormState]
  )

  const handleSubmit = async () => {
    if (
      formState.inputValues.password !== formState.inputValues.confirmPassword
    ) {
      Alert.alert('Les mots de passe ne sont pas identiques !')
      return
    }

    if (formState.formIsValid) {
      setUploading(true)
      try {
        const result = await verifyUser(formState.inputValues.email)
        if (result && result.id) {
          Alert.alert('Warning', "L'email est déjà utilisé !")
          setUploading(false)
          return
        } else {
          const userData = {
            email: formState.inputValues.email,
            password: formState.inputValues.password,
          }
          useUserStore.getState().setUser(userData)
          setUploading(false)
          navigation.navigate('FillYourProfile')
        }
      } catch (error) {
        console.log(error)
        setUploading(false)
        Alert.alert('Erreur', error.message)
      }
    } else {
      Alert.alert('Validation échouée', 'Veuillez vérifier les informations')
    }
  }

  return (
    <SafeAreaView style={[styles.area, { backgroundColor: '#fff' }]}>
      <View style={[styles.container, { backgroundColor: '#fff' }]}>
        <ScrollView showsVerticalScrollIndicator={false}>
        {uploading && <ActivityIndicator size="large" color="#0000ff" />}
          <View style={styles.logoContainer}>
            <Image
              source={images.logo_EHK}
              resizeMode="contain"
              style={styles.logo}
            />
          </View>
          <Text
            style={[
              styles.title,
              {
                color: '#000',
              },
            ]}
          >
            Créer Votre Compte
          </Text>
          <Input
            id="email"
            onInputChanged={inputChangedHandler}
            errorText={formState.inputValidities['email']}
            placeholder="Email"
            placeholderTextColor={COLORS.black}
            icon={icons.email}
            keyboardType="email-address"
          />
          <Input
            onInputChanged={inputChangedHandler}
            errorText={formState.inputValidities['password']}
            autoCapitalize="none"
            id="password"
            placeholder="Mot de passe"
            placeholderTextColor={COLORS.black}
            icon={icons.padlock}
            secureTextEntry={true}
          />
          <Input
            onInputChanged={inputChangedHandler}
            errorText={formState.inputValidities['password']}
            autoCapitalize="none"
            id="confirmPassword"
            placeholder="Confirmer le mot de passe"
            placeholderTextColor={COLORS.black}
            icon={icons.padlock}
            secureTextEntry={true}
          />
          <Button
            title="S'inscrire"
            filled
            onPress={handleSubmit}
            style={styles.button}
          />
        </ScrollView>
        <View style={styles.bottomContainer}>
          <Text
            style={[
              styles.bottomLeft,
              {
                color: COLORS.black,
              },
            ]}
          >
            J'ai déjà un compte ?
          </Text>
          <TouchableOpacity onPress={() => navigation.navigate('Login')}>
            <Text style={styles.bottomRight}> Se connecter</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  area: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: COLORS.white,
  },
  logo: {
    width: 100,
    height: 100,
    tintColor: COLORS.primary,
  },
  logoContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 32,
  },
  title: {
    fontSize: 28,
    fontFamily: 'bold',
    color: COLORS.black,
    textAlign: 'center',
  },
  center: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 26,
    fontFamily: 'semiBold',
    color: COLORS.black,
    textAlign: 'center',
    marginBottom: 22,
  },
  bottomContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 18,
    position: 'absolute',
    bottom: 12,
    right: 0,
    left: 0,
  },
  bottomLeft: {
    fontSize: 14,
    fontFamily: 'regular',
    color: 'black',
  },
  bottomRight: {
    fontSize: 16,
    fontFamily: 'medium',
    color: COLORS.primary,
  },
  button: {
    marginVertical: 12,
    width: SIZES.width - 32,
    borderRadius: 30,
  },
})

export default Signup
