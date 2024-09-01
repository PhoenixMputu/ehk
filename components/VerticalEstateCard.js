import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import React from 'react';
import { COLORS, SIZES, icons } from '../constants';

const VerticalEstateCard = ({
    name,
    image,
    rating,
    price,
    location,
    onPress
}) => {

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
            <Text style={[styles.name, {
                color: "#172554",
            }]} numberOfLines={2}>{name}</Text>
            <Text style={[styles.location, {
                color: "#1e3a8a",
            }]}>{location}</Text>
            <View style={styles.bottomPriceContainer}>
                <View style={styles.priceContainer}>
                    <Text style={styles.price}>${price}</Text>
                    <Text style={[styles.durationText, {
                        color: "#1e3a8a",
                    }]}> / night</Text>
                </View>
            </View>
        </TouchableOpacity>
    )
};

const styles = StyleSheet.create({
    container: {
        flexDirection: "column",
        width: (SIZES.width - 32) / 2 - 12,
        backgroundColor: COLORS.white,
        padding: 6,
        borderRadius: 16,
        marginBottom: 12
    },
    image: {
        width: "100%",
        height: 140,
        borderRadius: 16
    },
    name: {
        fontSize: 16,
        fontFamily: "bold",
        color: "#172554",
        marginVertical: 4
    },
    location: {
        fontSize: 12,
        fontFamily: "regular",
        color: COLORS.grayscale700,
        marginVertical: 4
    },
    bottomPriceContainer: {
        width: "100%",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 4
    },
    priceContainer: {
        flexDirection: "row",
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
        right: 16,
        width:"auto",
        paddingHorizontal: 6,
        paddingVertical: 3,
        borderRadius: 16,
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
})

export default VerticalEstateCard