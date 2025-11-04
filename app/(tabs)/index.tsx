import BannerSlider from '@/components/BannerSlider';
import CardSlider from '@/components/CardSlider';
import Category from '@/components/Category';
import HamburgerDrawer from '@/components/HamburgerDrawer';
import ProductCard from '@/components/ProductCard';
import { COLORS, icons, images, SIZES } from '@/constants';
import { bannersNew, brands, useBanners, useCardsData, useCategories, useOurProducts } from '@/data';
import { useAppSelector } from '@/hooks/useAppSelector';
import { useTheme } from '@/theme/ThemeProvider';
import { normalizeFont } from '@/utils/normalizeFont';
import { NavigationProp } from '@react-navigation/native';
import { useNavigation } from 'expo-router';
import i18next from 'i18next';

import React, {
  memo,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState
} from 'react';
import {
  Dimensions,
  FlatList,
  Image,
  ImageSourcePropType,
  InteractionManager,
  ListRenderItemInfo,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ScrollView } from 'react-native-virtualized-view';

const { width, height: SCREEN_HEIGHT } = Dimensions.get('window');

interface BannerItem {
  id: number;
  label: string;
  headline1: string;
  headline2: string;
  buttonText: string;
  buttonLink: string;
  image: ImageSourcePropType;
}

const MemoProductCard = memo(ProductCard);
const MemoCategory = memo(Category);

const Home = () => {
  const navigation = useNavigation<NavigationProp<any>>();
  const user = useAppSelector(state => state.user);
  const collections = useAppSelector(state => state.collections);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentSquareIndex, setCurrentSquareIndex] = useState(0);
  const { dark, colors } = useTheme();
  // const { t } = useTranslation();
  const { t } = i18next;
  const drawerRef = useRef<any>(null);
  const banners = useBanners();
  const ourProducts = useOurProducts();
  const cardsData = useCardsData();
  const categories = useCategories();
  const [ready, setReady] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState<string[]>(["0"]);
  const cartItems = useAppSelector(state => state.cart.cartItems);
  const wishlistItems = useAppSelector(state => state.wishlist.wishlistItems);
  const [showNotification, setShowNotification] = useState(false);

  useEffect(() => {
    const task = InteractionManager.runAfterInteractions(() => setReady(true));
    return () => task.cancel();
  }, []);

  // Call this function when product is added to cart
  const triggerNotification = () => {
    setShowNotification(true);
    setTimeout(() => {
      setShowNotification(false)
    }, 2000);
  };

  const totalCartItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  const useCollectionProducts = (collections: any, gid: string) =>
    useMemo(() => {
      const col = collections?.data?.find((c: any) => c.id === gid);
      return col ? col.products : [];
    }, [collections?.data, gid]);

  // ✅ Move all hook calls to top level
  const popularProducts = useCollectionProducts(collections, 'gid://shopify/Collection/439668539604');
  const ourGenerators = useCollectionProducts(collections, 'gid://shopify/Collection/443266466004');
  // const ourInverters = useCollectionProducts(collections, 'gid://shopify/Collection/439668539604');
  const ourPowerstations = useCollectionProducts(collections, 'gid://shopify/Collection/443234615508');
  const ourWaterPumps = useCollectionProducts(collections, 'gid://shopify/Collection/443234746580');
  // const ourBatteries = useCollectionProducts(collections, 'gid://shopify/Collection/439668539604');
  const ourNewArrivals = useCollectionProducts(collections, 'gid://shopify/Collection/439668572372');

  const renderHeader = useCallback(() => (
    <>
      <View style={{ backgroundColor: "rgb(177, 18, 22)", alignItems: "center", paddingTop: 5, paddingBottom: 5 }}>
        <Text style={{ textAlign: "center", color: "white", fontSize: normalizeFont(14), maxWidth: 350, }}>
          {t('header.announcement')}
        </Text>
      </View>
      <View style={styles.headerContainer}>
        <View style={{ flexDirection: "row", alignItems: "center", gap: 20 }}>
          <TouchableOpacity onPress={() => drawerRef.current.open()}>
            <Image source={images.menu} resizeMode='contain' style={[styles.userIcon, { tintColor: dark ? COLORS.white : COLORS.greyscale900 }]} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate("search")}>
            <Image source={icons.search3} resizeMode='contain' style={[styles.userIcon, { tintColor: dark ? COLORS.white : COLORS.greyscale900 }]} />
          </TouchableOpacity>
        </View>
        <Image source={images.nbsLogo3} resizeMode='contain' style={styles.nbsLogo} />
        <View style={{ flexDirection: "row", alignItems: "center", gap: 20 }}>
          <TouchableOpacity onPress={() => navigation.navigate("mywishlist")}>
            <Image source={icons.heartOutline} resizeMode='contain' style={[styles.userIcon, { tintColor: dark ? COLORS.white : COLORS.greyscale900 }]} />
            <View
              style={{
                position: 'absolute',
                top: -4,
                right: -4,
                backgroundColor: 'rgb(177, 18, 22)',
                borderRadius: 10,
                minWidth: 18,
                height: 18,
                justifyContent: 'center',
                alignItems: 'center',
                paddingHorizontal: 4,
                zIndex: 1,
              }}
            >
              <Text style={{ color: 'white', fontSize: 10, fontWeight: 'bold' }}>
                {wishlistItems?.length}
              </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate("cart")} style={{ position: 'relative' }}>
            <Image source={icons.bag3Outline} resizeMode='contain' style={[styles.userIcon, { tintColor: dark ? COLORS.white : COLORS.greyscale900 }]} />
            {/* {totalCartItems > 0 && ( */}
            <View
              style={{
                position: 'absolute',
                top: -4,
                right: -4,
                backgroundColor: 'rgb(177, 18, 22)',
                borderRadius: 10,
                minWidth: 18,
                height: 18,
                justifyContent: 'center',
                alignItems: 'center',
                paddingHorizontal: 4,
                zIndex: 1,
              }}
            >
              <Text style={{ color: 'white', fontSize: 10, fontWeight: 'bold' }}>
                {totalCartItems}
              </Text>
            </View>
            {/* )} */}
          </TouchableOpacity>
        </View>
      </View>
      {/* <View style={{
        backgroundColor: 'rgb(1,73,133)',
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingHorizontal: 17,
        paddingVertical: 15,
      }}>
        <View style={{ flexDirection: "row", gap: 9, alignItems: "center" }}>
          <Image style={styles.cartNotificationIcon} source={icons.tickCircle} />
          <Text style={styles.cartNotificationTitle} >Item added to your cart!</Text>
        </View>
        <Text style={styles.cartNotificationLink} onPress={() => navigation.navigate("cart")}>View Cart</Text>
      </View> */}
    </>
  ), [dark, totalCartItems, wishlistItems, showNotification]);

  const renderBannerItem = useCallback(({ item }: ListRenderItemInfo<BannerItem>) => (
    // <View style={styles.bannerContainer}>
    //   <ImageBackground source={item.image} style={styles.imageBackground} resizeMode="cover">
    //     <View style={styles.overlay}>
    //       <View style={styles.bannerTextContainer}>
    //         <View style={styles.bannerTopContainer}>
    //           <Text style={styles.inverterLabel}>{item.label}</Text>
    //           <Text style={styles.headline}>{item.headline1}{"\n"}{item.headline2}</Text>
    //           <TouchableOpacity style={styles.ctaButton} onPress={() => navigation.navigate("allproducts")}>
    //             <Text style={styles.ctaButtonText}>{item.buttonText}</Text>
    //           </TouchableOpacity>
    //         </View>
    //       </View>
    //     </View>
    //   </ImageBackground>

    //   <Image
    //     source={item.image}
    //     style={{
    //       width: width,
    //     }}
    //     resizeMode="contain"
    //   />
    // </View>

    <Image
      source={item.image}
      style={{
        width: width,
      }}
      resizeMode="contain"
    />
  ), []);

  const renderBanner = useCallback(() => (
    <View style={styles.bannerItemContainer}>
      <FlatList
        data={banners}
        renderItem={renderBannerItem}
        keyExtractor={(item) => item.id.toString()}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onMomentumScrollEnd={e => {
          const newIndex = Math.round(e.nativeEvent.contentOffset.x / SIZES.width);
          setCurrentIndex(newIndex);
        }}
        initialNumToRender={1}
        maxToRenderPerBatch={1}
        windowSize={3}
        removeClippedSubviews
      />
      <View style={styles.dotContainer}>
        {banners.map((_, i) => (
          <View key={i} style={[styles.dot, i === currentIndex ? styles.activeDot : null]} />
        ))}
      </View>
    </View>
  ), [banners, currentIndex]);

  const renderBrandItem = useCallback(({ item }: { item: { id: string; image: ImageSourcePropType; collectionId: string; collectionTitle: string; collectionImage: string } }) => (
    // <View>
    <TouchableOpacity onPress={() =>
      navigation.navigate('collectionscreen', {
        collectionId: item.collectionId,
        collectionTitle: item.collectionTitle,
        collectionImage: item.collectionImage,
      })
    }
    >
      <Image source={item.image} resizeMode="contain" style={{ width: 200, height: 200 }} />
    </TouchableOpacity>
    // </View>
  ), []);

  const renderOurBrands = useCallback(() => (
    <View style={[styles.bannerItemContainer, { backgroundColor: dark ? COLORS.dark1 : 'rgb(244, 244, 244)' }]}>
      <Text style={[styles.subTitle, { color: dark ? COLORS.white : COLORS.black }]}>{t('ourBrandPartners.title')}</Text>
      <Text style={[styles.mainTitle, { color: dark ? COLORS.white : COLORS.black }]}>{t('ourBrandPartners.subTitle')}</Text>
      <FlatList
        data={brands}
        horizontal
        style={{ direction: 'ltr' }}
        contentContainerStyle={{ paddingHorizontal: 16 }}
        ItemSeparatorComponent={() => <View style={{ width: 20 }} />}
        keyExtractor={item => item.id}
        showsHorizontalScrollIndicator={false}
        renderItem={renderBrandItem}
      />
    </View>
  ), [brands, dark, t]);

  const renderPopularProducts = () => {

    const filteredProducts = popularProducts;

    const toggleCategory = (id: string) => {
      setSelectedCategories(prev =>
        prev.includes(id) ? prev.filter(c => c !== id) : [...prev, id]
      );
    };

    const renderCategoryItem = ({ item }: { item: { id: string; name: string } }) => (
      <TouchableOpacity
        style={{
          backgroundColor: selectedCategories.includes(item.id) ? (dark ? COLORS.dark3 : COLORS.primary) : "transparent",
          padding: 10,
          marginVertical: 5,
          borderColor: dark ? COLORS.dark3 : COLORS.primary,
          borderWidth: 1.3,
          borderRadius: 24,
          marginRight: 12,
        }}
        onPress={() => toggleCategory(item.id)}
      >
        <Text style={{ fontSize: normalizeFont(14), color: selectedCategories.includes(item.id) ? COLORS.white : (dark ? COLORS.white : COLORS.primary) }}>
          {item.name}
        </Text>
      </TouchableOpacity>
    );

    return (
      <View style={{ padding: 16, width }}>
        <Text style={[styles.subTitle, { color: dark ? COLORS.white : COLORS.black }]}>
          {t('popularProducts.subTitle')}
        </Text>
        <Text style={[styles.mainTitle, { color: dark ? COLORS.white : COLORS.black }]}>
          {t('popularProducts.title')}
        </Text>
        {/* <FlatList
          data={categories}
          horizontal
          keyExtractor={item => item.id}
          renderItem={renderCategoryItem}
          contentContainerStyle={{
            flexGrow: 1,
            justifyContent: 'center',
            alignItems: 'center',
          }}
          showsHorizontalScrollIndicator={false}
        /> */}
        <FlatList
          data={filteredProducts}
          horizontal
          keyExtractor={item => item.id}
          showsHorizontalScrollIndicator={false}
          initialNumToRender={3}
          maxToRenderPerBatch={4}
          windowSize={6}
          removeClippedSubviews
          renderItem={({ item }) => (
            <MemoProductCard
              merchandiseId={item.id}
              productId={item.id}
              productType={item.productType}
              name={item.title}
              image={item.image}
              price={item.price}
              oldPrice={item.oldPrice}
              availableForSale={item.available}
              productTags={item.productTags}
              onPress={() => navigation.navigate("productdetails", { id: item.id })}
            />
          )}
        />
      </View>
    );
  };


  const renderOurGenerators = useCallback(() => {
    const products = ourGenerators;

    return (
      <View style={[styles.bannerItemContainer, { backgroundColor: dark ? COLORS.dark1 : COLORS.white }]}>
        <Text style={[styles.subTitle, { color: dark ? COLORS.white : COLORS.black }]}>
          {t('ourGenerators.subTitle')}
        </Text>
        <Text style={[styles.mainTitle, { color: dark ? COLORS.white : COLORS.black }]}>
          {t('ourGenerators.title')}
        </Text>

        <View style={{ padding: 16 }}>
          <FlatList
            data={products}
            keyExtractor={(item) => item.id}
            horizontal
            showsHorizontalScrollIndicator={false}
            initialNumToRender={4}
            maxToRenderPerBatch={4}
            windowSize={7}
            removeClippedSubviews
            renderItem={({ item }) => (
              <MemoProductCard
                merchandiseId={item.merchandiseId}
                productId={item.id}
                productType={item.productType}
                name={item.title}
                image={item.image}
                price={item.price}
                oldPrice={item.oldPrice}
                availableForSale={item.available}
                productTags={item.productTags}
                onPress={() =>
                  navigation.navigate('productdetails', { id: item.id })
                }
              />
            )}
          />
        </View>
      </View>
    );
  }, [collections, dark, t]);

  /* ------------------------------------------------------------------ */
  const OurProductItem = memo(
    ({ item }: { item: { id: string; title: string; image: ImageSourcePropType; collectionId: string } }) => (
      <View>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate('collectionscreen', {
              collectionId: item.collectionId,
              collectionTitle: item.title,
              collectionImage: item.image,
            })
          }
        >
          <Image source={item.image} resizeMode="contain" style={{ width: width * 0.8, height: SCREEN_HEIGHT * 0.5 }} />
          {/* <Text style={[styles.ourProductTitle, { color: COLORS.white }]}>{item.title}</Text> */}
        </TouchableOpacity>
      </View>
    ),
  );

  /* ------------------------------------------------------------------ */
  const renderOurProducts = useCallback(() => (
    <View style={[styles.bannerItemContainer, { backgroundColor: 'rgb(1, 73, 133)' }]}>
      <Text style={[styles.mainTitle, { color: COLORS.white, marginTop: 20 }]} >{t('ourProducts.title')}</Text>
      <Text style={[styles.subTitle, { color: COLORS.white }]} >{t('ourProducts.subTitle')}</Text>

      <FlatList
        data={ourProducts}
        horizontal
        keyExtractor={(item) => item.id}
        showsHorizontalScrollIndicator={false}
        initialNumToRender={3}
        maxToRenderPerBatch={3}
        windowSize={6}
        removeClippedSubviews
        contentContainerStyle={{ paddingHorizontal: 16 }}
        ItemSeparatorComponent={() => <View style={{ width: 20 }} />}
        renderItem={({ item }) => <OurProductItem item={item} />}
      />
    </View>
  ), [t]);

  /* ------------------------------------------------------------------ */
  // const renderOurInverters = useCallback(() => {
  //   const products = ourInverters;

  //   return (
  //     <View style={[styles.bannerItemContainer, { backgroundColor: dark ? COLORS.dark1 : 'rgb(244, 244, 244)' },]}>
  //       <Text style={[styles.subTitle, { color: dark ? COLORS.white : COLORS.black }]}>
  //         {t('ourInverters.subTitle')}
  //       </Text>
  //       <Text style={[styles.mainTitle, { color: dark ? COLORS.white : COLORS.black }]}>
  //         {t('ourInverters.title')}
  //       </Text>

  //       <View style={{ padding: 16 }}>
  //         <FlatList
  //           data={products}
  //           keyExtractor={(item) => item.id}
  //           horizontal
  //           showsHorizontalScrollIndicator={false}
  //           initialNumToRender={4}
  //           maxToRenderPerBatch={4}
  //           windowSize={7}
  //           removeClippedSubviews
  //           renderItem={({ item }) => (
  //             <MemoProductCard
  //               merchandiseId={item.merchandiseId}
  //               productId={item.id}
  //               productType={item.productType}
  //               name={item.title}
  //               image={item.image}
  //               price={item.price}
  //               oldPrice={item.oldPrice}
  //               availableForSale={item.available}
  //               onPress={() =>
  //                 navigation.navigate('productdetails', { id: item.id })
  //               }
  //             />
  //           )}
  //         />
  //       </View>
  //     </View>
  //   );
  // }, [collections, dark, t]);

  const renderOurPowerstations = useCallback(() => {
    const products = ourPowerstations;

    return (
      <View style={[styles.bannerItemContainer, { backgroundColor: dark ? COLORS.dark1 : 'rgb(244, 244, 244)' },]}>
        <Text style={[styles.subTitle, { color: dark ? COLORS.white : COLORS.black }]}>
          {t('ourPowerstations.subTitle')}
        </Text>
        <Text style={[styles.mainTitle, { color: dark ? COLORS.white : COLORS.black }]}>
          {t('ourPowerstations.title')}
        </Text>

        <View style={{ padding: 16 }}>
          <FlatList
            data={products}
            keyExtractor={(item) => item.id}
            horizontal
            showsHorizontalScrollIndicator={false}
            initialNumToRender={4}
            maxToRenderPerBatch={4}
            windowSize={7}
            removeClippedSubviews
            renderItem={({ item }) => (
              <MemoProductCard
                merchandiseId={item.merchandiseId}
                productId={item.id}
                productType={item.productType}
                name={item.title}
                image={item.image}
                price={item.price}
                oldPrice={item.oldPrice}
                availableForSale={item.available}
                productTags={item.productTags}
                onPress={() =>
                  navigation.navigate('productdetails', { id: item.id })
                }
              />
            )}
          />
        </View>
      </View>
    );
  }, [collections, dark, t]);

  /* ------------------------------------------------------------------ */
  const renderOurWaterPumps = useCallback(() => {
    const products = ourWaterPumps;

    return (
      <View style={[
        styles.bannerItemContainer]}>
        <Text style={[styles.subTitle, { color: dark ? COLORS.white : COLORS.black }]}>
          {t('ourWaterPump.subTitle')}
        </Text>
        <Text style={[styles.mainTitle, { color: dark ? COLORS.white : COLORS.black }]}>
          {t('ourWaterPump.title')}
        </Text>

        <View style={{ padding: 16 }}>
          <FlatList
            data={products}
            keyExtractor={(item) => item.id}
            horizontal
            showsHorizontalScrollIndicator={false}
            initialNumToRender={4}
            maxToRenderPerBatch={4}
            windowSize={7}
            removeClippedSubviews
            renderItem={({ item }) => (
              <MemoProductCard
                merchandiseId={item.merchandiseId}
                productId={item.id}
                productType={item.productType}
                name={item.title}
                image={item.image}
                price={item.price}
                oldPrice={item.oldPrice}
                availableForSale={item.available}
                productTags={item.productTags}
                onPress={() =>
                  navigation.navigate('productdetails', { id: item.id })
                }
              />
            )}
          />
        </View>
      </View>
    );
  }, [collections, dark, t]);

  /* ------------------------------------------------------------------ */
  // const renderOurBatteries = useCallback(() => {
  //   const products = ourBatteries;

  //   return (
  //     <View style={[
  //       styles.bannerItemContainer,
  //       { backgroundColor: dark ? COLORS.dark1 : 'rgb(244, 244, 244)' },
  //     ]}>
  //       <Text style={[styles.subTitle, { color: dark ? COLORS.white : COLORS.black }]}>
  //         {t('ourBatteries.subTitle')}
  //       </Text>
  //       <Text style={[styles.mainTitle, { color: dark ? COLORS.white : COLORS.black }]}>
  //         {t('ourBatteries.title')}
  //       </Text>

  //       <View style={{ padding: 16 }}>
  //         <FlatList
  //           data={products}
  //           keyExtractor={(item) => item.id}
  //           horizontal
  //           showsHorizontalScrollIndicator={false}
  //           initialNumToRender={4}
  //           maxToRenderPerBatch={4}
  //           windowSize={7}
  //           removeClippedSubviews
  //           renderItem={({ item }) => (
  //             <MemoProductCard
  //               merchandiseId={item.merchandiseId}
  //               productId={item.id}
  //               productType={item.productType}
  //               name={item.title}
  //               image={item.image}
  //               price={item.price}
  //               oldPrice={item.oldPrice}
  //               availableForSale={item.available}
  //               onPress={() =>
  //                 navigation.navigate('productdetails', { id: item.id })
  //               }
  //             />
  //           )}
  //         />
  //       </View>
  //     </View>
  //   );
  // }, [collections, dark, t]);

  const renderOurNewArrivals = useCallback(() => {
    const products = ourNewArrivals;

    return (
      <View style={[
        styles.bannerItemContainer,
        { backgroundColor: dark ? COLORS.dark1 : 'rgb(244, 244, 244)' },
      ]}>
        <Text style={[styles.subTitle, { color: dark ? COLORS.white : COLORS.black }]}>
          {t('ourNewArrivals.subTitle')}
        </Text>
        <Text style={[styles.mainTitle, { color: dark ? COLORS.white : COLORS.black }]}>
          {t('ourNewArrivals.title')}
        </Text>

        <View style={{ padding: 16 }}>
          <FlatList
            data={products}
            keyExtractor={(item) => item.id}
            horizontal
            showsHorizontalScrollIndicator={false}
            initialNumToRender={4}
            maxToRenderPerBatch={4}
            windowSize={7}
            removeClippedSubviews
            renderItem={({ item }) => (
              <MemoProductCard
                merchandiseId={item.merchandiseId}
                productId={item.id}
                productType={item.productType}
                name={item.title}
                image={item.image}
                price={item.price}
                oldPrice={item.oldPrice}
                availableForSale={item.available}
                productTags={item.productTags}
                onPress={() =>
                  navigation.navigate('productdetails', { id: item.id })
                }
              />
            )}
          />
        </View>
      </View>
    );
  }, [collections, dark, t]);



  return (
    <SafeAreaView style={[styles.area, { backgroundColor: dark ? COLORS.dark1 : COLORS.white }]}>
      <View style={[styles.container, { backgroundColor: colors.background }]}>
        {renderHeader()}
        <ScrollView showsVerticalScrollIndicator style={{ marginBottom: 40 }}>
          {/* {renderBanner()} */}
          <BannerSlider banners={bannersNew} />
          {renderPopularProducts()}
          {ready && renderOurBrands()}
          {ready && renderOurGenerators()}
          {ready && renderOurProducts()}
          {/* {ready && renderOurInverters()} */}
          {ready && renderOurPowerstations()}
          {ready && renderOurWaterPumps()}
          {/* {ready && renderOurBatteries()} */}
          {ready && renderOurNewArrivals()}
          {ready && <CardSlider cards={cardsData} />}
        </ScrollView>
        <HamburgerDrawer ref={drawerRef} />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  area: {
    flex: 1,
  },
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
    // padding: 16
    paddingBottom: 20
  },
  headerContainer: {
    flexDirection: "row",
    // width: SIZES.width - 32,
    justifyContent: "space-between",
    alignItems: "center",
    paddingLeft: 16,
    paddingBottom: 6,
    paddingRight: 16,
    borderBottomWidth: 0.4,
    zIndex: 100
  },
  userIcon: {
    // width: 28,
    // height: 38,
    width: width * 0.06,
    height: 38,
    // borderRadius: 32
  },
  nbsLogo: {
    // width: 128,
    // height: 68,
    marginTop: 5,
    width: width * 0.35,
    height: 70,
    borderRadius: 32
  },
  viewLeft: {
    flexDirection: "row",
    alignItems: "center"
  },
  greeeting: {
    fontSize: 12,
    fontFamily: "regular",
    color: "gray",
    marginBottom: 4
  },
  title: {
    fontSize: 20,
    fontFamily: "bold",
    color: COLORS.greyscale900
  },
  viewNameContainer: {
    marginLeft: 12
  },
  viewRight: {
    flexDirection: "row",
    alignItems: "center"
  },
  bellIcon: {
    height: 24,
    width: 24,
    tintColor: COLORS.black,
    marginRight: 8
  },
  bookmarkIcon: {
    height: 24,
    width: 24,
    tintColor: COLORS.black
  },
  searchBarContainer: {
    width: SIZES.width - 32,
    backgroundColor: COLORS.secondaryWhite,
    padding: 16,
    borderRadius: 12,
    height: 52,
    marginVertical: 16,
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 16
  },
  searchIcon: {
    height: 24,
    width: 24,
    tintColor: COLORS.gray
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    fontFamily: "regular",
    marginHorizontal: 8
  },
  filterIcon: {
    width: 24,
    height: 24,
    tintColor: COLORS.primary
  },
  bannerContainer: {
    // width: SIZES.width - 32,
    width: width,
    // paddingHorizontal: 16,
    // borderRadius: 10,
  },
  bannerTopContainer: {
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "flex-start"
  },
  bannerTopContainer2: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start"
  },
  bannerDicount: {
    fontSize: 12,
    fontFamily: "medium",
    color: COLORS.black,
    marginBottom: 4
  },
  bannerDiscountName: {
    fontSize: 16,
    fontFamily: "bold",
    color: COLORS.black
  },
  bannerDiscountNum: {
    fontSize: 46,
    fontFamily: "bold",
    color: COLORS.black
  },
  bannerBottomContainer: {
    marginTop: 8
  },
  bannerBottomTitle: {
    fontSize: 14,
    fontFamily: "medium",
    color: COLORS.black
  },
  bannerBottomSubtitle: {
    fontSize: 14,
    fontFamily: "medium",
    color: COLORS.black,
    marginTop: 4
  },
  cartNotificationTitle: {
    fontFamily: "TomorrowBold",
    color: "#fff",
    fontSize: normalizeFont(20),
    textTransform: "uppercase"
  },
  cartNotificationLink: {
    fontFamily: "RubikRegular",
    color: "#fff",
    fontSize: normalizeFont(17),
    textDecorationLine: 'underline',
  },
  cartNotificationIcon: {
    width: 20,
    height: 20
  },
  userAvatar: {
    width: 64,
    height: 64,
    borderRadius: 999
  },
  firstName: {
    fontSize: 16,
    fontFamily: "semiBold",
    color: COLORS.dark2,
    marginTop: 6
  },
  bannerItemContainer: {
    width: "100%",
    // paddingBottom: 10,
    // backgroundColor: COLORS.secondary,
    // height: 570,
    // height: 170,
    // borderRadius: 32,
  },
  dotContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#ccc',
    marginHorizontal: 5,
  },
  activeDot: {
    backgroundColor: COLORS.black,
  },

  imageBackground: {
    width: "100%",
    height: SCREEN_HEIGHT * 0.8,
    overflow: 'hidden',
  },
  overlay: {
    backgroundColor: 'rgba(0,0,0,0.3)', // semi-transparent dark overlay
    padding: 20,
    // height: 900
    height: SCREEN_HEIGHT * 0.8,
  },
  bannerTextContainer: {
    flex: 1,
    justifyContent: 'center',
    // alignItems: 'center',
  },
  inverterLabel: {
    color: '#b11216', // red color like image
    // fontSize: 18,
    fontSize: normalizeFont(18),
    letterSpacing: 1,
    fontWeight: '700',
    marginBottom: 10,
  },
  headline: {
    color: '#fff',
    // fontSize: 29,
    fontSize: normalizeFont(29),
    fontFamily: 'TomorrowBold',
    fontWeight: '900',
    lineHeight: 30,
    marginBottom: 20,
  },
  ctaButton: {
    backgroundColor: '#A40000',
    paddingVertical: 10,
    paddingHorizontal: 20,
    alignSelf: 'flex-start',
    borderRadius: 4,
  },
  ctaButtonText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: normalizeFont(14),
  },
  subTitle: {
    color: '#fff', // red color like image
    fontSize: normalizeFont(15),
    letterSpacing: 1,
    fontWeight: '800',
    // marginBottom: 4,
    textTransform: 'uppercase',
    textAlign: 'center',
    marginTop: 20
  },
  mainTitle: {
    color: '#fff',
    fontSize: normalizeFont(28),
    marginTop: Platform.OS === "ios" ? 9 : 15,
    marginBottom: 15,
    fontWeight: '900',
    lineHeight: 33,
    textTransform: 'uppercase',
    textAlign: 'center',
    fontFamily: 'TomorrowBold'
  },



  flatListContainer: {
    paddingHorizontal: 16,
  },
  brandCard: {
    backgroundColor: COLORS.white, // Use your COLORS constant
    borderRadius: 12,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 100,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  brandImage: {
    width: '100%',
    height: 60,
  },

  scrollContent: {
    flexDirection: 'row',      // ✅ this is the important one
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  image: {
    width: 100,
    height: 100,
    marginRight: 16,
  },
  ourProductTitle: {
    color: '#fff',
    fontSize: 28,
    fontWeight: '900',
    lineHeight: 30,
    textTransform: 'uppercase',
    position: 'absolute',
    bottom: 80,
    left: 0,
    right: 0,
    textAlign: 'center',
    fontFamily: 'TomorrowBold'
  },
  name: {
    fontSize: normalizeFont(17),
    color: COLORS.greyscale900,
    marginVertical: 4,
    textAlign: "center",
    maxWidth: 350,
    // lineHeight: 40
  },

})

export default Home;
