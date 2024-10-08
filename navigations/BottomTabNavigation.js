import { View, Platform, Image, Text } from 'react-native'
import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { COLORS, FONTS, icons } from '../constants'
import { Favourite, Home, Inbox, Profile } from '../screens'
import Entypo from '@expo/vector-icons/Entypo';

const Tab = createBottomTabNavigator()

const BottomTabNavigation = () => {
    return (
        <Tab.Navigator
            screenOptions={{
                tabBarShowLabel: false,
                headerShown: false,
                tabBarStyle: {
                    position: 'absolute',
                    justifyContent: 'center',
                    bottom: 0,
                    right: 0,
                    left: 0,
                    elevation: 0,
                    height: Platform.OS === 'ios' ? 90 : 60,
                    backgroundColor: COLORS.white,
                    borderTopColor: 'transparent',
                },
            }}
        >
            <Tab.Screen
                name="Home"
                component={Home}
                options={{
                    tabBarIcon: ({ focused }) => {
                        return (
                            <View style={{ alignItems: 'center' }}>
                                <Image
                                    source={
                                        focused
                                            ? icons.home
                                            : icons.home2Outline
                                    }
                                    resizeMode="contain"
                                    style={{
                                        height: 24,
                                        width: 24,
                                        tintColor: focused
                                            ? COLORS.primary
                                            : COLORS.gray3,
                                    }}
                                />
                                <Text
                                    style={{
                                        ...FONTS.body4,
                                        color: focused
                                            ? COLORS.primary
                                            : COLORS.gray3,
                                    }}
                                >
                                    Accueil
                                </Text>
                            </View>
                        )
                    },
                }}
            />
            <Tab.Screen
                name="Favourite"
                component={Favourite}
                options={{
                    tabBarIcon: ({ focused }) => {
                        return (
                            <View style={{ alignItems: 'center' }}>
                                <Image
                                    source={icons.add}
                                    resizeMode="contain"
                                    style={{
                                        height: 24,
                                        width: 24,
                                        tintColor: focused
                                            ? COLORS.primary
                                            : COLORS.gray3,
                                    }}
                                />
                                <Text
                                    style={{
                                        ...FONTS.body4,
                                        color: focused
                                            ? COLORS.primary
                                            : COLORS.gray3,
                                    }}
                                >
                                    Ajouter
                                </Text>
                            </View>
                        )
                    },
                }}
            />
            <Tab.Screen
                name="Inbox"
                component={Inbox}
                options={{
                    tabBarIcon: ({ focused }) => {
                        return (
                            <View style={{ alignItems: 'center', position: 'relative' }}>
                                <Image
                                    source={
                                        focused
                                            ? icons.chatBubble2
                                            : icons.chatBubble2Outline
                                    }
                                    resizeMode="contain"
                                    style={{
                                        height: 24,
                                        width: 24,
                                        tintColor: focused
                                            ? COLORS.primary
                                            : COLORS.gray3,
                                    }}
                                />
                                <Entypo name="dot-single" style={{ position: 'absolute', right: 5, top: -17, tintColor: focused
                                            ? COLORS.primary
                                            : COLORS.gray3, }} size={42} color="blue" />
                                <Text
                                    style={{
                                        ...FONTS.body4,
                                        color: focused
                                            ? COLORS.primary
                                            : COLORS.gray3,
                                    }}
                                >
                                    Notifications
                                </Text>
                            </View>
                        )
                    },
                }}
            />
            <Tab.Screen
                name="Profile"
                component={Profile}
                options={{
                    tabBarIcon: ({ focused }) => {
                        return (
                            <View style={{ alignItems: 'center' }}>
                                <Image
                                    source={
                                        focused ? icons.user : icons.userOutline
                                    }
                                    resizeMode="contain"
                                    style={{
                                        height: 24,
                                        width: 24,
                                        tintColor: focused
                                            ? COLORS.primary
                                            : COLORS.gray3,
                                    }}
                                />
                                <Text
                                    style={{
                                        ...FONTS.body4,
                                        color: focused
                                            ? COLORS.primary
                                            : COLORS.gray3,
                                    }}
                                >
                                    Profile
                                </Text>
                            </View>
                        )
                    },
                }}
            />
        </Tab.Navigator>
    )
}

export default BottomTabNavigation
