import HamburgerDrawer from '@/components/HamburgerDrawer';
import { COLORS, icons, images, SIZES } from '@/constants';
import { useCardsData } from '@/data';
import { useTheme } from '@/theme/ThemeProvider';
import { NavigationProp } from '@react-navigation/native';
import { useNavigation } from 'expo-router';
import i18next from 'i18next';
import React, { useRef } from 'react';
import { Dimensions, FlatList, Image, ImageBackground, ImageSourcePropType, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ScrollView } from 'react-native-virtualized-view';

const { width } = Dimensions.get('window');

const AboutUs = () => {
    const navigation = useNavigation<NavigationProp<any>>();
    const { dark, colors } = useTheme();
    // const { t } = useTranslation();
    const { t } = i18next;
    const drawerRef = useRef<any>(null);
    const cardsData = useCardsData();
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
                            fontSize: 14,
                            maxWidth: 350,
                        }}
                    >
                        A global leader in power and renewable energy distribution across three continents
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
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => navigation.navigate("cart")}>
                            <Image
                                source={icons.bag3Outline}
                                resizeMode='contain'
                                style={[styles.userIcon, { tintColor: dark ? COLORS.white : COLORS.greyscale900 }]}
                            />
                        </TouchableOpacity>
                    </View>

                </View>
            </>
        )
    }

    const renderCardItem = ({ item }: { item: { id: string; title: string; subTitle: string; icon: ImageSourcePropType } }) => (
        <View style={{ width, height: 200 }}>
            <View style={{
                alignItems: 'center',
                justifyContent: 'center',
                flex: 1
            }} >
                <Image
                    source={item.icon}
                    resizeMode="contain"
                    style={{ width: 30, height: 30, alignSelf: 'center' }}
                />
                <Text style={[styles.subTitle, {
                    color: COLORS.white,
                    fontSize: 16
                }]}>{item.title}</Text>
                <Text style={[styles.name, {
                    color: COLORS.white
                }]}>{item.subTitle}</Text>
            </View>
        </View >
    );

    const renderCards = () => {
        return (
            <View style={[styles.bannerItemContainer, {
                backgroundColor: 'rgb(177, 18, 22)',
                paddingBottom: 20
            }]}>
                <FlatList
                    data={cardsData}
                    style={{ direction: 'ltr' }}
                    horizontal
                    keyExtractor={(item) => item.id}
                    renderItem={renderCardItem}
                    pagingEnabled      // ✅ snap to one full screen
                    snapToAlignment="center"
                    decelerationRate="fast"
                    showsHorizontalScrollIndicator={false}
                />
            </View>
        )
    }

    return (
        <SafeAreaView style={[styles.area, { backgroundColor: dark ? COLORS.dark1 : COLORS.white }]}>
            <View style={[styles.container, { backgroundColor: colors.background }]}>
                {renderHeader()}
                <ScrollView showsVerticalScrollIndicator={true} style={{ marginBottom: 40 }}>
                    <View style={[styles.bannerContainer]}>
                        <ImageBackground
                            source={images.aboutUsBanner1}
                            style={styles.imageBackground}
                            resizeMode="cover"
                        >
                            <View style={styles.overlay}>
                                <View style={styles.bannerTextContainer}>
                                    <View style={styles.bannerTopContainer}>
                                        <View>
                                            <Text style={styles.inverterLabel}>ABOUT US</Text>
                                            <Text style={styles.headline}>POWERING PROGRESS.{"\n"}GLOBALLY. SUSTAINABLY.</Text>
                                        </View>
                                    </View>
                                </View>
                            </View>
                        </ImageBackground>
                    </View>
                    <View style={{ marginVertical: 40 }}>
                        <Text style={[styles.headline2, { color: dark ? COLORS.white : "" }]}>POWERING PROGRESS.{"\n"}GLOBALLY. SUSTAINABLY</Text>
                        <View style={{ flexDirection: "row", alignItems: "center", paddingHorizontal: 20 }}>
                            <Text style={[styles.featureText, { color: dark ? COLORS.white : "#333" }]} >Assisted by next-generation B2B distribution, NBS Group is revolutionizing global access to power and renewable energy. A force spread across three continents, we deliver seamless, technology-driven solutions that connect businesses to critical energy products—efficiently, reliably, and at scale.</Text>
                        </View>
                    </View>
                    <View style={styles.banner}>
                        <Image
                            source={images.aboutUsBanner2}
                            resizeMode="cover"
                            style={styles.bannerImage}
                        />
                    </View>
                    <View style={styles.content}>
                        <Text style={[styles.headline2, { color: dark ? COLORS.white : "" }]}>
                            EMPOWERING ACCESS.{'\n'}ENABLING GROWTH.
                        </Text>
                        <Text style={[styles.featureText, { color: dark ? COLORS.white : "#333" }]}>
                            Redefining the distribution of solar energy, backup power, and power
                            quality solutions in the developing world, NBS is at the forefront
                            of the energy transition. Small and medium distribution businesses
                            are the target market for our strong e‑commerce platform, which
                            offers end‑to‑end customer support, logistics assistance, and quick,
                            easy transactions with complete transparency.
                        </Text>
                    </View>

                    <View style={[styles.bannerContainer]}>
                        <ImageBackground
                            source={images.aboutUsBanner3}
                            style={styles.imageBackground2}
                            resizeMode="cover"
                        >
                            <View style={styles.overlay2}>
                                <View style={styles.bannerTextContainer}>
                                    <View style={styles.bannerTopContainer}>
                                        <View>
                                            <Text style={styles.inverterLabel2}>Driving the Renewable Revolution</Text>
                                            <Text style={styles.headline3}>Discover reliable and cost-effective solar power systems with NBS Solar.</Text>
                                            <TouchableOpacity style={styles.ctaButton} onPress={() => navigation.navigate("allproducts")}>
                                                <Text style={styles.ctaButtonText}>VIEW OUR CATALOGUE</Text>
                                            </TouchableOpacity>
                                        </View>
                                    </View>
                                </View>
                            </View>
                        </ImageBackground>
                    </View>

                    <View style={{ marginVertical: 40 }}>
                        <Text style={[styles.headline2, { color: dark ? COLORS.white : "" }]}>Our Mission: Powering a Sustainable Future through Global B2B Innovation</Text>
                        <View style={{ flexDirection: "row", alignItems: "center", paddingHorizontal: 20 }}>
                            <Text style={[styles.featureText, { color: dark ? COLORS.white : "#333" }]} >By revolutionising the delivery and accessibility of energy products, we are dedicated to creating a more environmentally friendly future. Through the use of creative distribution techniques, regional alliances, and online platforms, we are not only advancing goods but also the world.</Text>
                        </View>
                    </View>
                    {renderCards()}
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
        // flex: 1,
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
        width: 28,
        height: 38,
    },
    nbsLogo: {
        width: 128,
        height: 68,
        borderRadius: 32
    },
    viewLeft: {
        flexDirection: "row",
        alignItems: "center"
    },
    greeeting: {
        fontSize: 12,
        fontFamily: "regular",
        color: "gray",
        marginBottom: 4
    },
    title: {
        fontSize: 20,
        fontFamily: "bold",
        color: COLORS.greyscale900
    },
    viewNameContainer: {
        marginLeft: 12
    },
    viewRight: {
        flexDirection: "row",
        alignItems: "center"
    },
    bellIcon: {
        height: 24,
        width: 24,
        tintColor: COLORS.black,
        marginRight: 8
    },
    bookmarkIcon: {
        height: 24,
        width: 24,
        tintColor: COLORS.black
    },
    searchBarContainer: {
        width: SIZES.width - 32,
        backgroundColor: COLORS.secondaryWhite,
        padding: 16,
        borderRadius: 12,
        height: 52,
        marginVertical: 16,
        flexDirection: "row",
        alignItems: "center",
        marginLeft: 16
    },
    searchIcon: {
        height: 24,
        width: 24,
        tintColor: COLORS.gray
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
    bannerContainer: {
        // height: 100,
        width: width,
    },
    bannerTopContainer: {
        flexDirection: "column",
        justifyContent: "space-between",
        alignItems: "flex-start"
    },
    bannerTopContainer2: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "flex-start"
    },
    bannerDicount: {
        fontSize: 12,
        fontFamily: "medium",
        color: COLORS.black,
        marginBottom: 4
    },
    bannerDiscountName: {
        fontSize: 16,
        fontFamily: "bold",
        color: COLORS.black
    },
    bannerDiscountNum: {
        fontSize: 46,
        fontFamily: "bold",
        color: COLORS.black
    },
    bannerBottomContainer: {
        marginTop: 8
    },
    bannerBottomTitle: {
        fontSize: 14,
        fontFamily: "medium",
        color: COLORS.black
    },
    bannerBottomSubtitle: {
        fontSize: 14,
        fontFamily: "medium",
        color: COLORS.black,
        marginTop: 4
    },
    userAvatar: {
        width: 64,
        height: 64,
        borderRadius: 999
    },
    firstName: {
        fontSize: 16,
        fontFamily: "semiBold",
        color: COLORS.dark2,
        marginTop: 6
    },
    bannerItemContainer: {
        width: "100%",
    },
    dotContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10,
    },
    dot: {
        width: 10,
        height: 10,
        borderRadius: 5,
        backgroundColor: '#ccc',
        marginHorizontal: 5,
    },
    activeDot: {
        backgroundColor: COLORS.black,
    },
    squareDotContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10,
    },
    squareDot: {
        width: 10,
        height: 10,
        backgroundColor: 'rgb(255,255,255)',
        opacity: 0.3,
        marginHorizontal: 5,
    },
    activeSquareDot: {
        opacity: 1,
    },


    imageBackground: {
        width: "100%",
        height: 300,
        overflow: 'hidden',
    },
    imageBackground2: {
        width: "100%",
        height: 600,
        overflow: 'hidden',
    },
    overlay: {
        backgroundColor: 'rgba(0,0,0,0.3)',
        padding: 20,
        height: 300
    },
    overlay2: {
        backgroundColor: 'rgba(0,0,0,0.3)',
        padding: 20,
        height: 600
    },
    bannerTextContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    inverterLabel: {
        color: COLORS.white, // red color like image
        fontSize: 14,
        letterSpacing: 1,
        fontWeight: '600',
        marginBottom: 10,
        textAlign: "center"
    },
    inverterLabel2: {
        color: COLORS.primaryRed, // red color like image
        fontSize: 16,
        letterSpacing: 1,
        fontWeight: '600',
        marginBottom: 10,
        textAlign: "center",
        textTransform: "uppercase"
    },
    headline: {
        color: COLORS.white,
        fontSize: 25,
        fontWeight: '900',
        lineHeight: 30,
        marginBottom: 20,
        textAlign: "center"
    },
    headline2: {
        // color: COLORS.white,
        fontSize: 25,
        fontWeight: '900',
        lineHeight: 30,
        marginBottom: 20,
        textAlign: "center",
        textTransform: "uppercase",
        maxWidth: 400,
        alignSelf: "center"
    },
    headline3: {
        color: COLORS.white,
        fontSize: 29,
        fontWeight: '900',
        lineHeight: 30,
        marginBottom: 20,
        textAlign: "center",
        textTransform: "uppercase",
        maxWidth: 300
    },
    ctaButton: {
        backgroundColor: '#A40000',
        paddingVertical: 10,
        paddingHorizontal: 20,
        alignSelf: 'center',
        borderRadius: 4,
    },
    ctaButtonText: {
        color: '#fff',
        fontWeight: '700',
        fontSize: 14,
    },
    subTitle: {
        color: '#fff', // red color like image
        fontSize: 15,
        letterSpacing: 1,
        fontWeight: '800',
        marginBottom: 8,
        textTransform: 'uppercase',
        textAlign: 'center',
        marginTop: 20
    },
    mainTitle: {
        color: '#fff',
        fontSize: 28,
        marginTop: 15,
        marginBottom: 15,
        fontWeight: '900',
        lineHeight: 30,
        textTransform: 'uppercase',
        textAlign: 'center'
    },



    flatListContainer: {
        paddingHorizontal: 16,
    },
    brandCard: {
        backgroundColor: COLORS.white, // Use your COLORS constant
        borderRadius: 12,
        padding: 20,
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: 100,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    brandImage: {
        width: '100%',
        height: 60,
    },

    scrollContent: {
        flexDirection: 'row',      // ✅ this is the important one
        alignItems: 'center',
        paddingHorizontal: 10,
    },
    image: {
        width: 100,
        height: 100,
        marginRight: 16,
    },
    ourProductTitle: {
        color: '#fff',
        fontSize: 28,
        fontWeight: '900',
        lineHeight: 30,
        textTransform: 'uppercase',
        position: 'absolute',
        bottom: 80,
        left: 0,
        right: 0,
        textAlign: 'center',
    },
    name: {
        fontSize: 18,
        color: COLORS.greyscale900,
        marginVertical: 4,
        textAlign: "center",
        maxWidth: 350,
        // lineHeight: 40
    },
    featureText: {
        // flex: 1,
        fontSize: 18,
        color: "#333",
        textAlign: "center",
        lineHeight: 30
    },









    banner: {
        backgroundColor: '#004F8A', // deep blue
        alignItems: 'center',
        paddingTop: 32,
        paddingBottom: 24,
        height: 250,
        position: "relative"
    },
    bannerImage: {
        position: "absolute",
        top: "30%",
        width: width * 0.72, // 82 % of screen width
        height: width * 0.82 * 0.62, // keep a pleasant aspect ratio
    },

    /* ---------- Content ---------- */
    content: {
        paddingHorizontal: 54,
        paddingVertical: 40,
        marginTop: 70
    },
    heading: {
        fontSize: 28,
        lineHeight: 34,
        fontWeight: '800',
        textAlign: 'center',
        letterSpacing: 1,
        color: '#303030',
        marginBottom: 32,
    },
    body: {
        fontSize: 17,
        lineHeight: 28,
        textAlign: 'center',
        color: '#303030',
    },

})

export default AboutUs