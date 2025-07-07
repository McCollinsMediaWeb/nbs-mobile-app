import Button from '@/components/Button';
import { COLORS, icons, images, SIZES } from '@/constants';
import { useAppDispatch } from '@/hooks/useAppDispatch';
import { useAppSelector } from '@/hooks/useAppSelector';
import { CancelledOrders, CompletedOrders, OngoingOrders } from '@/tabs';
import { useTheme } from '@/theme/ThemeProvider';
import { addOrderUrl, fetchOrders } from '@/utils/actions/orderActions';
import { NavigationProp } from '@react-navigation/native';
import { useNavigation } from 'expo-router';
import React, { useEffect, useRef, useState } from 'react';
import { ActivityIndicator, Image, StyleSheet, Text, TouchableOpacity, useWindowDimensions, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { SceneMap, TabBar, TabView } from 'react-native-tab-view';
import { WebView } from 'react-native-webview';

interface TabRoute {
  key: string;
  title: string;
}

interface RenderLabelProps {
  route: TabRoute;
  focused: boolean;
}

const groupedOrders: {
  ongoing: any[];
  completed: any[];
  cancelled: any[];
} = {
  ongoing: [],
  completed: [],
  cancelled: []
};

const Orders = () => {
  const navigation = useNavigation<NavigationProp<any>>();
  const layout = useWindowDimensions();
  const { dark, colors } = useTheme();
  const dispatch = useAppDispatch();
  const user = useAppSelector(state => state.user);
  const orders = useAppSelector(state => state.orders.orderItems);
  const orderUrl = useAppSelector((state) => state.orders.orderUrl);
  const [showWebView, setShowWebView] = useState(false);
  const webViewRef = useRef<WebView>(null);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);


  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: 'first', title: 'Ongoing' },
    { key: 'second', title: 'Completed' },
    { key: 'third', title: 'Cancelled' }
  ]);

  useEffect(() => {
    if (user) {
      dispatch(fetchOrders(user?.accessToken));
    }
  }, [dispatch, user]);

  useEffect(() => {
    if (orderUrl !== "") {
      setShowWebView(true);
    }
  }, [orderUrl]);

  useEffect(() => {
    if (!orderUrl) {
      setShowWebView(false);
    }
  }, [orderUrl]);

  useEffect(() => {
    if (webViewRef?.current) {
      webViewRef?.current?.injectJavaScript(`
          window.ReactNativeWebView.postMessage('navigation');
        `);
    }
  }, [orderUrl]);

  const onRefresh = async () => {
    setRefreshing(true);
    await dispatch(fetchOrders(user?.accessToken));
    setRefreshing(false);
  };


  const groupedOrders = React.useMemo(() => {
    const groups = {
      ongoing: [] as any[],
      completed: [] as any[],
      cancelled: [] as any[],
    };

    orders?.forEach((order: any) => {
      if (order.canceledAt !== null) {
        groups.cancelled.push(order);
      } else if (order.fulfillmentStatus === "FULFILLED") {
        groups.completed.push(order);
      } else {
        groups.ongoing.push(order);
      }
    });

    return groups;
  }, [orders]);


  const renderScene = SceneMap({
    first: () => <OngoingOrders
      orders={groupedOrders.ongoing}
      refreshing={refreshing}
      onRefresh={onRefresh} />,
    second: () => <CompletedOrders
      orders={groupedOrders.completed}
      refreshing={refreshing}
      onRefresh={onRefresh} />,
    third: () => <CancelledOrders
      orders={groupedOrders.cancelled}
      refreshing={refreshing}
      onRefresh={onRefresh} />,
  });

  const handleNavigationStateChange = (navState: any) => {
    if (!navState?.url.includes("/account/orders/")) {
      setShowWebView(false);
      dispatch(addOrderUrl(""));
    }
  };

  const renderTabBar = (props: any) => (
    <TabBar
      {...props}
      indicatorStyle={{
        backgroundColor: dark ? COLORS.white : COLORS.primary,
      }}
      style={{
        backgroundColor: colors.background,
      }}
      activeColor={dark ? COLORS.white : COLORS.primary}
      inactiveColor={dark ? COLORS.white : COLORS.greyscale900}
      renderLabel={({ route, focused }: RenderLabelProps) => (
        <Text style={[{
          color: focused ? dark ? COLORS.white : COLORS.primary : "gray",
          fontSize: 16,
          fontFamily: "semiBold"
        }]}>
          {route.title}
        </Text>
      )}
    />
  )

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
              source={images.logo}
              resizeMode='contain'
              style={[styles.backIcon, {
                tintColor: dark ? COLORS.white : COLORS.greyscale900
              }]}
            />
          </TouchableOpacity>
          <Text style={[styles.headerTitle, {
            color: dark ? COLORS.white : COLORS.greyscale900
          }]}>
            My Orders
          </Text>
        </View>
        <TouchableOpacity>
          <Image
            source={icons.moreCircle}
            resizeMode='contain'
            style={[styles.moreIcon, {
              tintColor: dark ? COLORS.white : COLORS.greyscale900
            }]}
          />
        </TouchableOpacity>
      </View>
    )
  }

  return (
    <SafeAreaView style={[styles.area, { backgroundColor: colors.background }]}>
      {/* <Button onPress={() => dispatch(emptyCartThunk())} >Hi all</Button> */}
      {!showWebView ? (
        <View style={[styles.container, { backgroundColor: colors.background }]}>
          {renderHeader()}
          <TabView
            navigationState={{ index, routes }}
            renderScene={renderScene}
            onIndexChange={setIndex}
            initialLayout={{ width: layout.width }}
            renderTabBar={renderTabBar}
          />
        </View>
      ) : (
        <View style={[styles.container, { backgroundColor: colors.background }]}>
          {/* <HeaderWithSearch
            title="Order"
            icon={icons.moreCircle}
            onPress={() => {
              setShowWebView(false);
              dispatch(addOrderUrl(""));
            }}
          /> */}
          <Button
            title='Go Back'
            onPress={() => {
              setShowWebView(false);
              dispatch(addOrderUrl(""));
            }}
            style={{ margin: 10 }}
            filled
          />
          {/* <WebView

            source={{
              uri: orderUrl,
            }}
          /> */}
          <WebView
            ref={webViewRef}
            source={{ uri: orderUrl }}
            onNavigationStateChange={handleNavigationStateChange}
            onLoadStart={() => setLoading(true)}
            onLoadEnd={() => setLoading(false)}
          />

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
      )}

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
    fontSize: 20,
    fontFamily: 'bold',
    color: COLORS.black,
    marginLeft: 16
  },
  moreIcon: {
    width: 24,
    height: 24,
    tintColor: COLORS.black
  },
})

export default Orders