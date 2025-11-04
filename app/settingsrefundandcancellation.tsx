import { normalizeFont } from '@/utils/normalizeFont';
import i18next from 'i18next';
import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ScrollView } from 'react-native-virtualized-view';
import Header from '../components/Header';
import { COLORS } from '../constants';
import { useTheme } from '../theme/ThemeProvider';

const SettingsRefundAndCancellation = () => {
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

    const contactInfo = t('refundAndCancellationPolicy.section6List', { returnObjects: true }) as {
        email: string;
        phone: string;
        address: string;
    };

    return (
        <SafeAreaView style={[styles.area, { backgroundColor: colors.background }]}>
            <View style={[styles.container, { backgroundColor: colors.background }]}>
                <Header title={t('refundAndCancellationPolicy.title')} />
                <ScrollView showsVerticalScrollIndicator={false}>
                    <View>

                        {/* Intro */}
                        <Text style={[styles.body, { color: dark ? COLORS.secondaryWhite : COLORS.greyscale900, marginTop: 30 }]}>
                            {t('refundAndCancellationPolicy.intro')}
                        </Text>

                        {/* Section 1 */}
                        <Text style={[styles.settingsTitle, { color: dark ? COLORS.white : COLORS.black }]}>
                            {t('refundAndCancellationPolicy.section1Title')}
                        </Text>
                        <Text style={[styles.body, { color: dark ? COLORS.secondaryWhite : COLORS.greyscale900 }]}>
                            {t('refundAndCancellationPolicy.section1Content')}
                        </Text>

                        {/* Section 2 */}
                        <Text style={[styles.settingsTitle, { color: dark ? COLORS.white : COLORS.black }]}>
                            {t('refundAndCancellationPolicy.section2Title')}
                        </Text>
                        <Text style={[styles.body, { color: dark ? COLORS.secondaryWhite : COLORS.greyscale900 }]}>
                            {t('refundAndCancellationPolicy.section2Content')}
                        </Text>

                        {/* Section 3 */}
                        <Text style={[styles.settingsTitle, { color: dark ? COLORS.white : COLORS.black }]}>
                            {t('refundAndCancellationPolicy.section3Title')}
                        </Text>
                        <Text style={[styles.body, { color: dark ? COLORS.secondaryWhite : COLORS.greyscale900 }]}>
                            {t('refundAndCancellationPolicy.section3List')}
                        </Text>

                        {/* Section 4 */}
                        <Text style={[styles.settingsTitle, { color: dark ? COLORS.white : COLORS.black }]}>
                            {t('refundAndCancellationPolicy.section4Title')}
                        </Text>
                        <Text style={[styles.body, { color: dark ? COLORS.secondaryWhite : COLORS.greyscale900 }]}>
                            {t('refundAndCancellationPolicy.section4Content')}
                        </Text>

                        {/* Section 5 */}
                        <Text style={[styles.settingsTitle, { color: dark ? COLORS.white : COLORS.black }]}>
                            {t('refundAndCancellationPolicy.section5Title')}
                        </Text>
                        <Text style={[styles.body, { color: dark ? COLORS.secondaryWhite : COLORS.greyscale900 }]}>
                            {t('refundAndCancellationPolicy.section5Content')}
                        </Text>

                        {/* Section 6 */}
                        <Text style={[styles.settingsTitle, { color: dark ? COLORS.white : COLORS.black }]}>
                            {t('refundAndCancellationPolicy.section6Title')}
                        </Text>
                        <Text style={[styles.body, { color: dark ? COLORS.secondaryWhite : COLORS.greyscale900 }]}>
                            {t('refundAndCancellationPolicy.section6Content')}
                        </Text>

                        {contactInfo && (
                            <View style={{ marginTop: 10 }}>
                                <Text style={[styles.body, {marginTop: 10}, { color: dark ? COLORS.secondaryWhite : COLORS.greyscale900 }]}>
                                    📧 {contactInfo.email}
                                </Text>
                                <Text style={[styles.body, {marginTop: 10}, { color: dark ? COLORS.secondaryWhite : COLORS.greyscale900 }]}>
                                    📞 {contactInfo.phone}
                                </Text>
                                <Text style={[styles.body, {marginTop: 10}, { color: dark ? COLORS.secondaryWhite : COLORS.greyscale900 }]}>
                                    📍 {contactInfo.address}
                                </Text>
                            </View>
                        )}
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

export default SettingsRefundAndCancellation;
