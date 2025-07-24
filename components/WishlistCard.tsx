import { useAppDispatch } from '@/hooks/useAppDispatch';
import { addProductToWishlist, checkWishlistStatus } from '@/utils/actions/wishListActions';
import { normalizeFont } from '@/utils/normalizeFont';
import React, { useEffect, useState } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { COLORS, SIZES, icons } from '../constants';
import { useTheme } from '../theme/ThemeProvider';

// Define the type for the component props
interface WishlistCardProps {
    merchandiseId: string;
    name: string;
    image: string | undefined;
    price: number;
    oldPrice: number | undefined;
    productType: string;
    onPress: () => void;
}

const WishlistCard: React.FC<WishlistCardProps> = ({
    merchandiseId,
    name,
    image,
    price,
    oldPrice,
    productType,
    onPress
}) => {
    const { dark } = useTheme();
    const dispatch = useAppDispatch();
    const [isFavourite, setIsFavourite] = useState<boolean>(false);

    useEffect(() => {
        const checkStatus = async () => {
            const exists = await dispatch(checkWishlistStatus(merchandiseId));
            setIsFavourite(exists);
        };
        checkStatus();
    }, [dispatch, merchandiseId]);

    return (
        <View style={styles.cardWrapper}>
            <TouchableOpacity
                onPress={onPress}
                style={[styles.container, {
                    // backgroundColor: dark ? COLORS.dark2 : COLORS.white
                    backgroundColor: dark ? "#141517" : COLORS.white
                }]}>
                <View style={[styles.imageContainer, {
                    backgroundColor: dark ? COLORS.dark3 : COLORS.silver
                }]}>
                    <Image
                        source={{ uri: image }}
                        resizeMode='cover'
                        style={styles.image}
                    />
                </View>
                {/* <View style={styles.favouriteContainer}>
                    <TouchableOpacity onPress={onPress}>
                        <Image
                            source={icons.heart5}
                            resizeMode='contain'
                            style={styles.heartIcon}
                        />
                    </TouchableOpacity>
                </View> */}
                <Text style={[styles.name, {
                    color: dark ? COLORS.secondaryWhite : COLORS.greyscale900,
                }]}>{name}</Text>
                <View style={styles.bottomPriceContainer}>
                    {/* <View style={styles.priceContainer}> */}
                    <Text style={styles.price}>{"AED " + price.toFixed(2)}</Text>
                    {/* </View> */}

                    {oldPrice !== undefined && (
                        // <View style={styles.oldPriceContainer}>
                        <Text style={[styles.oldPrice, { color: dark ? COLORS.white : COLORS.primary }]}>
                            {"AED " + oldPrice.toFixed(2)}
                        </Text>
                        // </View>
                    )}

                </View>
            </TouchableOpacity>

            {/* ❤️ Floating heart on top-right */}
            <TouchableOpacity
                onPress={() => {
                    dispatch(addProductToWishlist({
                        merchandiseId,
                        title: name,
                        image,
                        price: price,
                        oldPrice: oldPrice,
                        productType: ''
                    }));
                    setIsFavourite(prev => !prev);
                }}
                style={styles.favouriteContainer}
                activeOpacity={0.7}
            >
                <Image
                    source={isFavourite ? icons.heart5 : icons.heart3Outline}
                    resizeMode='contain'
                    style={styles.heartIcon}
                />
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    cardWrapper: {
        position: 'relative',
    },
    container: {
        flexDirection: "column",
        width: (SIZES.width - 32) / 2 - 12,
        backgroundColor: COLORS.white,
        padding: 6,
        borderRadius: 16,
        marginBottom: 12,
        marginRight: 4
    },
    imageContainer: {
        width: "100%",
        height: 140,
        borderRadius: 16,
        backgroundColor: COLORS.silver
    },
    image: {
        width: "100%",
        height: 140,
        borderRadius: 16
    },
    // name: {
    //     fontSize: 18,
    //     fontFamily: "bold",
    //     color: COLORS.greyscale900,
    //     marginVertical: 4
    // },
    name: {
        fontSize: normalizeFont(16),
        fontFamily: "normal",
        fontWeight: 600,
        color: COLORS.greyscale900,
        marginVertical: 15,
        textAlign: "center"
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
    oldPriceContainer: {
        flexDirection: "row",
        alignItems: "flex-start"
    },
    // price: {
    //     fontSize: 18,
    //     fontFamily: "bold",
    //     color: "rgb(177, 18, 22)",
    //     marginRight: 8
    // },
    price: {
        fontSize: normalizeFont(16),
        fontFamily: "normal",
        // color: COLORS.primary,
        color: "rgb(177, 18, 22)",
        marginRight: 8
    },
    oldPrice: {
        fontSize: normalizeFont(16),
        color: COLORS.primary,
        textDecorationLine: 'line-through'
    },
    heartIcon: {
        width: 19,
        height: 19,
        tintColor: COLORS.white,
    },
    favouriteContainer: {
        position: "absolute",
        top: 16,
        right: 16,
        width: 32,
        height: 32,
        borderRadius: 9999,
        backgroundColor: COLORS.primary,
        zIndex: 999,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center"
    },
    viewContainer: {
        flexDirection: "row",
        alignItems: "center",
        marginTop: 4,
        marginBottom: 6
    },
    soldContainer: {
        width: 66,
        height: 24,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 4,
        backgroundColor: COLORS.silver
    },
    soldText: {
        fontSize: 12,
        fontFamily: "medium",
        color: COLORS.grayscale700,
        marginVertical: 4
    }
});

export default WishlistCard;