import { useAppDispatch } from '@/hooks/useAppDispatch';
import { normalizeFont } from '@/utils/normalizeFont';
import { decrementProduct, incrementProduct } from '@/utils/reducers/cartReducers';
import { Feather } from '@expo/vector-icons';
import React, { useMemo } from 'react';
import { Dimensions, Image, Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { COLORS, SIZES, icons } from '../constants';
import { useTheme } from '../theme/ThemeProvider';

const { width } = Dimensions.get('window');

type CartCardProps = {
    merchandiseId: string;
    id: string;
    title: string;
    price: number;
    oldPrice?: number; // optional
    quantity: number;
    image?: string;
    productType: string;
    onPress: () => void; // Function to call when card is pressed
};

const CartCard: React.FC<CartCardProps> = ({
    merchandiseId,
    id,
    title,
    oldPrice,
    quantity,
    image,
    productType,
    price,
    onPress
}) => {
    const { dark } = useTheme();
    // const [quantity, setQuantity] = useState<number>(quantity);
    const dispatch = useAppDispatch();
    const deleteIcon = useMemo(() => icons.delete3, []);

    // const increase = () => {
    //     setQuantity(prevQuantity => prevQuantity + 1);
    // };

    // const decrease = () => {
    //     if (quantity > 1) {
    //         setQuantity(prevQuantity => prevQuantity - 1);
    //     }
    // };

    const increase = (merchandiseId: string) => {
        dispatch(incrementProduct({ merchandiseId }));
    };

    const decrease = (merchandiseId: string) => {
        dispatch(decrementProduct({ merchandiseId }));
    };


    return (
        // <TouchableOpacity
        //     onPress={onPress}
        //     style={[styles.container, { backgroundColor: dark ? "#141517" : COLORS.white }]}>
        <View style={[styles.container, { backgroundColor: dark ? "#141517" : COLORS.white }]}>

            <View
                style={[styles.imageContainer, {
                    backgroundColor: dark ? COLORS.dark3 : COLORS.silver
                }]}>
                <Image
                    source={{ uri: image }}
                    resizeMode='cover'
                    style={styles.image}
                />
            </View>
            <View style={styles.columnContainer}>
                <View style={styles.topViewContainer}>
                    <Text style={[styles.name, {
                        color: dark ? COLORS.secondaryWhite : COLORS.greyscale900
                    }]}>{title}</Text>
                    <TouchableOpacity onPress={onPress}>
                        <Feather style={styles.heartIcon} size={19} name='trash-2' color="red" />
                    </TouchableOpacity>
                </View>
                <View style={[styles.viewContainer, { gap: 10 }]}>
                    <Text style={[styles.oldPrice, {
                        color: dark ? COLORS.greyscale300 : COLORS.grayscale700,
                    }]}>AED {oldPrice?.toFixed(3)}</Text>

                    <Text style={[styles.price, {
                        color: "rgb(177, 18, 22)",
                    }]}>AED {price.toFixed(2)}</Text>
                </View>
                {/* <View style={styles.viewContainer}>
                    <Text style={[styles.price, {
                        color: "rgb(177, 18, 22)",
                    }]}>AED {price.toFixed(2)}</Text>
                </View> */}
                <View style={styles.bottomViewContainer}>
                    <View style={styles.priceContainer}>
                        <Text style={[styles.subtotalPrice, {
                            color: dark ? COLORS.greyscale300 : COLORS.grayscale700,
                        }]}>Total: AED {(price * quantity).toFixed(2)}</Text>
                    </View>
                    <View style={[styles.qtyContainer, {
                        backgroundColor: dark ? COLORS.dark3 : COLORS.silver
                    }]}>
                        <TouchableOpacity
                            onPress={() => decrease(merchandiseId)}
                            style={{
                                height: 40,
                                width: 40,
                                alignItems: "center",
                                justifyContent: "center",
                            }}
                        >
                            <Feather size={18} name='minus' />
                        </TouchableOpacity>
                        <Text style={[styles.qtyNum, {
                            color: dark ? COLORS.white : COLORS.primary,
                        }]}>{quantity}</Text>
                        <TouchableOpacity
                            onPress={() => increase(merchandiseId)}
                            style={{
                                height: 40,
                                width: 40,
                                alignItems: "center",
                                justifyContent: "center",
                            }}
                        >
                            <Feather size={18} name='plus' />
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
            {/* </TouchableOpacity > */}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        width: SIZES.width - 32,
        backgroundColor: COLORS.white,
        padding: 6,
        borderRadius: 16,
        marginBottom: 12,
        height: Platform.OS === 'android' ? 162 : SIZES.height * 0.16,
        alignItems: 'center',
        // borderColor: COLORS.secondaryWhite,
        borderColor: '#dadcd3',
        borderWidth: 1,
        marginVertical: 10
    },
    image: {
        width: width * 0.2,
        height: 100,
        borderRadius: 16,
    },
    imageContainer: {
        // width: 100,
        width: width * 0.2,
        height: 100,
        borderRadius: 16,
        backgroundColor: COLORS.silver,
    },
    columnContainer: {
        flexDirection: 'column',
        marginLeft: 12,
        flex: 1,
    },
    name: {
        color: COLORS.greyscale900,
        marginVertical: 4,
        marginRight: 40,
        fontSize: normalizeFont(16),
        fontFamily: "normal",
        fontWeight: 600,
    },
    location: {
        fontSize: 14,
        fontFamily: 'regular',
        color: COLORS.grayscale700,
        marginVertical: 4,
    },
    priceContainer: {
        flexDirection: 'column',
        marginVertical: 2,
    },
    heartIcon: {
        width: 20,
        height: 20,
        tintColor: COLORS.red,
        marginLeft: 6,
    },
    topViewContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: SIZES.width - 194,
    },
    bottomViewContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 2,
    },
    viewContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 4,
    },
    price: {
        fontSize: normalizeFont(18),
        fontFamily: 'normal',
        // color: COLORS.black,
        color: "rgb(177, 18, 22)",
        marginRight: 8,
    },
    oldPrice: {
        // fontSize: 16,
        fontFamily: "bold",
        // color: COLORS.gray3,
        alignItems: "baseline",
        fontSize: normalizeFont(16),
        color: COLORS.primary,
        textDecorationLine: 'line-through'
    },
    subtotalPrice: {
        fontFamily: "bold",
        alignItems: "baseline",
        fontSize: normalizeFont(18),
        color: COLORS.primary,
    },
    color: {
        height: 16,
        width: 16,
        borderRadius: 999,
        marginRight: 8,
    },
    qtyContainer: {
        // width: 130,
        width: width * 0.30,
        // height: 46,
        height: SIZES.height * 0.045,
        borderRadius: 24,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: COLORS.silver,
        flexDirection: 'row',
    },
    qtyText: {
        fontSize: normalizeFont(16),
        fontFamily: 'regular',
        color: COLORS.primary,
    },
    qtyNum: {
        fontSize: normalizeFont(16),
        fontFamily: 'semiBold',
        color: COLORS.primary,
        marginHorizontal: 12,
    },
});

// export default CartCard;
export default React.memo(CartCard);
