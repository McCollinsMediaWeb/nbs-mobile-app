import { COLORS } from '@/constants';
import { normalizeFont } from '@/utils/normalizeFont';
import React, { useState } from 'react';
import {
    ActivityIndicator,
    Alert,
    KeyboardAvoidingView,
    Modal,
    Platform,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';

interface QuoteFormData {
    name: string;
    email: string;
    phone: string;
    company: string;
    trn: string;
    subject: string;
    details: string;
}

interface QuoteRequestModalProps {
    visible: boolean;
    onClose: () => void;
    product?: any;
    dark?: boolean;
}

const QuoteRequestModal: React.FC<QuoteRequestModalProps> = ({
    visible,
    onClose,
    product,
    dark = false,
}) => {
    const [formData, setFormData] = useState<QuoteFormData>({
        name: '',
        email: '',
        phone: '',
        company: '',
        trn: '',
        subject: '',
        details: '',
    });
    const [loading, setLoading] = useState(false);

    const handleInputChange = (field: keyof QuoteFormData, value: string) => {
        setFormData(prev => ({
            ...prev,
            [field]: value,
        }));
    };

    const validateForm = (): boolean => {
        if (!formData.name.trim()) {
            Alert.alert('Validation Error', 'Please enter your name');
            return false;
        }
        if (!formData.email.trim() || !formData.email.includes('@')) {
            Alert.alert('Validation Error', 'Please enter a valid email');
            return false;
        }
        if (!formData.phone.trim()) {
            Alert.alert('Validation Error', 'Please enter your phone number');
            return false;
        }
        // if (!formData.company.trim()) {
        //     Alert.alert('Validation Error', 'Please enter your company name');
        //     return false;
        // }
        // if (!formData.subject.trim()) {
        //     Alert.alert('Validation Error', 'Please enter a subject');
        //     return false;
        // }
        // if (!formData.details.trim()) {
        //     Alert.alert('Validation Error', 'Please enter additional details');
        //     return false;
        // }
        return true;
    };

    const handleSubmit = async () => {
        if (!validateForm()) return;

        setLoading(true);

        const payload = {
            name: formData.name,
            email: formData.email,
            phone: formData.phone,
            company: formData.company,
            subject: formData.subject,
            trnNumber: formData.trn,
            message: formData.details,
            formType: product?.title ? product?.title : 'General Quote Request',
        };
        try {
            // Replace with your actual API endpoint
            const response = await fetch('https://nbs-server.vercel.app/api/bulk-order-form-submitted', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload),
            });

            if (response.ok) {
                Alert.alert('Success', 'Quote request submitted successfully');
                resetForm();
                onClose();
            } else {
                Alert.alert('Error', 'Failed to submit quote request');
            }
        } catch (error) {
            Alert.alert('Error', 'An error occurred while submitting the form');
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const resetForm = () => {
        setFormData({
            name: '',
            email: '',
            phone: '',
            company: '',
            trn: '',
            subject: '',
            details: '',
        });
    };

    const bgColor = dark ? '#1a1a1a' : '#ffffff';
    const textColor = dark ? '#ffffff' : '#000000';
    const inputBgColor = dark ? '#2a2a2a' : '#f5f5f5';
    const borderColor = dark ? '#444444' : '#dddddd';

    return (
        <Modal
            visible={visible}
            animationType="slide"
            transparent
            onRequestClose={onClose}
        >
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={{ flex: 1 }}
            >
                <View
                    style={{
                        flex: 1,
                        backgroundColor: 'rgba(0, 0, 0, 0.5)',
                        justifyContent: 'flex-end',
                    }}
                >
                    <View
                        style={{
                            backgroundColor: bgColor,
                            borderTopLeftRadius: 20,
                            borderTopRightRadius: 20,
                            height: '95%',
                            paddingTop: 20,
                            flexDirection: 'column',
                        }}
                    >
                        {/* Header */}
                        <View
                            style={{
                                flexDirection: 'row',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                paddingHorizontal: 16,
                                paddingBottom: 16,
                                borderBottomWidth: 1,
                                borderBottomColor: borderColor,
                            }}
                        >
                            <Text
                                style={{
                                    fontSize: normalizeFont(20),
                                    fontWeight: 'bold',
                                    color: textColor,
                                }}
                            >
                                Request a Quote
                            </Text>
                            <TouchableOpacity
                                onPress={onClose}
                                disabled={loading}
                            >
                                <Text
                                    style={{
                                        fontSize: 28,
                                        color: textColor,
                                        fontWeight: '300',
                                    }}
                                >
                                    ✕
                                </Text>
                            </TouchableOpacity>
                        </View>

                        {/* Form */}
                        <ScrollView
                            style={{ flex: 1, padding: 16 }}
                            showsVerticalScrollIndicator={false}
                        >
                            {/* Name */}
                            <View style={{ marginBottom: 16 }}>
                                <Text
                                    style={[styles.fonts, { marginBottom: 8, color: textColor }]}
                                >
                                    Name *
                                </Text>
                                <TextInput
                                    style={{
                                        backgroundColor: inputBgColor,
                                        borderWidth: 1,
                                        borderColor,
                                        borderRadius: 8,
                                        padding: 12,
                                        color: textColor,
                                    }}
                                    placeholder="Enter your name"
                                    placeholderTextColor={dark ? '#999999' : '#cccccc'}
                                    value={formData.name}
                                    onChangeText={v => handleInputChange('name', v)}
                                    editable={!loading}
                                />
                            </View>

                            {/* Email */}
                            <View style={{ marginBottom: 16 }}>
                                <Text
                                    style={[styles.fonts, { marginBottom: 8, color: textColor }]}
                                >
                                    Email *
                                </Text>
                                <TextInput
                                    style={{
                                        backgroundColor: inputBgColor,
                                        borderWidth: 1,
                                        borderColor,
                                        borderRadius: 8,
                                        padding: 12,
                                        color: textColor,
                                    }}
                                    placeholder="Enter your email"
                                    placeholderTextColor={dark ? '#999999' : '#cccccc'}
                                    keyboardType="email-address"
                                    value={formData.email}
                                    onChangeText={v => handleInputChange('email', v)}
                                    editable={!loading}
                                />
                            </View>

                            {/* Phone Number */}
                            <View style={{ marginBottom: 16 }}>
                                <Text
                                    style={[styles.fonts, { marginBottom: 8, color: textColor }]}
                                >
                                    Phone Number *
                                </Text>
                                <TextInput
                                    style={{
                                        backgroundColor: inputBgColor,
                                        borderWidth: 1,
                                        borderColor,
                                        borderRadius: 8,
                                        padding: 12,
                                        color: textColor,
                                    }}
                                    placeholder="Enter your phone number"
                                    placeholderTextColor={dark ? '#999999' : '#cccccc'}
                                    keyboardType="phone-pad"
                                    value={formData.phone}
                                    onChangeText={v => handleInputChange('phone', v)}
                                    editable={!loading}
                                />
                            </View>

                            {/* Company Name */}
                            <View style={{ marginBottom: 16 }}>
                                <Text
                                    style={[styles.fonts, { marginBottom: 8, color: textColor }]}
                                >
                                    Company Name
                                </Text>
                                <TextInput
                                    style={{
                                        backgroundColor: inputBgColor,
                                        borderWidth: 1,
                                        borderColor,
                                        borderRadius: 8,
                                        padding: 12,
                                        color: textColor,
                                    }}
                                    placeholder="Enter your company name"
                                    placeholderTextColor={dark ? '#999999' : '#cccccc'}
                                    value={formData.company}
                                    onChangeText={v => handleInputChange('company', v)}
                                    editable={!loading}
                                />
                            </View>

                            {/* TRN Number (Optional) */}
                            <View style={{ marginBottom: 16 }}>
                                <Text
                                    style={[styles.fonts, { marginBottom: 8, color: textColor }]}
                                >
                                    TRN Number
                                    <Text style={{ fontWeight: '400', color: '#999999' }}>
                                        {' '}(Optional)
                                    </Text>
                                </Text>
                                <TextInput
                                    style={{
                                        backgroundColor: inputBgColor,
                                        borderWidth: 1,
                                        borderColor,
                                        borderRadius: 8,
                                        padding: 12,
                                        color: textColor,
                                    }}
                                    placeholder="Enter your 15-digit TRN number"
                                    placeholderTextColor={dark ? '#999999' : '#cccccc'}
                                    value={formData.trn}
                                    onChangeText={v => handleInputChange('trn', v)}
                                    editable={!loading}
                                />
                            </View>

                            {/* Subject */}
                            <View style={{ marginBottom: 16 }}>
                                <Text
                                    style={[styles.fonts, { marginBottom: 8, color: textColor }]}
                                >
                                    Subject
                                </Text>
                                <TextInput
                                    style={{
                                        backgroundColor: inputBgColor,
                                        borderWidth: 1,
                                        borderColor,
                                        borderRadius: 8,
                                        padding: 12,
                                        color: textColor,
                                    }}
                                    placeholder="Enter subject"
                                    placeholderTextColor={dark ? '#999999' : '#cccccc'}
                                    value={formData.subject}
                                    onChangeText={v => handleInputChange('subject', v)}
                                    editable={!loading}
                                />
                            </View>

                            {/* Additional Details */}
                            <View style={{ marginBottom: 24 }}>
                                <Text
                                    style={[styles.fonts, { marginBottom: 8, color: textColor }]}
                                >
                                    Additional Details
                                </Text>
                                <TextInput
                                    style={{
                                        backgroundColor: inputBgColor,
                                        borderWidth: 1,
                                        borderColor,
                                        borderRadius: 8,
                                        padding: 12,
                                        color: textColor,
                                        minHeight: 120,
                                        textAlignVertical: 'top',
                                    }}
                                    placeholder="Enter additional details"
                                    placeholderTextColor={dark ? '#999999' : '#cccccc'}
                                    multiline
                                    numberOfLines={6}
                                    value={formData.details}
                                    onChangeText={v => handleInputChange('details', v)}
                                    editable={!loading}
                                />
                            </View>
                        </ScrollView>

                        {/* Footer Buttons */}
                        <View
                            style={{
                                flexDirection: 'row',
                                // gap: 12,
                                justifyContent: 'space-between',
                                padding: 16,
                                borderTopWidth: 1,
                                borderTopColor: borderColor,
                            }}
                        >
                            <TouchableOpacity
                                onPress={onClose}
                                disabled={loading}
                                style={[styles.cancelBtn, {
                                    backgroundColor: inputBgColor
                                }]}
                            >
                                <Text
                                    style={{
                                        color: textColor,
                                        fontWeight: '600',
                                        fontSize: normalizeFont(16),
                                    }}
                                >
                                    Cancel
                                </Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                onPress={handleSubmit}
                                disabled={loading}
                                style={[styles.cartBtn, {
                                    backgroundColor: COLORS.primaryRed
                                }]}
                            >
                                {loading && (
                                    <ActivityIndicator
                                        color="white"
                                        style={{ marginRight: 8 }}
                                    />
                                )}
                                <Text
                                    style={{
                                        color: 'white',
                                        fontWeight: '600',
                                        fontSize: normalizeFont(16),
                                    }}
                                >
                                    {loading ? 'Submitting...' : 'Submit Quote'}
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </KeyboardAvoidingView>
        </Modal>
    );
};

export default QuoteRequestModal;


const styles = StyleSheet.create({
    cartBtn: {
        height: 58,
        width: 200,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 32,
        backgroundColor: COLORS.black,
        flexDirection: "row",
    },

    cancelBtn: {
        height: 58,
        width: 200,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 32,
        backgroundColor: COLORS.black,
        flexDirection: "row",
    },

    fonts: {
        fontSize: normalizeFont(16),
        fontWeight: "700",
        color: COLORS.greyscale900,
    },
});