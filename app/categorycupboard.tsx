import { NavigationProp } from '@react-navigation/native';
import { useNavigation } from 'expo-router';
import React, { useState } from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ScrollView } from 'react-native-virtualized-view';
import HeaderWithSearch from '../components/HeaderWithSearch';
import { COLORS, icons } from '../constants';
import { useTheme } from '../theme/ThemeProvider';

const CategoryCupboard = () => {
    const navigation = useNavigation<NavigationProp<any>>();
    const { dark, colors } = useTheme()
    const [loading, setLoading] = useState(false);

    return (
        <SafeAreaView style={[styles.area, { backgroundColor: colors.background }]}>
            <View style={[styles.container, { backgroundColor: colors.background }]}>
                <HeaderWithSearch
                    title="Cupboard"
                    icon={icons.search}
                    onPress={() => navigation.navigate("search")}
                />
                <ScrollView
                    style={styles.scrollView}
                    showsVerticalScrollIndicator={false}>
                    <View style={{
                        backgroundColor: dark ? COLORS.dark1 : COLORS.white,
                        marginVertical: 16
                    }}>
                        {/* <FlatList
                            data={products.cupboards}
                            keyExtractor={item => item.id}
                            numColumns={2}
                            columnWrapperStyle={{ gap: 16 }}
                            showsVerticalScrollIndicator={false}
                            renderItem={({ item }) => {
                                return (
                                    <ProductCard
                                        name={item.name}
                                        image={item.image}
                                        numSolds={item.numSolds}
                                        price={item.price}
                                        rating={item.rating}
                                        onPress={() => navigation.navigate(item.navigate)}
                                    />
                                )
                            }}
                        /> */}
                    </View>
                </ScrollView>
                {loading && (
                    <ActivityIndicator
                        style={{
                            position: "absolute",
                            top: "50%",
                            left: "50%",
                            right: "50%",
                            bottom: "50%",
                            justifyContent: "center",
                            alignItems: "center",
                            zIndex: 999,
                            width: 0,
                            height: 0,
                            backgroundColor: "black", // Ensure the background is transparent
                        }}
                        size="large"
                        color={COLORS.black}
                    />
                )}
            </View>
        </SafeAreaView>
    )
};

const styles = StyleSheet.create({
    area: {
        flex: 1,
        backgroundColor: COLORS.white
    },
    container: {
        flex: 1,
        backgroundColor: COLORS.white,
        padding: 16
    },
    scrollView: {
        marginVertical: 2
    }
})

export default CategoryCupboard