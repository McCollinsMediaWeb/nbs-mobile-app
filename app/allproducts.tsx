// import ProductCard from '@/components/ProductCard';
// import { ourProducts } from '@/data';
// import { useAppSelector } from '@/hooks/useAppSelector';
// import { fetchGraphQL } from '@/utils/fetchGraphql';
// import { NavigationProp } from '@react-navigation/native';
// import { useNavigation } from 'expo-router';
// import React, { useEffect, useState } from 'react';
// import { useTranslation } from 'react-i18next';
// import { ActivityIndicator, FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
// import { SafeAreaView } from 'react-native-safe-area-context';
// import { ScrollView } from 'react-native-virtualized-view';
// import HeaderWithSearch from '../components/HeaderWithSearch';
// import { COLORS, icons } from '../constants';
// import { useTheme } from '../theme/ThemeProvider';

// type Product = {
//     id: string;
//     title: string;
//     description?: string;
//     tags?: string[];
//     productType?: string;
//     price: string;
//     oldPrice: string;
//     image: string;
//     merchandiseId?: string;
//     cursor?: string | null;
//     available?: boolean | null;
// };


// const AllProducts = () => {
//     const navigation = useNavigation<NavigationProp<any>>();
//     const { dark, colors } = useTheme();
//     const [loading, setLoading] = useState(false);
//     const [products, setProducts] = useState<Product[]>([]);
//     const [hasNextPage, setHasNextPage] = useState(false);
//     const { t } = useTranslation();
//     const [endCursor, setEndCursor] = useState<string | null>(null);
//     const appLanguage = useAppSelector(state => state.generalSettings.language);


//     useEffect(() => {
//         const loadProducts = async () => {
//             setLoading(true);
//             const res = await fetchProductsFromShopify()
//             setProducts(res.products);
//             setHasNextPage(res.hasNextPage);
//             setEndCursor(res.endCursor);
//             setLoading(false);
//         };
//         loadProducts();
//     }, []);

//     const loadMoreProducts = async () => {
//         setLoading(true);
//         const res = await fetchProductsFromShopify();
//         setProducts((prev) => [...prev, ...res.products]);
//         setHasNextPage(res.hasNextPage);
//         setEndCursor(res.endCursor);
//         setLoading(false);
//     };



//     const fetchProductsFromShopify = async (
//         cursor?: string
//     ): Promise<{ products: Product[]; hasNextPage: boolean; endCursor: string | null }> => {
//         const query = `
// {
//   products(first: 30${cursor ? `, after: "${cursor}"` : ""}) {
//     pageInfo {
//       hasNextPage
//     }
//     edges {
//       cursor
//       node {
//         id
//         title
//         description
//         tags
//         productType
//         priceRange {
//           minVariantPrice {
//             amount
//           }
//         }
//         compareAtPriceRange {
//           maxVariantPrice {
//             amount
//           }
//         }
//         images(first: 1) {
//           edges {
//             node {
//               transformedSrc
//             }
//           }
//         }
//         variants(first: 1) {
//           edges {
//             node {
//               id
//             }
//           }
//         }
//       }
//     }
//   }
// }
// `;


//         try {
//             const res = await fetchGraphQL(query);
//             const edges = res.data.products.edges;
//             const hasNextPage = res.data.products.pageInfo.hasNextPage;


//             const products: Product[] = edges.map((edge: any) => ({
//                 id: edge.node.id,
//                 title: edge.node.title,
//                 description: edge.node.description,
//                 tags: edge.node.tags,
//                 productType: edge.node.productType,
//                 price: edge.node.priceRange.minVariantPrice.amount,
//                 oldPrice: edge.node.compareAtPriceRange.maxVariantPrice.amount,
//                 image: edge.node.images.edges[0]?.node.transformedSrc,
//                 merchandiseId: edge.node.variants.edges[0]?.node.id,
//                 cursor: edge.cursor,
//             }));

//             return {
//                 products,
//                 hasNextPage,
//                 endCursor: edges.at(-1)?.cursor ?? null,
//             };
//         } catch (err) {
//             console.error("Failed to fetch products:", err);
//             return { products: [], hasNextPage: false, endCursor: null };
//         }
//     };


//     return (
//         <SafeAreaView style={[styles.area, { backgroundColor: colors.background }]}>
//             <View style={[styles.container, { backgroundColor: colors.background }]}>
//                 <View style={{ padding: 16 }}>
//                     <HeaderWithSearch
//                         title={t('allProduct.title')}
//                         icon={icons.search}
//                         onPress={() => navigation.navigate("search")}
//                     />
//                 </View>
//                 <ScrollView
//                     style={styles.scrollView}
//                     showsVerticalScrollIndicator={false}>
//                     <View style={{
//                         height: 100,
//                         justifyContent: 'center',
//                         alignItems: 'center'
//                     }}>
//                         <Text style={styles.headline} >PRODUCTS</Text>
//                     </View>
//                     <View style={{ width: "100%", height: 1, backgroundColor: COLORS.greyscale600 }} />
//                     <View style={{ padding: 16, flexDirection: 'row', alignItems: 'center', }} >
//                         <View style={{ padding: 10 }}>
//                             <Text style={{ color: "rgb(44,44,44)", fontWeight: "bold", fontSize: 13 }}>QUICK LINKS</Text>
//                         </View>
//                         <FlatList
//                             data={ourProducts}
//                             horizontal
//                             style={{ direction: 'ltr' }}
//                             keyExtractor={(item) => item.id}
//                             showsHorizontalScrollIndicator={false}
//                             contentContainerStyle={{ paddingHorizontal: 16 }} // padding left & right
//                             ItemSeparatorComponent={() => <View style={{ width: 20 }} />} // gap between images
//                             renderItem={({ item }) => {
//                                 return (
//                                     <TouchableOpacity
//                                         onPress={() => navigation.navigate("collectionscreen", { collectionId: item.collectionId, collectionTitle: item.title, collectionImage: item.image })}>
//                                         <View style={{ alignItems: 'center' }}>
//                                             <Text style={{ fontSize: 17, paddingBottom: 4 }}>{item.title}</Text>
//                                         </View>
//                                     </TouchableOpacity>
//                                 );
//                             }}
//                         />
//                     </View>
//                     <View style={{ backgroundColor: "rgb(1,73,133)", paddingHorizontal: 16, paddingVertical: 24 }}>
//                         <FlatList
//                             data={ourProducts}
//                             horizontal
//                             keyExtractor={(item) => item.id}
//                             showsHorizontalScrollIndicator={false}
//                             contentContainerStyle={{ paddingHorizontal: 16 }} // padding left & right
//                             ItemSeparatorComponent={() => <View style={{ width: 20 }} />} // gap between images
//                             renderItem={({ item }) => {
//                                 return (
//                                     <View>
//                                         <TouchableOpacity
//                                             onPress={() => navigation.navigate("collectionscreen", { collectionId: item.collectionId, collectionTitle: item.title, collectionImage: item.image })}>
//                                             <Image
//                                                 source={item.image}
//                                                 resizeMode="contain"
//                                                 style={{ width: 200, height: 200 }} // fixed width/height so they don’t stretch
//                                             />
//                                             <Text style={{ textAlign: "center", fontSize: 20, marginTop: 20, color: '#fff' }}>{item.title}</Text>
//                                         </TouchableOpacity>
//                                     </View>
//                                 );
//                             }}
//                         />
//                     </View>
//                     <View style={{
//                         backgroundColor: dark ? COLORS.dark1 : COLORS.white,
//                         marginVertical: 16
//                     }}>
//                         <FlatList
//                             data={products}
//                             keyExtractor={(item) => item.id}
//                             numColumns={2}
//                             columnWrapperStyle={{ gap: 16 }}
//                             showsVerticalScrollIndicator={false}
//                             renderItem={({ item }) => (
//                                 <ProductCard
//                                     merchandiseId={item.id}
//                                     name={item.title}
//                                     image={item?.image}
//                                     price={item.price}
//                                     oldPrice={item.oldPrice}
//                                     availableForSale={item?.available}
//                                     onPress={() => navigation.navigate("productdetails", {
//                                         id: item.id,
//                                     })}
//                                 />
//                             )}

//                             onEndReached={() => {
//                                 if (hasNextPage && !loading) {
//                                     // loadMoreProducts();
//                                 }
//                             }}
//                             onEndReachedThreshold={0.5}

//                         />
//                     </View>
//                 </ScrollView>
//                 {loading && (
//                     <ActivityIndicator
//                         style={{
//                             position: "absolute",
//                             top: "50%",
//                             left: "50%",
//                             right: "50%",
//                             bottom: "50%",
//                             justifyContent: "center",
//                             alignItems: "center",
//                             zIndex: 999,
//                             width: 0,
//                             height: 0,
//                             backgroundColor: "black", // Ensure the background is transparent
//                         }}
//                         size="large"
//                         color={COLORS.black}
//                     />
//                 )}
//             </View>
//         </SafeAreaView>
//     )
// };

// const styles = StyleSheet.create({
//     area: {
//         flex: 1,
//         backgroundColor: COLORS.white
//     },
//     container: {
//         flex: 1,
//         backgroundColor: COLORS.white,
//     },
//     scrollView: {
//         marginVertical: 2
//     },
//     headline: {
//         color: '#333',
//         fontSize: 35,
//         fontWeight: '900',
//         lineHeight: 30,
//     },
// })

// export default AllProducts

import { NavigationProp, useNavigation } from '@react-navigation/native';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ActivityIndicator, FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import HeaderWithSearch from '@/components/HeaderWithSearch';
import ProductCard from '@/components/ProductCard';
import { COLORS, icons } from '@/constants';
import { ourProducts } from '@/data';
import { useAppSelector } from '@/hooks/useAppSelector';
import { useTheme } from '@/theme/ThemeProvider';
import { fetchGraphQL } from '@/utils/fetchGraphql';

/** ------------------------------------------------------------------
 * TYPES
 * ------------------------------------------------------------------*/
export type Product = {
    id: string;
    title: string;
    description?: string;
    tags?: string[];
    productType?: string;
    price: string;
    oldPrice: string;
    image: string;
    merchandiseId?: string;
    cursor?: string | null;
    available?: boolean | null;
};

/** ------------------------------------------------------------------
 * NETWORK – GraphQL helper
 * ------------------------------------------------------------------*/
const fetchProductsFromShopify = async (
    cursor?: string,
): Promise<{ products: Product[]; hasNextPage: boolean; endCursor: string | null }> => {
    const query = `
  {
    products(first: 30${cursor ? `, after: \"${cursor}\"` : ''}) {
      pageInfo { hasNextPage }
      edges {
        cursor
        node {
          id
          title
          description
          tags
          productType
          priceRange { minVariantPrice { amount } }
          compareAtPriceRange { maxVariantPrice { amount } }
          images(first: 1) { edges { node { transformedSrc } } }
          variants(first: 1) { edges { node { id } } }
        }
      }
    }
  }`;

    try {
        const res = await fetchGraphQL(query);
        const edges = res.data.products.edges;
        const hasNextPage = res.data.products.pageInfo.hasNextPage;

        const products: Product[] = edges.map((edge: any) => ({
            id: edge.node.id,
            title: edge.node.title,
            description: edge.node.description,
            tags: edge.node.tags,
            productType: edge.node.productType,
            price: edge.node.priceRange.minVariantPrice.amount,
            oldPrice: edge.node.compareAtPriceRange.maxVariantPrice.amount,
            image: edge.node.images.edges[0]?.node.transformedSrc,
            merchandiseId: edge.node.variants.edges[0]?.node.id,
            cursor: edge.cursor,
        }));

        return { products, hasNextPage, endCursor: edges.at(-1)?.cursor ?? null };
    } catch (err) {
        console.error('Failed to fetch products:', err);
        return { products: [], hasNextPage: false, endCursor: null };
    }
};

/** ------------------------------------------------------------------
 * COMPONENT
 * ------------------------------------------------------------------*/
const AllProducts: React.FC = () => {
    const navigation = useNavigation<NavigationProp<any>>();
    const { dark, colors } = useTheme();
    const { t } = useTranslation();

    const appLanguage = useAppSelector(state => state.generalSettings.language);

    /** ------------------ state ------------------*/
    const [loading, setLoading] = useState<boolean>(false);
    const [products, setProducts] = useState<Product[]>([]);
    const [hasNextPage, setHasNextPage] = useState<boolean>(false);
    const [endCursor, setEndCursor] = useState<string | null>(null);

    /** ------------------ data fetch ------------------*/
    useEffect(() => {
        const loadProducts = async () => {
            setLoading(true);
            const res = await fetchProductsFromShopify();
            setProducts(res.products);
            setHasNextPage(res.hasNextPage);
            setEndCursor(res.endCursor);
            setLoading(false);
        };

        loadProducts();
    }, []);

    const loadMoreProducts = useCallback(async () => {
        if (!hasNextPage || loading) return;
        setLoading(true);
        const res = await fetchProductsFromShopify(endCursor ?? undefined);
        setProducts(prev => [...prev, ...res.products]);
        setHasNextPage(res.hasNextPage);
        setEndCursor(res.endCursor);
        setLoading(false);
    }, [hasNextPage, loading, endCursor]);

    /** ------------------ memoized callbacks ------------------*/
    const onSearchPress = useCallback(() => navigation.navigate('search'), [navigation]);

    const onCollectionPress = useCallback(
        (item: (typeof ourProducts)[number]) =>
            navigation.navigate('collectionscreen', {
                collectionId: item.collectionId,
                collectionTitle: item.title,
                collectionImage: item.image,
            }),
        [navigation],
    );

    /** ------------------ memoized header ------------------*/
    const listHeader = useMemo(
        () => (
            <View>
                {/* Top Search Header */}
                <View style={styles.headerContainer}>
                    <HeaderWithSearch title={t('allProduct.title')} icon={icons.search} onPress={onSearchPress} />
                </View>

                {/* Headline */}
                <View style={styles.headlineContainer}>
                    <Text style={[styles.headline, { color: dark ? COLORS.white : "" }]}>PRODUCTS</Text>
                </View>
                <View style={styles.divider} />

                {/* Quick Links */}
                <View style={styles.quickLinksWrapper}>
                    <Text style={[styles.quickLinksLabel, { color: dark ? COLORS.white : 'rgb(44,44,44)' }]}>QUICK LINKS</Text>
                    <FlatList
                        data={ourProducts}
                        horizontal
                        keyExtractor={item => item.id}
                        showsHorizontalScrollIndicator={false}
                        ItemSeparatorComponent={() => <View style={styles.horizontalSpacer} />}
                        renderItem={({ item }) => (
                            <TouchableOpacity onPress={() => onCollectionPress(item)}>
                                <Text style={[styles.quickLinkText, { color: dark ? COLORS.white : "" }]}>{item.title}</Text>
                            </TouchableOpacity>
                        )}
                    />
                </View>
                <View style={styles.divider} />

                {/* Banner with images */}
                <View style={styles.bannerSection}>
                    <FlatList
                        data={ourProducts}
                        horizontal
                        keyExtractor={item => item.id}
                        showsHorizontalScrollIndicator={false}
                        ItemSeparatorComponent={() => <View style={styles.horizontalSpacer} />}
                        renderItem={({ item }) => (
                            <TouchableOpacity onPress={() => onCollectionPress(item)} style={styles.bannerItem}>
                                <Image source={item.image} resizeMode="contain" style={styles.bannerImage} />
                                <Text style={styles.bannerText}>{item.title}</Text>
                            </TouchableOpacity>
                        )}
                    />
                </View>
            </View>
        ),
        [dark, onSearchPress, t, onCollectionPress],
    );

    /** ------------------ render ------------------*/
    return (
        <SafeAreaView style={[styles.safeArea, { backgroundColor: colors.background }]}>
            <FlatList
                data={products}
                keyExtractor={item => item.id}
                numColumns={2}
                columnWrapperStyle={styles.columnWrapper}
                contentContainerStyle={styles.contentContainer}
                initialNumToRender={6}
                maxToRenderPerBatch={10}
                windowSize={5}
                onEndReached={loadMoreProducts}
                onEndReachedThreshold={0.4}
                ListHeaderComponent={listHeader}
                renderItem={({ item }) => (
                    <ProductCard
                        merchandiseId={item.id}
                        name={item.title}
                        image={item.image}
                        price={item.price}
                        oldPrice={item.oldPrice}
                        availableForSale={item.available}
                        onPress={() =>
                            navigation.navigate('productdetails', {
                                id: item.id,
                            })
                        }
                    />
                )}
                ListFooterComponent={
                    loading ? (
                        <View style={styles.footerLoaderWrapper}>
                            <ActivityIndicator size="large" color={COLORS.black} />
                        </View>
                    ) : null
                }
                removeClippedSubviews
            />
        </SafeAreaView>
    );
};

export default React.memo(AllProducts);

/** ------------------------------------------------------------------
 * STYLES
 * ------------------------------------------------------------------*/
const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
    },
    headerContainer: {
        padding: 16,
    },
    headlineContainer: {
        height: 100,
        justifyContent: 'center',
        alignItems: 'center',
    },
    headline: {
        color: '#333',
        fontSize: 35,
        fontWeight: '900',
        lineHeight: 30,
    },
    divider: {
        width: '100%',
        height: 1,
        backgroundColor: COLORS.greyscale600,
    },
    quickLinksWrapper: {
        paddingHorizontal: 16,
        paddingVertical: 16,
        flexDirection: 'row',
        alignItems: 'center'
    },
    quickLinksLabel: {
        color: 'rgb(44,44,44)',
        fontWeight: 'bold',
        fontSize: 13,
        marginRight: 13,
    },
    quickLinkText: {
        fontSize: 17,
    },
    bannerSection: {
        backgroundColor: 'rgb(1,73,133)',
        paddingHorizontal: 16,
        paddingVertical: 24,
    },
    bannerItem: {
        alignItems: 'center',
    },
    bannerImage: {
        width: 200,
        height: 200,
    },
    bannerText: {
        textAlign: 'center',
        fontSize: 20,
        marginTop: 20,
        color: '#fff',
    },
    columnWrapper: {
        gap: 16,
    },
    contentContainer: {
        paddingBottom: 24,
    },
    horizontalSpacer: {
        width: 20,
    },
    footerLoaderWrapper: {
        paddingVertical: 24,
    },
});
