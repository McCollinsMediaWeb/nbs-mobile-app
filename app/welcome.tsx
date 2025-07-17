import Button from "@/components/Button";
import { useAppDispatch } from "@/hooks/useAppDispatch";
import { changeOnboardStatus } from "@/utils/actions/generalSettingsActions";
import { useNavigation } from "expo-router";
import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import SocialButtonV2 from "../components/SocialButtonV2";
import { COLORS, SIZES, icons, illustrations } from "../constants";
import { useTheme } from "../theme/ThemeProvider";

type Nav = {
    navigate: (value: string) => void
}

// welcome screen
const Welcome = () => {
    const { navigate } = useNavigation<Nav>();
    const { colors, dark } = useTheme();
    const dispatch = useAppDispatch();
    const { t } = useTranslation();

    useEffect(() => {
        dispatch(changeOnboardStatus(true))
    }, [])

    return (
        <SafeAreaView style={[styles.area, { backgroundColor: colors.background }]}>
            <View style={[styles.container, { backgroundColor: colors.background }]}>
                <Image source={dark ? illustrations.welcomeDark : illustrations.welcome} resizeMode="contain" style={styles.logo} />
                <Text style={[styles.title, { color: colors.text }]}>{t('welcome.title')}</Text>
                <View style={{ marginVertical: 22 }}>
                    {/* <SocialButtonV2 title="Continue with Facebook" icon={icons.facebook} onPress={() => navigate("signup")} /> */}
                    <SocialButtonV2 title={t('welcome.continueWithGoogle')} icon={icons.google} onPress={() => navigate("login")} />
                    {/* <SocialButtonV2 title="Continue with Apple" icon={icons.appleLogo} onPress={() => navigate("signup")}
                        iconStyles={{ tintColor: dark ? COLORS.white : COLORS.black }} /> */}
                </View>
                <View style={styles.lineContainer}>
                    <View style={[styles.line, { backgroundColor: dark ? COLORS.greyScale800 : COLORS.grayscale200 }]} />
                    <Text style={[styles.text, { color: dark ? COLORS.white : COLORS.grayscale700 }]}>{t('welcome.or')}</Text>
                    <View style={[styles.line, { backgroundColor: dark ? COLORS.greyScale800 : COLORS.grayscale200 }]} />
                </View>
                <Button
                    title={t('welcome.signInWithEmail')}
                    onPress={() => navigate("login")}
                    textColor={dark ? "#101010" : COLORS.white}
                    style={{
                        width: "100%",
                        marginVertical: 22,
                        // backgroundColor: dark ? COLORS.white : COLORS.primary
                        backgroundColor: COLORS.primaryRed
                    }}
                />
                <Button
                    title={t('welcome.continueAsGuest')}
                    onPress={() => navigate("(tabs)")}
                    textColor={dark ? "#101010" : COLORS.white}
                    style={{
                        width: "100%",
                        // backgroundColor: dark ? COLORS.white : COLORS.primary
                        backgroundColor: COLORS.primaryRed
                    }}
                />
                <View style={{ flexDirection: "row", marginTop: 22 }}>
                    <Text style={[styles.loginTitle, {
                        color: dark ? COLORS.white : "black"
                    }]}>{t('welcome.dontHaveAccount')}</Text>
                    <TouchableOpacity
                        onPress={() => navigate("signup")}>
                        <Text style={[styles.loginSubtitle, {
                            color: dark ? COLORS.white : COLORS.primary
                        }]}>{"  "}{t('welcome.signUp')}</Text>
                    </TouchableOpacity>
                </View>
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
        alignItems: "center",
        justifyContent: "center",
    },
    logo: {
        width: 237,
        height: 200,
        marginBottom: 22,
        marginTop: -22,
    },
    title: {
        fontSize: 32,
        fontFamily: "bold",
        color: COLORS.black,
        textAlign: "center",
    },
    subtitle: {
        fontSize: 12,
        fontFamily: "regular",
        color: "black",
        textAlign: "center",
        paddingHorizontal: 16,
    },
    loginTitle: {
        fontSize: 14,
        fontFamily: "regular",
        color: "black",
    },
    loginSubtitle: {
        fontSize: 14,
        fontFamily: "bold",
        color: COLORS.primary,
    },
    bottomContainer: {
        position: "absolute",
        bottom: 32,
        right: 0,
        left: 0,
        width: SIZES.width - 32,
        alignItems: "center",
    },
    bottomTitle: {
        fontSize: 12,
        fontFamily: "regular",
        color: COLORS.black,
    },
    bottomSubtitle: {
        fontSize: 12,
        fontFamily: "regular",
        color: COLORS.black,
        textDecorationLine: "underline",
        marginTop: 2,
    },
    lineContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    line: {
        flex: 1,
        height: 1,
        backgroundColor: COLORS.grayscale200,
    },
    text: {
        marginHorizontal: 10,
        color: COLORS.grayscale700,
        fontSize: 18,
        fontFamily: "semiBold"
    },
});

export default Welcome;