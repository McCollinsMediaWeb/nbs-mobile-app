import Header from '@/components/Header';
import { normalizeFont } from '@/utils/normalizeFont';
import i18next from 'i18next';
import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ScrollView } from 'react-native-virtualized-view';
import { COLORS } from '../constants';
import { useTheme } from '../theme/ThemeProvider';

const SettingsDeliveryPolicy = () => {
    const { colors, dark } = useTheme();
    const { t } = i18next;

    return (
        <SafeAreaView style={[styles.area, { backgroundColor: colors.background }]}>
            <View style={[styles.container, { backgroundColor: colors.background }]}>
                <Header title={t('deliveryPolicy.title')} />
                <ScrollView showsVerticalScrollIndicator={false}>
                    <View>
                        <Text style={[styles.body, { color: dark ? COLORS.secondaryWhite : COLORS.greyscale900, marginTop: 30 }]}>
                            {t('deliveryPolicy.intro')}
                        </Text>

                        <Text style={[styles.settingsTitle, { color: dark ? COLORS.white : COLORS.black }]}>
                            {t('deliveryPolicy.section1.title')}
                        </Text>
                        <Text style={[styles.body, { flex: 1, color: dark ? COLORS.secondaryWhite : COLORS.greyscale900 }]}>
                            {t('deliveryPolicy.section1.description')}
                        </Text>
                        <View style={{ flexDirection: 'row', alignItems: 'flex-start', marginVertical: 4 }}>
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
                                <Text style={{ fontWeight: 'bold' }}>{t('deliveryPolicy.section1.domesticFirst')}</Text>{t('deliveryPolicy.section1.domestic')}
                            </Text>
                        </View>

                        <View style={{ flexDirection: 'row', alignItems: 'flex-start', marginVertical: 4 }}>
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
                                <Text style={{ fontWeight: 'bold' }}>{t('deliveryPolicy.section1.internationalFirst')}</Text>{t('deliveryPolicy.section1.international')}
                            </Text>
                        </View>


                        <Text style={[styles.settingsTitle, { color: dark ? COLORS.white : COLORS.black }]}>
                            {t('deliveryPolicy.section2.title')}
                        </Text>
                        <View style={{ flexDirection: 'row', alignItems: 'flex-start', marginVertical: 4 }}>
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
                                {t('deliveryPolicy.section2.point1')}
                            </Text>
                        </View>
                        <View style={{ flexDirection: 'row', alignItems: 'flex-start', marginVertical: 4 }}>
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
                                {t('deliveryPolicy.section2.point2')}
                            </Text>
                        </View>


                        <Text style={[styles.settingsTitle, { color: dark ? COLORS.white : COLORS.black }]}>
                            {t('deliveryPolicy.section3.title')}
                        </Text>

                        <Text style={[styles.body, { flex: 1, color: dark ? COLORS.secondaryWhite : COLORS.greyscale900 }]}>
                            {t('deliveryPolicy.section3.intro')}
                        </Text>

                        {/* Table Header */}
                        <View
                            style={{
                                flexDirection: 'row',
                                backgroundColor: dark ? COLORS.greyscale900 : COLORS.greyscale300,
                                paddingVertical: 8,
                                paddingHorizontal: 10,
                                borderRadius: 6,
                                marginTop: 10,
                            }}
                        >
                            <Text
                                style={[
                                    styles.body,
                                    {
                                        flex: 1,
                                        fontWeight: 'bold',
                                        color: dark ? COLORS.white : COLORS.black,
                                        borderRightWidth: 1,
                                        borderColor: dark ? COLORS.greyscale600 : COLORS.greyscale300,
                                        paddingRight: 8,
                                    },
                                ]}
                            >
                                {t('deliveryPolicy.section3.table.header.col1')}
                            </Text>
                            <Text
                                style={[
                                    styles.body,
                                    {
                                        flex: 1,
                                        fontWeight: 'bold',
                                        color: dark ? COLORS.white : COLORS.black,
                                        borderRightWidth: 1,
                                        borderColor: dark ? COLORS.greyscale600 : COLORS.greyscale300,
                                        paddingHorizontal: 8,
                                    },
                                ]}
                            >
                                {t('deliveryPolicy.section3.table.header.col2')}
                            </Text>
                            <Text
                                style={[
                                    styles.body,
                                    {
                                        flex: 1,
                                        fontWeight: 'bold',
                                        color: dark ? COLORS.white : COLORS.black,
                                        paddingLeft: 8,
                                    },
                                ]}
                            >
                                {t('deliveryPolicy.section3.table.header.col3')}
                            </Text>
                        </View>

                        {/* Table Rows */}
                        {[
                            {
                                type: t('deliveryPolicy.section3.table.rows_0_col1'),
                                time: t('deliveryPolicy.section3.table.rows_0_col2'),
                                cost: t('deliveryPolicy.section3.table.rows_0_col3'),
                            },
                            {
                                type: t('deliveryPolicy.section3.table.rows_1_col1'),
                                time: t('deliveryPolicy.section3.table.rows_1_col2'),
                                cost: t('deliveryPolicy.section3.table.rows_1_col3'),
                            },
                            {
                                type: t('deliveryPolicy.section3.table.rows_2_col1'),
                                time: t('deliveryPolicy.section3.table.rows_2_col2'),
                                cost: t('deliveryPolicy.section3.table.rows_2_col3'),
                            },
                        ].map((row, index) => (
                            <View
                                key={index}
                                style={{
                                    flexDirection: 'row',
                                    paddingVertical: 8,
                                    paddingHorizontal: 10,
                                    borderBottomWidth: index !== 2 ? 1 : 0,
                                    borderColor: dark ? COLORS.greyscale600 : COLORS.greyscale300,
                                }}
                            >
                                <Text
                                    style={[
                                        styles.body,
                                        {
                                            flex: 1,
                                            color: dark ? COLORS.secondaryWhite : COLORS.greyscale900,
                                            borderRightWidth: 1,
                                            borderColor: dark ? COLORS.greyscale600 : COLORS.greyscale300,
                                            paddingRight: 8,
                                        },
                                    ]}
                                >
                                    {row.type}
                                </Text>
                                <Text
                                    style={[
                                        styles.body,
                                        {
                                            flex: 1,
                                            color: dark ? COLORS.secondaryWhite : COLORS.greyscale900,
                                            borderRightWidth: 1,
                                            borderColor: dark ? COLORS.greyscale600 : COLORS.greyscale300,
                                            paddingHorizontal: 8,
                                        },
                                    ]}
                                >
                                    {row.time}
                                </Text>
                                <Text
                                    style={[
                                        styles.body,
                                        { flex: 1, color: dark ? COLORS.secondaryWhite : COLORS.greyscale900, paddingLeft: 8 },
                                    ]}
                                >
                                    {row.cost}
                                </Text>
                            </View>
                        ))}

                        <Text
                            style={[
                                styles.body,
                                {
                                    fontStyle: 'italic',
                                    color: dark ? COLORS.secondaryWhite : COLORS.greyscale900,
                                    marginTop: 6,
                                },
                            ]}
                        >
                            {t('deliveryPolicy.section3.note')}
                        </Text>




                        <Text style={[styles.settingsTitle, { color: dark ? COLORS.white : COLORS.black }]}>
                            {t('deliveryPolicy.section4.title')}
                        </Text>
                        <Text style={[styles.body, { flex: 1, color: dark ? COLORS.secondaryWhite : COLORS.greyscale900 }]}>
                            {t('deliveryPolicy.section4.description')}
                        </Text>
                        <View style={{ flexDirection: 'row', alignItems: 'flex-start', marginVertical: 4 }}>
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
                                {t('deliveryPolicy.section4.point1')}
                            </Text>
                        </View>

                        <View style={{ flexDirection: 'row', alignItems: 'flex-start', marginVertical: 4 }}>
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
                                {t('deliveryPolicy.section4.point2')}
                            </Text>
                        </View>


                        <Text style={[styles.settingsTitle, { color: dark ? COLORS.white : COLORS.black }]}>
                            {t('deliveryPolicy.section5.title')}
                        </Text>
                        <Text style={[styles.body, { flex: 1, color: dark ? COLORS.secondaryWhite : COLORS.greyscale900 }]}>
                            {t('deliveryPolicy.section5.description')}
                        </Text>
                        <View style={{ flexDirection: 'row', alignItems: 'flex-start', marginVertical: 4 }}>
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
                                {t('deliveryPolicy.section5.point1')}
                            </Text>
                        </View>
                        <View style={{ flexDirection: 'row', alignItems: 'flex-start', marginVertical: 4 }}>
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
                                {t('deliveryPolicy.section5.point2')}
                            </Text>
                        </View>
                        <View style={{ flexDirection: 'row', alignItems: 'flex-start', marginVertical: 4 }}>
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
                                {t('deliveryPolicy.section5.point3')}
                            </Text>
                        </View>
                        <Text style={[styles.body, { flex: 1, color: dark ? COLORS.secondaryWhite : COLORS.greyscale900 }]}>
                            {t('deliveryPolicy.section5.note')}
                        </Text>

                        <Text style={[styles.settingsTitle, { color: dark ? COLORS.white : COLORS.black }]}>
                            {t('deliveryPolicy.section6.title')}
                        </Text>
                        <View style={{ flexDirection: 'row', alignItems: 'flex-start', marginVertical: 4 }}>
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
                                {t('deliveryPolicy.section6.point1')}
                            </Text>
                        </View>
                        <View style={{ flexDirection: 'row', alignItems: 'flex-start', marginVertical: 4 }}>
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
                                {t('deliveryPolicy.section6.point2')}
                            </Text>
                        </View>


                        <Text style={[styles.settingsTitle, { color: dark ? COLORS.white : COLORS.black }]}>
                            {t('deliveryPolicy.section7.title')}
                        </Text>
                        <View style={{ flexDirection: 'row', alignItems: 'flex-start', marginVertical: 4 }}>
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
                                {t('deliveryPolicy.section7.point1')}
                            </Text>
                        </View>
                        <View style={{ flexDirection: 'row', alignItems: 'flex-start', marginVertical: 4 }}>
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
                                {t('deliveryPolicy.section7.point2')}
                            </Text>
                        </View>


                        <Text style={[styles.settingsTitle, { color: dark ? COLORS.white : COLORS.black }]}>
                            {t('deliveryPolicy.section8.title')}
                        </Text>
                        <Text style={[styles.body, { flex: 1, color: dark ? COLORS.secondaryWhite : COLORS.greyscale900 }]}>
                            {t('deliveryPolicy.section8.description')}
                        </Text>
                        <View style={{ flexDirection: 'row', alignItems: 'flex-start', marginVertical: 4 }}>
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
                                {t('deliveryPolicy.section8.point1')}
                            </Text>
                        </View>
                        <View style={{ flexDirection: 'row', alignItems: 'flex-start', marginVertical: 4 }}>
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
                                {t('deliveryPolicy.section8.point2')}
                            </Text>
                        </View>
                        <View style={{ flexDirection: 'row', alignItems: 'flex-start', marginVertical: 4 }}>
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
                                {t('deliveryPolicy.section8.point3')}
                            </Text>
                        </View>


                        <Text style={[styles.settingsTitle, { color: dark ? COLORS.white : COLORS.black }]}>
                            {t('deliveryPolicy.section9.title')}
                        </Text>
                        <Text
                            style={[
                                styles.body,
                                { marginTop: 10 },
                                { color: dark ? COLORS.secondaryWhite : COLORS.greyscale900 },
                            ]}
                        >
                            {t('deliveryPolicy.section9.email')}
                        </Text>
                        <Text
                            style={[
                                styles.body,
                                { marginTop: 10 },
                                { color: dark ? COLORS.secondaryWhite : COLORS.greyscale900 },
                            ]}
                        >
                            {t('deliveryPolicy.section9.phone')}
                        </Text>
                        <Text
                            style={[
                                styles.body,
                                { marginTop: 10 },
                                { color: dark ? COLORS.secondaryWhite : COLORS.greyscale900 },
                            ]}
                        >
                            {t('deliveryPolicy.section9.address')}
                        </Text>
                        <Text
                            style={[
                                styles.body,
                                { marginTop: 10 },
                                { color: dark ? COLORS.secondaryWhite : COLORS.greyscale900 },
                            ]}
                        >
                            🌐 www.nbsgroups.com
                        </Text>
                        <Text style={[styles.body, { marginTop: 20 }, { flex: 1, color: dark ? COLORS.secondaryWhite : COLORS.greyscale900 }]}>
                            <Text style={{ fontWeight: 900 }}>{t('deliveryPolicy.footer1')}</Text>
                            {t('deliveryPolicy.footer')}
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

export default SettingsDeliveryPolicy;
