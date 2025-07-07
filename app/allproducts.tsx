import ProductCard from '@/components/ProductCard';
import { fetchGraphQL } from '@/utils/fetchGraphql';
import { NavigationProp } from '@react-navigation/native';
import { useNavigation } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ScrollView } from 'react-native-virtualized-view';
import HeaderWithSearch from '../components/HeaderWithSearch';
import { COLORS, icons } from '../constants';
import { useTheme } from '../theme/ThemeProvider';

type Product = {
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
};


const AllProducts = () => {
    const navigation = useNavigation<NavigationProp<any>>();
    const { dark, colors } = useTheme();
    const [loading, setLoading] = useState(false);
    const [products, setProducts] = useState<Product[]>([]);
    const [hasNextPage, setHasNextPage] = useState(false);
    const [endCursor, setEndCursor] = useState<string | null>(null);


    useEffect(() => {
        const loadProducts = async () => {
            setLoading(true);
            const res = await fetchProductsFromShopify()
            setProducts(res.products);
            setHasNextPage(res.hasNextPage);
            setEndCursor(res.endCursor);
            setLoading(false);
        };
        loadProducts();
    }, []);

    const loadMoreProducts = async () => {
        setLoading(true);
        const res = await fetchProductsFromShopify();
        setProducts((prev) => [...prev, ...res.products]);
        setHasNextPage(res.hasNextPage);
        setEndCursor(res.endCursor);
        setLoading(false);
    };



    const fetchProductsFromShopify = async (
        cursor?: string
    ): Promise<{ products: Product[]; hasNextPage: boolean; endCursor: string | null }> => {
        const query = `
{
  products(first: 30${cursor ? `, after: "${cursor}"` : ""}) {
    pageInfo {
      hasNextPage
    }
    edges {
      cursor
      node {
        id
        title
        description
        tags
        productType
        priceRange {
          minVariantPrice {
            amount
          }
        }
        compareAtPriceRange {
          maxVariantPrice {
            amount
          }
        }
        images(first: 1) {
          edges {
            node {
              transformedSrc
            }
          }
        }
        variants(first: 1) {
          edges {
            node {
              id
            }
          }
        }
      }
    }
  }
}
`;


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

            return {
                products,
                hasNextPage,
                endCursor: edges.at(-1)?.cursor ?? null,
            };
        } catch (err) {
            console.error("Failed to fetch products:", err);
            return { products: [], hasNextPage: false, endCursor: null };
        }
    };


    return (
        <SafeAreaView style={[styles.area, { backgroundColor: colors.background }]}>
            <View style={[styles.container, { backgroundColor: colors.background }]}>
                <HeaderWithSearch
                    title="All Products"
                    icon={icons.search}
                    onPress={() => navigation.navigate("search")}
                />
                <ScrollView
                    style={styles.scrollView}
                    showsVerticalScrollIndicator={false}>
                    <View style={{
                        backgroundColor: dark ? COLORS.dark1 : COLORS.white,
                        marginVertical: 16
                    }}>
                        <FlatList
                            data={products}
                            keyExtractor={(item) => item.id}
                            numColumns={2}
                            columnWrapperStyle={{ gap: 16 }}
                            showsVerticalScrollIndicator={false}
                            renderItem={({ item }) => (
                                <ProductCard
                                    merchandiseId={item.id}
                                    name={item.title}
                                    image={item?.image}
                                    price={item.price}
                                    oldPrice={item.oldPrice}
                                    onPress={() => navigation.navigate("productdetails", {
                                        id: item.id,
                                    })}
                                />
                            )}

                            onEndReached={() => {
                                if (hasNextPage && !loading) {
                                    loadMoreProducts();
                                }
                            }}
                            onEndReachedThreshold={0.5}

                        />
                    </View>
                </ScrollView>
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
            </View>
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
        padding: 16
    },
    scrollView: {
        marginVertical: 2
    }
})

export default AllProducts