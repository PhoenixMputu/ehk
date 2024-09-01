import { View, Text, StyleSheet, TouchableOpacity, Image, TextInput, FlatList } from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import { COLORS, SIZES, icons } from '../constants';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ScrollView } from 'react-native-virtualized-view';
import { category, facilities, featuredEstates, ratings } from '../data';
import NotFoundCard from '../components/NotFoundCard';
import RBSheet from "react-native-raw-bottom-sheet";
import Button from '../components/Button';
import VerticalEstateCard from '../components/VerticalEstateCard';
import HorizontalEstateCard from '../components/HorizontalEstateCard';

const FeaturedEstates = ({ navigation }) => {
    const refRBSheet = useRef();
    const [selectedCategories, setSelectedCategories] = useState(["1"]);
    const [selectedRating, setSelectedRating] = useState(["1"]);
    const [selectedFacilities, setSelectedFacilities] = useState([]);
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
                        Nouveauté
                    </Text>
                </View>
            </View>
        )
    }

    /**
     * Render content
    */
    const renderContent = () => {
        const [selectedTab, setSelectedTab] = useState('row');
        const [searchQuery, setSearchQuery] = useState('');
        const [filteredEstates, setFilteredEstates] = useState(featuredEstates);
        const [resultsCount, setResultsCount] = useState(0);

        useEffect(() => {
            handleSearch();
        }, [searchQuery, selectedTab]);


        const handleSearch = () => {
            const estates = featuredEstates.filter((estate) =>
                estate.name.toLowerCase().includes(searchQuery.toLowerCase())
            );
            setFilteredEstates(estates);
            setResultsCount(estates.length);
        };

        return (
            <View>
                {/* Search Bar */}
                <View
                    onPress={() => console.log("Search")}
                    style={[styles.searchBarContainer, {
                        backgroundColor: "#fff"
                    }]}>
                    <TouchableOpacity
                        onPress={handleSearch}>
                        <Image
                            source={icons.search2}
                            resizeMode='contain'
                            style={styles.searchIcon}
                        />
                    </TouchableOpacity>
                    <TextInput
                        placeholder='Trouver un logement'
                        placeholderTextColor={COLORS.blue}
                        style={[styles.searchInput, {
                            color: COLORS.blue
                        }]}
                        value={searchQuery}
                        onChangeText={(text) => setSearchQuery(text)}
                    />
                    <TouchableOpacity
                        onPress={() => refRBSheet.current.open()}>
                        <Image
                            source={icons.filter}
                            resizeMode='contain'
                            style={styles.filterIcon}
                        />
                    </TouchableOpacity>
                </View>


                <View style={styles.reusltTabContainer}>
                    <Text style={[styles.tabText, {
                        color: COLORS.black
                    }]}>{resultsCount} Résultats</Text>
                    <View style={styles.viewDashboard}>
                        <TouchableOpacity
                            onPress={() => {
                                setSelectedTab('column');
                                setSearchQuery(''); // Clear search query when changing tab
                            }}>
                            <Image
                                source={selectedTab === 'column' ? icons.document2 : icons.document2Outline}
                                resizeMode='contain'
                                style={styles.dashboardIcon}
                            />
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => {
                                setSelectedTab('row');
                                setSearchQuery(''); // Clear search query when changing tab
                            }}>
                            <Image
                                source={selectedTab === 'row' ? icons.dashboard : icons.dashboardOutline}
                                resizeMode='contain'
                                style={styles.dashboardIcon}
                            />
                        </TouchableOpacity>
                    </View>
                </View>

                {/* Results container  */}
                <View>
                    {/* Estates result list */}
                    <View style={{
                        backgroundColor: "#fff",
                        marginVertical: 16
                    }}>
                        {resultsCount && resultsCount > 0 ? (
                            <>
                                {
                                    selectedTab === 'row' ? (
                                        <FlatList
                                            data={filteredEstates}
                                            keyExtractor={(item) => item.id}
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
                                                        onPress={() => navigation.navigate("EstateDetails")}
                                                    />
                                                )
                                            }}
                                        />
                                    ) : (
                                        <FlatList
                                            data={filteredEstates}
                                            keyExtractor={(item) => item.id}
                                            renderItem={({ item }) => {
                                                return (
                                                    <HorizontalEstateCard
                                                        name={item.name}
                                                        image={item.image}
                                                        rating={item.rating}
                                                        price={item.price}
                                                        location={item.location}
                                                        onPress={() => navigation.navigate("EstateDetails")}
                                                    />
                                                );
                                            }}
                                        />
                                    )
                                }
                            </>
                        ) : (
                            <NotFoundCard />
                        )}
                    </View>
                </View>
            </View>
        )
    }

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

    // toggle rating selection
    const toggleRating = (ratingId) => {
        const updatedRatings = [...selectedRating];
        const index = updatedRatings.indexOf(ratingId);

        if (index === -1) {
            updatedRatings.push(ratingId);
        } else {
            updatedRatings.splice(index, 1);
        }

        setSelectedRating(updatedRatings);
    };

    // Category item
    const renderCategoryItem = ({ item }) => (
        <TouchableOpacity
            style={{
                backgroundColor: selectedCategories.includes(item.id) ? COLORS.white : COLORS.primary,
                padding: 10,
                marginVertical: 5,
                borderColor: COLORS.white,
                borderWidth: 1.3,
                borderRadius: 24,
                marginRight: 12,
            }}
            onPress={() => toggleCategory(item.id)}>

            <Text style={{
                color: selectedCategories.includes(item.id) ? COLORS.blue : COLORS.white
            }}>{item.name}</Text>
        </TouchableOpacity>
    );

    const renderRatingItem = ({ item }) => (
        <TouchableOpacity
            style={{
                backgroundColor: selectedRating.includes(item.id) ? COLORS.white : COLORS.primary,
                paddingHorizontal: 16,
                paddingVertical: 6,
                marginVertical: 5,
                borderColor: COLORS.primary,
                borderWidth: 1.3,
                borderRadius: 24,
                marginRight: 12,
                flexDirection: "row",
                alignItems: "center",
            }}
            onPress={() => toggleRating(item.id)}>
            <Text style={{
                color: selectedRating.includes(item.id) ? COLORS.primary : COLORS.white
            }}>{item.title}</Text>
        </TouchableOpacity>
    );

    return (
        <SafeAreaView style={[styles.area, { backgroundColor: "#fff" }]}>
            <View style={[styles.container, { backgroundColor: "#fff" }]}>
                {renderHeader()}
                <ScrollView showsVerticalScrollIndicator={false}>
                    {renderContent()}
                </ScrollView>
                <RBSheet
                    ref={refRBSheet}
                    closeOnDragDown={true}
                    closeOnPressMask={false}
                    height={480}
                    customStyles={{
                        wrapper: {
                            backgroundColor: "rgba(0,0,0,0.5)",
                        },
                        draggableIcon: {
                            backgroundColor: COLORS.dark3,
                        },
                        container: {
                            borderTopRightRadius: 32,
                            borderTopLeftRadius: 32,
                            height: 480,
                            backgroundColor: COLORS.blue,
                            alignItems: "center",
                        }
                    }}
                >
                    <Text style={[styles.bottomTitle, {
                        color: COLORS.white
                    }]}>Filtre</Text>
                    <View style={styles.separateLine} />
                    <View style={{ width: SIZES.width - 32 }}>
                        <Text style={[styles.sheetTitle, {
                            color: COLORS.white
                        }]}>Catégorie</Text>
                        <FlatList
                            data={category}
                            keyExtractor={item => item.id}
                            showsHorizontalScrollIndicator={false}
                            horizontal
                            renderItem={renderCategoryItem}
                        />
                        <Text style={[styles.sheetTitle, {
                            color: COLORS.white
                        }]}>Ville</Text>
                        <FlatList
                            data={ratings}
                            keyExtractor={item => item.id}
                            showsHorizontalScrollIndicator={false}
                            horizontal
                            renderItem={renderRatingItem}
                        />
                        <Text style={[styles.sheetTitle, {
                            color: COLORS.white
                        }]}>Type</Text>
                        <FlatList
                            data={ratings}
                            keyExtractor={item => item.id}
                            showsHorizontalScrollIndicator={false}
                            horizontal
                            renderItem={renderRatingItem}
                        />
                    </View>

                    <View style={styles.separateLine} />

                    <View style={styles.bottomContainer}>
                        <Button
                            title="Annuler"
                            style={{
                                width: (SIZES.width - 32) / 2 - 8,
                                backgroundColor: COLORS.white,
                                borderRadius: 32,
                                borderColor: COLORS.tansparentPrimary
                            }}
                            textColor={COLORS.primary}
                            onPress={() => refRBSheet.current.close()}
                        />
                        <Button
                            title="Filtrer"
                            filled
                            style={styles.logoutButton}
                            onPress={() => refRBSheet.current.close()}
                        />
                    </View>
                </RBSheet>
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
    searchBarContainer: {
        width: SIZES.width - 32,
        backgroundColor: "#fff",
        padding: 16,
        borderRadius: 12,
        height: 52,
        marginBottom: 16,
        flexDirection: "row",
        alignItems: "center",
        borderWidth: 1,
        borderColor: COLORS.blue
    },
    searchIcon: {
        height: 24,
        width: 24,
        tintColor: "#2563eb"
    },
    searchInput: {
        flex: 1,
        fontSize: 16,
        fontFamily: "regular",
        marginHorizontal: 8
    },
    filterIcon: {
        width: 24,
        height: 24,
        tintColor: COLORS.primary
    },
    tabContainer: {
        flexDirection: "row",
        alignItems: "center",
        width: SIZES.width - 32,
        justifyContent: "space-between"
    },
    tabBtn: {
        width: (SIZES.width - 32) / 2 - 6,
        height: 42,
        borderRadius: 12,
        justifyContent: "center",
        alignItems: "center",
        borderWidth: 1.4,
        borderColor: COLORS.primary,
        borderRadius: 32
    },
    selectedTab: {
        width: (SIZES.width - 32) / 2 - 6,
        height: 42,
        borderRadius: 12,
        backgroundColor: COLORS.primary,
        justifyContent: "center",
        alignItems: "center",
        borderWidth: 1.4,
        borderColor: COLORS.primary,
        borderRadius: 32
    },
    tabBtnText: {
        fontSize: 16,
        fontFamily: "semiBold",
        color: COLORS.primary,
        textAlign: "center"
    },
    selectedTabText: {
        fontSize: 16,
        fontFamily: "semiBold",
        color: COLORS.white,
        textAlign: "center"
    },
    resultContainer: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        width: SIZES.width - 32,
        marginVertical: 16,
    },
    subtitle: {
        fontSize: 18,
        fontFamily: "bold",
        color: COLORS.black,
    },
    subResult: {
        fontSize: 14,
        fontFamily: "semiBold",
        color: COLORS.primary
    },
    resultLeftView: {
        flexDirection: "row"
    },
    bottomContainer: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginVertical: 12,
        paddingHorizontal: 16,
        width: SIZES.width
    },
    cancelButton: {
        width: (SIZES.width - 32) / 2 - 8,
        backgroundColor: COLORS.tansparentPrimary,
        borderRadius: 32
    },
    logoutButton: {
        width: (SIZES.width - 32) / 2 - 8,
        backgroundColor: COLORS.primary,
        borderRadius: 32
    },
    bottomTitle: {
        fontSize: 24,
        fontFamily: "semiBold",
        color: COLORS.black,
        textAlign: "center",
        marginTop: 12
    },
    separateLine: {
        height: .4,
        width: SIZES.width - 32,
        backgroundColor: COLORS.greyscale300,
        marginVertical: 12
    },
    sheetTitle: {
        fontSize: 18,
        fontFamily: "semiBold",
        color: COLORS.black,
        marginVertical: 12
    },
    reusltTabContainer: {
        flexDirection: "row",
        alignItems: "center",
        width: SIZES.width - 32,
        justifyContent: "space-between"
    },
    viewDashboard: {
        flexDirection: "row",
        alignItems: "center",
        width: 36,
        justifyContent: "space-between"
    },
    dashboardIcon: {
        width: 16,
        height: 16,
        tintColor: COLORS.primary
    },
    tabText: {
        fontSize: 20,
        fontFamily: "semiBold",
        color: COLORS.black
    }
})

export default FeaturedEstates