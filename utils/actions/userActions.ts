import { fetchGraphQL } from '../fetchGraphql';
import {
  userAuthFailure,
  userAuthStart,
  userAuthSuccess,
  userLogout,
} from '../reducers/userReducers';

async function fetchCustomerDetails(accessToken: string | null) {
  const fetchCustomerDetailsQuery = `
    {
      customer(customerAccessToken: "${accessToken}") {
        id
        firstName
        lastName
        email
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

  const customerRes = await fetchGraphQL(fetchCustomerDetailsQuery);
  if (customerRes?.data?.customer?.userErrors?.length > 0) {
    throw new Error(customerRes.data.customer.userErrors[0].message);
  }

  return customerRes;
}

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
      // const customerRes = await fetchGraphQL(customerQuery);

      const customerRes = await fetchCustomerDetails(
        tokenInfo.accessToken
      );



      dispatch(
        userAuthSuccess({
          accessToken: tokenInfo.accessToken,
          // expiresAt: tokenInfo.expiresAt,
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

export const addNewAddress = (addressData: {
  customerAccessToken: string | null;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  address: string;
  city: string;
  emirate: string;
  pinCode: string;
  label: string | null;
}) => async (dispatch: any) => {
  // dispatch(userAuthStart());

  const { customerAccessToken, firstName, lastName, phoneNumber, address, city, emirate, pinCode } = addressData;

  const query = `
        mutation {
          customerAddressCreate(customerAccessToken: "${customerAccessToken}", address: {
              lastName: "${lastName}",
              firstName: "${firstName}",
              address1: "${address}",
              province:"${emirate}",
              country: "AE",
              zip: "${pinCode}",
              city: "${city}",
              phone:"${phoneNumber}"
          }) {
            customerUserErrors {
              code
              field
              message
            }
            customerAddress {
              id
            }
          }
        }
      `;

  try {
    const res = await fetchGraphQL(query, {
      input: { customerAccessToken, firstName, lastName, phoneNumber, address, city, emirate, pinCode },
    });

    const errors = res.data.customerAddressCreate.userErrors;
    if (errors && errors.length > 0) {
      dispatch(userAuthFailure(errors[0].message));
    } else {
      const updatedCustomerDetails = await fetchCustomerDetails(
        customerAccessToken
      );

      dispatch(
        userAuthSuccess({
          accessToken: customerAccessToken,
          customer: updatedCustomerDetails.data.customer,
        })
      );

      // return {
      //   accessToken,
      //   ...updatedCustomerDetails,
      // };
    }
  } catch (err: any) {
    // dispatch(userAuthFailure(err.message || 'Signup failed'));
  }
};


export const deleteAddress = (addressData: {
  customerAccessToken: string | null;
  addressId: string | null;
}) => async (dispatch: any) => {

  const { customerAccessToken, addressId } = addressData;

  const query = `
        mutation {
          customerAddressDelete(customerAccessToken: "${customerAccessToken}", id: "${addressId}") {
            customerUserErrors {
              code
              field
              message
            }
            deletedCustomerAddressId
          }
        }
      `;

  try {
    const res = await fetchGraphQL(query, {
      input: { customerAccessToken, addressId },
    });

    const errors = res.data.customerAddressDelete.userErrors;
    if (errors && errors.length > 0) {
      dispatch(userAuthFailure(errors[0].message));
    } else {
      const updatedCustomerDetails = await fetchCustomerDetails(
        customerAccessToken
      );

      dispatch(
        userAuthSuccess({
          accessToken: customerAccessToken,
          customer: updatedCustomerDetails.data.customer,
        })
      );
    }
  } catch (err: any) {
    // dispatch(userAuthFailure(err.message || 'Signup failed'));
  }
};



export const updateAddress = (addressData: {
  customerAccessToken: string | null;
  addressId: string | null;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  address: string;
  city: string;
  emirate: string;
  pinCode: string;
  label: string | null;
}) => async (dispatch: any) => {
  // dispatch(userAuthStart());

  const { customerAccessToken, addressId, firstName, lastName, phoneNumber, address, city, emirate, pinCode } = addressData;

  const query = `
        mutation {
          customerAddressUpdate(customerAccessToken: "${customerAccessToken}", id: "${addressId}", address: {
              lastName: "${lastName}",
              firstName: "${firstName}",
              address1: "${address}",
              province:"${emirate}",
              country: "AE",
              zip: "${pinCode}",
              city: "${city}",
              phone:"${phoneNumber}"
          }) {
            customerUserErrors {
              code
              field
              message
            }
            customerAddress {
              id
            }
          }
        }
      `;

  try {
    const res = await fetchGraphQL(query, {
      input: { customerAccessToken, firstName, lastName, phoneNumber, address, city, emirate, pinCode },
    });

    const errors = res.data.customerAddressCreate.userErrors;
    if (errors && errors.length > 0) {
      dispatch(userAuthFailure(errors[0].message));
    } else {
      const updatedCustomerDetails = await fetchCustomerDetails(
        customerAccessToken
      );

      dispatch(
        userAuthSuccess({
          accessToken: customerAccessToken,
          customer: updatedCustomerDetails.data.customer,
        })
      );
    }
  } catch (err: any) {
    // dispatch(userAuthFailure(err.message || 'Signup failed'));
  }
};


export const logoutCustomer = () => (dispatch: any) => {
  dispatch(userLogout());
};

export const forgotPassword = async (email: string) => {
  const query = `
    mutation {
      customerRecover(email: "${email}") {
        userErrors {
          field
          message
        }
      }
    }
  `;

  try {
    const res = await fetchGraphQL(query, {
      input: { email },
    });

    const errors = res?.data?.customerRecover?.userErrors;

    if (errors?.length > 0) {
      throw new Error(errors[0].message);
    }

    alert('Password reset link sent to your email.');
  } catch (err: any) {
    alert('Something went wrong.');
    console.error('Forgot password error:', err);
  }
};