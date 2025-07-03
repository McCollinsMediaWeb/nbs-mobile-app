import { fetchGraphQL } from '../fetchGraphql';
import {
    orderFetchFailure,
    orderFetchStart,
    orderFetchSuccess,
    orderUrlAdd
} from '../reducers/orderReducers';


export const addOrderUrl = (orderUrl: any) => async (dispatch: any) => {
    dispatch(orderUrlAdd({ orderUrl }));
};

export const fetchOrders = (customerAccessToken: string | null) => async (dispatch: any) => {
    dispatch(orderFetchStart());

    const query = `
      query {
        customer(customerAccessToken: "${customerAccessToken}") {
          email
          orders(first: 100, reverse: true) {
            edges {
              node {
                orderNumber
                processedAt
                financialStatus
                fulfillmentStatus
                canceledAt
                statusUrl
                totalPriceV2 {
                 amount
                }
                billingAddress {
                 address1
                 formattedArea
                }
                id
                name
                email
                phone
                lineItems(first: 20) {
                 edges {
                    node {
                      quantity
                      title
                      discountedTotalPrice {
                        amount
                      }
                      originalTotalPrice {
                        amount
                      }
                      currentQuantity
                      variant {
                        image {
                          src
                        }
                        product {
                          vendor
                          productType
                          id
                        }
                        id
                      }
                    }
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
            input: { customerAccessToken },
        });

        dispatch(
            orderFetchSuccess({
                orderItems: res.data.customer.orders.edges.map((edge: any) => edge.node),
            })
        );
    } catch (err: any) {
        dispatch(orderFetchFailure(err.message || 'Something went wrong'));
    }
};
