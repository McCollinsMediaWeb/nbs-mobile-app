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

export const useFaqs = () => {
    // const { t } = useTranslation();
    const { t } = i18next;

    return [
        {
            question: t("helpCenter.faqs.question1"),
            answer: t("helpCenter.faqs.question1Answer"),
            type: "General"
        },
        {
            question: t("helpCenter.faqs.question2"),
            answer: t("helpCenter.faqs.question2Answer"),
            type: "General"
        },
        {
            question: t("helpCenter.faqs.question3"),
            answer: t("helpCenter.faqs.question3Answer"),
            type: "Account"
        },
        {
            question: t("helpCenter.faqs.question4"),
            answer: t("helpCenter.faqs.question4Answer"),
            type: "Ordering"
        },
        {
            question: t("helpCenter.faqs.question5"),
            answer: t("helpCenter.faqs.question5Answer"),
            type: "Payment"
        },
        {
            question: t("helpCenter.faqs.question6"),
            answer: t("helpCenter.faqs.question6Answer"),
            type: "Security"
        },
        {
            question: t("helpCenter.faqs.question7"),
            answer: t("helpCenter.faqs.question7Answer"),
            type: "General"
        },
        {
            question: t("helpCenter.faqs.question8"),
            answer: t("helpCenter.faqs.question8Answer"),
            type: "General"
        },
    ];
};


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
    // {
    //     question: 'How can I provide feedback or review my shopping experience?',
    //     answer: 'After receiving your order, you can provide feedback and review your shopping experience through the app’s rating and review system. Your feedback helps us improve our services for future orders.',
    //     type: "General"
    // },
    {
        question: 'Is customer support available through this app?',
        answer: 'While we facilitate online shopping, our app is not for customer support. For assistance, please contact our support team through the designated channels provided in the app.',
        type: "General"
    },
];

export const useMenuData = () => {
    const { t } = i18next;

    return [
        { title: t("hamburgerMenu.home"), route: "/" },
        { title: t("hamburgerMenu.aboutUs"), route: "aboutus" },
        {
            title: t("hamburgerMenu.allProducts"),
            route: "(tabs)/allproducts",
            children: [
                {
                    title: t("hamburgerMenu.nbsSolar"),
                    route: "collectionscreen",
                    params: {
                        collectionId: "gid://shopify/Collection/439108534484",
                        collectionTitle: t("hamburgerMenu.nbsSolar"),
                        collectionImage: "",
                    },
                    children: [
                        {
                            title: t("hamburgerMenu.nbsSolarOptions.option1"),
                            route: "collectionscreen",
                            params: {
                                collectionId: "gid://shopify/Collection/443629338836",
                                collectionTitle: t("hamburgerMenu.nbsSolarOptions.option1"),
                                collectionImage: "",
                            },
                        },
                        {
                            title: t("hamburgerMenu.nbsSolarOptions.option2"),
                            route: "collectionscreen",
                            params: {
                                collectionId: "gid://shopify/Collection/443629371604",
                                collectionTitle: t("hamburgerMenu.nbsSolarOptions.option2"),
                                collectionImage: "",
                            },
                            children: [
                                {
                                    title: t(
                                        "hamburgerMenu.nbsSolarOptions.option2Options.option1"
                                    ),
                                    route: "collectionscreen",
                                    params: {
                                        collectionId: "gid://shopify/Collection/443629732052",
                                        collectionTitle: t("hamburgerMenu.nbsSolarOptions.option2Options.option1"),
                                        collectionImage: "",
                                    },
                                },
                                {
                                    title: t(
                                        "hamburgerMenu.nbsSolarOptions.option2Options.option2"
                                    ),
                                    route: "collectionscreen",
                                    params: {
                                        collectionId: "gid://shopify/Collection/443629797588",
                                        collectionTitle: t("hamburgerMenu.nbsSolarOptions.option2Options.option2"),
                                        collectionImage: "",
                                    },
                                },
                                {
                                    title: t(
                                        "hamburgerMenu.nbsSolarOptions.option2Options.option3"
                                    ),
                                    route: "collectionscreen",
                                    params: {
                                        collectionId: "gid://shopify/Collection/443629830356",
                                        collectionTitle: t("hamburgerMenu.nbsSolarOptions.option2Options.option3"),
                                        collectionImage: "",
                                    },
                                },
                                {
                                    title: t(
                                        "hamburgerMenu.nbsSolarOptions.option2Options.option4"
                                    ),
                                    route: "collectionscreen",
                                    params: {
                                        collectionId: "gid://shopify/Collection/443629863124",
                                        collectionTitle: t("hamburgerMenu.nbsSolarOptions.option2Options.option4"),
                                        collectionImage: "",
                                    },
                                },
                            ],
                        },
                        {
                            title: t("hamburgerMenu.nbsSolarOptions.option3"),
                            route: "collectionscreen",
                            params: {
                                collectionId: "gid://shopify/Collection/443629469908",
                                collectionTitle: t("hamburgerMenu.nbsSolarOptions.option3"),
                                collectionImage: "",
                            },
                        },
                        {
                            title: t("hamburgerMenu.nbsSolarOptions.option4"),
                            route: "collectionscreen",
                            params: {
                                collectionId: "gid://shopify/Collection/443629535444",
                                collectionTitle: t("hamburgerMenu.nbsSolarOptions.option4"),
                                collectionImage: "",
                            },
                        },
                        {
                            title: t("hamburgerMenu.nbsSolarOptions.option5"),
                            route: "collectionscreen",
                            params: {
                                collectionId: "gid://shopify/Collection/443629568212",
                                collectionTitle: t("hamburgerMenu.nbsSolarOptions.option5"),
                                collectionImage: "",
                            },
                        },
                    ],
                },
                {
                    title: t("hamburgerMenu.sumakSolar"),
                    route: "collectionscreen",
                    params: {
                        collectionId: "gid://shopify/Collection/443234484436",
                        collectionTitle: t("hamburgerMenu.sumakSolar"),
                        collectionImage: "",
                    },
                    children: [
                        {
                            title: t("hamburgerMenu.sumakSolarOptions.option1"),
                            route: "collectionscreen",
                            params: {
                                collectionId: "gid://shopify/Collection/443628355796",
                                collectionTitle: t("hamburgerMenu.sumakSolarOptions.option1"),
                                collectionImage: "",
                            },
                        },
                        {
                            title: t("hamburgerMenu.sumakSolarOptions.option2"),
                            route: "collectionscreen",
                            params: {
                                collectionId: "gid://shopify/Collection/443628454100",
                                collectionTitle: t("hamburgerMenu.sumakSolarOptions.option2"),
                                collectionImage: "",
                            },
                        },
                        {
                            title: t("hamburgerMenu.sumakSolarOptions.option3"),
                            route: "collectionscreen",
                            params: {
                                collectionId: "gid://shopify/Collection/443628519636",
                                collectionTitle: t("hamburgerMenu.sumakSolarOptions.option3"),
                                collectionImage: "",
                            },
                        },
                        {
                            title: t("hamburgerMenu.sumakSolarOptions.option4"),
                            route: "collectionscreen",
                            params: {
                                collectionId: "gid://shopify/Collection/443628552404",
                                collectionTitle: t("hamburgerMenu.sumakSolarOptions.option4"),
                                collectionImage: "",
                            },
                        },
                        {
                            title: t("hamburgerMenu.sumakSolarOptions.option5"),
                            route: "collectionscreen",
                            params: {
                                collectionId: "gid://shopify/Collection/443628585172",
                                collectionTitle: t("hamburgerMenu.sumakSolarOptions.option5"),
                                collectionImage: "",
                            },
                            children: [
                                {
                                    title: t(
                                        "hamburgerMenu.sumakSolarOptions.option5Options.option1"
                                    ),
                                    route: "collectionscreen",
                                    params: {
                                        collectionId: "gid://shopify/Collection/443628781780",
                                        collectionTitle: t("hamburgerMenu.sumakSolarOptions.option5Options.option1"),
                                        collectionImage: "",
                                    },
                                },
                                {
                                    title: t(
                                        "hamburgerMenu.sumakSolarOptions.option5Options.option2"
                                    ),
                                    route: "collectionscreen",
                                    params: {
                                        collectionId: "gid://shopify/Collection/443628814548",
                                        collectionTitle: t("hamburgerMenu.sumakSolarOptions.option5Options.option2"),
                                        collectionImage: "",
                                    },
                                },
                                {
                                    title: t(
                                        "hamburgerMenu.sumakSolarOptions.option5Options.option3"
                                    ),
                                    route: "collectionscreen",
                                    params: {
                                        collectionId: "gid://shopify/Collection/443628912852",
                                        collectionTitle: t("hamburgerMenu.sumakSolarOptions.option5Options.option3"),
                                        collectionImage: "",
                                    },
                                },
                                {
                                    title: t(
                                        "hamburgerMenu.sumakSolarOptions.option5Options.option4"
                                    ),
                                    route: "collectionscreen",
                                    params: {
                                        collectionId: "gid://shopify/Collection/443628945620",
                                        collectionTitle: t("hamburgerMenu.sumakSolarOptions.option5Options.option4"),
                                        collectionImage: "",
                                    },
                                },
                                {
                                    title: t(
                                        "hamburgerMenu.sumakSolarOptions.option5Options.option5"
                                    ),
                                    route: "collectionscreen",
                                    params: {
                                        collectionId: "gid://shopify/Collection/443629011156",
                                        collectionTitle: t("hamburgerMenu.sumakSolarOptions.option5Options.option5"),
                                        collectionImage: "",
                                    },
                                },
                            ],
                        },
                        {
                            title: t("hamburgerMenu.sumakSolarOptions.option6"),
                            route: "collectionscreen",
                            params: {
                                collectionId: "gid://shopify/Collection/443628617940",
                                collectionTitle: t("hamburgerMenu.sumakSolarOptions.option6"),
                                collectionImage: "",
                            },
                        },
                        {
                            title: t("hamburgerMenu.sumakSolarOptions.option7"),
                            rroute: "collectionscreen",
                            params: {
                                collectionId: "gid://shopify/Collection/443628650708",
                                collectionTitle: t("hamburgerMenu.sumakSolarOptions.option7"),
                                collectionImage: "",
                            },
                        },
                        {
                            title: t("hamburgerMenu.sumakSolarOptions.option8"),
                            route: "collectionscreen",
                            params: {
                                collectionId: "gid://shopify/Collection/443628749012",
                                collectionTitle: t("hamburgerMenu.sumakSolarOptions.option8"),
                                collectionImage: "",
                            },
                        },
                    ],
                },
                {
                    title: t("hamburgerMenu.samsunSolar"),
                    route: "collectionscreen",
                    params: {
                        collectionId: "gid://shopify/Collection/443227111636",
                        collectionTitle: t("hamburgerMenu.samsunSolar"),
                        collectionImage: "",
                    },
                    children: [
                        {
                            title: t("hamburgerMenu.samsunSolarOptions.option1"),
                            route: "collectionscreen",
                            params: {
                                collectionId: "gid://shopify/Collection/443627700436",
                                collectionTitle: t("hamburgerMenu.samsunSolarOptions.option1"),
                                collectionImage: "",
                            },
                        },
                        {
                            title: t("hamburgerMenu.samsunSolarOptions.option2"),
                            route: "collectionscreen",
                            params: {
                                collectionId: "gid://shopify/Collection/443627798740",
                                collectionTitle: t("hamburgerMenu.samsunSolarOptions.option2"),
                                collectionImage: "",
                            },
                        },
                        {
                            title: t("hamburgerMenu.samsunSolarOptions.option3"),
                            route: "collectionscreen",
                            params: {
                                collectionId: "gid://shopify/Collection/443627831508",
                                collectionTitle: t("hamburgerMenu.samsunSolarOptions.option3"),
                                collectionImage: "",
                            },
                        },
                        {
                            title: t("hamburgerMenu.samsunSolarOptions.option4"),
                            route: "collectionscreen",
                            params: {
                                collectionId: "gid://shopify/Collection/443627864276",
                                collectionTitle: t("hamburgerMenu.samsunSolarOptions.option4"),
                                collectionImage: "",
                            },
                        },
                        {
                            title: t("hamburgerMenu.samsunSolarOptions.option5"),
                            route: "collectionscreen",
                            params: {
                                collectionId: "gid://shopify/Collection/443627929812",
                                collectionTitle: t("hamburgerMenu.samsunSolarOptions.option5"),
                                collectionImage: "",
                            },
                            children: [
                                {
                                    title: t(
                                        "hamburgerMenu.samsunSolarOptions.option5Options.option1"
                                    ),
                                    route: "collectionscreen",
                                    params: {
                                        collectionId: "gid://shopify/Collection/443628028116",
                                        collectionTitle: t("hamburgerMenu.samsunSolarOptions.option5Options.option1"),
                                        collectionImage: "",
                                    },
                                },
                                {
                                    title: t(
                                        "hamburgerMenu.samsunSolarOptions.option5Options.option2"
                                    ),
                                    route: "collectionscreen",
                                    params: {
                                        collectionId: "gid://shopify/Collection/443628093652",
                                        collectionTitle: t("hamburgerMenu.samsunSolarOptions.option5Options.option2"),
                                        collectionImage: "",
                                    },
                                },
                                {
                                    title: t(
                                        "hamburgerMenu.samsunSolarOptions.option5Options.option3"
                                    ),
                                    route: "collectionscreen",
                                    params: {
                                        collectionId: "gid://shopify/Collection/443628126420",
                                        collectionTitle: t("hamburgerMenu.samsunSolarOptions.option5Options.option3"),
                                        collectionImage: "",
                                    },
                                },
                                {
                                    title: t(
                                        "hamburgerMenu.samsunSolarOptions.option5Options.option4"
                                    ),
                                    route: "collectionscreen",
                                    params: {
                                        collectionId: "gid://shopify/Collection/443628159188",
                                        collectionTitle: t("hamburgerMenu.samsunSolarOptions.option5Options.option4"),
                                        collectionImage: "",
                                    },
                                },
                                {
                                    title: t(
                                        "hamburgerMenu.samsunSolarOptions.option5Options.option5"
                                    ),
                                    route: "collectionscreen",
                                    params: {
                                        collectionId: "gid://shopify/Collection/443628191956",
                                        collectionTitle: t("hamburgerMenu.samsunSolarOptions.option5Options.option5"),
                                        collectionImage: "",
                                    },
                                },
                            ],
                        },
                    ],
                },
                {
                    title: t("hamburgerMenu.sunrideSolar"),
                    route: "collectionscreen",
                    params: {
                        collectionId: "gid://shopify/Collection/443234549972",
                        collectionTitle: t("hamburgerMenu.sunrideSolar"),
                        collectionImage: "",
                    },
                    children: [
                        {
                            title: t("hamburgerMenu.sunrideSolarOptions.option1"),
                            route: "collectionscreen",
                            params: {
                                collectionId: "gid://shopify/Collection/443625930964",
                                collectionTitle: t("hamburgerMenu.sunrideSolarOptions.option1"),
                                collectionImage: "",
                            },
                        },
                        {
                            title: t("hamburgerMenu.sunrideSolarOptions.option2"),
                            route: "collectionscreen",
                            params: {
                                collectionId: "gid://shopify/Collection/443625996500",
                                collectionTitle: t("hamburgerMenu.sunrideSolarOptions.option2"),
                                collectionImage: "",
                            },
                        },
                        {
                            title: t("hamburgerMenu.sunrideSolarOptions.option3"),
                            route: "collectionscreen",
                            params: {
                                collectionId: "gid://shopify/Collection/443626160340",
                                collectionTitle: t("hamburgerMenu.sunrideSolarOptions.option3"),
                                collectionImage: "",
                            },
                        },
                        {
                            title: t("hamburgerMenu.sunrideSolarOptions.option4"),
                            route: "collectionscreen",
                            params: {
                                collectionId: "gid://shopify/Collection/443626258644",
                                collectionTitle: t("hamburgerMenu.sunrideSolarOptions.option4"),
                                collectionImage: "",
                            },
                        },
                        {
                            title: t("hamburgerMenu.sunrideSolarOptions.option5"),
                            route: "collectionscreen",
                            params: {
                                collectionId: "gid://shopify/Collection/443626324180",
                                collectionTitle: t("hamburgerMenu.sunrideSolarOptions.option5"),
                                collectionImage: "",
                            },
                            children: [
                                {
                                    title: t(
                                        "hamburgerMenu.sunrideSolarOptions.option5Options.option1"
                                    ),
                                    route: "collectionscreen",
                                    params: {
                                        collectionId: "gid://shopify/Collection/443626455252",
                                        collectionTitle: t("hamburgerMenu.sunrideSolarOptions.option5Options.option1"),
                                        collectionImage: "",
                                    },
                                },
                                {
                                    title: t(
                                        "hamburgerMenu.sunrideSolarOptions.option5Options.option2"
                                    ),
                                    route: "collectionscreen",
                                    params: {
                                        collectionId: "gid://shopify/Collection/443626520788",
                                        collectionTitle: t("hamburgerMenu.sunrideSolarOptions.option5Options.option2"),
                                        collectionImage: "",
                                    },
                                },
                                {
                                    title: t(
                                        "hamburgerMenu.sunrideSolarOptions.option5Options.option3"
                                    ),
                                    route: "collectionscreen",
                                    params: {
                                        collectionId: "gid://shopify/Collection/443626586324",
                                        collectionTitle: t("hamburgerMenu.sunrideSolarOptions.option5Options.option3"),
                                        collectionImage: "",
                                    },
                                },
                                {
                                    title: t(
                                        "hamburgerMenu.sunrideSolarOptions.option5Options.option4"
                                    ),
                                    route: "collectionscreen",
                                    params: {
                                        collectionId: "gid://shopify/Collection/443626619092",
                                        collectionTitle: t("hamburgerMenu.sunrideSolarOptions.option5Options.option4"),
                                        collectionImage: "",
                                    },
                                },
                                {
                                    title: t(
                                        "hamburgerMenu.sunrideSolarOptions.option5Options.option5"
                                    ),
                                    route: "collectionscreen",
                                    params: {
                                        collectionId: "gid://shopify/Collection/443626782932",
                                        collectionTitle: t("hamburgerMenu.sunrideSolarOptions.option5Options.option5"),
                                        collectionImage: "",
                                    },
                                },
                            ],
                        },
                    ],
                },
                {
                    title: t("hamburgerMenu.generators"),
                    route: "collectionscreen",
                    params: {
                        collectionId: "gid://shopify/Collection/443266466004",
                        collectionTitle: t("hamburgerMenu.generatorsOptions.option8"),
                        collectionImage: "",
                    },
                    children: [
                        {
                            title: t("hamburgerMenu.generatorsOptions.option1"),
                            route: "collectionscreen",
                            params: {
                                collectionId: "gid://shopify/Collection/443625144532",
                                collectionTitle: t("hamburgerMenu.generatorsOptions.option1"),
                                collectionImage: "",
                            },
                        },
                        {
                            title: t("hamburgerMenu.generatorsOptions.option2"),
                            route: "collectionscreen",
                            params: {
                                collectionId: "gid://shopify/Collection/443625210068",
                                collectionTitle: t("hamburgerMenu.generatorsOptions.option2"),
                                collectionImage: "",
                            },
                        },
                        {
                            title: t("hamburgerMenu.generatorsOptions.option3"),
                            route: "collectionscreen",
                            params: {
                                collectionId: "gid://shopify/Collection/443625406676",
                                collectionTitle: t("hamburgerMenu.generatorsOptions.option3"),
                                collectionImage: "",
                            },
                        },
                        {
                            title: t("hamburgerMenu.generatorsOptions.option4"),
                            route: "collectionscreen",
                            params: {
                                collectionId: "gid://shopify/Collection/443625439444",
                                collectionTitle: t("hamburgerMenu.generatorsOptions.option4"),
                                collectionImage: "",
                            },
                        },
                        {
                            title: t("hamburgerMenu.generatorsOptions.option5"),
                            route: "collectionscreen",
                            params: {
                                collectionId: "gid://shopify/Collection/443625504980",
                                collectionTitle: t("hamburgerMenu.generatorsOptions.option5"),
                                collectionImage: "",
                            },
                        },
                        {
                            title: t("hamburgerMenu.generatorsOptions.option6"),
                            route: "collectionscreen",
                            params: {
                                collectionId: "gid://shopify/Collection/443625603284",
                                collectionTitle: t("hamburgerMenu.generatorsOptions.option6"),
                                collectionImage: "",
                            },
                        },
                        {
                            title: t("hamburgerMenu.generatorsOptions.option7"),
                            route: "collectionscreen",
                            params: {
                                collectionId: "gid://shopify/Collection/444937568468",
                                collectionTitle: t("hamburgerMenu.generatorsOptions.option7"),
                                collectionImage: "",
                            },
                        },
                        {
                            title: t("hamburgerMenu.generatorsOptions.option8"),
                            route: "collectionscreen",
                            params: {
                                collectionId: "gid://shopify/Collection/445221241044",
                                collectionTitle: t("hamburgerMenu.generatorsOptions.option8"),
                                collectionImage: "",
                            },
                        },
                        {
                            title: t("hamburgerMenu.generatorsOptions.option9"),
                            route: "collectionscreen",
                            params: {
                                collectionId: "gid://shopify/Collection/443625767124",
                                collectionTitle: t("hamburgerMenu.generatorsOptions.option9"),
                                collectionImage: "",
                            },
                        },
                    ],
                },
                {
                    title: t("hamburgerMenu.powerStation"),
                    route: "collectionscreen",
                    params: {
                        collectionId: "gid://shopify/Collection/443234615508",
                        collectionTitle: t("hamburgerMenu.powerStation"),
                        collectionImage: "",
                    },
                    children: [
                        {
                            title: t("hamburgerMenu.powerStationOptions.option1"),
                            route: "collectionscreen",
                            params: {
                                collectionId: "gid://shopify/Collection/443622785236",
                                collectionTitle: t("hamburgerMenu.powerStationOptions.option1"),
                                collectionImage: "",
                            },
                        },
                    ],
                },
                {
                    title: t("hamburgerMenu.carWasher"),
                    route: "collectionscreen",
                    params: {
                        collectionId: "gid://shopify/Collection/443234713812",
                        collectionTitle: t("hamburgerMenu.carWasher"),
                        collectionImage: "",
                    },
                    children: [
                        {
                            title: t("hamburgerMenu.carWasherOptions.option1"),
                            route: "collectionscreen",
                            params: {
                                collectionId: "gid://shopify/Collection/443622752468",
                                collectionTitle: t("hamburgerMenu.carWasherOptions.option1"),
                                collectionImage: "",
                            },
                        },
                    ],
                },
                {
                    title: t("hamburgerMenu.waterPump"),
                    route: "collectionscreen",
                    params: {
                        collectionId: "gid://shopify/Collection/443234746580",
                        collectionTitle: t("hamburgerMenu.waterPump"),
                        collectionImage: "",
                    },
                    children: [
                        {
                            title: t("hamburgerMenu.waterPumpOptions.option1"),
                            route: "collectionscreen",
                            params: {
                                collectionId: "gid://shopify/Collection/443266826452",
                                collectionTitle: t("hamburgerMenu.waterPumpOptions.option1"),
                                collectionImage: "",
                            },
                            children: [
                                {
                                    title: t(
                                        "hamburgerMenu.waterPumpOptions.option1Options.option1"
                                    ),
                                    route: "collectionscreen",
                                    params: {
                                        collectionId: "gid://shopify/Collection/443621048532",
                                        collectionTitle: t("hamburgerMenu.waterPumpOptions.option1Options.option1"),
                                        collectionImage: "",
                                    },
                                },
                                {
                                    title: t(
                                        "hamburgerMenu.waterPumpOptions.option1Options.option2"
                                    ),
                                    route: "collectionscreen",
                                    params: {
                                        collectionId: "gid://shopify/Collection/443621114068",
                                        collectionTitle: t("hamburgerMenu.waterPumpOptions.option1Options.option2"),
                                        collectionImage: "",
                                    },
                                },
                            ],
                        },
                        {
                            title: t("hamburgerMenu.waterPumpOptions.option2"),
                            route: "collectionscreen",
                            params: {
                                collectionId: "gid://shopify/Collection/443266859220",
                                collectionTitle: t("hamburgerMenu.waterPumpOptions.option2"),
                                collectionImage: "",
                            },
                            children: [
                                {
                                    title: t(
                                        "hamburgerMenu.waterPumpOptions.option2Options.option1"
                                    ),
                                    route: "collectionscreen",
                                    params: {
                                        collectionId: "gid://shopify/Collection/443621146836",
                                        collectionTitle: t("hamburgerMenu.waterPumpOptions.option2Options.option1"),
                                        collectionImage: "",
                                    },
                                },
                                {
                                    title: t(
                                        "hamburgerMenu.waterPumpOptions.option2Options.option2"
                                    ),
                                    route: "collectionscreen",
                                    params: {
                                        collectionId: "gid://shopify/Collection/443621277908",
                                        collectionTitle: t("hamburgerMenu.waterPumpOptions.option2Options.option2"),
                                        collectionImage: "",
                                    },
                                },
                                {
                                    title: t(
                                        "hamburgerMenu.waterPumpOptions.option2Options.option3"
                                    ),
                                    route: "collectionscreen",
                                    params: {
                                        collectionId: "gid://shopify/Collection/443621474516",
                                        collectionTitle: t("hamburgerMenu.waterPumpOptions.option2Options.option3"),
                                        collectionImage: "",
                                    },
                                },
                                {
                                    title: t(
                                        "hamburgerMenu.waterPumpOptions.option2Options.option4"
                                    ),
                                    route: "collectionscreen",
                                    params: {
                                        collectionId: "gid://shopify/Collection/443621638356",
                                        collectionTitle: t("hamburgerMenu.waterPumpOptions.option2Options.option4"),
                                        collectionImage: "",
                                    },
                                },
                            ],
                        },
                        {
                            title: t("hamburgerMenu.waterPumpOptions.option3"),
                            route: "collectionscreen",
                            params: {
                                collectionId: "gid://shopify/Collection/443266891988",
                                collectionTitle: t("hamburgerMenu.waterPumpOptions.option3"),
                                collectionImage: "",
                            },
                            children: [
                                {
                                    title: t(
                                        "hamburgerMenu.waterPumpOptions.option3Options.option1"
                                    ),
                                    route: "collectionscreen",
                                    params: {
                                        collectionId: "gid://shopify/Collection/443622129876",
                                        collectionTitle: t("hamburgerMenu.waterPumpOptions.option3Options.option1"),
                                        collectionImage: "",
                                    },
                                },
                                {
                                    title: t(
                                        "hamburgerMenu.waterPumpOptions.option3Options.option2"
                                    ),
                                    route: "collectionscreen",
                                    params: {
                                        collectionId: "gid://shopify/Collection/443622162644",
                                        collectionTitle: t("hamburgerMenu.waterPumpOptions.option3Options.option2"),
                                        collectionImage: "",
                                    },
                                },
                                {
                                    title: t(
                                        "hamburgerMenu.waterPumpOptions.option3Options.option3"
                                    ),
                                    route: "collectionscreen",
                                    params: {
                                        collectionId: "gid://shopify/Collection/443622195412",
                                        collectionTitle: t("hamburgerMenu.waterPumpOptions.option3Options.option3"),
                                        collectionImage: "",
                                    },
                                },
                                {
                                    title: t(
                                        "hamburgerMenu.waterPumpOptions.option3Options.option4"
                                    ),
                                    route: "collectionscreen",
                                    params: {
                                        collectionId: "gid://shopify/Collection/443622228180",
                                        collectionTitle: t("hamburgerMenu.waterPumpOptions.option3Options.option4"),
                                        collectionImage: "",
                                    },
                                },
                                {
                                    title: t(
                                        "hamburgerMenu.waterPumpOptions.option3Options.option5"
                                    ),
                                    route: "collectionscreen",
                                    params: {
                                        collectionId: "gid://shopify/Collection/443622359252",
                                        collectionTitle: t("hamburgerMenu.waterPumpOptions.option3Options.option5"),
                                        collectionImage: "",
                                    },
                                },
                                {
                                    title: t(
                                        "hamburgerMenu.waterPumpOptions.option3Options.option6"
                                    ),
                                    route: "collectionscreen",
                                    params: {
                                        collectionId: "gid://shopify/Collection/443622424788",
                                        collectionTitle: t("hamburgerMenu.waterPumpOptions.option3Options.option6"),
                                        collectionImage: "",
                                    },
                                },
                                {
                                    title: t(
                                        "hamburgerMenu.waterPumpOptions.option3Options.option7"
                                    ),
                                    route: "collectionscreen",
                                    params: {
                                        collectionId: "gid://shopify/Collection/443622457556",
                                        collectionTitle: t("hamburgerMenu.waterPumpOptions.option3Options.option7"),
                                        collectionImage: "",
                                    },
                                }
                            ],
                        },
                    ],
                },
                {
                    title: t("hamburgerMenu.solarPanel"),
                    route: "collectionscreen",
                    params: {
                        collectionId: "gid://shopify/Collection/444937961684",
                        collectionTitle: t("hamburgerMenu.solarPanel"),
                        collectionImage: "",
                    },
                    children: [
                        {
                            title: t("hamburgerMenu.solarPanelOptions.option1"),
                            route: "collectionscreen",
                            params: {
                                collectionId: "gid://shopify/Collection/445225140436",
                                collectionTitle: t("hamburgerMenu.solarPanelOptions.option1"),
                                collectionImage: "",
                            },
                        },
                        {
                            title: t("hamburgerMenu.solarPanelOptions.option2"),
                            route: "collectionscreen",
                            params: {
                                collectionId: "gid://shopify/Collection/445225238740",
                                collectionTitle: t("hamburgerMenu.solarPanelOptions.option2"),
                                collectionImage: "",
                            },
                        },
                        {
                            title: t("hamburgerMenu.solarPanelOptions.option3"),
                            route: "collectionscreen",
                            params: {
                                collectionId: "gid://shopify/Collection/445225304276",
                                collectionTitle: t("hamburgerMenu.solarPanelOptions.option3"),
                                collectionImage: "",
                            },
                        },
                        {
                            title: t("hamburgerMenu.solarPanelOptions.option4"),
                            route: "collectionscreen",
                            params: {
                                collectionId: "gid://shopify/Collection/445225337044",
                                collectionTitle: t("hamburgerMenu.solarPanelOptions.option4"),
                                collectionImage: "",
                            },
                        },
                        {
                            title: t("hamburgerMenu.solarPanelOptions.option5"),
                            route: "collectionscreen",
                            params: {
                                collectionId: "gid://shopify/Collection/445225402580",
                                collectionTitle: t("hamburgerMenu.solarPanelOptions.option5"),
                                collectionImage: "",
                            },
                        },
                    ],
                },
                {
                    title: t("hamburgerMenu.accessories"),
                    route: "collectionscreen",
                    params: {
                        collectionId: "gid://shopify/Collection/443234779348",
                        collectionTitle: t("hamburgerMenu.accessories"),
                        collectionImage: "",
                    },
                    children: [
                        {
                            title: t("hamburgerMenu.accessoriesOptions.option1"),
                            route: "collectionscreen",
                            params: {
                                collectionId: "gid://shopify/Collection/443620196564",
                                collectionTitle: t("hamburgerMenu.accessoriesOptions.option1"),
                                collectionImage: "",
                            },
                        },
                        {
                            title: t("hamburgerMenu.accessoriesOptions.option2"),
                            route: "collectionscreen",
                            params: {
                                collectionId: "gid://shopify/Collection/443620327636",
                                collectionTitle: t("hamburgerMenu.accessoriesOptions.option2"),
                                collectionImage: "",
                            },
                        },
                        {
                            title: t("hamburgerMenu.accessoriesOptions.option3"),
                            route: "collectionscreen",
                            params: {
                                collectionId: "gid://shopify/Collection/443620458708",
                                collectionTitle: t("hamburgerMenu.accessoriesOptions.option3"),
                                collectionImage: "",
                            },
                        },
                        {
                            title: t("hamburgerMenu.accessoriesOptions.option4"),
                            route: "collectionscreen",
                            params: {
                                collectionId: "gid://shopify/Collection/443620524244",
                                collectionTitle: t("hamburgerMenu.accessoriesOptions.option4"),
                                collectionImage: "",
                            },
                        },
                        {
                            title: t("hamburgerMenu.accessoriesOptions.option5"),
                            route: "collectionscreen",
                            params: {
                                collectionId: "gid://shopify/Collection/443620557012",
                                collectionTitle: t("hamburgerMenu.accessoriesOptions.option5"),
                                collectionImage: "",
                            },
                        },
                        {
                            title: t("hamburgerMenu.accessoriesOptions.option6"),
                            route: "collectionscreen",
                            params: {
                                collectionId: "gid://shopify/Collection/443620589780",
                                collectionTitle: t("hamburgerMenu.accessoriesOptions.option6"),
                                collectionImage: "",
                            },
                        },
                        {
                            title: t("hamburgerMenu.accessoriesOptions.option7"),
                            route: "collectionscreen",
                            params: {
                                collectionId: "gid://shopify/Collection/443620688084",
                                collectionTitle: t("hamburgerMenu.accessoriesOptions.option7"),
                                collectionImage: "",
                            },
                        },
                        {
                            title: t("hamburgerMenu.accessoriesOptions.option8"),
                            route: "collectionscreen",
                            params: {
                                collectionId: "gid://shopify/Collection/443620720852",
                                collectionTitle: t("hamburgerMenu.accessoriesOptions.option8"),
                                collectionImage: "",
                            },
                        },
                        {
                            title: t("hamburgerMenu.accessoriesOptions.option9"),
                            route: "collectionscreen",
                            params: {
                                collectionId: "gid://shopify/Collection/443620786388",
                                collectionTitle: t("hamburgerMenu.accessoriesOptions.option9"),
                                collectionImage: "",
                            },
                        },
                        {
                            title: t("hamburgerMenu.accessoriesOptions.option10"),
                            route: "collectionscreen",
                            params: {
                                collectionId: "gid://shopify/Collection/443620851924",
                                collectionTitle: t("hamburgerMenu.accessoriesOptions.option10"),
                                collectionImage: "",
                            },
                        },
                        {
                            title: t("hamburgerMenu.accessoriesOptions.option11"),
                            route: "collectionscreen",
                            params: {
                                collectionId: "gid://shopify/Collection/443620917460",
                                collectionTitle: t("hamburgerMenu.accessoriesOptions.option11"),
                                collectionImage: "",
                            },
                        },
                        {
                            title: t("hamburgerMenu.accessoriesOptions.option12"),
                            route: "collectionscreen",
                            params: {
                                collectionId: "gid://shopify/Collection/443620950228",
                                collectionTitle: t("hamburgerMenu.accessoriesOptions.option12"),
                                collectionImage: "",
                            },
                        },
                    ],
                },
            ],
        },
        {
            title: t("hamburgerMenu.bestSellers"),
            route: "collectionscreen",
            params: {
                collectionId: "gid://shopify/Collection/439668539604",
                collectionTitle: t("hamburgerMenu.bestSellers"),
                collectionImage: images.aboutUsBanner3,
                collectionSort: {
                    sortKey: 'BEST_SELLING',
                    reverse: false,
                }
            },
        },
        {
            title: t("hamburgerMenu.newArrivals"),
            route: "collectionscreen",
            params: {
                collectionId: "gid://shopify/Collection/439668572372",
                collectionTitle: t("hamburgerMenu.bestSellers"),
                collectionImage: images.aboutUsBanner1,
                collectionSort: {
                    sortKey: 'CREATED',
                    reverse: true,
                }
            },
        },
        { title: t("hamburgerMenu.bulkOrder"), route: "bulkorderform" },
        { title: t("hamburgerMenu.ourGallery"), route: "ourgallery" },
    ];
};

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
            image: images.banner2
        },
        {
            id: 3,
            label: t('banners.banner1.label'),
            headline1: t('banners.banner1.headline1'),
            headline2: t('banners.banner1.headline2'),
            buttonText: t('banners.banner1.buttonText'),
            buttonLink: "",
            image: images.banner3
        },
        {
            id: 4,
            label: t('banners.banner1.label'),
            headline1: t('banners.banner1.headline1'),
            headline2: t('banners.banner1.headline2'),
            buttonText: t('banners.banner1.buttonText'),
            buttonLink: "",
            image: images.banner4
        }
    ];
};

export const bannersNew = [
    {
        id: 1,
        image: images.banner1
    },
    {
        id: 2,
        image: images.banner2
    },
    {
        id: 3,
        image: images.banner3
    },
    {
        id: 4,
        image: images.banner4
    },
];

export const banners1 = [
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
        image: images.brand1,
        collectionId: "gid://shopify/Collection/444978364628",
        collectionTitle: "Kubota",
        collectionImage: ""
    },
    {
        id: "2",
        image: images.brand2,
        collectionId: "gid://shopify/Collection/444937601236",
        collectionTitle: "Yanmar",
        collectionImage: ""
    },
    {
        id: "3",
        image: images.brand3,
        collectionId: "gid://shopify/Collection/443622785236",
        collectionTitle: "Bluetti Portable Power Station",
        collectionImage: ""
    },
    {
        id: "4",
        image: images.brand4,
        collectionId: "gid://shopify/Collection/444978331860",
        collectionTitle: "DeWalt",
        collectionImage: ""
    },
    {
        id: "5",
        image: images.brand5,
        collectionId: "gid://shopify/Collection/444978266324",
        collectionTitle: "Jinko",
        collectionImage: ""
    },
    {
        id: "6",
        image: images.brand6,
        collectionId: "gid://shopify/Collection/444937666772",
        collectionTitle: "SAER Electropompe",
        collectionImage: ""
    },
    {
        id: "7",
        image: images.brand7,
        collectionId: "gid://shopify/Collection/444937568468",
        collectionTitle: "Perkins Generator",
        collectionImage: ""
    },
    {
        id: "8",
        image: images.brand8,
        collectionId: "gid://shopify/Collection/444937502932",
        collectionTitle: "Honda",
        collectionImage: ""
    }
];


export const useCardsData = () => {
    // const { t } = useTranslation();
    const { t } = i18next;

    return [
        // {
        //     id: "1",
        //     title: t('pointCard.card1.title'),
        //     subTitle: t('pointCard.card1.subTitle'),
        //     icon: icons.cardShipping
        // },
        {
            id: "1",
            title: t('pointCard.card2.title'),
            subTitle: t('pointCard.card2.subTitle'),
            icon: icons.cardContact
        },
        {
            id: "2",
            title: t('pointCard.card3.title'),
            subTitle: t('pointCard.card3.subTitle'),
            icon: icons.cardSecurity
        },
        {
            id: "3",
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
        subTitle: "Need to contact us ? Just send us an e-mail at sales@nbsgroups.com",
        icon: icons.cardEmail
    }
];

export const useOurProducts = () => {
    // const { t } = useTranslation();
    const { t } = i18next;

    return [
        {
            id: "1",
            title: t('collectionBanner.banner1'),
            image: images.ourProduct1,
            collectionId: "gid://shopify/Collection/443227111636"
        },
        {
            id: "2",
            title: t('collectionBanner.banner2'),
            image: images.ourProduct2,
            collectionId: "gid://shopify/Collection/439108534484"
        },
        {
            id: "3",
            title: t('collectionBanner.banner3'),
            image: images.ourProduct3,
            collectionId: "gid://shopify/Collection/439668572372"
        },
        {
            id: "4",
            title: t('collectionBanner.banner4'),
            image: images.ourProduct4,
            collectionId: "gid://shopify/Collection/439108534484"
        },
        {
            id: "5",
            title: t('collectionBanner.banner5'),
            image: images.ourProduct5,
            collectionId: "gid://shopify/Collection/443234484436"
        },
        {
            id: "6",
            title: t('collectionBanner.banner6'),
            image: images.ourProduct6,
            collectionId: "gid://shopify/Collection/444937568468"
        }
    ];
};

// export const ourProducts = [
//     {
//         id: "1",
//         title: "Samsun Solar",
//         image: images.ourProduct1,
//         collectionId: "gid://shopify/Collection/443227111636"
//     },
//     {
//         id: "2",
//         title: "NBS Solar",
//         image: images.ourProduct2,
//         collectionId: "gid://shopify/Collection/439108534484"
//     },
//     {
//         id: "3",
//         title: "New Arrivals",
//         image: images.ourProduct3,
//         collectionId: "gid://shopify/Collection/439668572372"
//     },
//     {
//         id: "4",
//         title: "NBS Solar",
//         image: images.ourProduct4,
//         collectionId: "gid://shopify/Collection/439108534484"
//     },
//     {
//         id: "5",
//         title: "Su-Mak Solar",
//         image: images.ourProduct5,
//         collectionId: "gid://shopify/Collection/443234484436"
//     },
//     {
//         id: "6",
//         title: "Perkins Generator",
//         image: images.ourProduct6,
//         collectionId: "gid://shopify/Collection/444937568468"
//     }
// ];

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