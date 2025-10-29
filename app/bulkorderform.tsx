// import { useAppSelector } from '@/hooks/useAppSelector';
// import { normalizeFont } from '@/utils/normalizeFont';
// import { NavigationProp } from '@react-navigation/native';
// import { router, useNavigation } from 'expo-router';
// import i18next from 'i18next';
// import React, { useRef, useState } from 'react';
// import {
//     ActivityIndicator,
//     Alert,
//     Dimensions,
//     Image,
//     KeyboardAvoidingView,
//     Platform,
//     StyleSheet,
//     Text,
//     TextInput,
//     TouchableOpacity,
//     View
// } from 'react-native';
// import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
// import { ScrollView } from 'react-native-virtualized-view';
// import { COLORS, icons, images, SIZES } from '../constants';
// import { useTheme } from '../theme/ThemeProvider';

// const { width } = Dimensions.get('window');

// interface BulkOrderFormData {
//     name: string;
//     email: string;
//     phone: string;
//     company: string;
//     trn: string;
//     subject: string;
//     details: string;
//     quantity: string;
//     deliveryDate: string;
// }

// const BulkOrderForm = () => {
//     const navigation = useNavigation<NavigationProp<any>>();
//     const { colors, dark } = useTheme();
//     const { t } = i18next;

//     const drawerRef = useRef<any>(null);
//     const cartItems = useAppSelector(state => state.cart.cartItems);
//     const wishlistItems = useAppSelector(state => state.wishlist.wishlistItems);
//     const insets = useSafeAreaInsets();

//     const [formData, setFormData] = useState<BulkOrderFormData>({
//         name: '',
//         email: '',
//         phone: '',
//         company: '',
//         trn: '',
//         subject: '',
//         details: '',
//         quantity: '',
//         deliveryDate: '',
//     });
//     const [loading, setLoading] = useState(false);

//     const totalCartItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

//     const handleInputChange = (field: keyof BulkOrderFormData, value: string) => {
//         setFormData(prev => ({
//             ...prev,
//             [field]: value,
//         }));
//     };

//     const validateForm = (): boolean => {
//         if (!formData.name.trim()) {
//             Alert.alert('Validation Error', 'Please enter your name');
//             return false;
//         }
//         if (!formData.email.trim() || !formData.email.includes('@')) {
//             Alert.alert('Validation Error', 'Please enter a valid email');
//             return false;
//         }
//         if (!formData.phone.trim()) {
//             Alert.alert('Validation Error', 'Please enter your phone number');
//             return false;
//         }
//         if (!formData.company.trim()) {
//             Alert.alert('Validation Error', 'Please enter your company name');
//             return false;
//         }
//         if (!formData.quantity.trim()) {
//             Alert.alert('Validation Error', 'Please enter quantity');
//             return false;
//         }
//         if (isNaN(Number(formData.quantity)) || Number(formData.quantity) <= 0) {
//             Alert.alert('Validation Error', 'Please enter a valid quantity');
//             return false;
//         }
//         if (!formData.subject.trim()) {
//             Alert.alert('Validation Error', 'Please enter a subject');
//             return false;
//         }
//         if (!formData.details.trim()) {
//             Alert.alert('Validation Error', 'Please enter additional details');
//             return false;
//         }
//         return true;
//     };

//     const handleSubmit = async () => {
//         if (!validateForm()) return;

//         setLoading(true);
//         try {
//             const payload = {
//                 name: formData.name,
//                 email: formData.email,
//                 phone: formData.phone,
//                 company: formData.company,
//                 subject: formData.subject,
//                 trnNumber: formData.trn,
//                 message: formData.details,
//                 quantity: Number(formData.quantity),
//                 deliveryDate: formData.deliveryDate,
//                 formType: 'bulk-order',
//             };

//             const response = await fetch('https://nbs-server.vercel.app/api/bulk-order-form-submitted', {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json',
//                 },
//                 body: JSON.stringify(payload),
//             });

//             if (response.ok) {
//                 Alert.alert('Success', 'Bulk order request submitted successfully');
//                 resetForm();
//                 navigation.goBack();
//             } else {
//                 Alert.alert('Error', 'Failed to submit bulk order request');
//             }
//         } catch (error) {
//             Alert.alert('Error', 'An error occurred while submitting the form');
//             console.error(error);
//         } finally {
//             setLoading(false);
//         }
//     };

//     const resetForm = () => {
//         setFormData({
//             name: '',
//             email: '',
//             phone: '',
//             company: '',
//             trn: '',
//             subject: '',
//             details: '',
//             quantity: '',
//             deliveryDate: '',
//         });
//     };

//     const renderHeader = () => {
//         return (
//             <>
//                 <View
//                     style={{
//                         backgroundColor: 'rgb(177, 18, 22)',
//                         alignItems: 'center',
//                         paddingTop: 5,
//                         paddingBottom: 5,
//                     }}
//                 >
//                     <Text
//                         style={{
//                             textAlign: 'center',
//                             color: 'white',
//                             fontSize: normalizeFont(14),
//                             maxWidth: 350,
//                             fontFamily: 'RubikRegular',
//                         }}
//                     >
//                         {t('aboutUs.announcement')}
//                     </Text>
//                 </View>
//                 <View style={styles.headerContainer}>
//                     <View style={{ flexDirection: 'row', alignItems: 'center', gap: 20 }}>
//                         <TouchableOpacity onPress={() => drawerRef.current.open()}>
//                             <Image
//                                 source={images.menu}
//                                 resizeMode="contain"
//                                 style={[styles.userIcon, { tintColor: dark ? COLORS.white : COLORS.greyscale900 }]}
//                             />
//                         </TouchableOpacity>
//                         <TouchableOpacity onPress={() => navigation.navigate('search')}>
//                             <Image
//                                 source={icons.search3}
//                                 resizeMode="contain"
//                                 style={[styles.userIcon, { tintColor: dark ? COLORS.white : COLORS.greyscale900 }]}
//                             />
//                         </TouchableOpacity>
//                     </View>
//                     <View>
//                         <Image
//                             source={images.nbsLogo2}
//                             resizeMode="contain"
//                             style={styles.nbsLogo}
//                         />
//                     </View>
//                     <View style={{ flexDirection: 'row', alignItems: 'center', gap: 20 }}>
//                         <TouchableOpacity onPress={() => navigation.navigate('mywishlist')}>
//                             <Image
//                                 source={icons.heartOutline}
//                                 resizeMode="contain"
//                                 style={[styles.userIcon, { tintColor: dark ? COLORS.white : COLORS.greyscale900 }]}
//                             />
//                             <View
//                                 style={{
//                                     position: 'absolute',
//                                     top: -4,
//                                     right: -4,
//                                     backgroundColor: 'rgb(177, 18, 22)',
//                                     borderRadius: 10,
//                                     minWidth: 18,
//                                     height: 18,
//                                     justifyContent: 'center',
//                                     alignItems: 'center',
//                                     paddingHorizontal: 4,
//                                     zIndex: 1,
//                                 }}
//                             >
//                                 <Text style={{ color: 'white', fontSize: 10, fontWeight: 'bold' }}>
//                                     {wishlistItems?.length}
//                                 </Text>
//                             </View>
//                         </TouchableOpacity>
//                         <TouchableOpacity onPress={() => router.push('/cart')}>
//                             <Image
//                                 source={icons.bag3Outline}
//                                 resizeMode="contain"
//                                 style={[styles.userIcon, { tintColor: dark ? COLORS.white : COLORS.greyscale900 }]}
//                             />
//                             <View
//                                 style={{
//                                     position: 'absolute',
//                                     top: -4,
//                                     right: -4,
//                                     backgroundColor: 'rgb(177, 18, 22)',
//                                     borderRadius: 10,
//                                     minWidth: 18,
//                                     height: 18,
//                                     justifyContent: 'center',
//                                     alignItems: 'center',
//                                     paddingHorizontal: 4,
//                                     zIndex: 1,
//                                 }}
//                             >
//                                 <Text style={{ color: 'white', fontSize: 10, fontWeight: 'bold' }}>
//                                     {totalCartItems}
//                                 </Text>
//                             </View>
//                         </TouchableOpacity>
//                     </View>
//                 </View>
//             </>
//         );
//     };

//     const bgColor = dark ? '#1a1a1a' : '#ffffff';
//     const textColor = dark ? '#ffffff' : '#000000';
//     const inputBgColor = dark ? '#2a2a2a' : '#f5f5f5';
//     const borderColor = dark ? '#444444' : '#dddddd';

//     return (
//         <SafeAreaView style={[styles.area, { backgroundColor: colors.background }]}>
//             <KeyboardAvoidingView
//                 behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
//                 style={{ flex: 1 }}
//             >
//                 <View style={[styles.container, { backgroundColor: colors.background }]}>
//                     {renderHeader()}
//                     {/* Form Title */}
//                     <View style={{ paddingHorizontal: 16, paddingVertical: 16 }}>
//                         <Text
//                             style={{
//                                 fontSize: normalizeFont(22),
//                                 fontWeight: 'bold',
//                                 color: textColor,
//                                 textAlign: 'center',
//                                 marginVertical: 15,
//                                 textTransform: "uppercase"
//                             }}
//                         >
//                             Bulk Order Request
//                         </Text>
//                     </View>

//                     {/* Form Content */}
//                     <ScrollView
//                         style={{ flex: 1, paddingHorizontal: 16 }}
//                         showsVerticalScrollIndicator={false}
//                     >
//                         {/* Name */}
//                         <View style={{ marginBottom: 16 }}>
//                             <Text
//                                 style={{
//                                     marginBottom: 8,
//                                     fontWeight: '600',
//                                     color: textColor,
//                                 }}
//                             >
//                                 Name *
//                             </Text>
//                             <TextInput
//                                 style={{
//                                     backgroundColor: inputBgColor,
//                                     borderWidth: 1,
//                                     borderColor,
//                                     borderRadius: 8,
//                                     padding: 12,
//                                     color: textColor,
//                                 }}
//                                 placeholder="Enter your name"
//                                 placeholderTextColor={dark ? '#999999' : '#cccccc'}
//                                 value={formData.name}
//                                 onChangeText={v => handleInputChange('name', v)}
//                                 editable={!loading}
//                             />
//                         </View>

//                         {/* Email */}
//                         <View style={{ marginBottom: 16 }}>
//                             <Text
//                                 style={{
//                                     marginBottom: 8,
//                                     fontWeight: '600',
//                                     color: textColor,
//                                 }}
//                             >
//                                 Email *
//                             </Text>
//                             <TextInput
//                                 style={{
//                                     backgroundColor: inputBgColor,
//                                     borderWidth: 1,
//                                     borderColor,
//                                     borderRadius: 8,
//                                     padding: 12,
//                                     color: textColor,
//                                 }}
//                                 placeholder="Enter your email"
//                                 placeholderTextColor={dark ? '#999999' : '#cccccc'}
//                                 keyboardType="email-address"
//                                 value={formData.email}
//                                 onChangeText={v => handleInputChange('email', v)}
//                                 editable={!loading}
//                             />
//                         </View>

//                         {/* Phone Number */}
//                         <View style={{ marginBottom: 16 }}>
//                             <Text
//                                 style={{
//                                     marginBottom: 8,
//                                     fontWeight: '600',
//                                     color: textColor,
//                                 }}
//                             >
//                                 Phone Number *
//                             </Text>
//                             <TextInput
//                                 style={{
//                                     backgroundColor: inputBgColor,
//                                     borderWidth: 1,
//                                     borderColor,
//                                     borderRadius: 8,
//                                     padding: 12,
//                                     color: textColor,
//                                 }}
//                                 placeholder="Enter your phone number"
//                                 placeholderTextColor={dark ? '#999999' : '#cccccc'}
//                                 keyboardType="phone-pad"
//                                 value={formData.phone}
//                                 onChangeText={v => handleInputChange('phone', v)}
//                                 editable={!loading}
//                             />
//                         </View>

//                         {/* Company Name */}
//                         <View style={{ marginBottom: 16 }}>
//                             <Text
//                                 style={{
//                                     marginBottom: 8,
//                                     fontWeight: '600',
//                                     color: textColor,
//                                 }}
//                             >
//                                 Company Name *
//                             </Text>
//                             <TextInput
//                                 style={{
//                                     backgroundColor: inputBgColor,
//                                     borderWidth: 1,
//                                     borderColor,
//                                     borderRadius: 8,
//                                     padding: 12,
//                                     color: textColor,
//                                 }}
//                                 placeholder="Enter your company name"
//                                 placeholderTextColor={dark ? '#999999' : '#cccccc'}
//                                 value={formData.company}
//                                 onChangeText={v => handleInputChange('company', v)}
//                                 editable={!loading}
//                             />
//                         </View>

//                         {/* TRN Number (Optional) */}
//                         <View style={{ marginBottom: 16 }}>
//                             <Text
//                                 style={{
//                                     marginBottom: 8,
//                                     fontWeight: '600',
//                                     color: textColor,
//                                 }}
//                             >
//                                 TRN Number
//                                 <Text style={{ fontWeight: '400', color: '#999999' }}>
//                                     {' '}(Optional)
//                                 </Text>
//                             </Text>
//                             <TextInput
//                                 style={{
//                                     backgroundColor: inputBgColor,
//                                     borderWidth: 1,
//                                     borderColor,
//                                     borderRadius: 8,
//                                     padding: 12,
//                                     color: textColor,
//                                 }}
//                                 placeholder="Enter TRN number"
//                                 placeholderTextColor={dark ? '#999999' : '#cccccc'}
//                                 value={formData.trn}
//                                 onChangeText={v => handleInputChange('trn', v)}
//                                 editable={!loading}
//                             />
//                         </View>

//                         {/* Quantity */}
//                         <View style={{ marginBottom: 16 }}>
//                             <Text
//                                 style={{
//                                     marginBottom: 8,
//                                     fontWeight: '600',
//                                     color: textColor,
//                                 }}
//                             >
//                                 Quantity *
//                             </Text>
//                             <TextInput
//                                 style={{
//                                     backgroundColor: inputBgColor,
//                                     borderWidth: 1,
//                                     borderColor,
//                                     borderRadius: 8,
//                                     padding: 12,
//                                     color: textColor,
//                                 }}
//                                 placeholder="Enter quantity"
//                                 placeholderTextColor={dark ? '#999999' : '#cccccc'}
//                                 keyboardType="number-pad"
//                                 value={formData.quantity}
//                                 onChangeText={v => handleInputChange('quantity', v)}
//                                 editable={!loading}
//                             />
//                         </View>

//                         {/* Delivery Date (Optional) */}
//                         <View style={{ marginBottom: 16 }}>
//                             <Text
//                                 style={{
//                                     marginBottom: 8,
//                                     fontWeight: '600',
//                                     color: textColor,
//                                 }}
//                             >
//                                 Preferred Delivery Date
//                                 <Text style={{ fontWeight: '400', color: '#999999' }}>
//                                     {' '}(Optional)
//                                 </Text>
//                             </Text>
//                             <TextInput
//                                 style={{
//                                     backgroundColor: inputBgColor,
//                                     borderWidth: 1,
//                                     borderColor,
//                                     borderRadius: 8,
//                                     padding: 12,
//                                     color: textColor,
//                                 }}
//                                 placeholder="e.g., DD/MM/YYYY"
//                                 placeholderTextColor={dark ? '#999999' : '#cccccc'}
//                                 value={formData.deliveryDate}
//                                 onChangeText={v => handleInputChange('deliveryDate', v)}
//                                 editable={!loading}
//                             />
//                         </View>

//                         {/* Subject */}
//                         <View style={{ marginBottom: 16 }}>
//                             <Text
//                                 style={{
//                                     marginBottom: 8,
//                                     fontWeight: '600',
//                                     color: textColor,
//                                 }}
//                             >
//                                 Subject *
//                             </Text>
//                             <TextInput
//                                 style={{
//                                     backgroundColor: inputBgColor,
//                                     borderWidth: 1,
//                                     borderColor,
//                                     borderRadius: 8,
//                                     padding: 12,
//                                     color: textColor,
//                                 }}
//                                 placeholder="Enter subject"
//                                 placeholderTextColor={dark ? '#999999' : '#cccccc'}
//                                 value={formData.subject}
//                                 onChangeText={v => handleInputChange('subject', v)}
//                                 editable={!loading}
//                             />
//                         </View>

//                         {/* Additional Details */}
//                         <View style={{ marginBottom: 24 }}>
//                             <Text
//                                 style={{
//                                     marginBottom: 8,
//                                     fontWeight: '600',
//                                     color: textColor,
//                                 }}
//                             >
//                                 Additional Details *
//                             </Text>
//                             <TextInput
//                                 style={{
//                                     backgroundColor: inputBgColor,
//                                     borderWidth: 1,
//                                     borderColor,
//                                     borderRadius: 8,
//                                     padding: 12,
//                                     color: textColor,
//                                     minHeight: 120,
//                                     textAlignVertical: 'top',
//                                 }}
//                                 placeholder="Enter additional details (specifications, requirements, etc.)"
//                                 placeholderTextColor={dark ? '#999999' : '#cccccc'}
//                                 multiline
//                                 numberOfLines={6}
//                                 value={formData.details}
//                                 onChangeText={v => handleInputChange('details', v)}
//                                 editable={!loading}
//                             />
//                         </View>
//                     </ScrollView>
//                     {/* Footer Buttons */}
//                     <View
//                         style={{
//                             flexDirection: 'row',
//                             gap: 12,
//                             padding: 16,
//                             borderTopWidth: 1,
//                             borderTopColor: borderColor,
//                         }}
//                     >
//                         <TouchableOpacity
//                             onPress={() => navigation.goBack()}
//                             disabled={loading}
//                             style={{
//                                 flex: 1,
//                                 paddingVertical: 12,
//                                 borderRadius: 8,
//                                 backgroundColor: inputBgColor,
//                                 alignItems: 'center',
//                             }}
//                         >
//                             <Text
//                                 style={{
//                                     color: textColor,
//                                     fontWeight: '600',
//                                 }}
//                             >
//                                 Cancel
//                             </Text>
//                         </TouchableOpacity>

//                         <TouchableOpacity
//                             onPress={handleSubmit}
//                             disabled={loading}
//                             style={{
//                                 flex: 1,
//                                 paddingVertical: 12,
//                                 borderRadius: 8,
//                                 backgroundColor: '#E74C3C',
//                                 alignItems: 'center',
//                                 flexDirection: 'row',
//                                 justifyContent: 'center',
//                                 opacity: loading ? 0.7 : 1,
//                             }}
//                         >
//                             {loading && (
//                                 <ActivityIndicator
//                                     color="white"
//                                     style={{ marginRight: 8 }}
//                                 />
//                             )}
//                             <Text
//                                 style={{
//                                     color: 'white',
//                                     fontWeight: '600',
//                                 }}
//                             >
//                                 {loading ? 'Submitting...' : 'Submit Order'}
//                             </Text>
//                         </TouchableOpacity>
//                     </View>
//                 </View>
//             </KeyboardAvoidingView>
//             {/* <HamburgerDrawer ref={drawerRef} /> */}
//         </SafeAreaView>
//     );
// };

// const styles = StyleSheet.create({
//     area: {
//         flex: 1,
//         backgroundColor: COLORS.white,
//     },
//     container: {
//         flex: 1,
//         backgroundColor: COLORS.white,
//     },
//     headerContainer: {
//         flexDirection: 'row',
//         justifyContent: 'space-between',
//         alignItems: 'center',
//         paddingLeft: 16,
//         paddingBottom: 6,
//         paddingRight: 16,
//         borderBottomWidth: 0.4,
//     },
//     userIcon: {
//         width: width * 0.06,
//         height: 38,
//     },
//     nbsLogo: {
//         width: width * 0.25,
//         height: 68,
//         borderRadius: 32,
//     },

//     cartBottomContainer: {
//         position: "absolute",
//         bottom: 0,
//         left: 0,
//         right: 0,
//         width: SIZES.width,
//         flexDirection: "row",
//         justifyContent: "space-between",
//         alignItems: "center",
//         height: 108,
//         backgroundColor: COLORS.white,
//         paddingHorizontal: 16,
//         paddingVertical: 16,
//         borderTopColor: COLORS.white,
//         borderTopWidth: 1,
//     },
// });

// export default BulkOrderForm;





import HamburgerDrawer from '@/components/HamburgerDrawer';
import { COLORS, icons, images, SIZES } from '@/constants';
import { useAppSelector } from '@/hooks/useAppSelector';
import { useTheme } from '@/theme/ThemeProvider';
import { normalizeFont } from '@/utils/normalizeFont';
import { NavigationProp } from '@react-navigation/native';
import { router, useNavigation } from 'expo-router';
import i18next from 'i18next';
import React, { useRef, useState } from 'react';
import { ActivityIndicator, Alert, Dimensions, Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { ScrollView } from 'react-native-virtualized-view';

const { width } = Dimensions.get('window');

interface BulkOrderFormData {
    name: string;
    email: string;
    phone: string;
    company: string;
    trn: string;
    subject: string;
    details: string;
}

const BulkOrderForm = () => {
    const navigation = useNavigation<NavigationProp<any>>();
    const { dark, colors } = useTheme();
    // const { t } = useTranslation();
    const { t } = i18next;
    const drawerRef = useRef<any>(null);
    const insets = useSafeAreaInsets();
    const cartItems = useAppSelector(state => state.cart.cartItems);
    const wishlistItems = useAppSelector(state => state.wishlist.wishlistItems);

    const [formData, setFormData] = useState<BulkOrderFormData>({
        name: '',
        email: '',
        phone: '',
        company: '',
        trn: '',
        subject: '',
        details: '',
    });
    const [loading, setLoading] = useState(false);

    const totalCartItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

    const handleInputChange = (field: keyof BulkOrderFormData, value: string) => {
        setFormData(prev => ({
            ...prev,
            [field]: value,
        }));
    };

    const validateForm = (): boolean => {
        if (!formData.name.trim()) {
            Alert.alert('Validation Error', 'Please enter your name');
            return false;
        }
        if (!formData.email.trim() || !formData.email.includes('@')) {
            Alert.alert('Validation Error', 'Please enter a valid email');
            return false;
        }
        if (!formData.phone.trim()) {
            Alert.alert('Validation Error', 'Please enter your phone number');
            return false;
        }
        return true;
    };

    const handleSubmit = async () => {
        if (!validateForm()) return;

        setLoading(true);
        try {
            const payload = {
                name: formData.name,
                email: formData.email,
                phone: formData.phone,
                company: formData.company,
                subject: formData.subject,
                trnNumber: formData.trn,
                message: formData.details,
                formType: 'bulk-order',
            };

            const response = await fetch('https://nbs-server.vercel.app/api/bulk-order-form-submitted', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload),
            });

            if (response.ok) {
                Alert.alert('Success', 'Bulk order request submitted successfully');
                resetForm();
                navigation.goBack();
            } else {
                Alert.alert('Error', 'Failed to submit bulk order request');
            }
        } catch (error) {
            Alert.alert('Error', 'An error occurred while submitting the form');
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const resetForm = () => {
        setFormData({
            name: '',
            email: '',
            phone: '',
            company: '',
            trn: '',
            subject: '',
            details: '',
        });
    };
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

    const bgColor = dark ? '#1a1a1a' : '#ffffff';
    const textColor = dark ? '#ffffff' : '#000000';
    const inputBgColor = dark ? '#2a2a2a' : '#f5f5f5';
    const borderColor = dark ? '#444444' : '#dddddd';

    return (
        <SafeAreaView style={[styles.area, { backgroundColor: dark ? COLORS.dark1 : COLORS.white }]}>
            <View style={[styles.container, { backgroundColor: colors.background }]}>
                {renderHeader()}
                <ScrollView showsVerticalScrollIndicator={true} style={{ marginBottom: 40, paddingHorizontal: 16 }}>
                    <View style={{ paddingHorizontal: 16, paddingVertical: 16 }}>
                        <Text
                            style={{
                                fontSize: normalizeFont(22),
                                fontWeight: 'bold',
                                color: textColor,
                                textAlign: 'center',
                                marginVertical: 15,
                                textTransform: "uppercase"
                            }}
                        >
                            Bulk Order Request
                        </Text>
                    </View>


                    <View style={{ marginBottom: 16 }}>
                        <Text
                            style={[styles.fonts, { marginBottom: 8, color: textColor }]}
                        >
                            Name *
                        </Text>
                        <TextInput
                            style={{
                                backgroundColor: inputBgColor,
                                borderWidth: 1,
                                borderColor,
                                borderRadius: 8,
                                padding: 12,
                                color: textColor,
                            }}
                            placeholder="Enter your name"
                            placeholderTextColor={dark ? '#999999' : '#cccccc'}
                            value={formData.name}
                            onChangeText={v => handleInputChange('name', v)}
                            editable={!loading}
                        />
                    </View>

                    {/* Email */}
                    <View style={{ marginBottom: 16 }}>
                        <Text
                            style={[styles.fonts, { marginBottom: 8, color: textColor }]}
                        >
                            Email *
                        </Text>
                        <TextInput
                            style={{
                                backgroundColor: inputBgColor,
                                borderWidth: 1,
                                borderColor,
                                borderRadius: 8,
                                padding: 12,
                                color: textColor,
                            }}
                            placeholder="Enter your email"
                            placeholderTextColor={dark ? '#999999' : '#cccccc'}
                            keyboardType="email-address"
                            value={formData.email}
                            onChangeText={v => handleInputChange('email', v)}
                            editable={!loading}
                        />
                    </View>

                    {/* Phone Number */}
                    <View style={{ marginBottom: 16 }}>
                        <Text
                            style={[styles.fonts, { marginBottom: 8, color: textColor }]}
                        >
                            Phone Number *
                        </Text>
                        <TextInput
                            style={{
                                backgroundColor: inputBgColor,
                                borderWidth: 1,
                                borderColor,
                                borderRadius: 8,
                                padding: 12,
                                color: textColor,
                            }}
                            placeholder="Enter your phone number"
                            placeholderTextColor={dark ? '#999999' : '#cccccc'}
                            keyboardType="phone-pad"
                            value={formData.phone}
                            onChangeText={v => handleInputChange('phone', v)}
                            editable={!loading}
                        />
                    </View>

                    {/* Company Name */}
                    <View style={{ marginBottom: 16 }}>
                        <Text
                            style={[styles.fonts, { marginBottom: 8, color: textColor }]}
                        >
                            Company Name
                        </Text>
                        <TextInput
                            style={{
                                backgroundColor: inputBgColor,
                                borderWidth: 1,
                                borderColor,
                                borderRadius: 8,
                                padding: 12,
                                color: textColor,
                            }}
                            placeholder="Enter your company name"
                            placeholderTextColor={dark ? '#999999' : '#cccccc'}
                            value={formData.company}
                            onChangeText={v => handleInputChange('company', v)}
                            editable={!loading}
                        />
                    </View>

                    {/* TRN Number (Optional) */}
                    <View style={{ marginBottom: 16 }}>
                        <Text
                            style={[styles.fonts, { marginBottom: 8, color: textColor }]}
                        >
                            TRN Number
                            <Text style={{ fontWeight: '400', color: '#999999' }}>
                                {' '}(Optional)
                            </Text>
                        </Text>
                        <TextInput
                            style={{
                                backgroundColor: inputBgColor,
                                borderWidth: 1,
                                borderColor,
                                borderRadius: 8,
                                padding: 12,
                                color: textColor,
                            }}
                            placeholder="Enter your 15-digit TRN number"
                            placeholderTextColor={dark ? '#999999' : '#cccccc'}
                            value={formData.trn}
                            onChangeText={v => handleInputChange('trn', v)}
                            editable={!loading}
                        />
                    </View>

                    {/* Subject */}
                    <View style={{ marginBottom: 16 }}>
                        <Text
                            style={[styles.fonts, { marginBottom: 8, color: textColor }]}
                        >
                            Subject
                        </Text>
                        <TextInput
                            style={{
                                backgroundColor: inputBgColor,
                                borderWidth: 1,
                                borderColor,
                                borderRadius: 8,
                                padding: 12,
                                color: textColor,
                            }}
                            placeholder="Enter subject"
                            placeholderTextColor={dark ? '#999999' : '#cccccc'}
                            value={formData.subject}
                            onChangeText={v => handleInputChange('subject', v)}
                            editable={!loading}
                        />
                    </View>

                    {/* Additional Details */}
                    <View style={{ marginBottom: 24 }}>
                        <Text
                            style={[styles.fonts, { marginBottom: 8, color: textColor }]}
                        >
                            Additional Details
                        </Text>
                        <TextInput
                            style={{
                                backgroundColor: inputBgColor,
                                borderWidth: 1,
                                borderColor,
                                borderRadius: 8,
                                padding: 12,
                                color: textColor,
                                minHeight: 120,
                                textAlignVertical: 'top',
                            }}
                            placeholder="Enter additional details (specifications, requirements, etc.)"
                            placeholderTextColor={dark ? '#999999' : '#cccccc'}
                            multiline
                            numberOfLines={6}
                            value={formData.details}
                            onChangeText={v => handleInputChange('details', v)}
                            editable={!loading}
                        />
                    </View>
                </ScrollView>
                <View style={[styles.cartBottomContainer, {
                    // backgroundColor: dark ? COLORS.dark1 : COLORS.white,
                    // borderTopColor: dark ? COLORS.dark1 : COLORS.white,
                    bottom: insets.bottom
                }]}>
                    <TouchableOpacity
                        onPress={handleSubmit}
                        disabled={loading}
                        style={[styles.cartBtn, {
                            backgroundColor: COLORS.primaryRed
                        }]}
                    >
                        {loading && (
                            <ActivityIndicator
                                color="white"
                                style={{ marginRight: 8 }}
                            />
                        )}
                        <Text
                            style={{
                                color: 'white',
                                fontWeight: '600',
                                fontSize: normalizeFont(16),
                            }}
                        >
                            {loading ? 'Submitting...' : 'Submit Bulk Order'}
                        </Text>
                    </TouchableOpacity>
                </View>
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
    fonts: {
        fontSize: normalizeFont(16),
        fontWeight: "700",
        color: COLORS.greyscale900,
    },

    cartBtn: {
        height: 58,
        width: width - 32,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 32,
        backgroundColor: COLORS.black,
        flexDirection: "row",
        marginBottom: 40,
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
        borderTopColor: COLORS.white,
        borderTopWidth: 1,
    },

})

export default BulkOrderForm