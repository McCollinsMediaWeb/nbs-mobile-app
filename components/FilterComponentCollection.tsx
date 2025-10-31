
import { COLORS, icons } from '@/constants';
import { useTheme } from '@/theme/ThemeProvider';
import { normalizeFont } from '@/utils/normalizeFont';
import i18next from 'i18next';
import React, { useCallback, useState } from 'react';
import { Image, Modal, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

interface FilterComponentCollectionProps {
    filterSheetRef: React.RefObject<any>;
    sortSheetRef: React.RefObject<any>;
    expanded: string | null;
    toggleExpand: (section: string) => void;
    toggleCheckbox: (item: string, type: string) => void;
    toggleSortKey: (value: string, type: boolean) => void;
    selectedTypes: string[];
    selectedBrands: string[];
    currentSort?: { sortKey: string; reverse: boolean };
    handleShowResults: () => void;
}

// const SORT_OPTIONS = [
//     { label: 'Featured', sortKey: 'RELEVANCE', reverse: false },
//     { label: 'Best selling', sortKey: 'BEST_SELLING', reverse: false },
//     { label: 'Alphabetically A-Z', sortKey: 'TITLE', reverse: false },
//     { label: 'Alphabetically Z-A', sortKey: 'TITLE', reverse: true },
//     { label: 'Price low to high', sortKey: 'PRICE', reverse: false },
//     { label: 'Price high to low', sortKey: 'PRICE', reverse: true },
//     { label: 'Date old to new', sortKey: 'CREATED', reverse: false },
//     { label: 'Date new to old', sortKey: 'CREATED', reverse: true },
// ];

// const PRODUCT_TYPES = ["AVR", "Batteries", "Generators", "Inverter/UPS", "Ongrid Inverter","Power Station", "Solar Hybrid UPS", "Water Pumps"];
// const BRANDS = ["Nbs Groups", "Samsun", "Sumak", "Sunride"];

const SORT_OPTIONS = [
    { label: 'option1', sortKey: 'RELEVANCE', reverse: false },
    { label: 'option2', sortKey: 'BEST_SELLING', reverse: false },
    { label: 'option3', sortKey: 'TITLE', reverse: false },
    { label: 'option4', sortKey: 'TITLE', reverse: true },
    { label: 'option5', sortKey: 'PRICE', reverse: false },
    { label: 'option6', sortKey: 'PRICE', reverse: true },
    { label: 'option7', sortKey: 'CREATED', reverse: false },
    { label: 'option8', sortKey: 'CREATED', reverse: true },
];

const PRODUCT_TYPES = [
    { key: "option1", value: "AVR" },
    { key: "option2", value: "Batteries" },
    { key: "option3", value: "Generators" },
    { key: "option4", value: "Inverter/UPS" },
    { key: "option5", value: "Ongrid Inverter" },
    { key: "option6", value: "Power Station" },
    { key: "option7", value: "Solar Hybrid UPS" },
    { key: "option8", value: "Water Pumps" },
];

const BRANDS = [
    { key: "option1", value: "Nbs Groups" },
    { key: "option2", value: "Samsun" },
    { key: "option3", value: "Sumak" },
    { key: "option4", value: "Sunride" },
];

const FilterComponentCollection: React.FC<FilterComponentCollectionProps> = ({
    filterSheetRef,
    sortSheetRef,
    expanded,
    toggleExpand,
    toggleCheckbox,
    toggleSortKey,
    selectedTypes,
    selectedBrands,
    currentSort,
    handleShowResults
}) => {
    const { dark } = useTheme();
    const [filterVisible, setFilterVisible] = useState(false);
    const [sortVisible, setSortVisible] = useState(false);
    const { t } = i18next;

    // Expose methods to parent via refs
    React.useImperativeHandle(filterSheetRef, () => ({
        open: () => setFilterVisible(true),
        close: () => setFilterVisible(false),
    }));

    React.useImperativeHandle(sortSheetRef, () => ({
        open: () => setSortVisible(true),
        close: () => setSortVisible(false),
    }));

    const handleSortPress = useCallback((sortKey: string, reverse: boolean) => {
        toggleSortKey(sortKey, reverse);
        setSortVisible(false);
    }, [toggleSortKey]);

    const bgColor = dark ? COLORS.primary : COLORS.white;
    const textColor = dark ? COLORS.white : COLORS.primary;

    return (
        <>
            {/* FILTER MODAL */}
            <Modal
                visible={filterVisible}
                transparent
                animationType="slide"
                onRequestClose={() => setFilterVisible(false)}
            >
                <View style={[styles.modalOverlay, { backgroundColor: 'rgba(0, 0, 0, 0.5)' }]}>
                    <View style={[styles.modalContent, { backgroundColor: bgColor }]}>
                        <View style={styles.sheetHeader}>
                            <Text style={[styles.sheetTitle, { color: textColor }]}>
                                {t("filters.title")}
                            </Text>
                            <TouchableOpacity onPress={() => setFilterVisible(false)}>
                                <Image
                                    source={icons.close}
                                    style={[styles.closeIcon, { tintColor: textColor }]}
                                />
                            </TouchableOpacity>
                        </View>

                        <ScrollView showsVerticalScrollIndicator={false} style={styles.scrollContent}>
                            {/* Product Type Filter */}
                            <TouchableOpacity
                                style={styles.accordionHeader}
                                onPress={() => toggleExpand("product")}
                            >
                                <Text style={[styles.optionText, { color: textColor }]}>
                                    {t("filters.productType.title")}
                                </Text>
                                <Text style={[styles.optionText, { fontSize: 30, color: textColor }]}>
                                    {expanded === "product" ? "-" : "+"}
                                </Text>
                            </TouchableOpacity>

                            {expanded === "product" && (
                                <View style={styles.accordionBody}>
                                    {/* {PRODUCT_TYPES.map((item) => (
                                        <TouchableOpacity
                                            key={item}
                                            style={styles.optionRow}
                                            onPress={() => toggleCheckbox(item, "product")}
                                        >
                                            <Image
                                                source={selectedTypes.includes(item) ? icons.ticked : icons.unticked}
                                                style={[styles.checkboxIcon, { tintColor: textColor }]}
                                            />
                                            <Text style={[styles.optionText, { color: textColor }]}>
                                                {item}
                                            </Text>
                                        </TouchableOpacity>
                                    ))} */}
                                    {PRODUCT_TYPES.map((item) => (
                                        <TouchableOpacity
                                            key={item.value}
                                            style={styles.optionRow}
                                            onPress={() => toggleCheckbox(item.value, "product")}
                                        >
                                            <Image
                                                source={selectedTypes.includes(item.value) ? icons.ticked : icons.unticked}
                                                style={[styles.checkboxIcon, { tintColor: textColor }]}
                                            />
                                            <Text style={[styles.optionText, { color: textColor }]}>
                                                {t(`filters.productType.${item.key}`)}
                                            </Text>
                                        </TouchableOpacity>
                                    ))}
                                </View>
                            )}

                            {/* Brands Filter */}
                            <TouchableOpacity
                                style={styles.accordionHeader}
                                onPress={() => toggleExpand("brands")}
                            >
                                <Text style={[styles.optionText, { color: textColor }]}>
                                    {t("filters.brands.title")}
                                </Text>
                                <Text style={[styles.optionText, { fontSize: 30, color: textColor }]}>
                                    {expanded === "brands" ? "-" : "+"}
                                </Text>
                            </TouchableOpacity>

                            {expanded === "brands" && (
                                <View style={styles.accordionBody}>
                                    {/* {BRANDS.map((item) => (
                                        <TouchableOpacity
                                            key={item}
                                            style={styles.optionRow}
                                            onPress={() => toggleCheckbox(item, "brands")}
                                        >
                                            <Image
                                                source={selectedBrands.includes(item) ? icons.ticked : icons.unticked}
                                                style={[styles.checkboxIcon, { tintColor: textColor }]}
                                            />
                                            <Text style={[styles.optionText, { color: textColor }]}>
                                                {item}
                                            </Text>
                                        </TouchableOpacity>
                                    ))} */}
                                    {BRANDS.map((item) => (
                                        <TouchableOpacity
                                            key={item.value}
                                            style={styles.optionRow}
                                            onPress={() => toggleCheckbox(item.value, "brands")}
                                        >
                                            <Image
                                                source={selectedBrands.includes(item.value) ? icons.ticked : icons.unticked}
                                                style={[styles.checkboxIcon, { tintColor: textColor }]}
                                            />
                                            <Text style={[styles.optionText, { color: textColor }]}>
                                                {t(`filters.brands.${item.key}`)}
                                            </Text>
                                        </TouchableOpacity>
                                    ))}
                                </View>
                            )}
                        </ScrollView>

                        <TouchableOpacity style={styles.applyButton} onPress={handleShowResults}>
                            <Text style={styles.applyButtonText}>{t("filters.showResults")}</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>

            {/* SORT MODAL */}
            <Modal
                visible={sortVisible}
                transparent
                animationType="slide"
                onRequestClose={() => setSortVisible(false)}
            >
                <View style={[styles.modalOverlay, { backgroundColor: 'rgba(0, 0, 0, 0.5)' }]}>
                    <View style={[styles.modalContent, { backgroundColor: bgColor }]}>
                        <View style={styles.sheetHeader}>
                            <Text style={[styles.sheetTitle, { color: textColor }]}>
                                {t("sortBy.title")}
                            </Text>
                            <TouchableOpacity onPress={() => setSortVisible(false)}>
                                <Image
                                    source={icons.close}
                                    style={[styles.closeIcon, { tintColor: textColor }]}
                                />
                            </TouchableOpacity>
                        </View>

                        <ScrollView showsVerticalScrollIndicator={false} style={styles.scrollContent}>
                            {/* {SORT_OPTIONS.map((option) => (
                                <TouchableOpacity
                                    key={`${option.sortKey}-${option.reverse}`}
                                    style={styles.option}
                                    onPress={() => handleSortPress(option.sortKey, option.reverse)}
                                >
                                    <Text style={[styles.optionText, { color: textColor }]}>
                                        {option.label}
                                    </Text>

                                    {currentSort?.sortKey === option.sortKey && currentSort?.reverse === option.reverse && (
                                        <Image source={icons.checkMark} style={[styles.tickMark, { tintColor: dark ? COLORS.white : COLORS.primary }]} />
                                    )}
                                </TouchableOpacity>
                            ))} */}
                            {SORT_OPTIONS.map((option) => (
                                <TouchableOpacity
                                    key={`${option.sortKey}-${option.reverse}`}
                                    style={styles.option}
                                    onPress={() => handleSortPress(option.sortKey, option.reverse)}
                                >
                                    <Text style={[styles.optionText, { color: textColor }]}>
                                        {t(`sortBy.${option.label}`)}
                                    </Text>
                                    {currentSort?.sortKey === option.sortKey && currentSort?.reverse === option.reverse && (
                                        <Image
                                            source={icons.checkMark}
                                            style={[styles.tickMark, { tintColor: dark ? COLORS.white : COLORS.primary }]}
                                        />
                                    )}
                                </TouchableOpacity>
                            ))}
                        </ScrollView>
                    </View>
                </View>
            </Modal>
        </>
    );
};

export default FilterComponentCollection;

const styles = StyleSheet.create({
    modalOverlay: {
        flex: 1,
        justifyContent: 'flex-end',
    },
    modalContent: {
        borderTopLeftRadius: 16,
        borderTopRightRadius: 16,
        maxHeight: '80%',
        paddingTop: 20,
    },
    scrollContent: {
        paddingHorizontal: 20,
        flexGrow: 1,
    },
    sheetHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20,
        paddingHorizontal: 20,
    },
    sheetTitle: {
        fontSize: normalizeFont(22),
        fontWeight: '900',
        textAlign: 'center',
        textTransform: 'uppercase',
        flex: 1,
    },
    closeIcon: {
        width: 20,
        height: 20,
    },
    accordionHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 14,
        borderBottomWidth: 1,
        borderColor: '#eee',
        alignItems: 'center',
    },
    accordionBody: {
        paddingVertical: 8,
    },
    optionRow: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 10,
    },
    checkboxIcon: {
        width: 25,
        height: 25,
        margin: 4,
        marginRight: 8,
    },
    // option: {
    //     paddingVertical: 14,
    //     borderBottomWidth: 1,
    //     borderColor: '#eee',
    // },
    option: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 14,
        paddingHorizontal: 16,
        borderBottomWidth: 1,
        borderColor: '#eee',
    },
    tickMark: {
        width: 18,
        height: 18,
    },

    optionText: {
        fontSize: normalizeFont(15),
        fontWeight: '500',
    },
    applyButton: {
        backgroundColor: 'rgb(177, 18, 22)',
        paddingVertical: 14,
        alignItems: 'center',
        marginHorizontal: 20,
        marginBottom: 20,
        borderRadius: 8,
    },
    applyButtonText: {
        color: '#fff',
        fontSize: normalizeFont(16),
        fontWeight: '600',
    },
});