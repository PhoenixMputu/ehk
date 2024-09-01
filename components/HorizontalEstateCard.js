import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import React, { useState } from 'react';
import { COLORS, SIZES, icons } from '../constants';
import { useTheme } from '../theme/ThemeProvider';

const HorizontalEstateCard = ({
    name,
    image,
    rating,
    price,
    location,
    onPress
}) => {
    const [isFavourite, setIsFavourite] = useState(false);
    const { dark } = useTheme();

    return (
        <TouchableOpacity
            onPress={onPress}
            style={[styles.container, {
                backgroundColor: "#bfdbfe"
            }]}>
            <Image
                source={image}
                resizeMode='cover'
                style={styles.image}
            />
            <View style={styles.reviewContainer}>
                <Text style={styles.rating}>{rating}</Text>
            </View>
            <View style={styles.columnContainer}>
                <View style={styles.topViewContainer}>
                    <Text numberOfLines={2} style={[styles.name, {
                        color: "#172554",
                    }]}>{name}</Text>
                </View>
                <View style={styles.bottomViewContainer}>
                    <Text style={[styles.location, {
                        color: "#1e3a8a",
                    }]}>{location}</Text>
                    <View style={styles.priceContainer}>
                        <Text style={styles.price}>${price}</Text>
                        <Text style={[styles.durationText, {
                            color: "#1e3a8a",
                        }]}> / night</Text>
                    </View>
                </View>
            </View>
        </TouchableOpacity>
    )
};

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        width: SIZES.width - 32,
        backgroundColor: COLORS.white,
        padding: 6,
        borderRadius: 16,
        marginBottom: 12,
        height: 112,
        alignItems: "center",
    },
    image: {
        width: 100,
        height: 100,
        borderRadius: 16
    },
    columnContainer: {
        flexDirection: "column",
        marginLeft: 12,
        flex: 1
    },
    name: {
        fontSize: 17,
        fontFamily: "bold",
        color: COLORS.greyscale900,
        marginVertical: 4,
        marginRight: 40,
    },
    location: {
        fontSize: 12,
        fontFamily: "regular",
        color: COLORS.grayscale700,
        marginVertical: 4
    },
    priceContainer: {
        flexDirection: "column",
        alignItems: "center"
    },
    price: {
        fontSize: 18,
        fontFamily: "bold",
        color: COLORS.primary,
        marginRight: 8
    },
    durationText: {
        fontSize: 14,
        fontFamily: "regular",
        color: COLORS.grayscale700
    },
    heartIcon: {
        width: 16,
        height: 16,
        tintColor: COLORS.primary,
        marginLeft: 6
    },
    reviewContainer: {
        position: "absolute",
        top: 16,
        left: 54,
        borderRadius: 16,
        paddingHorizontal: 6,
        paddingVertical: 3,
        backgroundColor: COLORS.transparentWhite2,
        zIndex: 999,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center"
    },
    rating: {
        fontSize: 12,
        fontFamily: "semiBold",
        color: COLORS.primary,
    },
    topViewContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        width: SIZES.width - 164
    },
    bottomViewContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginTop: 2
    }
})

export default HorizontalEstateCard