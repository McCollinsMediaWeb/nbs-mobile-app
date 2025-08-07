import i18next from "i18next";
import { icons, images } from "../constants";
// const { t } = useTranslation();
const { t } = i18next;

export const faqKeywords = [
    {
        id: "1",
        name: "General"
    },
    {
        id: "2",
        name: "Account"
    },
    {
        id: "3",
        name: "Security"
    },
    {
        id: "4",
        name: "Ordering"
    },
    {
        id: "5",
        name: "Payment"
    }
];

export const faqs = [
    {
        question: 'How do I place an order on the app?',
        answer: 'To place an order, simply browse through our product catalog, select the items you want, add them to your cart, and proceed to checkout to confirm your order.',
        type: "General"
    },
    {
        question: 'Can I view product details, such as specifications and availability?',
        answer: 'Yes, you can view detailed product information including specifications, availability, and customer reviews. Simply navigate to the product page within the app.',
        type: "General"
    },
    {
        question: 'What should I do if I need to cancel or modify an order?',
        answer: 'To cancel or modify an order, go to the "My Orders" section, find your order, and follow the provided options to make changes.',
        type: "Account"
    },
    {
        question: 'How can I find products from specific categories or brands?',
        answer: 'You can use the app’s search filters to find products from specific categories or brands. Filter results by categories such as electronics or clothing.',
        type: "Ordering"
    },
    {
        question: 'Is there a way to make payments for orders within the app?',
        answer: 'Yes, you can securely make payments for orders using various payment methods available in the app, including credit/debit cards and digital wallets.',
        type: "Payment"
    },
    {
        question: 'Are my personal details and order information kept secure?',
        answer: 'Yes, we prioritize the security and confidentiality of your personal details and order information. Our app complies with strict privacy and data protection standards.',
        type: "Security"
    },
    {
        question: 'Can I request assistance with special product requirements or preferences?',
        answer: "Yes, you can request assistance with special product requirements or preferences during the ordering process. Simply specify your preferences, and we'll do our best to accommodate them.",
        type: "General"
    },
    {
        question: 'How can I provide feedback or review my shopping experience?',
        answer: 'After receiving your order, you can provide feedback and review your shopping experience through the app’s rating and review system. Your feedback helps us improve our services for future orders.',
        type: "General"
    },
    {
        question: 'Is customer support available through this app?',
        answer: 'While we facilitate online shopping, our app is not for customer support. For assistance, please contact our support team through the designated channels provided in the app.',
        type: "General"
    },
];

export const useBanners = () => {
    // const { t } = useTranslation();
    const { t } = i18next;

    return [
        {
            id: 1,
            label: t('banners.banner1.label'),
            headline1: t('banners.banner1.headline1'),
            headline2: t('banners.banner1.headline2'),
            buttonText: t('banners.banner1.buttonText'),
            buttonLink: "",
            image: images.banner1
        },
        {
            id: 2,
            label: t('banners.banner1.label'),
            headline1: t('banners.banner1.headline1'),
            headline2: t('banners.banner1.headline2'),
            buttonText: t('banners.banner1.buttonText'),
            buttonLink: "",
            image: images.banner1
        }
    ];
};

export const banners = [
    {
        id: 1,
        label: t('banners.banner1.label'),
        headline1: t('banners.banner1.headline1'),
        headline2: t('banners.banner1.headline2'),
        buttonText: t('banners.banner1.buttonText'),
        buttonLink: "",
        image: images.banner1
    },
    {
        id: 2,
        label: t('banners.banner1.label'),
        headline1: t('banners.banner1.headline1'),
        headline2: t('banners.banner1.headline2'),
        buttonText: t('banners.banner1.buttonText'),
        buttonLink: "",
        image: images.banner1
    },
    // {
    //     id: 3,
    //     discount: '30%',
    //     discountName: "Limited Time Offer",
    //     bottomTitle: 'Hurry up! Limited time offer!',
    //     bottomSubtitle: 'Valid until supplies last!'
    // }
];

export const brands = [
    {
        id: "1",
        image: images.brand1
    },
    {
        id: "2",
        image: images.brand2
    },
    {
        id: "3",
        image: images.brand3
    },
    {
        id: "4",
        image: images.brand1
    },
    {
        id: "5",
        image: images.brand2
    },
    {
        id: "6",
        image: images.brand3
    }
];


export const useCardsData = () => {
    // const { t } = useTranslation();
    const { t } = i18next;

    return [
        {
            id: "1",
            title: t('pointCard.card1.title'),
            subTitle: t('pointCard.card1.subTitle'),
            icon: icons.cardShipping
        },
        {
            id: "2",
            title: t('pointCard.card2.title'),
            subTitle: t('pointCard.card2.subTitle'),
            icon: icons.cardContact
        },
        {
            id: "3",
            title: t('pointCard.card3.title'),
            subTitle: t('pointCard.card3.subTitle'),
            icon: icons.cardSecurity
        },
        {
            id: "4",
            title: t('pointCard.card4.title'),
            subTitle: t('pointCard.card4.subTitle'),
            icon: icons.cardEmail
        }
    ];
};


export const cardsData = [
    {
        id: "1",
        title: "Free Global Shipping",
        subTitle: "Returns included. Taxes & duties fully covered.",
        icon: icons.cardShipping
    },
    {
        id: "2",
        title: "Customer service",
        subTitle: "We are available from monday to friday to answer your questions.",
        icon: icons.cardContact
    },
    {
        id: "3",
        title: "Secure payment",
        subTitle: "Your payment information is processed securely.",
        icon: icons.cardSecurity
    },
    {
        id: "4",
        title: "Contact us",
        subTitle: "Need to contact us ? Just send us an e-mail at info@nbsgroups.com",
        icon: icons.cardEmail
    }
];

export const ourProducts = [
    {
        id: "1",
        title: "NBS solar",
        image: images.ourProduct1,
        collectionId: "gid://shopify/Collection/439108534484"
    },
    {
        id: "2",
        title: "Generator",
        image: images.ourProduct2,
        collectionId: "gid://shopify/Collection/439108534484"
    },
    {
        id: "3",
        title: "Battery",
        image: images.ourProduct3,
        collectionId: "gid://shopify/Collection/439108534484"
    },
    {
        id: "4",
        title: "Sunride Solar",
        image: images.ourProduct4,
        collectionId: "gid://shopify/Collection/439108534484"
    },
    {
        id: "5",
        title: "Generators",
        image: images.ourProduct5,
        collectionId: "gid://shopify/Collection/439108534484"
    },
    {
        id: "6",
        title: "Water Pump",
        image: images.ourProduct6,
        collectionId: "gid://shopify/Collection/439108534484"
    }
];

export const useCategories = () => {
    // const { t } = useTranslation();
    const { t } = i18next;

    return [
        {
            id: "1",
            name: t('categories.item1.title'),
            icon: icons.sofa1,
            iconColor: "rgba(51, 94, 247, 1)",
            backgroundColor: "rgba(51, 94, 247, .12)",
            onPress: "categorysofa"
        },
        {
            id: "2",
            name: t('categories.item2.title'),
            icon: icons.chair1,
            iconColor: "rgba(255, 152, 31, 1)",
            backgroundColor: "rgba(255, 152, 31, .12)",
            onPress: "categorychair"
        },
        {
            id: "3",
            name: t('categories.item3.title'),
            icon: icons.table,
            iconColor: "rgba(26, 150, 240, 1)",
            backgroundColor: "rgba(26, 150, 240,.12)",
            onPress: "categorytable"
        },
    ];
};



export const categories = [
    // {
    //     id: "0",
    //     name: "All",
    //     icon: icons.category,
    //     iconColor: "rgba(51, 94, 247, 1)",
    //     backgroundColor: "rgba(51, 94, 247, .12)",
    //     onPress: null
    // },
    {
        id: "1",
        name: "Top Picks",
        icon: icons.sofa1,
        iconColor: "rgba(51, 94, 247, 1)",
        backgroundColor: "rgba(51, 94, 247, .12)",
        onPress: "categorysofa"
    },
    {
        id: "2",
        name: "What's New",
        icon: icons.chair1,
        iconColor: "rgba(255, 152, 31, 1)",
        backgroundColor: "rgba(255, 152, 31, .12)",
        onPress: "categorychair"
    },
    {
        id: "3",
        name: "Only at NBS",
        icon: icons.table,
        iconColor: "rgba(26, 150, 240, 1)",
        backgroundColor: "rgba(26, 150, 240,.12)",
        onPress: "categorytable"
    },
    // {
    //     id: "4",
    //     name: "Kitchen",
    //     icon: icons.kitchen,
    //     iconColor: "rgba(255, 192, 45, 1)",
    //     backgroundColor: "rgba(255, 192, 45,.12)",
    //     onPress: "categorykitchen"
    // },
    // {
    //     id: "5",
    //     name: "Lamp",
    //     icon: icons.lamp1,
    //     iconColor: "rgba(245, 67, 54, 1)",
    //     backgroundColor: "rgba(245, 67, 54,.12)",
    //     onPress: "categorylamp"
    // },
    // {
    //     id: "6",
    //     name: "Cupboard",
    //     icon: icons.cupboard1,
    //     iconColor: "rgba(74, 175, 87, 1)",
    //     backgroundColor: "rgba(74, 175, 87,.12)",
    //     onPress: "categorycupboard"
    // },
    // {
    //     id: "7",
    //     name: "Vase",
    //     icon: icons.vase1,
    //     iconColor: "rgba(0, 188, 211, 1)",
    //     backgroundColor: "rgba(0, 188, 211,.12)",
    //     onPress: "categoryvase"
    // },
    // {
    //     id: "8",
    //     name: "Others",
    //     icon: icons.more2,
    //     iconColor: "rgba(114, 16, 255, 1)",
    //     backgroundColor: "rgba(114, 16, 255, .12)",
    //     onPress: null
    // }
];



export const sorts = [
    {
        id: "1",
        name: "Popular"
    },
    {
        id: "2",
        name: "Most Recent"
    },
    {
        id: "3",
        name: "Price High"
    },
    {
        id: "4",
        name: "Price Low"
    },
    {
        id: "5",
        name: "Most Rated"
    },
];