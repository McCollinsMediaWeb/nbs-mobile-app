import { Ionicons } from '@expo/vector-icons';
import React, {
    forwardRef,
    useImperativeHandle,
    useRef,
} from 'react';
import {
    Image,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import RBSheet from 'react-native-raw-bottom-sheet';

type Product = {
    name: string;
    image: any;
};

const HamburgerDrawer = forwardRef<any>((_, ref) => {
    const internalRef = useRef<any>(null);

    useImperativeHandle(ref, () => internalRef.current);

    const productList: Product[] = [
        { name: 'NBS SOLAR', image: require('../assets/images/collection-banners/nbs-solar.jpg') },
        { name: 'SAMSUN SOLAR', image: require('../assets/images/collection-banners/nbs-solar.jpg') },
        { name: 'SU-MAX', image: require('../assets/images/collection-banners/nbs-solar.jpg') },
    ];

    return (
        <RBSheet
            ref={internalRef}
            closeOnPressMask={true}
            height={600}
            openDuration={250}
            customStyles={{
                wrapper: {
                    backgroundColor: 'rgba(0,0,0,0.4)',
                },
                container: {
                    alignSelf: 'flex-start',
                    width: '70%',
                    height: '100%',
                },
            }}
        >
            <View style={styles.container}>
                <TouchableOpacity
                    onPress={() => internalRef.current?.close()}
                    style={styles.closeBtn}
                >
                    <Ionicons name="close" size={24} color="black" />
                </TouchableOpacity>

                <Text style={styles.menuItem}>HOME</Text>
                <Text style={styles.menuItem}>ABOUT US</Text>

                <Text style={styles.menuSection}>ALL PRODUCTS</Text>
                <View style={styles.productGrid}>
                    {productList.map((item, index) => (
                        <View key={index} style={styles.productItem}>
                            <Image source={item.image} style={styles.productImage} />
                            <Text style={styles.productName}>{item.name}</Text>
                        </View>
                    ))}
                </View>
            </View>
        </RBSheet>
    );
});

export default HamburgerDrawer;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    closeBtn: {
        marginBottom: 20,
    },
    menuItem: {
        fontWeight: 'bold',
        fontSize: 16,
        marginVertical: 10,
    },
    menuSection: {
        marginTop: 20,
        fontWeight: 'bold',
        fontSize: 14,
        marginBottom: 10,
    },
    productGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 10,
    },
    productItem: {
        width: '30%',
        alignItems: 'center',
    },
    productImage: {
        width: 60,
        height: 60,
        resizeMode: 'contain',
    },
    productName: {
        fontSize: 10,
        textAlign: 'center',
        marginTop: 5,
    },
});
