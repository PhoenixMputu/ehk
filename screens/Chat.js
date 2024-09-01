import { View, Text, Image, TouchableOpacity, StyleSheet, StatusBar } from 'react-native';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { COLORS, icons } from '../constants';

const Chat = ({ navigation }) => {
  /***
   * Implementing chat functionnality
   */
  return (
    <SafeAreaView style={[styles.container, {
      backgroundColor: "#fff"
    }]}>
      <StatusBar hidden={true} />
      <View style={[styles.contentContainer, { backgroundColor: "#fff" }]}>
        <View style={[styles.header, {
          backgroundColor: "#fff"
        }]}>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Image
                source={icons.arrowLeft}
                resizeMode="contain"
                style={[styles.headerIcon, {
                  tintColor: COLORS.greyscale900
                }]}
              />
            </TouchableOpacity>
            <Text style={[styles.headerTitle, {
              color: COLORS.greyscale900
            }]}>Jenny Wilona</Text>
          </View>
        </View>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  contentContainer: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 16,
    backgroundColor: "#fff",
  },
  headerTitle: {
    fontSize: 18,
    fontFamily: "semiBold",
    color: COLORS.black,
    marginLeft: 22
  },
  headerIcon: {
    height: 24,
    width: 24,
    tintColor: COLORS.black
  },
  actions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  actionIcon: {
    marginRight: 12,
  },
  chatContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  inputContainer: {
    flexDirection: 'row',
    backgroundColor: COLORS.white,
    paddingVertical: 8,
    paddingHorizontal: 16
  },
  inputMessageContainer: {
    flex: 1,
    flexDirection: 'row',
    marginLeft: 10,
    backgroundColor: COLORS.grayscale100,
    paddingVertical: 8,
    marginRight: 12,
    borderRadius: 12,
    alignItems: 'center'
  },
  attachmentIconContainer: {
    marginRight: 12,
  },
  input: {
    color: COLORS.blue2,
    flex: 1,
    paddingHorizontal: 10,
  },
  microContainer: {
    height: 48,
    width: 48,
    borderRadius: 49,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.primary,
  }
});

export default Chat;