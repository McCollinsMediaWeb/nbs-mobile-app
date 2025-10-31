import { useAppSelector } from '@/hooks/useAppSelector';
import { normalizeFont } from '@/utils/normalizeFont';
import React, { useRef, useState } from 'react';
import { Dimensions, Image, ImageSourcePropType, NativeScrollEvent, NativeSyntheticEvent, ScrollView, StyleSheet, Text, View } from 'react-native';
import { COLORS, SIZES } from '../constants';
import { useTheme } from '../theme/ThemeProvider';

interface CardSliderProps {
    cards: {
        id: string
        title: string
        subTitle: string
        icon: ImageSourcePropType
    }[];
}

const CardSlider: React.FC<CardSliderProps> = ({ cards }) => {
    const [currentIndex, setCurrentIndex] = useState<number>(0);
    const scrollViewRef = useRef<ScrollView | null>(null);
    const appLanguage = useAppSelector(state => state.generalSettings.language);
    const { dark } = useTheme();

    // useEffect(() => {
    //     const interval = setInterval(() => {
    //         setCurrentIndex((prevIndex) => (prevIndex + 1) % cards.length);
    //         scrollViewRef.current?.scrollTo({
    //             animated: true,
    //             x: Dimensions.get('window').width * ((currentIndex + 1) % cards.length),
    //             y: 0,
    //         });
    //     }, 3000); // Change slide every 3 seconds

    //     return () => clearInterval(interval);
    // }, [currentIndex, cards.length]);

    const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
        const contentOffsetX = event.nativeEvent.contentOffset.x;
        const newIndex = Math.round(contentOffsetX / Dimensions.get('window').width);
        setCurrentIndex(newIndex);
    };

    const handlePaginationPress = (index: number) => {
        setCurrentIndex(index);
        scrollViewRef.current?.scrollTo({
            animated: true,
            x: Dimensions.get('window').width * index,
            y: 0,
        });
    };

    return (
        <View style={[styles.container, { backgroundColor: 'rgb(177, 18, 22)' }]}>
            <ScrollView
                ref={scrollViewRef}
                horizontal
                pagingEnabled
                showsHorizontalScrollIndicator={false}
                onScroll={handleScroll}
                scrollEventThrottle={16}
            >
                {cards.map((item, index) => (
                    <View key={index} style={{ width: SIZES.width, height: 200, alignItems: 'center', justifyContent: 'center' }}>
                        <Image source={item.icon} resizeMode="contain" style={{ width: 30, height: 30 }} />
                        <Text style={[styles.subTitle, { color: COLORS.white, fontSize: normalizeFont(16) }]}>{item.title}</Text>
                        <Text style={[styles.name, { color: COLORS.white }]}>{item.subTitle}</Text>
                    </View>
                ))}
            </ScrollView>
            <View style={[
                styles.squareDotContainer,
                appLanguage === 'ar' && { transform: [{ rotate: '180deg' }] }
            ]}>
                {cards.map((_, index) => (
                    <View
                        key={index}
                        style={[
                            styles.squareDot,
                            { opacity: index === currentIndex ? 1 : 0.3 },
                        ]}
                    />
                ))}
            </View>
        </View >
    );
};

const styles = StyleSheet.create({
    container: {
    },
    image: {
        width: SIZES.width,
        height: SIZES.width * 0.9,
        backgroundColor: COLORS.silver,
    },
    pagination: {
        marginTop: 25,
        flexDirection: 'row',
        position: 'absolute',
        bottom: 20,
        alignSelf: 'center',
    },
    paginationDot: {
        width: 8,
        height: 8,
        borderRadius: 4,
        marginHorizontal: 5,
    },
    subTitle: {
        color: '#fff',
        fontSize: normalizeFont(15),
        letterSpacing: 1,
        fontWeight: '800',
        marginBottom: 8,
        textTransform: 'uppercase',
        textAlign: 'center',
        marginTop: 20
    },
    name: {
        fontSize: normalizeFont(17),
        color: COLORS.greyscale900,
        marginVertical: 4,
        textAlign: "center",
        maxWidth: 350,
    },

    squareDotContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20,
    },
    squareDot: {
        width: SIZES.width * 0.02,
        height: SIZES.width * 0.02,
        backgroundColor: 'rgb(255,255,255)',
        opacity: 0.3,
        marginHorizontal: 5,
    },
    activeSquareDot: {
        opacity: 1,
    },
});

export default CardSlider;