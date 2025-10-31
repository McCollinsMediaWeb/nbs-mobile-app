import { NavigationProp, useNavigation } from '@react-navigation/native';
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { ActivityIndicator, FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import FilterComponent from '@/components/FilterComponent';
import HeaderWithSearchTwo from '@/components/HeaderWithSearchTwo';
import ProductCard from '@/components/ProductCard';
import { COLORS, icons } from '@/constants';
import { useOurProducts } from '@/data';
import { useAppSelector } from '@/hooks/useAppSelector';
import { useTheme } from '@/theme/ThemeProvider';
import { fetchGraphQL } from '@/utils/fetchGraphql';
import { normalizeFont } from '@/utils/normalizeFont';
import i18next from 'i18next';

/** ------------------------------------------------------------------
 * TYPES
 * ------------------------------------------------------------------*/
export type Product = {
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
    productTags?: string[] | null;
};

type SortKey = 'RELEVANCE' | 'TITLE' | 'PRICE' | 'CREATED_AT' | 'BEST_SELLING';

/** ------------------------------------------------------------------
 * NETWORK – GraphQL helper
 * ------------------------------------------------------------------*/
const fetchProductsFromShopify = async (
    cursor?: string,
    sortKey: SortKey = 'RELEVANCE',
    reverse: boolean = false,
    selectedTypes?: string[],
    selectedBrands?: string[],
): Promise<{ products: Product[]; hasNextPage: boolean; endCursor: string | null }> => {
    const sortParam = reverse ? `, sortKey: ${sortKey}, reverse: true` : `, sortKey: ${sortKey}`;
    let filterQuery = '';
    if (selectedTypes && selectedTypes.length > 0) {
        const types = selectedTypes.map(t => `product_type:'${t}'`).join(' OR ');
        filterQuery += `${types}`;
    }
    if (selectedBrands && selectedBrands.length > 0) {
        const brands = selectedBrands.map(v => `vendor:'${v}'`).join(' OR ');
        filterQuery += ` ${brands}`;
    }
    
    const queryParam = filterQuery ? `, query: "${filterQuery}"` : '';

    const query = `
  {
    products(first: 30${cursor ? `, after: \"${cursor}\"` : ''}${sortParam}${queryParam}) {
      pageInfo { hasNextPage }
      edges {
        cursor
        node {
          id
          title
          description
          tags
          productType
          tags
          availableForSale
          priceRange { minVariantPrice { amount } }
          compareAtPriceRange { maxVariantPrice { amount } }
          images(first: 1) { edges { node { transformedSrc } } }
          variants(first: 1) { edges { node { 
                                        id
                                        availableForSale
                                    } } }
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
            available: edge.node.availableForSale,
            productTags: edge.node.tags,
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
    const { t } = i18next;

    const appLanguage = useAppSelector(state => state.generalSettings.language);

    /** ------------------ state ------------------*/
    const [loading, setLoading] = useState<boolean>(false);
    const [products, setProducts] = useState<Product[]>([]);
    const [hasNextPage, setHasNextPage] = useState<boolean>(false);
    const [endCursor, setEndCursor] = useState<string | null>(null);
    const filterSheetRef = useRef<any>(null);
    const sortSheetRef = useRef<any>(null);
    const [expanded, setExpanded] = useState<string | null>(null);
    const ourProducts = useOurProducts();
    const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
    const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
    const [sort, setSort] = useState<{ sortKey: SortKey; reverse: boolean }>({
        sortKey: 'TITLE',
        reverse: false,
    });

    const [appliedTypes, setAppliedTypes] = useState<string[]>([]);
    const [appliedBrands, setAppliedBrands] = useState<string[]>([]);

    /** ------------------ data fetch ------------------*/
    useEffect(() => {
        const loadProducts = async () => {
            setLoading(true);
            const res = await fetchProductsFromShopify(undefined, sort.sortKey, sort.reverse, appliedTypes, appliedBrands);
            setProducts(res.products);
            setHasNextPage(res.hasNextPage);
            setEndCursor(res.endCursor);
            setLoading(false);
        };

        loadProducts();
    }, [sort, appliedTypes, appliedBrands]);

    const loadMoreProducts = useCallback(async () => {
        if (!hasNextPage || loading) return;
        setLoading(true);
        const res = await fetchProductsFromShopify(endCursor ?? undefined, sort.sortKey, sort.reverse, appliedTypes, appliedBrands);
        setProducts(prev => [...prev, ...res.products]);
        setHasNextPage(res.hasNextPage);
        setEndCursor(res.endCursor);
        setLoading(false);
    }, [hasNextPage, loading, endCursor, sort.sortKey, sort.reverse]);

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
                {/* Headline */}
                <View style={styles.headlineContainer}>
                    <Text style={[styles.headline, { color: COLORS.white }]}>{t("products")}</Text>
                </View>
            </View>
        ),
        [dark, onSearchPress, t, onCollectionPress],
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

    /** ------------------ render ------------------*/
    return (
        <SafeAreaView style={[styles.safeArea, { backgroundColor: colors.background }]}>
            {/* Top Search Header */}
            <View style={styles.headerContainer}>
                <HeaderWithSearchTwo title={t('allProduct.title')} icon={icons.search} onPress={onSearchPress} />
            </View>

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

            <FlatList
                data={products}
                keyExtractor={item => item.id}
                numColumns={2}
                columnWrapperStyle={{ justifyContent: 'space-between', paddingHorizontal: 6, marginBottom: 20 }}
                contentContainerStyle={styles.contentContainer}
                initialNumToRender={6}
                maxToRenderPerBatch={10}
                windowSize={5}
                onEndReached={loadMoreProducts}
                onEndReachedThreshold={0.4}
                ListHeaderComponent={listHeader}
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
                        productTags={item.productTags}
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

            <FilterComponent
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
        borderRightWidth: 0,
    },
    icon: {
        width: 20,
        height: 20,
        marginRight: 8,
        marginLeft: 8,
        resizeMode: 'contain',
    },
    label: {
        fontSize: 17,
        fontWeight: '500',
    },
    sheetHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20,
    },
    sheetTitle: {
        fontSize: normalizeFont(22),
        fontWeight: '900',
        textAlign: 'center',
        textTransform: 'uppercase',
    },
    closeIcon: {
        width: 20,
        height: 20,
        tintColor: '#333',
    },
    option: {
        paddingVertical: 14,
        borderBottomWidth: 1,
        borderColor: '#eee',
    },
    optionText: {
        fontSize: normalizeFont(15),
    },
    headlineContainer: {
        height: 140,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgb(177, 18, 22)',
    },
    headline: {
        color: '#ffffff',
        fontSize: normalizeFont(35),
        fontWeight: '900',
        lineHeight: 30,
        fontFamily: 'TomorrowBold'
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
        fontFamily: 'RubikRegular'
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
        fontFamily: 'RubicRegular'
    },
    columnWrapper: {
        // gap: SIZES.width * 0.07,
    },
    contentContainer: {
        paddingBottom: 20,
    },
    horizontalSpacer: {
        width: 20,
    },
    footerLoaderWrapper: {
        paddingVertical: 24,
    },
});