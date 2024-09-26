import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Alert,
  Image,
  TouchableOpacity,
  Modal,
  TouchableWithoutFeedback,
  FlatList,
  ActivityIndicator,
} from 'react-native'
import { Picker } from '@react-native-picker/picker'
import React, { useCallback, useEffect, useReducer, useState } from 'react'
import { COLORS, SIZES, FONTS, icons } from '../constants'
import { SafeAreaView } from 'react-native-safe-area-context'
import Header from '../components/Header'
import { reducer } from '../utils/reducers/formReducers'
import { validateInput } from '../utils/actions/formActions'
import { MaterialCommunityIcons, Feather, Ionicons } from '@expo/vector-icons'
import { launchImagePicker } from '../utils/ImagePickerHelper'
import Input from '../components/Input'
import { getFormatedDate } from 'react-native-modern-datepicker'
import DatePickerModal from '../components/DatePickerModal'
import Button from '../components/Button'
import province from '../constants/province.json'
import useUserStore from '../utils/store'
import { uploadImageCloudinary, signup } from '../services/api'

const initialState = {
  inputValues: {
    firstname: '',
    lastname: '',
    phoneNumber: '',
  },
  inputValidities: {
    firstname: false,
    lastname: false,
    phoneNumber: false,
  },
  formIsValid: false,
}

const FillYourProfile = ({ navigation }) => {
  const [image, setImage] = useState(null)
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState()
  const [sex, setSex] = useState('M')
  const [formState, dispatchFormState] = useReducer(reducer, initialState)
  const [areas, setAreas] = useState([])
  const [selectedArea, setSelectedArea] = useState(null)
  const [modalVisible, setModalVisible] = useState(false)
  const [openStartDatePicker, setOpenStartDatePicker] = useState(false)
  const { user, loadUserFromStorage } = useUserStore()

  const today = new Date()
  const startDate = getFormatedDate(
    new Date(today.setDate(today.getDate() + 1)),
    'YYYY/MM/DD'
  )

  const [startedDate, setStartedDate] = useState('12/12/2023')
  console.log('Test' + startedDate)

  const handleOnPressStartDate = () => {
    setOpenStartDatePicker(!openStartDatePicker)
  }

  const inputChangedHandler = useCallback(
    (inputId, inputValue) => {
      const result = validateInput(inputId, inputValue)
      dispatchFormState({ inputId, validationResult: result, inputValue })
    },
    [dispatchFormState]
  )

  useEffect(() => {
    if (error) {
      Alert.alert('An error occured', error)
    }
  }, [error])

  const pickImage = async () => {
    try {
      const tempUri = await launchImagePicker()

      if (!tempUri) return

      setImage({ uri: tempUri })
    } catch (error) {
      Alert.alert("Impossible de charger l'image. Veuillez réessayer.")
    }
  }

  useEffect(() => {
    let areaData = province.map((item) => {
      return {
        id: item.id,
        item: item.name,
      }
    })

    setAreas(areaData)
  }, [])

  function RenderAreasCodesModal() {
    const renderItem = ({ item }) => {
      return (
        <TouchableOpacity
          style={{
            padding: 10,
            flexDirection: 'row',
          }}
          onPress={() => {
            setSelectedArea(item),
              console.log(selectedArea),
              setModalVisible(false)
          }}
        >
          <Text style={{ fontSize: 16, color: '#fff' }}>{item.item}</Text>
        </TouchableOpacity>
      )
    }
    return (
      <Modal animationType="slide" transparent={true} visible={modalVisible}>
        <TouchableWithoutFeedback onPress={() => setModalVisible(false)}>
          <View
            style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}
          >
            <View
              style={{
                height: SIZES.height,
                width: SIZES.width,
                backgroundColor: COLORS.primary,
                borderRadius: 12,
              }}
            >
              <TouchableOpacity
                onPress={() => setModalVisible(false)}
                style={styles.closeBtn}
              >
                <Ionicons
                  name="close-outline"
                  size={24}
                  color={COLORS.primary}
                />
              </TouchableOpacity>
              <FlatList
                data={areas}
                renderItem={renderItem}
                horizontal={false}
                keyExtractor={(item) => item.id}
                style={{
                  padding: 20,
                  marginBottom: 20,
                }}
              />
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    )
  }

  const validateForm = () => {
    if (!formState.formIsValid) {
      Alert.alert('Validation échouée', 'Veuillez vérifier les informations')
      return false
    }

    if (formState.inputValues.phoneNumber.length !== 10) {
      Alert.alert('Veuillez entrer un numéro de téléphone valide !')
      return false
    }

    return true
  }

  const uploadAvatar = async () => {
    if (image && image.uri) {
      setUploading(true)
      const formData = new FormData()
      formData.append('file', {
        uri: image.uri,
        name: 'photo.jpg',
        type: 'image/jpeg',
      })

      try {
        const avatarUrl = await uploadImageCloudinary(formData)
        setUploading(false)
        return avatarUrl
      } catch (error) {
        setUploading(false)
        console.error("Erreur d'upload :", error)
        throw error
      }
    }
    return ''
  }

  const handleSubmit = async () => {
    if (!validateForm()) {
      return
    }

    try {
      const avatar = await uploadAvatar()

      const userData = await signup({
        email: user.email,
        password: user.password,
        avatar,
        firstName: formState.inputValues.firstname,
        lastName: formState.inputValues.lastname,
        phoneNumber: formState.inputValues.phoneNumber,
        province: selectedArea.id,
        birthday: startDate,
        sex,
      })
      useUserStore.getState().setUser({
        id: userData.user.id,
        lastName: userData.user.lastName,
        firstName: userData.user.firstName,
        email: userData.user.email,
        phoneNumber: userData.user.phoneNumber,
        avatar: userData.user.avatar,
        birthday: userData.user.birthday,
        sex: userData.user.sex,
        access_token: userData.access_token,
      });
      navigation.navigate('CreateNewPIN')
    } catch (error) {
      Alert.alert("Erreur lors de l'inscription ")
      console.error("Erreur lors de l'inscription :", error)
    }
  }

  return (
    <SafeAreaView style={[styles.area, { backgroundColor: '#fff' }]}>
      <View style={[styles.container, { backgroundColor: '#fff' }]}>
        <Header title="Completer votre profil" />
        <ScrollView showsVerticalScrollIndicator={false}>
          {uploading && <ActivityIndicator size="large" color="#0000ff" />}
          <View style={{ alignItems: 'center', marginVertical: 12 }}>
            <View style={styles.avatarContainer}>
              <Image
                source={image === null ? icons.userDefault2 : image}
                resizeMode="cover"
                style={styles.avatar}
              />
              <TouchableOpacity onPress={pickImage} style={styles.pickImage}>
                <MaterialCommunityIcons
                  name="pencil-outline"
                  size={24}
                  color={COLORS.white}
                />
              </TouchableOpacity>
            </View>
          </View>
          <View>
            <Input
              id="firstname"
              onInputChanged={inputChangedHandler}
              errorText={formState.inputValidities['firstname']}
              placeholder="Prénom"
              placeholderTextColor={COLORS.gray}
            />
            <Input
              id="lastname"
              onInputChanged={inputChangedHandler}
              errorText={formState.inputValidities['lastname']}
              placeholder="Nom"
              placeholderTextColor={COLORS.gray}
            />
            <Input
              id="phoneNumber"
              onInputChanged={inputChangedHandler}
              errorText={formState.inputValidities['phoneNumber']}
              placeholder="Téléphone"
              placeholderTextColor={COLORS.gray}
              keyboardType="numeric"
            />
            <View
              style={[
                styles.picker,
                {
                  width: SIZES.width - 32,
                  backgroundColor: COLORS.tansparentPrimary,
                  borderColor: COLORS.greyscale500,
                },
              ]}
            >
              <Text style={styles.pickerText}>Sexe</Text>
              <Picker
                style={styles.pickerStyle}
                selectedValue={sex}
                onValueChange={(itemValue) => setSex(itemValue)}
              >
                <Picker.Item label="M" value="M" />
                <Picker.Item label="F" value="F" />
              </Picker>
            </View>
            <View
              style={{
                width: SIZES.width - 32,
              }}
            >
              <TouchableOpacity
                style={[
                  styles.inputBtn,
                  {
                    backgroundColor: COLORS.tansparentPrimary,
                    borderColor: COLORS.greyscale500,
                  },
                ]}
                onPress={handleOnPressStartDate}
              >
                <Text style={{ ...FONTS.body4, color: COLORS.grayscale400 }}>
                  {startedDate}
                </Text>
                <Feather
                  name="calendar"
                  size={24}
                  color={COLORS.grayscale400}
                />
              </TouchableOpacity>
              <View
                style={[
                  styles.inputContainer,
                  {
                    backgroundColor: COLORS.greyscale500,
                    borderColor: COLORS.greyscale500,
                  },
                ]}
              >
                <TouchableOpacity
                  style={styles.selectFlagContainer}
                  onPress={() => setModalVisible(true)}
                >
                  <Text style={styles.placeholder}>
                    {selectedArea
                      ? selectedArea?.item
                      : 'Entrer votre province'}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </ScrollView>
      </View>
      {RenderAreasCodesModal()}
      <DatePickerModal
        open={openStartDatePicker}
        selectedDate={startedDate}
        onClose={() => setOpenStartDatePicker(false)}
        onChangeStartDate={(date) => setStartedDate(date)}
      />
      <View style={styles.bottomContainer}>

        <Button
          title="Continuer"
          filled
          style={styles.continueButton}
          onPress={handleSubmit}
        />
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
  avatarContainer: {
    marginVertical: 12,
    alignItems: 'center',
    width: 130,
    height: 130,
    borderRadius: 65,
  },
  avatar: {
    height: 130,
    width: 130,
    borderRadius: 65,
  },
  pickImage: {
    height: 42,
    width: 42,
    borderRadius: 21,
    backgroundColor: COLORS.primary,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    bottom: 0,
    right: 0,
  },
  inputContainer: {
    flexDirection: 'row',
    borderColor: COLORS.greyscale500,
    borderWidth: 0.4,
    borderRadius: 12,
    height: 52,
    width: SIZES.width - 32,
    alignItems: 'center',
    marginVertical: 12,
    backgroundColor: COLORS.greyscale500,
  },
  downIcon: {
    width: 10,
    height: 10,
    tintColor: '#111',
  },
  selectFlagContainer: {
    width: '100%',
    height: 50,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: COLORS.tansparentPrimary,
    borderRadius: 12,
    paddingLeft: 8,
  },
  flagIcon: {
    width: 30,
    height: 30,
  },
  input: {
    flex: 1,
    marginVertical: 10,
    height: 40,
    fontSize: 14,
    color: '#111',
  },
  inputBtn: {
    borderWidth: 1,
    borderRadius: 12,
    borderColor: COLORS.greyscale500,
    height: 52,
    paddingLeft: 8,
    fontSize: 18,
    justifyContent: 'space-between',
    marginTop: 4,
    backgroundColor: COLORS.greyscale500,
    flexDirection: 'row',
    alignItems: 'center',
    paddingRight: 8,
  },
  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  bottomContainer: {
    position: 'absolute',
    bottom: 32,
    right: 16,
    left: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: SIZES.width - 32,
    alignItems: 'center',
  },
  continueButton: {
    width: '100%',
    borderRadius: 32,
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
  },
  closeBtn: {
    width: 42,
    height: 42,
    borderRadius: 999,
    backgroundColor: COLORS.white,
    position: 'absolute',
    right: 16,
    top: 32,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 9999,
  },
  placeholder: {
    color: COLORS.grayscale400,
    fontSize: 14,
  },
  picker: {
    flexDirection: 'row',
    paddingHorizontal: 8,
    borderRadius: 12,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  pickerText: {
    width: '100',
    fontSize: 14,
    color: COLORS.grayscale400,
  },
  pickerStyle: {
    width: '40%',
  },
})

export default FillYourProfile
