import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, Alert } from 'react-native';
import { HeartIcon, ShoppingCartIcon } from 'react-native-heroicons/outline';
import { HeartIcon as HeartIconSolid } from 'react-native-heroicons/solid';
import { ProductListingCardProps } from '@/interfaces';

const ProductListingCard = ({
    product,
    compact = false,
    onPress,
    onFavoritePress,
    onAddToCart,
    showBuyButton = true,
    style,
}: ProductListingCardProps) => {
    const [isFavorite, setIsFavorite] = useState(product.isFavorite || false);
    const [isAddingToCart, setIsAddingToCart] = useState(false);

    const formatPrice = (price: number) => {
        return `N${price.toLocaleString()}`;
    };

    const handleFavoritePress = () => {
        setIsFavorite(!isFavorite);
        if (onFavoritePress) {
            onFavoritePress(product.id);
        }
    };

    const handleAddToCart = () => {
        setIsAddingToCart(true);
        if (onAddToCart) {
            onAddToCart(product);
        }

        // Simulation d'ajout au panier
        setTimeout(() => {
            setIsAddingToCart(false);
            Alert.alert('Succès', `${product.name} ajouté au panier`);
        }, 500);
    };

    const handlePress = () => {
        if (onPress) {
            onPress();
        }
    };

    if (compact) {
        return (
            <TouchableOpacity
                onPress={handlePress}
                className="bg-white rounded-xl shadow-sm border border-gray-100 p-3 w-40 active:opacity-90"
                style={style}
            >
                <View className="relative mb-2">
                    <View className="w-full h-32 bg-green-50 rounded-lg mb-2 overflow-hidden">
                        {product.imageUrl ? (
                            <Image
                                source={{ uri: product.imageUrl }}
                                className="w-full h-full"
                                resizeMode="cover"
                            />
                        ) : (
                            <View className="w-full h-full items-center justify-center">
                                <Text className="text-gray-400 text-xs">Produit</Text>
                            </View>
                        )}
                    </View>
                    <TouchableOpacity
                        className="absolute top-2 right-2 bg-white/80 p-1 rounded-full"
                        onPress={handleFavoritePress}
                    >
                        {isFavorite ? (
                            <HeartIconSolid size={16} color="#EF4444" />
                        ) : (
                            <HeartIcon size={16} color="#9CA3AF" />
                        )}
                    </TouchableOpacity>

                    {product.rating && (
                        <View className="absolute bottom-2 left-2 bg-white/90 px-2 py-1 rounded-full flex-row items-center">
                            <Text className="text-xs font-bold text-yellow-600">★</Text>
                            <Text className="text-xs font-semibold ml-1">
                                {product.rating}
                            </Text>
                        </View>
                    )}
                </View>

                <Text className="text-lg font-bold text-green-800">
                    {formatPrice(product.price)}
                    <Text className="text-sm font-normal text-gray-500">
                        {' '}
                        /{product.unit}
                    </Text>
                </Text>

                <Text
                    className="text-sm font-medium text-gray-800 mt-1"
                    numberOfLines={1}
                >
                    {product.name}
                </Text>

                <Text className="text-xs text-gray-500 mt-1" numberOfLines={1}>
                    {product.seller}
                </Text>

                {showBuyButton && (
                    <TouchableOpacity
                        className="mt-3 bg-green-600 py-2 rounded-lg flex-row items-center justify-center"
                        onPress={handleAddToCart}
                        disabled={isAddingToCart}
                    >
                        <ShoppingCartIcon size={16} color="#FFFFFF" />
                        <Text className="text-white text-sm font-semibold ml-2">
                            {isAddingToCart ? 'Ajout...' : 'Ajouter'}
                        </Text>
                    </TouchableOpacity>
                )}
            </TouchableOpacity>
        );
    }

    // Version normale
    return (
        <TouchableOpacity
            onPress={handlePress}
            className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 mb-3 active:opacity-90"
            style={style}
        >
            <View className="flex-row">
                <View className="relative mr-4">
                    <View className="w-24 h-24 bg-green-50 rounded-lg overflow-hidden">
                        {product.imageUrl ? (
                            <Image
                                source={{ uri: product.imageUrl }}
                                className="w-full h-full"
                                resizeMode="cover"
                            />
                        ) : (
                            <View className="w-full h-full items-center justify-center">
                                <Text className="text-gray-400">Image</Text>
                            </View>
                        )}
                    </View>
                    <TouchableOpacity
                        className="absolute top-2 right-2 bg-white/80 p-1 rounded-full"
                        onPress={handleFavoritePress}
                    >
                        {isFavorite ? (
                            <HeartIconSolid size={16} color="#EF4444" />
                        ) : (
                            <HeartIcon size={16} color="#9CA3AF" />
                        )}
                    </TouchableOpacity>

                    {!product.inStock && (
                        <View className="absolute bottom-2 left-2 bg-red-500 px-2 py-1 rounded-full">
                            <Text className="text-xs text-white font-semibold">
                                Rupture
                            </Text>
                        </View>
                    )}
                </View>

                <View className="flex-1">
                    <View className="flex-row justify-between items-start">
                        <Text className="text-xl font-bold text-green-800">
                            {formatPrice(product.price)}
                            <Text className="text-base font-normal text-gray-500">
                                {' '}
                                /{product.unit}
                            </Text>
                        </Text>

                        {product.rating && (
                            <View className="flex-row items-center bg-yellow-50 px-2 py-1 rounded-full">
                                <Text className="text-xs font-bold text-yellow-600">
                                    ★
                                </Text>
                                <Text className="text-xs font-semibold ml-1">
                                    {product.rating}
                                </Text>
                                {product.reviews && (
                                    <Text className="text-xs text-gray-500 ml-1">
                                        ({product.reviews})
                                    </Text>
                                )}
                            </View>
                        )}
                    </View>

                    <Text
                        className="text-base font-medium text-gray-800 mt-1"
                        numberOfLines={2}
                    >
                        {product.name}
                    </Text>

                    <Text className="text-sm text-gray-600 mt-1" numberOfLines={2}>
                        {product.description}
                    </Text>

                    <View className="flex-row items-center mt-2">
                        <View className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center mr-2">
                            <Text className="text-green-600 text-xs font-bold">
                                {product.seller.charAt(0)}
                            </Text>
                        </View>
                        <Text className="text-sm text-gray-600">{product.seller}</Text>
                        {product.deliveryTime && (
                            <Text className="text-xs text-gray-500 ml-2">
                                • {product.deliveryTime}
                            </Text>
                        )}
                    </View>

                    <View className="flex-row items-center justify-between mt-3">
                        <TouchableOpacity
                            className="bg-green-600 py-2 px-4 rounded-lg flex-row items-center"
                            onPress={handleAddToCart}
                            disabled={isAddingToCart || !product.inStock}
                        >
                            <ShoppingCartIcon size={16} color="#FFFFFF" />
                            <Text className="text-white text-sm font-semibold ml-2">
                                {isAddingToCart
                                    ? 'Ajout...'
                                    : !product.inStock
                                      ? 'Rupture'
                                      : 'Ajouter'}
                            </Text>
                        </TouchableOpacity>

                        {product.minimumOrder && product.minimumOrder > 1 && (
                            <Text className="text-xs text-gray-500">
                                Min: {product.minimumOrder} {product.unit}
                            </Text>
                        )}
                    </View>
                </View>
            </View>
        </TouchableOpacity>
    );
};

export default ProductListingCard;
