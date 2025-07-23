import NotFoundCard from '@/components/NotFoundCard';
import WishlistCard from '@/components/WishlistCard';
import { useAppSelector } from '@/hooks/useAppSelector';
import { NavigationProp } from '@react-navigation/native';
import { useNavigation } from 'expo-router';
import i18next from 'i18next';
import React, { useState } from 'react';
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ScrollView } from 'react-native-virtualized-view';
import HeaderWithSearch from '../components/HeaderWithSearch';
import { COLORS, icons } from '../constants';
import { useTheme } from '../theme/ThemeProvider';

// Define the type for the component props
interface MyWishlistProps {
  navigation: NavigationProp<any>;
}

const MyWishlist: React.FC<MyWishlistProps> = () => {
  const navigation = useNavigation<NavigationProp<any>>();
  const { dark, colors } = useTheme();
  const [selectedCategories, setSelectedCategories] = useState<string[]>(["0"]);
  const wishlistItems = useAppSelector(state => state.wishlist);
  // const { t } = useTranslation();
  const { t } = i18next;

  // Filter products based on selected categories
  // const filteredProducts = myWishlist.filter(product =>
  //   selectedCategories.includes("0") || selectedCategories.includes(product.categoryId)
  // );

  const filteredProducts = wishlistItems.wishlistItems;

  // Render category item
  const renderCategoryItem = ({ item }: { item: { id: string; name: string } }) => (
    <TouchableOpacity
      style={{
        backgroundColor: selectedCategories.includes(item.id) ? (dark ? COLORS.dark3 : COLORS.primary) : "transparent",
        padding: 10,
        marginVertical: 5,
        borderColor: dark ? COLORS.dark3 : COLORS.primary,
        borderWidth: 1.3,
        borderRadius: 24,
        marginRight: 12,
      }}
      onPress={() => toggleCategory(item.id)}
    >
      <Text style={{
        color: selectedCategories.includes(item.id) ? COLORS.white : (dark ? COLORS.white : COLORS.primary)
      }}>
        {item.name}
      </Text>
    </TouchableOpacity>
  );

  // Toggle category selection
  const toggleCategory = (categoryId: string) => {
    const updatedCategories = [...selectedCategories];
    const index = updatedCategories.indexOf(categoryId);

    if (index === -1) {
      updatedCategories.push(categoryId);
    } else {
      updatedCategories.splice(index, 1);
    }

    setSelectedCategories(updatedCategories);
  };

  return (
    <SafeAreaView style={[styles.area, { backgroundColor: colors.background }]}>
      <View style={[styles.container, { backgroundColor: colors.background }]}>
        <HeaderWithSearch
          title={t('wishlist.title')}
          icon={icons.search}
          onPress={() => navigation.navigate("search")}
        />
        <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
          {/* <FlatList
            data={categories}
            keyExtractor={item => item.id}
            showsHorizontalScrollIndicator={false}
            horizontal
            renderItem={renderCategoryItem}
          /> */}
          <View style={{
            backgroundColor: dark ? COLORS.dark1 : COLORS.white,
            marginVertical: 16
          }}>
            {filteredProducts?.length > 0 ? (
              <FlatList
                data={filteredProducts}
                keyExtractor={item => item.merchandiseId}
                numColumns={2}
                columnWrapperStyle={{ gap: 16 }}
                showsVerticalScrollIndicator={false}
                renderItem={({ item }) => (
                  <WishlistCard
                    name={item.title}
                    image={item.image}
                    price={item.price}
                    oldPrice={item.oldPrice}
                    merchandiseId={item.merchandiseId}
                    productType={item.productType ? item.productType : ''}
                    onPress={() => navigation.navigate("productdetails", {
                      id: item.merchandiseId,
                    })}
                  />
                )}
              />
            ) : (
              <NotFoundCard />
            )}

          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
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
});

export default MyWishlist;