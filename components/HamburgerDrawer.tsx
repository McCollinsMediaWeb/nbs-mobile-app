import { COLORS } from '@/constants';
import { useTheme } from '@/theme/ThemeProvider';
import { Feather } from '@expo/vector-icons';
import { NavigationProp } from '@react-navigation/native';
import { router, useNavigation } from 'expo-router';
import i18next from 'i18next';
import React, {
    forwardRef,
    useEffect,
    useImperativeHandle,
    useRef,
    useState,
} from 'react';
import {
    Animated,
    Dimensions,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';
import RBSheet from 'react-native-raw-bottom-sheet';
import { useMenuData } from '../data';

const { width, height } = Dimensions.get('window');

const HamburgerDrawer = forwardRef<any>((_, ref) => {
    const navigation = useNavigation<NavigationProp<any>>();
    const internalRef = useRef<any>(null);
    const { dark } = useTheme();
    const { t } = i18next;
    const [isOpen, setIsOpen] = useState(false);
    const menuData = useMenuData();

    // Animated value for horizontal slide
    const translateX = useRef(new Animated.Value(-width * 0.7)).current;

    useImperativeHandle(ref, () => ({
        open: () => {
            setIsOpen(true);
            internalRef.current?.open();
        },
        close: () => {
            setIsOpen(false);
            internalRef.current?.close();
        },
    }));

    // Animate in/out when open/close
    useEffect(() => {
        if (isOpen) {
            Animated.timing(translateX, {
                toValue: 0,
                duration: 300,
                useNativeDriver: true,
            }).start();
        } else {
            Animated.timing(translateX, {
                toValue: -width * 0.7,
                duration: 300,
                useNativeDriver: true,
            }).start();
        }
    }, [isOpen]);

    const handleClose = () => {
        setIsOpen(false);
        internalRef.current?.close();
    };



    // const menuData = [
    //     { title: t('hamburgerMenu.home'), route: "/" },
    //     { title: t('hamburgerMenu.aboutUs'), route: "aboutus" },
    //     {
    //         title: t('hamburgerMenu.allProducts'),
    //         children: [
    //             {
    //                 title: "Category 1",
    //                 children: [
    //                     {
    //                         title: "SubCategory A",
    //                         children: [
    //                             { title: "Deep Item 1", route: "deepItem1" },
    //                             { title: "Deep Item 2", route: "deepItem2" },
    //                         ],
    //                     },
    //                 ],
    //             },
    //             {
    //                 title: "Category 2",
    //                 children: [{ title: "SubCategory B", route: "subCategoryB" }],
    //             },
    //         ],
    //     },
    //     {
    //         title: t('hamburgerMenu.bestSellers'),
    //         route: "collectionscreen",
    //         params: {
    //             collectionId: "gid://shopify/Collection/439668539604",
    //             collectionTitle: "Best Sellers",
    //             collectionImage: images.aboutUsBanner3,
    //         },
    //     },
    //     {
    //         title: t('hamburgerMenu.newArrivals'),
    //         route: "collectionscreen",
    //         params: {
    //             collectionId: "gid://shopify/Collection/439668572372",
    //             collectionTitle: "New Arrivals",
    //             collectionImage: images.aboutUsBanner1,
    //         },
    //     },
    //     { title: t('hamburgerMenu.downloadCatalogue'), route: "catalogue" },
    // ];


    // Add this recursive MenuItem component INSIDE your HamburgerDrawer file
    interface MenuItemProps {
        item: any;
        dark: boolean;
        navigation: NavigationProp<any>;
        handleClose: () => void;
    }

    const MenuItem: React.FC<MenuItemProps> = ({ item, dark, navigation, handleClose }) => {
        const [expanded, setExpanded] = useState(false);

        const onPress = () => {
            if (item.children && item.children.length > 0) {
                setExpanded(!expanded);
            } else if (item.route) {
                handleClose();
                if (item.route === "/") {
                    // setTimeout(() => navigation.goBack(), 200)
                    // setTimeout(() => navigation.navigate('index'), 200)
                    setTimeout(() => {
                        router.replace("/(tabs)");
                    }, 200);
                    // setTimeout(() => navigation.navigate("allproducts", item.params || {}), 200)
                } else {
                    setTimeout(() => navigation.navigate(item.route, item.params || {}), 200)
                }

            }
        };

        return (
            <View>
                <TouchableOpacity onPress={onPress} style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                    <Text style={[styles.menuItem, { color: dark ? COLORS.white : "" }]}>
                        {item.title}
                    </Text>
                    {item.children && (
                        <Feather
                            name={expanded ? "minus" : "plus"}
                            size={18}
                            color={dark ? COLORS.white : "black"}
                        />
                    )}
                </TouchableOpacity>
                <View style={styles.divider} />
                {expanded && item.children && (
                    <View style={{ paddingLeft: 15 }}>
                        {item.children.map((child: unknown, index: React.Key | null | undefined) => (
                            <MenuItem
                                key={index}
                                item={child}
                                dark={dark}
                                navigation={navigation}
                                handleClose={handleClose}
                            />
                        ))}
                    </View>
                )}
            </View>
        );
    };

    return (
        <View style={{ flex: 1 }}>
            <RBSheet
                ref={internalRef}
                closeOnPressMask={false}
                height={600}
                openDuration={250}
                customStyles={{
                    wrapper: {
                        backgroundColor: 'rgba(0,0,0,0.4)',
                    },
                    container: {
                        flexDirection: 'row',
                        width: '100%',
                        height: '100%',
                        backgroundColor: 'transparent',
                    },
                }}
                onClose={() => setIsOpen(false)}
                onOpen={() => setIsOpen(true)}
            >
                {/* Animated Drawer */}
                <Animated.View
                    style={[
                        styles.container,
                        {
                            width: width * 0.7,
                            backgroundColor: dark ? COLORS.dark1 : COLORS.white,
                            transform: [{ translateX }],
                        },
                    ]}
                >
                    <TouchableOpacity
                        onPress={handleClose}
                    >
                        <Feather style={styles.closeBtn} color={dark ? "white" : "black"} size={23} name='x' />
                    </TouchableOpacity>


                    {/* {menuData.map((item, index) => (
                        <MenuItem
                            key={index}
                            item={item}
                            dark={dark}
                            navigation={navigation}
                            handleClose={handleClose}
                        />
                    ))} */}

                    <ScrollView
                        showsVerticalScrollIndicator={false}
                        contentContainerStyle={{ paddingBottom: 50 }}
                    >
                        {/* <TouchableOpacity onPress={handleClose}>
                            <Feather
                                style={styles.closeBtn}
                                color={dark ? "white" : "black"}
                                size={23}
                                name="x"
                            />
                        </TouchableOpacity> */}

                        {menuData.map((item, index) => (
                            <MenuItem
                                key={index}
                                item={item}
                                dark={dark}
                                navigation={navigation}
                                handleClose={handleClose}
                            />
                        ))}
                    </ScrollView>

                </Animated.View>
                {/* Right 30%: Transparent touchable area */}
                <TouchableOpacity
                    activeOpacity={1}
                    style={{ width: width * 0.3, height: '100%' }}
                    onPress={handleClose}
                />
            </RBSheet>
        </View>
    );
});

export default HamburgerDrawer;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    closeBtn: {
        marginTop: 50,
        marginBottom: 20,
    },
    menuItem: {
        fontSize: 18,
        marginTop: 15,
        marginBottom: 15,
        fontWeight: '900',
        lineHeight: 30,
        textTransform: 'uppercase',
        fontFamily: 'TomorrowBold',
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