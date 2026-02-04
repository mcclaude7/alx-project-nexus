import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  TextInput,
  TouchableOpacity,
  StatusBar,
  ActivityIndicator,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { 
  MagnifyingGlassIcon, 
  MapPinIcon,
  BellIcon,
  HomeIcon,
  ShoppingCartIcon,
  ChatBubbleLeftRightIcon,
  UserIcon,
  PlusCircleIcon,
} from 'react-native-heroicons/outline';
import ProductListing from './ProductListing';
import { 
  users, 
  categories, 
  freshArrivals, 
  allProducts, 
  navItems as staticNavItems,
  notifications 
} from '@/constants/data';
import { User, Product } from '@/interfaces';

const MarketplaceHome = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(allProducts);
  const [loading, setLoading] = useState(false);
  const [unreadNotifications, setUnreadNotifications] = useState(0);

  // Initialisation
  useEffect(() => {
    // Simuler le chargement
    setLoading(true);
    
    // Simuler un délai d'initialisation
    setTimeout(() => {
      // Utilisateur connecté (premier utilisateur comme exemple)
      setCurrentUser(users[0]);
      
      // Compter les notifications non lues
      const unread = notifications.filter(n => !n.read && n.userId === users[0].id).length;
      setUnreadNotifications(unread);
      
      setLoading(false);
    }, 1000);
  }, []);

  // Filtrage des produits
  useEffect(() => {
    let filtered = allProducts;
    
    if (selectedCategory !== 'All') {
      filtered = filtered.filter(product => product.category === selectedCategory);
    }
    
    if (searchQuery.trim() !== '') {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(product => 
        product.name.toLowerCase().includes(query) ||
        product.seller.toLowerCase().includes(query) ||
        product.description?.toLowerCase().includes(query) ||
        product.tags?.some(tag => tag.toLowerCase().includes(query))
      );
    }
    
    setFilteredProducts(filtered);
  }, [selectedCategory, searchQuery]);

  const handleCategorySelect = (categoryName: string) => {
    setSelectedCategory(categoryName);
  };

  const handleProductPress = (product: Product) => {
    console.log('Product pressed:', product.name);
    // Navigation vers la page détail du produit
  };

  const handleViewAllPress = () => {
    console.log('View all pressed');
    // Navigation vers la liste complète
  };

  const handleSearch = () => {
    console.log('Search for:', searchQuery);
  };

  const navItems = [
    { id: '1', icon: HomeIcon, label: 'Home', active: true },
    { id: '2', icon: ShoppingCartIcon, label: 'Market' },
    { id: '3', icon: ShoppingCartIcon, label: 'Cart', badgeCount: currentUser?.cartItems?.length || 0 },
    { id: '4', icon: ChatBubbleLeftRightIcon, label: 'Chat', badgeCount: 2 },
    { id: '5', icon: UserIcon, label: 'Profile' },
  ];

  if (loading) {
    return (
      <SafeAreaView className="flex-1 bg-gray-50 justify-center items-center">
        <ActivityIndicator size="large" color="#10B981" />
        <Text className="mt-4 text-gray-600">Chargement...</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <StatusBar barStyle="dark-content" backgroundColor="#F9FAFB" />
      
      <ScrollView 
        className="flex-1" 
        showsVerticalScrollIndicator={false}
        stickyHeaderIndices={[1]}
      >
        {/* En-tête avec localisation et notifications */}
        <View className="flex-row items-center justify-between px-4 pt-4 pb-2">
          <View className="flex-row items-center">
            <MapPinIcon size={20} color="#4B5563" />
            <Text className="ml-2 text-gray-700 font-medium">
              {currentUser?.location || 'Lagos, Nigeria'}
            </Text>
          </View>
          
          <View className="flex-row items-center">
            <TouchableOpacity className="relative mr-4">
              <BellIcon size={24} color="#4B5563" />
              {unreadNotifications > 0 && (
                <View className="absolute -top-1 -right-1 bg-red-500 rounded-full w-5 h-5 items-center justify-center">
                  <Text className="text-white text-xs font-bold">
                    {unreadNotifications > 9 ? '9+' : unreadNotifications}
                  </Text>
                </View>
              )}
            </TouchableOpacity>
            
            <TouchableOpacity>
              <View className="w-10 h-10 rounded-full bg-green-100 border-2 border-green-200 items-center justify-center">
                <Text className="text-green-700 font-bold text-lg">
                  {currentUser?.name?.charAt(0) || 'U'}
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>

        {/* Barre de recherche */}
        <View className="bg-gray-50 px-4 py-3">
          <View className="flex-row items-center bg-white rounded-xl px-4 py-3 shadow-sm border border-gray-200">
            <MagnifyingGlassIcon size={20} color="#9CA3AF" />
            <TextInput
              className="flex-1 ml-3 text-gray-700"
              placeholder="Search produce, farmers..."
              placeholderTextColor="#9CA3AF"
              value={searchQuery}
              onChangeText={setSearchQuery}
              onSubmitEditing={handleSearch}
              returnKeyType="search"
            />
            {searchQuery.length > 0 && (
              <TouchableOpacity onPress={() => setSearchQuery('')}>
                <Text className="text-gray-400">✕</Text>
              </TouchableOpacity>
            )}
          </View>
        </View>

        {/* Section Catégories */}
        <View className="mb-8 pt-2">
          <Text className="text-xl font-bold px-4 mb-4">Categories</Text>
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            className="pl-4"
          >
            {categories.map((category) => (
              <TouchableOpacity
                key={category.id}
                className={`mr-3 px-5 py-3 rounded-full flex-row items-center ${
                  selectedCategory === category.name
                    ? 'bg-green-600'
                    : 'bg-white border border-gray-200'
                }`}
                onPress={() => handleCategorySelect(category.name)}
              >
                {category.icon && (
                  <Text className="mr-2">{category.icon}</Text>
                )}
                <Text
                  className={`font-medium ${
                    selectedCategory === category.name
                      ? 'text-white'
                      : 'text-gray-700'
                  }`}
                >
                  {category.name}
                </Text>
                {category.productCount && category.productCount > 0 && (
                  <Text
                    className={`ml-2 text-xs ${
                      selectedCategory === category.name
                        ? 'text-white/80'
                        : 'text-gray-500'
                    }`}
                  >
                    ({category.productCount})
                  </Text>
                )}
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Section Fresh Arrivals */}
        <ProductListing
          products={freshArrivals}
          title="Fresh Arrivals"
          showViewAll
          horizontal
          onViewAllPress={handleViewAllPress}
          onProductPress={handleProductPress}
        />

        {/* Section Tous les produits */}
        <ProductListing
          products={filteredProducts}
          title={selectedCategory === 'All' ? 'All Products' : selectedCategory}
          onProductPress={handleProductPress}
          columns={2}
          emptyMessage={`No ${selectedCategory.toLowerCase()} found`}
        />
      </ScrollView>

      {/* Barre de navigation */}
      <View className="bg-white border-t border-gray-200 px-6 py-4">
        <View className="flex-row justify-between items-center">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = item.active;
            
            return (
              <TouchableOpacity
                key={item.id}
                className="items-center"
                onPress={() => console.log(`Navigate to ${item.label}`)}
              >
                <View className="relative">
                  <Icon
                    size={24}
                    color={isActive ? '#059669' : '#6B7280'}
                  />
                  {item.badgeCount && item.badgeCount > 0 && (
                    <View className="absolute -top-2 -right-2 bg-red-500 rounded-full w-5 h-5 items-center justify-center">
                      <Text className="text-white text-xs font-bold">
                        {item.badgeCount > 9 ? '9+' : item.badgeCount}
                      </Text>
                    </View>
                  )}
                </View>
                <Text
                  className={`text-xs mt-1 ${
                    isActive ? 'text-green-600 font-semibold' : 'text-gray-500'
                  }`}
                >
                  {item.label}
                </Text>
              </TouchableOpacity>
            );
          })}
          
          {/* Bouton Sell flottant */}
          <TouchableOpacity className="absolute -top-8 left-1/2 transform -translate-x-1/2">
            <View className="bg-green-600 w-16 h-16 rounded-full items-center justify-center shadow-lg">
              <PlusCircleIcon size={32} color="#FFFFFF" />
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default MarketplaceHome;