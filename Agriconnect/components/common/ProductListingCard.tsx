// import React, { useState } from 'react';
// import { View, Text, Image, TouchableOpacity, Alert } from 'react-native';
// import { HeartIcon, ShoppingCartIcon } from 'react-native-heroicons/outline';
// import { HeartIcon as HeartIconSolid } from 'react-native-heroicons/solid';
// import { ProductListingCardProps } from '@/interfaces';
// import { useWindowDimensions } from 'react-native';

// const ProductListingCard = ({
//     product,
//     compact = false,
//     onPress,
//     onFavoritePress,
//     onAddToCart,
//     showBuyButton = true,
//     style,
//  }: ProductListingCardProps) => {

//     const [isFavorite, setIsFavorite] = useState(product.isFavorite || false);
//     const [isAddingToCart, setIsAddingToCart] = useState(false);

//     const formatPrice = (price: number) => {
//         return `N${price.toLocaleString()}`;
//     };

//     const handleFavoritePress = () => {
//         setIsFavorite(!isFavorite);
//         if (onFavoritePress) {
//             onFavoritePress(product.id);
//         }
//     };

//     const handleAddToCart = () => {
//         setIsAddingToCart(true);
//         if (onAddToCart) {
//             onAddToCart(product);
//         }

//         // Simulation d'ajout au panier
//         setTimeout(() => {
//             setIsAddingToCart(false);
//             Alert.alert('Succès', `${product.name} ajouté au panier`);
//         }, 500);
//     };

//     const handlePress = () => {
//         if (onPress) {
//             onPress();
//         }
//     };

//     if (compact) {
//         return (
//             <TouchableOpacity
//                 onPress={handlePress}
//                 className="bg-white rounded-xl shadow-sm border border-gray-100 p-3 w-40 active:opacity-90"
//                 style={style}
//             >
//                 <View className="relative mb-2">
//                     <View className="w-full h-32 bg-green-50 rounded-lg mb-2 overflow-hidden">
//                         {product.imageUrl ? (
//                             <Image
//                                 source={{ uri: product.imageUrl }}
//                                 className="w-full h-full"
//                                 resizeMode="cover"
//                             />
//                         ) : (
//                             <View className="w-full h-full items-center justify-center">
//                                 <Text className="text-gray-400 text-xs">Produit</Text>
//                             </View>
//                         )}
//                     </View>
//                     <TouchableOpacity
//                         className="absolute top-2 right-2 bg-white/80 p-1 rounded-full"
//                         onPress={handleFavoritePress}
//                     >
//                         {isFavorite ? (
//                             <HeartIconSolid size={16} color="#EF4444" />
//                         ) : (
//                             <HeartIcon size={16} color="#9CA3AF" />
//                         )}
//                     </TouchableOpacity>

//                     {product.rating && (
//                         <View className="absolute bottom-2 left-2 bg-white/90 px-2 py-1 rounded-full flex-row items-center">
//                             <Text className="text-xs font-bold text-yellow-600">★</Text>
//                             <Text className="text-xs font-semibold ml-1">
//                                 {product.rating}
//                             </Text>
//                         </View>
//                     )}
//                 </View>

//                 <Text className="text-lg font-bold text-green-800">
//                     {formatPrice(product.price)}
//                     <Text className="text-sm font-normal text-gray-500">
//                         {' '}
//                         /{product.unit}
//                     </Text>
//                 </Text>

//                 <Text
//                     className="text-sm font-medium text-gray-800 mt-1"
//                     numberOfLines={1}
//                 >
//                     {product.name}
//                 </Text>

//                 <Text className="text-xs text-gray-500 mt-1" numberOfLines={1}>
//                     {product.seller}
//                 </Text>

//                 {showBuyButton && (
//                     <TouchableOpacity
//                         className="mt-3 bg-green-600 py-2 rounded-lg flex-row items-center justify-center"
//                         onPress={handleAddToCart}
//                         disabled={isAddingToCart}
//                     >
//                         <ShoppingCartIcon size={16} color="#FFFFFF" />
//                         <Text className="text-white text-sm font-semibold ml-2">
//                             {isAddingToCart ? 'Ajout...' : 'Ajouter'}
//                         </Text>
//                     </TouchableOpacity>
//                 )}
//             </TouchableOpacity>
//         );
//     }

//     // Version normale
//     return (
//         <TouchableOpacity
//             onPress={handlePress}
//             className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 mb-3 active:opacity-90"
//             style={style}
//         >
//             <View className="flex-row">
//                 <View className="relative mr-4">
//                     <View className="w-24 h-24 bg-green-50 rounded-lg overflow-hidden">
//                         {product.imageUrl ? (
//                             <Image
//                                 source={{ uri: product.imageUrl }}
//                                 className="w-full h-full"
//                                 resizeMode="cover"
//                             />
//                         ) : (
//                             <View className="w-full h-full items-center justify-center">
//                                 <Text className="text-gray-400">Image</Text>
//                             </View>
//                         )}
//                     </View>
//                     <TouchableOpacity
//                         className="absolute top-2 right-2 bg-white/80 p-1 rounded-full"
//                         onPress={handleFavoritePress}
//                     >
//                         {isFavorite ? (
//                             <HeartIconSolid size={16} color="#EF4444" />
//                         ) : (
//                             <HeartIcon size={16} color="#9CA3AF" />
//                         )}
//                     </TouchableOpacity>

//                     {!product.inStock && (
//                         <View className="absolute bottom-2 left-2 bg-red-500 px-2 py-1 rounded-full">
//                             <Text className="text-xs text-white font-semibold">
//                                 Rupture
//                             </Text>
//                         </View>
//                     )}
//                 </View>

//                 <View className="flex-1">
//                     <View className="flex-row justify-between items-start">
//                         <Text className="text-xl font-bold text-green-800">
//                             {formatPrice(product.price)}
//                             <Text className="text-base font-normal text-gray-500">
//                                 {' '}
//                                 /{product.unit}
//                             </Text>
//                         </Text>

//                         {product.rating && (
//                             <View className="flex-row items-center bg-yellow-50 px-2 py-1 rounded-full">
//                                 <Text className="text-xs font-bold text-yellow-600">
//                                     ★
//                                 </Text>
//                                 <Text className="text-xs font-semibold ml-1">
//                                     {product.rating}
//                                 </Text>
//                                 {product.reviews && (
//                                     <Text className="text-xs text-gray-500 ml-1">
//                                         ({product.reviews})
//                                     </Text>
//                                 )}
//                             </View>
//                         )}
//                     </View>

//                     <Text
//                         className="text-base font-medium text-gray-800 mt-1"
//                         numberOfLines={2}
//                     >
//                         {product.name}
//                     </Text>

//                     <Text className="text-sm text-gray-600 mt-1" numberOfLines={2}>
//                         {product.description}
//                     </Text>

//                     <View className="flex-row items-center mt-2">
//                         <View className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center mr-2">
//                             <Text className="text-green-600 text-xs font-bold">
//                                 {product.seller.charAt(0)}
//                             </Text>
//                         </View>
//                         <Text className="text-sm text-gray-600">{product.seller}</Text>
//                         {product.deliveryTime && (
//                             <Text className="text-xs text-gray-500 ml-2">
//                                 • {product.deliveryTime}
//                             </Text>
//                         )}
//                     </View>

//                     <View className="flex-row items-center justify-between mt-3">
//                         <TouchableOpacity
//                             className="bg-green-600 py-2 px-4 rounded-lg flex-row items-center"
//                             onPress={handleAddToCart}
//                             disabled={isAddingToCart || !product.inStock}
//                         >
//                             <ShoppingCartIcon size={16} color="#FFFFFF" />
//                             <Text className="text-white text-sm font-semibold ml-2">
//                                 {isAddingToCart
//                                     ? 'Ajout...'
//                                     : !product.inStock
//                                       ? 'Rupture'
//                                       : 'Ajouter'}
//                             </Text>
//                         </TouchableOpacity>

//                         {product.minimumOrder && product.minimumOrder > 1 && (
//                             <Text className="text-xs text-gray-500">
//                                 Min: {product.minimumOrder} {product.unit}
//                             </Text>
//                         )}
//                     </View>
//                 </View>
//             </View>
//         </TouchableOpacity>
//     );
// };

// export default ProductListingCard;

// ===========================================================

import React, { useState } from 'react';
import {
    View,
    Text,
    Image,
    TouchableOpacity,
    Alert,
    useWindowDimensions,
} from 'react-native';
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
    const { width } = useWindowDimensions();
    const [isFavorite, setIsFavorite] = useState(product.isFavorite || false);
    const [isAddingToCart, setIsAddingToCart] = useState(false);

    // Définir des interfaces pour les tailles
    interface CompactSizes {
        imageHeight: number;
        fontSize: string;
        priceSize: string;
        sellerSize: string;
        buttonPadding: string;
        buttonText: string;
        iconSize: number;
        avatarSize: number;
        ratingSize: string;
    }

    interface NormalSizes {
        imageSize: number;
        fontSize: string;
        priceSize: string;
        sellerSize: string;
        buttonPadding: string;
        buttonText: string;
        iconSize: number;
        avatarSize: number;
        ratingSize: string;
    }

    type ResponsiveSizes = {
        compact: CompactSizes;
        normal: NormalSizes;
    };

    // Déterminer les tailles responsives
    const getResponsiveSizes = (): ResponsiveSizes => {
        // Pour les écrans larges (tablettes et plus)
        if (width >= 768) {
            return {
                compact: {
                    imageHeight: 160, // Plus grande sur tablette
                    fontSize: 'text-base',
                    priceSize: 'text-xl',
                    sellerSize: 'text-sm',
                    buttonPadding: 'py-2 px-4',
                    buttonText: 'text-sm',
                    iconSize: 18,
                    avatarSize: 20,
                    ratingSize: 'text-xs',
                },
                normal: {
                    imageSize: 140, // Plus grande sur tablette
                    fontSize: 'text-lg',
                    priceSize: 'text-2xl',
                    sellerSize: 'text-base',
                    buttonPadding: 'py-3 px-5',
                    buttonText: 'text-base',
                    iconSize: 20,
                    avatarSize: 24,
                    ratingSize: 'text-sm',
                },
            };
        }

        // Pour les mobiles
        return {
            compact: {
                imageHeight: 130,
                fontSize: 'text-sm',
                priceSize: 'text-lg',
                sellerSize: 'text-xs',
                buttonPadding: 'py-1.5 px-3',
                buttonText: 'text-xs',
                iconSize: 16,
                avatarSize: 18,
                ratingSize: 'text-xs',
            },
            normal: {
                imageSize: 100,
                fontSize: 'text-base',
                priceSize: 'text-xl',
                sellerSize: 'text-sm',
                buttonPadding: 'py-2 px-4',
                buttonText: 'text-sm',
                iconSize: 18,
                avatarSize: 22,
                ratingSize: 'text-xs',
            },
        };
    };

    const sizes = getResponsiveSizes();

    // Utiliser l'assertion de type pour dire à TypeScript quel type nous avons
    const responsiveSizes = compact ? sizes.compact : sizes.normal;

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
            Alert.alert('Success', `${product.name} added to cart`);
        }, 500);
    };

    const handlePress = () => {
        if (onPress) {
            onPress();
        }
    };

    if (compact) {
        // Ici TypeScript sait que responsiveSizes est de type CompactSizes
        const compactSizes = responsiveSizes as CompactSizes;

        return (
            <TouchableOpacity
                onPress={handlePress}
                className="bg-white rounded-xl shadow-sm border border-gray-100 active:opacity-90"
                style={[style, { width: '100%' }]}
            >
                <View className="relative">
                    {/* Image du produit */}
                    <View
                        className="bg-green-50 rounded-t-xl overflow-hidden"
                        style={{ height: compactSizes.imageHeight }}
                    >
                        {product.imageUrl ? (
                            <Image
                                source={{ uri: product.imageUrl }}
                                className="w-full h-full"
                                resizeMode="cover"
                            />
                        ) : (
                            <View className="w-full h-full items-center justify-center bg-gradient-to-b from-green-50 to-green-100">
                                <Text className="text-gray-400 text-sm">
                                    Product Image
                                </Text>
                            </View>
                        )}
                    </View>

                    {/* Bouton favori */}
                    <TouchableOpacity
                        className="absolute top-2 right-2 bg-white/90 p-1.5 rounded-full shadow-sm"
                        onPress={handleFavoritePress}
                    >
                        {isFavorite ? (
                            <HeartIconSolid
                                size={compactSizes.iconSize}
                                color="#EF4444"
                            />
                        ) : (
                            <HeartIcon size={compactSizes.iconSize} color="#9CA3AF" />
                        )}
                    </TouchableOpacity>

                    {/* Note du produit */}
                    {product.rating && (
                        <View className="absolute bottom-2 left-2 bg-white/90 px-2 py-1 rounded-full flex-row items-center shadow-sm">
                            <Text className="text-yellow-500 text-xs">★</Text>
                            <Text
                                className={`font-semibold ml-1 ${compactSizes.ratingSize}`}
                            >
                                {product.rating.toFixed(1)}
                            </Text>
                        </View>
                    )}

                    {/* Indicateur de stock */}
                    {!product.inStock && (
                        <View className="absolute top-2 left-2 bg-red-500 px-2 py-1 rounded-full">
                            <Text className="text-white text-xs font-semibold">
                                Out of Stock
                            </Text>
                        </View>
                    )}
                </View>

                {/* Informations du produit */}
                <View className="p-3">
                    {/* Prix */}
                    <Text
                        className={`font-bold text-green-800 ${compactSizes.priceSize}`}
                    >
                        {formatPrice(product.price)}
                        <Text className="text-gray-500 font-normal">
                            {' '}
                            /{product.unit}
                        </Text>
                    </Text>

                    {/* Nom du produit */}
                    <Text
                        className={`font-medium text-gray-800 mt-1 ${compactSizes.fontSize}`}
                        numberOfLines={1}
                    >
                        {product.name}
                    </Text>

                    {/* Vendeur */}
                    <Text
                        className={`text-gray-500 mt-1 ${compactSizes.sellerSize}`}
                        numberOfLines={1}
                    >
                        {product.seller}
                    </Text>

                    {/* Bouton Ajouter au panier */}
                    {showBuyButton && product.inStock && (
                        <TouchableOpacity
                            className={`mt-3 bg-green-600 rounded-lg flex-row items-center justify-center ${compactSizes.buttonPadding}`}
                            onPress={handleAddToCart}
                            disabled={isAddingToCart}
                        >
                            <ShoppingCartIcon
                                size={compactSizes.iconSize}
                                color="#FFFFFF"
                            />
                            <Text
                                className={`text-white font-semibold ml-2 ${compactSizes.buttonText}`}
                            >
                                {isAddingToCart ? 'Adding...' : 'Add to Cart'}
                            </Text>
                        </TouchableOpacity>
                    )}

                    {/* Si hors stock */}
                    {!product.inStock && (
                        <View className="mt-3 border border-gray-300 rounded-lg px-3 py-2">
                            <Text className="text-gray-500 text-center text-sm">
                                Out of Stock
                            </Text>
                        </View>
                    )}
                </View>
            </TouchableOpacity>
        );
    }

    // Version normale (détail)
    // Ici TypeScript sait que responsiveSizes est de type NormalSizes
    const normalSizes = responsiveSizes as NormalSizes;

    return (
        <TouchableOpacity
            onPress={handlePress}
            className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 mb-3 active:opacity-90"
            style={style}
        >
            <View className="flex-row">
                {/* Image du produit */}
                <View className="relative mr-4">
                    <View
                        className="bg-green-50 rounded-lg overflow-hidden"
                        style={{
                            width: normalSizes.imageSize,
                            height: normalSizes.imageSize,
                        }}
                    >
                        {product.imageUrl ? (
                            <Image
                                source={{ uri: product.imageUrl }}
                                className="w-full h-full"
                                resizeMode="cover"
                            />
                        ) : (
                            <View className="w-full h-full items-center justify-center bg-gradient-to-br from-green-50 to-green-100">
                                <Text className="text-gray-400">Product Image</Text>
                            </View>
                        )}
                    </View>

                    {/* Bouton favori */}
                    <TouchableOpacity
                        className="absolute top-2 right-2 bg-white/90 p-1.5 rounded-full shadow-sm"
                        onPress={handleFavoritePress}
                    >
                        {isFavorite ? (
                            <HeartIconSolid size={normalSizes.iconSize} color="#EF4444" />
                        ) : (
                            <HeartIcon size={normalSizes.iconSize} color="#9CA3AF" />
                        )}
                    </TouchableOpacity>

                    {/* Indicateur de stock */}
                    {!product.inStock && (
                        <View className="absolute bottom-2 left-2 bg-red-500 px-2 py-1 rounded-full">
                            <Text className="text-white text-xs font-semibold">
                                Out of Stock
                            </Text>
                        </View>
                    )}
                </View>

                {/* Informations détaillées */}
                <View className="flex-1">
                    {/* En-tête avec prix et note */}
                    <View className="flex-row justify-between items-start">
                        <View>
                            <Text
                                className={`font-bold text-green-800 ${normalSizes.priceSize}`}
                            >
                                {formatPrice(product.price)}
                                <Text className="text-gray-500 font-normal">
                                    {' '}
                                    /{product.unit}
                                </Text>
                            </Text>

                            {/* Nom du produit */}
                            <Text
                                className={`font-medium text-gray-800 mt-1 ${normalSizes.fontSize}`}
                                numberOfLines={2}
                            >
                                {product.name}
                            </Text>
                        </View>

                        {/* Note et avis */}
                        {product.rating && (
                            <View className="flex-row items-center bg-yellow-50 px-2 py-1 rounded-full">
                                <Text className="text-yellow-600 text-xs">★</Text>
                                <Text
                                    className={`font-semibold ml-1 ${normalSizes.ratingSize}`}
                                >
                                    {product.rating.toFixed(1)}
                                </Text>
                                {product.reviews && (
                                    <Text className="text-gray-500 text-xs ml-1">
                                        ({product.reviews})
                                    </Text>
                                )}
                            </View>
                        )}
                    </View>

                    {/* Description */}
                    <Text
                        className={`text-gray-600 mt-2 ${normalSizes.sellerSize}`}
                        numberOfLines={2}
                    >
                        {product.description || 'Fresh from the farm'}
                    </Text>

                    {/* Vendeur et délai de livraison */}
                    <View className="flex-row items-center mt-3">
                        <View
                            className="rounded-full bg-green-100 flex items-center justify-center mr-2"
                            style={{
                                width: normalSizes.avatarSize,
                                height: normalSizes.avatarSize,
                            }}
                        >
                            <Text className="text-green-700 font-bold text-xs">
                                {product.seller.charAt(0)}
                            </Text>
                        </View>
                        <Text className={`text-gray-600 ${normalSizes.sellerSize}`}>
                            {product.seller}
                        </Text>
                        {product.deliveryTime && (
                            <Text className="text-gray-500 text-xs ml-2">
                                • {product.deliveryTime}
                            </Text>
                        )}
                    </View>

                    {/* Actions et informations supplémentaires */}
                    <View className="flex-row items-center justify-between mt-4">
                        {/* Bouton Ajouter au panier */}
                        {showBuyButton && (
                            <TouchableOpacity
                                className={`bg-green-600 rounded-lg flex-row items-center ${normalSizes.buttonPadding}`}
                                onPress={handleAddToCart}
                                disabled={isAddingToCart || !product.inStock}
                            >
                                <ShoppingCartIcon
                                    size={normalSizes.iconSize}
                                    color="#FFFFFF"
                                />
                                <Text
                                    className={`text-white font-semibold ml-2 ${normalSizes.buttonText}`}
                                >
                                    {isAddingToCart
                                        ? 'Adding...'
                                        : !product.inStock
                                          ? 'Out of Stock'
                                          : 'Add to Cart'}
                                </Text>
                            </TouchableOpacity>
                        )}

                        {/* Informations supplémentaires */}
                        <View className="flex-row items-center">
                            {product.minimumOrder && product.minimumOrder > 1 && (
                                <Text
                                    className={`text-gray-500 ${normalSizes.sellerSize}`}
                                >
                                    Min: {product.minimumOrder}
                                </Text>
                            )}

                            {/* Tags */}
                            {product.tags && product.tags.length > 0 && (
                                <View className="flex-row flex-wrap ml-2">
                                    {product.tags.slice(0, 2).map((tag, index) => (
                                        <View
                                            key={index}
                                            className="bg-gray-100 px-2 py-1 rounded-full mr-1"
                                        >
                                            <Text className="text-gray-600 text-xs">
                                                {tag}
                                            </Text>
                                        </View>
                                    ))}
                                </View>
                            )}
                        </View>
                    </View>

                    {/* Indicateur de fraîcheur */}
                    {product.createdAt && (
                        <View className="mt-2">
                            <Text className="text-green-600 text-xs">
                                🕒 Listed{' '}
                                {new Date(product.createdAt).toLocaleDateString()}
                            </Text>
                        </View>
                    )}
                </View>
            </View>
        </TouchableOpacity>
    );
};

export default ProductListingCard;
