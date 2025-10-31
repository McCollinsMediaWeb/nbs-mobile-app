import Button from '@/components/Button';
import ButtonFilled from '@/components/ButtonFilled';
import SettingsItem from '@/components/SettingsItem';
import { COLORS, icons, images, SIZES } from '@/constants';
import { useAppDispatch } from '@/hooks/useAppDispatch';
import { useAppSelector } from '@/hooks/useAppSelector';
import { useTheme } from '@/theme/ThemeProvider';
import { logoutCustomer } from '@/utils/actions/userActions';
import { launchImagePicker } from '@/utils/ImagePickerHelper';
import { normalizeFont } from '@/utils/normalizeFont';
import { useNavigation } from 'expo-router';
import i18next from 'i18next';
import React, { useRef, useState } from 'react';
import { Image, StyleSheet, Switch, Text, TouchableOpacity, View } from 'react-native';
import RBSheet from 'react-native-raw-bottom-sheet';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ScrollView } from 'react-native-virtualized-view';

type Nav = {
  navigate: (value: string) => void
}

const Profile = () => {
  const refRBSheet = useRef<any>(null);
  const { dark, colors, setScheme } = useTheme();
  const { navigate } = useNavigation<Nav>();
  const dispatch = useAppDispatch();
  const user = useAppSelector(state => state.user);
  const appLanguage = useAppSelector(state => state.generalSettings.language);
  // const { t } = useTranslation();
  const { t } = i18next;
  // const [selectedLanguage, setSelectedLanguage] = useState<string>('en');

  // useEffect(() => {
  //   const loadLanguage = async () => {
  //     const lang = await AsyncStorage.getItem('language');
  //     if (lang) setSelectedLanguage(lang);
  //   };
  //   loadLanguage();
  // }, []);

  // console.log("setSelectedLanguage", selectedLanguage)

  /**
   * Render header
   */
  const renderHeader = () => {
    return (
      <View style={styles.headerContainer}>
        <View style={styles.headerLeft}>
          <TouchableOpacity onPress={() => navigate("index")}>
            <Image
              // source={icons.back2}
              source={appLanguage === "ar" ? icons.rightArrow : icons.back2}
              resizeMode="contain"
              style={[styles.logo, { tintColor: dark ? COLORS.white : COLORS.primary }]}
            />
          </TouchableOpacity>
          <Text style={[styles.headerTitle, {
            color: dark ? COLORS.white : COLORS.greyscale900
          }]}>{t('profile.title')}</Text>
        </View>
        {/* <TouchableOpacity>
          <Image
            source={icons.moreCircle}
            resizeMode='contain'
            style={[styles.headerIcon, {
              tintColor: dark ? COLORS.secondaryWhite : COLORS.greyscale900
            }]}
          />
        </TouchableOpacity> */}
      </View>
    )
  }
  /**
   * Render User Profile
   */
  const renderProfile = () => {
    const [image, setImage] = useState(null)

    const pickImage = async () => {
      try {
        const tempUri = await launchImagePicker()

        if (!tempUri) return

        // Set the image
        // setImage({ uri: tempUri })
      } catch (error) { }
    };

    return (
      <View style={styles.profileContainer}>
        <View>
          <Image
            // source={dark ? images.noUserWhite : images.noUser}
            source={images.nbsLogo2}
            // resizeMode='cover'
            style={styles.avatar}
          />
          {/* <TouchableOpacity
            onPress={pickImage}
            style={styles.picContainer}>
            <MaterialIcons name="edit" size={16} color={COLORS.white} />
          </TouchableOpacity> */}
        </View>
        <Text style={[styles.title, { color: dark ? COLORS.secondaryWhite : COLORS.greyscale900 }]}>
          {user?.accessToken
            ? `${user.customer?.firstName ?? ''} ${user.customer?.lastName ?? ''}`.trim()
            : t('profile.guestUser')}
        </Text>

        <Text style={[styles.subtitle, { color: dark ? COLORS.secondaryWhite : COLORS.greyscale900 }]}>
          {user?.accessToken
            ? user.customer?.email ?? "No email provided"
            : t('profile.note')}
        </Text>

      </View>
    )
  }
  /**
   * Render Settings
   */
  const renderSettings = () => {
    const [isDarkMode, setIsDarkMode] = useState(false);

    const toggleDarkMode = () => {
      // setIsDarkMode((prev) => !prev);
      dark ? setScheme('light') : setScheme('dark')
    };

    return (
      <View style={styles.settingsContainer}>
        <SettingsItem
          icon={icons.cartOutline}
          name={t('profile.setting1.title')}
          onPress={() => navigate("cart")}
        />
        <SettingsItem
          icon={icons.heart2Outline}
          name={t('profile.setting2.title')}
          onPress={() => navigate("mywishlist")}
        />
        {/* <SettingsItem
          icon={icons.chatBubble2Outline}
          name="Inbox"
          onPress={() => navigate("inbox")}
        /> */}
        {/* <SettingsItem
          icon={icons.bell3}
          name="My Notification"
          onPress={() => navigate("notifications")}
        /> */}
        {user?.accessToken && (
          <SettingsItem
            icon={icons.location2Outline}
            name={t('profile.setting3.title')}
            onPress={() => navigate("address")}
          />
        )}

        {/* <SettingsItem
          icon={icons.userOutline}
          name="Edit Profile"
          onPress={() => navigate("editprofile")}
        /> */}
        {/* <SettingsItem
          icon={icons.bell2}
          name="Notification"
          onPress={() => navigate("settingsnotifications")}
        /> */}
        {/* <SettingsItem
          icon={icons.wallet2Outline}
          name="Payment"
          onPress={() => navigate("settingspayment")}
        /> */}
        {/* <SettingsItem
          icon={icons.shieldOutline}
          name="Security"
          onPress={() => navigate("settingssecurity")}
        /> */}
        <TouchableOpacity
          onPress={() => navigate("settingslanguage")}
          style={styles.settingsItemContainer}>
          <View style={styles.leftContainer}>
            <Image
              source={icons.world2}
              resizeMode='contain'
              style={[styles.settingsIcon, {
                tintColor: dark ? COLORS.white : COLORS.greyscale900
              }]}
            />
            <Text style={[styles.settingsName, {
              color: dark ? COLORS.white : COLORS.greyscale900
            }]}>{t('profile.setting4.title')}</Text>
          </View>
          <View style={styles.rightContainer}>
            <Text style={[styles.rightLanguage, {
              color: dark ? COLORS.white : COLORS.greyscale900
            }]}>{appLanguage === "ar" ? "العربية" : appLanguage === "fr" ? "Français" : "English (US)"}</Text>
            <Image
              // source={icons.arrowRight}
              source={appLanguage === "ar" ? icons.arrowLeft2 : icons.arrowRight}
              resizeMode='contain'
              style={[styles.settingsArrowRight, {
                tintColor: dark ? COLORS.white : COLORS.greyscale900
              }]}
            />
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.settingsItemContainer}>
          <View style={styles.leftContainer}>
            <Image
              source={icons.show}
              resizeMode='contain'
              style={[styles.settingsIcon, {
                tintColor: dark ? COLORS.white : COLORS.greyscale900
              }]}
            />
            <Text style={[styles.settingsName, {
              color: dark ? COLORS.white : COLORS.greyscale900
            }]}>{t('profile.setting5.title')}</Text>
          </View>
          <View style={styles.rightContainer}>
            {/* <Switch
              value={isDarkMode}
              onValueChange={toggleDarkMode}
              thumbColor={isDarkMode ? '#fff' : COLORS.white}
              trackColor={{ false: '#EEEEEE', true: COLORS.primary }}
              ios_backgroundColor={COLORS.white}
              style={styles.switch}
            /> */}
            <Switch
              value={dark}
              onValueChange={toggleDarkMode}
              thumbColor={dark ? '#fff' : COLORS.white}
              trackColor={{ false: '#EEEEEE', true: COLORS.primary }}
              ios_backgroundColor={COLORS.white}
              style={styles.switch}
            />
          </View>
        </TouchableOpacity>
        <SettingsItem
          icon={icons.lockedComputerOutline}
          name={t('profile.setting6.title')}
          onPress={() => navigate("settingsprivacypolicy")}
        />
        <SettingsItem
          icon={icons.infoCircle}
          name={t('profile.setting7.title')}
          onPress={() => navigate("settingshelpcenter")}
        />
        {/* <SettingsItem
          icon={icons.people4}
          name="Invite Friends"
          onPress={() => navigate("settingsinvitefriends")}
        /> */}
        {user?.accessToken ? (
          <TouchableOpacity
            onPress={() => refRBSheet.current.open()}
            style={styles.logoutContainer}>
            <View style={styles.logoutLeftContainer}>
              <Image
                source={icons.logout}
                resizeMode='contain'
                style={[styles.logoutIcon, {
                  tintColor: "red"
                }]}
              />
              <Text style={[styles.logoutName, {
                color: "red"
              }]}>{t('profile.setting8.title2')}</Text>
            </View>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            onPress={() => navigate('login')}
            style={styles.logoutContainer}>
            <View style={styles.logoutLeftContainer}>
              <Image
                source={icons.logout}
                resizeMode='contain'
                style={[styles.logoutIcon, {
                  tintColor: "red"
                }]}
              />
              <Text style={[styles.logoutName, {
                color: "red"
              }]}>{t('profile.setting8.title')}</Text>
            </View>
          </TouchableOpacity>
        )}

      </View>
    )
  }

  const handleLogout = () => {
    dispatch(logoutCustomer());
    refRBSheet.current.close()
    navigate('login')
  };
  return (
    <SafeAreaView style={[styles.area, { backgroundColor: colors.background }]}>
      <View style={[styles.container, { backgroundColor: colors.background }]}>
        {renderHeader()}
        <ScrollView showsVerticalScrollIndicator={false}>
          {renderProfile()}
          {renderSettings()}
        </ScrollView>
      </View>
      <RBSheet
        ref={refRBSheet}
        closeOnPressMask={true}
        height={SIZES.height * .8}
        customStyles={{
          wrapper: {
            backgroundColor: "rgba(0,0,0,0.5)",
          },
          draggableIcon: {
            backgroundColor: dark ? COLORS.gray2 : COLORS.grayscale200,
            height: 4
          },
          container: {
            borderTopRightRadius: 32,
            borderTopLeftRadius: 32,
            height: 260,
            backgroundColor: dark ? COLORS.dark2 : COLORS.white
          }
        }}
      >
        <Text style={styles.bottomTitle}>{t('profile.sheet.title')}</Text>
        <View style={[styles.separateLine, {
          backgroundColor: dark ? COLORS.greyScale800 : COLORS.grayscale200,
        }]} />
        <Text style={[styles.bottomSubtitle, {
          color: dark ? COLORS.white : COLORS.black
        }]}>{t('profile.sheet.subTitle')}</Text>
        <View style={styles.bottomContainer}>
          <Button
            title={t('profile.sheet.button2')}
            style={{
              width: (SIZES.width - 32) / 2 - 8,
              backgroundColor: dark ? COLORS.dark3 : COLORS.tansparentPrimary,
              borderRadius: 32,
              borderColor: dark ? COLORS.dark3 : COLORS.tansparentPrimary
            }}
            textColor={dark ? COLORS.white : COLORS.primary}
            onPress={() => refRBSheet.current.close()}
          />
          <ButtonFilled
            title={t('profile.sheet.button1')}
            style={styles.logoutButton}
            // onPress={() => refRBSheet.current.close()}
            onPress={handleLogout}
          />
        </View>
      </RBSheet>
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
    padding: 16,
    // marginBottom: 32
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
  logo: {
    height: 32,
    // width: 32,
    width: SIZES.width * 0.05,
    tintColor: COLORS.primary
  },
  headerTitle: {
    fontSize: normalizeFont(22),
    fontFamily: "bold",
    color: COLORS.greyscale900,
    marginLeft: 12
  },
  headerIcon: {
    height: 24,
    width: 24,
    tintColor: COLORS.greyscale900
  },
  profileContainer: {
    alignItems: "center",
    borderBottomColor: COLORS.grayscale400,
    borderBottomWidth: .4,
    paddingVertical: 20
  },
  avatar: {
    width: 120,
    height: SIZES.height * 0.1,
    borderRadius: 999,
    objectFit: "contain"
  },
  picContainer: {
    width: 20,
    height: 20,
    borderRadius: 4,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: COLORS.primary,
    position: "absolute",
    right: 0,
    bottom: 12
  },
  title: {
    fontSize: 18,
    fontFamily: "bold",
    color: COLORS.greyscale900,
    marginTop: 12
  },
  subtitle: {
    fontSize: 16,
    color: COLORS.greyscale900,
    fontFamily: "medium",
    marginTop: 4
  },
  settingsContainer: {
    marginVertical: 12
  },
  settingsItemContainer: {
    width: SIZES.width - 32,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginVertical: 17
  },
  leftContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  settingsIcon: {
    height: 24,
    width: 24,
    tintColor: COLORS.greyscale900
  },
  settingsName: {
    fontSize: normalizeFont(18),
    fontFamily: "semiBold",
    color: COLORS.greyscale900,
    marginLeft: 12
  },
  settingsArrowRight: {
    width: 24,
    height: 24,
    tintColor: COLORS.greyscale900
  },
  rightContainer: {
    flexDirection: "row",
    alignItems: "center"
  },
  rightLanguage: {
    fontSize: normalizeFont(18),
    fontFamily: "semiBold",
    color: COLORS.greyscale900,
    marginRight: 8
  },
  switch: {
    marginLeft: 8,
    transform: [{ scaleX: .8 }, { scaleY: .8 }], // Adjust the size of the switch
  },
  logoutContainer: {
    width: SIZES.width - 32,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginVertical: 12
  },
  logoutLeftContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  logoutIcon: {
    height: 24,
    width: 24,
    tintColor: COLORS.greyscale900
  },
  logoutName: {
    fontSize: normalizeFont(18),
    fontFamily: "semiBold",
    color: COLORS.greyscale900,
    marginLeft: 12
  },
  bottomContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginVertical: 12,
    paddingHorizontal: 16
  },
  cancelButton: {
    width: (SIZES.width - 32) / 2 - 8,
    backgroundColor: COLORS.tansparentPrimary,
    borderRadius: 32
  },
  logoutButton: {
    width: (SIZES.width - 32) / 2 - 8,
    // backgroundColor: COLORS.primary,
    backgroundColor: COLORS.primaryRed,
    borderRadius: 32
  },
  bottomTitle: {
    fontSize: 24,
    fontFamily: "semiBold",
    color: "red",
    textAlign: "center",
    marginTop: 12
  },
  bottomSubtitle: {
    fontSize: 20,
    fontFamily: "semiBold",
    color: COLORS.greyscale900,
    textAlign: "center",
    marginVertical: 28
  },
  separateLine: {
    width: SIZES.width,
    height: 1,
    backgroundColor: COLORS.grayscale200,
    marginTop: 12
  },
  userIcon: {
    width: 28,
    height: 38,
  },
})

export default Profile