import { fetchGraphQL } from '../fetchGraphql';
import {
  searchProductsSuccess,
  searchSuggestionSuccess
} from '../reducers/searchReducers';

export const searchProducts = (searchTerm: any) => async (dispatch: any) => {
    const query = `
    {
        products(first:250, query: "${searchTerm}") {
          edges {
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
                variants(first: 50) {
                  edges {
                    node {
                      id    
                    }
                   }
                }
                images(first: 1) {
                  edges {
                    node {
                        transformedSrc(maxWidth: 195, maxHeight: 195)
                    }
                }
              }
            }
          }
        }
      }
    `;

    try {
        const res = await fetchGraphQL(query, {
            input: { searchTerm }
        });

        const products = res.data.products.edges.map((edge: any) => ({
            id: edge.node.id,
            title: edge.node.title,
            description: edge.node.description,
            tags: edge.node.tags,
            productType: edge.node.productType,
            price: edge.node.priceRange.minVariantPrice.amount,
            oldPrice: edge.node.compareAtPriceRange.maxVariantPrice.amount,
            image: edge.node.images.edges[0]?.node.transformedSrc,
            merchandiseId: edge.node.variants.edges[0]?.node.id,
        }));
        dispatch(searchProductsSuccess({ data: products }));

    } catch (err: any) {
        console.error("Search product fetch failed:", err.message);
    }
};


export const fetchSearchSuggestions = (searchTerm: string | null) => async (dispatch: any) => {

    const query = `
    {
      search(first: 20, query: "${searchTerm}") {
        edges {
          node {
            ... on Product {
              title
            }
          }
        }
      }
    }`;

    try {
        const res = await fetchGraphQL(query, {
            input: { searchTerm },
        });

        const edges = res?.data?.search?.edges || [];

        const suggestions = edges
            .map((edge: any) => edge?.node?.title)
            .filter(Boolean)
            .map((title: string) => ({ title }));

        dispatch(searchSuggestionSuccess({ suggestions }));
    } catch (err: any) {
        console.error("Fetch Suggestion:", err.message);
    }
};