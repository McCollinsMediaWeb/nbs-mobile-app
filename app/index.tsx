import { useAppDispatch } from '@/hooks/useAppDispatch';
import { useAppSelector } from '@/hooks/useAppSelector';
import { fetchCollections } from '@/utils/actions/collectionActions';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from 'expo-router';
import React, { useEffect } from 'react';
import { ImageBackground, StyleSheet, Text } from 'react-native';
import { COLORS, images } from '../constants';

type Nav = {
    navigate: (value: string) => void
}

const Onboarding1 = () => {
    const { navigate } = useNavigation<Nav>();
    const dispatch = useAppDispatch();
    const user = useAppSelector(state => state.user);
    const collections = useAppSelector((state) => state.collections.data);
    const [hydrated, setHydrated] = React.useState(false);

    useEffect(() => {
        // Simulate waiting for the store to hydrate
        setHydrated(true);
    }, []);

    useEffect(() => {
        if (!hydrated) return; // Wait for hydration

        if (user?.accessToken) {
            navigate('(tabs)');
        } else {
            const timeout = setTimeout(() => navigate('onboarding'), 2000);
            return () => clearTimeout(timeout);
        }
    }, [hydrated, user?.accessToken, navigate]);

    // Add useEffect
    // useEffect(() => {
    //     const timeout = setTimeout(() => {
    //         navigate('onboarding');
    //     }, 2000);

    //     return () => clearTimeout(timeout);
    // }, []); // run only once after component mounts

    useEffect(() => {
        const collectionIds = [
            'gid://shopify/Collection/439108698324',
            'gid://shopify/Collection/439109091540',
            'gid://shopify/Collection/439668539604',
        ];
        dispatch(fetchCollections(collectionIds));
    }, [dispatch]);

    // Debug log (optional)
    useEffect(() => {
    }, [collections]);

    if (user?.accessToken) return null;


    return (
        <ImageBackground
            source={images.backgroundAvatar3}
            style={styles.area}>
            <LinearGradient
                // Background linear gradient
                colors={['transparent', 'rgba(0,0,0,0.8)']}
                style={styles.background}>
                <Text style={styles.greetingText}>Welcome to 👋</Text>
                <Text style={styles.logoName}>NBS</Text>
                <Text style={styles.subtitle}>Powering the future with reliable and renewable energy solutions for everyday needs!</Text>
            </LinearGradient>
        </ImageBackground>
    )
};

const styles = StyleSheet.create({
    area: {
        flex: 1
    },
    background: {
        position: 'absolute',
        bottom: 0,
        width: '100%',
        height: 270,
        paddingHorizontal: 16
    },
    greetingText: {
        fontSize: 40,
        color: COLORS.white,
        fontFamily: 'bold',
        marginVertical: 12
    },
    logoName: {
        fontSize: 76,
        color: COLORS.white,
        fontFamily: 'extraBold',
    },
    subtitle: {
        fontSize: 16,
        color: COLORS.white,
        marginVertical: 12,
        fontFamily: "semiBold",
    }
})

export default Onboarding1;