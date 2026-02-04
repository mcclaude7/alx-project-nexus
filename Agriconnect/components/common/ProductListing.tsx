import React from 'react';
import {
    View,
    Text,
    ScrollView,
    TouchableOpacity,
    ActivityIndicator,
    RefreshControl,
} from 'react-native';
import ProductListingCard from './ProductListingCard';
import { ProductListingProps } from '@/interfaces';

const ProductListing = ({
    products,
    title,
    showViewAll = false,
    horizontal = false,
    onViewAllPress,
    onProductPress,
    loading = false,
    emptyMessage = 'Aucun produit disponible',
    columns = 2,
    showCategoryFilter = false,
}: ProductListingProps) => {
    const renderGrid = () => {
        const rows = [];
        for (let i = 0; i < products.length; i += columns) {
            const rowProducts = products.slice(i, i + columns);
            rows.push(
                <View key={i} className="flex-row justify-between mb-4">
                    {rowProducts.map((product, index) => (
                        <View
                            key={product.id}
                            className={`${columns === 2 ? 'w-[48%]' : 'w-[31%]'}`}
                        >
                            <ProductListingCard
                                product={product}
                                compact
                                onPress={() => onProductPress && onProductPress(product)}
                                onFavoritePress={() =>
                                    console.log('Favorite:', product.id)
                                }
                                onAddToCart={() =>
                                    console.log('Add to cart:', product.id)
                                }
                            />
                        </View>
                    ))}
                    {/* Remplir les cases vides pour l'alignement */}
                    {rowProducts.length < columns &&
                        Array(columns - rowProducts.length)
                            .fill(0)
                            .map((_, index) => (
                                <View
                                    key={`empty-${index}`}
                                    className={`${columns === 2 ? 'w-[48%]' : 'w-[31%]'}`}
                                />
                            ))}
                </View>,
            );
        }
        return rows;
    };

    if (loading) {
        return (
            <View className="py-10">
                <ActivityIndicator size="large" color="#10B981" />
                <Text className="text-center text-gray-500 mt-2">
                    Chargement des produits...
                </Text>
            </View>
        );
    }

    if (!products || products.length === 0) {
        return (
            <View className="p-4">
                <Text className="text-gray-500 text-center">{emptyMessage}</Text>
            </View>
        );
    }

    return (
        <View className="mb-6">
            {/* En-tête avec titre et "View All" */}
            {(title || showViewAll) && (
                <View className="flex-row justify-between items-center mb-4 px-4">
                    <View className="flex-row items-center">
                        {title && (
                            <Text className="text-xl font-bold text-gray-900">
                                {title}
                            </Text>
                        )}
                        <Text className="text-gray-500 ml-2">({products.length})</Text>
                    </View>
                    {showViewAll && (
                        <TouchableOpacity onPress={onViewAllPress}>
                            <Text className="text-green-600 font-semibold">
                                View All →
                            </Text>
                        </TouchableOpacity>
                    )}
                </View>
            )}

            {/* Affichage horizontal */}
            {horizontal ? (
                <ScrollView
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    className="pl-4"
                >
                    {products.map(product => (
                        <View key={product.id} className="mr-4">
                            <ProductListingCard
                                product={product}
                                compact
                                onPress={() => onProductPress && onProductPress(product)}
                                onFavoritePress={() =>
                                    console.log('Favorite:', product.id)
                                }
                                onAddToCart={() =>
                                    console.log('Add to cart:', product.id)
                                }
                            />
                        </View>
                    ))}
                </ScrollView>
            ) : (
                /* Affichage grille ou liste */
                <View className="px-4">
                    {columns > 1
                        ? renderGrid()
                        : products.map(product => (
                              <ProductListingCard
                                  key={product.id}
                                  product={product}
                                  onPress={() =>
                                      onProductPress && onProductPress(product)
                                  }
                                  onFavoritePress={() =>
                                      console.log('Favorite:', product.id)
                                  }
                                  onAddToCart={() =>
                                      console.log('Add to cart:', product.id)
                                  }
                              />
                          ))}
                </View>
            )}
        </View>
    );
};

export default ProductListing;
