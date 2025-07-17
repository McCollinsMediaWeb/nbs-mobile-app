import OrderListItem from '@/components/OrderListItem';
import { useAppDispatch } from '@/hooks/useAppDispatch';
import { useAppSelector } from '@/hooks/useAppSelector';
import { emptyCartThunk } from '@/utils/actions/cartActions';
import { updateSelectedAddress } from '@/utils/actions/selectedAddressActions';
import { createShopifyCheckoutUrl } from '@/utils/actions/shopifyCartActions';
import { NavigationProp } from '@react-navigation/native';
import { useNavigation } from 'expo-router';
import React, { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ActivityIndicator, FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { ScrollView } from 'react-native-virtualized-view';
import { WebView } from 'react-native-webview';
import ButtonFilled from '../components/ButtonFilled';
import HeaderWithSearch from '../components/HeaderWithSearch';
import { COLORS, SIZES, icons } from '../constants';
import { useTheme } from '../theme/ThemeProvider';

const Checkout = () => {
  const navigation = useNavigation<NavigationProp<any>>();
  const { colors, dark } = useTheme();
  const dispatch = useAppDispatch();
  const webViewRef = useRef<WebView>(null);
  const insets = useSafeAreaInsets();
  const cartItems = useAppSelector(state => state.cart.cartItems);
  const user = useAppSelector(state => state.user);
  const selectedAddress = useAppSelector(state => state.selectedAddress.selectedAddress);
  const checkoutUrl = useAppSelector(state => state.shopifyCart.checkoutUrl);
  const [totalPrice, setTotalPrice] = useState(0);
  const [showWebView, setShowWebView] = useState(false);
  const [isThankYouPage, setIsThankYouPage] = useState(false);
  const [loading, setLoading] = useState(false);
  const { t } = useTranslation();

  useEffect(() => {
    if (cartItems && cartItems.length > 0) {
      const total = cartItems.reduce((sum, item) => {
        return sum + (item.price * item.quantity);
      }, 0);
      setTotalPrice(total);
    } else {
      setTotalPrice(0);
    }
  }, [cartItems]);

  useEffect(() => {
    dispatch(updateSelectedAddress(user?.customer?.addresses?.edges[0]?.node))
  }, [user]);

  useEffect(() => {
    if (webViewRef?.current) {
      webViewRef?.current?.injectJavaScript(`
        window.ReactNativeWebView.postMessage('navigation');
      `);
    }
  }, [checkoutUrl]);

  const confirmCheckout = () => {
    setLoading(true);

    const formattedCartItems = cartItems?.map((item) => ({
      quantity: item?.quantity,
      merchandiseId: item?.merchandiseId,
    }));

    const cartDetail = user
      ? { formattedCartItems, selectedAddress, email: user?.customer?.email }
      : { formattedCartItems };

    dispatch(createShopifyCheckoutUrl(cartDetail));
    setShowWebView(true);
  };

  const handleNavigationStateChange = (navState: any) => {
    if (
      navState?.url?.includes("/thank-you") ||
      navState?.url?.includes("/thank_you") ||
      navState?.url?.includes("thankyou")
    ) {
      setIsThankYouPage(true);
      dispatch(emptyCartThunk());
    }

  };

  return (
    <SafeAreaView style={[styles.area, { backgroundColor: colors.background }]}>

      {!showWebView ? (

        <>
          <View style={[styles.container, { backgroundColor: colors.background }]}>
            <HeaderWithSearch
              title={t('selectAddress.title')}
              icon={icons.moreCircle}
              onPress={() => null}
            />
            <ScrollView
              contentContainerStyle={{
                // backgroundColor: dark ? COLORS.dark1 : COLORS.tertiaryWhite,
                marginTop: 12
              }}
              showsVerticalScrollIndicator={false}>
              <Text style={[styles.summaryTitle, {
                color: dark ? COLORS.white : COLORS.greyscale900
              }]}>{t('selectAddress.shippingAddress')}</Text>
              <View style={[styles.summaryContainer, {
                backgroundColor: dark ? COLORS.dark2 : COLORS.white,
              }]}>
                {/* <View style={[styles.separateLine, {
              backgroundColor: dark ? COLORS.grayscale700 : COLORS.grayscale200
            }]} /> */}
                <TouchableOpacity
                  onPress={() => navigation.navigate("selectshippingaddress")}
                  style={styles.addressContainer}>
                  <View style={styles.addressLeftContainer}>
                    <View style={styles.view1}>
                      <View style={styles.view2}>
                        <Image
                          source={icons.location2}
                          resizeMode='contain'
                          style={styles.locationIcon}
                        />
                      </View>
                    </View>
                    {selectedAddress ? (
                      <View style={styles.viewAddress}>
                        <View style={styles.viewView}>
                          <Text style={[styles.homeTitle, {
                            color: dark ? COLORS.white : COLORS.greyscale900
                          }]}>{selectedAddress?.firstName + " " + selectedAddress?.lastName}</Text>

                          {user?.customer?.addresses?.edges[0]?.node?.id === selectedAddress?.id &&
                            (
                              <View style={styles.defaultView}>
                                <Text style={[styles.defaultTitle, {
                                  color: dark ? COLORS.white : COLORS.primary
                                }]}>{t('selectAddress.default')}</Text>
                              </View>
                            )}

                        </View>
                        <Text style={[styles.addressTitle, {
                          color: dark ? COLORS.grayscale200 : COLORS.grayscale700
                        }]}>
                          {selectedAddress?.city + ", " + selectedAddress?.province}</Text>
                      </View>
                    ) : (
                      <View style={styles.viewAddress}>
                        <View style={styles.viewView}>
                          <Text style={[styles.homeTitle, {
                            color: dark ? COLORS.white : COLORS.greyscale900
                          }]}>{t('selectAddress.noAddressTitle')}</Text>

                        </View>
                        <Text style={[styles.addressTitle, {
                          color: dark ? COLORS.grayscale200 : COLORS.grayscale700
                        }]}>
                          {t('selectAddress.noAddressNote')}</Text>
                      </View>
                    )}

                  </View>
                  <Image
                    source={icons.arrowRight}
                    resizeMode='contain'
                    style={[styles.arrowRightIcon, {
                      tintColor: dark ? COLORS.white : COLORS.greyscale900
                    }]}
                  />
                </TouchableOpacity>
              </View>

              <Text style={[styles.summaryTitle, {
                color: dark ? COLORS.white : COLORS.greyscale900
              }]}>{t('selectAddress.orderList')}</Text>
              <FlatList
                // data={orderList}
                data={cartItems}
                keyExtractor={item => item.id}
                style={{ marginTop: 12 }}
                renderItem={({ item }) => (
                  <OrderListItem
                    title={item.title}
                    image={item.image}
                    price={item.price}
                    oldPrice={item.oldPrice}
                    id={item.id}
                    merchandiseId={item.merchandiseId}
                    productType={item.productType}
                    quantity={item.quantity}
                    onPress={() => { }}
                  />
                )}
              />
              {/* <View style={[styles.separateLine, {
            backgroundColor: dark ? COLORS.grayscale700 : COLORS.grayscale200
          }]} /> */}
              {/* <Text style={[styles.summaryTitle, {
            color: dark ? COLORS.white : COLORS.greyscale900
          }]}>Choose Shipping</Text>

          <TouchableOpacity
            onPress={() => navigation.navigate("chooseshippingmethods")}
            style={[styles.addressContainer, styles.shippingMethods, {
              backgroundColor: dark ? COLORS.dark3 : COLORS.white,
              borderRadius: 12
            }]}>
            <View style={styles.addressLeftContainer}>
              <Image
                source={icons.cargoTruck}
                resizeMode='contain'
                style={[styles.locationIcon, {
                  tintColor: dark ? COLORS.white : COLORS.greyscale900,
                  marginLeft: 8
                }]}
              />
              <View style={styles.viewAddress}>
                <View style={styles.viewView}>
                  <Text style={[styles.homeTitle, {
                    color: dark ? COLORS.white : COLORS.greyscale900
                  }]}>Choose Shipping Type</Text>
                </View>
              </View>
            </View>
            <Image
              source={icons.arrowRight}
              resizeMode='contain'
              style={[styles.arrowRightIcon, {
                tintColor: dark ? COLORS.white : COLORS.greyscale900
              }]}
            />
          </TouchableOpacity> */}
              {/* <View style={[styles.separateLine, {
            backgroundColor: dark ? COLORS.grayscale700 : COLORS.grayscale200,
            marginTop: 4,
            marginBottom: 16
          }]} /> */}

              {/* <Text style={[styles.summaryTitle, {
            color: dark ? COLORS.white : COLORS.greyscale900
          }]}>Promo Code</Text>
          <View style={[styles.promoCodeContainer, {
            backgroundColor: "transparent",
          }]}>
            <TextInput
              placeholder='Enter Promo Code'
              placeholderTextColor={dark ? COLORS.white : COLORS.grayscale700}
              style={[styles.codeInput, {
                color: dark ? COLORS.secondaryWhite : COLORS.greyscale900,
                backgroundColor: dark ? COLORS.dark2 : COLORS.white,
              }]}
            />
            <TouchableOpacity
              onPress={() => navigation.navigate("addpromo")}
              style={[styles.addPromoBtn, {
                backgroundColor: dark ? COLORS.dark3 : COLORS.primary,
              }]}>
              <Feather name="plus" size={18} color={COLORS.white} />
            </TouchableOpacity>
          </View> */}

              <View style={[styles.summaryContainer, {
                backgroundColor: dark ? COLORS.dark2 : COLORS.white,
              }]}>
                {/* <View style={styles.view}>
              <Text style={[styles.viewLeft, {
                color: dark ? COLORS.grayscale200 : COLORS.grayscale700
              }]}>Subtitle</Text>
              <Text style={[styles.viewRight, { color: dark ? COLORS.white : COLORS.greyscale900 }]}>$1920.00</Text>
            </View>
            <View style={styles.view}>
              <Text style={[styles.viewLeft, {
                color: dark ? COLORS.grayscale200 : COLORS.grayscale700
              }]}>Delivery Fee</Text>
              <Text style={[styles.viewRight, { color: dark ? COLORS.white : COLORS.greyscale900 }]}>$2.00</Text>
            </View>
            <View style={styles.view}>
              <Text style={[styles.viewLeft, {
                color: dark ? COLORS.grayscale200 : COLORS.grayscale700
              }]}>Promo</Text>
              <Text style={[styles.viewRight, { color: dark ? COLORS.white : COLORS.primary }]}>- $12.80</Text>
            </View> */}
                <View style={[styles.separateLine, {
                  backgroundColor: dark ? COLORS.greyScale800 : COLORS.grayscale200
                }]} />
                <View style={styles.view}>
                  <Text style={[styles.totalPrice, {
                    color: dark ? COLORS.grayscale200 : COLORS.grayscale700
                  }]}>{t('selectAddress.total')}</Text>
                  <Text style={[styles.totalPrice, { color: dark ? COLORS.white : COLORS.greyscale900 }]}>AED {totalPrice.toFixed(2)}</Text>
                </View>
              </View>
            </ScrollView>
          </View>
          <View style={[styles.buttonContainer, {
            backgroundColor: dark ? COLORS.dark2 : COLORS.white,
            bottom: insets.bottom,
            opacity: selectedAddress != null ? 1 : 0.5
          }]}>
            <ButtonFilled
              title={t('selectAddress.continueToCheckout')}
              // onPress={() => navigation.navigate("paymentmethods")}
              onPress={selectedAddress != null ? confirmCheckout : () => { }}
              style={styles.placeOrderButton}
            />
          </View>
        </>
      ) : (

        checkoutUrl !== null && (
          <View style={[styles.container, { backgroundColor: colors.background }]}>
            <HeaderWithSearch
              title={isThankYouPage ? "Thankyou for the Order" : "Checkout"}
              icon={icons.moreCircle}
              onPress={() => navigation.navigate(isThankYouPage ? "(tabs)" : "cart")}
            />
            <WebView
              ref={webViewRef}
              source={{ uri: checkoutUrl }}
              onNavigationStateChange={handleNavigationStateChange}
              onLoadStart={() => setLoading(true)}
              onLoadEnd={() => setLoading(false)}
            />
          </View>
        )
      )}

      {loading && (
        <ActivityIndicator
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            right: "50%",
            bottom: "50%",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 999,
            width: 0,
            height: 0,
            backgroundColor: "black", // Ensure the background is transparent
          }}
          size="large"
          color={COLORS.black}
        />
      )}
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
    paddingHorizontal: 16,
    paddingTop: 16
  },
  summaryContainer: {
    width: SIZES.width - 32,
    borderRadius: 16,
    padding: 16,
    backgroundColor: COLORS.white,
    shadowColor: COLORS.black,
    shadowOffset: {
      width: 0,
      height: 0
    },
    shadowOpacity: 0.2,
    shadowRadius: 0,
    elevation: 0,
    marginBottom: 12,
    marginTop: 12,
  },
  view: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 12
  },
  viewLeft: {
    fontSize: 14,
    fontFamily: "medium",
    color: COLORS.grayscale700
  },
  viewRight: {
    fontSize: 14,
    fontFamily: "semiBold",
    color: COLORS.greyscale900
  },
  separateLine: {
    width: "100%",
    height: 1,
    backgroundColor: COLORS.grayscale200,
    marginVertical: 12
  },
  summaryTitle: {
    fontSize: 20,
    fontFamily: "bold",
    color: COLORS.greyscale900
  },
  addressContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  addressLeftContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  view1: {
    height: 52,
    width: 52,
    borderRadius: 26,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: COLORS.tansparentPrimary,
  },
  view2: {
    height: 38,
    width: 38,
    borderRadius: 19,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: COLORS.primary,
  },
  locationIcon: {
    height: 20,
    width: 20,
    tintColor: COLORS.white
  },
  viewView: {
    flexDirection: "row",
    alignItems: "center",
  },
  homeTitle: {
    fontSize: 18,
    fontFamily: "bold",
    color: COLORS.greyscale900
  },
  defaultView: {
    width: 64,
    height: 26,
    borderRadius: 6,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: COLORS.tansparentPrimary,
    marginHorizontal: 12
  },
  defaultTitle: {
    fontSize: 12,
    fontFamily: "medium",
    color: COLORS.primary,
  },
  addressTitle: {
    fontSize: 14,
    fontFamily: "medium",
    color: COLORS.grayscale700,
    marginVertical: 4
  },
  viewAddress: {
    marginHorizontal: 16
  },
  arrowRightIcon: {
    height: 16,
    width: 16,
    tintColor: COLORS.greyscale900
  },
  orderSummaryView: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between"
  },
  addItemView: {
    width: 78,
    height: 26,
    borderRadius: 32,
    justifyContent: "center",
    alignItems: "center",
    borderColor: COLORS.primary,
    borderWidth: 1.4,
  },
  addItemText: {
    fontSize: 12,
    fontFamily: "medium",
    color: COLORS.primary,
  },
  viewItemTypeContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },
  viewLeftItemTypeContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  walletIcon: {
    height: 24,
    width: 24,
    tintColor: COLORS.primary,
    marginRight: 16
  },
  viewItemTypeTitle: {
    fontSize: 14,
    fontFamily: "medium",
    color: COLORS.grayscale700,
    marginRight: 16
  },
  placeOrderButton: {
    marginBottom: 12,
    marginTop: 6
  },
  shippingMethods: {
    backgroundColor: COLORS.white,
    paddingVertical: 20,
    marginVertical: 16
  },
  promoCodeContainer: {
    width: SIZES.width - 32,
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: COLORS.white,
    marginVertical: 12
  },
  codeInput: {
    width: SIZES.width - 112,
    height: 56,
    borderRadius: 16,
    backgroundColor: "#FAFAFA",
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 14,
  },
  addPromoBtn: {
    height: 48,
    width: 48,
    borderRadius: 24,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: COLORS.primary,
  },
  buttonContainer: {
    position: "absolute",
    bottom: 12,
    width: SIZES.width,
    paddingHorizontal: 16,
    paddingTop: 12,
    backgroundColor: COLORS.white,
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
  },
  totalPrice: {
    fontSize: 24,
    fontFamily: "bold",
    color: COLORS.black,
  },
});

export default Checkout