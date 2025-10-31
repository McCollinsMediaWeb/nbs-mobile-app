import AsyncStorage from "@react-native-async-storage/async-storage";

// utils/fetchGraphQL.ts
const API_URL = "https://7194k2-01.myshopify.com/api/2025-04/graphql.json";
const HEADERS = {
    "Content-Type": "application/json",
    "X-Shopify-Storefront-Access-Token": "f0ace8405d20f8e72235dd0dd1c8c6dd",
};

// export const fetchGraphQL = async <T = any>(query: string): Promise<T> => {
//     try {
//         const response = await fetch(API_URL, {
//             method: "POST",
//             headers: HEADERS,
//             body: JSON.stringify({ query }),
//         });

//         if (!response.ok) {
//             throw new Error("Network response was not ok");
//         }

//         const data = await response.json();
//         return data as T;
//     } catch (error) {
//         console.error("Error fetching data from Shopify GraphQL API:", error);
//         throw error;
//     }
// };

export const fetchGraphQL = async <T = any>(query: string, variables?: Record<string, any>): Promise<T> => {

    const language = (await AsyncStorage.getItem('language')) || 'en';

    try {
        const response = await fetch(API_URL, {
            method: "POST",
            headers: {
                ...HEADERS,
                "Accept-Language": language,
            },
            body: JSON.stringify({ query, variables }),
        });

        if (!response.ok) {
            throw new Error("Network response was not ok");
        }

        const data = await response.json();
        return data as T;
    } catch (error) {
        console.error("Error fetching data from Shopify GraphQL API:", error);
        throw error;
    }
};

