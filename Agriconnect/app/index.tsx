import { BACKGROUNDIMAGE } from '../constants';
import { View, Text, Pressable, ImageBackground, StatusBar } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';

export default function Index() {
    return (
        <View className="flex-1">
            <StatusBar barStyle="light-content" />
            <ImageBackground
                source={BACKGROUNDIMAGE}
                resizeMode="cover"
                className="flex-1"
                style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    width: '100%',
                    height: '100%',
                }}
            >
                <SafeAreaView className="flex-1" edges={['top']}>
                    <View className="px-3 pt-10">
                        <Text className="text-white text-3xl font-bold">AgroConnect</Text>
                    </View>

                    {/* CONTENU EN BAS */}
                    <View className="flex-1 justify-end items-center pb-10 px-6">
                        {/* Overlay pour améliorer la lisibilité */}
                        <View className="bg-black/40 rounded-3xl px-6 py-8 w-full">
                            {/* Titre */}
                            <Text className="text-white text-2xl font-extrabold text-center leading-tight">
                                Connecting Farmers{'\n'}
                                to Markets, Smarter.
                            </Text>

                            {/* Description */}
                            <Text className="text-white/90 mt-4 text-center text-base">
                                A smart digital marketplace connecting farmers,
                                cooperatives, and buyers with secure payments and smart
                                logistics.
                            </Text>

                            {/* Login / Join */}
                            <View className="flex-row gap-4 mt-6 justify-center">
                                <Pressable className="border border-green-500 rounded-xl px-8 py-3">
                                    <Text className="text-green-400 font-semibold">
                                        Login
                                    </Text>
                                </Pressable>

                                <Pressable
                                    onPress={() => router.push('/signUp_page')}
                                    className="border border-green-500 rounded-xl px-8 py-3"
                                >
                                    <Text className="text-green-400 font-semibold">
                                        Join
                                    </Text>
                                </Pressable>
                            </View>

                            {/* Get Started */}
                            <Pressable className="bg-green-600 rounded-2xl py-4 px-16 mt-6 self-center">
                                <Text className="text-white font-bold text-lg">
                                    Get Started
                                </Text>
                            </Pressable>
                        </View>
                    </View>
                </SafeAreaView>
            </ImageBackground>
        </View>
    );
}
