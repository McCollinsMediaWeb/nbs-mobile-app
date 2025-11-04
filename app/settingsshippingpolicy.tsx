// import { normalizeFont } from '@/utils/normalizeFont';
// import i18next from 'i18next';
// import { StyleSheet, Text, View } from 'react-native';
// import { SafeAreaView } from 'react-native-safe-area-context';
// import { ScrollView } from 'react-native-virtualized-view';
// import Header from '../components/Header';
// import { COLORS } from '../constants';
// import { useTheme } from '../theme/ThemeProvider';

// const SettingsShippingPolicy = () => {
//     const { colors, dark } = useTheme();
//     const { t } = i18next;

//     const renderBulletList = (items: string[]) => (
//         <View style={{ marginLeft: 10 }}>
//             {items.map((item, index) => (
//                 <View key={index} style={{ flexDirection: 'row', alignItems: 'flex-start', marginVertical: 4 }}>
//                     <Text
//                         style={[
//                             styles.body,
//                             {
//                                 marginRight: 10,
//                                 fontSize: 18,
//                                 fontWeight: 'bold',
//                                 color: dark ? COLORS.white : COLORS.black,
//                             },
//                         ]}
//                     >
//                         •
//                     </Text>
//                     <Text style={[styles.body, { flex: 1, color: dark ? COLORS.secondaryWhite : COLORS.greyscale900 }]}>
//                         {item}
//                     </Text>
//                 </View>
//             ))}
//         </View>
//     );


//     return (
//         <SafeAreaView style={[styles.area, { backgroundColor: colors.background }]}>
//             <View style={[styles.container, { backgroundColor: colors.background }]}>
//                 <Header title={t('shippingPolicy.title')} />
//                 <ScrollView showsVerticalScrollIndicator={false}>
//                     <View>
//                         <Text style={[styles.body, { color: dark ? COLORS.secondaryWhite : COLORS.greyscale900, marginTop: 30 }]}>
//                             {t('shippingPolicy.intro')}
//                         </Text>

//                         <Text style={[styles.settingsTitle, { color: dark ? COLORS.white : COLORS.black }]}>
//                             {t('shippingPolicy.section1Title')}
//                         </Text>
//                         {renderBulletList(t('shippingPolicy.section1List', { returnObjects: true }) as string[])}


//                         <Text style={[styles.settingsTitle, { color: dark ? COLORS.white : COLORS.black }]}>
//                             {t('shippingPolicy.section2Title')}
//                         </Text>
//                         {renderBulletList(t('shippingPolicy.section2List', { returnObjects: true }) as string[])}


//                         <Text style={[styles.settingsTitle, { color: dark ? COLORS.white : COLORS.black }]}>
//                             {t('shippingPolicy.section3Title')}
//                         </Text>
//                         <Text style={[styles.body, { color: dark ? COLORS.secondaryWhite : COLORS.greyscale900 }]}>
//                             {t('shippingPolicy.section3Content')}
//                         </Text>

//                         <Text style={[styles.settingsTitle, { color: dark ? COLORS.white : COLORS.black }]}>
//                             {t('shippingPolicy.section4Title')}
//                         </Text>
//                         <Text style={[styles.body, { color: dark ? COLORS.secondaryWhite : COLORS.greyscale900 }]}>
//                             {t('shippingPolicy.section4Content')}
//                         </Text>

//                         <Text style={[styles.settingsTitle, { color: dark ? COLORS.white : COLORS.black }]}>
//                             {t('shippingPolicy.section5Title')}
//                         </Text>
//                         <Text style={[styles.body, { color: dark ? COLORS.secondaryWhite : COLORS.greyscale900 }]}>
//                             {t('shippingPolicy.section5Content')}
//                         </Text>

//                         <Text style={[styles.settingsTitle, { color: dark ? COLORS.white : COLORS.black }]}>
//                             {t('shippingPolicy.section6Title')}
//                         </Text>
//                         <Text style={[styles.body, { color: dark ? COLORS.secondaryWhite : COLORS.greyscale900 }]}>
//                             {t('shippingPolicy.section6Content')}
//                         </Text>
//                     </View>
//                 </ScrollView>
//             </View>
//         </SafeAreaView>
//     );
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
// });

// export default SettingsShippingPolicy;





import { normalizeFont } from '@/utils/normalizeFont';
import { useTranslation } from 'react-i18next';
import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ScrollView } from 'react-native-virtualized-view';
import Header from '../components/Header';
import { COLORS } from '../constants';
import { useTheme } from '../theme/ThemeProvider';

type BulletItem = string | { title: string; items: string[] };

const SettingsShippingPolicy = () => {
    const { colors, dark } = useTheme();
    const { t } = useTranslation();

    const renderBulletList = (items: BulletItem[]) => (
        <View style={{ marginLeft: 10 }}>
            {items.map((item, index) => {
                if (typeof item === 'string') {
                    return (
                        <View
                            key={index}
                            style={{ flexDirection: 'row', alignItems: 'flex-start', marginVertical: 4 }}
                        >
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
                            <Text
                                style={[
                                    styles.body,
                                    { flex: 1, color: dark ? COLORS.secondaryWhite : COLORS.greyscale900 },
                                ]}
                            >
                                {item}
                            </Text>
                        </View>
                    );
                } else {
                    return (
                        <View key={index} style={{ marginTop: 8 }}>
                            <Text
                                style={[
                                    styles.body,
                                    {
                                        fontWeight: 'bold',
                                        color: dark ? COLORS.white : COLORS.black,
                                        marginBottom: 4,
                                    },
                                ]}
                            >
                                {item.title}
                            </Text>
                            {renderBulletList(item.items)}
                        </View>
                    );
                }
            })}
        </View>
    );

    // ✅ Type-safe translations
    const section1List = t('shippingPolicy.section1List', { returnObjects: true }) as string[];
    const section2List = t('shippingPolicy.section2List', { returnObjects: true }) as BulletItem[];
    const section3List = t('shippingPolicy.section3List', { returnObjects: true }) as string[];
    const section4List = t('shippingPolicy.section4List', { returnObjects: true }) as string[];
    const section5List = t('shippingPolicy.section5List', { returnObjects: true }) as string[];
    const section6List = t('shippingPolicy.section6List', { returnObjects: true }) as {
        email: string;
        phone: string;
        address: string;
    };

    return (
        <SafeAreaView style={[styles.area, { backgroundColor: colors.background }]}>
            <View style={[styles.container, { backgroundColor: colors.background }]}>
                <Header title={t('shippingPolicy.title')} />
                <ScrollView showsVerticalScrollIndicator={false}>
                    <View>
                        <Text
                            style={[
                                styles.body,
                                { color: dark ? COLORS.secondaryWhite : COLORS.greyscale900, marginTop: 30 },
                            ]}
                        >
                            {t('shippingPolicy.intro')}
                        </Text>

                        {/* Section 1 */}
                        <Text style={[styles.settingsTitle, { color: dark ? COLORS.white : COLORS.black }]}>
                            {t('shippingPolicy.section1Title')}
                        </Text>
                        {renderBulletList(section1List)}

                        {/* Section 2 */}
                        <Text style={[styles.settingsTitle, { color: dark ? COLORS.white : COLORS.black }]}>
                            {t('shippingPolicy.section2Title')}
                        </Text>
                        {renderBulletList(section2List)}

                        {/* Section 3 */}
                        <Text style={[styles.settingsTitle, { color: dark ? COLORS.white : COLORS.black }]}>
                            {t('shippingPolicy.section3Title')}
                        </Text>
                        {renderBulletList(section3List)}

                        {/* Section 4 */}
                        <Text style={[styles.settingsTitle, { color: dark ? COLORS.white : COLORS.black }]}>
                            {t('shippingPolicy.section4Title')}
                        </Text>
                        {renderBulletList(section4List)}

                        {/* Section 5 */}
                        <Text style={[styles.settingsTitle, { color: dark ? COLORS.white : COLORS.black }]}>
                            {t('shippingPolicy.section5Title')}
                        </Text>
                        {renderBulletList(section5List)}

                        {/* Section 6 */}
                        <Text style={[styles.settingsTitle, { color: dark ? COLORS.white : COLORS.black }]}>
                            {t('shippingPolicy.section6Title')}
                        </Text>
                        <Text style={[styles.body, { color: dark ? COLORS.secondaryWhite : COLORS.greyscale900 }]}>
                            {t('shippingPolicy.section6Content')}
                        </Text>

                        <View style={{ marginTop: 10 }}>
                            <Text style={[styles.body,  {marginTop: 10}, { color: dark ? COLORS.secondaryWhite : COLORS.greyscale900 }]}>
                                📧 {section6List.email}
                            </Text>
                            <Text style={[styles.body, {marginTop: 10}, { color: dark ? COLORS.secondaryWhite : COLORS.greyscale900 }]}>
                                📞 {section6List.phone}
                            </Text>
                            <Text style={[styles.body,  {marginTop: 10}, { color: dark ? COLORS.secondaryWhite : COLORS.greyscale900 }]}>
                                📍 {section6List.address}
                            </Text>
                        </View>
                    </View>
                </ScrollView>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    area: {
        flex: 1,
        backgroundColor: COLORS.white,
    },
    container: {
        flex: 1,
        backgroundColor: COLORS.white,
        padding: 16,
    },
    settingsTitle: {
        fontSize: normalizeFont(17),
        fontFamily: 'bold',
        color: COLORS.black,
        marginVertical: 26,
    },
    body: {
        fontSize: normalizeFont(15),
        fontFamily: 'regular',
        color: COLORS.black,
        marginTop: 4,
        lineHeight: 27,
    },
});

export default SettingsShippingPolicy;
