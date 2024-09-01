import { View, Text, StyleSheet, TouchableOpacity, Image, Modal, TouchableWithoutFeedback } from 'react-native';
import React, { useState } from 'react';
import { COLORS, SIZES, icons, images, illustrations } from '../constants';
import { StatusBar } from 'expo-status-bar';
import AutoSlider from '../components/AutoSlider';
import { ScrollView } from 'react-native-virtualized-view';
import Button from '../components/Button';

const EstateDetails = ({ navigation }) => {
  const [modalVisible, setModalVisible] = useState(false);

  // Slider images
  const sliderImages = [
    images.estate1,
    images.estate2,
    images.estate3,
    images.estate4,
    images.estate5,
  ];

  const renderModal = () => {
    return (
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}>
        <TouchableWithoutFeedback
          onPress={() => setModalVisible(false)}>
          <View style={[styles.modalContainer]}>
            <View style={[styles.modalSubContainer, {
              backgroundColor: COLORS.secondaryWhite
            }]}>
              <Image
                source={illustrations.passwordSuccess}
                resizeMode='contain'
                style={styles.modalIllustration}
              />
              <Text style={styles.modalTitle}>Félicitations!</Text>
              <Text style={styles.modalSubtitle}>Votre compte est prêt à être utilisé. Vous serez redirigé vers la page d'accueil dans quelques secondes.</Text>
              <Button
                title="Continuer"
                filled
                onPress={() => {
                  setModalVisible(false)
                }}
                style={{
                  width: "100%",
                  marginTop: 12
                }}
              />
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    )
  }

  // render header
  const renderHeader = () => {

    return (
      <View style={styles.headerContainer}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}>
          <Image
            source={icons.back}
            resizeMode='contain'
            style={styles.backIcon}
          />
        </TouchableOpacity>
      </View>
    )
  }
  /**
  * render content
  */
  const renderContent = () => {
    const [expanded, setExpanded] = useState(false);

    const description = `Cozy one-bedroom apartment with lots of natural light. Open layout with a spacious living room perfect for relaxing or entertaining. Modern kitchen equipped with all essentials. Quiet neighborhood with nearby parks and cafes. Ideal for individuals or couples looking for comfort and convenience.`

    const toggleExpanded = () => {
      setExpanded(!expanded);
    };

    return (
      <View style={styles.contentContainer}>
        <Text style={[styles.estateName, {
          color: COLORS.black,
        }]}>Modernica Apartment</Text>
        <View style={styles.ratingContainer}>
          <View style={styles.categoryContainer}>
            <Text style={styles.categoryName}>Apartment</Text>
          </View>
        </View>

        <View style={styles.viewContainer}>
          <View style={styles.viewItemContainer}>
            <View style={styles.viewItemIcon}>
              <Image
                source={icons.bed}
                resizeMode="contain"
                style={styles.viewIcon}
              />
            </View>
            <Text style={[styles.viewTitle, {
              color: COLORS.black
            }]}>8 Pieces</Text>
          </View>
        </View>

        <Text style={[styles.viewSubtitle, {
          color: COLORS.greyscale900,
        }]}>Apercu</Text>
        <Text style={[styles.description, {
          color: COLORS.grayscale700,
        }]} numberOfLines={expanded ? undefined : 2}>{description}</Text>
        <TouchableOpacity onPress={toggleExpanded}>
          <Text style={styles.viewBtn}>
            {expanded ? 'View Less' : 'View More'}
          </Text>
        </TouchableOpacity>

        <Text style={[styles.viewSubtitle, {
          color: COLORS.greyscale900,
        }]}>Localisation</Text>

        <View style={styles.estateItemContainer}>
          <Image
            source={icons.pin}
            resizeMode='contain'
            style={styles.locationIcon}
          />
          <Text style={[styles.locationText, {
            color: COLORS.grayscale700,
          }]}>6993 Meadow Valley Terrace, New York</Text>
        </View>
      </View>
    )
  }

  return (
    <View style={[styles.area,
    { backgroundColor: "#fff" }]}>
      <StatusBar hidden />
      <AutoSlider images={sliderImages} />
      {renderHeader()}
      <ScrollView showsVerticalScrollIndicator={false}>
        {renderContent()}
      </ScrollView>
      <View style={[styles.bookBottomContainer, {
        backgroundColor: COLORS.blue,
        borderTopColor: COLORS.blue,
      }]}>
        <View style={styles.priceContainer}>
          <Text style={[styles.priceText, {
            color: COLORS.white,
          }]}>Prix</Text>
          <View style={styles.priceDurationContainer}>
            <Text style={styles.price}>$29{" "}</Text>
            <Text style={[styles.priceDuration, {
              color: COLORS.white,
            }]}>/ night</Text>
          </View>
        </View>
        <Button
          title="Reserver une visite"
          filled
          style={styles.bookingBtn}
          onPress={() => setModalVisible(true)}
        />
        {renderModal()}
      </View>
    </View>
  )
};

const styles = StyleSheet.create({
  area: {
    flex: 1,
    backgroundColor: COLORS.white
  },
  headerContainer: {
    width: SIZES.width - 32,
    flexDirection: "row",
    justifyContent: "space-between",
    position: "absolute",
    top: 32,
    zIndex: 999,
    left: 16,
    right: 16
  },
  backIcon: {
    width: 24,
    height: 24,
    tintColor: COLORS.blue
  },
  bookmarkIcon: {
    width: 24,
    height: 24,
    tintColor: COLORS.black
  },
  sendIcon: {
    width: 24,
    height: 24,
    tintColor: COLORS.black
  },
  sendIconContainer: {
    marginLeft: 8
  },
  iconContainer: {
    flexDirection: "row",
    alignItems: "center"
  },
  contentContainer: {
    marginHorizontal: 16
  },
  estateName: {
    fontSize: 24,
    fontFamily: "bold",
    color: COLORS.black,
    marginVertical: 6
  },
  categoryContainer: {
    backgroundColor: COLORS.tansparentPrimary,
    paddingHorizontal: 10,
    paddingVertical: 3,
    borderRadius: 6,
    borderRadius: 6,
    width: 80,
  },
  categoryName: {
    fontSize: 12,
    fontFamily: "medium",
    color: COLORS.primary
  },
  rating: {
    fontSize: 12,
    fontFamily: "medium",
    color: COLORS.black
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center"
  },
  numReviewContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 12
  },
  viewContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 12
  },
  viewItemContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 12
  },
  viewItemIcon: {
    width: 44,
    height: 44,
    backgroundColor: COLORS.tansparentPrimary,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 999
  },
  viewIcon: {
    height: 20,
    width: 20,
    tintColor: COLORS.primary
  },
  viewTitle: {
    fontSize: 14,
    fontFamily: "medium",
    color: COLORS.black,
    marginLeft: 12
  },
  separateLine: {
    width: SIZES.width - 32,
    height: 1,
    backgroundColor: COLORS.grayscale100
  },
  userInfoContainer: {
    width: SIZES.width - 32,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 6
  },
  userImage: {
    width: 52,
    height: 52,
    borderRadius: 999
  },
  userName: {
    fontSize: 16,
    fontFamily: "semiBold",
    color: COLORS.black
  },
  userPosition: {
    fontSize: 14,
    fontFamily: "medium",
    color: COLORS.grayscale700,
    marginTop: 3
  },
  userInfoRightContainer: {
    flexDirection: "row",
    alignItems: "center"
  },
  userInfoLeftContainer: {
    flexDirection: "row",
    alignItems: "center"
  },
  chatIcon: {
    width: 24,
    height: 24,
    tintColor: COLORS.primary
  },
  phoneIcon: {
    width: 24,
    height: 24,
    tintColor: COLORS.primary
  },
  viewSubtitle: {
    fontSize: 20,
    fontFamily: "bold",
    color: COLORS.greyscale900,
    marginVertical: 12
  },
  description: {
    fontSize: 14,
    color: COLORS.grayscale700,
    fontFamily: "regular",
  },
  viewBtn: {
    color: COLORS.primary,
    marginTop: 5,
    fontSize: 14,
    fontFamily: "semiBold",
  },
  subItemContainer: {
    width: SIZES.width - 32,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  seeAll: {
    color: COLORS.primary,
    fontSize: 14,
    fontFamily: "semiBold"
  },
  coverImageContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },
  coverImage: {
    width: (SIZES.width - 32) / 3 - 9,
    height: (SIZES.width - 32) / 3 - 9,
    borderRadius: 16,
    zIndex: 999
  },
  gradientImage: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    width: (SIZES.width - 32) / 3 - 9,
    height: (SIZES.width - 32) / 3 - 9,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center"
  },
  numImage: {
    fontSize: 22,
    color: COLORS.white,
    fontFamily: "bold",
  },
  estateItemContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  locationIcon: {
    width: 20,
    height: 20,
    tintColor: COLORS.primary,
    marginRight: 8
  },
  locationText: {
    fontSize: 14,
    fontFamily: "medium",
    color: COLORS.grayscale700,
  },

  locationMapContainer: {
    height: 226,
    width: "100%",
    borderRadius: 12,
    marginVertical: 16
  },
  mapContainer: {
    ...StyleSheet.absoluteFillObject,
    flex: 1,
    borderRadius: 12,
    backgroundColor: COLORS.dark2
  },
  viewMapContainer: {
    height: 50,
    backgroundColor: COLORS.gray,
    alignItems: "center",
    justifyContent: "center",
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25
  },
  bubble: {
    flexDirection: 'column',
    alignSelf: 'flex-start',
    backgroundColor: '#fff',
    borderRadius: 6,
    borderColor: '#ccc',
    borderWidth: 0.5,
    padding: 15,
    width: 'auto',
  },
  // Arrow below the bubble
  arrow: {
    backgroundColor: 'transparent',
    borderColor: 'transparent',
    borderTopColor: '#fff',
    borderWidth: 16,
    alignSelf: 'center',
    marginTop: -32,
  },
  arrowBorder: {
    backgroundColor: 'transparent',
    borderColor: 'transparent',
    borderTopColor: '#007a87',
    borderWidth: 16,
    alignSelf: 'center',
    marginTop: -0.5,
  },
  reviewContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: SIZES.width - 32,
    marginVertical: 16
  },
  reviewLeft: {
    flexDirection: "row",
    alignItems: "center"
  },
  starMiddleIcon: {
    height: 18,
    width: 18,
    tintColor: "orange",
    marginRight: 8
  },
  reviewTitle: {
    fontFamily: "bold",
    color: COLORS.black,
    fontSize: 18
  },
  seeAll: {
    color: COLORS.primary,
    fontFamily: "semiBold",
    fontSize: 16
  },
  bookBottomContainer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    width: SIZES.width,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    height: 104,
    backgroundColor: COLORS.white,
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderTopRightRadius: 32,
    borderTopLeftRadius: 32,
    borderTopColor: COLORS.blue,
    borderTopWidth: 1,
  },
  priceContainer: {
    flexDirection: "column",
  },
  priceText: {
    fontFamily: "regular",
    color: COLORS.grayscale700,
    fontSize: 14,
    marginBottom: 4
  },
  priceDurationContainer: {
    flexDirection: "row",
    alignItems: "center"
  },
  price: {
    fontFamily: "bold",
    color: COLORS.white,
    fontSize: 26
  },
  priceDuration: {
    fontFamily: "regular",
    color: COLORS.grayscale700,
    fontSize: 16
  },
  bookingBtn: {
    width: 212
  },
  separateLine: {
    width: SIZES.width - 32,
    height: 1,
    backgroundColor: COLORS.grayscale200
  },
  bottomTitle: {
    fontSize: 24,
    fontFamily: "semiBold",
    color: COLORS.black,
    textAlign: "center",
    marginTop: 12
  },
  socialContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginVertical: 12,
    width: SIZES.width - 32
  },
  modalTitle: {
    fontSize: 24,
    fontFamily: "bold",
    color: COLORS.primary,
    textAlign: "center",
    marginVertical: 12
  },
  modalSubtitle: {
    fontSize: 16,
    fontFamily: "regular",
    color: COLORS.greyscale600,
    textAlign: "center",
    marginVertical: 12
  },
  modalContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(0,0,0,0.4)"
  },
  modalSubContainer: {
    height: 494,
    width: SIZES.width * 0.9,
    backgroundColor: COLORS.white,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    padding: 16
  },
  modalIllustration: {
    height: 180,
    width: 180,
    marginVertical: 22
  }
})

export default EstateDetails