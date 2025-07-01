import { fetchGraphQL } from '../fetchGraphql';
import {
    shopifyCartCreateFailure,
    shopifyCartCreateStart,
    shopifyCartCreateSuccess
} from '../reducers/shopifyCartReducers';

export const createShopifyCheckoutUrl = (cartDetail: any) => async (dispatch: any) => {
    dispatch(shopifyCartCreateStart());

    const lines = cartDetail.formattedCartItems
        .map(
            (product: any) => `
      {
        quantity: ${product.quantity},
        merchandiseId: "${product.merchandiseId}"
      }`
        )
        .join(",");
    const formattedLines = `[${lines}]`;

    const query = cartDetail?.email
        ? `
      mutation {
        cartCreate(
          input: {
            lines: ${formattedLines},
            attributes: { key: "cart_attribute", value: "This is a cart attribute from React Native" },
            buyerIdentity: {
              email: "${cartDetail.email}",
              countryCode: AE,
              deliveryAddressPreferences: {
                deliveryAddress: {
                  
                  firstName: "${cartDetail.selectedAdd.firstName}",
              		lastName: "${cartDetail.selectedAdd.lastName}",
              		address1: "${cartDetail.selectedAdd.address1}",
              		city: "${cartDetail.selectedAdd.city}",
              		province: "${cartDetail.selectedAdd.province}",
              		country: "AE",
              		zip: "${cartDetail.selectedAdd.zip}",
                },
              }
            },
          }
        ) {
          cart {
            checkoutUrl
          }
        }
      }
    `
        : `mutation {
        cartCreate(
          input: {
            lines: ${formattedLines},
            attributes: { key: "cart_attribute", value: "This is a cart attribute from React Native" },
          }
        ) {
          cart {
            checkoutUrl
          }
        }
      }`;

    try {
        const res = await fetchGraphQL(query, {
            input: { cartDetail, formattedLines },
        });

        const checkoutUrl = res.data.cartCreate.cart.checkoutUrl;

        dispatch(
            shopifyCartCreateSuccess({
                checkoutUrl
            })
        );

    } catch (err: any) {
        dispatch(shopifyCartCreateFailure(err.message || 'Something went wrong'));
    }
};
