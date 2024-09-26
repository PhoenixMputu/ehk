import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import Header from '../components/Header'
import { ScrollView } from 'react-native-virtualized-view'
import { COLORS } from '../constants'
import { OtpInput } from 'react-native-otp-entry'
import Button from '../components/Button'
import useUserStore from '../utils/store'

const CreateNewPIN = ({ navigation }) => {
  const user = useUserStore((state) => state.user)
  console.log(user)

  return (
    <SafeAreaView style={[styles.area, { backgroundColor: '#fff' }]}>
      <View style={[styles.container, { backgroundColor: '#fff' }]}>
        <Header title="Valider Votre Email" />
        <ScrollView contentContainerStyle={styles.center}>
          <Text
            style={[
              styles.title,
              {
                color: COLORS.greyscale900,
              },
            ]}
          >
            Nous avons envoyé un code à votre adresse email
          </Text>
          <OtpInput
            numberOfDigits={4}
            onTextChange={(text) => console.log(text)}
            focusColor={COLORS.primary}
            focusStickBlinkingDuration={500}
            onFilled={(text) => console.log(`OTP is ${text}`)}
            theme={{
              pinCodeContainerStyle: {
                backgroundColor: COLORS.secondaryWhite,
                borderColor: COLORS.secondaryWhite,
                borderWidth: 0.4,
                borderRadius: 10,
                height: 58,
                width: 58,
              },
              pinCodeTextStyle: {
                color: COLORS.black,
              },
            }}
          />
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.resendButton}
              onPress={() => {
                navigation.navigate('Fingerprint')
              }}
            >
              <Text style={styles.labelButton}>Renvoyer le code</Text>
            </TouchableOpacity>
            <Button
              title="Continue"
              filled
              style={styles.button}
              onPress={() => {
                navigation.navigate('Fingerprint')
              }}
            />
          </View>
        </ScrollView>
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
  title: {
    fontSize: 18,
    fontFamily: 'medium',
    color: COLORS.greyscale900,
    textAlign: 'center',
    marginVertical: 64,
  },
  OTPStyle: {
    borderColor: COLORS.black,
    borderRadius: 8,
    height: 58,
    width: 58,
    backgroundColor: COLORS.secondaryWhite,
    borderBottomColor: 'gray',
    borderBottomWidth: 0.4,
    borderWidth: 0.4,
    borderColor: 'gray',
  },
  codeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 24,
    justifyContent: 'center',
  },
  code: {
    fontSize: 18,
    fontFamily: 'medium',
    color: COLORS.greyscale900,
    textAlign: 'center',
  },
  time: {
    fontFamily: 'medium',
    fontSize: 18,
    color: COLORS.primary,
  },
  button: {
    borderRadius: 32,
    width: '100%',
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    marginBottom: 100,
  },
  buttonContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
    marginVertical: 60,
  },
  resendButton: {
    borderRadius: 32,
    backgroundColor: COLORS.white,
    width: '100%',
    borderColor: COLORS.primary,
  },
  labelButton: {
    textAlign: 'center',
    fontSize: 18,
    fontFamily: 'medium',
    color: COLORS.blue
  }
})

export default CreateNewPIN
