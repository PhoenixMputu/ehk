import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Image,
    TextInput,
} from 'react-native'
import React, { useEffect, useRef, useState, useCallback } from 'react'
import { COLORS, SIZES, icons, images } from '../constants'
import { SafeAreaView } from 'react-native-safe-area-context'
import { ScrollView } from 'react-native-virtualized-view'
import { category, myFavouriteEstates as initialBookmarkEstates } from '../data'
import RBSheet from 'react-native-raw-bottom-sheet'
import { useTheme } from '../theme/ThemeProvider'
import Button from '../components/Button'
import HorizontalEstateCard from '../components/HorizontalEstateCard'
import NotFoundCard from '../components/NotFoundCard'
import VerticalEstateCard from '../components/VerticalEstateCard'

const Favourite = ({ navigation }) => {
    const refRBSheet = useRef()
    const { dark, colors, setScheme } = useTheme()
    const [selectedBookmarkItem, setSelectedBookmarkItem] = useState(null)
    const [myBookmarkEstates, setMyBookmarkEstates] = useState(
        initialBookmarkEstates || []
    )
    const [resultsCount, setResultsCount] = useState(0)
    const [selectedTab, setSelectedTab] = useState('row')
    const [isFocused, setIsFocused] = useState(false)
    const [isFilled, setIsFilled] = useState(false)
    const inputRef = useRef(null)

    const handleRemoveBookmark = () => {
        // Implement your logic to remove the selectedBookmarkItem from the bookmark list
        if (selectedBookmarkItem) {
            const updatedBookmarkEstates = myBookmarkEstates.filter(
                (estate) => estate.id !== selectedBookmarkItem.id
            )
            setMyBookmarkEstates(updatedBookmarkEstates)

            // Close the bottom sheet
            refRBSheet.current.close()
        }
    }
    /**
     * Render header
     */
    const renderHeader = () => {
        return (
            <View style={styles.headerContainer}>
                <View style={styles.headerLeft}>
                    <TouchableOpacity>
                        <Image
                            source={images.logo}
                            resizeMode="contain"
                            style={[
                                styles.backIcon,
                                {
                                    tintColor: COLORS.primary,
                                },
                            ]}
                        />
                    </TouchableOpacity>
                    <Text
                        style={[
                            styles.headerTitle,
                            {
                                color: COLORS.greyscale900,
                            },
                        ]}
                    >
                        Publier un logement
                    </Text>
                </View>
            </View>
        )
    }

    const handleInputFocus = useCallback(() => {
        setIsFocused(true)
    }, [])

    const handleInputBlur = useCallback(() => {
        setIsFocused(false)
        if (inputRef.current) setIsFilled(!!inputRef.current.value)
    }, [])
    const handleChangeText = useCallback((text) => {
        if (inputRef.current) inputRef.current.value = text
    }, [])

    return (
        <SafeAreaView style={[styles.area, { backgroundColor: '#fff' }]}>
            <View style={[styles.container, { backgroundColor: '#fff' }]}>
                {renderHeader()}
            </View>
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={styles.main}>
                    <View style={styles.textGroup}>
                        <Text style={styles.title}>
                            C'est facile de commencer sur EHK
                        </Text>
                        <View style={styles.subgroup}>
                            <Text style={styles.subtitle}>
                                1. Parles-nous de ton logement
                            </Text>
                            <Text>
                                Partages quelques informations basique, comme
                                son emplacement, nombre de piece, ...
                            </Text>
                        </View>
                        <View style={styles.subgroup}>
                            <Text style={styles.subtitle}>
                                2. Parles-nous de ton logement
                            </Text>
                            <Text>
                                Partages quelques informations basique, comme
                                son emplacement, nombre de piece, ...
                            </Text>
                        </View>
                        <View
                            style={[
                                styles.subgroup,
                                { borderBottomColor: COLORS.white },
                            ]}
                        >
                            <Text style={styles.subtitle}>
                                3. Parles-nous de ton logement
                            </Text>
                            <Text>
                                Partages quelques informations basique, comme
                                son emplacement, nombre de piece, ...
                            </Text>
                        </View>
                    </View>
                    <Button
                        title="Commencer"
                        filled
                        onPress={() => navigation.navigate('FillYourProfile')}
                        style={styles.button}
                    />
                </View>
            </ScrollView>
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
        backgroundColor: COLORS.white,
        padding: 16,
    },
    headerContainer: {
        flexDirection: 'row',
        width: SIZES.width - 32,
        justifyContent: 'space-between',
    },
    headerLeft: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    backIcon: {
        height: 24,
        width: 24,
        tintColor: COLORS.black,
    },
    headerTitle: {
        fontSize: 20,
        fontFamily: 'bold',
        color: COLORS.black,
        marginLeft: 16,
    },
    title: {
        fontSize: SIZES.h1,
        color: COLORS.black,
        fontWeight: '700',
        marginBottom: 24,
    },
    button: {
        marginVertical: 12,
        width: SIZES.width - 32,
        borderRadius: 30,
    },
    main: {
        flexDirection: 'column',
        justifyContent: 'space-between',
        paddingHorizontal: 16,
        paddingBottom: 50,
    },
    textGroup: {
        flexDirection: 'column',
    },
    subgroup: {
        paddingVertical: 22,
        borderBottomWidth: 0.5,
        borderBottomColor: COLORS.grayscale700,
    },
    subtitle: {
        fontSize: SIZES.h2,
        fontWeight: '500',
        marginBottom: 12,
    },
})

export default Favourite
