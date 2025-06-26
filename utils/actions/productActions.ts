import { fetchGraphQL } from '../fetchGraphql';
import { clearProduct, fetchProductFailure, fetchProductStart, fetchProductSuccess } from '../reducers/productReducers';
import { RootState } from '../store';

export const fetchProduct = (id: string) => async (dispatch: any, getState: () => RootState) => {
  dispatch(fetchProductStart());

  try {
    // const query = `
    //   {
    //     product(id: "${id}") {
    //             id
    //             title
    //             handle
    //             descriptionHtml
    //             productType
    //             vendor
    //             options {
    //               name
    //               values
    //             }
    //             images(first: 50) {
    //               edges {
    //                 node {
    //                   originalSrc
    //                 }
    //               }
    //             }
    //             priceRange {
    //               minVariantPrice {
    //                 amount
    //               }
    //             }
    //             compareAtPriceRange {
    //               minVariantPrice {
    //                 amount
    //               }
    //             }
    //             variants(first: 50) {
    //               edges {
    //                 node {
    //                     id
    //                     availableForSale
    //                     image {
    //                       originalSrc
    //                     }
    //                     price {
    //                       amount
    //                     }
    //                     sku
    //                     title
    //                     product {
    //                       title
    //                     }
    //                     selectedOptions {
    //                       name
    //                       value
    //                     }
    //                     compareAtPrice {
    //                       amount
    //                     }
    //                 }
    //           }
    //         }
    //     }
    //   }
    // `;

    const query = `{
                    product(id: "${id}") {
                      id
                      title
                      handle
                      descriptionHtml
                      productType
                      vendor
                      options {
                        name
                        values
                      }
                      images(first: 50) {
                        edges {
                          node {
                            originalSrc
                          }
                        }
                      }
                      priceRange {
                        minVariantPrice {
                          amount
                        }
                      }
                      compareAtPriceRange {
                        minVariantPrice {
                          amount
                        }
                      }
                      variants(first: 50) {
                        edges {
                          node {
                            id
                            availableForSale
                            image {
                              originalSrc
                            }
                            price {
                              amount
                            }
                            sku
                            title
                            product {
                              title
                            }
                            selectedOptions {
                              name
                              value
                            }
                            compareAtPrice {
                              amount
                            }
                          }
                        }
                      }
                      # 👇 Give each one its own alias
                      specificationValues: metafield(
                        namespace: "custom"
                        key: "specification_name_1_values"
                      ) {
                        value
                        type
                      }
                      features: metafield(
                        namespace: "custom"
                        key: "features"
                      ) {
                        value
                        type
                      }
                    }
                  }`;

    const data = await fetchGraphQL(query);

    const product = {
      id: data.data.product.id,
      title: data.data.product.title,
      handle: data.data.product.handle,
      descriptionHtml: data.data.product.descriptionHtml,
      productType: data.data.product.productType,
      vendor: data.data.product.vendor,
      images: data.data.product.images.edges.map((img: { node: { originalSrc: any; }; }) => ({
        src: img.node.originalSrc,
      })),
      variants: data.data.product.variants.edges.map((vr: { node: { availableForSale: any; id: any; sku: any; title: any; price: { amount: any; }; image: { originalSrc: any; }; }; }) => {

        return {
          id: vr.node.id,
          sku: vr.node.sku,
          title: vr.node.title,
          price: vr.node.price.amount,
          oldPrice: data.data.product.compareAtPriceRange.minVariantPrice.amount,
          image: vr.node.image.originalSrc,
          available: vr.node.availableForSale,
        };
      }),
      specificationValues: data.data.product.specificationValues?.value || null,
      features: data.data.product.features?.value || null,
    };

    dispatch(fetchProductSuccess({ product: product }));

  } catch (error: any) {
    dispatch(fetchProductFailure(error.message || "Error fetching collections"));
  }
};


export const clearProductFirst = () => (dispatch: any) => {
  dispatch(clearProduct());
};
