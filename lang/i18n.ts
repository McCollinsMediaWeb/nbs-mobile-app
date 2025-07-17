// import i18n from 'i18next';
// import { initReactI18next } from 'react-i18next';
// import ar from './ar.json';
// import en from './en.json';

// const resources = {
//     en: en,
//     ar: ar,
// };


// i18n.use(initReactI18next)
//     .init({
//         compatibilityJSON: 'v4',
//         resources,
//         lng: 'ar',
//         fallbackLng: 'ar',
//         interpolation: {
//             escapeValue: false,
//         },
//     });

// export default i18n;


import AsyncStorage from '@react-native-async-storage/async-storage';
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import ar from './ar.json';
import en from './en.json';

const resources = {
    en,
    ar,
};

const initI18n = async () => {
    const language = (await AsyncStorage.getItem('language')) || 'en';

    await i18n
        .use(initReactI18next)
        .init({
            compatibilityJSON: 'v4',
            resources,
            lng: language,
            fallbackLng: 'en',
            interpolation: {
                escapeValue: false,
            },
        });

    return i18n;
};

export default initI18n;



// import AsyncStorage from '@react-native-async-storage/async-storage';
// import i18n from 'i18next';
// import { initReactI18next } from 'react-i18next';
// import ar from './ar.json';
// import en from './en.json';

// const resources = {
//     en: en,
//     ar: ar,
// };

// // Async initializer
// export const initI18n = async () => {
//     const storedLanguage = await AsyncStorage.getItem('language');

//     await i18n
//         .use(initReactI18next)
//         .init({
//             compatibilityJSON: 'v4',
//             resources,
//             lng: storedLanguage || 'en',
//             fallbackLng: 'en',
//             interpolation: {
//                 escapeValue: false,
//             },
//         });

//     return i18n;
// };

// export default i18n;
