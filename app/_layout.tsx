import { FONTS } from '@/constants/fonts';
import { ThemeProvider } from '@/theme/ThemeProvider';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect, useState } from 'react';
import { LogBox } from 'react-native';
import 'react-native-reanimated';

import initI18n from '@/lang/i18n';
import { persistor, store } from '@/utils/store'; // adjust this path if needed
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
    if (loaded && i18nLoaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded, i18nLoaded]);

  if (!loaded || !i18nLoaded) {
    return null;
  }

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <SafeAreaProvider>
          <ThemeProvider>
            <Stack screenOptions={{ headerShown: false }}>
              <Stack.Screen name="index" />
              <Stack.Screen name="addnewaddress" />
              <Stack.Screen name="addnewcard" />
              <Stack.Screen name="addpromo" />
              <Stack.Screen name="address" />
              <Stack.Screen name="productdetails" />
              <Stack.Screen name="call" />
              <Stack.Screen name="cancelorder" />
              <Stack.Screen name="cancelorderpaymentmethods" />
              <Stack.Screen name="categories" />
              <Stack.Screen name="categorychair" />
              <Stack.Screen name="categorycupboard" />
              <Stack.Screen name="categorykitchen" />
              <Stack.Screen name="categorylamp" />
              <Stack.Screen name="categorysofa" />
              <Stack.Screen name="categorytable" />
              <Stack.Screen name="categoryvase" />
              <Stack.Screen name="changeemail" />
              <Stack.Screen name="changepassword" />
              <Stack.Screen name="changepin" />
              <Stack.Screen name="chat" />
              <Stack.Screen name="checkout" />
              <Stack.Screen name="checkoutsuccessful" />
              <Stack.Screen name="chooseshippingmethods" />
              <Stack.Screen name="tabledetails" />
              <Stack.Screen name="createnewpin" />
              <Stack.Screen name="createnewpassword" />
              <Stack.Screen name="customerservice" />
              <Stack.Screen name="editprofile" />
              <Stack.Screen name="chairdetails" />
              <Stack.Screen name="enteryourpin" />
              <Stack.Screen name="ereceipt" />
              <Stack.Screen name="fillyourprofile" />
              <Stack.Screen name="fingerprint" />
              <Stack.Screen name="forgotpasswordemail" />
              <Stack.Screen name="forgotpasswordmethods" />
              <Stack.Screen name="forgotpasswordphonenumber" />
              <Stack.Screen name="inbox" />
              <Stack.Screen name="cupboarddetails" />
              <Stack.Screen name="kitchendetails" />
              <Stack.Screen name="login" />
              <Stack.Screen name="mostpopularproducts" />
              <Stack.Screen name="mywishlist" />
              <Stack.Screen name="onboarding" />
              <Stack.Screen name="otpverification" />
              <Stack.Screen name="paymentmethods" />
              <Stack.Screen name="productereceipt" />
              <Stack.Screen name="productreviews" />
              <Stack.Screen name="search" />
              <Stack.Screen name="selectshippingaddress" />
              <Stack.Screen name="settingshelpcenter" />
              <Stack.Screen name="settingsinvitefriends" />
              <Stack.Screen name="settingslanguage" />
              <Stack.Screen name="settingsnotifications" />
              <Stack.Screen name="settingspayment" />
              <Stack.Screen name="settingsprivacypolicy" />
              <Stack.Screen name="settingssecurity" />
              <Stack.Screen name="lampdetails" />
              <Stack.Screen name="signup" />
              <Stack.Screen name="topupereceipt" />
              <Stack.Screen name="topupewalletamount" />
              <Stack.Screen name="topupewalletmethods" />
              <Stack.Screen name="trackorder" />
              <Stack.Screen name="transactionhistory" />
              <Stack.Screen name="videocall" />
              <Stack.Screen name="welcome" />
              <Stack.Screen name="(tabs)" />
              <Stack.Screen name="+not-found" />
            </Stack>
          </ThemeProvider>
        </SafeAreaProvider>
      </PersistGate>
    </Provider>
  );
}