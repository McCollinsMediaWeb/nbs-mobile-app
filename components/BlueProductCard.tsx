import { useAppDispatch } from '@/hooks/useAppDispatch';
import { addProductToCart } from '@/utils/actions/cartActions';
import { checkWishlistStatus } from '@/utils/actions/wishListActions';
import { normalizeFont } from '@/utils/normalizeFont';
import React, { useEffect, useState } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { COLORS, icons, SIZES } from '../constants';
import { useTheme } from '../theme/ThemeProvider';

interface ProductCardProps {
    merchandiseId: string;
    productId: string;
    name: string;
    image: string; // Use 'require' for local images or 'ImageSourcePropType' for more robust typing
    price: string;
    oldPrice: string;
    availableForSale?: boolean | null;
    productType: string;
    onPress: () => void;
}

const BlueProductCard: React.FC<ProductCardProps> = ({
    merchandiseId,
    productId,
    name,
    image,
    price,
    oldPrice,
    availableForSale,
    productType,
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

    const handleAddToCart = () => {
        const cartProduct = {
            merchandiseId: merchandiseId,
            id: productId,
            quantity: 1,
            title: name,
            price: parseFloat(price),
            oldPrice: parseFloat(oldPrice ?? "0"), // ✅ fixed
            image: image,
            productType: productType,
        };
        dispatch(addProductToCart(cartProduct));
    };

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

                    {availableForSale && (
                        <TouchableOpacity style={styles.bottomLeftHeart} onPress={handleAddToCart}>
                            <Image
                                source={dark ? icons.addToCartWhite : icons.addToCart}
                                resizeMode='contain'
                                style={styles.smallHeartIcon}
                            />
                        </TouchableOpacity>
                    )}
                </View>

                <Text style={[styles.name]}>{name}</Text>

                <View style={styles.bottomPriceContainer}>
                    <Text style={styles.price}>{"AED " + parseFloat(price).toFixed(2)}</Text>
                    {Number(oldPrice) > 0 && (
                        <Text style={styles.oldPrice}>{"AED " + parseFloat(oldPrice).toFixed(2)}</Text>
                    )}
                </View>
            </TouchableOpacity>

            {/* ❤️ Floating heart on top-right */}
            {/* <TouchableOpacity
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
            </TouchableOpacity> */}

            <TouchableOpacity
                style={styles.topLeftContainer}
                activeOpacity={0.7}
            >
                {!availableForSale ? (
                    <View style={[
                        styles.soldContainer,
                        { backgroundColor: "rgb(111, 113, 155)" }
                    ]}>
                        <Text style={[styles.soldText, { color: "#fff" }]}>sold out</Text>
                    </View>
                ) : (
                    Number(oldPrice) > 0 && Number(price) > 0 && Number(oldPrice) > Number(price) ? (
                        <View style={[
                            styles.soldContainer,
                            { backgroundColor: "rgb(177, 18, 22)" }
                        ]}>
                            <Text style={[styles.soldText, { color: "#fff" }]}>
                                save {Math.round(((Number(oldPrice) - Number(price)) / Number(oldPrice)) * 100)}%
                            </Text>
                        </View>
                    ) : null
                )}
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
        // width: (SIZES.width - 32) / 2 - 12,
        width: (SIZES.width - 12) / 2 - 12,
        // backgroundColor: COLORS.primaryRed,
        padding: 20,
        borderRadius: 16,
        marginBottom: 12,
        marginRight: 4,
        fontFamily: 'RubikLight'
    },
    imageContainer: {
        width: "100%",
        height: 150,
        // borderRadius: 16,
        // backgroundColor: COLORS.silver
        backgroundColor: COLORS.white
    },
    image: {
        width: "100%",
        height: 150,
        // borderRadius: 16
    },
    name: {
        fontSize: normalizeFont(17),
        // fontFamily: "normal",
        fontFamily: 'RubikRegular',
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
        fontFamily: 'RubikRegular',
        // fontFamily: "normal",
        // color: COLORS.primary,
        // color: "rgb(177, 18, 22)",
        color: COLORS.white,
        marginRight: 8
    },
    oldPrice: {
        fontSize: normalizeFont(15),
        fontFamily: 'RubikRegular',
        // fontFamily: "bold",
        color: COLORS.white,
        opacity: 0.6,
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
        alignItems: "center",
        justifyContent: "center",
        // borderRadius: 4,
        backgroundColor: COLORS.silver
    },
    soldText: {
        fontSize: normalizeFont(12),
        paddingHorizontal: 5,
        paddingVertical: 3,
        fontFamily: "RubikaRegular",
        fontWeight: 800,
        // marginVertical: 4,
        textTransform: "uppercase"
    },
    topLeftContainer: {
        position: "absolute",
        top: 18,
        left: 16,
        // width: 18,
        // height: 12,
        zIndex: 999,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center"
    },
    bottomLeftHeart: {
        position: 'absolute',
        right: 8,
        bottom: 8,
        width: 30,
        height: 30,
        backgroundColor: "#fff",
        borderColor: "grey",
        borderWidth: 1,
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 10,
    },
    smallHeartIcon: {
        width: 20,
        height: 20,
        tintColor: 'black'
    },
});

export default BlueProductCard;