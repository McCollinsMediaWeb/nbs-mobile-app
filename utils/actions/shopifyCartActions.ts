import { fetchGraphQL } from '../fetchGraphql';
import {
  shopifyCartCreateFailure,
  shopifyCartCreateStart,
  shopifyCartCreateSuccess
} from '../reducers/shopifyCartReducers';

export const createShopifyCheckoutUrl = (cartDetail: any) => async (dispatch: any) => {
    dispatch(shopifyCartCreateStart());

    console.log("cartDetails", cartDetail)

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
                  
                  firstName: "${cartDetail.selectedAddress.firstName}",
              		lastName: "${cartDetail.selectedAddress.lastName}",
              		address1: "${cartDetail.selectedAddress.address1}",
              		city: "${cartDetail.selectedAddress.city}",
              		province: "${cartDetail.selectedAddress.province}",
              		country: "AE",
              		zip: "${cartDetail.selectedAddress.zip}",
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

        console.log("response", res);

        const checkoutUrl = res.data.cartCreate.cart.checkoutUrl;

        console.log("checkoutUrl", checkoutUrl);

        dispatch(
            shopifyCartCreateSuccess({
                checkoutUrl
            })
        );

    } catch (err: any) {
        dispatch(shopifyCartCreateFailure(err.message || 'Something went wrong'));
    }
};
