import {
    setSelectedAddress
} from '../reducers/selectedAddressReducers';


export const updateSelectedAddress = (address: any) => (dispatch: any) => {
  dispatch(setSelectedAddress(address));
};