import { NavigationProp, RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import {
    ActivityIndicator,
    FlatList,
    Image,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import FilterComponentCollection from '@/components/FilterComponentCollection';
import HeaderWithSearch from '@/components/HeaderWithSearch';
import ProductCard from '@/components/ProductCard';
import { COLORS, icons } from '@/constants';
import { useOurProducts } from '@/data';
import { useTheme } from '@/theme/ThemeProvider';
import { fetchGraphQL } from '@/utils/fetchGraphql';
import { normalizeFont } from '@/utils/normalizeFont';
import i18next from 'i18next';

/** ------------------------------------------------------------------
 * TYPES
 * ------------------------------------------------------------------*/
type CollectionScreenParams = {
    collectionId: string;
    collectionTitle: string;
    collectionImage: any;
    collectionSort?: {
        sortKey: SortKey;
        reverse: boolean;
    };
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

type SortKey = 'RELEVANCE' | 'TITLE' | 'PRICE' | 'CREATED' | 'BEST_SELLING';

/** ------------------------------------------------------------------
 * NETWORK – GraphQL Fetch
 * ------------------------------------------------------------------*/
const fetchProductsFromShopify = async (
    collectionId: string,
    cursor?: string,
    sortKey: SortKey = 'RELEVANCE',
    reverse: boolean = false,
    selectedTypes?: string[],
    selectedBrands?: string[],
): Promise<{ products: Product[]; hasNextPage: boolean; endCursor: string | null }> => {

    const sortParam = reverse
        ? `, sortKey: ${sortKey}, reverse: true`
        : `, sortKey: ${sortKey}`;

    // ✅ Build ProductFilter array
    let filters: string[] = [];

    if (selectedTypes && selectedTypes.length > 0) {
        selectedTypes.forEach(type => {
            filters.push(`{ productType: "${type}" }`);
        });
    }

    if (selectedBrands && selectedBrands.length > 0) {
        selectedBrands.forEach(brand => {
            filters.push(`{ productVendor: "${brand}" }`);
        });
    }

    const filterParam = filters.length > 0
        ? `, filters: [${filters.join(', ')}]`
        : '';

    const query = `{
        node(id: "${collectionId}") {
          ... on Collection {
            products(first: 30${cursor ? `, after: \"${cursor}\"` : ''}${sortParam}${filterParam}) {
              pageInfo { hasNextPage }
              edges {
                cursor
                node {
                  id
                  title
                  description
                  tags
                  productType
                  availableForSale
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
            available: edge.node.availableForSale,
            productTags: edge.node.tags,
        }));

        return {
            products,
            hasNextPage,
            endCursor: edges.at(-1)?.cursor ?? null
        };

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
    const { collectionId, collectionTitle, collectionImage, collectionSort } = route.params;
    const ourProducts = useOurProducts();
    const [loading, setLoading] = useState(false);
    const [products, setProducts] = useState<Product[]>([]);
    const [hasNextPage, setHasNextPage] = useState(false);
    const [endCursor, setEndCursor] = useState<string | null>(null);
    const { t } = i18next;

    const filterSheetRef = useRef<any>(null);
    const sortSheetRef = useRef<any>(null);
    const [expanded, setExpanded] = useState<string | null>(null);

    const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
    const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
    // const [sort, setSort] = useState<{ sortKey: SortKey; reverse: boolean }>({
    //     sortKey: 'BEST_SELLING',
    //     reverse: false,
    // });
    const [sort, setSort] = useState<{ sortKey: SortKey; reverse: boolean }>({
        sortKey: collectionSort?.sortKey ?? 'BEST_SELLING',
        reverse: collectionSort?.reverse ?? false,
    });
    const [appliedTypes, setAppliedTypes] = useState<string[]>([]);
    const [appliedBrands, setAppliedBrands] = useState<string[]>([]);

    /** ------------------ Fetch Data ------------------ */
    useEffect(() => {
        const loadProducts = async () => {
            setLoading(true);
            const res = await fetchProductsFromShopify(collectionId, undefined, sort.sortKey, sort.reverse, appliedTypes, appliedBrands);

            setProducts(res.products);
            setHasNextPage(res.hasNextPage);
            setEndCursor(res.endCursor);
            setLoading(false);
        };
        if (collectionId) loadProducts();
        // }, [collectionId]);
    }, [collectionId, sort, appliedTypes, appliedBrands]);

    const loadMoreProducts = useCallback(async () => {
        if (!hasNextPage || loading) return;
        setLoading(true);
        const res = await fetchProductsFromShopify(collectionId, endCursor ?? undefined, sort.sortKey, sort.reverse, appliedTypes, appliedBrands);
        setProducts(prev => [...prev, ...res.products]);
        setHasNextPage(res.hasNextPage);
        setEndCursor(res.endCursor);
        setLoading(false);
        // }, [collectionId, endCursor, hasNextPage, loading]);
    }, [hasNextPage, loading, endCursor, sort.sortKey, sort.reverse]);

    const onCollectionPress = useCallback(
        (item: (typeof ourProducts)[number]) =>
            navigation.navigate('collectionscreen', {
                collectionId: item.collectionId,
                collectionTitle: item.title,
                collectionImage: item.image,
            }),
        [navigation]
    );

    const onFilterPress = () => filterSheetRef?.current?.open();
    const onSortPress = () => sortSheetRef?.current?.open();

    const toggleExpand = (section: string) => {
        setExpanded(expanded === section ? null : section);
    };

    // Handle "Show Results" button click
    const handleShowResults = async () => {
        setAppliedTypes(selectedTypes);
        setAppliedBrands(selectedBrands);
        filterSheetRef?.current?.close();
    };

    const toggleCheckbox = (item: string, type: string) => {
        if (type === "product") {
            setSelectedTypes((prev) =>
                prev.includes(item) ? prev.filter((i) => i !== item) : [...prev, item]
            );
        } else {
            setSelectedBrands((prev) =>
                prev.includes(item) ? prev.filter((i) => i !== item) : [...prev, item]
            );
        }
    };

    const toggleSortKey = (value: string, type: boolean) => {
        setSort({ sortKey: value as SortKey, reverse: type });
        sortSheetRef?.current?.close();
    };


    /** ------------------ Header ------------------ */
    const ListHeaderComponent = useMemo(() => (
        <View>
            <View style={styles.headerWrapper}>
                <HeaderWithSearch title={collectionTitle ?? 'roducts'} icon={icons.search} onPress={() => navigation.navigate('search')} />
            </View>

            {/* <View style={styles.filterSortContainer}>
                <TouchableOpacity style={styles.halfBox}>
                    <Image source={icons.filter} style={styles.icon} />
                    <Text style={styles.label}>Filters</Text>
                </TouchableOpacity>

                <TouchableOpacity style={[styles.halfBox, styles.noBorder]}>
                    <Text style={styles.label}>Sort By</Text>
                    <Image source={icons.arrowDown} style={styles.icon} />
                </TouchableOpacity>
            </View> */}

            <View style={styles.filterSortContainer}>
                <TouchableOpacity style={styles.halfBox} onPress={onFilterPress}>
                    <Image source={icons.filter} style={[styles.icon, { tintColor: dark ? COLORS.white : COLORS.primary }]} />
                    <Text style={[styles.label, { color: dark ? COLORS.white : COLORS.primary }]}>{t("filters.title")}</Text>
                </TouchableOpacity>

                <TouchableOpacity style={[styles.halfBox, styles.noBorder]} onPress={onSortPress}>
                    <Text style={[styles.label, { color: dark ? COLORS.white : COLORS.primary }]}>{t("sortBy.title")}</Text>
                    <Image source={icons.arrowDown} style={[styles.icon, { tintColor: dark ? COLORS.white : COLORS.primary }]} />
                </TouchableOpacity>
            </View>

            {/* {collectionImage ? (
                <View>
                    <Image source={collectionImage} resizeMode="cover" style={styles.bannerImage} />
                    <View style={styles.overlay} />
                    <Text style={styles.bannerTitle}>{collectionTitle}</Text>
                </View>
            ) : (
                <View>
                    <Image resizeMode="cover" style={{ height: 200 }} />
                    <View style={styles.redOverlay} />
                    <Text style={styles.bannerTitle}>{collectionTitle}</Text>
                </View>
            )} */}

            <View>
                <Image resizeMode="cover" style={{ height: 200 }} />
                <View style={styles.redOverlay} />
                <Text style={styles.bannerTitle}>{collectionTitle}</Text>
            </View>

            {/* <View style={styles.divider} />
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
            </View> */}
        </View>
    ), [collectionTitle, collectionImage, onCollectionPress, navigation]);

    return (
        <SafeAreaView style={[styles.safeArea, { backgroundColor: colors.background }]}>
            {/* {products.length >= 0 ? (
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
                    ListEmptyComponent={

                    }
                    removeClippedSubviews
                />
            ) : (
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    
                </View>
            )} */}

            <FlatList
                data={products}
                keyExtractor={item => item.id}
                numColumns={2}
                columnWrapperStyle={{
                    justifyContent: 'space-between',
                    paddingHorizontal: 6,
                }}
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
                        productTags={item.tags}
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
                ListEmptyComponent={
                    <View style={{ justifyContent: 'center', alignItems: 'center', padding: 20, marginTop: 200 }}>
                        <Text style={[styles.emptyTitle, { color: dark ? '#FFFFFF' : '#000000' }]}>Empty Collection</Text>
                        <Text style={[styles.label, { color: dark ? '#FFFFFF' : '#000000', marginTop: 20 }]}>This collection does not contain any products.</Text>
                    </View>
                }
                removeClippedSubviews
            />
            {/* <FilterComponent filterSheetRef={filterSheetRef} sortSheetRef={sortSheetRef} expanded={expanded} toggleExpand={toggleExpand} toggleCheckbox={toggleCheckbox} toggleSortKey={toggleSortKey} selectedTypes={selectedTypes} selectedBrands={selectedBrands} handleShowResults={handleShowResults} /> */}
            <FilterComponentCollection
                filterSheetRef={filterSheetRef}
                sortSheetRef={sortSheetRef}
                expanded={expanded}
                toggleExpand={toggleExpand}
                toggleCheckbox={toggleCheckbox}
                toggleSortKey={toggleSortKey}
                selectedTypes={selectedTypes}
                selectedBrands={selectedBrands}
                currentSort={sort}
                handleShowResults={handleShowResults}
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
    filterSortContainer: {
        flexDirection: 'row',
        borderTopWidth: 1,
        borderBottomWidth: 1,
        borderColor: '#ddd',
    },
    halfBox: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 12,
        borderRightWidth: 1,
        borderColor: '#ddd',
    },
    noBorder: {
        borderRightWidth: 0, // remove right divider for last item
    },
    icon: {
        width: 20,
        height: 20,
        marginRight: 8,
        marginLeft: 8,
        resizeMode: 'contain',
    },
    label: {
        fontSize: normalizeFont(17),
        fontWeight: '500',
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
    redOverlay: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundColor: 'rgb(177, 18, 22)',
    },
    bannerTitle: {
        color: '#fff',
        fontSize: 30,
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
    },

    emptyTitle: {
        fontSize: normalizeFont(22),
        fontWeight: '900',
        textAlign: 'center',
        textTransform: 'uppercase',
        flex: 1,
    },
});
