// import Category from '@/components/Category';
// import HamburgerDrawer from '@/components/HamburgerDrawer';
// import ProductCard from '@/components/ProductCard';
// import SubHeaderItem from '@/components/SubHeaderItem';
// import { COLORS, icons, images, SIZES } from '@/constants';
// import { brands, ourProducts, useBanners, useCardsData, useCategories } from '@/data';
// import { useAppSelector } from '@/hooks/useAppSelector';
// import { useTheme } from '@/theme/ThemeProvider';
// import { NavigationProp } from '@react-navigation/native';
// import { useNavigation } from 'expo-router';
// import React, { useRef, useState } from 'react';
// import { useTranslation } from 'react-i18next';
// import { Dimensions, FlatList, Image, ImageBackground, ImageSourcePropType, ListRenderItemInfo, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
// import { SafeAreaView } from 'react-native-safe-area-context';
// import { ScrollView } from 'react-native-virtualized-view';
// import '../../lang/i18n';

// interface BannerItem {
//   id: number;
//   label: string;
//   headline1: string;
//   headline2: string;
//   buttonText: string;
//   buttonLink: string;
//   image: ImageSourcePropType;
// }

// interface BrandItem {
//   id: number;
//   discount: string;
//   discountName: string;
//   bottomTitle: string;
//   bottomSubtitle: string;
//   image: ImageSourcePropType;
// }

// const { width } = Dimensions.get('window');

// const Home = () => {
//   const navigation = useNavigation<NavigationProp<any>>();
//   const user = useAppSelector(state => state.user);
//   const collections = useAppSelector(state => state.collections);
//   const [currentIndex, setCurrentIndex] = useState<number>(0);
//   const [currentSquareIndex, setCurrentSquareIndex] = useState<number>(0);
//   const { dark, colors } = useTheme();
//   // const { t } = useTranslation();
// const { t } = i18next();
//   const drawerRef = useRef<any>(null);
//   const banners = useBanners();
//   const cardsData = useCardsData();
//   const categories = useCategories();
//   /**
//   * Render header
//   */

//   const getGreeting = () => {
//     const currentHour = new Date().getHours();

//     if (currentHour >= 5 && currentHour < 12) {
//       return t('header.wishes.morning');
//     } else if (currentHour >= 12 && currentHour < 17) {
//       return t('header.wishes.afternoon');
//     } else if (currentHour >= 17 && currentHour < 21) {
//       return t('header.wishes.evening');
//     } else {
//       return t('header.wishes.night');
//     }
//   };


//   const renderHeader = () => {
//     return (
//       <>
//         <View
//           style={{
//             backgroundColor: "rgb(177, 18, 22)", alignItems: "center",
//             paddingTop: 5,
//             paddingBottom: 5
//           }}
//         >
//           <Text
//             style={{
//               textAlign: "center",
//               color: "white",
//               fontSize: 14,
//               maxWidth: 350,
//             }}
//           >
//             A global leader in power and renewable energy distribution across three continents
//           </Text>
//         </View>
//         {/* <View style={styles.headerContainer}>
//           <View style={styles.viewLeft}>
//           <Image
//             source={dark ? images.noUserWhite : images.noUser}
//             resizeMode='contain'
//             style={styles.userIcon}
//           />
//           <View style={styles.viewNameContainer}>
//             <Text style={styles.greeeting}>{getGreeting()}</Text>
//             <Text style={[styles.title, {
//               color: dark ? COLORS.white : COLORS.greyscale900
//             }]}>{user?.accessToken
//               ? `${user.customer?.firstName ?? ''} ${user.customer?.lastName ?? ''}`.trim()
//               : t('header.guestUser')}</Text>
//           </View>
//         </View>
//           <View style={styles.viewRight}>
//             <TouchableOpacity
//               onPress={() => navigation.navigate("mywishlist")}>
//               <Image
//                 source={icons.heartOutline}
//                 resizeMode='contain'
//                 style={[styles.bookmarkIcon, { tintColor: dark ? COLORS.white : COLORS.greyscale900 }]}
//               />
//             </TouchableOpacity>
//           </View>
//         </View> */}



//         <View style={styles.headerContainer}>
//           <View style={{ flexDirection: "row", alignItems: "center", gap: 20 }}>
//             <TouchableOpacity onPress={() => drawerRef.current.open()}>
//               <Image
//                 source={images.menu}
//                 resizeMode='contain'
//                 style={[styles.userIcon, { tintColor: dark ? COLORS.white : COLORS.greyscale900 }]}
//               />
//             </TouchableOpacity>
//             <TouchableOpacity
//               onPress={() => navigation.navigate("search")}>
//               <Image
//                 source={icons.search3}
//                 resizeMode='contain'
//                 style={[styles.userIcon, { tintColor: dark ? COLORS.white : COLORS.greyscale900 }]}
//               />
//             </TouchableOpacity>
//           </View>
//           <View>
//             <Image
//               source={images.nbsLogo2}
//               resizeMode='contain'
//               style={styles.nbsLogo}
//             />
//           </View>
//           <View style={{ flexDirection: "row", alignItems: "center", gap: 20 }}>
//             <TouchableOpacity
//               onPress={() => navigation.navigate("mywishlist")}>
//               <Image
//                 source={icons.heartOutline}
//                 resizeMode='contain'
//                 style={[styles.userIcon, { tintColor: dark ? COLORS.white : COLORS.greyscale900 }]}
//               />
//             </TouchableOpacity>
//             <TouchableOpacity
//               onPress={() => navigation.navigate("cart")}>
//               <Image
//                 source={icons.bag3Outline}
//                 resizeMode='contain'
//                 style={[styles.userIcon, { tintColor: dark ? COLORS.white : COLORS.greyscale900 }]}
//               />
//             </TouchableOpacity>
//           </View>

//         </View>
//       </>
//     )
//   }
//   /**
//   * Render search bar
//   */
//   // const RenderSearchBar = () => {

//   //   const inputRef = useRef<TextInput>(null);

//   //   const handleInputFocus = () => {
//   //     // blur first so it never stays focused when you come back
//   //     inputRef.current?.blur();
//   //     navigation.navigate("search");
//   //   };

//   //   return (
//   //     <TouchableOpacity
//   //       onPress={() => navigation.navigate("search")}
//   //       style={[styles.searchBarContainer, {
//   //         backgroundColor: dark ? COLORS.dark2 : "#F5F5F5"
//   //       }]}>
//   //       <TouchableOpacity>
//   //         <Image
//   //           source={icons.search2}
//   //           resizeMode='contain'
//   //           style={styles.searchIcon}
//   //         />
//   //       </TouchableOpacity>
//   //       <TextInput
//   //         placeholder='Search'
//   //         placeholderTextColor={COLORS.gray}
//   //         style={styles.searchInput}
//   //         ref={inputRef}
//   //         onFocus={handleInputFocus}
//   //       />
//   //       <TouchableOpacity>
//   //         <Image
//   //           source={icons.filter}
//   //           resizeMode='contain'
//   //           style={[styles.filterIcon, {
//   //             tintColor: dark ? COLORS.white : COLORS.primary
//   //           }]}
//   //         />
//   //       </TouchableOpacity>
//   //     </TouchableOpacity>
//   //   )
//   // }

//   const renderBannerItem = ({ item }: ListRenderItemInfo<BannerItem>) => (
//     <View style={[styles.bannerContainer, {
//       // backgroundColor: dark ? COLORS.dark3 : COLORS.secondary
//     }]}>
//       <ImageBackground
//         source={item.image} // Ensure item.image is a local or remote image
//         style={styles.imageBackground}
//         // imageStyle={{ borderRadius: 10 }}
//         resizeMode="cover"
//       >
//         <View style={styles.overlay}>
//           <View style={styles.bannerTextContainer}>
//             <View style={styles.bannerTopContainer}>
//               <View>
//                 {/* <Text style={[styles.bannerDicount, {
//                   color: dark ? COLORS.white : COLORS.black,
//                 }]}>{item.discount} OFF</Text> */}
//                 <Text style={styles.inverterLabel}>{item.label}</Text>
//                 <Text style={styles.headline}>{item.headline1}{"\n"}{item.headline2}</Text>
//                 <TouchableOpacity style={styles.ctaButton} onPress={() => navigation.navigate("allproducts")}>
//                   <Text style={styles.ctaButtonText}>{item.buttonText}</Text>
//                 </TouchableOpacity>
//                 {/* <Text style={[styles.bannerDiscountName, {
//                   color: dark ? COLORS.white : COLORS.black
//                 }]}>{item.discountName}</Text> */}
//               </View>
//               {/* <Text style={[styles.bannerDiscountNum, {
//                 color: dark ? COLORS.white : COLORS.black
//               }]}>{item.discount}</Text> */}
//             </View>
//             {/* <View style={styles.bannerBottomContainer}>
//             <Text style={[styles.bannerBottomTitle, {
//               color: dark ? COLORS.white : COLORS.black
//             }]}>{item.bottomTitle}</Text>
//             <Text style={[styles.bannerBottomSubtitle, {
//               color: dark ? COLORS.white : COLORS.black
//             }]}>{item.bottomSubtitle}</Text>
//           </View> */}
//           </View>
//         </View>
//       </ImageBackground>
//     </View>
//   );

//   const keyExtractor = (item: { id: number | string }) => item.id.toString();

//   const handleEndReached = () => {
//     setCurrentIndex((prevIndex) => (prevIndex + 1) % banners.length);
//   };

//   const handleEndReached2 = () => {
//     setCurrentSquareIndex((prevIndex) => (prevIndex + 1) % cardsData.length);
//   };

//   const renderDot = (index: number) => {
//     return (
//       <View
//         style={[styles.dot, index === currentIndex ? styles.activeDot : null]}
//         key={index}
//       />
//     );
//   };
//   /**
//   * Render banner
//   */
//   const renderBanner = () => {
//     return (
//       <View style={[styles.bannerItemContainer, {
//         // backgroundColor: dark ? COLORS.dark3 : "#fff"
//         // backgroundColor: "#fff"
//       }]}>
//         <FlatList
//           data={banners}
//           renderItem={renderBannerItem}
//           keyExtractor={keyExtractor}
//           horizontal
//           pagingEnabled
//           showsHorizontalScrollIndicator={false}
//           onEndReached={handleEndReached}
//           onEndReachedThreshold={0.5}
//           onMomentumScrollEnd={(event) => {
//             const newIndex = Math.round(
//               event.nativeEvent.contentOffset.x / SIZES.width
//             );
//             setCurrentIndex(newIndex);
//           }}
//         />
//         <View style={styles.dotContainer}>
//           {banners.map((_, index) => renderDot(index))}
//         </View>
//       </View>
//     )
//   }

//   /**
//   * Render categories
//   */
//   const renderCategories = () => {
//     return (
//       <View>
//         <SubHeaderItem
//           title="Categories"
//           navTitle="See all"
//           onPress={() => navigation.navigate("categories")}
//         />
//         <FlatList
//           data={categories.slice(1, 9)}
//           keyExtractor={(item, index) => index.toString()}
//           horizontal={false}
//           numColumns={4} // Render two items per row
//           renderItem={({ item }) => (
//             <Category
//               name={item.name}
//               icon={item.icon}
//               onPress={item.onPress ? () => navigation.navigate(item.onPress) : undefined}
//             />
//           )}
//         />
//       </View>
//     )
//   }
//   /**
//    * render popular products
//    */
//   const renderPopularProducts = () => {
//     const [selectedCategories, setSelectedCategories] = useState<any[]>(["0"]);

//     // const filteredProducts = collections.data.filter(product => selectedCategories.includes("0"));

//     const targetCollection = collections.data.find(
//       (collection) => collection.id === "gid://shopify/Collection/439108698324"
//     );

//     const filteredProducts = targetCollection ? targetCollection.products : [];


//     // const filteredProducts = collections.data;

//     // Category item
//     const renderCategoryItem = ({ item }: { item: { id: string; name: string } }) => (
//       <TouchableOpacity
//         style={{
//           backgroundColor: selectedCategories.includes(item.id) ? dark ? COLORS.dark3 : COLORS.primary : "transparent",
//           padding: 10,
//           marginVertical: 5,
//           borderColor: dark ? COLORS.dark3 : COLORS.primary,
//           borderWidth: 1.3,
//           borderRadius: 24,
//           marginRight: 12,
//         }}
//         onPress={() => toggleCategory(item.id)}>
//         <Text style={{
//           color: selectedCategories.includes(item.id) ? COLORS.white : dark ? COLORS.white : COLORS.primary
//         }}>{item.name}</Text>
//       </TouchableOpacity>
//     );

//     // Toggle category selection
//     const toggleCategory = (categoryId: string) => {
//       const updatedCategories = [...selectedCategories];
//       const index = updatedCategories.indexOf(categoryId);

//       if (index === -1) {
//         updatedCategories.push(categoryId);
//       } else {
//         updatedCategories.splice(index, 1);
//       }

//       setSelectedCategories(updatedCategories);
//     };
//     return (
//       <View style={{ padding: 16, width: width }}>
//         {/* <SubHeaderItem
//           title="Most Popular"
//           navTitle="See All"
//           onPress={() => navigation.navigate("mostpopularproducts")}
//         /> */}
//         <Text style={[styles.subTitle, {
//           color: dark ? COLORS.white : COLORS.black
//         }]}>{t('popularProducts.subTitle')}</Text>
//         <Text style={[styles.mainTitle, {
//           color: dark ? COLORS.white : COLORS.black
//         }]}>
//           {t('popularProducts.title')}
//         </Text>
//         <FlatList
//           data={categories}
//           horizontal
//           keyExtractor={item => item.id}
//           showsHorizontalScrollIndicator={false}
//           contentContainerStyle={{
//             flexGrow: 1,
//             justifyContent: 'center', // center if there's extra space
//             alignItems: 'center',
//           }}
//           renderItem={renderCategoryItem}
//         />
//         <View style={{
//           backgroundColor: dark ? COLORS.dark1 : COLORS.white,
//           marginVertical: 16,
//         }}>
//           <FlatList
//             // data={filteredProducts}
//             // keyExtractor={item => item.id}
//             // numColumns={2}
//             // columnWrapperStyle={{ gap: 16 }}
//             // showsVerticalScrollIndicator={false}
//             data={filteredProducts}
//             keyExtractor={item => item.id}
//             horizontal
//             showsHorizontalScrollIndicator={false}
//             renderItem={({ item }) => {
//               return (
//                 <ProductCard
//                   merchandiseId={item.id}
//                   name={item.title}
//                   image={item?.image}
//                   price={item.price}
//                   oldPrice={item.oldPrice}
//                   availableForSale={item?.available}
//                   onPress={() => navigation.navigate("productdetails", {
//                     id: item.id,
//                   })}
//                 />
//               )
//             }}
//           />
//         </View>
//       </View>
//     )
//   };

//   const renderBrandItem = ({ item }: { item: { id: string; image: ImageSourcePropType } }) => (
//     <View>
//       <Image
//         source={item.image}
//         resizeMode="contain"
//         style={{ width: 200, height: 200 }} // fixed width/height so they don’t stretch
//       />
//     </View>
//   );


//   const renderOurBrands = () => {
//     return (
//       <View style={[styles.bannerItemContainer, {
//         // backgroundColor: dark ? COLORS.dark3 : COLORS.secondary
//         backgroundColor: dark ? COLORS.dark1 : 'rgb(244, 244, 244)'
//       }]}>
//         <Text style={[styles.subTitle, {
//           color: dark ? COLORS.white : COLORS.black
//         }]}> {t('ourBrandPartners.title')}</Text>
//         <Text style={[styles.mainTitle, {
//           color: dark ? COLORS.white : COLORS.black
//         }]}>{t('ourBrandPartners.subTitle')}</Text>
//         <FlatList
//           data={brands}
//           horizontal
//           style={{ direction: 'ltr' }}
//           keyExtractor={(item) => item.id}
//           showsHorizontalScrollIndicator={false}
//           contentContainerStyle={{ paddingHorizontal: 16 }} // padding left & right
//           ItemSeparatorComponent={() => <View style={{ width: 20 }} />} // gap between images
//           renderItem={renderBrandItem}
//         />
//       </View>
//     )
//   }

// const renderOurGenerators = () => {
//   const targetCollection = collections.data.find(
//     (collection) => collection.id === "gid://shopify/Collection/439108698324"
//   );
//   const filteredProducts = targetCollection ? targetCollection.products : [];
//   return (
//     <View style={[styles.bannerItemContainer, {
//       // backgroundColor: dark ? COLORS.dark3 : COLORS.secondary
//       // backgroundColor: dark ? COLORS.dark3 : colors.background
//     }]}>
//       <Text style={[styles.subTitle, {
//         color: dark ? COLORS.white : COLORS.black
//       }]}>{t('ourGenerators.subTitle')}</Text>
//       <Text style={[styles.mainTitle, {
//         color: dark ? COLORS.white : COLORS.black
//       }]}>{t('ourGenerators.title')}</Text>
//       <View style={{ padding: 16 }} >
//         <FlatList
//           data={filteredProducts}
//           keyExtractor={item => item.id}
//           horizontal
//           showsHorizontalScrollIndicator={false}
//           renderItem={({ item }) => {
//             return (
//               <View>
//                 <ProductCard
//                   merchandiseId={item.id}
//                   name={item.title}
//                   image={item?.image}
//                   price={item.price}
//                   oldPrice={item.oldPrice}
//                   availableForSale={item?.available}
//                   onPress={() => navigation.navigate("productdetails", {
//                     id: item.id,
//                   })}
//                 />
//               </View>
//             )
//           }}
//         />
//       </View>
//     </View>
//   )
// }

// const renderOurProductItem = ({ item }: { item: { id: string; title: string; image: ImageSourcePropType; collectionId: string; } }) => (
//   <View>
//     <TouchableOpacity
//       onPress={() => navigation.navigate("collectionscreen", { collectionId: item.collectionId, collectionTitle: item.title, collectionImage: item.image })}>
//       <Image
//         source={item.image}
//         resizeMode="contain"
//         style={{ width: 400, height: 500 }} // fixed width/height so they don’t stretch
//       />
//       <Text style={[styles.ourProductTitle, {
//         color: COLORS.white
//       }]}>{item.title}</Text>
//     </TouchableOpacity>
//   </View>
// );

// const renderOurProducts = () => {
//   return (
//     <View style={[styles.bannerItemContainer, {
//       backgroundColor: 'rgb(1, 73, 133)'
//     }]}>
//       <Text style={[styles.subTitle, {
//         color: COLORS.white
//       }]}>{t('ourProducts.title')}</Text>
//       <Text style={[styles.mainTitle, {
//         color: COLORS.white
//       }]}>{t('ourProducts.subTitle')}</Text>
//       <FlatList
//         data={ourProducts}
//         horizontal
//         keyExtractor={(item) => item.id}
//         showsHorizontalScrollIndicator={false}
//         contentContainerStyle={{ paddingHorizontal: 16 }} // padding left & right
//         ItemSeparatorComponent={() => <View style={{ width: 20 }} />} // gap between images
//         renderItem={renderOurProductItem}
//       />
//     </View>
//   )
// }

// const renderOurInverters = () => {
//   const targetCollection = collections.data.find(
//     (collection) => collection.id === "gid://shopify/Collection/439108698324"
//   );
//   const filteredProducts = targetCollection ? targetCollection.products : [];
//   return (
//     <View style={[styles.bannerItemContainer, {
//       // backgroundColor: dark ? COLORS.dark3 : COLORS.secondary
//       // backgroundColor: dark ? COLORS.dark3 : colors.background
//     }]}>
//       <Text style={[styles.subTitle, {
//         color: dark ? COLORS.white : COLORS.black
//       }]}>{t('ourInverters.subTitle')}</Text>
//       <Text style={[styles.mainTitle, {
//         color: dark ? COLORS.white : COLORS.black
//       }]}>{t('ourInverters.title')}</Text>
//       <View style={{ padding: 16 }} >
//         <FlatList
//           data={filteredProducts}
//           keyExtractor={item => item.id}
//           horizontal
//           showsHorizontalScrollIndicator={false}
//           renderItem={({ item }) => {
//             return (
//               <View>
//                 <ProductCard
//                   merchandiseId={item.id}
//                   name={item.title}
//                   image={item?.image}
//                   price={item.price}
//                   oldPrice={item.oldPrice}
//                   availableForSale={item?.available}
//                   onPress={() => navigation.navigate("productdetails", {
//                     id: item.id,
//                   })}
//                 />
//               </View>
//             )
//           }}
//         />
//       </View>
//     </View>
//   )
// }

// const renderOurWaterPumps = () => {
//   const targetCollection = collections.data.find(
//     (collection) => collection.id === "gid://shopify/Collection/439108698324"
//   );
//   const filteredProducts = targetCollection ? targetCollection.products : [];
//   return (
//     <View style={[styles.bannerItemContainer, {
//       // paddingBottom: 30
//       backgroundColor: dark ? COLORS.dark1 : 'rgb(244, 244, 244)'
//     }]}>
//       <Text style={[styles.subTitle, {
//         color: dark ? COLORS.white : COLORS.black
//       }]}>{t('ourWaterPump.subTitle')}</Text>
//       <Text style={[styles.mainTitle, {
//         color: dark ? COLORS.white : COLORS.black
//       }]}>{t('ourWaterPump.title')}</Text>
//       <View style={{ padding: 16 }} >
//         <FlatList
//           data={filteredProducts}
//           keyExtractor={item => item.id}
//           horizontal
//           showsHorizontalScrollIndicator={false}
//           renderItem={({ item }) => {
//             return (
//               <View>
//                 <ProductCard
//                   merchandiseId={item.id}
//                   name={item.title}
//                   image={item?.image}
//                   price={item.price}
//                   oldPrice={item.oldPrice}
//                   availableForSale={item?.available}
//                   onPress={() => navigation.navigate("productdetails", {
//                     id: item.id,
//                   })}
//                 />
//               </View>
//             )
//           }}
//         />
//       </View>
//     </View>
//   )
// }

//   const renderCardItem = ({ item }: { item: { id: string; title: string; subTitle: string; icon: ImageSourcePropType } }) => (
//     <View style={{ width, height: 200 }}>
//       <View style={{
//         alignItems: 'center',
//         justifyContent: 'center',
//         flex: 1
//       }} >
//         <Image
//           source={item.icon}
//           resizeMode="contain"
//           style={{ width: 30, height: 30, alignSelf: 'center' }}
//         />
//         <Text style={[styles.subTitle, {
//           color: COLORS.white,
//           fontSize: 16
//         }]}>{item.title}</Text>
//         <Text style={[styles.name, {
//           color: COLORS.white
//         }]}>{item.subTitle}</Text>
//       </View>
//     </View >
//   );

//   const renderSquareDot = (index: number) => {
//     return (
//       <View
//         style={[styles.squareDot, index === currentSquareIndex ? styles.activeSquareDot : null]}
//         key={index}
//       />
//     );
//   };

//   const renderCards = () => {
//     return (
//       <View style={[styles.bannerItemContainer, {
//         backgroundColor: 'rgb(177, 18, 22)',
//         paddingBottom: 20
//       }]}>
//         <FlatList
//           data={cardsData}
//           style={{ direction: 'ltr' }}
//           horizontal
//           keyExtractor={(item) => item.id}
//           renderItem={renderCardItem}
//           pagingEnabled      // ✅ snap to one full screen
//           snapToAlignment="center"
//           decelerationRate="fast"
//           showsHorizontalScrollIndicator={false}
//         />
//       </View>
//     )
//   }

//   return (
//     <SafeAreaView style={[styles.area, { backgroundColor: dark ? COLORS.dark1 : COLORS.white }]}>
//       <View style={[styles.container, { backgroundColor: colors.background }]}>
//         {renderHeader()}
//         {/* {RenderSearchBar()} */}
//         <ScrollView showsVerticalScrollIndicator={true} style={{ marginBottom: 40 }}>
//           {renderBanner()}
//           {/* {renderCategories()} */}
//           {renderPopularProducts()}
//           {renderOurBrands()}
//           {renderOurGenerators()}
//           {renderOurProducts()}
//           {renderOurInverters()}
//           {renderOurWaterPumps()}
//           {renderCards()}
//         </ScrollView>
//         <HamburgerDrawer ref={drawerRef} />
//       </View>
//     </SafeAreaView>
//   );
// }

// const styles = StyleSheet.create({
//   area: {
//     flex: 1,
//   },
//   container: {
//     flex: 1,
//     backgroundColor: COLORS.white,
//     // padding: 16
//     paddingBottom: 20
//   },
//   headerContainer: {
//     flexDirection: "row",
//     // width: SIZES.width - 32,
//     justifyContent: "space-between",
//     alignItems: "center",
//     paddingLeft: 16,
//     paddingBottom: 6,
//     paddingRight: 16,
//     borderBottomWidth: 0.4
//   },
//   userIcon: {
//     width: 28,
//     height: 38,
//     // borderRadius: 32
//   },
//   nbsLogo: {
//     width: 128,
//     height: 68,
//     borderRadius: 32
//   },
//   viewLeft: {
//     flexDirection: "row",
//     alignItems: "center"
//   },
//   greeeting: {
//     fontSize: 12,
//     fontFamily: "regular",
//     color: "gray",
//     marginBottom: 4
//   },
//   title: {
//     fontSize: 20,
//     fontFamily: "bold",
//     color: COLORS.greyscale900
//   },
//   viewNameContainer: {
//     marginLeft: 12
//   },
//   viewRight: {
//     flexDirection: "row",
//     alignItems: "center"
//   },
//   bellIcon: {
//     height: 24,
//     width: 24,
//     tintColor: COLORS.black,
//     marginRight: 8
//   },
//   bookmarkIcon: {
//     height: 24,
//     width: 24,
//     tintColor: COLORS.black
//   },
//   searchBarContainer: {
//     width: SIZES.width - 32,
//     backgroundColor: COLORS.secondaryWhite,
//     padding: 16,
//     borderRadius: 12,
//     height: 52,
//     marginVertical: 16,
//     flexDirection: "row",
//     alignItems: "center",
//     marginLeft: 16
//   },
//   searchIcon: {
//     height: 24,
//     width: 24,
//     tintColor: COLORS.gray
//   },
//   searchInput: {
//     flex: 1,
//     fontSize: 16,
//     fontFamily: "regular",
//     marginHorizontal: 8
//   },
//   filterIcon: {
//     width: 24,
//     height: 24,
//     tintColor: COLORS.primary
//   },
//   bannerContainer: {
//     // width: SIZES.width - 32,
//     width: width,
//     // paddingHorizontal: 16,
//     // borderRadius: 10,
//   },
//   bannerTopContainer: {
//     flexDirection: "column",
//     justifyContent: "space-between",
//     alignItems: "flex-start"
//   },
//   bannerTopContainer2: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "flex-start"
//   },
//   bannerDicount: {
//     fontSize: 12,
//     fontFamily: "medium",
//     color: COLORS.black,
//     marginBottom: 4
//   },
//   bannerDiscountName: {
//     fontSize: 16,
//     fontFamily: "bold",
//     color: COLORS.black
//   },
//   bannerDiscountNum: {
//     fontSize: 46,
//     fontFamily: "bold",
//     color: COLORS.black
//   },
//   bannerBottomContainer: {
//     marginTop: 8
//   },
//   bannerBottomTitle: {
//     fontSize: 14,
//     fontFamily: "medium",
//     color: COLORS.black
//   },
//   bannerBottomSubtitle: {
//     fontSize: 14,
//     fontFamily: "medium",
//     color: COLORS.black,
//     marginTop: 4
//   },
//   userAvatar: {
//     width: 64,
//     height: 64,
//     borderRadius: 999
//   },
//   firstName: {
//     fontSize: 16,
//     fontFamily: "semiBold",
//     color: COLORS.dark2,
//     marginTop: 6
//   },
//   bannerItemContainer: {
//     width: "100%",
//     // paddingBottom: 10,
//     // backgroundColor: COLORS.secondary,
//     // height: 570,
//     // height: 170,
//     // borderRadius: 32,
//   },
//   dotContainer: {
//     flexDirection: 'row',
//     justifyContent: 'center',
//     alignItems: 'center',
//     marginTop: 10,
//   },
//   dot: {
//     width: 10,
//     height: 10,
//     borderRadius: 5,
//     backgroundColor: '#ccc',
//     marginHorizontal: 5,
//   },
//   activeDot: {
//     backgroundColor: COLORS.black,
//   },
//   squareDotContainer: {
//     flexDirection: 'row',
//     justifyContent: 'center',
//     alignItems: 'center',
//     marginTop: 10,
//   },
//   squareDot: {
//     width: 10,
//     height: 10,
//     backgroundColor: 'rgb(255,255,255)',
//     opacity: 0.3,
//     marginHorizontal: 5,
//   },
//   activeSquareDot: {
//     opacity: 1,
//   },




//   // bannerContainer: {
//   //   width: '100%',
//   // },
//   imageBackground: {
//     width: "100%",
//     height: 900,
//     // borderRadius: 10,
//     overflow: 'hidden',
//     // objectFit: 'cover'
//   },
//   overlay: {
//     backgroundColor: 'rgba(0,0,0,0.3)', // semi-transparent dark overlay
//     padding: 20,
//     height: 900
//   },
//   bannerTextContainer: {
//     flex: 1,
//     justifyContent: 'center',
//     // alignItems: 'center',
//   },
//   inverterLabel: {
//     color: '#FF3B3F', // red color like image
//     fontSize: 18,
//     letterSpacing: 1,
//     fontWeight: '600',
//     marginBottom: 10,
//   },
//   headline: {
//     color: '#fff',
//     fontSize: 29,
//     fontWeight: '900',
//     lineHeight: 30,
//     marginBottom: 20,
//   },
//   ctaButton: {
//     backgroundColor: '#A40000',
//     paddingVertical: 10,
//     paddingHorizontal: 20,
//     alignSelf: 'flex-start',
//     borderRadius: 4,
//   },
//   ctaButtonText: {
//     color: '#fff',
//     fontWeight: '700',
//     fontSize: 14,
//   },
//   subTitle: {
//     color: '#fff', // red color like image
//     fontSize: 15,
//     letterSpacing: 1,
//     fontWeight: '800',
//     marginBottom: 8,
//     textTransform: 'uppercase',
//     textAlign: 'center',
//     marginTop: 20
//   },
//   mainTitle: {
//     color: '#fff',
//     fontSize: 28,
//     marginTop: 15,
//     marginBottom: 15,
//     fontWeight: '900',
//     lineHeight: 30,
//     textTransform: 'uppercase',
//     textAlign: 'center'
//   },



//   flatListContainer: {
//     paddingHorizontal: 16,
//   },
//   brandCard: {
//     backgroundColor: COLORS.white, // Use your COLORS constant
//     borderRadius: 12,
//     padding: 20,
//     alignItems: 'center',
//     justifyContent: 'center',
//     minHeight: 100,
//     shadowColor: '#000',
//     shadowOffset: {
//       width: 0,
//       height: 2,
//     },
//     shadowOpacity: 0.1,
//     shadowRadius: 4,
//     elevation: 3,
//   },
//   brandImage: {
//     width: '100%',
//     height: 60,
//   },

//   scrollContent: {
//     flexDirection: 'row',      // ✅ this is the important one
//     alignItems: 'center',
//     paddingHorizontal: 10,
//   },
//   image: {
//     width: 100,
//     height: 100,
//     marginRight: 16,
//   },
//   ourProductTitle: {
//     color: '#fff',
//     fontSize: 28,
//     fontWeight: '900',
//     lineHeight: 30,
//     textTransform: 'uppercase',
//     position: 'absolute',
//     bottom: 80,
//     left: 0,
//     right: 0,
//     textAlign: 'center',
//   },
//   name: {
//     fontSize: 18,
//     color: COLORS.greyscale900,
//     marginVertical: 4,
//     textAlign: "center",
//     maxWidth: 350,
//     // lineHeight: 40
//   },

// })

// export default Home

import Category from '@/components/Category';
import HamburgerDrawer from '@/components/HamburgerDrawer';
import ProductCard from '@/components/ProductCard';
import { COLORS, icons, images, SIZES } from '@/constants';
import { brands, ourProducts, useBanners, useCardsData, useCategories } from '@/data';
import { useAppSelector } from '@/hooks/useAppSelector';
import { useTheme } from '@/theme/ThemeProvider';
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
  ImageBackground,
  ImageSourcePropType,
  InteractionManager,
  ListRenderItemInfo,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ScrollView } from 'react-native-virtualized-view';
// import '../../lang/i18n';

const { width } = Dimensions.get('window');

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
  const cardsData = useCardsData();
  const categories = useCategories();
  const [ready, setReady] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState<string[]>(["0"]);

  useEffect(() => {
    const task = InteractionManager.runAfterInteractions(() => setReady(true));
    return () => task.cancel();
  }, []);

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour >= 5 && hour < 12) return t('header.wishes.morning');
    if (hour >= 12 && hour < 17) return t('header.wishes.afternoon');
    if (hour >= 17 && hour < 21) return t('header.wishes.evening');
    return t('header.wishes.night');
  };

  const useCollectionProducts = (collections: any, gid: string) =>
    useMemo(() => {
      const col = collections?.data?.find((c: any) => c.id === gid);
      return col ? col.products : [];
    }, [collections?.data, gid]);

  // ✅ Move all hook calls to top level
  const popularProducts = useCollectionProducts(collections, 'gid://shopify/Collection/439108698324');
  const ourGenerators = useCollectionProducts(collections, 'gid://shopify/Collection/439108698324');
  const ourInverters = useCollectionProducts(collections, 'gid://shopify/Collection/439108698324');
  const ourWaterPumps = useCollectionProducts(collections, 'gid://shopify/Collection/439108698324');

  const renderHeader = useCallback(() => (
    <>
      <View style={{ backgroundColor: "rgb(177, 18, 22)", alignItems: "center", paddingTop: 5, paddingBottom: 5 }}>
        <Text style={{ textAlign: "center", color: "white", fontSize: 14, maxWidth: 350 }}>
          A global leader in power and renewable energy distribution across three continents
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
        <Image source={images.nbsLogo2} resizeMode='contain' style={styles.nbsLogo} />
        <View style={{ flexDirection: "row", alignItems: "center", gap: 20 }}>
          <TouchableOpacity onPress={() => navigation.navigate("mywishlist")}>
            <Image source={icons.heartOutline} resizeMode='contain' style={[styles.userIcon, { tintColor: dark ? COLORS.white : COLORS.greyscale900 }]} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate("cart")}>
            <Image source={icons.bag3Outline} resizeMode='contain' style={[styles.userIcon, { tintColor: dark ? COLORS.white : COLORS.greyscale900 }]} />
          </TouchableOpacity>
        </View>
      </View>
    </>
  ), [dark]);

  const renderBannerItem = useCallback(({ item }: ListRenderItemInfo<BannerItem>) => (
    <View style={styles.bannerContainer}>
      <ImageBackground source={item.image} style={styles.imageBackground} resizeMode="cover">
        <View style={styles.overlay}>
          <View style={styles.bannerTextContainer}>
            <View style={styles.bannerTopContainer}>
              <Text style={styles.inverterLabel}>{item.label}</Text>
              <Text style={styles.headline}>{item.headline1}{"\n"}{item.headline2}</Text>
              <TouchableOpacity style={styles.ctaButton} onPress={() => navigation.navigate("allproducts")}>
                <Text style={styles.ctaButtonText}>{item.buttonText}</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ImageBackground>
    </View>
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

  const renderBrandItem = useCallback(({ item }: { item: { id: string; image: ImageSourcePropType } }) => (
    <View>
      <Image source={item.image} resizeMode="contain" style={{ width: 200, height: 200 }} />
    </View>
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
  ), [brands, dark, navigation, t]);

  const renderCards = useCallback(() => (
    <View style={[styles.bannerItemContainer, { backgroundColor: 'rgb(177, 18, 22)', paddingBottom: 20 }]}>
      <FlatList
        data={cardsData}
        horizontal
        style={{ direction: 'ltr' }}
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <View style={{ width, height: 200, alignItems: 'center', justifyContent: 'center' }}>
            <Image source={item.icon} resizeMode="contain" style={{ width: 30, height: 30 }} />
            <Text style={[styles.subTitle, { color: COLORS.white, fontSize: 16 }]}>{item.title}</Text>
            <Text style={[styles.name, { color: COLORS.white }]}>{item.subTitle}</Text>
          </View>
        )}
      />
    </View>
  ), [cardsData]);


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
        <Text style={{ color: selectedCategories.includes(item.id) ? COLORS.white : (dark ? COLORS.white : COLORS.primary) }}>
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
        <FlatList
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
        />
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
              name={item.title}
              image={item.image}
              price={item.price}
              oldPrice={item.oldPrice}
              availableForSale={item.available}
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
                merchandiseId={item.id}
                name={item.title}
                image={item.image}
                price={item.price}
                oldPrice={item.oldPrice}
                availableForSale={item.available}
                onPress={() =>
                  navigation.navigate('productdetails', { id: item.id })
                }
              />
            )}
          />
        </View>
      </View>
    );
  }, [collections, dark, navigation, t]);

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
          <Image source={item.image} resizeMode="contain" style={{ width: 400, height: 500 }} />
          <Text style={[styles.ourProductTitle, { color: COLORS.white }]}>{item.title}</Text>
        </TouchableOpacity>
      </View>
    ),
  );

  /* ------------------------------------------------------------------ */
  const renderOurProducts = useCallback(() => (
    <View style={[styles.bannerItemContainer, { backgroundColor: 'rgb(1, 73, 133)' }]}>
      <Text style={[styles.subTitle, { color: COLORS.white }]}>{t('ourProducts.title')}</Text>
      <Text style={[styles.mainTitle, { color: COLORS.white }]}>{t('ourProducts.subTitle')}</Text>

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
  const renderOurInverters = useCallback(() => {
    const products = ourInverters;

    return (
      <View style={[styles.bannerItemContainer]}>
        <Text style={[styles.subTitle, { color: dark ? COLORS.white : COLORS.black }]}>
          {t('ourInverters.subTitle')}
        </Text>
        <Text style={[styles.mainTitle, { color: dark ? COLORS.white : COLORS.black }]}>
          {t('ourInverters.title')}
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
                merchandiseId={item.id}
                name={item.title}
                image={item.image}
                price={item.price}
                oldPrice={item.oldPrice}
                availableForSale={item.available}
                onPress={() =>
                  navigation.navigate('productdetails', { id: item.id })
                }
              />
            )}
          />
        </View>
      </View>
    );
  }, [collections, dark, navigation, t]);

  /* ------------------------------------------------------------------ */
  const renderOurWaterPumps = useCallback(() => {
    const products = ourWaterPumps;

    return (
      <View style={[
        styles.bannerItemContainer,
        { backgroundColor: dark ? COLORS.dark1 : 'rgb(244, 244, 244)' },
      ]}>
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
                merchandiseId={item.id}
                name={item.title}
                image={item.image}
                price={item.price}
                oldPrice={item.oldPrice}
                availableForSale={item.available}
                onPress={() =>
                  navigation.navigate('productdetails', { id: item.id })
                }
              />
            )}
          />
        </View>
      </View>
    );
  }, [collections, dark, navigation, t]);



  return (
    <SafeAreaView style={[styles.area, { backgroundColor: dark ? COLORS.dark1 : COLORS.white }]}>
      <View style={[styles.container, { backgroundColor: colors.background }]}>
        {renderHeader()}
        <ScrollView showsVerticalScrollIndicator style={{ marginBottom: 40 }}>
          {renderBanner()}
          {renderPopularProducts()}
          {ready && renderOurBrands()}
          {ready && renderOurGenerators()}
          {ready && renderOurProducts()}
          {ready && renderOurInverters()}
          {ready && renderOurWaterPumps()}
          {ready && renderCards()}
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
    borderBottomWidth: 0.4
  },
  userIcon: {
    width: 28,
    height: 38,
    // borderRadius: 32
  },
  nbsLogo: {
    width: 128,
    height: 68,
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
  squareDotContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  squareDot: {
    width: 10,
    height: 10,
    backgroundColor: 'rgb(255,255,255)',
    opacity: 0.3,
    marginHorizontal: 5,
  },
  activeSquareDot: {
    opacity: 1,
  },




  // bannerContainer: {
  //   width: '100%',
  // },
  imageBackground: {
    width: "100%",
    height: 900,
    // borderRadius: 10,
    overflow: 'hidden',
    // objectFit: 'cover'
  },
  overlay: {
    backgroundColor: 'rgba(0,0,0,0.3)', // semi-transparent dark overlay
    padding: 20,
    height: 900
  },
  bannerTextContainer: {
    flex: 1,
    justifyContent: 'center',
    // alignItems: 'center',
  },
  inverterLabel: {
    color: '#FF3B3F', // red color like image
    fontSize: 18,
    letterSpacing: 1,
    fontWeight: '600',
    marginBottom: 10,
  },
  headline: {
    color: '#fff',
    fontSize: 29,
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
    fontSize: 14,
  },
  subTitle: {
    color: '#fff', // red color like image
    fontSize: 15,
    letterSpacing: 1,
    fontWeight: '800',
    marginBottom: 8,
    textTransform: 'uppercase',
    textAlign: 'center',
    marginTop: 20
  },
  mainTitle: {
    color: '#fff',
    fontSize: 28,
    marginTop: 15,
    marginBottom: 15,
    fontWeight: '900',
    lineHeight: 30,
    textTransform: 'uppercase',
    textAlign: 'center'
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
  },
  name: {
    fontSize: 18,
    color: COLORS.greyscale900,
    marginVertical: 4,
    textAlign: "center",
    maxWidth: 350,
    // lineHeight: 40
  },

})

export default Home;
