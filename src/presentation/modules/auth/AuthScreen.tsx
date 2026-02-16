
import React, { useState } from 'react';
import { View, StyleSheet, SafeAreaView, StatusBar, Text, Alert } from 'react-native';
import { RizonInput } from '../../components/RizonInput';
import { RizonButton } from '../../components/RizonButton';
import { colors, spacing } from '../../theme';
import { useNavigation } from '@react-navigation/native';
import { ApiService } from '../../../data/services/ApiService';

export const AuthScreen = () => {
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);
    const navigation = useNavigation();

    const handleLogin = async () => {
        if (!email) {
            Alert.alert('Error', 'Please enter your email address');
            return;
        }

        setLoading(true);
        console.log('Login attempt with email:', email);

        try {
            const response = await ApiService.requestLoginLink(email);
            console.log('API Response:', response);
            Alert.alert('Success', 'Login link sent! Check your email (or server logs).');
            // For now, we still navigate to Onboarding for demo purposes, 
            // but in real app we'd wait for link click
            navigation.navigate('Onboarding' as never);
        } catch (error) {
            console.error('Login failed:', error);
            Alert.alert('Error', 'Failed to send login link. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="dark-content" backgroundColor={colors.background} />
            <View style={styles.content}>
                <View style={styles.header}>
                    <Text style={styles.title}>Welcome Back</Text>
                    <Text style={styles.subtitle}>Enter your email to sign in</Text>
                </View>

                <View style={styles.form}>
                    <RizonInput
                        placeholder="name@example.com"
                        value={email}
                        onChangeText={setEmail}
                        keyboardType="email-address"
                        autoCapitalize="none"
                        autoCorrect={false}
                        returnKeyType="done"
                    />

                    <RizonButton
                        title="Get Login Link"
                        onPress={handleLogin}
                        loading={loading}
                        variant="primary"
                        wrapperStyle={styles.button}
                    />
                </View>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background,
    },
    content: {
        flex: 1,
        padding: spacing.l,
        justifyContent: 'center',
    },
    header: {
        marginBottom: spacing.xl,
    },
    title: {
        fontSize: 32,
        fontWeight: '700',
        color: colors.textPrimary,
        marginBottom: spacing.s,
    },
    subtitle: {
        fontSize: 16,
        color: colors.textSecondary,
    },
    form: {
        width: '100%',
    },
    button: {
        marginTop: spacing.m,
        width: '100%',
    },
});
