import { useAppDispatch } from '@/hooks/useAppDispatch';
import { addProductToWishlist, checkWishlistStatus } from '@/utils/actions/wishListActions';
import { normalizeFont } from '@/utils/normalizeFont';
import React, { useEffect, useState } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { COLORS, icons, SIZES } from '../constants';
import { useTheme } from '../theme/ThemeProvider';

interface ProductCardProps {
    merchandiseId: string;
    name: string;
    image: string; // Use 'require' for local images or 'ImageSourcePropType' for more robust typing
    price: string;
    oldPrice: string;
    availableForSale?: boolean | null;
    onPress: () => void;
}

const BlueProductCard: React.FC<ProductCardProps> = ({
    merchandiseId,
    name,
    image,
    price,
    oldPrice,
    availableForSale,
    onPress
}) => {
    const dispatch = useAppDispatch();
    const [isFavourite, setIsFavourite] = useState<boolean>(false);
    const { dark } = useTheme();

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
                }]}
                activeOpacity={0.8}
            >
                <View style={[styles.imageContainer, {
                    backgroundColor: dark ? COLORS.dark3 : COLORS.silver
                }]}>
                    <Image
                        source={{ uri: image }}
                        resizeMode='cover'
                        style={styles.image}
                    />
                </View>

                <Text style={[styles.name]}>{name}</Text>

                <View style={styles.bottomPriceContainer}>
                    {/* <View style={styles.priceContainer}> */}
                    <Text style={styles.price}>{"AED " + parseFloat(price).toFixed(2)}</Text>
                    {/* </View> */}
                    {Number(oldPrice) > 0 && (
                        // <View style={styles.oldPriceContainer}>
                        <Text style={styles.oldPrice}>{"AED " + parseFloat(oldPrice).toFixed(2)}</Text>
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
                        price: parseFloat(price),
                        oldPrice: parseFloat(oldPrice),
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
        // backgroundColor: COLORS.primaryRed,
        padding: 20,
        borderRadius: 16,
        marginBottom: 12,
        marginRight: 4
    },
    imageContainer: {
        width: "100%",
        height: 150,
        borderRadius: 16,
        // backgroundColor: COLORS.silver
        backgroundColor: COLORS.white
    },
    image: {
        width: "100%",
        height: 150,
        borderRadius: 16
    },
    name: {
        fontSize: normalizeFont(16),
        fontFamily: "normal",
        color: COLORS.white,
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
        justifyContent: "center",
        alignItems: "baseline",
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
    price: {
        fontSize: normalizeFont(15),
        fontFamily: "normal",
        // color: COLORS.primary,
        color: "rgb(177, 18, 22)",
        marginRight: 8
    },
    oldPrice: {
        fontSize: normalizeFont(15),
        // fontFamily: "bold",
        color: COLORS.white,
        // color: "rgb(177, 18, 22)",
        // marginRight: 8,
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
        fontSize: normalizeFont(12),
        fontFamily: "medium",
        color: COLORS.grayscale700,
        marginVertical: 4
    }
});

export default BlueProductCard;