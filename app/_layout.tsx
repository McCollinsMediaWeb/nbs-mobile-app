// import { FONTS } from '@/constants/fonts';
// import { ThemeProvider } from '@/theme/ThemeProvider';
// import { useFonts } from 'expo-font';
// import { Stack } from 'expo-router';
// import * as SplashScreen from 'expo-splash-screen';
// import { useEffect, useState } from 'react';
// import { LogBox } from 'react-native';
// import 'react-native-reanimated';

// import initI18n from '@/lang/i18n';
// import { persistor, store } from '@/utils/store'; // adjust this path if needed
// import { SafeAreaProvider } from 'react-native-safe-area-context';
// import { Provider } from 'react-redux';
// import { PersistGate } from 'redux-persist/integration/react';


// // Prevent the splash screen from auto-hiding before asset loading is complete.
// SplashScreen.preventAutoHideAsync();

// //Ignore all log notifications
// LogBox.ignoreAllLogs();

// export default function RootLayout() {
//   const [loaded] = useFonts(FONTS);
//   const [i18nLoaded, setI18nLoaded] = useState(false);

//   useEffect(() => {
//     const prepareApp = async () => {
//       await initI18n(); // waits for i18n to initialize
//       setI18nLoaded(true);
//     };
//     prepareApp();
//   }, []);

//   useEffect(() => {
//     if (loaded && i18nLoaded) {
//       SplashScreen.hideAsync();
//     }
//   }, [loaded, i18nLoaded]);

//   if (!loaded || !i18nLoaded) {
//     return null;
//   }

//   return (
//     <Provider store={store}>
//       <PersistGate loading={null} persistor={persistor}>
//         <SafeAreaProvider>
//           <ThemeProvider>
//             <Stack screenOptions={{ headerShown: false }}>
//               <Stack.Screen name="index" />
//               <Stack.Screen name="addnewaddress" />
//               <Stack.Screen name="address" />
//               <Stack.Screen name="productdetails" />
//               {/* <Stack.Screen name="changeemail" /> */}
//               {/* <Stack.Screen name="changepassword" /> */}
//               <Stack.Screen name="checkout" />
//               <Stack.Screen name="fillyourprofile" />
//               <Stack.Screen name="forgotpasswordemail" />
//               <Stack.Screen name="forgotpasswordmethods" />
//               <Stack.Screen name="forgotpasswordphonenumber" />
//               <Stack.Screen name="login" />
//               <Stack.Screen name="mywishlist" />
//               <Stack.Screen name="onboarding" />
//               <Stack.Screen name="search" />
//               <Stack.Screen name="selectshippingaddress" />
//               <Stack.Screen name="settingshelpcenter" />
//               <Stack.Screen name="settingslanguage" />
//               <Stack.Screen name="settingsprivacypolicy" />
//               <Stack.Screen name="signup" />
//               <Stack.Screen name="welcome" />
//               <Stack.Screen name="(tabs)" />
//               <Stack.Screen name="+not-found" />
//             </Stack>
//           </ThemeProvider>
//         </SafeAreaProvider>
//       </PersistGate>
//     </Provider>
//   );
// }



import { FONTS } from '@/constants/fonts';
import initI18n, { i18n } from '@/lang/i18n';
import { ThemeProvider } from '@/theme/ThemeProvider';
import { persistor, store } from '@/utils/store'; // adjust this path if needed
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect, useState } from 'react';
import { I18nextProvider } from 'react-i18next';
import { LogBox } from 'react-native';
import 'react-native-reanimated';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';


// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

//Ignore all log notifications
LogBox.ignoreAllLogs();

export default function RootLayout() {
  const [loaded] = useFonts(FONTS);
  const [i18nLoaded, setI18nLoaded] = useState(false);

  useEffect(() => {
    const prepareApp = async () => {
      await initI18n(); // waits for i18n to initialize
      setI18nLoaded(true);
    };
    prepareApp();
  }, []);

  useEffect(() => {
    GoogleSignin.configure({
      webClientId: "718209129465-7msnbbuimc59gsntph4o9drd9n7ikikm.apps.googleusercontent.com",
      iosClientId: "718209129465-kl54tsra6p0glvmi6ofg3u6dq53ptpsg.apps.googleusercontent.com",
      scopes: ["profile", "email"],
    });
  }, [])

  useEffect(() => {
    if (loaded && i18nLoaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded, i18nLoaded]);

  if (!loaded || !i18nLoaded) {
    return null;
  }

  return (
    <I18nextProvider i18n={i18n}>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <SafeAreaProvider>
            <ThemeProvider>
              <Stack screenOptions={{ headerShown: false }}>
                <Stack.Screen name="index" />
                <Stack.Screen name="addnewaddress" />
                <Stack.Screen name="aboutus" />
                <Stack.Screen name="address" />
                {/* <Stack.Screen name="allproducts" /> */}
                <Stack.Screen name="productdetails" />
                <Stack.Screen name="bulkorderform" />
                <Stack.Screen name="ourgallery" />
                <Stack.Screen name="cart" />
                <Stack.Screen name="checkout" />
                <Stack.Screen name="collectionscreen" />
                <Stack.Screen name="fillyourprofile" />
                <Stack.Screen name="forgotpasswordemail" />
                <Stack.Screen name="forgotpasswordmethods" />
                <Stack.Screen name="forgotpasswordphonenumber" />
                <Stack.Screen name="login" />
                <Stack.Screen name="mywishlist" />
                <Stack.Screen name="onboarding" />
                <Stack.Screen name="search" />
                <Stack.Screen name="selectshippingaddress" />
                <Stack.Screen name="settingshelpcenter" />
                <Stack.Screen name="settingslanguage" />
                <Stack.Screen name="settingsprivacypolicy" />
                <Stack.Screen name="signup" />
                <Stack.Screen name="welcome" />
                <Stack.Screen name="(tabs)" />
                <Stack.Screen name="+not-found" />
              </Stack>
            </ThemeProvider>
          </SafeAreaProvider>
        </PersistGate>
      </Provider>
    </I18nextProvider>
  );
}