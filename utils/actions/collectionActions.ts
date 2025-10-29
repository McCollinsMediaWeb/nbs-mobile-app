import { fetchGraphQL } from '../fetchGraphql';
import { fetchCollectionFailure, fetchCollectionStart, fetchCollectionSuccess } from '../reducers/collectionReducers';
import { RootState } from '../store';

export const fetchCollections = (collectionIds: string[]) => async (dispatch: any, getState: () => RootState) => {
  dispatch(fetchCollectionStart());
  try {
    const query = `
      query {
        nodes(ids: ${JSON.stringify(collectionIds)}) {
          ... on Collection {
            id
            title
            handle
            description
            image { src }
            products(first: 20) {
              edges {
                node {
                  id
                  title
                  tags
                  handle
                  productType
                  publishedAt
                  tags
                  images(first: 1) {
                    edges { node { transformedSrc(maxWidth: 195, maxHeight: 195) } }
                  }
                  priceRange { minVariantPrice { amount } }
                  compareAtPriceRange { maxVariantPrice { amount } }
                  variants(first: 50) { edges { node { id availableForSale } } }
                }
              }
            }
          }
        }
      }
    `;

    const data = await fetchGraphQL(query);

    const collections = data.data.nodes.map((node: any) => ({
      id: node.id,
      title: node.title,
      handle: node.handle,
      description: node.description,
      image: node.image ? node.image.src : null,
      products: node.products.edges.map((edge: any) => ({
        id: edge.node.id,
        title: edge.node.title,
        tags: edge.node.tags,
        handle: edge.node.handle,
        productType: edge.node.productType,
        publishedAt: edge.node.publishedAt,
        productTags: edge.node.tags,
        image: edge.node.images.edges[0]?.node.transformedSrc,
        price: edge.node.priceRange.minVariantPrice.amount,
        oldPrice: edge.node.compareAtPriceRange.maxVariantPrice.amount,
        merchandiseId: edge.node.variants.edges[0]?.node.id,
        available: edge.node.variants.edges[0]?.node.availableForSale,
      })),
    }));

    // Get existing collections from state
    const existingCollections = getState().collections.data;

    dispatch(fetchCollectionSuccess({
      products: [...existingCollections, ...collections],
      hasNextPage: false, // for now
      cursor: null        // for now
    }));
  } catch (error: any) {
    dispatch(fetchCollectionFailure(error.message || "Error fetching collections"));
  }
};
