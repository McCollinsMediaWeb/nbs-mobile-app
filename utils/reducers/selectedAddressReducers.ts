import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface SelectedAddressState {
    selectedAddress: any;
}

const initialState: SelectedAddressState = {
    selectedAddress: null,
};

const selectedAddressSlice = createSlice({
    name: 'selectedAddress',
    initialState,
    reducers: {
        setSelectedAddress: (state, action: PayloadAction<any>) => {
            state.selectedAddress = action.payload;
        },
    },
});


export const {
    setSelectedAddress
} = selectedAddressSlice.actions;

export default selectedAddressSlice.reducer;
