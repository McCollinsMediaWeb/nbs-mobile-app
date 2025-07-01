import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Customer {
    id: string;
    email: string;
    firstName?: string;
    lastName?: string;
    addresses?: any
}

interface UserState {
    accessToken: string | null;
    // expiresAt: string | null;
    customer: Customer | null;
    loading: boolean;
    error: string | null;
}

const initialState: UserState = {
    accessToken: null,
    // expiresAt: null,
    customer: null,
    loading: false,
    error: null,
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        userAuthStart: (state) => {
            state.loading = true;
            state.error = null;
        },
        userAuthSuccess: (
            state,
            action: PayloadAction<{
                accessToken: string | null;
                // expiresAt: string;
                customer: Customer;
            }>
        ) => {
            state.loading = false;
            state.accessToken = action.payload.accessToken;
            // state.expiresAt = action.payload.expiresAt;
            state.customer = action.payload.customer;
        },
        userAuthFailure: (state, action: PayloadAction<string>) => {
            state.loading = false;
            state.error = action.payload;
        },
        userLogout: (state) => {
            return { ...initialState };
        },
    },
});

export const {
    userAuthStart,
    userAuthSuccess,
    userAuthFailure,
    userLogout,
} = userSlice.actions;

export default userSlice.reducer;
