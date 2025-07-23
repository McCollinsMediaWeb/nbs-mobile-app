import { COLORS, icons, images } from '@/constants';
import { useTheme } from '@/theme/ThemeProvider';
import { NavigationProp } from '@react-navigation/native';
import { useNavigation } from 'expo-router';
import i18next from 'i18next';
import React, {
    forwardRef,
    useImperativeHandle,
    useRef,
} from 'react';
import {
    Image,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';
import RBSheet from 'react-native-raw-bottom-sheet';

const HamburgerDrawer = forwardRef<any>((_, ref) => {
    const navigation = useNavigation<NavigationProp<any>>();
    const internalRef = useRef<any>(null);
    const { dark, colors } = useTheme();
    const { t } = i18next;

    useImperativeHandle(ref, () => internalRef.current);

    return (
        <RBSheet
            ref={internalRef}
            closeOnPressMask={true}
            height={600}
            openDuration={250}
            customStyles={{
                wrapper: {
                    backgroundColor: 'rgba(0,0,0,0.4)',
                },
                container: {
                    alignSelf: 'flex-start',
                    width: '70%',
                    height: '100%',
                },
            }}
        >
            <View style={[styles.container, { backgroundColor: dark ? COLORS.dark1 : COLORS.white }]}>
                <TouchableOpacity
                    onPress={() => internalRef.current?.close()}
                // style={[styles.closeBtn, { tintColor: dark ? COLORS.white : COLORS.greyscale900 }]}
                >
                    <Image
                        source={icons.close}
                        resizeMode='contain'
                        style={[styles.closeBtn, { tintColor: dark ? COLORS.white : COLORS.greyscale900 }]}
                    />
                </TouchableOpacity>

                <TouchableOpacity onPress={() => {
                    internalRef.current?.close();
                    // setTimeout(() => navigation.navigate("(tabs)"), 200);
                    setTimeout(() => navigation.goBack(), 200);
                }}>
                    <Text style={[styles.menuItem, { color: dark ? COLORS.white : "" }]}>{t('hamburgerMenu.home')}</Text>
                </TouchableOpacity>
                <View style={styles.divider} />

                <TouchableOpacity onPress={() => {
                    internalRef.current?.close();
                    setTimeout(() => navigation.navigate("aboutus"), 200);
                }}>
                    <Text style={[styles.menuItem, { color: dark ? COLORS.white : "" }]}>{t('hamburgerMenu.aboutUs')}</Text>
                </TouchableOpacity>
                <View style={styles.divider} />

                <TouchableOpacity onPress={() => {
                    internalRef.current?.close();
                    setTimeout(() => navigation.navigate("allproducts"), 200);
                }}>
                    <Text style={[styles.menuItem, { color: dark ? COLORS.white : "" }]}>{t('hamburgerMenu.allProducts')}</Text>
                </TouchableOpacity>
                <View style={styles.divider} />

                <TouchableOpacity onPress={() => {
                    internalRef.current?.close();
                    setTimeout(() => navigation.navigate("collectionscreen", { collectionId: "gid://shopify/Collection/439668539604", collectionTitle: "Best Sellers", collectionImage: images.aboutUsBanner3 }), 200);
                }}>
                    <Text style={[styles.menuItem, { color: dark ? COLORS.white : "" }]}>{t('hamburgerMenu.bestSellers')}</Text>
                </TouchableOpacity>
                <View style={styles.divider} />

                <TouchableOpacity onPress={() => {
                    internalRef.current?.close();
                    setTimeout(() => navigation.navigate("collectionscreen", { collectionId: "gid://shopify/Collection/439668572372", collectionTitle: "New Arrivals", collectionImage: images.aboutUsBanner1 }), 200);
                }}>
                    <Text style={[styles.menuItem, { color: dark ? COLORS.white : "" }]}>{t('hamburgerMenu.newArrivals')}</Text>
                </TouchableOpacity>
                <View style={styles.divider} />

                <TouchableOpacity onPress={() => {
                    internalRef.current?.close();
                    // Optionally add logic to download the catalog here
                }}>
                    <Text style={[styles.menuItem, { color: dark ? COLORS.white : "" }]}>{t('hamburgerMenu.downloadCatalogue')}</Text>
                </TouchableOpacity>

            </View>
        </RBSheet>
    );
});

export default HamburgerDrawer;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    closeBtn: {
        marginBottom: 20,
        width: 28,
        height: 38
    },
    menuItem: {
        // fontWeight: 'bold',
        // fontSize: 16,
        // marginVertical: 10,
        // color: '#fff',
        fontSize: 18,
        marginTop: 15,
        marginBottom: 15,
        fontWeight: '900',
        lineHeight: 30,
        textTransform: 'uppercase',
    },
    divider: {
        width: "100%",
        backgroundColor: COLORS.grayscale400,
        height: 1
    },
    menuSection: {
        marginTop: 20,
        fontWeight: 'bold',
        fontSize: 14,
        marginBottom: 10,
    },
    productGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 10,
    },
    productItem: {
        width: '30%',
        alignItems: 'center',
    },
    productImage: {
        width: 60,
        height: 60,
        resizeMode: 'contain',
    },
    productName: {
        fontSize: 10,
        textAlign: 'center',
        marginTop: 5,
    },
});
