import { createSlice } from '@reduxjs/toolkit';

interface GeneralSettingsState {
    language: string | null;
    onboarding: boolean;
    error: string | null;
}

const initialState: GeneralSettingsState = {
    language: 'en',
    onboarding: false,
    error: null
};

const generalSettingsSlice = createSlice({
    name: 'generalSettings',
    initialState,
    reducers: {
        updateLanguage: (state, action) => {
            state.language = action.payload;
        },
        updateOnboarding: (state, action) => {
            state.onboarding = action.payload;
        }
    },
});

export const {
    updateLanguage,
    updateOnboarding,
} = generalSettingsSlice.actions;

export default generalSettingsSlice.reducer;
