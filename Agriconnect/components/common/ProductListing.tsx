// import React from 'react';
// import {
//     View,
//     Text,
//     ScrollView,
//     TouchableOpacity,
//     ActivityIndicator,
//     RefreshControl,
// } from 'react-native';
// import ProductListingCard from './ProductListingCard';
// import { ProductListingProps } from '@/interfaces';

// const ProductListing = ({
//     products,
//     title,
//     showViewAll = false,
//     horizontal = false,
//     onViewAllPress,
//     onProductPress,
//     loading = false,
//     emptyMessage = 'Aucun produit disponible',
//     columns = 2,
//     showCategoryFilter = false,
// }: ProductListingProps) => {
//     const renderGrid = () => {
//         const rows = [];
//         for (let i = 0; i < products.length; i += columns) {
//             const rowProducts = products.slice(i, i + columns);
//             rows.push(
//                 <View key={i} className="flex-row justify-between mb-4">
//                     {rowProducts.map((product, index) => (
//                         <View
//                             key={product.id}
//                             className={`${columns === 2 ? 'w-[48%]' : 'w-[31%]'}`}
//                         >
//                             <ProductListingCard
//                                 product={product}
//                                 compact
//                                 onPress={() => onProductPress && onProductPress(product)}
//                                 onFavoritePress={() =>
//                                     console.log('Favorite:', product.id)
//                                 }
//                                 onAddToCart={() =>
//                                     console.log('Add to cart:', product.id)
//                                 }
//                             />
//                         </View>
//                     ))}
//                     {/* Remplir les cases vides pour l'alignement */}
//                     {rowProducts.length < columns &&
//                         Array(columns - rowProducts.length)
//                             .fill(0)
//                             .map((_, index) => (
//                                 <View
//                                     key={`empty-${index}`}
//                                     className={`${columns === 2 ? 'w-[48%]' : 'w-[31%]'}`}
//                                 />
//                             ))}
//                 </View>,
//             );
//         }
//         return rows;
//     };

//     if (loading) {
//         return (
//             <View className="py-10">
//                 <ActivityIndicator size="large" color="#10B981" />
//                 <Text className="text-center text-gray-500 mt-2">
//                     Chargement des produits...
//                 </Text>
//             </View>
//         );
//     }

//     if (!products || products.length === 0) {
//         return (
//             <View className="p-4">
//                 <Text className="text-gray-500 text-center">{emptyMessage}</Text>
//             </View>
//         );
//     }

//     return (
//         <View className="mb-6">
//             {/* En-tête avec titre et "View All" */}
//             {(title || showViewAll) && (
//                 <View className="flex-row justify-between items-center mb-4 px-4">
//                     <View className="flex-row items-center">
//                         {title && (
//                             <Text className="text-xl font-bold text-gray-900">
//                                 {title}
//                             </Text>
//                         )}
//                         <Text className="text-gray-500 ml-2">({products.length})</Text>
//                     </View>
//                     {showViewAll && (
//                         <TouchableOpacity onPress={onViewAllPress}>
//                             <Text className="text-green-600 font-semibold">
//                                 View All →
//                             </Text>
//                         </TouchableOpacity>
//                     )}
//                 </View>
//             )}

//             {/* Affichage horizontal */}
//             {horizontal ? (
//                 <ScrollView
//                     horizontal
//                     showsHorizontalScrollIndicator={false}
//                     className="pl-4"
//                 >
//                     {products.map(product => (
//                         <View key={product.id} className="mr-4">
//                             <ProductListingCard
//                                 product={product}
//                                 compact
//                                 onPress={() => onProductPress && onProductPress(product)}
//                                 onFavoritePress={() =>
//                                     console.log('Favorite:', product.id)
//                                 }
//                                 onAddToCart={() =>
//                                     console.log('Add to cart:', product.id)
//                                 }
//                             />
//                         </View>
//                     ))}
//                 </ScrollView>
//             ) : (
//                 /* Affichage grille ou liste */
//                 <View className="px-4">
//                     {columns > 1
//                         ? renderGrid()
//                         : products.map(product => (
//                               <ProductListingCard
//                                   key={product.id}
//                                   product={product}
//                                   onPress={() =>
//                                       onProductPress && onProductPress(product)
//                                   }
//                                   onFavoritePress={() =>
//                                       console.log('Favorite:', product.id)
//                                   }
//                                   onAddToCart={() =>
//                                       console.log('Add to cart:', product.id)
//                                   }
//                               />
//                           ))}
//                 </View>
//             )}
//         </View>
//     );
// };

// export default ProductListing;

// ==================================

import React from 'react';
import {
    View,
    Text,
    ScrollView,
    TouchableOpacity,
    ActivityIndicator,
    Dimensions,
    useWindowDimensions,
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
    columns,
    showCategoryFilter = false,
}: ProductListingProps) => {
    const { width } = useWindowDimensions();

    // Déterminer le nombre de colonnes en fonction de la largeur de l'écran
    const getResponsiveColumns = () => {
        if (columns) return columns;

        if (width >= 1024) return 4; // Desktop/TV
        if (width >= 768) return 3; // Tablette
        if (width >= 480) return 2; // Grand téléphone
        return 2; // Téléphone normal
    };

    const responsiveColumns = getResponsiveColumns();

    // Déterminer la largeur des cartes en fonction du nombre de colonnes
    const getCardWidth = () => {
        const padding = 16; // px-4 = 16px
        const margin = 8; // mr-4 = 16px mais on divise par 2 pour chaque côté
        const availableWidth = width - padding * 2;

        if (horizontal) {
            return 160; // Largeur fixe pour le mode horizontal
        }

        if (responsiveColumns === 1) {
            return '100%';
        }

        const totalMargin = margin * (responsiveColumns - 1);
        return (availableWidth - totalMargin) / responsiveColumns;
    };

    const cardWidth = getCardWidth();

    const renderGrid = () => {
        const rows = [];
        for (let i = 0; i < products.length; i += responsiveColumns) {
            const rowProducts = products.slice(i, i + responsiveColumns);
            rows.push(
                <View key={i} className="flex-row justify-between mb-4">
                    {rowProducts.map((product, index) => (
                        <View
                            key={product.id}
                            style={{
                                width:
                                    typeof cardWidth === 'number' ? cardWidth : cardWidth,
                                marginRight: index < responsiveColumns - 1 ? 8 : 0,
                            }}
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
                    {rowProducts.length < responsiveColumns &&
                        Array(responsiveColumns - rowProducts.length)
                            .fill(0)
                            .map((_, index) => (
                                <View
                                    key={`empty-${index}`}
                                    style={{
                                        width:
                                            typeof cardWidth === 'number'
                                                ? cardWidth
                                                : cardWidth,
                                        marginRight:
                                            index <
                                            responsiveColumns - rowProducts.length - 1
                                                ? 8
                                                : 0,
                                    }}
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
                        <View key={product.id} className="mr-4" style={{ width: 160 }}>
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
                /* Affichage grille responsive */
                <View className="px-4">
                    {responsiveColumns > 1 ? (
                        renderGrid()
                    ) : (
                        // Une colonne
                        <View className="space-y-4">
                            {products.map(product => (
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
            )}
        </View>
    );
};

export default ProductListing;
