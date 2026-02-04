// import {
//     View,
//     Text,
//     Pressable,
//     TextInput,
//     ScrollView,
//     StatusBar,
//     ImageBackground,
//     Dimensions,
//     Platform,
// } from 'react-native';
// import { useState } from 'react';
// import { SafeAreaView } from 'react-native-safe-area-context';
// import { FARMER_IMAGE } from '@/constants';

// const { width } = Dimensions.get('window');

// export default function OnboardingHome() {
//     const [selectedOption, setSelectedOption] = useState<string>('phone');
//     const [phoneNumber, setPhoneNumber] = useState<string>('');
//     const [email, setEmail] = useState<string>('');

//     return (
//         <ScrollView
//             className="flex-1 bg-white p-5"
//             contentContainerStyle={{ flexGrow: 1 }}
//         >
//             <StatusBar barStyle="light-content" />

//             {/* Header avec image d'arrière-plan */}
//             <ImageBackground
//                 source={FARMER_IMAGE}
//                 resizeMode="cover"
//                 className="w-full"
//                 style={{
//                     width: '100%',
//                     height: width * 0.6,
//                     paddingTop: Platform.OS === 'ios' ? 50 : 30, // Padding manuel
//                 }}
//                 // style={{ height: width * 0.6 }} // Hauteur proportionnelle à la largeur
//             >
//                 {/* Overlay sombre pour améliorer la lisibilité */}
//                 <View className="absolute inset-0 bg-black/40" />

//                 <SafeAreaView className="flex-1">
//                     <View className="px-6 pt-8 pb-10">
//                         {/* Titre AgriConnect */}
//                         <Text className="text-4xl font-bold text-white mb-3">
//                             AgriConnect
//                         </Text>

//                         {/* Sous-titre */}
//                         <Text className="text-2xl font-bold text-white mb-4">
//                             Connecting Farmers to Markets, Smarter.
//                         </Text>

//                         {/* Description */}
//                         <Text className="text-white/90 text-base leading-6">
//                             Create your account to sell harvests, place orders, and track
//                             logistics securely in one place.
//                         </Text>
//                     </View>
//                 </SafeAreaView>
//             </ImageBackground>

//             {/* Reste du contenu */}
//             <SafeAreaView className="flex-1 px-6 pt-6 pb-10">
//                 {/* Divider */}
//                 <View className="h-px bg-gray-300 mb-6" />

//                 {/* Role Selection */}
//                 <View className="mb-8">
//                     <Text className="text-lg font-semibold text-gray-700 mb-4">
//                         Farmer | Buyer | Admin access
//                     </Text>
//                     <View className="flex-row justify-between">
//                         {['Farmer', 'Buyer', 'Admin'].map(role => (
//                             <Pressable
//                                 key={role}
//                                 className="border border-green-600 rounded-xl px-4 py-3 flex-1 mx-1"
//                             >
//                                 <Text className="text-green-700 font-medium text-center">
//                                     {role}
//                                 </Text>
//                             </Pressable>
//                         ))}
//                     </View>
//                 </View>

//                 {/* Sign Up Methods */}
//                 <View className="mb-8">
//                     <Text className="text-xl font-bold text-gray-800 mb-6">
//                         Sign up with phone number
//                     </Text>

//                     {/* Phone Input */}
//                     <View className="mb-6">
//                         <View className="flex-row items-center border border-gray-400 rounded-xl px-4 py-3 mb-3">
//                             <Text className="text-xl mr-2">📞</Text>
//                             <TextInput
//                                 className="flex-1 text-base"
//                                 placeholder="Enter mobile number"
//                                 keyboardType="phone-pad"
//                                 value={phoneNumber}
//                                 onChangeText={setPhoneNumber}
//                             />
//                         </View>
//                         <Text className="text-gray-500 text-center">or</Text>
//                     </View>

//                     {/* Email Input */}
//                     <Text className="text-xl font-bold text-gray-800 mb-4">
//                         Sign up with email
//                     </Text>
//                     <View className="flex-row items-center border border-gray-400 rounded-xl px-4 py-3 mb-6">
//                         <Text className="text-xl mr-2">📧</Text>
//                         <TextInput
//                             className="flex-1 text-base"
//                             placeholder="name@example.com"
//                             keyboardType="email-address"
//                             value={email}
//                             onChangeText={setEmail}
//                         />
//                     </View>
//                 </View>

//                 {/* Buttons */}
//                 <View className="space-y-4 mb-8">
//                     <Pressable className="bg-green-600 rounded-xl py-4 px-6 active:opacity-90">
//                         <Text className="text-white font-bold text-lg text-center">
//                             Continue with phone
//                         </Text>
//                     </Pressable>

//                     <Pressable className="bg-white border border-gray-300 rounded-xl py-4 px-6 active:opacity-90">
//                         <Text className="text-gray-800 font-bold text-lg text-center">
//                             Continue with email
//                         </Text>
//                     </Pressable>

//                     <Pressable className="bg-white border border-gray-300 rounded-xl py-4 px-6 flex-row items-center justify-center active:opacity-90">
//                         <Text className="text-gray-800 font-bold text-lg mr-2">
//                             Continue with Gmail
//                         </Text>
//                     </Pressable>
//                 </View>

//                 {/* Login Link */}
//                 <View className="items-center mb-10">
//                     <Text className="text-gray-600">
//                         Already have an account?{' '}
//                         <Text className="text-green-600 font-bold">Login</Text>
//                     </Text>
//                 </View>

//                 {/* Footer Note */}
//                 <View className="bg-gray-100 rounded-xl p-5">
//                     <Text className="text-gray-600 text-sm leading-6 text-center">
//                         Accounts are shared across AgriConnect: your listings, orders, and
//                         access will follow you whether you are a Farmer, Buyer, or
//                         Administrator.
//                     </Text>
//                 </View>
//             </SafeAreaView>
//         </ScrollView>
//     );
// }

import {
    View,
    Text,
    Pressable,
    TextInput,
    FlatList,
    StatusBar,
    ImageBackground,
    Dimensions,
} from 'react-native';
import { FARMER_IMAGE } from '@/constants';
import { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';

const { width } = Dimensions.get('window');
const HEADER_HEIGHT = width * 0.6;

export default function OnboardingHome() {
    const [selectedOption, setSelectedOption] = useState<string>('phone');
    const [phoneNumber, setPhoneNumber] = useState<string>('');
    const [email, setEmail] = useState<string>('');

    const formContent = () => (
        <View className="bg-white rounded-t-3xl -mt-6 pt-6 px-6 pb-10">

            {/* Divider */}

            <View className="h-px bg-gray-300 mb-6" />

            {/* Role Selection */}

            <View className="mb-8">
                <Text className="text-lg font-semibold text-gray-700 mb-4">
                    Farmer | Buyer | Admin access
                </Text>
                <View className="flex-row justify-between">
                    {['Farmer', 'Buyer', 'Admin'].map(role => (
                        <Pressable
                            key={role}
                            className="border border-green-600 rounded-xl px-4 py-3 flex-1 mx-1"
                        >
                            <Text className="text-green-700 font-medium text-center">
                                {role}
                            </Text>
                        </Pressable>
                    ))}
                </View>
            </View>

            {/* Sign Up Methods */}

            <View className="mb-8">
                <Text className="text-xl font-bold text-gray-800 mb-6">
                    Sign up with phone number
                </Text>

                {/* Phone Input */}

                <View className="mb-6">
                    <View className="flex-row items-center border border-gray-400 rounded-xl px-4 py-3 mb-3">
                        <Text className="text-xl mr-2">📞</Text>
                        <TextInput
                            className="flex-1 text-base"
                            placeholder="Enter mobile number"
                            keyboardType="phone-pad"
                            value={phoneNumber}
                            onChangeText={setPhoneNumber}
                        />
                    </View>
                    <Text className="text-gray-500 text-center">or</Text>
                </View>

                {/* Email Input */}

                <Text className="text-xl font-bold text-gray-800 mb-4">
                    Sign up with email
                </Text>
                <View className="flex-row items-center border border-gray-400 rounded-xl px-4 py-3 mb-6">
                    <Text className="text-xl mr-2">📧</Text>
                    <TextInput
                        className="flex-1 text-base"
                        placeholder="name@example.com"
                        keyboardType="email-address"
                        value={email}
                        onChangeText={setEmail}
                    />
                </View>
            </View>

            {/* Buttons */}

            <View className="space-y-4 mb-8">
                <Pressable className="bg-green-600 rounded-xl py-4 px-6 active:opacity-90">
                    <Text className="text-white font-bold text-lg text-center">
                        Continue with phone
                    </Text>
                </Pressable>

                <Pressable className="bg-white border border-gray-300 rounded-xl py-4 px-6 active:opacity-90">
                    <Text className="text-gray-800 font-bold text-lg text-center">
                        Continue with email
                    </Text>
                </Pressable>

                <Pressable className="bg-white border border-gray-300 rounded-xl py-4 px-6 flex-row items-center justify-center active:opacity-90">
                    <Text className="text-gray-800 font-bold text-lg mr-2">
                        Continue with Gmail
                    </Text>
                </Pressable>
            </View>

            {/* Login Link */}

            <View className="items-center mb-10">
                <Text className="text-gray-600">
                    Already have an account?{' '}
                    <Pressable onPress={() => router.push('/login')}>
                        <Text className="text-green-600 font-bold">Login</Text>
                    </Pressable>
                </Text>
            </View>

            {/* Footer Note */}

            <View className="bg-gray-100 rounded-xl p-5">
                <Text className="text-gray-600 text-sm leading-6 text-center">
                    Accounts are shared across AgriConnect: your listings, orders, and
                    access will follow you whether you are a Farmer, Buyer, or
                    Administrator.
                </Text>
            </View>
        </View>
    );

    return (
        <View className="flex-1 bg-white">
            <StatusBar barStyle="light-content" />

            {/* Header FIXE (non-scrollable) */}
            
            <View className="absolute top-0 left-0 right-0 z-10">
                <ImageBackground
                    source={FARMER_IMAGE}
                    resizeMode="cover"
                    style={{
                        height: HEADER_HEIGHT,
                        width: '100%',
                    }}
                >
                    <View className="absolute inset-0 bg-black/40" />

                    <SafeAreaView className="flex-1">
                        <View className="px-6 pt-8 pb-10">
                            <Text className="text-4xl font-bold text-white mb-3">
                                AgriConnect
                            </Text>
                            <Text className="text-2xl font-bold text-white mb-4">
                                Connecting Farmers to Markets, Smarter.
                            </Text>
                            <Text className="text-white/90 text-base leading-6">
                                Create your account to sell harvests, place orders, and
                                track logistics securely in one place.
                            </Text>
                        </View>
                    </SafeAreaView>
                </ImageBackground>
            </View>

            {/* FlatList pour le formulaire SEULEMENT */}
            <FlatList
                data={[1]} // Une seule item pour le contenu
                keyExtractor={() => 'form-content'}
                renderItem={formContent}
                contentContainerStyle={{
                    paddingTop: HEADER_HEIGHT, // Espace pour l'image fixe
                    flexGrow: 1,
                }}
                showsVerticalScrollIndicator={false}
                bounces={true}
                className="flex-1"
            />
        </View>
    );
}
