import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, Alert } from 'react-native';
import { HeartIcon } from 'react-native-heroicons/outline';
import { HeartIcon as HeartIconSolid } from 'react-native-heroicons/solid';
import { MANGO_IMAGE } from '@/constants';


const ProductCard = () => {
  const [isFavorite, setIsFavorite] = useState(false);
  const [quantity, setQuantity] = useState(1);

  const handleBuy = () => {
    Alert.alert(
      'Confirmation',
      `Acheter ${quantity} caisse(s) de Sweet Yellow Mango pour N${1200 * quantity}?`,
      [
        { text: 'Annuler', style: 'cancel' },
        { text: 'Confirmer', onPress: () => console.log('Achat confirmé') }
      ]
    );
  };

  return (
    <View className="bg-white rounded-2xl shadow-2xl overflow-hidden w-72 mx-auto my-4 border border-gray-100">
      {/* En-tête avec image et bouton favori */}
      <View className="relative">
        <Image
          source={MANGO_IMAGE}
          className="w-full h-40"
          resizeMode="cover"
        />
        <TouchableOpacity
          className="absolute top-3 right-3 bg-white/80 p-2 rounded-full"
          onPress={() => setIsFavorite(!isFavorite)}
        >
          {isFavorite ? (
            <HeartIconSolid size={24} color="#EF4444" />
          ) : (
            <HeartIcon size={24} color="#6B7280" />
          )}
        </TouchableOpacity>
        
        {/* Badge promo optionnel */}
        <View className="absolute top-3 left-3 bg-red-500 px-3 py-1 rounded-full">
          <Text className="text-white text-xs font-bold">Fresh</Text>
        </View>
      </View>
      
      {/* Contenu */}
      <View className="p-5">
        {/* Prix et unité */}
        <View className="flex-row items-baseline mb-2">
          <Text className="text-3xl font-extrabold text-green-700">N1,200</Text>
          <Text className="text-gray-500 ml-2">/crate</Text>
        </View>
        
        {/* Nom du produit */}
        <Text className="text-xl font-bold text-gray-900 mb-1">
          Sweet Yellow Mango
        </Text>
        
        {/* Description courte */}
        <Text className="text-gray-600 text-sm mb-1">
          Premium quality, sweet and juicy
        </Text>
        
        {/* Points de suspension stylisés */}
        <View className="flex-row mb-4">
          {[...Array(3)].map((_, i) => (
            <View key={i} className="w-1 h-1 rounded-full bg-yellow-500 mx-1" />
          ))}
        </View>
        
        {/* Vendeur */}
        <View className="flex-row items-center mb-6">
          <View className="w-10 h-10 rounded-full bg-green-50 border-2 border-green-200 flex items-center justify-center mr-3">
            <Text className="text-green-700 font-bold text-lg">A</Text>
          </View>
          <View>
            <Text className="text-gray-900 font-medium">Ada Agro Coop</Text>
            <Text className="text-green-600 text-sm">★★★★☆ 4.2</Text>
          </View>
        </View>
        
        {/* Contrôle quantité et bouton d'achat */}
        <View className="flex-row items-center justify-between">
          <View className="flex-row items-center border border-gray-300 rounded-lg">
            <TouchableOpacity 
              className="px-4 py-2"
              onPress={() => setQuantity(Math.max(1, quantity - 1))}
            >
              <Text className="text-xl text-gray-600">−</Text>
            </TouchableOpacity>
            <Text className="px-4 py-2 text-lg font-semibold">{quantity}</Text>
            <TouchableOpacity 
              className="px-4 py-2"
              onPress={() => setQuantity(quantity + 1)}
            >
              <Text className="text-xl text-gray-600">+</Text>
            </TouchableOpacity>
          </View>
          
          <TouchableOpacity 
            className="bg-green-600 px-6 py-3 rounded-xl flex-1 ml-4"
            onPress={handleBuy}
          >
            <Text className="text-white text-center font-bold text-lg">Acheter</Text>
            <Text className="text-white/90 text-center text-sm">
              N{1200 * quantity}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default ProductCard;