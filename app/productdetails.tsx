import ProductCard from "@/components/ProductCard";
import { useAppDispatch } from "@/hooks/useAppDispatch";
import { useAppSelector } from "@/hooks/useAppSelector";
import { addProductToCart } from "@/utils/actions/cartActions";
import { clearProductFirst, fetchProduct } from "@/utils/actions/productActions";
import { fetchRecommendedProducts } from "@/utils/actions/recommendedProductsActions";
import { addProductToWishlist, checkWishlistStatus } from "@/utils/actions/wishListActions";
import { decrementProduct, incrementProduct } from "@/utils/reducers/cartReducers";
import { Feather, FontAwesome } from "@expo/vector-icons";
import { NavigationProp, RouteProp, useRoute } from '@react-navigation/native';
import { useNavigation } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useRef, useState } from 'react';
import { useTranslation } from "react-i18next";
import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import RBSheet from "react-native-raw-bottom-sheet";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { ScrollView } from "react-native-virtualized-view";
import AutoSlider from '../components/AutoSlider';
import SocialIcon from '../components/SocialIcon';
import { COLORS, SIZES, icons, socials } from '../constants';
import { useTheme } from '../theme/ThemeProvider';

type ProductDetailsParams = {
    id: string;
};

type ProductDetailsRouteProp = RouteProp<
    { productdetails: ProductDetailsParams },
    'productdetails'
>;

interface Specification {
    key: string;
    value: string;
}

export interface CartProduct {
    merchandiseId: string;
    id: string;
    title: string;
    price: number;
    oldPrice?: number; // optional
    quantity: number;
    image?: string;
    productType: string;
}

interface Product {
    id: string;
    title: string;
    productType: string;
    variants: {
        id: string;
        price: string;
        oldPrice?: string;
        image?: string;
    }[];
}


const ProductDetails = () => {
    const navigation = useNavigation<NavigationProp<any>>();
    const route = useRoute<ProductDetailsRouteProp>();
    const dispatch = useAppDispatch();
    const product = useAppSelector(state => state.product.data);
    const recommendedProducts = useAppSelector(state => state.recommendedProducts.data)
    // const [totalPrice, setTotalPrice] = useState<string>(parseFloat(product?.variants[0]?.price ?? "0").toFixed(2));
    const cartItems = useAppSelector(state => state.cart.cartItems);
    const appLanguage = useAppSelector(state => state.generalSettings.language);
    const [totalPrice, setTotalPrice] = useState<number>(parseFloat(product?.variants[0]?.price ?? "0")); // store as number
    const [quantity, setQuantity] = useState(1);
    const insets = useSafeAreaInsets();

    const { id } = route.params; // ✅ Now `id` is available
    const [isFavourite, setIsFavourite] = useState(false);
    const { dark } = useTheme();
    const refRBSheet = useRef<any>(null);
    const { t } = useTranslation();

    // Slider images
    // const sliderImages = [
    //     images.sofa1,
    //     images.sofa2,
    //     images.sofa3,
    //     images.sofa4,
    //     images.sofa5,
    //     images.sofa6,
    // ];

    useEffect(() => {
        dispatch(clearProductFirst());
        dispatch(fetchProduct(id));
        dispatch(fetchRecommendedProducts(id));
    }, [dispatch, id]);

    const sliderImages = (product?.images ?? []).map(img => ({ uri: img.src }));

    const handleAddToCart = (product: Product | null) => {
        if (product?.variants[0]?.id) {
            const cartProduct: CartProduct = {
                merchandiseId: product.variants[0].id,
                id: product.id,
                quantity: quantity,
                title: product.title,
                price: parseFloat(product.variants[0].price),
                oldPrice: parseFloat(product.variants[0].oldPrice ?? "0"), // ✅ fixed
                image: product.variants[0].image,
                productType: product.productType,
            };
            dispatch(addProductToCart(cartProduct));
        }
    };

    useEffect(() => {
        const checkStatus = async () => {
            const merchandiseId = product?.id;
            if (!merchandiseId) return;
            const exists = await dispatch(checkWishlistStatus(merchandiseId));
            setIsFavourite(exists);
        };
        checkStatus();
    }, [dispatch, product]);

    const getCartItem = (merchId: string) => {
        return cartItems.find(item => item.merchandiseId === merchId);
    };

    const increase = (merchandiseId: string) => {
        dispatch(incrementProduct({ merchandiseId }));
    };

    const decrease = (merchandiseId: string) => {
        dispatch(decrementProduct({ merchandiseId }));
    };

    // render header
    const renderHeader = () => {

        return (
            <View style={styles.headerContainer}>
                <TouchableOpacity
                    onPress={() => navigation.goBack()}>
                    <Image
                        source={icons.back}
                        resizeMode='contain'
                        // style={styles.backIcon}
                        style={[
                            styles.backIcon,
                            appLanguage === 'ar' && { transform: [{ rotate: '180deg' }] },
                        ]}
                    />
                </TouchableOpacity>

                <View style={styles.iconContainer}>
                    <TouchableOpacity
                        onPress={() => {
                            dispatch(addProductToWishlist({
                                merchandiseId: product?.id ?? '',
                                title: product?.title ?? 'Untitled',
                                image: product?.variants[0]?.image,
                                price: parseFloat(product?.variants[0]?.price ?? '0'),
                                oldPrice: product?.variants[0]?.oldPrice ? parseFloat(product.variants[0].oldPrice) : undefined,
                                productType: product?.productType ?? ''
                            }));
                            setIsFavourite(prev => !prev);
                        }}
                    >
                        <Image
                            source={isFavourite ? icons.heart2 : icons.heart2Outline}
                            resizeMode='contain'
                            style={styles.bookmarkIcon}
                        />
                    </TouchableOpacity>
                    {/* <TouchableOpacity
                        style={styles.sendIconContainer}
                        onPress={() => refRBSheet.current.open()}>
                        <Image
                            source={icons.send2}
                            resizeMode='contain'
                            style={styles.sendIcon}
                        />
                    </TouchableOpacity> */}
                </View>
            </View>
        )
    }

    const parseSpecifications = (specValues: string | null | undefined): Specification[] => {
        // Handle null, undefined, or empty string cases
        if (!specValues || specValues.trim() === '') {
            return [];
        }

        try {
            const parsed: string[] = JSON.parse(specValues);
            return parsed.map((spec: string) => {
                const [key, value] = spec.split(':');
                return {
                    key: key?.trim() || '',
                    value: value?.trim() || ''
                };
            });
        } catch (error) {
            console.error('Error parsing specifications:', error);
            return [];
        }
    };

    const specifications = parseSpecifications(product?.specificationValues);
    /**
     * render content
     */
    const renderContent = () => {
        const [selectedColor, setSelectedColor] = useState(null);

        const handleColorSelect = (color: any) => {
            setSelectedColor(color);
        };

        const renderCheckmark = (color: any) => {
            if (selectedColor === color) {
                return <FontAwesome name="check" size={18} color="white" />;
            }
            return null;
        };

        // Safe parse with a default empty string if product.features is null or undefined
        let featuresArray: string[] = [];

        try {
            const rawFeatures = product?.features ?? "[]"; // default to empty array string
            featuresArray = JSON.parse(rawFeatures) as string[];
        } catch (error) {
            console.error("Error parsing features JSON:", error);
            featuresArray = [];
        }

        return (
            <View style={styles.contentContainer}>
                <View style={styles.contentView}>
                    <Text style={[styles.contentTitle, {
                        color: dark ? COLORS.white : COLORS.black
                    }]}>
                        {product?.title}
                    </Text>
                    <TouchableOpacity
                        // onPress={() => setIsFavourite(!isFavourite)}
                        onPress={() => {
                            dispatch(addProductToWishlist({
                                merchandiseId: product?.id ?? '',
                                title: product?.title ?? 'Untitled',
                                image: product?.variants[0]?.image,
                                price: parseFloat(product?.variants[0]?.price ?? '0'),
                                oldPrice: product?.variants[0]?.oldPrice ? parseFloat(product.variants[0].oldPrice) : undefined,
                                productType: product?.productType ?? ''
                            }));
                            setIsFavourite(prev => !prev);
                        }}
                    >
                        <Image
                            source={isFavourite ? icons.heart2 : icons.heart2Outline}
                            resizeMode='contain'
                            style={[styles.bookmarkIcon, {
                                tintColor: dark ? COLORS.white : COLORS.black
                            }]}
                        />
                    </TouchableOpacity>
                </View>
                <View style={styles.ratingContainer}>

                    <Text style={[styles.price, {
                        // color: dark ? COLORS.white : COLORS.black,
                        color: "rgb(177, 18, 22)",
                    }]}>{product?.variants && product?.variants.length > 0
                        ? "AED " + parseFloat(product?.variants[0]?.price).toFixed(2)
                        : ""}</Text>

                    <Text style={[styles.oldPrice, {
                        color: dark ? COLORS.white : COLORS.gray, marginLeft: 12
                    }]}>{product?.variants && product?.variants.length > 0
                        ? "AED " + parseFloat(product?.variants[0]?.oldPrice).toFixed(2)
                        : ""}</Text>
                </View>
                <View style={[styles.separateLine, {
                    backgroundColor: dark ? COLORS.greyscale900 : COLORS.grayscale200
                }]} />
                <View style={{ marginVertical: 10 }}>
                    {specifications.map((spec, index) => (
                        <View
                            key={index}
                            style={[styles.row, {
                                backgroundColor: dark ? COLORS.dark1 : 'rgb(245,245,245)'
                            }]}
                        >
                            <Text style={[styles.keyText, {
                                color: dark ? COLORS.white : '#333'
                            }]}>{spec.key}</Text>
                            <Text style={[styles.valueText, {
                                color: dark ? COLORS.white : '#333'
                            }]}>: {spec.value}</Text>
                        </View>
                    ))}
                </View>

                <View style={[styles.separateLine, {
                    backgroundColor: dark ? COLORS.greyscale900 : COLORS.grayscale200
                }]} />
                {/* <View style={styles.qtyContainer}>
                    <Text style={[styles.descTitle, {
                        color: dark ? COLORS.white : COLORS.greyscale900
                    }]}>Quantity</Text>
                    <View style={[styles.qtyViewContainer, {
                        backgroundColor: dark ? COLORS.dark3 : COLORS.silver
                    }]}>
                        <TouchableOpacity
                            onPress={decreaseQty}>
                            <Feather name="minus" size={20} color={dark ? COLORS.white : "black"} />
                        </TouchableOpacity>
                        <Text style={[styles.qtyMidText, {
                            color: dark ? COLORS.white : COLORS.black
                        }]}>{quantity}</Text>
                        <TouchableOpacity
                            onPress={increaseQty}>
                            <Feather name="plus" size={20} color={dark ? COLORS.white : "black"} />
                        </TouchableOpacity>
                    </View>
                </View>

                <View style={[styles.separateLine, {
                    backgroundColor: dark ? COLORS.greyscale900 : COLORS.grayscale200
                }]} /> */}

                {/* <View style={{ marginVertical: 10 }}>
                    {specifications.map((spec, index) => (
                        <View
                            key={index}
                            style={[
                                styles.row,
                                index % 2 === 0 ? styles.evenRow : styles.oddRow
                            ]}
                        >
                            <Text style={styles.keyText}>{spec.key}</Text>
                            <Text style={styles.valueText}>: {spec.value}</Text>
                        </View>
                    ))}
                </View> */}
                <View style={{ marginVertical: 10 }}>
                    <Text style={[styles.contentTitle, {
                        color: dark ? COLORS.white : COLORS.black
                    }]}>
                        {t('productPage.productOverview')}
                    </Text>

                    <Text style={[styles.descTitle, { marginVertical: 10 }, {
                        color: dark ? COLORS.white : COLORS.greyscale900
                    }]}>{t('productPage.highlights')}</Text>
                    <FlatList
                        data={featuresArray}
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={({ item }) => (
                            <View style={styles.featureItem}>
                                <Text style={styles.bullet}>▸</Text>
                                <Text style={[styles.featureText, {
                                    color: dark ? COLORS.white : COLORS.greyscale900
                                }]}>{item}</Text>
                            </View>
                        )}
                    />

                    {/* Featured image */}
                    {product?.variants[0].image ? (
                        <Image
                            source={{ uri: product?.variants[0].image }}
                            style={styles.featuredImage}
                            resizeMode="contain"
                        />
                    ) : null}
                </View>

                {/* <View style={[styles.separateLine, {
                    backgroundColor: dark ? COLORS.greyscale900 : COLORS.grayscale200
                }]} /> */}
            </View>
        )
    }

    const renderRecommendedProducts = () => {
        return (
            <View style={[styles.contentContainer, {
                // backgroundColor: dark ? COLORS.dark3 : COLORS.secondary
                // backgroundColor: dark ? COLORS.dark3 : colors.background
            }]}>
                {/* <Text style={[styles.mainTitle, {
                    color: dark ? COLORS.white : COLORS.black
                }]}>You might also like</Text> */}

                <Text style={[styles.contentTitle, {
                    color: dark ? COLORS.white : COLORS.black
                }]}>
                    {t('productPage.youlike')}
                </Text>
                <View style={{ padding: 16, marginBottom: 70 }} >
                    <FlatList
                        data={recommendedProducts}
                        keyExtractor={item => item.id}
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        renderItem={({ item }) => {
                            return (
                                <View>
                                    <ProductCard
                                        merchandiseId={item.id}
                                        name={item.title}
                                        image={item?.image}
                                        price={item.price}
                                        oldPrice={item.oldPrice}
                                        onPress={() => navigation.navigate("productdetails", {
                                            id: item.id,
                                        })}
                                    />
                                </View>
                            )
                        }}
                    />
                </View>
            </View>
        )
    }
    return (
        <View style={[styles.area,
        {
            backgroundColor: dark ? COLORS.dark1 : COLORS.white,
            paddingBottom: insets.bottom
        }]}>
            <StatusBar hidden />
            {/* <ScrollView showsVerticalScrollIndicator={true}> */}
            <AutoSlider images={sliderImages} />
            {renderHeader()}
            <ScrollView showsVerticalScrollIndicator={false}>
                {renderContent()}
                {renderRecommendedProducts()}
            </ScrollView>
            <View style={[styles.cartBottomContainer, {
                backgroundColor: dark ? COLORS.dark1 : COLORS.white,
                borderTopColor: dark ? COLORS.dark1 : COLORS.white,
                bottom: insets.bottom
            }]}>
                <View>
                    <Text style={[styles.cartTitle, {
                        color: dark ? COLORS.greyscale300 : COLORS.greyscale600
                    }]}>{t('productPage.totalPrice')}</Text>
                    {/* <Text style={[styles.cartSubtitle, {
                        color: dark ? COLORS.white : COLORS.black,
                    }]}>{product?.variants && product?.variants.length > 0
                        ? "AED " + parseFloat(product?.variants[0]?.price).toFixed(2)
                        : ""}</Text> */}
                    <Text style={[styles.cartSubtitle, {
                        color: dark ? COLORS.white : COLORS.black,
                    }]}>AED {totalPrice.toFixed(2)}</Text>
                </View>
                {/* <TouchableOpacity
                    onPress={() => handleAddToCart(product)}
                    style={[styles.cartBtn, {
                        backgroundColor: dark ? COLORS.white : COLORS.black
                    }]}
                    disabled={!product?.variants || !product.variants[0]?.available}>
                    <Image
                        source={icons.bags}
                        resizeMode='contain'
                        style={[styles.bagIcon, {
                            tintColor: dark ? COLORS.black : COLORS.white
                        }]}
                    />
                    <Text style={[styles.cartBtnText, {
                        color: dark ? COLORS.black : COLORS.white,
                    }]}>{product?.variants && product.variants[0]?.available ? "Add to Cart" : "Out of Stock"}</Text>
                </TouchableOpacity> */}

                {!product?.variants || !product.variants[0]?.available ? (
                    // Out of stock button
                    <TouchableOpacity
                        style={[styles.cartBtn, {
                            backgroundColor: dark ? COLORS.dark3 : COLORS.silver
                        }]}
                        disabled={true}
                    >
                        <Text style={[styles.cartBtnText, {
                            color: dark ? COLORS.white : COLORS.black,
                        }]}>{t('productPage.outOfStock')}</Text>
                    </TouchableOpacity>
                ) : getCartItem(product.variants[0].id) ? (
                    // Show increment/decrement if in cart
                    <View style={[styles.qtyViewContainer, {
                        backgroundColor: dark ? COLORS.dark3 : COLORS.silver
                    }]}>
                        <TouchableOpacity
                            onPress={() => decrease(product.variants[0].id)}
                        >
                            <Feather name="minus" size={20} color={dark ? COLORS.white : "black"} />
                        </TouchableOpacity>
                        <Text style={[styles.qtyMidText, {
                            color: dark ? COLORS.white : COLORS.black
                        }]}>
                            {getCartItem(product.variants[0].id)?.quantity ?? 1}
                        </Text>

                        <TouchableOpacity
                            onPress={() => increase(product.variants[0].id)}
                        >
                            <Feather name="plus" size={20} color={dark ? COLORS.white : "black"} />
                        </TouchableOpacity>
                    </View>
                ) : (
                    // Show Add to Cart
                    <TouchableOpacity
                        onPress={() => handleAddToCart(product)}
                        style={[styles.cartBtn, {
                            // backgroundColor: dark ? COLORS.white : COLORS.black
                            backgroundColor: COLORS.primaryRed
                        }]}
                    >
                        <Image
                            source={icons.bags}
                            resizeMode='contain'
                            style={[styles.bagIcon, {
                                tintColor: dark ? COLORS.black : COLORS.white
                            }]}
                        />
                        <Text style={[styles.cartBtnText, {
                            color: dark ? COLORS.black : COLORS.white,
                        }]}>{t('productPage.addToCart')}</Text>
                    </TouchableOpacity>
                )}

            </View>
            {/* </ScrollView> */}
            <RBSheet
                ref={refRBSheet}
                closeOnPressMask={true}
                height={360}
                customStyles={{
                    wrapper: {
                        backgroundColor: "rgba(0,0,0,0.5)",
                    },
                    draggableIcon: {
                        backgroundColor: dark ? COLORS.dark3 : COLORS.grayscale200,
                    },
                    container: {
                        borderTopRightRadius: 32,
                        borderTopLeftRadius: 32,
                        height: 360,
                        backgroundColor: dark ? COLORS.dark2 : COLORS.white,
                        alignItems: "center",
                    }
                }}
            >
                <Text style={[styles.bottomTitle, {
                    color: dark ? COLORS.white : COLORS.greyscale900
                }]}>Share</Text>
                <View style={[styles.separateLine, {
                    backgroundColor: dark ? COLORS.grayscale700 : COLORS.grayscale200,
                    marginVertical: 12
                }]} />
                <View style={styles.socialContainer}>
                    <SocialIcon
                        icon={socials.whatsapp}
                        name="WhatsApp"
                        onPress={() => refRBSheet.current.close()}
                    />
                    <SocialIcon
                        icon={socials.twitter}
                        name="X"
                        onPress={() => refRBSheet.current.close()}
                    />
                    <SocialIcon
                        icon={socials.facebook}
                        name="Facebook"
                        onPress={() => refRBSheet.current.close()}
                    />
                    <SocialIcon
                        icon={socials.instagram}
                        name="Instagram"
                        onPress={() => refRBSheet.current.close()}
                    />
                </View>
                <View style={styles.socialContainer}>
                    <SocialIcon
                        icon={socials.yahoo}
                        name="Yahoo"
                        onPress={() => refRBSheet.current.close()}
                    />
                    <SocialIcon
                        icon={socials.titktok}
                        name="Tiktok"
                        onPress={() => refRBSheet.current.close()}
                    />
                    <SocialIcon
                        icon={socials.messenger}
                        name="Chat"
                        onPress={() => refRBSheet.current.close()}
                    />
                    <SocialIcon
                        icon={socials.wechat}
                        name="Wechat"
                        onPress={() => refRBSheet.current.close()}
                    />
                </View>
            </RBSheet>
        </View>
    )
}

const styles = StyleSheet.create({
    area: {
        flex: 1,
        backgroundColor: COLORS.white,
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
        tintColor: COLORS.black
    },
    bookmarkIcon: {
        width: 24,
        height: 24,
        tintColor: COLORS.black,
        marginTop: 10
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
        marginHorizontal: 12
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
    contentView: {
        alignItems: "flex-start",
        justifyContent: "space-between",
        flexDirection: "row",
        width: SIZES.width - 50,
        marginTop: 10
    },
    contentTitle: {
        fontSize: 30,
        fontFamily: "bold",
        color: COLORS.black,
        // marginTop: 10
    },
    ratingContainer: {
        flexDirection: "row",
        alignItems: "baseline",
        width: SIZES.width - 32,
        marginVertical: 12
    },
    ratingView: {
        width: 68,
        height: 24,
        borderRadius: 4,
        backgroundColor: COLORS.silver,
        alignItems: "center",
        justifyContent: "center"
    },
    ratingViewTitle: {
        fontSize: 10,
        fontFamily: "semiBold",
        color: "#35383F",
        textAlign: "center"
    },
    starContainer: {
        marginHorizontal: 16,
        flexDirection: "row",
        alignItems: "center"
    },
    starIcon: {
        height: 20,
        width: 20
    },
    reviewText: {
        fontSize: 14,
        fontFamily: "medium",
        color: COLORS.greyScale800
    },
    descTitle: {
        fontSize: 18,
        fontFamily: "bold",
        color: COLORS.greyscale900,
        marginVertical: 8
    },
    descText: {
        fontSize: 14,
        color: COLORS.greyScale800,
        fontFamily: "regular",
    },
    featureContainer: {
        flexDirection: "row",
        alignItems: "center",
        width: SIZES.width - 32,
        marginVertical: 12
    },
    featureView: {
        flexDirection: "column",
    },
    sizeContainer: {
        flexDirection: "row",
        alignItems: "center"
    },
    sizeView: {
        height: 40,
        width: 40,
        borderRadius: 999,
        backgroundColor: COLORS.white,
        alignItems: "center",
        justifyContent: "center",
        borderWidth: 2,
        borderColor: COLORS.greyscale600,
        marginRight: 12
    },
    sizeText: {
        fontSize: 16,
        fontFamily: "bold",
        color: COLORS.greyscale600,
        textAlign: "center"
    },
    selectedSize: {
        backgroundColor: 'black',
        borderColor: 'black',
    },
    selectedText: {
        color: 'white',
    },
    colorContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    colorView: {
        width: 40,
        height: 40,
        borderRadius: 25,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 8
    },
    selectedColor: {
        marginRight: 7.8
    },
    qtyContainer: {
        flexDirection: "row",
        alignItems: "center",
        width: SIZES.width - 32,
        marginVertical: 12
    },
    qtyViewContainer: {
        backgroundColor: COLORS.silver,
        height: 48,
        width: 134,
        borderRadius: 24,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        marginHorizontal: 16
    },
    qtyViewText: {
        fontSize: 18,
        fontFamily: "bold",
        color: COLORS.black,
        textAlign: "center"
    },
    qtyMidText: {
        fontSize: 18,
        fontFamily: "bold",
        color: COLORS.black,
        textAlign: "center",
        marginHorizontal: 16
    },
    cartBottomContainer: {
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0,
        width: SIZES.width,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        height: 108,
        backgroundColor: COLORS.white,
        paddingHorizontal: 16,
        paddingVertical: 16,
        borderTopRightRadius: 32,
        borderTopLeftRadius: 32,
        borderTopColor: COLORS.white,
        borderTopWidth: 1,
    },
    cartTitle: {
        fontSize: 12,
        fontFamily: "medium",
        color: COLORS.greyscale600,
        marginBottom: 6
    },
    cartSubtitle: {
        fontSize: 24,
        fontFamily: "bold",
        color: COLORS.black,
    },
    price: {
        fontSize: 24,
        fontFamily: "bold",
        color: COLORS.black,
    },
    oldPrice: {
        fontSize: 20,
        fontFamily: "bold",
        color: COLORS.gray3,
        alignItems: "baseline",
        textDecorationLine: "line-through",
    },
    cartBtn: {
        height: 58,
        width: 250,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 32,
        backgroundColor: COLORS.black,
        flexDirection: "row",
    },
    cartBtnText: {
        fontSize: 16,
        fontFamily: "bold",
        color: COLORS.white,
        textAlign: "center"
    },
    bagIcon: {
        height: 20,
        width: 20,
        tintColor: COLORS.white,
        marginRight: 8
    },












    row: {
        flexDirection: 'row',
        paddingVertical: 12,
        paddingHorizontal: 16,
        // justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 3,
    },
    evenRow: {
        backgroundColor: 'rgb(245,245,245)',
    },
    oddRow: {
        // backgroundColor: '#ffffff',
        backgroundColor: 'rgb(245,245,245)',

    },
    keyText: {
        flex: 0.8,
        fontSize: 14,
        color: '#333',
        fontWeight: '500',
    },
    valueText: {
        flex: 0.2,
        fontSize: 14,
        color: '#333',
        textAlign: 'left',
    },
    noDataText: {
        padding: 16,
        textAlign: 'center',
        color: '#666',
        fontStyle: 'italic',
    },



    featureItem: {
        flexDirection: "row",
        alignItems: "flex-start",
        marginVertical: 4,
    },
    bullet: {
        color: "#d00",
        marginRight: 8,
        fontSize: 18,
    },
    featureText: {
        flex: 1,
        fontSize: 16,
        color: "#333",
    },
    featuredImage: {
        width: "100%",
        height: 200,
        marginTop: 16,
        // marginBottom: 90
    },
})

export default ProductDetails