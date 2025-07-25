import NotFoundCard from '@/components/NotFoundCard';
import { useAppDispatch } from '@/hooks/useAppDispatch';
import { useAppSelector } from '@/hooks/useAppSelector';
import { fetchSearchSuggestions, searchProducts } from '@/utils/actions/searchActions';
import { normalizeFont } from '@/utils/normalizeFont';
import { Feather, FontAwesome } from "@expo/vector-icons";
import MultiSlider from '@ptomasroos/react-native-multi-slider';
import { NavigationProp } from '@react-navigation/native';
import { useNavigation } from 'expo-router';
import React, { useEffect, useRef, useState } from 'react';
import { FlatList, Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import RBSheet from "react-native-raw-bottom-sheet";
import { SafeAreaView } from 'react-native-safe-area-context';
import { ScrollView } from 'react-native-virtualized-view';
import Button from '../components/Button';
import { COLORS, SIZES, icons } from '../constants';
import { categories, sorts } from '../data';
import { useTheme } from '../theme/ThemeProvider';

interface SliderHandleProps {
  enabled: boolean;
  markerStyle: object;
}

const CustomSliderHandle: React.FC<SliderHandleProps> = ({ enabled, markerStyle }) => {
  return (
    <View
      style={[
        markerStyle,
        {
          backgroundColor: enabled ? COLORS.primary : 'lightgray',
          borderColor: 'white',
          borderWidth: 2,
          borderRadius: 10,
          width: 20,
          height: 20,
        },
      ]}
    />
  );
};


const Search = () => {
  const navigation = useNavigation<NavigationProp<any>>();
  const refRBSheet = useRef<any>(null);
  const { dark, colors } = useTheme();
  const dispatch = useAppDispatch();
  const collections = useAppSelector(state => state.collections);
  const suggestions = useAppSelector((state) => state.search.suggestions);
  const [selectedCategories, setSelectedCategories] = useState(["1"]);
  const [selectedSorts, setSelectedSorts] = useState(["1"]);
  const [selectedRating, setSelectedRating] = useState(["1"]);
  const [priceRange, setPriceRange] = useState([0, 100]); // Initial price range
  const [searchTerm, setSearchTerm] = useState("");

  const handleSliderChange = (values: number[]) => {
    setPriceRange(values);
  };

  const targetCollection = collections.data.find(
    (collection) => collection.id === "gid://shopify/Collection/439108698324"
  );

  // const filteredProducts = targetCollection ? targetCollection.products : [];

  /**
  * Render header
  */
  const renderHeader = () => {
    return (
      <View style={styles.headerContainer}>
        <View style={styles.headerLeft}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}>
            <Image
              source={icons.back}
              resizeMode='contain'
              style={[styles.backIcon, {
                tintColor: dark ? COLORS.white : COLORS.greyscale900
              }]}
            />
          </TouchableOpacity>
          <Text style={[styles.headerTitle, {
            color: dark ? COLORS.white : COLORS.greyscale900
          }]}>
            Search
          </Text>
        </View>
        {/* <TouchableOpacity>
          <Image
            source={icons.moreCircle}
            resizeMode='contain'
            style={[styles.moreIcon, {
              tintColor: dark ? COLORS.white : COLORS.greyscale900
            }]}
          />
        </TouchableOpacity> */}
      </View>
    )
  }
  /**
   * Render content
  */
  const renderContent = () => {
    const [selectedTab, setSelectedTab] = useState('row');
    const [searchQuery, setSearchQuery] = useState('');
    // const [filteredProducts, setFilteredProducts] = useState(baseProducts);
    const [filteredProducts, setFilteredProducts] = useState(targetCollection ? targetCollection.products : [])
    const [resultsCount, setResultsCount] = useState(0);

    useEffect(() => {
      handleSearch();
    }, [searchQuery, selectedTab]);

    const handleSearch = () => {
      // const allProducts = baseProducts.filter((product) =>
      //   product.name.toLowerCase().includes(searchQuery.toLowerCase())
      // );

      const allProducts = targetCollection ? targetCollection.products : [];
      setFilteredProducts(allProducts);
      setResultsCount(allProducts.length);
    };

    useEffect(() => {
      if (searchTerm) {
        dispatch(searchProducts(searchTerm));
        dispatch(fetchSearchSuggestions(searchTerm));
      }
    }, [searchTerm, dispatch]);

    const searchHandle = () => {
      navigation.navigate("searchproducts");
    };

    console.log("search term", searchTerm);

    return (
      <View>
        {/* Search bar */}
        {/* <View
          style={[styles.searchBarContainer, {
            backgroundColor: dark ? COLORS.dark2 : COLORS.silver
          }]}>
          <TouchableOpacity
            onPress={handleSearch}>
            <Image
              source={icons.search2}
              resizeMode='contain'
              style={styles.searchIcon}
            />
          </TouchableOpacity>
          <TextInput
            placeholder='Search'
            placeholderTextColor={COLORS.black}
            style={[styles.searchInput, {
              color: dark ? COLORS.white : COLORS.greyscale900
            }]}
            value={searchTerm}
            onChangeText={(text) => setSearchTerm(text)}
          />
          <TouchableOpacity
            onPress={() => refRBSheet.current.open()}>
            <Image
              source={icons.filter}
              resizeMode='contain'
              style={[styles.filterIcon, {
                tintColor: dark ? COLORS.white : COLORS.primary
              }]}
            />
          </TouchableOpacity>
        </View> */}

        <TextInput
          placeholder='Search'
          // placeholderTextColor={COLORS.black}
          style={[styles.searchInput2, {
            color: dark ? COLORS.white : COLORS.greyscale900
          }]}
          value={searchTerm}
          onChangeText={(text) => setSearchTerm(text)}
        />

        <ScrollView
          contentContainerStyle={{
            paddingVertical: 10,
          }}
        >
          {suggestions.length > 0 ? (
            suggestions.map((data, index) => (
              <TouchableOpacity
                onPress={() => {
                  if (data.title) {
                    dispatch(searchProducts(data.title)).then(() => {
                      searchHandle();
                    });
                  }
                }}
                key={index}
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  paddingHorizontal: 15,
                  paddingVertical: 12,
                }}
              >
                <Image
                  source={icons.search2}
                  resizeMode='contain'
                  style={[styles.searchIcon, { marginRight: 10 }]}
                />
                <Text
                  numberOfLines={2}
                  style={{
                    flex: 1,
                  }}
                >
                  {data.title}
                </Text>
                <Feather
                  style={{ opacity: 0.6 }}
                  color={colors.text}
                  size={20}
                  name="arrow-up-left"
                />
              </TouchableOpacity>
            ))
          ) : (
            <NotFoundCard />
          )}
        </ScrollView>
        {/* <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.reusltTabContainer}>
            {
              searchQuery && searchQuery.length > 0 ? (
                <>
                  <Text style={[styles.tabText, {
                    color: dark ? COLORS.secondaryWhite : COLORS.black
                  }]}>Result for "{searchQuery}"</Text>
                </>
              ) : (
                <Text style={[styles.tabText, {
                  color: dark ? COLORS.secondaryWhite : COLORS.black
                }]}>Products</Text>
              )
            }
            <View style={styles.resultContainer}>
              <Text style={[styles.tabText, {
                color: dark ? COLORS.secondaryWhite : COLORS.black
              }]}>{" "}{resultsCount} founds</Text>
            </View>
          </View>

          <View>
            <View style={{
              backgroundColor: dark ? COLORS.dark1 : COLORS.white,
              marginVertical: 16
            }}>
              {resultsCount && resultsCount > 0 ? (
                <>
                  <FlatList
                    data={filteredProducts}
                    keyExtractor={(item) => item.id}
                    numColumns={2}
                    columnWrapperStyle={{ gap: 16 }}
                    renderItem={({ item }) => {
                      return (
                        <ProductCard
                          merchandiseId={item.id}
                          name={item.title}
                          image={item?.image}
                          price={item.price}
                          oldPrice={item.oldPrice}
                          onPress={() => navigation.navigate("productdetails", {
                            id: item.id,
                          })}
                        />
                      )
                    }}
                  />
                </>
              ) : (
                <NotFoundCard />
              )}
            </View>
          </View>
        </ScrollView> */}
      </View>
    )
  }

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

  // toggle rating selection
  const toggleRating = (ratingId: string) => {
    const updatedRatings = [...selectedRating];
    const index = updatedRatings.indexOf(ratingId);

    if (index === -1) {
      updatedRatings.push(ratingId);
    } else {
      updatedRatings.splice(index, 1);
    }

    setSelectedRating(updatedRatings);
  };


  // Toggle sort selection
  const toggleSort = (sortId: string) => {
    const updatedSorts = [...selectedSorts];
    const index = updatedSorts.indexOf(sortId);

    if (index === -1) {
      updatedSorts.push(sortId);
    } else {
      updatedSorts.splice(index, 1);
    }

    setSelectedSorts(updatedSorts);
  };

  // Category item
  const renderCategoryItem = ({ item }: { item: { id: string; name: string } }) => (
    <TouchableOpacity
      style={{
        backgroundColor: selectedCategories.includes(item.id) ? COLORS.primary : "transparent",
        padding: 10,
        marginVertical: 5,
        borderColor: COLORS.primary,
        borderWidth: 1.3,
        borderRadius: 24,
        marginRight: 12,
      }}
      onPress={() => toggleCategory(item.id)}>

      <Text style={{
        color: selectedCategories.includes(item.id) ? COLORS.white : COLORS.primary
      }}>{item.name}</Text>
    </TouchableOpacity>
  );

  // Sort item
  const renderSortItem = ({ item }: { item: { id: string; name: string } }) => (
    <TouchableOpacity
      style={{
        backgroundColor: selectedSorts.includes(item.id) ? COLORS.primary : "transparent",
        padding: 10,
        marginVertical: 5,
        borderColor: COLORS.primary,
        borderWidth: 1.3,
        borderRadius: 24,
        marginRight: 12,
      }}
      onPress={() => toggleSort(item.id)}>

      <Text style={{
        color: selectedSorts.includes(item.id) ? COLORS.white : COLORS.primary
      }}>{item.name}</Text>
    </TouchableOpacity>
  );

  const renderRatingItem = ({ item }: { item: { id: string; title: string } }) => (
    <TouchableOpacity
      style={{
        backgroundColor: selectedRating.includes(item.id) ? COLORS.primary : "transparent",
        paddingHorizontal: 16,
        paddingVertical: 6,
        marginVertical: 5,
        borderColor: COLORS.primary,
        borderWidth: 1.3,
        borderRadius: 24,
        marginRight: 12,
        flexDirection: "row",
        alignItems: "center",
      }}
      onPress={() => toggleRating(item.id)}>
      <View style={{ marginRight: 6 }}>
        <FontAwesome name="star" size={14} color={selectedRating.includes(item.id) ? COLORS.white : COLORS.primary} />
      </View>
      <Text style={{
        color: selectedRating.includes(item.id) ? COLORS.white : COLORS.primary
      }}>{item.title}</Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={[styles.area, { backgroundColor: colors.background }]}>
      <View style={[styles.container, { backgroundColor: colors.background }]}>
        {renderHeader()}
        <View style={{ paddingBottom: 120 }}>
          {renderContent()}
        </View>
        <RBSheet
          ref={refRBSheet}
          closeOnPressMask={true}
          height={580}
          customStyles={{
            wrapper: {
              backgroundColor: "rgba(0,0,0,0.5)",
            },
            draggableIcon: {
              backgroundColor: dark ? COLORS.dark3 : "#000",
            },
            container: {
              borderTopRightRadius: 32,
              borderTopLeftRadius: 32,
              height: 580,
              backgroundColor: dark ? COLORS.dark2 : COLORS.white,
              alignItems: "center",
            }
          }}>
          <Text style={[styles.bottomTitle, {
            color: dark ? COLORS.white : COLORS.greyscale900
          }]}>Filter</Text>
          <View style={styles.separateLine} />
          <View style={{ width: SIZES.width - 32 }}>
            <Text style={[styles.sheetTitle, {
              color: dark ? COLORS.white : COLORS.greyscale900
            }]}>Category</Text>
            <FlatList
              data={categories}
              keyExtractor={item => item.id}
              showsHorizontalScrollIndicator={false}
              horizontal
              renderItem={renderCategoryItem}
            />
            <Text style={[styles.sheetTitle, {
              color: dark ? COLORS.white : COLORS.greyscale900
            }]}>Filter</Text>
            <MultiSlider
              values={priceRange}
              sliderLength={SIZES.width - 32}
              onValuesChange={handleSliderChange}
              min={0}
              max={100}
              step={1}
              allowOverlap={false}
              snapped
              minMarkerOverlapDistance={40}
              customMarker={CustomSliderHandle}
              selectedStyle={{ backgroundColor: COLORS.primary }}
              unselectedStyle={{ backgroundColor: 'lightgray' }}
              containerStyle={{ height: 40 }}
              trackStyle={{ height: 3 }}
            />
            <Text style={[styles.sheetTitle, {
              color: dark ? COLORS.white : COLORS.greyscale900
            }]}>Sort by</Text>
            <FlatList
              data={sorts}
              keyExtractor={item => item.id}
              showsHorizontalScrollIndicator={false}
              horizontal
              renderItem={renderSortItem}
            />
            <Text style={[styles.sheetTitle, {
              color: dark ? COLORS.white : COLORS.greyscale900
            }]}>Rating</Text>
            {/* <FlatList
              data={ratings}
              keyExtractor={item => item.id}
              showsHorizontalScrollIndicator={false}
              horizontal
              renderItem={renderRatingItem}
            /> */}
          </View>

          <View style={styles.separateLine} />

          <View style={styles.bottomContainer}>
            <Button
              title="Reset"
              style={{
                width: (SIZES.width - 32) / 2 - 8,
                backgroundColor: dark ? COLORS.dark3 : COLORS.tansparentPrimary,
                borderRadius: 32,
                borderColor: dark ? COLORS.dark3 : COLORS.tansparentPrimary
              }}
              textColor={dark ? COLORS.white : COLORS.primary}
              onPress={() => refRBSheet.current.close()}
            />
            <Button
              title="Filter"
              filled
              style={styles.logoutButton}
              onPress={() => refRBSheet.current.close()}
            />
          </View>
        </RBSheet>
      </View>
    </SafeAreaView>
  )
};

const styles = StyleSheet.create({
  area: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
    padding: 16
  },
  headerContainer: {
    flexDirection: "row",
    width: SIZES.width - 32,
    justifyContent: "space-between",
    marginBottom: 16
  },
  headerLeft: {
    flexDirection: "row",
    alignItems: "center"
  },
  backIcon: {
    height: 24,
    width: 24,
    tintColor: COLORS.black
  },
  headerTitle: {
    fontSize: normalizeFont(20),
    fontFamily: 'bold',
    color: COLORS.black,
    marginLeft: 16
  },
  moreIcon: {
    width: 24,
    height: 24,
    tintColor: COLORS.black
  },
  searchBarContainer: {
    width: SIZES.width - 32,
    backgroundColor: COLORS.secondaryWhite,
    padding: 16,
    borderRadius: 12,
    height: 52,
    marginBottom: 16,
    flexDirection: "row",
    alignItems: "center"
  },
  searchIcon: {
    height: 24,
    width: 24,
    tintColor: COLORS.gray
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    fontFamily: "regular",
    marginHorizontal: 8
  },
  searchInput2: {
    // flex: 1,
    fontSize: 16,
    fontFamily: "regular",
    padding: 16,
    borderRadius: 12,
    backgroundColor: COLORS.secondaryWhite,
  },
  filterIcon: {
    width: 24,
    height: 24,
    tintColor: COLORS.primary
  },
  tabContainer: {
    flexDirection: "row",
    alignItems: "center",
    width: SIZES.width - 32,
    justifyContent: "space-between"
  },
  tabBtn: {
    width: (SIZES.width - 32) / 2 - 6,
    height: 42,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1.4,
    borderColor: COLORS.primary,
    borderRadius: 32
  },
  selectedTab: {
    width: (SIZES.width - 32) / 2 - 6,
    height: 42,
    backgroundColor: COLORS.primary,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1.4,
    borderColor: COLORS.primary,
    borderRadius: 32
  },
  tabBtnText: {
    fontSize: 16,
    fontFamily: "semiBold",
    color: COLORS.primary,
    textAlign: "center"
  },
  selectedTabText: {
    fontSize: 16,
    fontFamily: "semiBold",
    color: COLORS.white,
    textAlign: "center"
  },
  resultContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: SIZES.width - 32,
    marginVertical: 16,
  },
  subtitle: {
    fontSize: 18,
    fontFamily: "bold",
    color: COLORS.black,
  },
  subResult: {
    fontSize: 14,
    fontFamily: "semiBold",
    color: COLORS.primary
  },
  resultLeftView: {
    flexDirection: "row"
  },
  bottomContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginVertical: 12,
    paddingHorizontal: 16,
    width: SIZES.width
  },
  cancelButton: {
    width: (SIZES.width - 32) / 2 - 8,
    backgroundColor: COLORS.tansparentPrimary,
    borderRadius: 32
  },
  logoutButton: {
    width: (SIZES.width - 32) / 2 - 8,
    backgroundColor: COLORS.primary,
    borderRadius: 32
  },
  bottomTitle: {
    fontSize: 24,
    fontFamily: "semiBold",
    color: COLORS.black,
    textAlign: "center",
    marginTop: 12
  },
  separateLine: {
    height: .4,
    width: SIZES.width - 32,
    backgroundColor: COLORS.greyscale300,
    marginVertical: 12
  },
  sheetTitle: {
    fontSize: 18,
    fontFamily: "semiBold",
    color: COLORS.black,
    marginVertical: 12
  },
  reusltTabContainer: {
    flexDirection: "row",
    alignItems: "center",
    width: SIZES.width - 32,
    justifyContent: "space-between"
  },
  viewDashboard: {
    flexDirection: "row",
    alignItems: "center",
    width: 36,
    justifyContent: "space-between"
  },
  dashboardIcon: {
    width: 16,
    height: 16,
    tintColor: COLORS.primary
  },
  tabText: {
    fontSize: 20,
    fontFamily: "semiBold",
    color: COLORS.black
  }
})

export default Search