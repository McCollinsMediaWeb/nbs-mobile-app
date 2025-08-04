// import { COLORS, images } from '@/constants';
// import { useTheme } from '@/theme/ThemeProvider';
// import { Feather } from '@expo/vector-icons';
// import { NavigationProp } from '@react-navigation/native';
// import { useNavigation } from 'expo-router';
// import i18next from 'i18next';
// import React, {
//     forwardRef,
//     useImperativeHandle,
//     useRef,
//     useState,
// } from 'react';
// import {
//     Dimensions,
//     Modal,
//     StyleSheet,
//     Text,
//     TouchableOpacity,
//     View
// } from 'react-native';
// import RBSheet from 'react-native-raw-bottom-sheet';

// const { width, height } = Dimensions.get('window');

// const HamburgerDrawer = forwardRef<any>((_, ref) => {
//     const navigation = useNavigation<NavigationProp<any>>();
//     const internalRef = useRef<any>(null);
//     const { dark } = useTheme();
//     const { t } = i18next;
//     const [isOpen, setIsOpen] = useState(false);

//     useImperativeHandle(ref, () => ({
//         open: () => {
//             setIsOpen(true);
//             internalRef.current?.open();
//         },
//         close: () => {
//             setIsOpen(false);
//             internalRef.current?.close();
//         },
//     }));

//     // Handle closing the sheet and overlay
//     const handleClose = () => {
//         setIsOpen(false);
//         internalRef.current?.close();
//     };

//     return (
//         <View style={{ flex: 1 }}>
//             <RBSheet
//                 ref={internalRef}
//                 closeOnPressMask={false} // We handle mask closing ourselves
//                 height={600}
//                 openDuration={250}
//                 customStyles={{
//                     wrapper: {
//                         backgroundColor: 'rgba(0,0,0,0.4)',
//                     },
//                     container: {
//                         width: '70%',
//                         height: '100%',
//                         position: 'absolute',
//                         left: 0,
//                     },
//                 }}
//                 onClose={() => setIsOpen(false)}
//                 onOpen={() => setIsOpen(true)}
//             >
//                 <View style={[styles.container, { backgroundColor: dark ? COLORS.dark1 : COLORS.white }]}>
//                     <TouchableOpacity
//                         onPress={handleClose}
//                     >
//                         <Feather style={styles.closeBtn} size={23} name='x' />
//                     </TouchableOpacity>

//                     <TouchableOpacity onPress={() => {
//                         handleClose();
//                         setTimeout(() => navigation.goBack(), 200);
//                     }}>
//                         <Text style={[styles.menuItem, { color: dark ? COLORS.white : "" }]}>{t('hamburgerMenu.home')}</Text>
//                     </TouchableOpacity>
//                     <View style={styles.divider} />

//                     <TouchableOpacity onPress={() => {
//                         handleClose();
//                         setTimeout(() => navigation.navigate("aboutus"), 200);
//                     }}>
//                         <Text style={[styles.menuItem, { color: dark ? COLORS.white : "" }]}>{t('hamburgerMenu.aboutUs')}</Text>
//                     </TouchableOpacity>
//                     <View style={styles.divider} />

//                     <TouchableOpacity onPress={() => {
//                         handleClose();
//                         setTimeout(() => navigation.navigate("allproducts"), 200);
//                     }}>
//                         <Text style={[styles.menuItem, { color: dark ? COLORS.white : "" }]}>{t('hamburgerMenu.allProducts')}</Text>
//                     </TouchableOpacity>
//                     <View style={styles.divider} />

//                     <TouchableOpacity onPress={() => {
//                         handleClose();
//                         setTimeout(() => navigation.navigate("collectionscreen", { collectionId: "gid://shopify/Collection/439668539604", collectionTitle: "Best Sellers", collectionImage: images.aboutUsBanner3 }), 200);
//                     }}>
//                         <Text style={[styles.menuItem, { color: dark ? COLORS.white : "" }]}>{t('hamburgerMenu.bestSellers')}</Text>
//                     </TouchableOpacity>
//                     <View style={styles.divider} />

//                     <TouchableOpacity onPress={() => {
//                         handleClose();
//                         setTimeout(() => navigation.navigate("collectionscreen", { collectionId: "gid://shopify/Collection/439668572372", collectionTitle: "New Arrivals", collectionImage: images.aboutUsBanner1 }), 200);
//                     }}>
//                         <Text style={[styles.menuItem, { color: dark ? COLORS.white : "" }]}>{t('hamburgerMenu.newArrivals')}</Text>
//                     </TouchableOpacity>
//                     <View style={styles.divider} />

//                     <TouchableOpacity onPress={() => {
//                         handleClose();
//                         // Optionally add logic to download the catalog here
//                     }}>
//                         <Text style={[styles.menuItem, { color: dark ? COLORS.white : "" }]}>{t('hamburgerMenu.downloadCatalogue')}</Text>
//                     </TouchableOpacity>
//                 </View>
//             </RBSheet>

//             {/* Overlay using Modal */}
//             <Modal
//                 visible={isOpen}
//                 transparent
//                 animationType="none"
//                 onRequestClose={handleClose}
//                 statusBarTranslucent={true}
//             >
//                 <TouchableOpacity
//                     activeOpacity={1}
//                     style={{
//                         position: 'absolute',
//                         right: 0,
//                         top: 0,
//                         width: width * 0.3,
//                         height: height,
//                         backgroundColor: 'transparent',
//                         zIndex: 1000,
//                     }}
//                     onPress={handleClose}
//                 />
//             </Modal>
//         </View>
//     );
// });

// export default HamburgerDrawer;

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         padding: 20,
//     },
//     closeBtn: {
//         marginTop: 50,
//         marginBottom: 20,
//         // width: 38,
//         // height: 38
//     },
//     menuItem: {
//         fontSize: 18,
//         marginTop: 15,
//         marginBottom: 15,
//         fontWeight: '900',
//         lineHeight: 30,
//         textTransform: 'uppercase',
//         fontFamily: 'TomorrowBold',
//     },
//     divider: {
//         width: "100%",
//         backgroundColor: COLORS.grayscale400,
//         height: 1
//     },
//     menuSection: {
//         marginTop: 20,
//         fontWeight: 'bold',
//         fontSize: 14,
//         marginBottom: 10,
//     },
//     productGrid: {
//         flexDirection: 'row',
//         flexWrap: 'wrap',
//         gap: 10,
//     },
//     productItem: {
//         width: '30%',
//         alignItems: 'center',
//     },
//     productImage: {
//         width: 60,
//         height: 60,
//         resizeMode: 'contain',
//     },
//     productName: {
//         fontSize: 10,
//         textAlign: 'center',
//         marginTop: 5,
//     },
// });


// import { COLORS, images } from '@/constants';
// import { useTheme } from '@/theme/ThemeProvider';
// import { Feather } from '@expo/vector-icons';
// import { NavigationProp } from '@react-navigation/native';
// import { useNavigation } from 'expo-router';
// import i18next from 'i18next';
// import React, {
//     forwardRef,
//     useImperativeHandle,
//     useRef,
//     useState,
// } from 'react';
// import {
//     Dimensions,
//     StyleSheet,
//     Text,
//     TouchableOpacity,
//     View
// } from 'react-native';
// import RBSheet from 'react-native-raw-bottom-sheet';

// const { width, height } = Dimensions.get('window');

// const HamburgerDrawer = forwardRef<any>((_, ref) => {
//     const navigation = useNavigation<NavigationProp<any>>();
//     const internalRef = useRef<any>(null);
//     const { dark } = useTheme();
//     const { t } = i18next;
//     const [isOpen, setIsOpen] = useState(false);

//     useImperativeHandle(ref, () => ({
//         open: () => {
//             setIsOpen(true);
//             internalRef.current?.open();
//         },
//         close: () => {
//             setIsOpen(false);
//             internalRef.current?.close();
//         },
//     }));

//     // Handle closing the sheet and overlay
//     const handleClose = () => {
//         setIsOpen(false);
//         internalRef.current?.close();
//     };

//     return (
//         <View style={{ flex: 1 }}>
//             <RBSheet
//                 ref={internalRef}
//                 closeOnPressMask={false} // We handle mask closing ourselves
//                 height={600}
//                 openDuration={250}
//                 customStyles={{
//                     wrapper: {
//                         backgroundColor: 'rgba(0,0,0,0.4)',
//                     },
//                     container: {
//                         flexDirection: 'row',
//                         width: '100%',
//                         height: '100%',
//                         backgroundColor: 'transparent',
//                     },
//                 }}
//                 onClose={() => setIsOpen(false)}
//                 onOpen={() => setIsOpen(true)}
//             >
//                 {/* Left 70%: Drawer */}
//                 <View style={[styles.container, { width: width * 0.7, backgroundColor: dark ? COLORS.dark1 : COLORS.white }]}>
//                     {/* <TouchableOpacity
//                         onPress={handleClose}
//                     > */}
//                     <Feather style={styles.closeBtn} size={23} name='x' onPress={handleClose} />
//                     {/* </TouchableOpacity> */}

//                     <TouchableOpacity onPress={() => {
//                         handleClose();
//                         setTimeout(() => navigation.goBack(), 200);
//                     }}>
//                         <Text style={[styles.menuItem, { color: dark ? COLORS.white : "" }]}>{t('hamburgerMenu.home')}</Text>
//                     </TouchableOpacity>
//                     <View style={styles.divider} />

//                     <TouchableOpacity onPress={() => {
//                         handleClose();
//                         setTimeout(() => navigation.navigate("aboutus"), 200);
//                     }}>
//                         <Text style={[styles.menuItem, { color: dark ? COLORS.white : "" }]}>{t('hamburgerMenu.aboutUs')}</Text>
//                     </TouchableOpacity>
//                     <View style={styles.divider} />

//                     <TouchableOpacity onPress={() => {
//                         handleClose();
//                         setTimeout(() => navigation.navigate("allproducts"), 200);
//                     }}>
//                         <Text style={[styles.menuItem, { color: dark ? COLORS.white : "" }]}>{t('hamburgerMenu.allProducts')}</Text>
//                     </TouchableOpacity>
//                     <View style={styles.divider} />

//                     <TouchableOpacity onPress={() => {
//                         handleClose();
//                         setTimeout(() => navigation.navigate("collectionscreen", { collectionId: "gid://shopify/Collection/439668539604", collectionTitle: "Best Sellers", collectionImage: images.aboutUsBanner3 }), 200);
//                     }}>
//                         <Text style={[styles.menuItem, { color: dark ? COLORS.white : "" }]}>{t('hamburgerMenu.bestSellers')}</Text>
//                     </TouchableOpacity>
//                     <View style={styles.divider} />

//                     <TouchableOpacity onPress={() => {
//                         handleClose();
//                         setTimeout(() => navigation.navigate("collectionscreen", { collectionId: "gid://shopify/Collection/439668572372", collectionTitle: "New Arrivals", collectionImage: images.aboutUsBanner1 }), 200);
//                     }}>
//                         <Text style={[styles.menuItem, { color: dark ? COLORS.white : "" }]}>{t('hamburgerMenu.newArrivals')}</Text>
//                     </TouchableOpacity>
//                     <View style={styles.divider} />

//                     <TouchableOpacity onPress={() => {
//                         handleClose();
//                         // Optionally add logic to download the catalog here
//                     }}>
//                         <Text style={[styles.menuItem, { color: dark ? COLORS.white : "" }]}>{t('hamburgerMenu.downloadCatalogue')}</Text>
//                     </TouchableOpacity>
//                 </View>
//                 {/* Right 30%: Transparent touchable area */}
//                 <TouchableOpacity
//                     activeOpacity={1}
//                     style={{ width: width * 0.3, height: '100%' }}
//                     onPress={handleClose}
//                 />
//             </RBSheet>
//         </View>
//     );
// });

// export default HamburgerDrawer;

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         padding: 20,
//     },
//     closeBtn: {
//         marginTop: 50,
//         marginBottom: 20,
//     },
//     menuItem: {
//         fontSize: 18,
//         marginTop: 15,
//         marginBottom: 15,
//         fontWeight: '900',
//         lineHeight: 30,
//         textTransform: 'uppercase',
//         fontFamily: 'TomorrowBold',
//     },
//     divider: {
//         width: "100%",
//         backgroundColor: COLORS.grayscale400,
//         height: 1
//     },
//     menuSection: {
//         marginTop: 20,
//         fontWeight: 'bold',
//         fontSize: 14,
//         marginBottom: 10,
//     },
//     productGrid: {
//         flexDirection: 'row',
//         flexWrap: 'wrap',
//         gap: 10,
//     },
//     productItem: {
//         width: '30%',
//         alignItems: 'center',
//     },
//     productImage: {
//         width: 60,
//         height: 60,
//         resizeMode: 'contain',
//     },
//     productName: {
//         fontSize: 10,
//         textAlign: 'center',
//         marginTop: 5,
//     },
// });


import { COLORS, images } from '@/constants';
import { useTheme } from '@/theme/ThemeProvider';
import { Feather } from '@expo/vector-icons';
import { NavigationProp } from '@react-navigation/native';
import { useNavigation } from 'expo-router';
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
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';
import RBSheet from 'react-native-raw-bottom-sheet';

const { width, height } = Dimensions.get('window');

const HamburgerDrawer = forwardRef<any>((_, ref) => {
    const navigation = useNavigation<NavigationProp<any>>();
    const internalRef = useRef<any>(null);
    const { dark } = useTheme();
    const { t } = i18next;
    const [isOpen, setIsOpen] = useState(false);

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

                    <TouchableOpacity onPress={() => {
                        handleClose();
                        setTimeout(() => navigation.goBack(), 200);
                        // setTimeout(() => router.push("/"), 200);
                    }}>
                        <Text style={[styles.menuItem, { color: dark ? COLORS.white : "" }]}>{t('hamburgerMenu.home')}</Text>
                    </TouchableOpacity>
                    <View style={styles.divider} />

                    <TouchableOpacity onPress={() => {
                        handleClose();
                        setTimeout(() => navigation.navigate("aboutus"), 200);
                    }}>
                        <Text style={[styles.menuItem, { color: dark ? COLORS.white : "" }]}>{t('hamburgerMenu.aboutUs')}</Text>
                    </TouchableOpacity>
                    <View style={styles.divider} />

                    <TouchableOpacity onPress={() => {
                        handleClose();
                        setTimeout(() => navigation.navigate("allproducts"), 200);
                    }}>
                        <Text style={[styles.menuItem, { color: dark ? COLORS.white : "" }]}>{t('hamburgerMenu.allProducts')}</Text>
                    </TouchableOpacity>
                    <View style={styles.divider} />

                    <TouchableOpacity onPress={() => {
                        handleClose();
                        setTimeout(() => navigation.navigate("collectionscreen", { collectionId: "gid://shopify/Collection/439668539604", collectionTitle: "Best Sellers", collectionImage: images.aboutUsBanner3 }), 200);
                    }}>
                        <Text style={[styles.menuItem, { color: dark ? COLORS.white : "" }]}>{t('hamburgerMenu.bestSellers')}</Text>
                    </TouchableOpacity>
                    <View style={styles.divider} />

                    <TouchableOpacity onPress={() => {
                        handleClose();
                        setTimeout(() => navigation.navigate("collectionscreen", { collectionId: "gid://shopify/Collection/439668572372", collectionTitle: "New Arrivals", collectionImage: images.aboutUsBanner1 }), 200);
                    }}>
                        <Text style={[styles.menuItem, { color: dark ? COLORS.white : "" }]}>{t('hamburgerMenu.newArrivals')}</Text>
                    </TouchableOpacity>
                    <View style={styles.divider} />

                    <TouchableOpacity onPress={() => {
                        handleClose();
                        // Optionally add logic to download the catalog here
                        // setTimeout(() => navigation.navigate("profile"), 200);
                    }}>
                        <Text style={[styles.menuItem, { color: dark ? COLORS.white : "" }]}>{t('hamburgerMenu.downloadCatalogue')}</Text>
                    </TouchableOpacity>
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