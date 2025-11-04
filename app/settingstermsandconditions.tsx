import { normalizeFont } from '@/utils/normalizeFont';
import i18next from 'i18next';
import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ScrollView } from 'react-native-virtualized-view';
import Header from '../components/Header';
import { COLORS } from '../constants';
import { useTheme } from '../theme/ThemeProvider';

const SettingsTermsAndCondition = () => {
    const { colors, dark } = useTheme();
    const { t } = i18next;

    const renderBulletList = (items: string[], level = 0) => (
        <View style={{ marginLeft: level * 15 }}>
            {items.map((item, index) => (
                <View key={index} style={{ flexDirection: 'row', alignItems: 'flex-start', marginVertical: 4 }}>
                    <Text
                        style={[
                            styles.bullet,
                            { color: dark ? COLORS.white : COLORS.black },
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
            ))}
        </View>
    );

    const renderSection = (sectionNumber: number) => {
        const title = t(`termsAndCondition.section${sectionNumber}Title`);
        const content = t(`termsAndCondition.section${sectionNumber}Content`, { defaultValue: '' });
        const list = t(`termsAndCondition.section${sectionNumber}List`, { returnObjects: true, defaultValue: [] }) as any[];

        if (!title) return null;

        return (
            <View key={sectionNumber}>
                <Text style={[styles.settingsTitle, { color: dark ? COLORS.white : COLORS.black }]}>
                    {title}
                </Text>

                {content ? (
                    <Text
                        style={[
                            styles.body,
                            { color: dark ? COLORS.secondaryWhite : COLORS.greyscale900 },
                        ]}
                    >
                        {content}
                    </Text>
                ) : null}

                {/* Simple list */}
                {Array.isArray(list) &&
                    list.length > 0 &&
                    typeof list[0] === 'string' &&
                    renderBulletList(list)}

                {/* Nested object lists */}
                {Array.isArray(list) &&
                    list.length > 0 &&
                    typeof list[0] === 'object' &&
                    list.map((sub, idx) => (
                        <View key={idx}>
                            <Text
                                style={[
                                    styles.body,
                                    {
                                        fontWeight: 'bold',
                                        color: dark ? COLORS.white : COLORS.black,
                                        marginBottom: 6,
                                    },
                                ]}
                            >
                                {sub.title}
                            </Text>
                            {renderBulletList(sub.items, 1)}
                        </View>
                    ))}
            </View>
        );
    };

    const contactInfo = t('termsAndCondition.section10List', { returnObjects: true }) as any;

    return (
        <SafeAreaView style={[styles.area, { backgroundColor: colors.background }]}>
            <View style={[styles.container, { backgroundColor: colors.background }]}>
                <Header title={t('termsAndCondition.title')} />
                <ScrollView showsVerticalScrollIndicator={false}>
                    <Text
                        style={[
                            styles.body,
                            { color: dark ? COLORS.secondaryWhite : COLORS.greyscale900, marginTop: 30 },
                        ]}
                    >
                        {t('termsAndCondition.intro')}
                    </Text>

                    {[...Array(10).keys()].map((i) => renderSection(i + 1))}

                    {contactInfo && (
                        <View style={{ marginTop: 10 }}>
                            <Text
                                style={[
                                    styles.body,
                                    { marginTop: 10 },
                                    { color: dark ? COLORS.secondaryWhite : COLORS.greyscale900 },
                                ]}
                            >
                                📧 Email: {contactInfo.email}
                            </Text>
                            <Text
                                style={[
                                    styles.body,
                                    { marginTop: 10 },
                                    { color: dark ? COLORS.secondaryWhite : COLORS.greyscale900 },
                                ]}
                            >
                                ☎️ Phone: {contactInfo.phone}
                            </Text>
                            <Text
                                style={[
                                    styles.body,
                                    { marginTop: 10 },
                                    { color: dark ? COLORS.secondaryWhite : COLORS.greyscale900 },
                                ]}
                            >
                                🏢 Address: {contactInfo.address}
                            </Text>
                        </View>
                    )}
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
        marginVertical: 26,
    },
    body: {
        fontSize: normalizeFont(15),
        fontFamily: 'regular',
        marginTop: 4,
        lineHeight: 27,
    },
    bullet: {
        marginRight: 10,
        fontSize: 18,
        fontWeight: 'bold',
    },
});

export default SettingsTermsAndCondition;
