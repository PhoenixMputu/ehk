import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { NavigationContainer } from '@react-navigation/native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import React, { useState, useEffect } from 'react'
import {
  AddNewCard,
  Booking,
  BookingDetails,
  Call,
  CancelBooking,
  CancelBookingPaymentMethods,
  ChangeEmail,
  ChangePIN,
  ChangePassword,
  Chat,
  CreateNewPIN,
  CreateNewPassword,
  CustomerService,
  EReceipt,
  EditProfile,
  EstateDetails,
  EstateReviews,
  FeaturedEstates,
  FillYourProfile,
  Fingerprint,
  ForgotPasswordEmail,
  ForgotPasswordPhoneNumber,
  Gallery,
  HelpCenter,
  InviteFriends,
  Login,
  MyBooking,
  Notifications,
  OTPVerification,
  OurRecommendation,
  PaymentMethods,
  ReviewSummary,
  Search,
  SettingsLanguage,
  SettingsNotifications,
  SettingsPayment,
  SettingsPrivacyPolicy,
  SettingsSecurity,
  Signup,
} from '../screens'
import BottomTabNavigation from './BottomTabNavigation'

const Stack = createNativeStackNavigator()

const AppNavigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{ headerShown: false }}
        // replace the second onboaring1 with login in order to make the user not to see the onboarding
        // when login the next time
        initialRouteName="Login"
      >
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Signup" component={Signup} />
        <Stack.Screen
          name="ForgotPasswordEmail"
          component={ForgotPasswordEmail}
        />
        <Stack.Screen
          name="ForgotPasswordPhoneNumber"
          component={ForgotPasswordPhoneNumber}
        />
        <Stack.Screen name="OTPVerification" component={OTPVerification} />
        <Stack.Screen name="CreateNewPassword" component={CreateNewPassword} />
        <Stack.Screen name="FillYourProfile" component={FillYourProfile} />
        <Stack.Screen name="CreateNewPIN" component={CreateNewPIN} />
        <Stack.Screen name="Main" component={BottomTabNavigation} />
        <Stack.Screen name="EditProfile" component={EditProfile} />
        <Stack.Screen
          name="SettingsNotifications"
          component={SettingsNotifications}
        />
        <Stack.Screen name="SettingsPayment" component={SettingsPayment} />
        <Stack.Screen name="AddNewCard" component={AddNewCard} />
        <Stack.Screen name="SettingsSecurity" component={SettingsSecurity} />
        <Stack.Screen name="ChangePIN" component={ChangePIN} />
        <Stack.Screen name="ChangePassword" component={ChangePassword} />
        <Stack.Screen name="ChangeEmail" component={ChangeEmail} />
        <Stack.Screen name="SettingsLanguage" component={SettingsLanguage} />
        <Stack.Screen
          name="SettingsPrivacyPolicy"
          component={SettingsPrivacyPolicy}
        />
        <Stack.Screen name="InviteFriends" component={InviteFriends} />
        <Stack.Screen name="HelpCenter" component={HelpCenter} />
        <Stack.Screen name="CustomerService" component={CustomerService} />
        <Stack.Screen name="EReceipt" component={EReceipt} />
        <Stack.Screen name="Call" component={Call} />
        <Stack.Screen name="Chat" component={Chat} />
        <Stack.Screen name="Notifications" component={Notifications} />
        <Stack.Screen name="OurRecommendation" component={OurRecommendation} />
        <Stack.Screen name="Search" component={Search} />
        <Stack.Screen name="FeaturedEstates" component={FeaturedEstates} />
        <Stack.Screen name="EstateDetails" component={EstateDetails} />
        <Stack.Screen name="EstateReviews" component={EstateReviews} />
        <Stack.Screen name="Gallery" component={Gallery} />
        <Stack.Screen name="Booking" component={Booking} />
        <Stack.Screen name="BookingDetails" component={BookingDetails} />
        <Stack.Screen name="PaymentMethods" component={PaymentMethods} />
        <Stack.Screen name="ReviewSummary" component={ReviewSummary} />
        <Stack.Screen name="MyBooking" component={MyBooking} />
        <Stack.Screen name="CancelBooking" component={CancelBooking} />
        <Stack.Screen
          name="CancelBookingPaymentMethods"
          component={CancelBookingPaymentMethods}
        />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default AppNavigation
