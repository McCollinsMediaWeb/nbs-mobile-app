import NotFoundCard from '@/components/NotFoundCard';
import UserAddressItem from '@/components/UserAddressItem';
import { useAppSelector } from '@/hooks/useAppSelector';
import { NavigationProp } from '@react-navigation/native';
import { useNavigation } from 'expo-router';
import React from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ScrollView } from 'react-native-virtualized-view';
import ButtonFilled from '../components/ButtonFilled';
import Header from '../components/Header';
import { COLORS, SIZES } from '../constants';
import { useTheme } from '../theme/ThemeProvider';

type Nav = {
    navigate: (value: string) => void
};

// User address location
const Address = () => {
    const navigation = useNavigation<NavigationProp<any>>();
    const { navigate } = useNavigation<Nav>();
    const { colors } = useTheme();
    const user = useAppSelector((state) => state.user);

    const addresses = user?.customer?.addresses?.edges || [];

    console.log('adress', addresses)

    return (
        <SafeAreaView style={[styles.area, { backgroundColor: colors.background }]}>
            <View style={[styles.container, { backgroundColor: colors.background }]}>
                <Header title="Address" />
                <ScrollView
                    contentContainerStyle={{ marginVertical: 12 }}
                    showsVerticalScrollIndicator={false}>
                    {addresses.length > 0 ? (
                        <FlatList
                            data={addresses}
                            keyExtractor={item => item.node.id}
                            renderItem={({ item }) => (
                                <UserAddressItem
                                    name={`${item.node.firstName} ${item.node.lastName}`}
                                    address={`${item.node.city}, ${item.node.province}`}
                                    onPress={() =>
                                        navigation.navigate("updateaddress", { address: item.node })
                                    }

                                />
                            )}
                        />
                    ) : (
                        <NotFoundCard />
                    )}

                </ScrollView>
            </View>
            <View style={styles.btnContainer}>
                <ButtonFilled
                    title="Add New Address"
                    onPress={() => navigate("addnewaddress")}
                    style={styles.btn}
                />
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
    btnContainer: {
        alignItems: "center"
    },
    btn: {
        width: SIZES.width - 32,
        paddingHorizontal: 16,
    }
})

export default Address