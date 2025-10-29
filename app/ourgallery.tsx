import CardSlider from '@/components/CardSlider';
import HamburgerDrawer from '@/components/HamburgerDrawer';
import { VideoSlider } from '@/components/VideoSlider';
import { COLORS, icons, images } from '@/constants';
import { useCardsData } from '@/data';
import { useAppSelector } from '@/hooks/useAppSelector';
import { useTheme } from '@/theme/ThemeProvider';
import { normalizeFont } from '@/utils/normalizeFont';
import { NavigationProp } from '@react-navigation/native';
import { router, useNavigation } from 'expo-router';
import i18next from 'i18next';
import React, { useRef } from 'react';
import { Dimensions, Image, Linking, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ScrollView } from 'react-native-virtualized-view';

const { width } = Dimensions.get('window');

const OurGallery = () => {
    const navigation = useNavigation<NavigationProp<any>>();
    const { dark, colors } = useTheme();
    // const { t } = useTranslation();
    const { t } = i18next;
    const drawerRef = useRef<any>(null);
    const cardsData = useCardsData();
    const cartItems = useAppSelector(state => state.cart.cartItems);
    const wishlistItems = useAppSelector(state => state.wishlist.wishlistItems);

    const totalCartItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
    /**
    * Render header
    */
    const renderHeader = () => {
        return (
            <>
                <View
                    style={{
                        backgroundColor: "rgb(177, 18, 22)", alignItems: "center",
                        paddingTop: 5,
                        paddingBottom: 5
                    }}
                >
                    <Text
                        style={{
                            textAlign: "center",
                            color: "white",
                            fontSize: normalizeFont(14),
                            maxWidth: 350,
                            fontFamily: 'RubikRegular',
                        }}
                    >
                        {t('aboutUs.announcement')}
                    </Text>
                </View>
                <View style={styles.headerContainer}>
                    <View style={{ flexDirection: "row", alignItems: "center", gap: 20 }}>
                        <TouchableOpacity onPress={() => drawerRef.current.open()}>
                            <Image
                                source={images.menu}
                                resizeMode='contain'
                                style={[styles.userIcon, { tintColor: dark ? COLORS.white : COLORS.greyscale900 }]}
                            />
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => navigation.navigate("search")}>
                            <Image
                                source={icons.search3}
                                resizeMode='contain'
                                style={[styles.userIcon, { tintColor: dark ? COLORS.white : COLORS.greyscale900 }]}
                            />
                        </TouchableOpacity>
                    </View>
                    <View>
                        <Image
                            source={images.nbsLogo2}
                            resizeMode='contain'
                            style={styles.nbsLogo}
                        />
                    </View>
                    <View style={{ flexDirection: "row", alignItems: "center", gap: 20 }}>
                        <TouchableOpacity
                            onPress={() => navigation.navigate("mywishlist")}>
                            <Image
                                source={icons.heartOutline}
                                resizeMode='contain'
                                style={[styles.userIcon, { tintColor: dark ? COLORS.white : COLORS.greyscale900 }]}
                            />

                            <View
                                style={{
                                    position: 'absolute',
                                    top: -4,
                                    right: -4,
                                    backgroundColor: 'rgb(177, 18, 22)',
                                    borderRadius: 10,
                                    minWidth: 18,
                                    height: 18,
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    paddingHorizontal: 4,
                                    zIndex: 1,
                                }}
                            >
                                <Text style={{ color: 'white', fontSize: 10, fontWeight: 'bold' }}>
                                    {wishlistItems?.length}
                                </Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => router.push("/cart")}>
                            <Image
                                source={icons.bag3Outline}
                                resizeMode='contain'
                                style={[styles.userIcon, { tintColor: dark ? COLORS.white : COLORS.greyscale900 }]}
                            />
                            {/* {totalCartItems > 0 && ( */}
                            <View
                                style={{
                                    position: 'absolute',
                                    top: -4,
                                    right: -4,
                                    backgroundColor: 'rgb(177, 18, 22)',
                                    borderRadius: 10,
                                    minWidth: 18,
                                    height: 18,
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    paddingHorizontal: 4,
                                    zIndex: 1,
                                }}
                            >
                                <Text style={{ color: 'white', fontSize: 10, fontWeight: 'bold' }}>
                                    {totalCartItems}
                                </Text>
                            </View>
                            {/* )} */}
                        </TouchableOpacity>
                    </View>

                </View>
            </>
        )
    }

    return (
        <SafeAreaView style={[styles.area, { backgroundColor: dark ? COLORS.dark1 : COLORS.white }]}>
            <View style={[styles.container, { backgroundColor: colors.background }]}>
                {renderHeader()}
                <ScrollView showsVerticalScrollIndicator={true} style={{ marginBottom: 40 }}>
                    <View style={[styles.bannerContainer]}>
                        {/* <ImageBackground
                            source={images.aboutUsBanner1}
                            style={styles.imageBackground}
                            resizeMode="cover"
                        >
                            <View style={styles.overlay}>
                                <View style={styles.bannerTextContainer}>
                                    <View style={styles.bannerTopContainer}>
                                        <View>
                                            <Text style={styles.headline}>{t('aboutUs.section1.subTitle')}</Text>
                                        </View>
                                    </View>
                                </View>
                            </View>
                        </ImageBackground> */}
                        <VideoSlider
                            videos={[
                                { id: '1', uri: 'https://cdn.shopify.com/videos/c/o/v/47f10a261ef84b1e8036eff354caa445.mp4' },
                                { id: '2', uri: 'https://cdn.shopify.com/videos/c/o/v/11083b069a524669a74f173902a3b005.mp4' },
                                { id: '3', uri: 'https://cdn.shopify.com/videos/c/o/v/0490b14fd9624a3482f018bf52b9c01f.mp4' },
                                { id: '4', uri: 'https://cdn.shopify.com/videos/c/o/v/e2237ed190454352aea6ae2b069770a5.mp4' }
                            ]}
                        />
                    </View>

                    <View style={{ marginVertical: 40 }}>
                        <Text style={[styles.headline2, { color: dark ? COLORS.white : "" }]}>Driving The Renewable Revolution</Text>
                        <View style={{ flexDirection: "row", alignItems: "center", paddingHorizontal: 20 }}>
                            <Text style={[styles.featureText, { color: dark ? COLORS.white : "#333" }]} >Discover reliable and cost-effective solar power systems with NBS Solar.</Text>
                        </View>
                        <TouchableOpacity style={styles.ctaButton} onPress={() => { Linking.openURL("https://cdn.shopify.com/s/files/1/0760/7743/3044/files/A5_MASTER_CATALOG_SU-MAK_PRODUCTS_SINGLE_PAGE_1ST-3_11zon.pdf?v=1760526347") }}>
                            <Text style={styles.ctaButtonText}>{t('aboutUs.section4.btn')}</Text>
                        </TouchableOpacity>
                    </View>
                    <CardSlider cards={cardsData} />
                </ScrollView>
                <HamburgerDrawer ref={drawerRef} />
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    area: {
        flex: 1,
    },
    container: {
        backgroundColor: COLORS.white,
        paddingBottom: 80
    },
    headerContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingLeft: 16,
        paddingBottom: 6,
        paddingRight: 16,
        borderBottomWidth: 0.4
    },
    userIcon: {
        width: width * 0.06,
        height: 38,
    },
    nbsLogo: {
        width: width * 0.25,
        height: 68,
        borderRadius: 32
    },
    bannerContainer: {
        width: width,
    },
    bannerTopContainer: {
        flexDirection: "column",
        justifyContent: "space-between",
        alignItems: "flex-start"
    },
    imageBackground: {
        width: "100%",
        height: 300,
        overflow: 'hidden',
    },
    overlay: {
        backgroundColor: 'rgba(0,0,0,0.3)',
        padding: 20,
        height: 300
    },
    bannerTextContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    headline: {
        color: COLORS.white,
        fontSize: normalizeFont(29),
        fontFamily: 'TomorrowBold',
        fontWeight: '900',
        lineHeight: 40,
        marginBottom: 20,
        textAlign: "center"
    },
    headline2: {
        fontSize: normalizeFont(29),
        fontFamily: 'TomorrowBold',
        fontWeight: '900',
        lineHeight: 40,
        marginBottom: 20,
        textAlign: "center",
        textTransform: "uppercase",
        maxWidth: width * 0.8,
        alignSelf: "center"
    },
    ctaButton: {
        backgroundColor: '#A40000',
        paddingVertical: 10,
        paddingHorizontal: 25,
        alignSelf: 'center',
        marginTop: 30
    },
    ctaButtonText: {
        color: '#fff',
        fontWeight: '700',
        fontSize: normalizeFont(14),
    },
    featureText: {
        fontSize: normalizeFont(18),
        color: "#333",
        textAlign: "center",
        lineHeight: 30,
        fontFamily: 'RubikRegular',
    },
})

export default OurGallery