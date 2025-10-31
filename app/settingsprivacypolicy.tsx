// import { normalizeFont } from '@/utils/normalizeFont';
// import React from 'react';
// import { StyleSheet, Text, View } from 'react-native';
// import { SafeAreaView } from 'react-native-safe-area-context';
// import { ScrollView } from 'react-native-virtualized-view';
// import Header from '../components/Header';
// import { COLORS } from '../constants';
// import { useTheme } from '../theme/ThemeProvider';

// // Change the privacy data based on your data...
// const SettingsPrivacyPolicy = () => {
//     const { colors, dark } = useTheme()

//     return (
//         <SafeAreaView style={[styles.area, { backgroundColor: colors.background }]}>
//             <View style={[styles.container, { backgroundColor: colors.background }]}>
//                 <Header title="Privacy Policy" />
//                 <ScrollView showsVerticalScrollIndicator={false}>
//                     <View>
//                         <Text style={[styles.body, { color: dark ? COLORS.secondaryWhite : COLORS.greyscale900, marginTop: 30 }]}>
//                             At NBS Group, we respect your privacy and are committed to protecting your personal
//                             information. This Privacy Policy explains how we collect, use, and protect your data.
//                         </Text>

//                         <Text style={[styles.settingsTitle, { color: dark ? COLORS.white : COLORS.black }]}>
//                             1. Information We Collect
//                         </Text>

//                         <View style={{ marginLeft: 10 }}>
//                             {[
//                                 "Name, email address, phone number, and shipping/billing address",
//                                 "Order details and transaction history",
//                                 "Device and browser information (for website usage analytics)"
//                             ].map((item, index) => (
//                                 <View key={index} style={{ flexDirection: 'row', alignItems: 'flex-start', marginVertical: 4 }}>
//                                     <Text
//                                         style={[
//                                             styles.body,
//                                             {
//                                                 marginRight: 10,
//                                                 fontSize: 18, // Bigger bullet
//                                                 fontWeight: 'bold', // Darker + thicker bullet
//                                                 color: dark ? COLORS.white : COLORS.black, // Darker in both modes
//                                             },
//                                         ]}
//                                     >
//                                         •
//                                     </Text>
//                                     <Text style={[styles.body, { flex: 1, color: dark ? COLORS.secondaryWhite : COLORS.greyscale900 }]}>
//                                         {item}
//                                     </Text>
//                                 </View>
//                             ))}
//                         </View>
//                     </View>

//                     <View>
//                         <Text style={[styles.settingsTitle, { color: dark ? COLORS.white : COLORS.black }]}>
//                             2. How We Use Your Information
//                         </Text>

//                         <View style={{ marginLeft: 10 }}>
//                             {[
//                                 "Process and deliver your orders",
//                                 "Communicate order updates and customer support",
//                                 "Improve our website, products, and services",
//                                 "Send promotional updates (only if you opt in)"
//                             ].map((item, index) => (
//                                 <View key={index} style={{ flexDirection: 'row', alignItems: 'flex-start', marginVertical: 4 }}>
//                                     <Text
//                                         style={[
//                                             styles.body,
//                                             {
//                                                 marginRight: 10,
//                                                 fontSize: 18, // Bigger bullet
//                                                 fontWeight: 'bold', // Darker + thicker bullet
//                                                 color: dark ? COLORS.white : COLORS.black, // Darker in both modes
//                                             },
//                                         ]}
//                                     >
//                                         •
//                                     </Text>

//                                     <Text style={[styles.body, { flex: 1, color: dark ? COLORS.secondaryWhite : COLORS.greyscale900 }]}>
//                                         {item}
//                                     </Text>
//                                 </View>
//                             ))}
//                         </View>
//                     </View>

//                     <View>
//                         <Text style={[styles.settingsTitle, { color: dark ? COLORS.white : COLORS.black }]}>3. Data Protection</Text>
//                         <Text style={[styles.body, { color: dark ? COLORS.secondaryWhite : COLORS.greyscale900 }]}>We take appropriate security measures to protect your personal data from unauthorized access, misuse, or disclosure. Your information is never sold or shared with third parties without your consent, except as required by law.</Text>
//                     </View>
//                     <View>
//                         <Text style={[styles.settingsTitle, { color: dark ? COLORS.white : COLORS.black }]}>4. Cookies</Text>
//                         <Text style={[styles.body, { color: dark ? COLORS.secondaryWhite : COLORS.greyscale900 }]}>Our website may use cookies to enhance user experience. You can choose to disable cookies through your browser settings.</Text>
//                     </View>
//                     <View>
//                         <Text style={[styles.settingsTitle, { color: dark ? COLORS.white : COLORS.black }]}>5. Your Rights</Text>
//                         <Text style={[styles.body, { color: dark ? COLORS.secondaryWhite : COLORS.greyscale900 }]}>You may request access, correction, or deletion of your personal data at any time by contacting us.</Text>
//                     </View>
//                     <View>
//                         <Text style={[styles.settingsTitle, { color: dark ? COLORS.white : COLORS.black }]}>6. Contact Us</Text>
//                         <Text style={[styles.body, { color: dark ? COLORS.secondaryWhite : COLORS.greyscale900 }]}>If you have any questions about this Privacy Policy or how we handle your data, please contact us.</Text>
//                     </View>
//                 </ScrollView>
//             </View>
//         </SafeAreaView>
//     )
// };

// const styles = StyleSheet.create({
//     area: {
//         flex: 1,
//         backgroundColor: COLORS.white
//     },
//     container: {
//         flex: 1,
//         backgroundColor: COLORS.white,
//         padding: 16
//     },
//     settingsTitle: {
//         fontSize: normalizeFont(17),
//         fontFamily: "bold",
//         color: COLORS.black,
//         marginVertical: 26
//     },
//     body: {
//         fontSize: normalizeFont(15),
//         fontFamily: "regular",
//         color: COLORS.black,
//         marginTop: 4,
//         lineHeight: 27
//     }
// })

// export default SettingsPrivacyPolicy


import { normalizeFont } from '@/utils/normalizeFont';
import i18next from 'i18next';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ScrollView } from 'react-native-virtualized-view';
import Header from '../components/Header';
import { COLORS } from '../constants';
import { useTheme } from '../theme/ThemeProvider';

const SettingsPrivacyPolicy = () => {
    const { colors, dark } = useTheme();
    const { t } = i18next;

    const renderBulletList = (items: string[]) => (
        <View style={{ marginLeft: 10 }}>
            {items.map((item, index) => (
                <View key={index} style={{ flexDirection: 'row', alignItems: 'flex-start', marginVertical: 4 }}>
                    <Text
                        style={[
                            styles.body,
                            {
                                marginRight: 10,
                                fontSize: 18,
                                fontWeight: 'bold',
                                color: dark ? COLORS.white : COLORS.black,
                            },
                        ]}
                    >
                        •
                    </Text>
                    <Text style={[styles.body, { flex: 1, color: dark ? COLORS.secondaryWhite : COLORS.greyscale900 }]}>
                        {item}
                    </Text>
                </View>
            ))}
        </View>
    );


    return (
        <SafeAreaView style={[styles.area, { backgroundColor: colors.background }]}>
            <View style={[styles.container, { backgroundColor: colors.background }]}>
                <Header title={t('privacyPolicy.title')} />
                <ScrollView showsVerticalScrollIndicator={false}>
                    <View>
                        <Text style={[styles.body, { color: dark ? COLORS.secondaryWhite : COLORS.greyscale900, marginTop: 30 }]}>
                            {t('privacyPolicy.intro')}
                        </Text>

                        <Text style={[styles.settingsTitle, { color: dark ? COLORS.white : COLORS.black }]}>
                            {t('privacyPolicy.section1Title')}
                        </Text>
                        {renderBulletList(t('privacyPolicy.section1List', { returnObjects: true }) as string[])}


                        <Text style={[styles.settingsTitle, { color: dark ? COLORS.white : COLORS.black }]}>
                            {t('privacyPolicy.section2Title')}
                        </Text>
                        {renderBulletList(t('privacyPolicy.section2List', { returnObjects: true }) as string[])}


                        <Text style={[styles.settingsTitle, { color: dark ? COLORS.white : COLORS.black }]}>
                            {t('privacyPolicy.section3Title')}
                        </Text>
                        <Text style={[styles.body, { color: dark ? COLORS.secondaryWhite : COLORS.greyscale900 }]}>
                            {t('privacyPolicy.section3Content')}
                        </Text>

                        <Text style={[styles.settingsTitle, { color: dark ? COLORS.white : COLORS.black }]}>
                            {t('privacyPolicy.section4Title')}
                        </Text>
                        <Text style={[styles.body, { color: dark ? COLORS.secondaryWhite : COLORS.greyscale900 }]}>
                            {t('privacyPolicy.section4Content')}
                        </Text>

                        <Text style={[styles.settingsTitle, { color: dark ? COLORS.white : COLORS.black }]}>
                            {t('privacyPolicy.section5Title')}
                        </Text>
                        <Text style={[styles.body, { color: dark ? COLORS.secondaryWhite : COLORS.greyscale900 }]}>
                            {t('privacyPolicy.section5Content')}
                        </Text>

                        <Text style={[styles.settingsTitle, { color: dark ? COLORS.white : COLORS.black }]}>
                            {t('privacyPolicy.section6Title')}
                        </Text>
                        <Text style={[styles.body, { color: dark ? COLORS.secondaryWhite : COLORS.greyscale900 }]}>
                            {t('privacyPolicy.section6Content')}
                        </Text>
                    </View>
                </ScrollView>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    area: {
        flex: 1,
        backgroundColor: COLORS.white
    },
    container: {
        flex: 1,
        backgroundColor: COLORS.white,
        padding: 16
    },
    settingsTitle: {
        fontSize: normalizeFont(17),
        fontFamily: "bold",
        color: COLORS.black,
        marginVertical: 26
    },
    body: {
        fontSize: normalizeFont(15),
        fontFamily: "regular",
        color: COLORS.black,
        marginTop: 4,
        lineHeight: 27
    }
});

export default SettingsPrivacyPolicy;
