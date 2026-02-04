import {
    View,
    Text,
    Pressable,
    TextInput,
    ScrollView,
    StatusBar,
    ImageBackground,
    Dimensions,
} from 'react-native';
import { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { FARMER_IMAGE } from '@/constants';
import { router } from 'expo-router';

const { width } = Dimensions.get('window');

export default function LoginScreen() {
    const [emailOrPhone, setEmailOrPhone] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [showPassword, setShowPassword] = useState<boolean>(false);

    return (
        <View className="flex-1 bg-white">
            <StatusBar barStyle="light-content" />

            {/* Header avec image d'arrière-plan */}
            <View className="absolute top-0 left-0 right-0 z-10">
                <ImageBackground
                    source={FARMER_IMAGE}
                    resizeMode="cover"
                    className="w-full"
                    style={{
                        height: width * 0.5,
                        width: '100%',
                    }}
                >
                    {/* Overlay sombre */}
                    <View className="absolute inset-0 bg-black/50" />

                    <SafeAreaView className="flex-1">
                        <View className="px-6 pt-8 pb-10">
                            {/* Titre Login */}
                            <Text className="text-4xl font-bold text-white text-center mb-3">
                                Login
                            </Text>

                            {/* Sous-titre */}
                            <Text className="text-2xl font-bold text-white text-center mb-4">
                                Welcome Back!
                            </Text>

                            {/* Description */}
                            <Text className="text-white/90 text-base text-center leading-6">
                                Log in to manage your harvest, orders, and connect with
                                the market.
                            </Text>
                        </View>
                    </SafeAreaView>
                </ImageBackground>
            </View>

            {/* ScrollView pour le formulaire */}
            <ScrollView
                className="flex-1"
                contentContainerStyle={{
                    flexGrow: 1,
                    paddingTop: width * 0.5, // Espace pour l'image fixe
                }}
                showsVerticalScrollIndicator={false}
                keyboardShouldPersistTaps="handled"
            >
                <View className="bg-white rounded-t-3xl -mt-6 pt-8 px-6 pb-10 min-h-screen">
                    {/* Formulaire de connexion */}
                    <View className="space-y-6">
                        {/* Email or Phone Number */}
                        <View>
                            <Text className="text-lg font-semibold text-gray-800 mb-3">
                                Email or Phone Number
                            </Text>
                            <View className="flex-row items-center border border-gray-300 rounded-xl px-4 py-4 bg-gray-50">
                                <TextInput
                                    className="flex-1 text-base text-gray-800"
                                    placeholder="Enter your email or phone"
                                    placeholderTextColor="#9CA3AF"
                                    value={emailOrPhone}
                                    onChangeText={setEmailOrPhone}
                                    keyboardType="email-address"
                                    autoCapitalize="none"
                                />
                            </View>
                        </View>

                        {/* Password */}
                        <View>
                            <View className="flex-row justify-between items-center mb-3">
                                <Text className="text-lg font-semibold text-gray-800">
                                    Password
                                </Text>
                                <Pressable onPress={() => setShowPassword(!showPassword)}>
                                    <Text className="text-green-600 font-medium">
                                        {showPassword ? 'Hide' : 'Show'}
                                    </Text>
                                </Pressable>
                            </View>
                            <View className="flex-row items-center border border-gray-300 rounded-xl px-4 py-4 bg-gray-50">
                                <TextInput
                                    className="flex-1 text-base text-gray-800"
                                    placeholder="Enter your password"
                                    placeholderTextColor="#9CA3AF"
                                    value={password}
                                    onChangeText={setPassword}
                                    secureTextEntry={!showPassword}
                                />
                            </View>

                            {/* Forgot Password Link */}
                            <Pressable className="mt-3 self-end">
                                <Text className="text-green-600 font-semibold">
                                    Forgot Password?
                                </Text>
                            </Pressable>
                        </View>
                    </View>

                    {/* Divider */}
                    <View className="h-px bg-gray-300 my-8" />

                    {/* Log In Button */}
                    <Pressable className="bg-green-600 rounded-xl py-4 px-6 active:opacity-90 mb-8">
                        <Text className="text-white font-bold text-xl text-center">
                            Log In
                        </Text>
                    </Pressable>

                    {/* Or continue with */}
                    <View className="items-center mb-6">
                        <Text className="text-gray-500 text-base">Or continue with</Text>
                    </View>

                    {/* Google Sign In Button */}
                    <Pressable className="bg-white border border-gray-300 rounded-xl py-4 px-6 flex-row items-center justify-center active:opacity-90 mb-8">
                        <Text className="text-gray-800 font-bold text-lg mr-2">
                            ⏮️ Sign in with Google
                        </Text>
                    </Pressable>

                    {/* Sign Up Link */}
                    <View className="items-center mt-6">
                        <Text className="text-gray-600 text-base">
                            Don't have an account?{' '}
                            <Pressable onPress={() => router.push('/signUp_page')}>
                                <Text className="text-green-600 font-bold text-base">
                                    Sign up
                                </Text>
                            </Pressable>
                            {/* <Text className="text-green-600 font-bold">Sign up</Text> */}
                        </Text>
                    </View>
                </View>
            </ScrollView>
        </View>
    );
}
