import { fetchGraphQL } from '../fetchGraphql';
import {
  userAuthFailure,
  userAuthStart,
  userAuthSuccess,
  userLogout,
} from '../reducers/userReducers';

export const loginCustomer = (email: string, password: string) => async (dispatch: any) => {
  dispatch(userAuthStart());

  const query = `
    mutation customerAccessTokenCreate($input: CustomerAccessTokenCreateInput!) {
      customerAccessTokenCreate(input: $input) {
        customerAccessToken {
          accessToken
          expiresAt
        }
        userErrors {
          message
        }
      }
    }
  `;

  try {
    const res = await fetchGraphQL(query, {
      input: { email, password },
    });

    const tokenInfo = res.data.customerAccessTokenCreate.customerAccessToken;
    const userErrors = res.data.customerAccessTokenCreate.userErrors;

    if (tokenInfo) {
      // Fetch customer info
      const customerQuery = `
        query {
          customer(customerAccessToken: "${tokenInfo.accessToken}") {
            id
            email
            firstName
            lastName
            addresses(first: 10) {
              edges {
                node {
                  id
                  firstName
                  lastName
                  address1
                  address2
                  city
                  province
                  country
                  zip
                  phone
                }
              }
            }
          }
        }
      `;
      const customerRes = await fetchGraphQL(customerQuery);

      dispatch(
        userAuthSuccess({
          accessToken: tokenInfo.accessToken,
          expiresAt: tokenInfo.expiresAt,
          customer: customerRes.data.customer,
        })
      );
    } else {
      dispatch(userAuthFailure(userErrors[0]?.message || 'Login failed'));
    }
  } catch (err: any) {
    dispatch(userAuthFailure(err.message || 'Something went wrong'));
  }
};

export const signupCustomer = (email: string, password: string, firstName: string, lastName: string) => async (dispatch: any) => {
  dispatch(userAuthStart());

  const query = `
    mutation customerCreate($input: CustomerCreateInput!) {
      customerCreate(input: $input) {
        customer {
          id
        }
        userErrors {
          message
        }
      }
    }
  `;

  try {
    const res = await fetchGraphQL(query, {
      input: { email, password, firstName, lastName },
    });

    const errors = res.data.customerCreate.userErrors;
    if (errors && errors.length > 0) {
      dispatch(userAuthFailure(errors[0].message));
    } else {
      dispatch(loginCustomer(email, password));
    }
  } catch (err: any) {
    dispatch(userAuthFailure(err.message || 'Signup failed'));
  }
};

export const logoutCustomer = () => (dispatch: any) => {
  dispatch(userLogout());
};
