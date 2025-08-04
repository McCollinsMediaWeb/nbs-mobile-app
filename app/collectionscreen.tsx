import { NavigationProp, RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import {
    ActivityIndicator,
    FlatList,
    Image,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import HeaderWithSearch from '@/components/HeaderWithSearch';
import ProductCard from '@/components/ProductCard';
import { COLORS, icons } from '@/constants';
import { ourProducts } from '@/data';
import { useTheme } from '@/theme/ThemeProvider';
import { fetchGraphQL } from '@/utils/fetchGraphql';

/** ------------------------------------------------------------------
 * TYPES
 * ------------------------------------------------------------------*/
type CollectionScreenParams = {
    collectionId: string;
    collectionTitle: string;
    collectionImage: any;
};

type Product = {
    id: string;
    title: string;
    description?: string;
    tags?: string[];
    productType: string;
    price: string;
    oldPrice: string;
    image: string;
    merchandiseId: string;
    cursor?: string | null;
    available?: boolean | null;
};

/** ------------------------------------------------------------------
 * NETWORK – GraphQL Fetch
 * ------------------------------------------------------------------*/
const fetchProductsFromShopify = async (
    collectionId: string,
    cursor?: string
): Promise<{ products: Product[]; hasNextPage: boolean; endCursor: string | null }> => {
    const query = `{
    node(id: "${collectionId}") {
      ... on Collection {
        products(first: 30${cursor ? `, after: \"${cursor}\"` : ''}) {
          pageInfo { hasNextPage }
          edges {
            cursor
            node {
              id title description tags productType availableForSale
              priceRange { minVariantPrice { amount } }
              compareAtPriceRange { maxVariantPrice { amount } }
              images(first: 1) { edges { node { transformedSrc } } }
              variants(first: 1) { edges { node { id availableForSale } } }
            }
          }
        }
      }
    }
  }`;

    try {
        const res = await fetchGraphQL(query);
        const edges = res.data.node.products.edges;
        const hasNextPage = res.data.node.products.pageInfo.hasNextPage;

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
            available: edge.node.availableForSale
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
const CollectionScreen: React.FC = () => {
    const navigation = useNavigation<NavigationProp<any>>();
    const route = useRoute<RouteProp<{ collectionscreen: CollectionScreenParams }, 'collectionscreen'>>();
    const { dark, colors } = useTheme();
    const { collectionId, collectionTitle, collectionImage } = route.params;

    const [loading, setLoading] = useState(false);
    const [products, setProducts] = useState<Product[]>([]);
    const [hasNextPage, setHasNextPage] = useState(false);
    const [endCursor, setEndCursor] = useState<string | null>(null);

    /** ------------------ Fetch Data ------------------ */
    useEffect(() => {
        const loadProducts = async () => {
            setLoading(true);
            const res = await fetchProductsFromShopify(collectionId);
            setProducts(res.products);
            setHasNextPage(res.hasNextPage);
            setEndCursor(res.endCursor);
            setLoading(false);
        };
        if (collectionId) loadProducts();
    }, [collectionId]);

    const loadMoreProducts = useCallback(async () => {
        if (!hasNextPage || loading) return;
        setLoading(true);
        const res = await fetchProductsFromShopify(collectionId, endCursor ?? undefined);
        setProducts(prev => [...prev, ...res.products]);
        setHasNextPage(res.hasNextPage);
        setEndCursor(res.endCursor);
        setLoading(false);
    }, [collectionId, endCursor, hasNextPage, loading]);

    const onCollectionPress = useCallback(
        (item: (typeof ourProducts)[number]) =>
            navigation.navigate('collectionscreen', {
                collectionId: item.collectionId,
                collectionTitle: item.title,
                collectionImage: item.image,
            }),
        [navigation]
    );

    /** ------------------ Header ------------------ */
    const ListHeaderComponent = useMemo(() => (
        <View>
            <View style={styles.headerWrapper}>
                <HeaderWithSearch title={collectionTitle ?? 'Products'} icon={icons.search} onPress={() => navigation.navigate('search')} />
            </View>

            <View>
                <Image source={collectionImage} resizeMode="cover" style={styles.bannerImage} />
                <View style={styles.overlay} />
                <Text style={styles.bannerTitle}>{collectionTitle}</Text>
            </View>
            <View style={styles.divider} />
            <View style={styles.quickLinksWrapper}>
                <Text style={[styles.quickLinksLabel, { color: dark ? COLORS.white : 'rgb(44,44,44)' }]}>QUICK LINKS</Text>
                <FlatList
                    data={ourProducts}
                    horizontal
                    keyExtractor={item => item.id}
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={{ paddingHorizontal: 16 }}
                    ItemSeparatorComponent={() => <View style={{ width: 20 }} />}
                    renderItem={({ item }) => (
                        <TouchableOpacity onPress={() => onCollectionPress(item)}>
                            <View style={{ alignItems: 'center' }}>
                                <Text style={[styles.quickLink, { color: dark ? COLORS.white : "" }]}>{item.title}</Text>
                                {collectionTitle === item.title && <View style={[styles.activeLinkLine, { backgroundColor: dark ? COLORS.white : "black" }]} />}
                            </View>
                        </TouchableOpacity>
                    )}
                />
            </View>
            <View style={styles.divider} />
            <View style={styles.imageLinksSection}>
                <FlatList
                    data={ourProducts}
                    horizontal
                    keyExtractor={item => item.id}
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={{ paddingHorizontal: 16 }}
                    ItemSeparatorComponent={() => <View style={{ width: 20 }} />}
                    renderItem={({ item }) => (
                        <TouchableOpacity onPress={() => onCollectionPress(item)}>
                            <Image source={item.image} resizeMode="contain" style={styles.imageItem} />
                            <Text style={styles.imageItemLabel}>{item.title}</Text>
                        </TouchableOpacity>
                    )}
                />
            </View>
        </View>
    ), [collectionTitle, collectionImage, onCollectionPress, navigation]);

    return (
        <SafeAreaView style={[styles.safeArea, { backgroundColor: colors.background }]}>
            <FlatList
                data={products}
                keyExtractor={item => item.id}
                numColumns={2}
                // columnWrapperStyle={{ gap: 16 }}
                columnWrapperStyle={{ justifyContent: 'space-between', paddingHorizontal: 6, }}
                showsVerticalScrollIndicator={false}
                onEndReached={loadMoreProducts}
                onEndReachedThreshold={0.5}
                renderItem={({ item }) => (
                    <ProductCard
                        productId={item.id}
                        merchandiseId={item.merchandiseId}
                        productType={item.productType}
                        name={item.title}
                        image={item.image}
                        price={item.price}
                        oldPrice={item.oldPrice}
                        availableForSale={item.available}
                        onPress={() => navigation.navigate('productdetails', { id: item.id })}
                    />
                )}
                ListHeaderComponent={ListHeaderComponent}
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

export default React.memo(CollectionScreen);

/** ------------------------------------------------------------------
 * STYLES
 * ------------------------------------------------------------------*/
const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
    },
    headerWrapper: {
        padding: 16,
    },
    bannerImage: {
        width: '100%',
        height: 400,
    },
    overlay: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(0,0,0,0.3)',
        // borderRadius: 12,
    },
    bannerTitle: {
        color: '#fff',
        fontSize: 28,
        fontFamily: 'TomorrowBold',
        fontWeight: '900',
        lineHeight: 30,
        textTransform: 'uppercase',
        position: 'absolute',
        top: '50%',
        left: 0,
        right: 0,
        textAlign: 'center',
    },
    quickLinksWrapper: {
        padding: 16, flexDirection: 'row', alignItems: 'center',
    },
    quickLinksLabel: {
        color: 'rgb(44,44,44)',
        fontWeight: 'bold',
        fontSize: 13,
        marginRight: 16,
        fontFamily: 'RubikRegular',
    },
    quickLink: {
        fontSize: 17,
        paddingBottom: 4,
    },
    activeLinkLine: {
        height: 2,
        backgroundColor: 'black',
        width: '100%',
    },
    imageLinksSection: {
        backgroundColor: 'rgb(1,73,133)',
        paddingHorizontal: 16,
        paddingVertical: 24
    },
    imageItem: {
        width: 200,
        height: 200,
    },
    imageItemLabel: {
        textAlign: 'center',
        fontSize: 20,
        marginTop: 20,
        color: '#fff',
        fontFamily: 'RubikRegular',
    },
    footerLoaderWrapper: {
        paddingVertical: 24,
    },
    divider: {
        width: '100%',
        height: 1,
        backgroundColor: COLORS.greyscale600,
    }
});
