import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type Suggestion = {
    title: string;
    // Add other fields if needed
};

type Product = {
    id: string;
    title: string;
    image: string;
    price: string;
    oldPrice: string;
    // add other fields as needed
};


interface SearchState {
    suggestions: Suggestion[];
    data: Product[];
    loading: boolean;
    error: string | null;
}

const initialState: SearchState = {
    suggestions: [],
    data: [],
    loading: false,
    error: null,
};

const searchSlice = createSlice({
    name: 'search',
    initialState,
    reducers: {
        searchSuggestionSuccess: (
            state,
            action: PayloadAction<{
                suggestions: [];
            }>
        ) => {
            state.loading = false;
            state.suggestions = action.payload.suggestions;
        },
        searchProductsSuccess: (
            state,
            action: PayloadAction<{
                data: [];
            }>
        ) => {
            state.loading = false;
            state.data = action.payload.data;
        },
    },
});

export const {
    searchSuggestionSuccess,
    searchProductsSuccess
} = searchSlice.actions;

export default searchSlice.reducer;
