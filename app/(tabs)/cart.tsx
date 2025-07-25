import Button from '@/components/Button';
import ButtonFilled from '@/components/ButtonFilled';
import CartCard from '@/components/CartCard';
import NotFoundCard from '@/components/NotFoundCard';
import { COLORS, icons, SIZES } from '@/constants';
import { useAppDispatch } from '@/hooks/useAppDispatch';
import { useAppSelector } from '@/hooks/useAppSelector';
import { useTheme } from '@/theme/ThemeProvider';
import { removeProductFromCart } from '@/utils/actions/cartActions';
import { normalizeFont } from '@/utils/normalizeFont';
import { NavigationProp } from '@react-navigation/native';
import { useNavigation } from 'expo-router';
import i18next from 'i18next';
import React, { useEffect, useRef, useState } from 'react';
import { Dimensions, FlatList, Image, Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import RBSheet from 'react-native-raw-bottom-sheet';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ScrollView } from 'react-native-virtualized-view';

const { width } = Dimensions.get('window');

interface Product {
  merchandiseId: string;
  id: string;
  title: string;
  price: number;
  oldPrice?: number;
  quantity: number;
  image?: string;
  productType: string;
}

const Cart: React.FC = () => {
  const navigation = useNavigation<NavigationProp<any>>();
  const refRBSheet = useRef<any>(null);
  const refLoginSheet = useRef<any>(null);
  const { dark, colors } = useTheme();
  const dispatch = useAppDispatch();
  const [selectedBookmarkItem, setSelectedBookmarkItem] = useState<Product | null>(null);
  const [totalPrice, setTotalPrice] = useState(0);
  const [resultsCount, setResultsCount] = useState(0);
  const [selectedCategories, setSelectedCategories] = useState<string[]>(["0"]);
  const cartItems = useAppSelector(state => state.cart.cartItems);
  const user = useAppSelector(state => state.user);
  const appLanguage = useAppSelector(state => state.generalSettings.language);
  // const { t } = useTranslation();
  const { t } = i18next;

  const handleRemoveBookmark = () => {
    if (selectedBookmarkItem) {
      dispatch(removeProductFromCart(selectedBookmarkItem.merchandiseId));
      // const updatedCartProduct = myCartProducts.filter(
      //   (product: any) => product.id !== selectedBookmarkItem.id
      // );
      // setMyCartProducts(updatedCartProduct);
      refRBSheet.current?.close();
    }
  };

  useEffect(() => {
    if (cartItems && cartItems.length > 0) {
      const total = cartItems.reduce((sum, item) => {
        return sum + (item.price * item.quantity); // multiply price * quantity
      }, 0);
      setTotalPrice(total);
    } else {
      setTotalPrice(0); // empty cart
    }
  }, [cartItems]);

  // console.log('cart', cartItems)
  /**
   * Render header
   */
  const renderHeader = () => (
    <View style={styles.headerContainer}>
      <View style={styles.headerLeft}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image
            // source={icons.back2}
            source={appLanguage === "ar" ? icons.rightArrow : icons.back2}
            resizeMode="contain"
            style={[styles.logo, { tintColor: dark ? COLORS.white : COLORS.primary }]}
          />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: dark ? COLORS.white : COLORS.greyscale900 }]}>
          {t('cart.title')}
        </Text>
      </View>
      <TouchableOpacity>
        <Image
          source={icons.search4}
          resizeMode="contain"
          style={[styles.headerIcon, { tintColor: dark ? COLORS.secondaryWhite : COLORS.greyscale900 }]}
        />
      </TouchableOpacity>
    </View>
  );
  /**
   * Render my content
   */
  const renderContent = () => {
    // const filteredProducts = myCartProducts.filter(
    //   (product: any) => selectedCategories.includes("0") || selectedCategories.includes(product.categoryId)
    // );

    const filteredProducts = cartItems;

    // useEffect(() => {
    //   setResultsCount(filteredProducts.length);
    // }, [myCartProducts, selectedCategories]);

    useEffect(() => {
      setResultsCount(filteredProducts.length);
    }, [cartItems, selectedCategories]);

    // Category item
    const renderCategoryItem = ({ item }: { item: { id: string; name: string } }) => (
      <TouchableOpacity
        style={{
          backgroundColor: selectedCategories.includes(item.id)
            ? dark
              ? COLORS.dark3
              : COLORS.primary
            : 'transparent',
          padding: 10,
          marginVertical: 5,
          borderColor: dark ? COLORS.dark3 : COLORS.primary,
          borderWidth: 1.3,
          borderRadius: 24,
          marginRight: 12,
        }}
        onPress={() => toggleCategory(item.id)}>
        <Text style={{
          color: selectedCategories.includes(item.id) ? COLORS.white : dark ? COLORS.white : COLORS.primary
        }}>{item.name}</Text>
      </TouchableOpacity>
    );

    // Toggle category selection
    const toggleCategory = (categoryId: string) => {
      const updatedCategories = [...selectedCategories];
      const index = updatedCategories.indexOf(categoryId);

      if (index === -1) {
        updatedCategories.push(categoryId);
      } else {
        updatedCategories.splice(index, 1);
      }

      setSelectedCategories(updatedCategories);
    };

    return (
      <View>
        {/* <View style={styles.categoryContainer}>
          <FlatList
            data={categories}
            keyExtractor={(item) => item.id}
            showsHorizontalScrollIndicator={false}
            horizontal
            renderItem={renderCategoryItem}
          />
        </View> */}

        {/* Results container  */}
        <View>
          {/* result list */}
          <View style={{
            // backgroundColor: dark ? COLORS.dark1 : COLORS.secondaryWhite,
            marginVertical: Platform.OS === 'android' ? 20 : 0,
            // padding: 16,
          }}>
            {resultsCount > 0 ? (
              <FlatList
                data={filteredProducts}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                  <CartCard
                    title={item.title}
                    image={item.image}
                    price={item.price}
                    oldPrice={item.oldPrice}
                    id={item.id}
                    merchandiseId={item.merchandiseId}
                    productType={item.productType}
                    quantity={item.quantity}
                    onPress={() => {
                      setSelectedBookmarkItem(item);
                      refRBSheet.current?.open();
                    }}
                  />
                )}
              />
            ) : (
              <NotFoundCard />
            )}
          </View>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={[styles.area, { backgroundColor: colors.background }]}>
      <View style={[styles.container, { backgroundColor: colors.background }]}>
        {renderHeader()}
        <ScrollView showsVerticalScrollIndicator={false}>
          {renderContent()}
        </ScrollView>
        <View style={[styles.cartBottomContainer, {
          backgroundColor: dark ? COLORS.dark1 : COLORS.white,
          borderTopColor: dark ? COLORS.dark1 : COLORS.white,
        }]}>
          <View>
            <Text style={[styles.cartTitle, { color: dark ? COLORS.greyscale300 : COLORS.greyscale600 }]}>
              {t('cart.totalPrice')}
            </Text>
            <Text style={[styles.cartSubtitle, { color: dark ? COLORS.white : COLORS.black }]}>
              AED {totalPrice.toFixed(2)}
            </Text>
          </View>
          <TouchableOpacity
            disabled={resultsCount <= 0}
            onPress={() => user.accessToken ? navigation.navigate("checkout") : refLoginSheet.current?.open()}
            style={[
              styles.cartBtn,
              resultsCount <= 0 && { opacity: 0.5 },
            ]}>
            <Text style={styles.cartBtnText}> {t('cart.continue')}</Text>
            <Image
              source={icons.rightArrow2}
              resizeMode="contain"
              style={[
                styles.bagIcon,
                appLanguage === 'ar' && { transform: [{ rotate: '180deg' }] },
              ]}
            />
          </TouchableOpacity>

        </View>
      </View>
      <RBSheet
        ref={refRBSheet}
        closeOnPressMask={true}
        height={380}
        customStyles={{
          wrapper: {
            backgroundColor: "rgba(0,0,0,0.5)",
          },
          draggableIcon: {
            backgroundColor: dark ? COLORS.greyscale300 : COLORS.greyscale300,
          },
          container: {
            borderTopRightRadius: 32,
            borderTopLeftRadius: 32,
            height: 350,
            backgroundColor: dark ? COLORS.dark2 : COLORS.white,
            alignItems: "center",
            width: "100%",
            paddingVertical: 12
          }
        }}>
        <Text style={[styles.bottomSubtitle, { color: dark ? COLORS.white : COLORS.black }]}>
          {t('cart.sheetTitle')}
        </Text>
        <View style={styles.separateLine} />

        <View style={[styles.selectedBookmarkContainer,
          //  { backgroundColor: dark ? COLORS.dark2 : COLORS.tertiaryWhite }
        ]}>
          <CartCard
            title={selectedBookmarkItem?.title || ""}
            image={selectedBookmarkItem?.image}
            price={selectedBookmarkItem?.price || 0}
            id={selectedBookmarkItem?.id || ""}
            merchandiseId={selectedBookmarkItem?.merchandiseId || ""}
            productType={selectedBookmarkItem?.productType || ""}
            quantity={selectedBookmarkItem?.quantity || 0}
            oldPrice={selectedBookmarkItem?.oldPrice || 0}
            onPress={() => console.log(selectedBookmarkItem)}
          />
        </View>

        <View style={styles.bottomContainer}>
          <Button
            title={t('cart.button2')}
            style={{
              width: (SIZES.width - 32) / 2 - 8,
              backgroundColor: dark ? COLORS.dark3 : COLORS.tansparentPrimary,
              borderRadius: 32,
              borderColor: dark ? COLORS.dark3 : COLORS.tansparentPrimary
            }}
            textColor={dark ? COLORS.white : COLORS.primary}
            onPress={() => refRBSheet.current?.close()}
          />
          <ButtonFilled
            title={t('cart.button1')}
            style={styles.removeButton}
            onPress={handleRemoveBookmark}
          />
        </View>
      </RBSheet>

      <RBSheet
        ref={refLoginSheet}
        closeOnPressMask={true}
        height={300}
        customStyles={{
          wrapper: {
            backgroundColor: "rgba(0,0,0,0.5)",
          },
          draggableIcon: {
            backgroundColor: dark ? COLORS.greyscale300 : COLORS.greyscale300,
          },
          container: {
            borderTopRightRadius: 32,
            borderTopLeftRadius: 32,
            height: 300,
            backgroundColor: dark ? COLORS.dark2 : COLORS.white,
            alignItems: "center",
            padding: 20,
            justifyContent: "center",
          },
        }}
      >
        <Text
          style={[
            styles.bottomSubtitle,
            {
              color: dark ? COLORS.white : COLORS.black,
              textAlign: "center",
              marginBottom: 16,
            },
          ]}
        >
          {t('cart.sheetTitle2')}
        </Text>

        <View style={styles.separateLine} />

        <View style={{ padding: 20 }}>
          <Text style={[styles.featureText, {
            color: dark ? COLORS.white : COLORS.greyscale900
          }]}>
            {t('cart.sheetContent')}
          </Text>
        </View>

        <View style={styles.bottomContainer}>
          <Button
            title={t('cart.button2')}
            style={{
              width: (SIZES.width - 92) / 2 - 8,
              backgroundColor: dark ? COLORS.dark3 : COLORS.tansparentPrimary,
              borderRadius: 32,
              borderColor: dark ? COLORS.dark3 : COLORS.tansparentPrimary,
            }}
            textColor={dark ? COLORS.white : COLORS.primary}
            onPress={() => refLoginSheet.current?.close()}
          />
          <ButtonFilled
            title={t('cart.login')}
            style={styles.removeButton2}
            onPress={() => {
              refLoginSheet.current?.close();
              navigation.navigate("login");
            }}
          />
        </View>
      </RBSheet>

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
    padding: 16,
    marginBottom: 32
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
  categoryContainer: {
    marginTop: 12
  },
  bottomContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginVertical: 12,
    paddingHorizontal: 16,
    width: "100%"
  },
  cancelButton: {
    width: (SIZES.width - 32) / 2 - 8,
    backgroundColor: COLORS.tansparentPrimary,
    borderRadius: 32
  },
  removeButton: {
    width: (SIZES.width - 32) / 2 - 8,
    // backgroundColor: COLORS.primary,
    backgroundColor: COLORS.primaryRed,
    borderRadius: 32
  },
  removeButton2: {
    width: (SIZES.width - 92) / 2 - 8,
    // backgroundColor: COLORS.primary,
    backgroundColor: COLORS.primaryRed,
    borderRadius: 32
  },
  bottomTitle: {
    fontSize: normalizeFont(24),
    fontFamily: "semiBold",
    color: "red",
    textAlign: "center",
  },
  bottomSubtitle: {
    fontSize: normalizeFont(22),
    fontFamily: "bold",
    color: COLORS.greyscale900,
    textAlign: "center",
    marginVertical: 12
  },
  selectedBookmarkContainer: {
    marginVertical: 16,
    // backgroundColor: COLORS.tertiaryWhite
  },
  separateLine: {
    width: "100%",
    height: .2,
    backgroundColor: COLORS.greyscale300,
    marginHorizontal: 16
  },
  filterIcon: {
    width: 24,
    height: 24,
    tintColor: COLORS.primary
  },
  tabContainer: {
    flexDirection: "row",
    alignItems: "center",
    width: SIZES.width - 32,
    justifyContent: "space-between"
  },
  tabBtn: {
    width: (SIZES.width - 32) / 2 - 6,
    height: 42,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1.4,
    borderColor: COLORS.primary,
    borderRadius: 32
  },
  selectedTab: {
    width: (SIZES.width - 32) / 2 - 6,
    height: 42,
    backgroundColor: COLORS.primary,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1.4,
    borderColor: COLORS.primary,
    borderRadius: 32
  },
  tabBtnText: {
    fontSize: 16,
    fontFamily: "semiBold",
    color: COLORS.primary,
    textAlign: "center"
  },
  selectedTabText: {
    fontSize: 16,
    fontFamily: "semiBold",
    color: COLORS.white,
    textAlign: "center"
  },
  resultContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: SIZES.width - 32,
    marginVertical: 16,
  },
  subtitle: {
    fontSize: 18,
    fontFamily: "bold",
    color: COLORS.black,
  },
  subResult: {
    fontSize: 14,
    fontFamily: "semiBold",
    color: COLORS.primary
  },
  resultLeftView: {
    flexDirection: "row"
  },
  logoutButton: {
    width: (SIZES.width - 32) / 2 - 8,
    backgroundColor: COLORS.primary,
    borderRadius: 32
  },
  sheetTitle: {
    fontSize: 18,
    fontFamily: "semiBold",
    color: COLORS.black,
    marginVertical: 12
  },
  reusltTabContainer: {
    flexDirection: "row",
    alignItems: "center",
    width: SIZES.width - 32,
    justifyContent: "space-between",
    marginTop: 12
  },
  viewDashboard: {
    flexDirection: "row",
    alignItems: "center",
    width: 36,
    justifyContent: "space-between"
  },
  dashboardIcon: {
    width: 16,
    height: 16,
    tintColor: COLORS.primary
  },
  tabText: {
    fontSize: 20,
    fontFamily: "semiBold",
    color: COLORS.black
  },
  cartBottomContainer: {
    position: "absolute",
    bottom: 12,
    left: 0,
    right: 0,
    width: SIZES.width,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    height: 104,
    backgroundColor: COLORS.white,
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderTopRightRadius: 32,
    borderTopLeftRadius: 32,
    borderTopColor: COLORS.white,
    borderTopWidth: 1,
  },
  cartTitle: {
    fontSize: 12,
    fontFamily: "medium",
    color: COLORS.greyscale600,
    marginBottom: 6
  },
  cartSubtitle: {
    fontSize: normalizeFont(24),
    fontFamily: "bold",
    color: COLORS.black,
  },
  cartBtn: {
    height: 58,
    width: width * 0.47,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 32,
    // backgroundColor: COLORS.black,
    backgroundColor: COLORS.primaryRed,
    flexDirection: "row",
  },
  cartBtnText: {
    fontSize: 16,
    fontFamily: "bold",
    color: COLORS.white,
    textAlign: "center"
  },
  bagIcon: {
    height: 20,
    width: 20,
    tintColor: COLORS.white,
    marginLeft: 8
  },
  featureText: {
    fontSize: 16,
    color: "#333",
  },
});

export default Cart;