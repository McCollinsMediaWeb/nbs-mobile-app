import HelpCenterItem from '@/components/HelpCenterItem';
import { useAppSelector } from '@/hooks/useAppSelector';
import { normalizeFont } from '@/utils/normalizeFont';
import { NavigationProp } from '@react-navigation/native';
import { useNavigation } from 'expo-router';
import i18next, { t } from 'i18next';
import React, { useState } from 'react';
import { Image, LayoutAnimation, Linking, StyleSheet, Text, TouchableOpacity, View, useWindowDimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { SceneMap, TabBar, TabView } from 'react-native-tab-view';
import { ScrollView } from 'react-native-virtualized-view';
import { COLORS, SIZES, icons } from '../constants';
import { faqKeywords, useFaqs } from '../data';
import { useTheme } from '../theme/ThemeProvider';

interface KeywordItemProps {
    item: {
        id: string;
        name: string;
    };
    onPress: (id: string) => void;
    selected: boolean;
}


interface TabRoute {
    key: string;
    title: string;
}

interface RenderLabelProps {
    route: TabRoute;
    focused: boolean;
}

const faqsRoute = () => {
    const [selectedKeywords, setSelectedKeywords] = useState<any>([]);
    const [expanded, setExpanded] = useState(-1);
    const [searchText, setSearchText] = useState('');
    const faqs = useFaqs();
    const { dark } = useTheme();

    const handleKeywordPress = (id: any) => {
        setSelectedKeywords((prevSelectedKeywords: any) => {
            const selectedKeyword = faqKeywords.find((keyword) => keyword.id === id);

            if (!selectedKeyword) {
                // Handle the case where the keyword with the provided id is not found
                return prevSelectedKeywords;
            }

            if (prevSelectedKeywords.includes(selectedKeyword.name)) {
                return prevSelectedKeywords.filter((keyword: any) => keyword !== selectedKeyword.name);
            } else {
                return [...prevSelectedKeywords, selectedKeyword.name];
            }
        });
    };


    const KeywordItem: React.FC<KeywordItemProps> = ({ item, onPress, selected }) => {
        return (
            <TouchableOpacity style={[{
                paddingHorizontal: 14,
                marginHorizontal: 5,
                borderRadius: 21,
                height: 39,
                justifyContent: 'center',
                alignItems: 'center',
                borderColor: COLORS.primary,
                borderWidth: 1,
                backgroundColor: selected ? COLORS.primary : dark ? COLORS.dark3 : "transparent",
            }]} onPress={() => onPress(item.id)}>
                <Text style={{ color: selected ? COLORS.white : dark ? COLORS.white : COLORS.primary }}>
                    {item.name}
                </Text>
            </TouchableOpacity>
        );
    };

    const toggleExpand = (index: any) => {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        setExpanded((prevExpanded) => (prevExpanded === index ? -1 : index));
    };

    return (
        <View>
            {/* <View style={{ marginVertical: 16 }}>
                <FlatList
                    data={faqKeywords}
                    horizontal
                    keyExtractor={(item) => item.id}
                    showsHorizontalScrollIndicator={false}
                    renderItem={({ item }) => (
                        <KeywordItem
                            item={item}
                            onPress={handleKeywordPress}
                            selected={selectedKeywords.includes(item.name)}
                        />
                    )}
                />
            </View> */}
            {/* <View
                style={[
                    styles.searchBar,
                    {
                        backgroundColor: dark ? COLORS.dark2 : COLORS.grayscale100,
                    },
                ]}>
                <TouchableOpacity>
                    <Image
                        source={icons.search}
                        resizeMode="contain"
                        style={[
                            styles.searchIcon,
                            {
                                tintColor: dark
                                    ? COLORS.greyscale600
                                    : COLORS.grayscale400,
                            },
                        ]}
                    />
                </TouchableOpacity>
                <TextInput
                    style={[
                        styles.input,
                        {
                            color: dark
                                ? COLORS.greyscale600
                                : COLORS.grayscale400,
                        },
                    ]}
                    placeholder="Search"
                    placeholderTextColor={
                        dark ? COLORS.greyscale600 : COLORS.grayscale400
                    }
                    value={searchText}
                    onChangeText={(text) => setSearchText(text)}
                />
            </View> */}
            <ScrollView
                showsVerticalScrollIndicator={false}
                style={{ marginVertical: 22 }}>
                {faqs
                    .filter((faq) => {
                        if (selectedKeywords.length === 0) return true;
                        return (
                            faq.type &&
                            selectedKeywords.includes(faq.type)
                        );
                    })
                    .filter((faq) =>
                        faq.question.toLowerCase().includes(searchText.toLowerCase())
                    )
                    .map((faq, index) => (
                        <View key={index} style={[styles.faqContainer, {
                            backgroundColor: dark ? COLORS.dark2 : COLORS.white,
                        }]}>
                            <TouchableOpacity
                                onPress={() => toggleExpand(index)}
                                activeOpacity={0.8}>
                                <View style={styles.questionContainer}>
                                    <Text style={[styles.question, {
                                        color: dark ? COLORS.white : COLORS.black,
                                    }]}>{faq.question}</Text>
                                    <Text style={[styles.icon, {
                                        color: dark ? COLORS.white : COLORS.black,
                                    }]}>
                                        {expanded === index ? '-' : '+'}
                                    </Text>
                                </View>
                            </TouchableOpacity>
                            {expanded === index && (
                                <Text style={[styles.answer, {
                                    color: dark ? COLORS.secondaryWhite : COLORS.gray2
                                }]}>{faq.answer}</Text>
                            )}
                        </View>
                    ))}
            </ScrollView>
        </View>
    );
};



const contactUsRoute = () => {
    const navigation = useNavigation<NavigationProp<any>>();
    const { dark } = useTheme();

    return (
        <View style={[styles.routeContainer, {
            backgroundColor: dark ? COLORS.dark1 : COLORS.white
        }]}>
            <HelpCenterItem
                icon={icons.headset}
                title={t("helpCenter.contactUs.callUs")}
                onPress={() => {
                    Linking.openURL("tel:+97142243543");
                }}
            />
            <HelpCenterItem
                icon={icons.emailOutline}
                title={t("helpCenter.contactUs.emailUs")}
                onPress={() => {
                    Linking.openURL("mailto:sales@nbsgroups.com");
                }}
            />
            <HelpCenterItem
                icon={icons.whatsapp}
                title={t("helpCenter.contactUs.whatsapp")}
                onPress={() => { Linking.openURL("https://api.whatsapp.com/send/?phone=971522346669&text=Hi%2C+I+would+like+to+know+more+about+your+products&type=phone_number&app_absent=0") }}
            />
            <HelpCenterItem
                icon={icons.world}
                title={t("helpCenter.contactUs.website")}
                onPress={() => { Linking.openURL("https://nbsgroups.com/") }}
            />
            <HelpCenterItem
                icon={icons.facebook2}
                title={t("helpCenter.contactUs.facebook")}
                onPress={() => { Linking.openURL("https://www.facebook.com/profile.php?id=61580402905873") }}
            />
            {/* <HelpCenterItem
                icon={icons.twitter}
                title="Twitter"
                onPress={() => console.log("Twitter")}
            /> */}
            <HelpCenterItem
                icon={icons.instagram}
                title={t("helpCenter.contactUs.instagram")}
                onPress={() => { Linking.openURL("https://www.instagram.com/nbs__global/?igsh=MWN2c3IwZGR0aGY0ZA%3D%3D&utm_source") }}
            />
        </View>
    )
}
const renderScene = SceneMap({
    first: faqsRoute,
    second: contactUsRoute,
});

const HelpCenter = () => {
    const navigation = useNavigation<NavigationProp<any>>();
    const layout = useWindowDimensions();
    const { dark, colors } = useTheme();
    const appLanguage = useAppSelector(state => state.generalSettings.language);
    const { t } = i18next;

    const [index, setIndex] = React.useState(0);
    const [routes] = React.useState([
        { key: 'first', title: t("helpCenter.contactUs.title") },
        { key: 'second', title: t("helpCenter.faqs.title") },
    ]);

    const renderTabBar = (props: any) => (
        <TabBar
            {...props}
            indicatorStyle={{
                backgroundColor: dark ? COLORS.white : COLORS.primary,
            }}
            style={{
                backgroundColor: dark ? COLORS.dark1 : COLORS.white,
            }}
            activeColor={dark ? COLORS.white : COLORS.primary}
            inactiveColor={dark ? COLORS.white : COLORS.greyscale900}
            renderLabel={({ route, focused }: RenderLabelProps) => (
                <Text style={[{
                    color: focused ? dark ? COLORS.white : COLORS.primary : 'gray',
                    fontSize: 16,
                    fontFamily: "bold"
                }]}>
                    {route.title}
                </Text>
            )}
        />
    )
    /**
     * Render header
     */
    const renderHeader = () => {
        return (
            <View style={styles.headerContainer}>
                <View style={styles.headerLeft}>
                    <TouchableOpacity
                        onPress={() => navigation.goBack()}>
                        <Image
                            source={icons.back}
                            resizeMode='contain'
                            style={[styles.backIcon,
                            appLanguage === 'ar' && { transform: [{ rotate: '180deg' }] }, {
                                tintColor: dark ? COLORS.white : COLORS.greyscale900
                            }]} />
                    </TouchableOpacity>
                    <Text style={[styles.headerTitle, {
                        color: dark ? COLORS.white : COLORS.greyscale900
                    }]}>{t("helpCenter.title")}</Text>
                </View>
                {/* <TouchableOpacity>
                    <Image
                        source={icons.moreCircle}
                        resizeMode='contain'
                        style={[styles.moreIcon, {
                            tintColor: dark ? COLORS.secondaryWhite : COLORS.greyscale900
                        }]}
                    />
                </TouchableOpacity> */}
            </View>
        )
    }
    return (
        <SafeAreaView style={[styles.area, { backgroundColor: colors.background }]}>
            <View style={[styles.container, { backgroundColor: colors.background }]}>
                {renderHeader()}
                <TabView
                    navigationState={{ index, routes }}
                    renderScene={renderScene}
                    onIndexChange={setIndex}
                    initialLayout={{ width: layout.width }}
                    renderTabBar={renderTabBar}
                />
            </View>
        </SafeAreaView>
    )
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
    headerContainer: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between"
    },
    headerLeft: {
        flexDirection: "row",
        alignItems: "center"
    },
    backIcon: {
        height: 24,
        width: 24,
        tintColor: COLORS.black,
        marginRight: 16
    },
    headerTitle: {
        fontSize: normalizeFont(24),
        fontFamily: "bold",
        color: COLORS.black
    },
    moreIcon: {
        width: 24,
        height: 24,
        tintColor: COLORS.black
    },
    routeContainer: {
        flex: 1,
        backgroundColor: COLORS.white,
        marginHorizontal: 10,
        paddingVertical: 22
    },
    searchBar: {
        width: SIZES.width - 32,
        height: 56,
        borderRadius: 16,
        backgroundColor: COLORS.grayscale100,
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 16
    },
    searchIcon: {
        width: 24,
        height: 24,
        tintColor: COLORS.grayscale400
    },
    input: {
        flex: 1,
        color: COLORS.grayscale400,
        marginHorizontal: 12
    },
    faqContainer: {
        marginBottom: 20,
        marginHorizontal: 10,
        backgroundColor: '#fff',
        borderRadius: 8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 1,
        elevation: 1,
    },
    questionContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 10,
        paddingHorizontal: 16,
    },
    question: {
        flex: 1,
        fontSize: normalizeFont(16),
        fontFamily: "semiBold",
        color: '#333',
    },
    icon: {
        fontSize: 18,
        color: COLORS.gray2,
    },
    answer: {
        fontSize: normalizeFont(15),
        lineHeight: 20,
        marginTop: 10,
        paddingHorizontal: 16,
        paddingBottom: 10,
        fontFamily: "regular",
        color: COLORS.gray2,
    },
})

export default HelpCenter