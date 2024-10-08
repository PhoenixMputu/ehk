import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import { SIZES, COLORS, icons } from '../constants'
import { useNavigation } from '@react-navigation/native'
import { useTheme } from '../theme/ThemeProvider'

const Header = ({ title, icon }) => {
  const navigation = useNavigation()
  const { colors, dark } = useTheme()
  const visibleIcon = icon ? icon : false

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: '#fff',
        },
      ]}
    >
      {visibleIcon && (
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image
            source={icons.back}
            resizeMode="contain"
            style={[
              styles.backIcon,
              {
                tintColor: '#000',
              },
            ]}
          />
        </TouchableOpacity>
      )}
      <Text
        style={[
          styles.title,
          {
            color: colors.black,
          },
        ]}
      >
        {title}
      </Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.white,
    width: SIZES.width - 32,
    flexDirection: 'row',
    alignItems: 'center',
  },
  backIcon: {
    width: 24,
    height: 24,
    marginRight: 16,
  },
  title: {
    fontSize: 24,
    fontFamily: 'bold',
    color: COLORS.black,
  },
})

export default Header
