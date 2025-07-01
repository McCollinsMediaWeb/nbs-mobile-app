import Button from '@/components/Button';
import ButtonFilled from '@/components/ButtonFilled';
import Header from '@/components/Header';
import { useAppDispatch } from '@/hooks/useAppDispatch';
import { useAppSelector } from '@/hooks/useAppSelector';
import { deleteAddress, updateAddress } from '@/utils/actions/userActions';
import { Picker } from '@react-native-picker/picker';
import { NavigationProp, RouteProp, useRoute } from '@react-navigation/native';
import { useNavigation } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import React, { useCallback, useEffect, useReducer, useRef, useState } from 'react';
import { Alert, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import RBSheet from 'react-native-raw-bottom-sheet';
import { SafeAreaView } from 'react-native-safe-area-context';
import Input from '../components/Input';
import { COLORS, SIZES } from '../constants';
import { commonStyles } from '../styles/CommonStyles';
import { useTheme } from '../theme/ThemeProvider';
import { validateInput } from '../utils/actions/formActions';
import { reducer } from '../utils/reducers/formReducers';

const initialState = {
    inputValues: {
        firstName: '',
        lastName: '',
        phoneNumber: '',
        address: '',
        city: '',
        emirate: '',
        pinCode: '',
        addressId: ''
    },
    inputValidities: {
        firstName: false,
        lastName: false,
        phoneNumber: false,
        address: false,
        city: false,
        emirate: false,
        pinCode: false,
        addressId: true
    },
    formIsValid: false,
}

type Nav = {
    navigate: (value: string) => void
}

type UpdateAddressParams = {
    address: any;
};

type UpdateAddressRouteProp = RouteProp<
    { updateaddress: UpdateAddressParams },
    'updateaddress'
>;

const UpdateAddress = () => {
    const navigation = useNavigation<NavigationProp<any>>();
    const route = useRoute<UpdateAddressRouteProp>();
    const refRBSheet = useRef<any>(null);
    const dispatch = useAppDispatch();
    const [error, setError] = useState();
    const [formState, dispatchFormState] = useReducer(reducer, initialState);
    const [selectedLabel, setSelectedLabel] = useState(null);
    const { dark, colors } = useTheme();
    const user = useAppSelector(state => state.user);

    const handleLabelSelection = (label: any) => {
        setSelectedLabel(label)
    };

    const { address } = route.params;

    const inputChangedHandler = useCallback(
        (inputId: string, inputValue: string) => {
            const result = validateInput(inputId, inputValue)
            dispatchFormState({
                inputId,
                validationResult: result,
                inputValue,
            })
        }, [dispatchFormState]);

    useEffect(() => {
        if (error) {
            Alert.alert('An error occured', error)
        }
    }, [error]);

    const handleUpdateAddress = async () => {
        if (!formState.formIsValid) {
            Alert.alert('Error', 'Please fill all required fields properly.');
            return;
        }
        // Gather all the data
        const addressData = {
            customerAccessToken: user.accessToken,
            addressId: formState.inputValues.addressId,
            firstName: formState.inputValues.firstName,
            lastName: formState.inputValues.lastName,
            phoneNumber: formState.inputValues.phoneNumber,
            address: formState.inputValues.address,
            city: formState.inputValues.city,
            emirate: formState.inputValues.emirate,
            pinCode: formState.inputValues.pinCode,
            label: selectedLabel,
        };

        try {
            await dispatch(updateAddress(addressData));
            console.log('Success', 'Address updated successfully');
            navigation.goBack();
        } catch (error) {
            console.log('Error', error || 'Could not update address');
        }
    };

    const handleDeleteAddress = async () => {
        try {

            const addressData = {
                customerAccessToken: user.accessToken,
                addressId: formState.inputValues.addressId,
            };
            await dispatch(deleteAddress(addressData));
            console.log('Success', 'Address deleted successfully');
            navigation.goBack();
        } catch (error) {
            console.log('Error', error || 'Could not delete address');
        }
    }

    useEffect(() => {
        if (address) {
            const addressFields = {
                firstName: address.firstName ?? '',
                lastName: address.lastName ?? '',
                phoneNumber: address.phone ?? '',
                address: address.address1 ?? '',
                city: address.city ?? '',
                emirate: address.province ?? '',
                pinCode: address.zip ?? '',
                addressId: address.id ?? ''
            };

            for (const key in addressFields) {
                inputChangedHandler(key, addressFields[key as keyof typeof addressFields]);
            }
        }
    }, [address]);


    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }}>
            <StatusBar hidden={true} />
            <View style={{ padding: 16 }}>
                <Header title="Update Address" />
            </View>
            <View>
                <View
                    style={{
                        width: SIZES.width - 32,
                        marginHorizontal: 16,
                    }}>
                    <View style={{ flexDirection: 'row' }}>
                        <View style={{ marginVertical: 0 }}>
                            <View
                                style={{
                                    marginTop: 0,
                                    width: SIZES.width - 32,
                                }}>
                                <Text style={[commonStyles.inputHeader, {
                                    color: dark ? COLORS.white : COLORS.greyscale900
                                }]}>
                                    First Name*
                                </Text>
                                <Input
                                    id="firstName"
                                    value={formState.inputValues.firstName}
                                    onInputChanged={inputChangedHandler}
                                    errorText={formState.inputValidities['firstName']}
                                    placeholder="Type your name"
                                    placeholderTextColor={dark ? COLORS.grayTie : COLORS.black}
                                />
                            </View>
                            <View
                                style={{
                                    marginTop: 0,
                                    width: SIZES.width - 32,
                                }}>
                                <Text style={[commonStyles.inputHeader, {
                                    color: dark ? COLORS.white : COLORS.greyscale900
                                }]}>
                                    Last Name*
                                </Text>
                                <Input
                                    id="lastName"
                                    value={formState.inputValues.lastName}
                                    onInputChanged={inputChangedHandler}
                                    errorText={formState.inputValidities['lastName']}
                                    placeholder="Type your name"
                                    placeholderTextColor={dark ? COLORS.grayTie : COLORS.black}
                                />
                            </View>
                            <View
                                style={{
                                    marginTop: 0,
                                    width: SIZES.width - 32,
                                }}>
                                <Text style={[commonStyles.inputHeader, {
                                    color: dark ? COLORS.white : COLORS.greyscale900
                                }]}>
                                    Mobile No.*
                                </Text>
                                <Input
                                    id="phoneNumber"
                                    value={formState.inputValues.phoneNumber}
                                    onInputChanged={inputChangedHandler}
                                    errorText={formState.inputValidities['phoneNumber']}
                                    placeholder="Type your mobile no."
                                    placeholderTextColor={dark ? COLORS.grayTie : COLORS.black}
                                />
                            </View>
                            <View
                                style={{
                                    marginTop: 0,
                                    width: SIZES.width - 32,
                                }}>
                                <Text style={[commonStyles.inputHeader, {
                                    color: dark ? COLORS.white : COLORS.greyscale900
                                }]}>
                                    Address*
                                </Text>
                                <Input
                                    id="address"
                                    value={formState.inputValues.address}
                                    onInputChanged={inputChangedHandler}
                                    errorText={formState.inputValidities['address']}
                                    placeholder="Enter Address"
                                    placeholderTextColor={dark ? COLORS.grayTie : COLORS.black}
                                />
                            </View>
                            <View style={{ marginTop: 12 }}>
                                <Text style={[commonStyles.inputHeader, {
                                    color: dark ? COLORS.white : COLORS.greyscale900
                                }]}>
                                    City / District
                                </Text>
                                <Input
                                    id="city"
                                    value={formState.inputValues.city}
                                    onInputChanged={inputChangedHandler}
                                    errorText={formState.inputValidities['city']}
                                    placeholder="Enter city"
                                    placeholderTextColor={dark ? COLORS.grayTie : COLORS.black}
                                />
                            </View>

                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 12 }}>
                                {/* Emirate select */}
                                <View style={{ width: (SIZES.width - 32) / 2 - 10 }}>
                                    <Text style={[commonStyles.inputHeader, { color: dark ? COLORS.white : COLORS.greyscale900 }]}>
                                        Emirate*
                                    </Text>
                                    <View
                                        style={{
                                            borderWidth: 1,
                                            borderColor: dark ? COLORS.grayTie : COLORS.grayTie,
                                            borderRadius: 12,
                                        }}
                                    >
                                        <Picker
                                            selectedValue={formState.inputValues.emirate}
                                            onValueChange={(value) => inputChangedHandler('emirate', value)}
                                            style={{ color: dark ? COLORS.white : COLORS.black }}
                                        >
                                            <Picker.Item label="Select an Emirate" value="" color={dark ? COLORS.grayTie : COLORS.grayTie} />
                                            <Picker.Item label="Abu Dhabi" value="Abu Dhabi" />
                                            <Picker.Item label="Dubai" value="Dubai" />
                                            <Picker.Item label="Sharjah" value="Sharjah" />
                                            <Picker.Item label="Ajman" value="Ajman" />
                                            <Picker.Item label="Ras Al Khaimah" value="Ras Al Khaimah" />
                                            <Picker.Item label="Fujairah" value="Fujairah" />
                                            <Picker.Item label="Umm Al Quwain" value="Umm Al Quwain" />
                                        </Picker>
                                    </View>
                                    {formState.inputValidities['emirate'] && (
                                        <Text style={{ color: COLORS.red }}>{formState.inputValidities['emirate']}</Text>
                                    )}
                                </View>

                                {/* Pin Code */}
                                <View style={{ width: (SIZES.width - 32) / 2 - 10 }}>
                                    <Text style={[commonStyles.inputHeader, { color: dark ? COLORS.white : COLORS.greyscale900 }]}>
                                        Pin Code*
                                    </Text>
                                    <Input
                                        id="pinCode"
                                        value={formState.inputValues.pinCode}
                                        onInputChanged={inputChangedHandler}
                                        errorText={formState.inputValidities['pinCode']}
                                        placeholder="Enter Pin Code"
                                        placeholderTextColor={dark ? COLORS.grayTie : COLORS.black}
                                    />
                                </View>
                            </View>
                        </View>
                    </View>
                    <View>
                        <Text style={[commonStyles.inputHeader, {
                            color: dark ? COLORS.white : COLORS.greyscale900
                        }]}>
                            Save Address As
                        </Text>
                        <View
                            style={{ flexDirection: 'row', marginVertical: 13 }}>
                            <TouchableOpacity
                                style={[
                                    styles.checkboxContainer,
                                    selectedLabel === 'home' &&
                                    styles.selectedCheckbox,
                                    {
                                        borderColor: dark ? COLORS.primary : COLORS.greyscale900
                                    }
                                ]}
                                onPress={() => handleLabelSelection('home')}>
                                <Text
                                    style={[
                                        selectedLabel === 'home' &&
                                        styles.checkboxText,
                                        {
                                            color: selectedLabel === 'home' ? COLORS.white : dark ? COLORS.primary : COLORS.greyscale900
                                        }
                                    ]}>
                                    Home
                                </Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={[
                                    styles.checkboxContainer,
                                    selectedLabel === 'work' &&
                                    styles.selectedCheckbox,
                                    {
                                        borderColor: dark ? COLORS.primary : COLORS.greyscale900
                                    }
                                ]}
                                onPress={() => handleLabelSelection('work')}>
                                <Text
                                    style={[
                                        selectedLabel === 'work' &&
                                        styles.checkboxText, {
                                            color: selectedLabel === 'work' ? COLORS.white : dark ? COLORS.primary : COLORS.greyscale900
                                        }
                                    ]}>
                                    Work
                                </Text>
                            </TouchableOpacity>
                        </View>
                        <ButtonFilled
                            title="DELETE ADDRESS"
                            onPress={() => {
                                refRBSheet.current?.open()
                                // handleUpdateAddress()
                                // setTimeout(() => {
                                //     navigation.goBack()
                                // }, 1000)
                            }}
                            style={{
                                borderRadius: 30,
                                marginBottom: 20
                            }}
                        />
                        <ButtonFilled
                            title="UPDATE ADDRESS"
                            onPress={() => {
                                handleUpdateAddress()
                                setTimeout(() => {
                                    navigation.goBack()
                                }, 1000)
                            }}
                            style={{
                                borderRadius: 30
                            }}
                        />
                    </View>
                </View>
            </View>

            <RBSheet
                ref={refRBSheet}
                closeOnPressMask={true}
                height={380}
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
                        height: 250,
                        backgroundColor: dark ? COLORS.dark2 : COLORS.white,
                        alignItems: "center",
                        width: "100%",
                        paddingVertical: 12
                    }
                }}>
                <Text style={[styles.bottomSubtitle, { color: dark ? COLORS.white : COLORS.black }]}>
                    Delete this Address?
                </Text>
                <View style={styles.separateLine} />

                <View style={{ padding: 20 }}>
                    <Text style={[styles.featureText, {
                        color: dark ? COLORS.white : COLORS.greyscale900
                    }]}>
                        Are you sure you want to delete this address? This action cannot be undone.
                    </Text>
                </View>
                <View style={styles.bottomContainer}>
                    <Button
                        title="Cancel"
                        style={{
                            width: (SIZES.width - 32) / 2 - 8,
                            backgroundColor: dark ? COLORS.dark3 : COLORS.tansparentPrimary,
                            borderRadius: 32,
                            borderColor: dark ? COLORS.dark3 : COLORS.tansparentPrimary
                        }}
                        textColor={dark ? COLORS.white : COLORS.primary}
                        onPress={() => refRBSheet.current?.close()}
                    />
                    <ButtonFilled
                        title="Yes, Delete"
                        style={styles.removeButton}
                        onPress={handleDeleteAddress}
                    />
                </View>


            </RBSheet>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    map: {
        height: '100%',
        zIndex: 1,
    },
    // Callout bubble
    bubble: {
        flexDirection: 'column',
        alignSelf: 'flex-start',
        backgroundColor: '#fff',
        borderRadius: 6,
        borderColor: '#ccc',
        borderWidth: 0.5,
        padding: 15,
        width: 'auto',
    },
    // Arrow below the bubble
    arrow: {
        backgroundColor: 'transparent',
        borderColor: 'transparent',
        borderTopColor: '#fff',
        borderWidth: 16,
        alignSelf: 'center',
        marginTop: -32,
    },
    arrowBorder: {
        backgroundColor: 'transparent',
        borderColor: 'transparent',
        borderTopColor: '#007a87',
        borderWidth: 16,
        alignSelf: 'center',
        marginTop: -0.5,
    },
    body3: {
        fontSize: 12,
        color: COLORS.grayscale700,
        marginVertical: 3,
    },
    h3: {
        fontSize: 12,
        color: COLORS.grayscale700,
        marginVertical: 3,
        fontFamily: 'bold',
        marginRight: 6,
    },
    btn1: {
        width: 45,
        height: 45,
        borderRadius: 22.5,
        backgroundColor: COLORS.primary,
        alignItems: 'center',
        justifyContent: 'center',
    },
    btn2: {
        width: 45,
        height: 45,
        borderRadius: 22.5,
        borderColor: COLORS.primary,
        borderWidth: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    checkboxContainer: {
        paddingHorizontal: 8,
        paddingVertical: 8,
        borderRadius: 30,
        borderWidth: 1,
        borderColor: 'rgba(0,0,0,.5)',
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 12,
        marginBottom: 12,
    },
    roundedCheckBoxContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        height: 48,
        width: 48,
        borderRadius: 22,
        borderWidth: 1,
        borderColor: COLORS.gray,
        backgroundColor: COLORS.gray,
        marginRight: 12,
    },
    selectedCheckbox: {
        backgroundColor: COLORS.primary,
    },
    checkboxText: {
        color: COLORS.white,
        fontSize: 16,
        fontFamily: 'regular',
    },
    starContainer: {
        height: 48,
        width: 48,
        borderRadius: 24,
        borderWidth: 1,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 6,
    },




    bottomSubtitle: {
        fontSize: 22,
        fontFamily: "bold",
        color: COLORS.greyscale900,
        textAlign: "center",
        marginVertical: 12
    },
    separateLine: {
        width: "100%",
        height: .2,
        backgroundColor: COLORS.greyscale300,
        marginHorizontal: 16
    },
    selectedBookmarkContainer: {
        // marginVertical: 16,
        padding: 20
        // backgroundColor: COLORS.tertiaryWhite
    },
    bottomContainer: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginVertical: 12,
        paddingHorizontal: 16,
        width: "100%"
    },
    featureText: {
        fontSize: 16,
        color: "#333",
    },
    removeButton: {
        width: (SIZES.width - 32) / 2 - 8,
        // backgroundColor: COLORS.primary,
        backgroundColor: 'red',
        borderRadius: 32
    },
})

export default UpdateAddress