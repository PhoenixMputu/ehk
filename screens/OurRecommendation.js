import { View, StyleSheet, TouchableOpacity, Image, Text, FlatList } from 'react-native';
import React, { useState } from 'react';
import { COLORS, SIZES, icons } from "../constants";
import { SafeAreaView } from 'react-native-safe-area-context';
import { ScrollView } from 'react-native-virtualized-view';
import { category, recommendedEstates } from '../data';
import VerticalEstateCard from '../components/VerticalEstateCard';

const OurRecommendation = ({ navigation }) => {
  /**
 * Render header
 */
  const renderHeader = () => {
    return (
      <View style={styles.headerContainer}>
        <View style={styles.headerLeft}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}>
            <Image
              source={icons.back}
              resizeMode='contain'
              style={[styles.backIcon, {
                tintColor: COLORS.greyscale900
              }]}
            />
          </TouchableOpacity>
          <Text style={[styles.headerTitle, {
            color: COLORS.greyscale900
          }]}>
            Populaire
          </Text>
        </View>
      </View>
    )
  }

  // render recommendation estates
  const renderContent = () => {
    const [selectedCategories, setSelectedCategories] = useState(["1"]);

    const filteredEstates = recommendedEstates.filter(estate => selectedCategories.includes("1") || selectedCategories.includes(estate.categoryId));

    // Category item
    const renderCategoryItem = ({ item }) => (
      <TouchableOpacity
        style={{
          backgroundColor: selectedCategories.includes(item.id) ? COLORS.primary : "transparent",
          padding: 10,
          marginVertical: 5,
          borderColor: COLORS.primary,
          borderWidth: 1.3,
          borderRadius: 24,
          marginRight: 12,
        }}
        onPress={() => toggleCategory(item.id)}>
        <Text style={{
          color: selectedCategories.includes(item.id) ? COLORS.white : COLORS.primary,
        }}>{item.name}</Text>
      </TouchableOpacity>
    );

    // Toggle category selection
    const toggleCategory = (categoryId) => {
      const updatedCategories = [...selectedCategories];
      const index = updatedCategories.indexOf(categoryId);

      if (index === -1) {
        updatedCategories.push(categoryId);
      } else {
        updatedCategories.splice(index, 1);
      }

      setSelectedCategories(updatedCategories);
    };

    return (
      <View>
        <FlatList
          data={category}
          keyExtractor={item => item.id}
          showsHorizontalScrollIndicator={false}
          horizontal
          renderItem={renderCategoryItem}
        />
        <View style={{
          backgroundColor: COLORS.white,
          marginVertical: 16
        }}>
          <FlatList
            data={filteredEstates}
            keyExtractor={item => item.id}
            numColumns={2}
            columnWrapperStyle={{ gap: 16 }}
            renderItem={({ item }) => {
              return (
                <VerticalEstateCard
                  name={item.name}
                  image={item.image}
                  rating={item.rating}
                  price={item.price}
                  location={item.location}
                  onPress={() => console.log("Pressed")}
                />
              )
            }}
          />
        </View>
      </View>
    )
  }
  return (
    <SafeAreaView style={[styles.area, { backgroundColor: "#fff"}]}>
      <View style={[styles.container, { backgroundColor:"#fff" }]}>
        {renderHeader()}
        <ScrollView showsVerticalScrollIndicator={false}>
          {renderContent()}
        </ScrollView>
      </View>
    </SafeAreaView>
  )
};

const styles = StyleSheet.create({
  area: {
    flex: 1,
    backgroundColor: COLORS.white
  },
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
    padding: 16
  },
  headerContainer: {
    flexDirection: "row",
    width: SIZES.width - 32,
    justifyContent: "space-between",
    marginBottom: 16
  },
  headerLeft: {
    flexDirection: "row",
    alignItems: "center"
  },
  backIcon: {
    height: 24,
    width: 24,
    tintColor: COLORS.black
  },
  headerTitle: {
    fontSize: 20,
    fontFamily: 'bold',
    color: COLORS.black,
    marginLeft: 16
  },
  moreIcon: {
    width: 24,
    height: 24,
    tintColor: COLORS.black
  },
})

export default OurRecommendation