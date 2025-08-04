import NotFoundCard from '@/components/NotFoundCard';
import { useAppDispatch } from '@/hooks/useAppDispatch';
import { addProductToCart } from '@/utils/actions/cartActions';
import { addOrderUrl } from '@/utils/actions/orderActions';
import { NavigationProp } from '@react-navigation/native';
import { useNavigation } from 'expo-router';
import i18next from 'i18next';
import React, { useRef, useState } from 'react';
import { Alert, FlatList, Image, RefreshControl, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import RBSheet from "react-native-raw-bottom-sheet";
import Button from '../components/Button';
import ButtonFilled from '../components/ButtonFilled';
import { COLORS, SIZES } from '../constants';
import { useTheme } from '../theme/ThemeProvider';

interface CancelledOrdersProps {
  orders: any[];
  refreshing: boolean;
  onRefresh: () => void;
}

const OngoingOrders = ({ orders, refreshing, onRefresh }: CancelledOrdersProps) => {
  // const [orders, setOrders] = useState(ongoingOrders);
  const refRBSheet = useRef<any>(null);
  const { dark } = useTheme();
  const navigation = useNavigation<NavigationProp<any>>();
  const [selectedOrder, setSelectedOrder] = useState(null);
  const dispatch = useAppDispatch();
  // const { t } = useTranslation();
  const { t } = i18next;

  const handleOrderAgain = (order: any) => {

    if (!order?.lineItems?.edges?.length) {
      alert("No items found in this order.");
      return;
    }

    const productsToAdd = order.lineItems.edges
      .filter((edge: any) => edge?.node?.variant && edge.node.variant.product) // ✅ filter properly
      .map((edge: any) => {
        const variant = edge.node.variant;
        const product = variant.product;

        return {
          merchandiseId: variant.id,
          id: product.id,
          quantity: edge.node.quantity,
          image: variant.image?.src || "", // fallback to empty string if null
          // price: Number(edge.node.discountedTotalPrice?.amount || 0),
          price: Number(variant.price.amount || 0),
          // oldPrice: Number(edge.node.originalTotalPrice?.amount || 0),
          oldPrice: Number(variant.compareAtPrice.amount || 0),
          title: edge.node.title || "Unknown Product",
          productType: product.productType || "General",
        };
      });

    if (!productsToAdd.length) {
      alert("No valid products to add to cart.");
      return;
    }

    productsToAdd.forEach((product: any) => {
      dispatch(addProductToCart(product));
    });


    Alert.alert("Added Items to Cart");
    navigation.navigate("cart");
  };


  return (
    <View style={[styles.container, {
      backgroundColor: dark ? COLORS.dark1 : COLORS.white
    }]}>
      {orders.length > 0 ? (
        <FlatList
          data={orders}
          keyExtractor={item => item.id}
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              tintColor={dark ? COLORS.white : COLORS.primary}
            />
          }
          renderItem={({ item }) => (
            <TouchableOpacity style={[styles.cardContainer, {
              backgroundColor: dark ? COLORS.dark2 : COLORS.white,
            }]}>
              <TouchableOpacity
                onPress={() => {
                  dispatch(addOrderUrl(item.statusUrl))
                }}
                style={styles.detailsContainer}>
                <View>
                  <View style={[styles.productImageContainer, {
                    backgroundColor: dark ? COLORS.dark3 : COLORS.silver
                  }]}>
                    <Image
                      // source={item.image}
                      source={{ uri: item?.lineItems?.edges[0]?.node?.variant?.image?.src }}
                      resizeMode='cover'
                      style={styles.productImage}
                    />
                  </View>
                  {/* <View style={styles.reviewContainer}>
                  <FontAwesome name="star" size={12} color="orange" />
                  <Text style={styles.rating}>{item.rating}</Text>
                </View> */}
                </View>
                <View style={styles.detailsRightContainer}>
                  <Text style={[styles.name, {
                    color: dark ? COLORS.secondaryWhite : COLORS.greyscale900
                  }]}>{item.name}</Text>
                  <Text style={[styles.address, {
                    color: dark ? COLORS.grayscale400 : COLORS.grayscale700,
                  }]}>{item?.billingAddress?.address1}, {item?.billingAddress?.formattedArea}</Text>
                  <View style={styles.priceContainer}>
                    <View style={styles.priceItemContainer}>
                      <Text style={[styles.totalPrice, {
                        color: dark ? COLORS.white : COLORS.primary,
                      }]}>AED {item.totalPriceV2.amount}</Text>
                    </View>
                    <View style={[styles.statusContainer, {
                      borderColor: dark ? COLORS.dark3 : COLORS.primary,
                      backgroundColor: dark ? COLORS.dark3 : "transparent"
                    }]}>
                      <Text style={[styles.statusText, {
                        color: dark ? COLORS.white : COLORS.primary,
                      }]}>{item.financialStatus}</Text>
                    </View>
                  </View>
                </View>
              </TouchableOpacity>
              <View style={[styles.separateLine, {
                marginVertical: 10,
                backgroundColor: dark ? COLORS.greyScale800 : COLORS.grayscale200,
              }]} />
              <View style={styles.buttonContainer}>
                <TouchableOpacity
                  // onPress={() => refRBSheet.current.open()}
                  onPress={() => {
                    setSelectedOrder(item);
                    refRBSheet.current.open();
                  }}
                  style={[styles.cancelBtn, {
                    borderColor: dark ? COLORS.white : COLORS.primary
                  }]}>
                  <Text style={[styles.cancelBtnText, {
                    color: dark ? COLORS.white : COLORS.primary,
                  }]}>{t('orders.orderAgain')}</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    dispatch(addOrderUrl(item.statusUrl))
                  }}
                  style={[styles.receiptBtn, {
                    // backgroundColor: dark ? COLORS.dark3 : COLORS.primary,
                    // borderColor: dark ? COLORS.dark3 : COLORS.primary,
                    backgroundColor: COLORS.primaryRed,
                    borderColor: COLORS.primaryRed,
                  }]}>
                  <Text style={styles.receiptBtnText}>{t('orders.moreDetails')}</Text>
                </TouchableOpacity>
              </View>
            </TouchableOpacity>
          )}
        />
      ) : (
        <NotFoundCard />
      )}
      <RBSheet
        ref={refRBSheet}
        closeOnPressMask={true}
        height={332}
        customStyles={{
          wrapper: {
            backgroundColor: "rgba(0,0,0,0.5)",
          },
          draggableIcon: {
            backgroundColor: dark ? COLORS.greyscale300 : COLORS.greyscale300,
          },
          container: {
            borderTopRightRadius: 32,
            borderTopLeftRadius: 32,
            height: 332,
            backgroundColor: dark ? COLORS.dark2 : COLORS.white,
            alignItems: "center",
            width: "100%"
          }
        }}>
        <Text style={[styles.bottomSubtitle, {
          color: COLORS.primaryRed
        }]}>{t('orders.sheet.title')}</Text>
        <View style={[styles.separateLine, {
          backgroundColor: dark ? COLORS.greyScale800 : COLORS.grayscale200,
        }]} />

        <View style={styles.selectedCancelContainer}>
          <Text style={[styles.cancelTitle, {
            color: dark ? COLORS.secondaryWhite : COLORS.greyscale900
          }]}>{t('orders.sheet.subTitle')}</Text>
          <Text style={[styles.cancelSubtitle, {
            color: dark ? COLORS.grayscale400 : COLORS.grayscale700
          }]}>{t('orders.sheet.note')}</Text>
        </View>

        <View style={styles.bottomContainer}>
          <Button
            title={t('orders.sheet.button2')}
            style={{
              width: (SIZES.width - 32) / 2 - 8,
              backgroundColor: dark ? COLORS.dark3 : COLORS.tansparentPrimary,
              borderRadius: 32,
              borderColor: dark ? COLORS.dark3 : COLORS.tansparentPrimary
            }}
            textColor={dark ? COLORS.white : COLORS.primary}
            onPress={() => refRBSheet.current.close()}
          />
          <ButtonFilled
            title={t('orders.sheet.button1')}
            style={styles.removeButton}
            onPress={() => {
              refRBSheet.current.close();
              handleOrderAgain(selectedOrder)
              // navigation.navigate("cancelorder");
            }}
          />
        </View>
      </RBSheet>
    </View>
  )
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.tertiaryWhite,
    marginVertical: 22
  },
  cardContainer: {
    width: SIZES.width - 32,
    borderRadius: 18,
    backgroundColor: COLORS.white,
    paddingHorizontal: 8,
    paddingVertical: 8,
    marginBottom: 16
  },
  dateContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  date: {
    fontSize: 16,
    fontFamily: "bold",
    color: COLORS.greyscale900
  },
  statusContainer: {
    width: 54,
    height: 24,
    borderRadius: 6,
    backgroundColor: "transparent",
    alignItems: "center",
    justifyContent: "center",
    borderColor: COLORS.primary,
    borderWidth: 1
  },
  statusText: {
    fontSize: 10,
    color: COLORS.primary,
    fontFamily: "medium",
  },
  separateLine: {
    width: "100%",
    height: .7,
    backgroundColor: COLORS.greyScale800,
    marginVertical: 12
  },
  detailsContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  productImageContainer: {
    width: 88,
    height: 88,
    borderRadius: 16,
    marginHorizontal: 12,
    backgroundColor: COLORS.silver
  },
  productImage: {
    width: 88,
    height: 88,
    borderRadius: 16,
  },
  detailsRightContainer: {
    flex: 1,
    marginLeft: 12
  },
  name: {
    fontSize: 17,
    fontFamily: "bold",
    color: COLORS.greyscale900
  },
  address: {
    fontSize: 12,
    fontFamily: "regular",
    color: COLORS.grayscale700,
    marginVertical: 6
  },
  serviceTitle: {
    fontSize: 12,
    fontFamily: "regular",
    color: COLORS.grayscale700,
  },
  serviceText: {
    fontSize: 12,
    color: COLORS.primary,
    fontFamily: "medium",
    marginTop: 6
  },
  cancelBtn: {
    width: (SIZES.width - 32) / 2 - 16,
    height: 36,
    borderRadius: 24,
    backgroundColor: "transparent",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 6,
    borderColor: COLORS.primary,
    borderWidth: 1.4,
    marginBottom: 12
  },
  cancelBtnText: {
    fontSize: 16,
    fontFamily: "semiBold",
    color: COLORS.primary,
  },
  receiptBtn: {
    width: (SIZES.width - 32) / 2 - 16,
    height: 36,
    borderRadius: 24,
    // backgroundColor: COLORS.primary,
    backgroundColor: COLORS.primaryRed,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 6,
    // borderColor: COLORS.primary,
    borderColor: COLORS.primaryRed,
    borderWidth: 1.4,
    marginBottom: 12
  },
  receiptBtnText: {
    fontSize: 16,
    fontFamily: "semiBold",
    color: COLORS.white,
  },
  buttonContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between"
  },
  rightContainer: {
    flexDirection: "row",
    alignItems: "center"
  },
  remindMeText: {
    fontSize: 12,
    fontFamily: "regular",
    color: COLORS.grayscale700,
    marginVertical: 4
  },
  switch: {
    marginLeft: 8,
    transform: [{ scaleX: .8 }, { scaleY: .8 }], // Adjust the size of the switch
  },
  bottomContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginVertical: 12,
    paddingHorizontal: 16,
    width: "100%"
  },
  cancelButton: {
    width: (SIZES.width - 32) / 2 - 8,
    backgroundColor: COLORS.tansparentPrimary,
    borderRadius: 32
  },
  removeButton: {
    width: (SIZES.width - 32) / 2 - 8,
    backgroundColor: COLORS.primary,
    borderRadius: 32
  },
  bottomTitle: {
    fontSize: 24,
    fontFamily: "semiBold",
    color: "red",
    textAlign: "center",
  },
  bottomSubtitle: {
    fontSize: 22,
    fontFamily: "bold",
    color: COLORS.greyscale900,
    textAlign: "center",
    marginVertical: 12
  },
  selectedCancelContainer: {
    marginVertical: 24,
    paddingHorizontal: 36,
    width: "100%"
  },
  cancelTitle: {
    fontSize: 18,
    fontFamily: "semiBold",
    color: COLORS.greyscale900,
    textAlign: "center",
  },
  cancelSubtitle: {
    fontSize: 14,
    fontFamily: "regular",
    color: COLORS.grayscale700,
    textAlign: "center",
    marginVertical: 8,
    marginTop: 16
  },
  priceContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 6
  },
  totalPrice: {
    fontSize: 18,
    fontFamily: "semiBold",
    color: COLORS.primary,
    textAlign: "center",
  },
  duration: {
    fontSize: 12,
    fontFamily: "regular",
    color: COLORS.grayscale700,
    textAlign: "center",
  },
  priceItemContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 16,

  },
  reviewContainer: {
    position: "absolute",
    top: 6,
    right: 16,
    width: 46,
    height: 20,
    borderRadius: 16,
    backgroundColor: COLORS.transparentWhite2,
    zIndex: 999,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center"
  },
  rating: {
    fontSize: 12,
    fontFamily: "semiBold",
    color: COLORS.primary,
    marginLeft: 4
  },

})

export default OngoingOrders