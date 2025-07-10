import { fetchGraphQL } from '../fetchGraphql';
import { recommendedProductsFailure, recommendedProductsStart, recommendedProductsSuccess } from '../reducers/recommendedProductsReducers';

export const fetchRecommendedProducts = (id: string) => async (dispatch: any) => {
    dispatch(recommendedProductsStart());

    try {
        const query = `
                    {
                        productRecommendations(productId: "${id}") {
                                        id
                                        title
                                        images(first: 1) {
                                            nodes {
                                                transformedSrc(maxWidth: 195, maxHeight: 195)
                                            }
                                        }
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
                                    }
                                }
                            `;

        const data = await fetchGraphQL(query, {
            input: { id },
        });

        const recommendations = data.data.productRecommendations.map(
            (recommendation: any) => ({
                id: recommendation.id,
                title: recommendation.title,
                image: recommendation.images.nodes[0].transformedSrc,
                price: recommendation.priceRange.minVariantPrice.amount,
                oldPrice: recommendation.compareAtPriceRange.maxVariantPrice.amount,
            })
        );

        dispatch(recommendedProductsSuccess(recommendations));

    } catch (error: any) {
        dispatch(recommendedProductsFailure(error.message || "Error fetching collections"));
    }
};

