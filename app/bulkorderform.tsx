// import HamburgerDrawer from '@/components/HamburgerDrawer';
// import { COLORS, icons, images, SIZES } from '@/constants';
// import { useAppSelector } from '@/hooks/useAppSelector';
// import { useTheme } from '@/theme/ThemeProvider';
// import { normalizeFont } from '@/utils/normalizeFont';
// import { NavigationProp } from '@react-navigation/native';
// import { router, useNavigation } from 'expo-router';
// import i18next from 'i18next';
// import React, { useRef, useState } from 'react';
// import { ActivityIndicator, Alert, Dimensions, Image, KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
// import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';

// const { width } = Dimensions.get('window');

// interface BulkOrderFormData {
//     name: string;
//     email: string;
//     phone: string;
//     company: string;
//     trn: string;
//     subject: string;
//     details: string;
// }

// const BulkOrderForm = () => {
//     const navigation = useNavigation<NavigationProp<any>>();
//     const { dark, colors } = useTheme();
//     // const { t } = useTranslation();
//     const { t } = i18next;
//     const drawerRef = useRef<any>(null);
//     const insets = useSafeAreaInsets();
//     const cartItems = useAppSelector(state => state.cart.cartItems);
//     const wishlistItems = useAppSelector(state => state.wishlist.wishlistItems);

//     const [formData, setFormData] = useState<BulkOrderFormData>({
//         name: '',
//         email: '',
//         phone: '',
//         company: '',
//         trn: '',
//         subject: '',
//         details: '',
//     });
//     const [loading, setLoading] = useState(false);

//     const totalCartItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

//     // const handleInputChange = (field: keyof BulkOrderFormData, value: string) => {
//     //     setFormData(prev => ({
//     //         ...prev,
//     //         [field]: value,
//     //     }));
//     // };

//     const handleInputChange = (field: keyof BulkOrderFormData, value: string) => {
//         setFormData(prev => {
//             if (prev[field] === value) return prev; // avoid unnecessary re-render
//             return { ...prev, [field]: value };
//         });
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
//                 formType: 'bulk-order',
//             };

//             // const response = await fetch('https://nbs-server.vercel.app/api/bulk-order-form-submitted-mobile', {
//             const response = await fetch('http://localhost:3000/api/bulk-order-form-submitted-mobile', {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json',
//                     'x-api-key': 'nbs_super_secret_key_123',
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
//         });
//     };
//     /**
//     * Render header
//     */
//     const renderHeader = () => {
//         return (
//             <>
//                 <View
//                     style={{
//                         backgroundColor: "rgb(177, 18, 22)", alignItems: "center",
//                         paddingTop: 5,
//                         paddingBottom: 5
//                     }}
//                 >
//                     <Text
//                         style={{
//                             textAlign: "center",
//                             color: "white",
//                             fontSize: normalizeFont(14),
//                             maxWidth: 350,
//                             fontFamily: 'RubikRegular',
//                         }}
//                     >
//                         {t('aboutUs.announcement')}
//                     </Text>
//                 </View>
//                 <View style={styles.headerContainer}>
//                     <View style={{ flexDirection: "row", alignItems: "center", gap: 20 }}>
//                         <TouchableOpacity onPress={() => drawerRef.current.open()}>
//                             <Image
//                                 source={images.menu}
//                                 resizeMode='contain'
//                                 style={[styles.userIcon, { tintColor: dark ? COLORS.white : COLORS.greyscale900 }]}
//                             />
//                         </TouchableOpacity>
//                         <TouchableOpacity
//                             onPress={() => navigation.navigate("search")}>
//                             <Image
//                                 source={icons.search3}
//                                 resizeMode='contain'
//                                 style={[styles.userIcon, { tintColor: dark ? COLORS.white : COLORS.greyscale900 }]}
//                             />
//                         </TouchableOpacity>
//                     </View>
//                     <View>
//                         <Image
//                             source={images.nbsLogo3}
//                             resizeMode='contain'
//                             style={styles.nbsLogo}
//                         />
//                     </View>
//                     <View style={{ flexDirection: "row", alignItems: "center", gap: 20 }}>
//                         <TouchableOpacity
//                             onPress={() => navigation.navigate("mywishlist")}>
//                             <Image
//                                 source={icons.heartOutline}
//                                 resizeMode='contain'
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
//                         <TouchableOpacity
//                             onPress={() => router.push("/cart")}>
//                             <Image
//                                 source={icons.bag3Outline}
//                                 resizeMode='contain'
//                                 style={[styles.userIcon, { tintColor: dark ? COLORS.white : COLORS.greyscale900 }]}
//                             />
//                             {/* {totalCartItems > 0 && ( */}
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
//                             {/* )} */}
//                         </TouchableOpacity>
//                     </View>

//                 </View>
//             </>
//         )
//     }

//     const bgColor = dark ? '#1a1a1a' : '#ffffff';
//     const textColor = dark ? '#ffffff' : '#000000';
//     const inputBgColor = dark ? '#2a2a2a' : '#f5f5f5';
//     const borderColor = dark ? '#444444' : '#dddddd';

//     return (
//         <SafeAreaView style={[styles.area, { backgroundColor: dark ? COLORS.dark1 : COLORS.white }]}>
//             <View style={[styles.container, { backgroundColor: colors.background }]}>
//                 {renderHeader()}

//                 {/* Scrollable form */}
//                 <KeyboardAvoidingView
//                     behavior={Platform.OS === 'ios' ? 'padding' : undefined}
//                     // style={{ flex: 1 }}
//                     keyboardVerticalOffset={Platform.OS === 'ios' ? 100 : 0}
//                 >
//                     <ScrollView
//                         keyboardShouldPersistTaps="handled"
//                         showsVerticalScrollIndicator={true}
//                         contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 130 }}
//                     >
//                         <View style={{ paddingVertical: 16 }}>
//                             <Text
//                                 style={{
//                                     fontSize: normalizeFont(22),
//                                     fontWeight: 'bold',
//                                     color: dark ? COLORS.white : COLORS.black,
//                                     textAlign: 'center',
//                                     marginVertical: 15,
//                                     textTransform: "uppercase",
//                                 }}
//                             >
//                                 {t("bulkRequestForm.title")}
//                             </Text>
//                         </View>

//                         <View style={{ marginBottom: 16 }}>
//                             <Text
//                                 style={[styles.fonts, { marginBottom: 8, color: textColor }]}
//                             >
//                                 {t("bulkRequestForm.name")}
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
//                                 placeholder={t("bulkRequestForm.namePlaceholder")}
//                                 placeholderTextColor={dark ? '#999999' : '#cccccc'}
//                                 value={formData.name}
//                                 onChangeText={v => handleInputChange('name', v)}
//                                 editable={!loading}
//                             />
//                         </View>

//                         <View style={{ marginBottom: 16 }}>
//                             <Text
//                                 style={[styles.fonts, { marginBottom: 8, color: textColor }]}
//                             >
//                                 {t("bulkRequestForm.email")}
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
//                                 placeholder={t("bulkRequestForm.emailPlaceholder")}
//                                 placeholderTextColor={dark ? '#999999' : '#cccccc'}
//                                 keyboardType="email-address"
//                                 value={formData.email}
//                                 onChangeText={v => handleInputChange('email', v)}
//                                 editable={!loading}
//                             />
//                         </View>

//                         <View style={{ marginBottom: 16 }}>
//                             <Text
//                                 style={[styles.fonts, { marginBottom: 8, color: textColor }]}
//                             >
//                                 {t("bulkRequestForm.phoneNumber")}
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
//                                 placeholder={t("bulkRequestForm.phoneNumberPlaceholder")}
//                                 placeholderTextColor={dark ? '#999999' : '#cccccc'}
//                                 keyboardType="phone-pad"
//                                 value={formData.phone}
//                                 onChangeText={v => handleInputChange('phone', v)}
//                                 editable={!loading}
//                             />
//                         </View>

//                         <View style={{ marginBottom: 16 }}>
//                             <Text
//                                 style={[styles.fonts, { marginBottom: 8, color: textColor }]}
//                             >
//                                 {t("bulkRequestForm.companyName")}
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
//                                 placeholder={t("bulkRequestForm.companyNamePlaceholder")}
//                                 placeholderTextColor={dark ? '#999999' : '#cccccc'}
//                                 value={formData.company}
//                                 onChangeText={v => handleInputChange('company', v)}
//                                 editable={!loading}
//                             />
//                         </View>

//                         <View style={{ marginBottom: 16 }}>
//                             <Text
//                                 style={[styles.fonts, { marginBottom: 8, color: textColor }]}
//                             >
//                                 {t("bulkRequestForm.trnNumber")}
//                                 <Text style={{ fontWeight: '400', color: '#999999' }}>
//                                     {' '} {t("bulkRequestForm.trnNumber2")}
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
//                                 maxLength={15}
//                                 placeholder={t("bulkRequestForm.trnNumberPlaceholder")}
//                                 placeholderTextColor={dark ? '#999999' : '#cccccc'}
//                                 value={formData.trn}
//                                 onChangeText={v => handleInputChange('trn', v)}
//                                 editable={!loading}
//                             />
//                         </View>

//                         <View style={{ marginBottom: 16 }}>
//                             <Text
//                                 style={[styles.fonts, { marginBottom: 8, color: textColor }]}
//                             >
//                                 {t("bulkRequestForm.subject")}
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
//                                 placeholder={t("bulkRequestForm.subjectPlaceholder")}
//                                 placeholderTextColor={dark ? '#999999' : '#cccccc'}
//                                 value={formData.subject}
//                                 onChangeText={v => handleInputChange('subject', v)}
//                                 editable={!loading}
//                             />
//                         </View>

//                         <View style={{ marginBottom: 24 }}>
//                             <Text
//                                 style={[styles.fonts, { marginBottom: 8, color: textColor }]}
//                             >
//                                 {t("bulkRequestForm.additionalDetails")}
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
//                                 placeholder={t("bulkRequestForm.additionalDetailsPlaceholder")}
//                                 placeholderTextColor={dark ? '#999999' : '#cccccc'}
//                                 multiline
//                                 numberOfLines={6}
//                                 value={formData.details}
//                                 onChangeText={v => handleInputChange('details', v)}
//                                 editable={!loading}
//                             />
//                         </View>
//                     </ScrollView>
//                 </KeyboardAvoidingView>

//                 {/* Fixed bottom button */}
//                 <View
//                     style={[
//                         styles.cartBottomContainer,
//                         {
//                             backgroundColor: dark ? COLORS.dark2 : COLORS.white,
//                             borderTopColor: dark ? COLORS.dark2 : COLORS.white,
//                         },
//                     ]}
//                 >
//                     <TouchableOpacity
//                         onPress={handleSubmit}
//                         disabled={loading}
//                         style={[styles.cartBtn, { backgroundColor: COLORS.primaryRed }]}
//                     >
//                         {loading && <ActivityIndicator color="white" style={{ marginRight: 8 }} />}
//                         <Text
//                             style={{
//                                 color: 'white',
//                                 fontWeight: '600',
//                                 fontSize: normalizeFont(16),
//                             }}
//                         >
//                             {loading ? t("bulkRequestForm.submitting") : t("bulkRequestForm.submit")}
//                         </Text>
//                     </TouchableOpacity>
//                 </View>

//                 <HamburgerDrawer ref={drawerRef} />
//             </View>
//         </SafeAreaView>
//     );

// }

// const styles = StyleSheet.create({
//     area: {
//         flex: 1,
//     },
//     container: {
//         backgroundColor: COLORS.white,
//         paddingBottom: 80
//     },
//     headerContainer: {
//         flexDirection: "row",
//         justifyContent: "space-between",
//         alignItems: "center",
//         paddingLeft: 16,
//         paddingBottom: 6,
//         paddingRight: 16,
//         borderBottomWidth: 0.4
//     },
//     userIcon: {
//         width: width * 0.06,
//         height: 38,
//     },
//     nbsLogo: {
//         marginTop: 5,
//         width: width * 0.35,
//         height: 70,
//         borderRadius: 32
//     },
//     fonts: {
//         fontSize: normalizeFont(16),
//         fontWeight: "700",
//         color: COLORS.greyscale900,
//     },

//     cartBtn: {
//         height: 58,
//         width: width - 32,
//         alignItems: "center",
//         justifyContent: "center",
//         borderRadius: 32,
//         backgroundColor: COLORS.black,
//         flexDirection: "row",
//         marginBottom: 40,
//     },
//     cartBottomContainer: {
//         position: "absolute",
//         bottom: 65,
//         left: 0,
//         right: 0,
//         width: SIZES.width,
//         alignItems: "center",
//         justifyContent: "center",
//         height: 150,
//         backgroundColor: COLORS.white,
//         paddingHorizontal: 16,
//         paddingVertical: 16,
//         borderTopRightRadius: 24,
//         borderTopLeftRadius: 24,
//         shadowColor: "#000",
//         shadowOffset: { width: 0, height: -2 },
//         shadowOpacity: 0.1,
//         shadowRadius: 6,
//         elevation: 6,
//     },
// })

// export default BulkOrderForm










// import HamburgerDrawer from '@/components/HamburgerDrawer';
// import { COLORS, icons, images, SIZES } from '@/constants';
// import { useAppSelector } from '@/hooks/useAppSelector';
// import { useTheme } from '@/theme/ThemeProvider';
// import { normalizeFont } from '@/utils/normalizeFont';
// import { NavigationProp } from '@react-navigation/native';
// import { router, useNavigation } from 'expo-router';
// import i18next from 'i18next';
// import React, { useRef, useState } from 'react';
// import { ActivityIndicator, Alert, Dimensions, Image, KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
// import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';

// const { width } = Dimensions.get('window');

// interface BulkOrderFormData {
//     name: string;
//     email: string;
//     phone: string;
//     company: string;
//     trn: string;
//     subject: string;
//     details: string;
// }

// const BulkOrderForm = () => {
//     const navigation = useNavigation<NavigationProp<any>>();
//     const { dark, colors } = useTheme();
//     const { t } = i18next;
//     const drawerRef = useRef<any>(null);
//     const scrollViewRef = useRef<ScrollView>(null);
//     const insets = useSafeAreaInsets();
//     const cartItems = useAppSelector(state => state.cart.cartItems);
//     const wishlistItems = useAppSelector(state => state.wishlist.wishlistItems);

//     const [formData, setFormData] = useState<BulkOrderFormData>({
//         name: '',
//         email: '',
//         phone: '',
//         company: '',
//         trn: '',
//         subject: '',
//         details: '',
//     });
//     const [loading, setLoading] = useState(false);

//     const totalCartItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

//     const handleInputChange = (field: keyof BulkOrderFormData, value: string) => {
//         setFormData(prev => {
//             if (prev[field] === value) return prev;
//             return { ...prev, [field]: value };
//         });
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
//                 formType: 'bulk-order',
//             };

//             const response = await fetch('http://localhost:3000/api/bulk-order-form-submitted-mobile', {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json',
//                     'x-api-key': 'nbs_super_secret_key_123',
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
//         });
//     };

//     const renderHeader = () => {
//         return (
//             <>
//                 <View
//                     style={{
//                         backgroundColor: "rgb(177, 18, 22)",
//                         alignItems: "center",
//                         paddingTop: 5,
//                         paddingBottom: 5
//                     }}
//                 >
//                     <Text
//                         style={{
//                             textAlign: "center",
//                             color: "white",
//                             fontSize: normalizeFont(14),
//                             maxWidth: 350,
//                             fontFamily: 'RubikRegular',
//                         }}
//                     >
//                         {t('aboutUs.announcement')}
//                     </Text>
//                 </View>
//                 <View style={styles.headerContainer}>
//                     <View style={{ flexDirection: "row", alignItems: "center", gap: 20 }}>
//                         <TouchableOpacity onPress={() => drawerRef.current?.open()}>
//                             <Image
//                                 source={images.menu}
//                                 resizeMode='contain'
//                                 style={[styles.userIcon, { tintColor: dark ? COLORS.white : COLORS.greyscale900 }]}
//                             />
//                         </TouchableOpacity>
//                         <TouchableOpacity onPress={() => navigation.navigate("search")}>
//                             <Image
//                                 source={icons.search3}
//                                 resizeMode='contain'
//                                 style={[styles.userIcon, { tintColor: dark ? COLORS.white : COLORS.greyscale900 }]}
//                             />
//                         </TouchableOpacity>
//                     </View>
//                     <View>
//                         <Image
//                             source={images.nbsLogo3}
//                             resizeMode='contain'
//                             style={styles.nbsLogo}
//                         />
//                     </View>
//                     <View style={{ flexDirection: "row", alignItems: "center", gap: 20 }}>
//                         <TouchableOpacity onPress={() => navigation.navigate("mywishlist")}>
//                             <Image
//                                 source={icons.heartOutline}
//                                 resizeMode='contain'
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
//                         <TouchableOpacity onPress={() => router.push("/cart")}>
//                             <Image
//                                 source={icons.bag3Outline}
//                                 resizeMode='contain'
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
//         )
//     }

//     const bgColor = dark ? '#1a1a1a' : '#ffffff';
//     const textColor = dark ? '#ffffff' : '#000000';
//     const inputBgColor = dark ? '#2a2a2a' : '#f5f5f5';
//     const borderColor = dark ? '#444444' : '#dddddd';

//     const InputField = ({ label, placeholder, value, onChange, keyboardType = 'default', multiline = false, numberOfLines = 1 }: any) => (
//         <View style={{ marginBottom: 16 }}>
//             <Text style={[styles.fonts, { marginBottom: 8, color: textColor }]}>
//                 {label}
//             </Text>
//             <TextInput
//                 style={{
//                     backgroundColor: inputBgColor,
//                     borderWidth: 1,
//                     borderColor,
//                     borderRadius: 8,
//                     padding: 12,
//                     color: textColor,
//                     minHeight: multiline ? 120 : 48,
//                     textAlignVertical: multiline ? 'top' : 'center',
//                 }}
//                 placeholder={placeholder}
//                 placeholderTextColor={dark ? '#999999' : '#cccccc'}
//                 keyboardType={keyboardType}
//                 value={value}
//                 onChangeText={onChange}
//                 editable={!loading}
//                 multiline={multiline}
//                 numberOfLines={numberOfLines}
//             />
//         </View>
//     );

//     return (
//         <SafeAreaView style={[styles.area, { backgroundColor: dark ? COLORS.dark1 : COLORS.white }]}>
//             <View style={[styles.container, { backgroundColor: colors.background }]}>
//                 {renderHeader()}

//                 <KeyboardAvoidingView
//                     behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
//                     keyboardVerticalOffset={Platform.OS === 'ios' ? 60 : 0}
//                     style={{ flex: 0 }}
//                 >
//                     <ScrollView
//                         ref={scrollViewRef}
//                         keyboardShouldPersistTaps="handled"
//                         scrollEnabled={true}
//                         showsVerticalScrollIndicator={true}
//                         contentContainerStyle={{
//                             paddingHorizontal: 16,
//                             paddingTop: 16,
//                             // paddingBottom: 180
//                         }}
//                     >
//                         <Text
//                             style={{
//                                 fontSize: normalizeFont(22),
//                                 fontWeight: 'bold',
//                                 color: dark ? COLORS.white : COLORS.black,
//                                 textAlign: 'center',
//                                 marginVertical: 15,
//                                 textTransform: "uppercase",
//                             }}
//                         >
//                             {t("bulkRequestForm.title")}
//                         </Text>

//                         <InputField
//                             label={t("bulkRequestForm.name")}
//                             placeholder={t("bulkRequestForm.namePlaceholder")}
//                             value={formData.name}
//                             onChange={(v: string) => handleInputChange('name', v)}
//                         />

//                         <InputField
//                             label={t("bulkRequestForm.email")}
//                             placeholder={t("bulkRequestForm.emailPlaceholder")}
//                             value={formData.email}
//                             onChange={(v: string) => handleInputChange('email', v)}
//                             keyboardType="email-address"
//                         />

//                         <InputField
//                             label={t("bulkRequestForm.phoneNumber")}
//                             placeholder={t("bulkRequestForm.phoneNumberPlaceholder")}
//                             value={formData.phone}
//                             onChange={(v: string) => handleInputChange('phone', v)}
//                             keyboardType="phone-pad"
//                         />

//                         <InputField
//                             label={t("bulkRequestForm.companyName")}
//                             placeholder={t("bulkRequestForm.companyNamePlaceholder")}
//                             value={formData.company}
//                             onChange={(v: string) => handleInputChange('company', v)}
//                         />

//                         <View style={{ marginBottom: 16 }}>
//                             <Text style={[styles.fonts, { marginBottom: 8, color: textColor }]}>
//                                 {t("bulkRequestForm.trnNumber")}
//                                 <Text style={{ fontWeight: '400', color: '#999999' }}>
//                                     {' '}{t("bulkRequestForm.trnNumber2")}
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
//                                 maxLength={15}
//                                 placeholder={t("bulkRequestForm.trnNumberPlaceholder")}
//                                 placeholderTextColor={dark ? '#999999' : '#cccccc'}
//                                 value={formData.trn}
//                                 onChangeText={(v) => handleInputChange('trn', v)}
//                                 editable={!loading}
//                             />
//                         </View>

//                         <InputField
//                             label={t("bulkRequestForm.subject")}
//                             placeholder={t("bulkRequestForm.subjectPlaceholder")}
//                             value={formData.subject}
//                             onChange={(v: string) => handleInputChange('subject', v)}
//                         />

//                         <InputField
//                             label={t("bulkRequestForm.additionalDetails")}
//                             placeholder={t("bulkRequestForm.additionalDetailsPlaceholder")}
//                             value={formData.details}
//                             onChange={(v: string) => handleInputChange('details', v)}
//                             multiline={true}
//                             numberOfLines={6}
//                         />
//                     </ScrollView>


//                     <View
//                         style={[
//                             styles.cartBottomContainer,
//                             {
//                                 backgroundColor: dark ? COLORS.dark2 : COLORS.white,
//                                 borderTopColor: dark ? COLORS.dark2 : COLORS.white,
//                             },
//                         ]}
//                     >
//                         <TouchableOpacity
//                             onPress={handleSubmit}
//                             disabled={loading}
//                             style={[styles.cartBtn, { backgroundColor: COLORS.primaryRed }]}
//                         >
//                             {loading && <ActivityIndicator color="white" style={{ marginRight: 8 }} />}
//                             <Text
//                                 style={{
//                                     color: 'white',
//                                     fontWeight: '600',
//                                     fontSize: normalizeFont(16),
//                                 }}
//                             >
//                                 {loading ? t("bulkRequestForm.submitting") : t("bulkRequestForm.submit")}
//                             </Text>
//                         </TouchableOpacity>
//                     </View>
//                 </KeyboardAvoidingView>

//                 {/* <View
//                     style={[
//                         styles.cartBottomContainer,
//                         {
//                             backgroundColor: dark ? COLORS.dark2 : COLORS.white,
//                             borderTopColor: dark ? COLORS.dark2 : COLORS.white,
//                         },
//                     ]}
//                 >
//                     <TouchableOpacity
//                         onPress={handleSubmit}
//                         disabled={loading}
//                         style={[styles.cartBtn, { backgroundColor: COLORS.primaryRed }]}
//                     >
//                         {loading && <ActivityIndicator color="white" style={{ marginRight: 8 }} />}
//                         <Text
//                             style={{
//                                 color: 'white',
//                                 fontWeight: '600',
//                                 fontSize: normalizeFont(16),
//                             }}
//                         >
//                             {loading ? t("bulkRequestForm.submitting") : t("bulkRequestForm.submit")}
//                         </Text>
//                     </TouchableOpacity>
//                 </View> */}

//                 <HamburgerDrawer ref={drawerRef} />
//             </View>
//         </SafeAreaView>
//     );
// }

// const styles = StyleSheet.create({
//     area: {
//         flex: 1,
//     },
//     container: {
//         backgroundColor: COLORS.white,
//         flex: 1,
//     },
//     headerContainer: {
//         flexDirection: "row",
//         justifyContent: "space-between",
//         alignItems: "center",
//         paddingLeft: 16,
//         paddingBottom: 6,
//         paddingRight: 16,
//         borderBottomWidth: 0.4
//     },
//     userIcon: {
//         width: width * 0.06,
//         height: 38,
//     },
//     nbsLogo: {
//         marginTop: 5,
//         width: width * 0.35,
//         height: 70,
//         borderRadius: 32
//     },
//     fonts: {
//         fontSize: normalizeFont(16),
//         fontWeight: "700",
//         color: COLORS.greyscale900,
//     },
//     cartBtn: {
//         height: 58,
//         width: width - 32,
//         alignItems: "center",
//         justifyContent: "center",
//         borderRadius: 32,
//         // backgroundColor: COLORS.black,
//         flexDirection: "row",
//         marginBottom: 40,
//     },
//     cartBottomContainer: {
//         width: SIZES.width,
//         alignItems: "center",
//         backgroundColor: "black",
//         justifyContent: "center",
//         paddingHorizontal: 16,
//         paddingVertical: 16,
//         borderTopRightRadius: 24,
//         borderTopLeftRadius: 24,
//         shadowColor: "#000",
//         shadowOffset: { width: 0, height: -2 },
//         shadowOpacity: 0.1,
//         shadowRadius: 6,
//     },
// })

// export default BulkOrderForm










// Temporarily disable Redux to test
const cartItems = [];
const wishlistItems = []; import HamburgerDrawer from '@/components/HamburgerDrawer';
import { COLORS, icons, images, SIZES } from '@/constants';
import { useAppSelector } from '@/hooks/useAppSelector';
import { useTheme } from '@/theme/ThemeProvider';
import { normalizeFont } from '@/utils/normalizeFont';
import { NavigationProp } from '@react-navigation/native';
import { router, useNavigation } from 'expo-router';
import i18next from 'i18next';
import React, { useCallback, useMemo, useRef, useState } from 'react';
import { ActivityIndicator, Alert, Dimensions, Image, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';

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
    const memoizedTheme = useMemo(() => ({ dark, colors }), [dark, colors]);
    const { t } = i18next;
    const drawerRef = useRef<any>(null);
    const scrollViewRef = useRef<ScrollView>(null);
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

    const totalCartItems = useMemo(() => cartItems.reduce((sum, item) => sum + item.quantity, 0), [cartItems]);

    const handleInputChange = useCallback((field: keyof BulkOrderFormData, value: string) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    }, []);

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

            const response = await fetch('http://localhost:3000/api/bulk-order-form-submitted-mobile', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'x-api-key': 'nbs_super_secret_key_123',
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

    const renderHeader = () => {
        return (
            <>
                <View
                    style={{
                        backgroundColor: "rgb(177, 18, 22)",
                        alignItems: "center",
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
                        <TouchableOpacity onPress={() => drawerRef.current?.open()}>
                            <Image
                                source={images.menu}
                                resizeMode='contain'
                                style={[styles.userIcon, { tintColor: dark ? COLORS.white : COLORS.greyscale900 }]}
                            />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => navigation.navigate("search")}>
                            <Image
                                source={icons.search3}
                                resizeMode='contain'
                                style={[styles.userIcon, { tintColor: dark ? COLORS.white : COLORS.greyscale900 }]}
                            />
                        </TouchableOpacity>
                    </View>
                    <View>
                        <Image
                            source={images.nbsLogo3}
                            resizeMode='contain'
                            style={styles.nbsLogo}
                        />
                    </View>
                    <View style={{ flexDirection: "row", alignItems: "center", gap: 20 }}>
                        <TouchableOpacity onPress={() => navigation.navigate("mywishlist")}>
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
                        <TouchableOpacity onPress={() => router.push("/cart")}>
                            <Image
                                source={icons.bag3Outline}
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
                                    {totalCartItems}
                                </Text>
                            </View>
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

    const InputField = useCallback(({ label, placeholder, value, onChange, keyboardType = 'default', multiline = false, numberOfLines = 1 }: any) => (
        <View style={{ marginBottom: 16 }}>
            <Text style={[styles.fonts, { marginBottom: 8, color: textColor }]}>
                {label}
            </Text>
            <TextInput
                style={{
                    backgroundColor: inputBgColor,
                    borderWidth: 1,
                    borderColor,
                    borderRadius: 8,
                    padding: 12,
                    color: textColor,
                    minHeight: multiline ? 120 : 48,
                    textAlignVertical: multiline ? 'top' : 'center',
                }}
                placeholder={placeholder}
                placeholderTextColor={dark ? '#999999' : '#cccccc'}
                keyboardType={keyboardType}
                value={value}
                onChangeText={onChange}
                editable={!loading}
                multiline={multiline}
                numberOfLines={numberOfLines}
                scrollEnabled={multiline}
            />
        </View>
    ), [inputBgColor, borderColor, textColor, dark, loading]);

    return (
        <SafeAreaView style={[styles.area, { backgroundColor: dark ? COLORS.dark1 : COLORS.white }]}>
            <View style={[styles.container, { backgroundColor: colors.background }]}>
                {renderHeader()}

                <ScrollView
                    ref={scrollViewRef}
                    keyboardShouldPersistTaps="handled"
                    scrollEnabled={true}
                    showsVerticalScrollIndicator={true}
                    contentContainerStyle={{
                        paddingHorizontal: 16,
                        paddingTop: 16,
                        // paddingBottom: 150,
                        flexGrow: 1,
                    }}
                    style={{ flex: 1 }}
                >
                    <Text
                        style={{
                            fontSize: normalizeFont(22),
                            fontWeight: 'bold',
                            color: dark ? COLORS.white : COLORS.black,
                            textAlign: 'center',
                            marginVertical: 15,
                            textTransform: "uppercase",
                        }}
                    >
                        {t("bulkRequestForm.title")}
                    </Text>

                    <InputField
                        label={t("bulkRequestForm.name")}
                        placeholder={t("bulkRequestForm.namePlaceholder")}
                        value={formData.name}
                        onChange={(v: string) => handleInputChange('name', v)}
                    />

                    <InputField
                        label={t("bulkRequestForm.email")}
                        placeholder={t("bulkRequestForm.emailPlaceholder")}
                        value={formData.email}
                        onChange={(v: string) => handleInputChange('email', v)}
                        keyboardType="email-address"
                    />

                    <InputField
                        label={t("bulkRequestForm.phoneNumber")}
                        placeholder={t("bulkRequestForm.phoneNumberPlaceholder")}
                        value={formData.phone}
                        onChange={(v: string) => handleInputChange('phone', v)}
                        keyboardType="phone-pad"
                    />

                    <InputField
                        label={t("bulkRequestForm.companyName")}
                        placeholder={t("bulkRequestForm.companyNamePlaceholder")}
                        value={formData.company}
                        onChange={(v: string) => handleInputChange('company', v)}
                    />

                    <View style={{ marginBottom: 16 }}>
                        <Text style={[styles.fonts, { marginBottom: 8, color: textColor }]}>
                            {t("bulkRequestForm.trnNumber")}
                            <Text style={{ fontWeight: '400', color: '#999999' }}>
                                {' '}{t("bulkRequestForm.trnNumber2")}
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
                            maxLength={15}
                            placeholder={t("bulkRequestForm.trnNumberPlaceholder")}
                            placeholderTextColor={dark ? '#999999' : '#cccccc'}
                            value={formData.trn}
                            onChangeText={(v) => handleInputChange('trn', v)}
                            editable={!loading}
                        />
                    </View>

                    <InputField
                        label={t("bulkRequestForm.subject")}
                        placeholder={t("bulkRequestForm.subjectPlaceholder")}
                        value={formData.subject}
                        onChange={(v: string) => handleInputChange('subject', v)}
                    />

                    <InputField
                        label={t("bulkRequestForm.additionalDetails")}
                        placeholder={t("bulkRequestForm.additionalDetailsPlaceholder")}
                        value={formData.details}
                        onChange={(v: string) => handleInputChange('details', v)}
                        multiline={true}
                        numberOfLines={6}
                    />

                    <TouchableOpacity
                        onPress={handleSubmit}
                        disabled={loading}
                        style={[styles.cartBtn, { backgroundColor: COLORS.primaryRed, marginTop: 20 }]}
                    >
                        {loading && <ActivityIndicator color="white" style={{ marginRight: 8 }} />}
                        <Text
                            style={{
                                color: 'white',
                                fontWeight: '600',
                                fontSize: normalizeFont(16),
                            }}
                        >
                            {loading ? t("bulkRequestForm.submitting") : t("bulkRequestForm.submit")}
                        </Text>
                    </TouchableOpacity>
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
        flex: 1,
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
        marginTop: 5,
        width: width * 0.35,
        height: 70,
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
        width: SIZES.width,
        alignItems: "center",
        justifyContent: "center",
        paddingHorizontal: 16,
        paddingVertical: 16,
        borderTopRightRadius: 24,
        borderTopLeftRadius: 24,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: -2 },
        shadowOpacity: 0.1,
        shadowRadius: 6,
    },
})

export default React.memo(BulkOrderForm)