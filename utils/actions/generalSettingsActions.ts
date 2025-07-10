import { updateLanguage, updateOnboarding } from '../reducers/generalSettingsReducers';

// Update App Language
export const changeAppLanguage = (lang: any) => (dispatch: any) => {
    dispatch(updateLanguage(lang));
};

// Update Onboard Status
export const changeOnboardStatus = (status: boolean) => (dispatch: any) => {
    dispatch(updateOnboarding(status));
};