// import { useAppDispatch } from '@/hooks/useAppDispatch';
// import { useAppSelector } from '@/hooks/useAppSelector';
// import { addProductToCart, removeProductFromCart } from '@/utils/actions/cartActions';
// import { checkWishlistStatus } from '@/utils/actions/wishListActions';
// import { normalizeFont } from '@/utils/normalizeFont';
// import React, { useEffect, useState } from 'react';
// import { ActivityIndicator, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
// import { COLORS, icons, SIZES } from '../constants';
// import { useTheme } from '../theme/ThemeProvider';

// interface ProductCardProps {
//     merchandiseId: string;
//     productId: string;
//     name: string;
//     image: string; // Use 'require' for local images or 'ImageSourcePropType' for more robust typing
//     price: string;
//     oldPrice: string;
//     availableForSale?: boolean | null;
//     productType: string;
//     onPress: () => void;
// }

// const ProductCard: React.FC<ProductCardProps> = ({
//     merchandiseId,
//     productId,
//     name,
//     image,
//     price,
//     oldPrice,
//     availableForSale,
//     productType,
//     onPress
// }) => {
//     const dispatch = useAppDispatch();
//     const [isFavourite, setIsFavourite] = useState<boolean>(false);
//     const cartItems = useAppSelector(state => state.cart.cartItems);
//     const [loading, setLoading] = useState(false);
//     const { dark } = useTheme();

//     useEffect(() => {
//         const checkStatus = async () => {
//             const exists = await dispatch(checkWishlistStatus(merchandiseId));
//             setIsFavourite(exists);
//         };
//         checkStatus();
//     }, [dispatch, merchandiseId]);

//     const getCartItem = (merchId: string) => {
//         return cartItems.find(item => item.merchandiseId === merchId);
//     };

//     const cartItem = getCartItem(merchandiseId);

//     const handleAddToCart = async () => {
//         setLoading(true);
//         try {
//             const cartProduct = {
//                 merchandiseId: merchandiseId,
//                 id: productId,
//                 quantity: 1,
//                 title: name,
//                 price: parseFloat(price),
//                 oldPrice: parseFloat(oldPrice ?? "0"),
//                 image: image,
//                 productType: productType,
//             };
//             await dispatch(addProductToCart(cartProduct));
//         } catch (error) {
//             console.error("Add to cart failed", error);
//         } finally {
//             setLoading(false);
//         }
//     };

//     const handleRemoveFromCart = async () => {
//         setLoading(true);
//         try {
//             await dispatch(removeProductFromCart(merchandiseId));
//         } catch (error) {
//             console.error("Remove from cart failed", error);
//         } finally {
//             setLoading(false);
//         }
//     };

//     return (
//         <View style={styles.cardWrapper}>
//             <TouchableOpacity
//                 onPress={onPress}
//                 style={[styles.container, {
//                 }]}
//                 activeOpacity={0.8}
//             >
//                 <View style={[styles.imageContainer, {
//                     backgroundColor: dark ? COLORS.dark3 : COLORS.silver
//                 }]}>
//                     <Image
//                         source={{ uri: image }}
//                         resizeMode='cover'
//                         style={styles.image}
//                     />
//                     {availableForSale && (
//                         getCartItem(merchandiseId) ? (
//                             <TouchableOpacity style={styles.bottomLeftHeart} disabled={loading} onPress={handleRemoveFromCart}>
//                                 {loading ? (
//                                     <ActivityIndicator
//                                         size="small"
//                                         color={dark ? "#fff" : "#000"}
//                                         style={styles.smallHeartIcon}
//                                     />
//                                 ) : (<Image
//                                     source={dark ? icons.addedToCartWhite : icons.addedToCart}
//                                     resizeMode='contain'
//                                     style={styles.smallHeartIcon}
//                                 />)}

//                             </TouchableOpacity>
//                         ) : (
//                             <TouchableOpacity style={styles.bottomLeftHeart} disabled={loading} onPress={handleAddToCart}>
//                                 {loading ? (
//                                     <ActivityIndicator
//                                         size="small"
//                                         color={dark ? "#fff" : "#000"}
//                                         style={styles.smallHeartIcon}
//                                     />
//                                 ) : (
//                                     <Image
//                                         source={dark ? icons.addToCartWhite : icons.addToCart}
//                                         resizeMode='contain'
//                                         style={styles.smallHeartIcon}
//                                     />
//                                 )}
//                             </TouchableOpacity>
//                         )
//                     )}

//                 </View>

//                 <Text style={[styles.name, {
//                     color: dark ? COLORS.secondaryWhite : COLORS.greyscale900,
//                 }]}>{name}</Text>

//                 <View style={styles.bottomPriceContainer}>
//                     <Text style={styles.price}>{"AED " + parseFloat(price).toFixed(2)}</Text>
//                     {Number(oldPrice) > 0 && (
//                         <Text style={[styles.oldPrice, { color: dark ? COLORS.white : COLORS.primary }]}>{"AED " + parseFloat(oldPrice).toFixed(2)}</Text>
//                     )}
//                 </View>
//             </TouchableOpacity >

//             {/* ❤️ Floating heart on top-right */}
//             {/* <TouchableOpacity
//                 onPress={() => {
//                     dispatch(addProductToWishlist({
//                         merchandiseId,
//                         title: name,
//                         image,
//                         price: parseFloat(price),
//                         oldPrice: parseFloat(oldPrice),
//                         productType: ''
//                     }));
//                     setIsFavourite(prev => !prev);
//                 }}
//                 style={styles.favouriteContainer}
//                 activeOpacity={0.7}
//             >
//                 <Image
//                     source={isFavourite ? icons.heart5 : icons.heart3Outline}
//                     resizeMode='contain'
//                     style={styles.heartIcon}
//                 />
//             </TouchableOpacity> */}

//             <TouchableOpacity
//                 style={styles.topLeftContainer}
//                 activeOpacity={0.7}
//             >
//                 {!availableForSale ? (
//                     <View style={[
//                         styles.soldContainer,
//                         { backgroundColor: "rgb(111, 113, 155)" }
//                     ]}>
//                         <Text style={[styles.soldText, { color: "#fff" }]}>Out of Stock</Text>
//                     </View>
//                 ) : (
//                     Number(oldPrice) > 0 && Number(price) > 0 && Number(oldPrice) > Number(price) ? (
//                         <View style={[
//                             styles.soldContainer,
//                             { backgroundColor: "rgb(177, 18, 22)" }
//                         ]}>
//                             <Text style={[styles.soldText, { color: "#fff" }]}>
//                                 save {Math.round(((Number(oldPrice) - Number(price)) / Number(oldPrice)) * 100)}%
//                             </Text>
//                         </View>
//                     ) : null
//                 )}
//             </TouchableOpacity>
//         </View >

//     );
// };

// const styles = StyleSheet.create({
//     cardWrapper: {
//         position: 'relative',
//     },
//     container: {
//         flexDirection: "column",
//         width: (SIZES.width - 12) / 2 - 12,
//         // backgroundColor: COLORS.white,
//         padding: 20,
//         borderRadius: 16,
//         marginBottom: 12,
//         marginRight: 4,
//         fontFamily: 'RubikLight'
//     },
//     imageContainer: {
//         width: "100%",
//         height: 150,
//         // borderRadius: 16,
//         backgroundColor: COLORS.silver
//     },
//     image: {
//         width: "100%",
//         height: 150,
//         // borderRadius: 16
//     },
//     name: {
//         fontSize: normalizeFont(17),
//         lineHeight: 25,
//         // fontFamily: "normal",
//         fontFamily: 'RubikRegular',
//         fontWeight: 600,
//         color: COLORS.greyscale900,
//         marginVertical: 15,
//         textAlign: "center"
//     },
//     location: {
//         fontSize: 12,
//         fontFamily: "regular",
//         color: COLORS.grayscale700,
//         marginVertical: 4
//     },
//     bottomPriceContainer: {
//         width: "100%",
//         flexDirection: "row",
//         justifyContent: "center",
//         alignItems: "baseline",
//         marginBottom: 4
//     },
//     priceContainer: {
//         flexDirection: "row",
//         alignItems: "center"
//     },
//     oldPriceContainer: {
//         flexDirection: "row",
//         alignItems: "flex-start"
//     },
//     price: {
//         fontSize: normalizeFont(15),
//         // fontFamily: "normal",
//         fontFamily: 'RubikRegular',
//         // color: COLORS.primary,
//         color: "rgb(177, 18, 22)",
//         marginRight: 8
//     },
//     oldPrice: {
//         fontSize: normalizeFont(15),
//         color: COLORS.primary,
//         textDecorationLine: 'line-through'
//     },
//     heartIcon: {
//         width: 19,
//         height: 19,
//         tintColor: COLORS.white,
//     },
//     favouriteContainer: {
//         position: "absolute",
//         top: 16,
//         right: 16,
//         width: 32,
//         height: 32,
//         borderRadius: 9999,
//         backgroundColor: COLORS.primary,
//         zIndex: 999,
//         flexDirection: "row",
//         alignItems: "center",
//         justifyContent: "center"
//     },
//     topLeftContainer: {
//         position: "absolute",
//         top: 18,
//         left: 16,
//         // width: 18,
//         // height: 12,
//         zIndex: 999,
//         flexDirection: "row",
//         alignItems: "center",
//         justifyContent: "center"
//     },
//     viewContainer: {
//         flexDirection: "row",
//         alignItems: "center",
//         marginTop: 4,
//         marginBottom: 6
//     },
//     soldContainer: {
//         // width: SIZES.width * 0.16,
//         // height: SIZES.height * 0.02,
//         alignItems: "center",
//         justifyContent: "center",
//         // borderRadius: 4,
//         backgroundColor: COLORS.silver
//     },
//     soldText: {
//         fontSize: normalizeFont(12),
//         paddingHorizontal: 5,
//         paddingVertical: 3,
//         fontFamily: "RubikaRegular",
//         fontWeight: 800,
//         // marginVertical: 4,
//         textTransform: "uppercase"
//     },
//     bottomLeftHeart: {
//         position: 'absolute',
//         right: 8,
//         bottom: 8,
//         width: 30,
//         height: 30,
//         // borderRadius: 12,
//         backgroundColor: "#fff",
//         borderColor: "grey",
//         borderWidth: 1,
//         alignItems: 'center',
//         justifyContent: 'center',
//         zIndex: 10,
//     },
//     smallHeartIcon: {
//         width: 20,
//         height: 20,
//         tintColor: 'black'
//     },
// });

// export default ProductCard;


import { useAppDispatch } from '@/hooks/useAppDispatch';
import { useAppSelector } from '@/hooks/useAppSelector';
import { addProductToCart, removeProductFromCart } from '@/utils/actions/cartActions';
import { checkWishlistStatus } from '@/utils/actions/wishListActions';
import { normalizeFont } from '@/utils/normalizeFont';
import i18next from 'i18next';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import {
    ActivityIndicator,
    Image,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';
import { COLORS, icons, SIZES } from '../constants';
import { useTheme } from '../theme/ThemeProvider';

interface ProductCardProps {
    merchandiseId: string;
    productId: string;
    name: string;
    image: string;
    price: string;
    oldPrice: string;
    availableForSale?: boolean | null;
    productType: string;
    productTags?: string[] | null;
    onPress: () => void;
}

const ProductCard: React.FC<ProductCardProps> = ({
    merchandiseId,
    productId,
    name,
    image,
    price,
    oldPrice,
    availableForSale,
    productType,
    productTags,
    onPress,
}) => {
    const dispatch = useAppDispatch();
    const cartItems = useAppSelector(state => state.cart.cartItems);
    const [wishlist, setWishlist] = useState(false);
    const [loading, setLoading] = useState<{ [key: string]: boolean }>({});
    const { t } = i18next;
    const { dark } = useTheme();

    // Memoize cart item lookup
    const cartItem = useMemo(
        () => cartItems.find(item => item.merchandiseId === merchandiseId),
        [cartItems, merchandiseId]
    );

    // Wishlist status
    useEffect(() => {
        let mounted = true;
        (async () => {
            const exists = await dispatch(checkWishlistStatus(merchandiseId));
            if (mounted) setWishlist(!!exists);
        })();
        return () => { mounted = false; };
    }, [dispatch, merchandiseId]);

    // Cart handlers
    const handleCartAction = useCallback(
        async (action: 'add' | 'remove') => {
            setLoading(prev => ({ ...prev, [merchandiseId]: true }));
            try {
                await new Promise(resolve => setTimeout(resolve, 800));
                if (action === 'add') {
                    const cartProduct = {
                        merchandiseId,
                        id: productId,
                        quantity: 1,
                        title: name,
                        price: parseFloat(price),
                        oldPrice: parseFloat(oldPrice ?? "0"),
                        image,
                        productType,
                    };
                    await dispatch(addProductToCart(cartProduct));
                } else {
                    await dispatch(removeProductFromCart(merchandiseId));
                }
            } catch (error) {
                console.error(`${action === 'add' ? 'Add' : 'Remove'} to cart failed`, error);
            } finally {
                setLoading(prev => {
                    const newLoading = { ...prev };
                    delete newLoading[merchandiseId];
                    return newLoading;
                });
            }
        },
        [dispatch, merchandiseId, productId, name, price, oldPrice, image, productType]
    );

    // Image source handling
    const imageSource =
        typeof image === 'string'
            ? { uri: image }
            : image;

    // Discount calculation
    const discount =
        Number(oldPrice) > 0 && Number(price) > 0 && Number(oldPrice) > Number(price)
            ? Math.round(((Number(oldPrice) - Number(price)) / Number(oldPrice)) * 100)
            : null;

    return (
        <View style={styles.cardWrapper}>
            <TouchableOpacity
                onPress={onPress}
                style={styles.container}
                activeOpacity={0.85}
                accessibilityLabel={`View details for ${name}`}
            >
                <View style={[
                    styles.imageContainer,
                    { backgroundColor: dark ? '#000' : COLORS.white }
                ]}>
                    <Image
                        source={imageSource}
                        resizeMode='contain'
                        style={styles.image}
                        accessibilityLabel={name}
                    />
                    {(availableForSale &&
                        !(productTags?.includes("request-a-qoute") || productTags?.includes("request-a-quote"))) && (
                            <TouchableOpacity
                                style={styles.bottomLeftHeart}
                                onPress={() => handleCartAction(cartItem ? 'remove' : 'add')}
                                disabled={!!loading[merchandiseId]}
                                accessibilityLabel={cartItem ? "Remove from cart" : "Add to cart"}
                            >
                                {loading[merchandiseId] ? (
                                    <ActivityIndicator
                                        size="small"
                                        color={dark ? '#FFFFFF' : '#000000'}
                                    />
                                ) : (
                                    <Image
                                        source={cartItem
                                            ? (dark ? icons.addedToCartWhite : icons.addedToCart)
                                            : (dark ? icons.addToCartWhite : icons.addToCart)}
                                        resizeMode="contain"
                                        style={styles.smallHeartIcon}
                                    />
                                )}
                            </TouchableOpacity>
                        )}
                </View>

                <Text
                    style={[
                        styles.name,
                        { color: dark ? COLORS.secondaryWhite : COLORS.greyscale900 }
                    ]}
                    numberOfLines={2}
                >
                    {name}
                </Text>

                <View style={styles.bottomPriceContainer}>
                    {(productTags?.includes("request-a-qoute") || productTags?.includes("request-a-quote")) ? (
                        <TouchableOpacity style={styles.priceButton} onPress={onPress}>
                            <Text style={styles.price}>{t('productCard.priceOnRequest')}</Text>
                        </TouchableOpacity>

                    ) : (
                        <>
                            <Text style={styles.price}>{"AED " + parseFloat(price).toFixed(2)}</Text>
                            {Number(oldPrice) > 0 && (
                                <Text style={[
                                    styles.oldPrice,
                                    { color: dark ? COLORS.white : COLORS.primary }
                                ]}>
                                    {"AED " + parseFloat(oldPrice).toFixed(2)}
                                </Text>
                            )}
                        </>
                    )}

                </View>
            </TouchableOpacity >

            {/* Badge (discount or sold out) */}
            < View style={styles.topLeftContainer} >
                {!availableForSale &&
                    !(productTags?.includes("request-a-qoute") || productTags?.includes("request-a-quote")) ? (
                    <View style={[styles.soldContainer, { backgroundColor: "rgb(111, 113, 155)" }]}>
                        <Text style={[styles.soldText, { color: "#fff" }]}>{t('productCard.outOfStock')}</Text>
                    </View>
                ) : discount ? (
                    <View style={[styles.soldContainer, { backgroundColor: "rgb(177, 18, 22)" }]}>
                        <Text style={[styles.soldText, { color: "#fff" }]}>save {discount}%</Text>
                    </View>
                ) : null}
            </View >


        </View >
    );
};

const styles = StyleSheet.create({
    cardWrapper: { position: 'relative' },
    container: {
        flexDirection: "column",
        width: (SIZES.width - 12) / 2 - 12,
        padding: 20,
        borderRadius: 16,
        // marginBottom: 12,
        marginRight: 4,
        fontFamily: 'RubikLight'
    },
    imageContainer: {
        width: "100%",
        // height: 130,
        backgroundColor: COLORS.silver
    },
    image: {
        width: "100%",
        height: 150,
    },
    name: {
        fontSize: normalizeFont(17),
        lineHeight: 25,
        fontFamily: 'RubikRegular',
        fontWeight: '600',
        marginVertical: 13,
        textAlign: "center"
    },
    bottomPriceContainer: {
        width: "100%",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "baseline",
        marginBottom: 4
    },
    priceButton: {
        paddingVertical: 10,
        paddingHorizontal: 16,
        // borderRadius: 6,
        alignItems: 'center',
        borderWidth: 1,
        borderColor: 'rgb(223, 223, 223)',
    },
    price: {
        fontSize: normalizeFont(15),
        fontFamily: 'RubikRegular',
        color: "rgb(177, 18, 22)",
        marginRight: 8
    },
    oldPrice: {
        fontSize: normalizeFont(15),
        color: COLORS.primary,
        textDecorationLine: 'line-through'
    },
    topLeftContainer: {
        position: "absolute",
        top: 18,
        left: 16,
        zIndex: 999,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center"
    },
    soldContainer: {
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: COLORS.silver
    },
    soldText: {
        fontSize: normalizeFont(12),
        paddingHorizontal: 5,
        paddingVertical: 3,
        fontFamily: "RubikRegular",
        fontWeight: '800',
        textTransform: "uppercase"
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

export default React.memo(ProductCard);