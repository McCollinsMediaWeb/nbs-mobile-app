import AddressItem from '@/components/AddressItem';
import NotFoundCard from '@/components/NotFoundCard';
import { useAppDispatch } from '@/hooks/useAppDispatch';
import { useAppSelector } from '@/hooks/useAppSelector';
import { updateSelectedAddress } from '@/utils/actions/selectedAddressActions';
import { NavigationProp } from '@react-navigation/native';
import { useNavigation } from 'expo-router';
import i18next from 'i18next';
import React, { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ScrollView } from 'react-native-virtualized-view';
import Button from '../components/Button';
import ButtonFilled from '../components/ButtonFilled';
import Header from '../components/Header';
import { COLORS, SIZES } from '../constants';
import { useTheme } from '../theme/ThemeProvider';

interface AddressNode {
  address1: string;
  address2: string | null;
  city: string;
  country: string;
  firstName: string;
  id: string;
  lastName: string;
  phone: string;
  province: string;
  zip: string;
}


const SelectShippingAddress = () => {
  const navigation = useNavigation<NavigationProp<any>>();
  const { colors, dark } = useTheme();
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.user);
  const selectedAddress = useAppSelector((state) => state.selectedAddress.selectedAddress); // This is a string id or null
  const [selectedItem, setSelectedItem] = useState<AddressNode | null>(null);
  // const { t } = useTranslation();
  const { t } = i18next;

  // Handle checkbox
  const handleCheckboxPress = (address: AddressNode) => {
    setSelectedItem(address);
  };

  useEffect(() => {
    setSelectedItem(selectedAddress); // Sync with global state
  }, [selectedAddress]);

  const addresses = user?.customer?.addresses?.edges || [];

  const handleApply = () => {
    dispatch(updateSelectedAddress(selectedItem))
    navigation.goBack()
  }

  return (
    <SafeAreaView style={[styles.area, { backgroundColor: colors.background }]}>
      <View style={[styles.container, { backgroundColor: colors.background }]}>
        <Header title={t('selectAddress.deliverTo')} />
        <ScrollView
          contentContainerStyle={{
            marginVertical: 12
          }}
          showsVerticalScrollIndicator={false}>

          {addresses.length > 0 ? (
            addresses.map((item: { node: AddressNode }) => (
              <AddressItem
                key={item.node.id}
                checked={selectedItem?.id === item.node.id}
                onPress={() => handleCheckboxPress(item.node)}
                name={`${item.node.firstName} ${item.node.lastName}`}
                address={`${item.node.city}, ${item.node.province}`}
              />
            ))
          ) : (
            <NotFoundCard
              title={t("noSavedAddress.title")}
              subtitle={t("noSavedAddress.subtitle")}
            />

          )}

          <Button
            title={t('selectAddress.addNewAddress')}
            style={{
              width: SIZES.width - 32,
              borderRadius: 32,
              backgroundColor: dark ? COLORS.dark3 : COLORS.tansparentPrimary,
              borderColor: dark ? COLORS.dark3 : COLORS.tansparentPrimary
            }}
            textColor={dark ? COLORS.white : COLORS.primary}
            onPress={() => navigation.navigate("addnewaddress")}
          />
        </ScrollView>
        <ButtonFilled
          title={t('selectAddress.apply')}
          onPress={addresses.length <= 0 ? () => { } : handleApply}
          style={{ opacity: addresses.length <= 0 ? 0.5 : 1 }}
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
    paddingTop: 16,
    paddingHorizontal: 16
  },
  addBtn: {
    backgroundColor: COLORS.tansparentPrimary,
    borderColor: COLORS.tansparentPrimary
  }
})

export default SelectShippingAddress