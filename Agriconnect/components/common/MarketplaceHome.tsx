// import React, { useState, useEffect } from 'react';
// import {
//   View,
//   Text,
//   ScrollView,
//   TextInput,
//   TouchableOpacity,
//   StatusBar,
//   ActivityIndicator,
// } from 'react-native';
// import { SafeAreaView } from 'react-native-safe-area-context';
// import {
//   MagnifyingGlassIcon,
//   MapPinIcon,
//   BellIcon,
//   HomeIcon,
//   ShoppingCartIcon,
//   ChatBubbleLeftRightIcon,
//   UserIcon,
//   PlusCircleIcon,
// } from 'react-native-heroicons/outline';
// import ProductListing from './ProductListing';
// import {
//   users,
//   categories,
//   freshArrivals,
//   allProducts,
//   navItems as staticNavItems,
//   notifications
// } from '@/constants/data';
// import { User, Product } from '@/interfaces';

// const MarketplaceHome = () => {
//   const [selectedCategory, setSelectedCategory] = useState('All');
//   const [searchQuery, setSearchQuery] = useState('');
//   const [currentUser, setCurrentUser] = useState<User | null>(null);
//   const [filteredProducts, setFilteredProducts] = useState<Product[]>(allProducts);
//   const [loading, setLoading] = useState(false);
//   const [unreadNotifications, setUnreadNotifications] = useState(0);

//   // Initialisation
//   useEffect(() => {
//     // Simuler le chargement
//     setLoading(true);

//     // Simuler un délai d'initialisation
//     setTimeout(() => {
//       // Utilisateur connecté (premier utilisateur comme exemple)
//       setCurrentUser(users[0]);

//       // Compter les notifications non lues
//       const unread = notifications.filter(n => !n.read && n.userId === users[0].id).length;
//       setUnreadNotifications(unread);

//       setLoading(false);
//     }, 1000);
//   }, []);

//   // Filtrage des produits
//   useEffect(() => {
//     let filtered = allProducts;

//     if (selectedCategory !== 'All') {
//       filtered = filtered.filter(product => product.category === selectedCategory);
//     }

//     if (searchQuery.trim() !== '') {
//       const query = searchQuery.toLowerCase();
//       filtered = filtered.filter(product =>
//         product.name.toLowerCase().includes(query) ||
//         product.seller.toLowerCase().includes(query) ||
//         product.description?.toLowerCase().includes(query) ||
//         product.tags?.some(tag => tag.toLowerCase().includes(query))
//       );
//     }

//     setFilteredProducts(filtered);
//   }, [selectedCategory, searchQuery]);

//   const handleCategorySelect = (categoryName: string) => {
//     setSelectedCategory(categoryName);
//   };

//   const handleProductPress = (product: Product) => {
//     console.log('Product pressed:', product.name);
//     // Navigation vers la page détail du produit
//   };

//   const handleViewAllPress = () => {
//     console.log('View all pressed');
//     // Navigation vers la liste complète
//   };

//   const handleSearch = () => {
//     console.log('Search for:', searchQuery);
//   };

//   const navItems = [
//     { id: '1', icon: HomeIcon, label: 'Home', active: true },
//     { id: '2', icon: ShoppingCartIcon, label: 'Market' },
//     { id: '3', icon: ShoppingCartIcon, label: 'Cart', badgeCount: currentUser?.cartItems?.length || 0 },
//     { id: '4', icon: ChatBubbleLeftRightIcon, label: 'Chat', badgeCount: 2 },
//     { id: '5', icon: UserIcon, label: 'Profile' },
//   ];

//   if (loading) {
//     return (
//       <SafeAreaView className="flex-1 bg-gray-50 justify-center items-center">
//         <ActivityIndicator size="large" color="#10B981" />
//         <Text className="mt-4 text-gray-600">Chargement...</Text>
//       </SafeAreaView>
//     );
//   }

//   return (
//     <SafeAreaView className="flex-1 bg-gray-50">
//       <StatusBar barStyle="dark-content" backgroundColor="#F9FAFB" />

//       <ScrollView
//         className="flex-1"
//         showsVerticalScrollIndicator={false}
//         stickyHeaderIndices={[1]}
//       >
//         {/* En-tête avec localisation et notifications */}
//         <View className="flex-row items-center justify-between px-4 pt-4 pb-2">
//           <View className="flex-row items-center">
//             <MapPinIcon size={20} color="#4B5563" />
//             <Text className="ml-2 text-gray-700 font-medium">
//               {currentUser?.location || 'Lagos, Nigeria'}
//             </Text>
//           </View>

//           <View className="flex-row items-center">
//             <TouchableOpacity className="relative mr-4">
//               <BellIcon size={24} color="#4B5563" />
//               {unreadNotifications > 0 && (
//                 <View className="absolute -top-1 -right-1 bg-red-500 rounded-full w-5 h-5 items-center justify-center">
//                   <Text className="text-white text-xs font-bold">
//                     {unreadNotifications > 9 ? '9+' : unreadNotifications}
//                   </Text>
//                 </View>
//               )}
//             </TouchableOpacity>

//             <TouchableOpacity>
//               <View className="w-10 h-10 rounded-full bg-green-100 border-2 border-green-200 items-center justify-center">
//                 <Text className="text-green-700 font-bold text-lg">
//                   {currentUser?.name?.charAt(0) || 'U'}
//                 </Text>
//               </View>
//             </TouchableOpacity>
//           </View>
//         </View>

//         {/* Barre de recherche */}
//         <View className="bg-gray-50 px-4 py-3">
//           <View className="flex-row items-center bg-white rounded-xl px-4 py-3 shadow-sm border border-gray-200">
//             <MagnifyingGlassIcon size={20} color="#9CA3AF" />
//             <TextInput
//               className="flex-1 ml-3 text-gray-700"
//               placeholder="Search produce, farmers..."
//               placeholderTextColor="#9CA3AF"
//               value={searchQuery}
//               onChangeText={setSearchQuery}
//               onSubmitEditing={handleSearch}
//               returnKeyType="search"
//             />
//             {searchQuery.length > 0 && (
//               <TouchableOpacity onPress={() => setSearchQuery('')}>
//                 <Text className="text-gray-400">✕</Text>
//               </TouchableOpacity>
//             )}
//           </View>
//         </View>

//         {/* Section Catégories */}
//         <View className="mb-8 pt-2">
//           <Text className="text-xl font-bold px-4 mb-4">Categories</Text>
//           <ScrollView
//             horizontal
//             showsHorizontalScrollIndicator={false}
//             className="pl-4"
//           >
//             {categories.map((category) => (
//               <TouchableOpacity
//                 key={category.id}
//                 className={`mr-3 px-5 py-3 rounded-full flex-row items-center ${
//                   selectedCategory === category.name
//                     ? 'bg-green-600'
//                     : 'bg-white border border-gray-200'
//                 }`}
//                 onPress={() => handleCategorySelect(category.name)}
//               >
//                 {category.icon && (
//                   <Text className="mr-2">{category.icon}</Text>
//                 )}
//                 <Text
//                   className={`font-medium ${
//                     selectedCategory === category.name
//                       ? 'text-white'
//                       : 'text-gray-700'
//                   }`}
//                 >
//                   {category.name}
//                 </Text>
//                 {category.productCount && category.productCount > 0 && (
//                   <Text
//                     className={`ml-2 text-xs ${
//                       selectedCategory === category.name
//                         ? 'text-white/80'
//                         : 'text-gray-500'
//                     }`}
//                   >
//                     ({category.productCount})
//                   </Text>
//                 )}
//               </TouchableOpacity>
//             ))}
//           </ScrollView>
//         </View>

//         {/* Section Fresh Arrivals */}
//         <ProductListing
//           products={freshArrivals}
//           title="Fresh Arrivals"
//           showViewAll
//           horizontal
//           onViewAllPress={handleViewAllPress}
//           onProductPress={handleProductPress}
//         />

//         {/* Section Tous les produits */}
//         <ProductListing
//           products={filteredProducts}
//           title={selectedCategory === 'All' ? 'All Products' : selectedCategory}
//           onProductPress={handleProductPress}
//           columns={2}
//           emptyMessage={`No ${selectedCategory.toLowerCase()} found`}
//         />
//       </ScrollView>

//       {/* Barre de navigation */}
//       <View className="bg-white border-t border-gray-200 px-6 py-4">
//         <View className="flex-row justify-between items-center">
//           {navItems.map((item) => {
//             const Icon = item.icon;
//             const isActive = item.active;

//             return (
//               <TouchableOpacity
//                 key={item.id}
//                 className="items-center"
//                 onPress={() => console.log(`Navigate to ${item.label}`)}
//               >
//                 <View className="relative">
//                   <Icon
//                     size={24}
//                     color={isActive ? '#059669' : '#6B7280'}
//                   />
//                   {item.badgeCount && item.badgeCount > 0 && (
//                     <View className="absolute -top-2 -right-2 bg-red-500 rounded-full w-5 h-5 items-center justify-center">
//                       <Text className="text-white text-xs font-bold">
//                         {item.badgeCount > 9 ? '9+' : item.badgeCount}
//                       </Text>
//                     </View>
//                   )}
//                 </View>
//                 <Text
//                   className={`text-xs mt-1 ${
//                     isActive ? 'text-green-600 font-semibold' : 'text-gray-500'
//                   }`}
//                 >
//                   {item.label}
//                 </Text>
//               </TouchableOpacity>
//             );
//           })}

//           {/* Bouton Sell flottant */}
//           <TouchableOpacity className="absolute -top-8 left-1/2 transform -translate-x-1/2">
//             <View className="bg-green-600 w-16 h-16 rounded-full items-center justify-center shadow-lg">
//               <PlusCircleIcon size={32} color="#FFFFFF" />
//             </View>
//           </TouchableOpacity>
//         </View>
//       </View>
//     </SafeAreaView>
//   );
// };

// export default MarketplaceHome;

// ============================================

// import React, { useState, useEffect } from 'react';
// import {
//     View,
//     Text,
//     ScrollView,
//     TextInput,
//     TouchableOpacity,
//     StatusBar,
//     ActivityIndicator,
// } from 'react-native';
// import { SafeAreaView } from 'react-native-safe-area-context';
// import {
//     MagnifyingGlassIcon,
//     MapPinIcon,
//     BellIcon,
//     HomeIcon,
//     ShoppingCartIcon,
//     ChatBubbleLeftRightIcon,
//     UserIcon,
//     PlusCircleIcon,
// } from 'react-native-heroicons/outline';
// import ProductListing from './ProductListing';
// import {
//     users,
//     categories,
//     freshArrivals,
//     allProducts,
//     navItems as staticNavItems,
//     notifications,
// } from '@/constants/data';
// import { User, Product } from '@/interfaces';

// const MarketplaceHome = () => {
//     const [selectedCategory, setSelectedCategory] = useState('All');
//     const [searchQuery, setSearchQuery] = useState('');
//     const [currentUser, setCurrentUser] = useState<User | null>(null);
//     const [filteredProducts, setFilteredProducts] = useState<Product[]>(allProducts);
//     const [loading, setLoading] = useState(false);
//     const [unreadNotifications, setUnreadNotifications] = useState(0);

//     // Initialisation
//     useEffect(() => {
//         // Simuler le chargement
//         setLoading(true);

//         // Simuler un délai d'initialisation
//         setTimeout(() => {
//             // Utilisateur connecté (premier utilisateur comme exemple)
//             setCurrentUser(users[0]);

//             // Compter les notifications non lues
//             const unread = notifications.filter(
//                 n => !n.read && n.userId === users[0].id,
//             ).length;
//             setUnreadNotifications(unread);

//             setLoading(false);
//         }, 1000);
//     }, []);

//     // Filtrage des produits
//     useEffect(() => {
//         let filtered = allProducts;

//         if (selectedCategory !== 'All') {
//             filtered = filtered.filter(product => product.category === selectedCategory);
//         }

//         if (searchQuery.trim() !== '') {
//             const query = searchQuery.toLowerCase();
//             filtered = filtered.filter(
//                 product =>
//                     product.name.toLowerCase().includes(query) ||
//                     product.seller.toLowerCase().includes(query) ||
//                     product.description?.toLowerCase().includes(query) ||
//                     product.tags?.some(tag => tag.toLowerCase().includes(query)),
//             );
//         }

//         setFilteredProducts(filtered);
//     }, [selectedCategory, searchQuery]);

//     const handleCategorySelect = (categoryName: string) => {
//         setSelectedCategory(categoryName);
//     };

//     const handleProductPress = (product: Product) => {
//         console.log('Product pressed:', product.name);
//         // Navigation vers la page détail du produit
//     };

//     const handleViewAllPress = () => {
//         console.log('View all pressed');
//         // Navigation vers la liste complète
//     };

//     const handleSearch = () => {
//         console.log('Search for:', searchQuery);
//     };

//     const navItems = [
//         { id: '1', icon: HomeIcon, label: 'Home', active: true },
//         { id: '2', icon: ShoppingCartIcon, label: 'Market' },
//         {
//             id: '3',
//             icon: ShoppingCartIcon,
//             label: 'Cart',
//             badgeCount: currentUser?.cartItems?.length || 0,
//         },
//         { id: '4', icon: ChatBubbleLeftRightIcon, label: 'Chat', badgeCount: 2 },
//         { id: '5', icon: UserIcon, label: 'Profile' },
//     ];

//     if (loading) {
//         return (
//             <SafeAreaView className="flex-1 bg-gray-50 justify-center items-center">
//                 <ActivityIndicator size="large" color="#10B981" />
//                 <Text className="mt-4 text-gray-600">Chargement...</Text>
//             </SafeAreaView>
//         );
//     }

//     return (
//         <SafeAreaView className="flex-1 bg-gray-50">
//             <StatusBar barStyle="dark-content" backgroundColor="#F9FAFB" />

//             <ScrollView
//                 className="flex-1"
//                 showsVerticalScrollIndicator={false}
//                 stickyHeaderIndices={[1]}
//             >
//                 {/* En-tête avec logo AgroConnect et notifications */}
//                 <View className="flex-row items-center justify-between px-4 pt-4 pb-3">
//                     {/* Logo AgroConnect stylé */}
//                     <View className="flex-row items-center">
//                         <View className="w-12 h-12 rounded-xl bg-gradient-to-br from-green-500 to-green-700 items-center justify-center mr-3 shadow-md">
//                             <Text className="text-white font-bold text-xl">AC</Text>
//                         </View>
//                         <View>
//                             <Text className="text-2xl font-black text-green-900">
//                                 AgroConnect
//                             </Text>
//                             <Text className="text-xs text-green-600 font-medium -mt-1">
//                                 Fresh from farm to table
//                             </Text>
//                         </View>
//                     </View>

//                     {/* Notifications et profil */}
//                     <View className="flex-row items-center">
//                         <TouchableOpacity className="relative mr-4">
//                             <BellIcon size={24} color="#4B5563" />
//                             {unreadNotifications > 0 && (
//                                 <View className="absolute -top-1 -right-1 bg-red-500 rounded-full w-5 h-5 items-center justify-center">
//                                     <Text className="text-white text-xs font-bold">
//                                         {unreadNotifications > 9
//                                             ? '9+'
//                                             : unreadNotifications}
//                                     </Text>
//                                 </View>
//                             )}
//                         </TouchableOpacity>

//                         <TouchableOpacity>
//                             <View className="w-10 h-10 rounded-full bg-green-100 border-2 border-green-200 items-center justify-center">
//                                 <Text className="text-green-700 font-bold text-lg">
//                                     {currentUser?.name?.charAt(0) || 'U'}
//                                 </Text>
//                             </View>
//                         </TouchableOpacity>
//                     </View>
//                 </View>

//                 {/* Localisation sous le logo */}
//                 <View className="flex-row items-center px-4 pb-2">
//                     <MapPinIcon size={18} color="#4B5563" />
//                     <Text className="ml-2 text-gray-600 text-sm">
//                         {currentUser?.location || 'Lagos, Nigeria'}
//                     </Text>
//                 </View>

//                 {/* Barre de recherche */}
//                 <View className="bg-gray-50 px-4 py-3">
//                     <View className="flex-row items-center bg-white rounded-xl px-4 py-3 shadow-sm border border-gray-200">
//                         <MagnifyingGlassIcon size={20} color="#9CA3AF" />
//                         <TextInput
//                             className="flex-1 ml-3 text-gray-700"
//                             placeholder="Search produce, farmers..."
//                             placeholderTextColor="#9CA3AF"
//                             value={searchQuery}
//                             onChangeText={setSearchQuery}
//                             onSubmitEditing={handleSearch}
//                             returnKeyType="search"
//                         />
//                         {searchQuery.length > 0 && (
//                             <TouchableOpacity onPress={() => setSearchQuery('')}>
//                                 <Text className="text-gray-400">✕</Text>
//                             </TouchableOpacity>
//                         )}
//                     </View>
//                 </View>

//                 {/* Section Catégories */}
//                 <View className="mb-8 pt-2">
//                     <Text className="text-xl font-bold px-4 mb-4">Categories</Text>
//                     <ScrollView
//                         horizontal
//                         showsHorizontalScrollIndicator={false}
//                         className="pl-4"
//                     >
//                         {categories.map(category => (
//                             <TouchableOpacity
//                                 key={category.id}
//                                 className={`mr-3 px-5 py-3 rounded-full flex-row items-center ${
//                                     selectedCategory === category.name
//                                         ? 'bg-green-600'
//                                         : 'bg-white border border-gray-200'
//                                 }`}
//                                 onPress={() => handleCategorySelect(category.name)}
//                             >
//                                 {category.icon && (
//                                     <Text className="mr-2">{category.icon}</Text>
//                                 )}
//                                 <Text
//                                     className={`font-medium ${
//                                         selectedCategory === category.name
//                                             ? 'text-white'
//                                             : 'text-gray-700'
//                                     }`}
//                                 >
//                                     {category.name}
//                                 </Text>
//                                 {category.productCount && category.productCount > 0 && (
//                                     <Text
//                                         className={`ml-2 text-xs ${
//                                             selectedCategory === category.name
//                                                 ? 'text-white/80'
//                                                 : 'text-gray-500'
//                                         }`}
//                                     >
//                                         ({category.productCount})
//                                     </Text>
//                                 )}
//                             </TouchableOpacity>
//                         ))}
//                     </ScrollView>
//                 </View>

//                 {/* Section Fresh Arrivals */}
//                 <ProductListing
//                     products={freshArrivals}
//                     title="Fresh Arrivals"
//                     showViewAll
//                     horizontal
//                     onViewAllPress={handleViewAllPress}
//                     onProductPress={handleProductPress}
//                 />

//                 {/* Section Tous les produits */}
//                 <ProductListing
//                     products={filteredProducts}
//                     title={selectedCategory === 'All' ? 'All Products' : selectedCategory}
//                     onProductPress={handleProductPress}
//                     columns={2}
//                     emptyMessage={`No ${selectedCategory.toLowerCase()} found`}
//                 />
//             </ScrollView>

//             {/* Barre de navigation */}
//             <View className="bg-white border-t border-gray-200 px-6 py-4">
//                 <View className="flex-row justify-between items-center">
//                     {navItems.map(item => {
//                         const Icon = item.icon;
//                         const isActive = item.active;

//                         return (
//                             <TouchableOpacity
//                                 key={item.id}
//                                 className="items-center"
//                                 onPress={() => console.log(`Navigate to ${item.label}`)}
//                             >
//                                 <View className="relative">
//                                     <Icon
//                                         size={24}
//                                         color={isActive ? '#059669' : '#6B7280'}
//                                     />
//                                     {item.badgeCount && item.badgeCount > 0 && (
//                                         <View className="absolute -top-2 -right-2 bg-red-500 rounded-full w-5 h-5 items-center justify-center">
//                                             <Text className="text-white text-xs font-bold">
//                                                 {item.badgeCount > 9
//                                                     ? '9+'
//                                                     : item.badgeCount}
//                                             </Text>
//                                         </View>
//                                     )}
//                                 </View>
//                                 <Text
//                                     className={`text-xs mt-1 ${
//                                         isActive
//                                             ? 'text-green-600 font-semibold'
//                                             : 'text-gray-500'
//                                     }`}
//                                 >
//                                     {item.label}
//                                 </Text>
//                             </TouchableOpacity>
//                         );
//                     })}

//                     {/* Bouton Sell flottant */}
//                     <TouchableOpacity className="absolute -top-8 left-1/2 transform -translate-x-1/2">
//                         <View className="bg-green-600 w-16 h-16 rounded-full items-center justify-center shadow-lg">
//                             <PlusCircleIcon size={32} color="#FFFFFF" />
//                         </View>
//                     </TouchableOpacity>
//                 </View>
//             </View>
//         </SafeAreaView>
//     );
// };

// export default MarketplaceHome;

// ============================================

// import React, { useState, useEffect } from 'react';
// import {
//     View,
//     Text,
//     ScrollView,
//     TextInput,
//     TouchableOpacity,
//     StatusBar,
//     ActivityIndicator,
// } from 'react-native';
// import { SafeAreaView } from 'react-native-safe-area-context';
// import {
//     MagnifyingGlassIcon,
//     MapPinIcon,
//     BellIcon,
//     HomeIcon,
//     ShoppingCartIcon,
//     ChatBubbleLeftRightIcon,
//     UserIcon,
//     PlusCircleIcon,
//     ArrowRightOnRectangleIcon,
//     UserPlusIcon,
// } from 'react-native-heroicons/outline';
// import ProductListing from './ProductListing';
// import AgroConnectLogo from './AgroConnectLogo'; // Import du logo
// import {
//     users,
//     categories,
//     freshArrivals,
//     allProducts,
//     navItems as staticNavItems,
//     notifications,
// } from '@/constants/data';
// import { User, Product } from '@/interfaces';

// const MarketplaceHome = () => {
//     const [selectedCategory, setSelectedCategory] = useState('All');
//     const [searchQuery, setSearchQuery] = useState('');
//     const [currentUser, setCurrentUser] = useState<User | null>(null);
//     const [filteredProducts, setFilteredProducts] = useState<Product[]>(allProducts);
//     const [loading, setLoading] = useState(false);
//     const [unreadNotifications, setUnreadNotifications] = useState(0);
//     const [isAuthenticated, setIsAuthenticated] = useState(false);

//     // Initialisation
//     useEffect(() => {
//         // Simuler le chargement
//         setLoading(true);

//         // Simuler un délai d'initialisation
//         setTimeout(() => {
//             // Utilisateur connecté (premier utilisateur comme exemple)
//             const user = users[0];
//             setCurrentUser(user);
//             setIsAuthenticated(true); // Simuler l'authentification

//             // Compter les notifications non lues
//             const unread = notifications.filter(
//                 n => !n.read && n.userId === user.id,
//             ).length;
//             setUnreadNotifications(unread);

//             setLoading(false);
//         }, 1000);
//     }, []);

//     // Filtrage des produits
//     useEffect(() => {
//         let filtered = allProducts;

//         if (selectedCategory !== 'All') {
//             filtered = filtered.filter(product => product.category === selectedCategory);
//         }

//         if (searchQuery.trim() !== '') {
//             const query = searchQuery.toLowerCase();
//             filtered = filtered.filter(
//                 product =>
//                     product.name.toLowerCase().includes(query) ||
//                     product.seller.toLowerCase().includes(query) ||
//                     product.description?.toLowerCase().includes(query) ||
//                     product.tags?.some(tag => tag.toLowerCase().includes(query)),
//             );
//         }

//         setFilteredProducts(filtered);
//     }, [selectedCategory, searchQuery]);

//     const handleCategorySelect = (categoryName: string) => {
//         setSelectedCategory(categoryName);
//     };

//     const handleProductPress = (product: Product) => {
//         console.log('Product pressed:', product.name);
//         // Navigation vers la page détail du produit
//     };

//     const handleViewAllPress = () => {
//         console.log('View all pressed');
//         // Navigation vers la liste complète
//     };

//     const handleSearch = () => {
//         console.log('Search for:', searchQuery);
//     };

//     const handleLogin = () => {
//         if (isAuthenticated) {
//             // Logout
//             setIsAuthenticated(false);
//             setCurrentUser(null);
//             setUnreadNotifications(0);
//             console.log('User logged out');
//         } else {
//             // Login - simulation
//             setIsAuthenticated(true);
//             setCurrentUser(users[0]);
//             console.log('User logged in');
//         }
//     };

//     const handleSignup = () => {
//         console.log('Navigate to signup screen');
//         // Navigation vers la page d'inscription
//     };

//     const navItems = [
//         { id: '1', icon: HomeIcon, label: 'Home', active: true },
//         { id: '2', icon: ShoppingCartIcon, label: 'Market' },
//         {
//             id: '3',
//             icon: ShoppingCartIcon,
//             label: 'Cart',
//             badgeCount: currentUser?.cartItems?.length || 0,
//         },
//         { id: '4', icon: ChatBubbleLeftRightIcon, label: 'Chat', badgeCount: 2 },
//         { id: '5', icon: UserIcon, label: 'Profile' },
//     ];

//     if (loading) {
//         return (
//             <SafeAreaView className="flex-1 bg-gray-50 justify-center items-center">
//                 <ActivityIndicator size="large" color="#10B981" />
//                 <Text className="mt-4 text-gray-600">Chargement...</Text>
//             </SafeAreaView>
//         );
//     }

//     return (
//         <SafeAreaView className="flex-1 bg-gray-50">
//             <StatusBar barStyle="dark-content" backgroundColor="#F9FAFB" />

//             {/* Header fixe (non scrollable) */}
//             <View className="bg-white border-b border-gray-200 px-4 pt-2 pb-3">
//                 {/* Première ligne: Logo et actions utilisateur */}
//                 <View className="flex-row items-center justify-between mb-2">
//                     {/* Logo AgroConnect */}
//                     <View className="flex-row items-center">
//                         <AgroConnectLogo size={44} />
//                         <View className="ml-3">
//                             <Text className="text-2xl font-black text-green-900">
//                                 AgroConnect
//                             </Text>
//                             <Text className="text-xs text-green-600 font-medium -mt-1">
//                                 Fresh from farm to table
//                             </Text>
//                         </View>
//                     </View>

//                     {/* Actions utilisateur: Login/Logout et Signup */}
//                     <View className="flex-row items-center space-x-3">
//                         {/* Login/Logout button */}
//                         <TouchableOpacity
//                             onPress={handleLogin}
//                             className="flex-row items-center bg-green-50 px-3 py-2 rounded-lg active:bg-green-100"
//                         >
//                             <ArrowRightOnRectangleIcon
//                                 size={18}
//                                 color={isAuthenticated ? '#EF4444' : '#10B981'}
//                             />
//                             <Text
//                                 className={`ml-2 font-medium ${isAuthenticated ? 'text-red-600' : 'text-green-700'}`}
//                             >
//                                 {isAuthenticated ? 'Logout' : 'Login'}
//                             </Text>
//                         </TouchableOpacity>

//                         {/* Signup button (seulement si non authentifié) */}
//                         {!isAuthenticated && (
//                             <TouchableOpacity
//                                 onPress={handleSignup}
//                                 className="flex-row items-center bg-green-600 px-3 py-2 rounded-lg active:bg-green-700"
//                             >
//                                 <UserPlusIcon size={18} color="#FFFFFF" />
//                                 <Text className="ml-2 text-white font-medium">
//                                     Signup
//                                 </Text>
//                             </TouchableOpacity>
//                         )}
//                     </View>
//                 </View>

//                 {/* Deuxième ligne: Localisation et notifications */}
//                 <View className="flex-row items-center justify-between">
//                     <View className="flex-row items-center">
//                         <MapPinIcon size={18} color="#4B5563" />
//                         <Text className="ml-2 text-gray-600 text-sm">
//                             {currentUser?.location || 'Lagos, Nigeria'}
//                         </Text>
//                     </View>

//                     {/* Notifications (seulement si authentifié) */}
//                     {isAuthenticated && (
//                         <TouchableOpacity className="relative">
//                             <BellIcon size={22} color="#4B5563" />
//                             {unreadNotifications > 0 && (
//                                 <View className="absolute -top-1 -right-1 bg-red-500 rounded-full w-5 h-5 items-center justify-center">
//                                     <Text className="text-white text-xs font-bold">
//                                         {unreadNotifications > 9
//                                             ? '9+'
//                                             : unreadNotifications}
//                                     </Text>
//                                 </View>
//                             )}
//                         </TouchableOpacity>
//                     )}
//                 </View>
//             </View>

//             {/* Contenu scrollable */}
//             <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
//                 {/* Barre de recherche */}
//                 <View className="bg-gray-50 px-4 py-4">
//                     <View className="flex-row items-center bg-white rounded-xl px-4 py-3 shadow-sm border border-gray-200">
//                         <MagnifyingGlassIcon size={20} color="#9CA3AF" />
//                         <TextInput
//                             className="flex-1 ml-3 text-gray-700"
//                             placeholder="Search produce, farmers..."
//                             placeholderTextColor="#9CA3AF"
//                             value={searchQuery}
//                             onChangeText={setSearchQuery}
//                             onSubmitEditing={handleSearch}
//                             returnKeyType="search"
//                         />
//                         {searchQuery.length > 0 && (
//                             <TouchableOpacity onPress={() => setSearchQuery('')}>
//                                 <Text className="text-gray-400">✕</Text>
//                             </TouchableOpacity>
//                         )}
//                     </View>
//                 </View>

//                 {/* Section Catégories */}
//                 <View className="mb-8">
//                     <Text className="text-xl font-bold px-4 mb-4">Categories</Text>
//                     <ScrollView
//                         horizontal
//                         showsHorizontalScrollIndicator={false}
//                         className="pl-4"
//                     >
//                         {categories.map(category => (
//                             <TouchableOpacity
//                                 key={category.id}
//                                 className={`mr-3 px-5 py-3 rounded-full flex-row items-center ${
//                                     selectedCategory === category.name
//                                         ? 'bg-green-600'
//                                         : 'bg-white border border-gray-200'
//                                 }`}
//                                 onPress={() => handleCategorySelect(category.name)}
//                             >
//                                 {category.icon && (
//                                     <Text className="mr-2">{category.icon}</Text>
//                                 )}
//                                 <Text
//                                     className={`font-medium ${
//                                         selectedCategory === category.name
//                                             ? 'text-white'
//                                             : 'text-gray-700'
//                                     }`}
//                                 >
//                                     {category.name}
//                                 </Text>
//                                 {category.productCount && category.productCount > 0 && (
//                                     <Text
//                                         className={`ml-2 text-xs ${
//                                             selectedCategory === category.name
//                                                 ? 'text-white/80'
//                                                 : 'text-gray-500'
//                                         }`}
//                                     >
//                                         ({category.productCount})
//                                     </Text>
//                                 )}
//                             </TouchableOpacity>
//                         ))}
//                     </ScrollView>
//                 </View>

//                 {/* Section Fresh Arrivals */}
//                 <ProductListing
//                     products={freshArrivals}
//                     title="Fresh Arrivals"
//                     showViewAll
//                     horizontal
//                     onViewAllPress={handleViewAllPress}
//                     onProductPress={handleProductPress}
//                 />

//                 {/* Section Tous les produits */}
//                 <ProductListing
//                     products={filteredProducts}
//                     title={selectedCategory === 'All' ? 'All Products' : selectedCategory}
//                     onProductPress={handleProductPress}
//                     columns={2}
//                     emptyMessage={`No ${selectedCategory.toLowerCase()} found`}
//                 />
//             </ScrollView>

//             {/* Barre de navigation */}
//             <View className="bg-white border-t border-gray-200 px-6 py-4">
//                 <View className="flex-row justify-between items-center">
//                     {navItems.map(item => {
//                         const Icon = item.icon;
//                         const isActive = item.active;

//                         return (
//                             <TouchableOpacity
//                                 key={item.id}
//                                 className="items-center"
//                                 onPress={() => console.log(`Navigate to ${item.label}`)}
//                                 disabled={!isAuthenticated && item.label !== 'Home'} // Désactiver si non connecté
//                             >
//                                 <View className="relative">
//                                     <Icon
//                                         size={24}
//                                         color={
//                                             !isAuthenticated && item.label !== 'Home'
//                                                 ? '#D1D5DB'
//                                                 : isActive
//                                                   ? '#059669'
//                                                   : '#6B7280'
//                                         }
//                                     />
//                                     {item.badgeCount &&
//                                         item.badgeCount > 0 &&
//                                         isAuthenticated && (
//                                             <View className="absolute -top-2 -right-2 bg-red-500 rounded-full w-5 h-5 items-center justify-center">
//                                                 <Text className="text-white text-xs font-bold">
//                                                     {item.badgeCount > 9
//                                                         ? '9+'
//                                                         : item.badgeCount}
//                                                 </Text>
//                                             </View>
//                                         )}
//                                 </View>
//                                 <Text
//                                     className={`text-xs mt-1 ${
//                                         !isAuthenticated && item.label !== 'Home'
//                                             ? 'text-gray-300'
//                                             : isActive
//                                               ? 'text-green-600 font-semibold'
//                                               : 'text-gray-500'
//                                     }`}
//                                 >
//                                     {item.label}
//                                 </Text>
//                             </TouchableOpacity>
//                         );
//                     })}

//                     {/* Bouton Sell flottant (seulement si authentifié) */}
//                     {isAuthenticated && (
//                         <TouchableOpacity className="absolute -top-8 left-1/2 transform -translate-x-1/2">
//                             <View className="bg-green-600 w-16 h-16 rounded-full items-center justify-center shadow-lg">
//                                 <PlusCircleIcon size={32} color="#FFFFFF" />
//                             </View>
//                         </TouchableOpacity>
//                     )}
//                 </View>

//                 {/* Indicateur de connexion */}
//                 <View className="mt-2 flex-row justify-center">
//                     <View
//                         className={`px-3 py-1 rounded-full ${isAuthenticated ? 'bg-green-100' : 'bg-yellow-100'}`}
//                     >
//                         <Text
//                             className={`text-xs ${isAuthenticated ? 'text-green-700' : 'text-yellow-700'}`}
//                         >
//                             {isAuthenticated
//                                 ? `👋 Welcome, ${currentUser?.name?.split(' ')[0] || 'User'}!`
//                                 : '🔓 Please login to access all features'}
//                         </Text>
//                     </View>
//                 </View>
//             </View>
//         </SafeAreaView>
//     );
// };

// export default MarketplaceHome;

// =============================================================================

// import React, { useState, useEffect } from 'react';
// import {
//     View,
//     Text,
//     ScrollView,
//     TextInput,
//     TouchableOpacity,
//     StatusBar,
//     ActivityIndicator,
// } from 'react-native';
// import { SafeAreaView } from 'react-native-safe-area-context';
// import {
//     MagnifyingGlassIcon,
//     MapPinIcon,
//     BellIcon,
//     HomeIcon,
//     ShoppingCartIcon,
//     ChatBubbleLeftRightIcon,
//     UserIcon,
//     PlusCircleIcon,
//     UserCircleIcon,
//     Cog6ToothIcon,
//     HeartIcon,
//     ShoppingBagIcon,
//     ArrowRightOnRectangleIcon,
//     ChevronUpIcon,
//     ListBulletIcon,
//     ShieldCheckIcon,
//     TagIcon,
//     ChartBarIcon,
// } from 'react-native-heroicons/outline';
// import ProductListing from './ProductListing';
// import AgroConnectLogo from './AgroConnectLogo';
// import UserProfileDropdown from './UserProfileDropdown';
// import {
//     users,
//     categories,
//     freshArrivals,
//     allProducts,
//     notifications,
// } from '@/constants/data';
// import { User, Product } from '@/interfaces';

// const MarketplaceHome = () => {
//     const [selectedCategory, setSelectedCategory] = useState('All');
//     const [searchQuery, setSearchQuery] = useState('');
//     const [currentUser, setCurrentUser] = useState<User | null>(null);
//     const [filteredProducts, setFilteredProducts] = useState<Product[]>(allProducts);
//     const [loading, setLoading] = useState(false);
//     const [unreadNotifications, setUnreadNotifications] = useState(0);
//     const [isAuthenticated, setIsAuthenticated] = useState(false);
//     const [showUserDropdown, setShowUserDropdown] = useState(false);

//     // Initialisation
//     useEffect(() => {
//         setLoading(true);

//         setTimeout(() => {
//             const user = users[0];
//             setCurrentUser(user);
//             setIsAuthenticated(true);

//             const unread = notifications.filter(
//                 n => !n.read && n.userId === user.id,
//             ).length;
//             setUnreadNotifications(unread);

//             setLoading(false);
//         }, 1000);
//     }, []);

//     // Filtrage des produits
//     useEffect(() => {
//         let filtered = allProducts;

//         if (selectedCategory !== 'All') {
//             filtered = filtered.filter(product => product.category === selectedCategory);
//         }

//         if (searchQuery.trim() !== '') {
//             const query = searchQuery.toLowerCase();
//             filtered = filtered.filter(
//                 product =>
//                     product.name.toLowerCase().includes(query) ||
//                     product.seller.toLowerCase().includes(query) ||
//                     product.description?.toLowerCase().includes(query) ||
//                     product.tags?.some(tag => tag.toLowerCase().includes(query)),
//             );
//         }

//         setFilteredProducts(filtered);
//     }, [selectedCategory, searchQuery]);

//     const handleCategorySelect = (categoryName: string) => {
//         setSelectedCategory(categoryName);
//     };

//     const handleProductPress = (product: Product) => {
//         console.log('Product pressed:', product.name);
//         // Navigation vers la page détail du produit
//     };

//     const handleViewAllPress = () => {
//         console.log('View all pressed');
//         // Navigation vers la liste complète
//     };

//     const handleSearch = () => {
//         console.log('Search for:', searchQuery);
//     };

//     const handleLogin = () => {
//         if (isAuthenticated) {
//             setIsAuthenticated(false);
//             setCurrentUser(null);
//             setUnreadNotifications(0);
//             setShowUserDropdown(false);
//             console.log('User logged out');
//         } else {
//             setIsAuthenticated(true);
//             setCurrentUser(users[0]);
//             console.log('User logged in');
//         }
//     };

//     const handleSignup = () => {
//         console.log('Navigate to signup screen');
//         // Navigation vers la page d'inscription
//     };

//     const handleNavigate = (screen: string) => {
//         console.log('Navigate to:', screen);
//         // Implémentez la navigation ici
//     };

//     const handleAddProduct = () => {
//         console.log('Navigate to add product screen');
//         setShowUserDropdown(false);
//         // Navigation vers l'écran d'ajout de produit
//     };

//     const toggleUserDropdown = () => {
//         if (isAuthenticated) {
//             setShowUserDropdown(!showUserDropdown);
//         } else {
//             handleLogin(); // Si non connecté, redirige vers login
//         }
//     };

//     const navItems = [
//         { id: '1', icon: HomeIcon, label: 'Home', active: true },
//         { id: '2', icon: ShoppingCartIcon, label: 'Market' },
//         {
//             id: '3',
//             icon: ShoppingCartIcon,
//             label: 'Cart',
//             badgeCount: currentUser?.cartItems?.length || 0,
//         },
//         { id: '4', icon: ChatBubbleLeftRightIcon, label: 'Chat', badgeCount: 2 },
//         { id: '5', icon: UserIcon, label: 'Profile' },
//     ];

//     if (loading) {
//         return (
//             <SafeAreaView className="flex-1 bg-gray-50 justify-center items-center">
//                 <ActivityIndicator size="large" color="#10B981" />
//                 <Text className="mt-4 text-gray-600">Loading...</Text>
//             </SafeAreaView>
//         );
//     }

//     return (
//         <SafeAreaView className="flex-1 bg-gray-50">
//             <StatusBar barStyle="dark-content" backgroundColor="#F9FAFB" />

//             {/* Header fixe */}
//             <View className="bg-white border-b border-gray-200">
//                 {/* Première ligne: Logo et User */}
//                 <View className="flex-row items-center justify-between px-4 pt-2 pb-3">
//                     {/* Logo AgroConnect */}
//                     <View className="flex-row items-center">
//                         <AgroConnectLogo size={40} />
//                         <View className="ml-3">
//                             <Text className="text-xl font-bold text-green-900">
//                                 AgroConnect
//                             </Text>
//                             <Text className="text-xs text-green-600 -mt-1">
//                                 Marketplace
//                             </Text>
//                         </View>
//                     </View>

//                     {/* User avec dropdown */}
//                     <TouchableOpacity
//                         onPress={toggleUserDropdown}
//                         className="flex-row items-center"
//                         activeOpacity={0.7}
//                     >
//                         {isAuthenticated ? (
//                             <>
//                                 <View className="w-10 h-10 rounded-full bg-green-100 border border-green-200 items-center justify-center">
//                                     <Text className="text-green-700 font-bold">
//                                         {currentUser?.name?.charAt(0) || 'U'}
//                                     </Text>
//                                 </View>
//                                 <View className="ml-2">
//                                     <Text className="text-green-700 font-medium text-sm">
//                                         {currentUser?.name?.split(' ')[0] || 'User'}
//                                     </Text>
//                                     <Text className="text-green-500 text-xs">
//                                         {currentUser?.role === 'seller'
//                                             ? 'Seller'
//                                             : currentUser?.role === 'buyer_seller'
//                                               ? 'Buyer/Seller'
//                                               : 'Buyer'}
//                                     </Text>
//                                 </View>
//                             </>
//                         ) : (
//                             <View className="flex-row items-center">
//                                 <UserCircleIcon size={24} color="#6B7280" />
//                                 <Text className="ml-2 text-gray-600 font-medium">
//                                     Guest
//                                 </Text>
//                             </View>
//                         )}
//                     </TouchableOpacity>
//                 </View>

//                 {/* Deuxième ligne: Search bar intégrée */}
//                 <View className="px-4 pb-3">
//                     <View className="flex-row items-center bg-gray-50 rounded-xl px-4 py-3 border border-gray-200">
//                         <MagnifyingGlassIcon size={20} color="#6B7280" />
//                         <TextInput
//                             className="flex-1 ml-3 text-gray-800"
//                             placeholder="Search produce, farmers, categories..."
//                             placeholderTextColor="#9CA3AF"
//                             value={searchQuery}
//                             onChangeText={setSearchQuery}
//                             onSubmitEditing={handleSearch}
//                             returnKeyType="search"
//                         />
//                         {searchQuery.length > 0 && (
//                             <TouchableOpacity onPress={() => setSearchQuery('')}>
//                                 <Text className="text-gray-400">✕</Text>
//                             </TouchableOpacity>
//                         )}
//                     </View>
//                 </View>

//                 {/* Troisième ligne: Localisation et liens d'authentification */}
//                 <View className="flex-row items-center justify-between px-4 pb-3">
//                     <View className="flex-row items-center">
//                         <MapPinIcon size={16} color="#4B5563" />
//                         <Text className="ml-2 text-gray-600 text-sm">
//                             {currentUser?.location || 'Lagos, Nigeria'}
//                         </Text>
//                     </View>

//                     {/* Liens d'authentification (texte seulement) */}
//                     <View className="flex-row items-center space-x-4">
//                         {!isAuthenticated ? (
//                             <>
//                                 <TouchableOpacity onPress={handleLogin}>
//                                     <Text className="text-green-600 font-medium">
//                                         Login
//                                     </Text>
//                                 </TouchableOpacity>
//                                 <TouchableOpacity onPress={handleSignup}>
//                                     <Text className="text-gray-600 font-medium">
//                                         Sign Up
//                                     </Text>
//                                 </TouchableOpacity>
//                             </>
//                         ) : (
//                             <>
//                                 <TouchableOpacity onPress={toggleUserDropdown}>
//                                     <Text className="text-green-700 font-medium">
//                                         Profile
//                                     </Text>
//                                 </TouchableOpacity>
//                                 <TouchableOpacity onPress={handleLogin}>
//                                     <Text className="text-red-600 font-medium">
//                                         Logout
//                                     </Text>
//                                 </TouchableOpacity>
//                             </>
//                         )}
//                     </View>
//                 </View>
//             </View>

//             {/* Dropdown du profil utilisateur */}
//             <UserProfileDropdown
//                 user={currentUser}
//                 isVisible={showUserDropdown}
//                 onClose={() => setShowUserDropdown(false)}
//                 onLogout={handleLogin}
//                 onNavigate={handleNavigate}
//                 onAddProduct={handleAddProduct}
//             />

//             {/* Contenu scrollable */}
//             <ScrollView
//                 className="flex-1"
//                 showsVerticalScrollIndicator={false}
//                 contentContainerStyle={{ paddingBottom: 20 }}
//             >
//                 {/* Section Catégories */}
//                 <View className="mb-8 mt-4">
//                     <Text className="text-xl font-bold px-4 mb-4">Categories</Text>
//                     <ScrollView
//                         horizontal
//                         showsHorizontalScrollIndicator={false}
//                         className="pl-4"
//                     >
//                         {categories.map(category => (
//                             <TouchableOpacity
//                                 key={category.id}
//                                 className={`mr-3 px-5 py-3 rounded-full flex-row items-center ${
//                                     selectedCategory === category.name
//                                         ? 'bg-green-600'
//                                         : 'bg-white border border-gray-200'
//                                 }`}
//                                 onPress={() => handleCategorySelect(category.name)}
//                                 activeOpacity={0.7}
//                             >
//                                 {category.icon && (
//                                     <Text className="mr-2">{category.icon}</Text>
//                                 )}
//                                 <Text
//                                     className={`font-medium ${
//                                         selectedCategory === category.name
//                                             ? 'text-white'
//                                             : 'text-gray-700'
//                                     }`}
//                                 >
//                                     {category.name}
//                                 </Text>
//                                 {category.productCount && category.productCount > 0 && (
//                                     <Text
//                                         className={`ml-2 text-xs ${
//                                             selectedCategory === category.name
//                                                 ? 'text-white/80'
//                                                 : 'text-gray-500'
//                                         }`}
//                                     >
//                                         ({category.productCount})
//                                     </Text>
//                                 )}
//                             </TouchableOpacity>
//                         ))}
//                     </ScrollView>
//                 </View>

//                 {/* Section Fresh Arrivals */}
//                 <ProductListing
//                     products={freshArrivals}
//                     title="Fresh Arrivals"
//                     showViewAll
//                     horizontal
//                     onViewAllPress={handleViewAllPress}
//                     onProductPress={handleProductPress}
//                 />

//                 {/* Section Tous les produits */}
//                 <ProductListing
//                     products={filteredProducts}
//                     title={selectedCategory === 'All' ? 'All Products' : selectedCategory}
//                     onProductPress={handleProductPress}
//                     columns={2}
//                     emptyMessage={`No ${selectedCategory.toLowerCase()} found`}
//                 />
//             </ScrollView>

//             {/* Barre de navigation */}
//             <View className="bg-white border-t border-gray-200 px-6 py-4">
//                 <View className="flex-row justify-between items-center">
//                     {navItems.map(item => {
//                         const Icon = item.icon;
//                         const isActive = item.active;

//                         return (
//                             <TouchableOpacity
//                                 key={item.id}
//                                 className="items-center"
//                                 onPress={() => console.log(`Navigate to ${item.label}`)}
//                                 disabled={!isAuthenticated && item.label !== 'Home'}
//                                 activeOpacity={0.7}
//                             >
//                                 <View className="relative">
//                                     <Icon
//                                         size={24}
//                                         color={
//                                             !isAuthenticated && item.label !== 'Home'
//                                                 ? '#D1D5DB'
//                                                 : isActive
//                                                   ? '#059669'
//                                                   : '#6B7280'
//                                         }
//                                     />
//                                     {item.badgeCount &&
//                                         item.badgeCount > 0 &&
//                                         isAuthenticated && (
//                                             <View className="absolute -top-2 -right-2 bg-red-500 rounded-full w-5 h-5 items-center justify-center">
//                                                 <Text className="text-white text-xs font-bold">
//                                                     {item.badgeCount > 9
//                                                         ? '9+'
//                                                         : item.badgeCount}
//                                                 </Text>
//                                             </View>
//                                         )}
//                                 </View>
//                                 <Text
//                                     className={`text-xs mt-1 ${
//                                         !isAuthenticated && item.label !== 'Home'
//                                             ? 'text-gray-300'
//                                             : isActive
//                                               ? 'text-green-600 font-semibold'
//                                               : 'text-gray-500'
//                                     }`}
//                                 >
//                                     {item.label}
//                                 </Text>
//                             </TouchableOpacity>
//                         );
//                     })}

//                     {/* Bouton Sell flottant (seulement si authentifié et vendeur) */}
//                     {isAuthenticated &&
//                         (currentUser?.role === 'seller' ||
//                             currentUser?.role === 'buyer_seller') && (
//                             <TouchableOpacity
//                                 className="absolute -top-8 left-1/2 transform -translate-x-1/2"
//                                 onPress={handleAddProduct}
//                                 activeOpacity={0.8}
//                             >
//                                 <View className="bg-green-600 w-16 h-16 rounded-full items-center justify-center shadow-lg">
//                                     <PlusCircleIcon size={32} color="#FFFFFF" />
//                                 </View>
//                             </TouchableOpacity>
//                         )}
//                 </View>

//                 {/* Indicateur de connexion */}
//                 <View className="mt-3 flex-row justify-center">
//                     <View
//                         className={`px-3 py-1 rounded-full ${isAuthenticated ? 'bg-green-100' : 'bg-yellow-100'}`}
//                     >
//                         <Text
//                             className={`text-xs ${isAuthenticated ? 'text-green-700' : 'text-yellow-700'}`}
//                         >
//                             {isAuthenticated
//                                 ? `👋 Welcome back, ${currentUser?.name?.split(' ')[0] || 'User'}!`
//                                 : '🔓 Login to access all features'}
//                         </Text>
//                     </View>
//                 </View>
//             </View>
//         </SafeAreaView>
//     );
// };

// export default MarketplaceHome;

// ============================================================================

// import React, { useState, useEffect } from 'react';
// import {
//     View,
//     Text,
//     ScrollView,
//     TextInput,
//     TouchableOpacity,
//     StatusBar,
//     ActivityIndicator,
// } from 'react-native';
// import { SafeAreaView } from 'react-native-safe-area-context';
// import {
//     MagnifyingGlassIcon,
//     MapPinIcon,
//     BellIcon,
//     HomeIcon,
//     ShoppingCartIcon,
//     ChatBubbleLeftRightIcon,
//     UserIcon,
//     PlusCircleIcon,
//     UserCircleIcon,
// } from 'react-native-heroicons/outline';
// import ProductListing from './ProductListing';
// import AgroConnectLogo from './AgroConnectLogo';
// import UserProfileDropdown from './UserProfileDropdown';
// import {
//     users,
//     categories,
//     freshArrivals,
//     allProducts,
//     notifications,
// } from '@/constants/data';
// import { User, Product } from '@/interfaces';

// const MarketplaceHome = () => {
//     const [selectedCategory, setSelectedCategory] = useState('All');
//     const [searchQuery, setSearchQuery] = useState('');
//     const [currentUser, setCurrentUser] = useState<User | null>(null);
//     const [filteredProducts, setFilteredProducts] = useState<Product[]>(allProducts);
//     const [loading, setLoading] = useState(false);
//     const [unreadNotifications, setUnreadNotifications] = useState(0);
//     const [isAuthenticated, setIsAuthenticated] = useState(false);
//     const [showUserDropdown, setShowUserDropdown] = useState(false);

//     // Initialisation
//     useEffect(() => {
//         setLoading(true);

//         setTimeout(() => {
//             const user = users[0];
//             setCurrentUser(user);
//             setIsAuthenticated(true);

//             const unread = notifications.filter(
//                 n => !n.read && n.userId === user.id,
//             ).length;
//             setUnreadNotifications(unread);

//             setLoading(false);
//         }, 1000);
//     }, []);

//     // Filtrage des produits
//     useEffect(() => {
//         let filtered = allProducts;

//         if (selectedCategory !== 'All') {
//             filtered = filtered.filter(product => product.category === selectedCategory);
//         }

//         if (searchQuery.trim() !== '') {
//             const query = searchQuery.toLowerCase();
//             filtered = filtered.filter(
//                 product =>
//                     product.name.toLowerCase().includes(query) ||
//                     product.seller.toLowerCase().includes(query) ||
//                     product.description?.toLowerCase().includes(query) ||
//                     product.tags?.some(tag => tag.toLowerCase().includes(query)),
//             );
//         }

//         setFilteredProducts(filtered);
//     }, [selectedCategory, searchQuery]);

//     const handleCategorySelect = (categoryName: string) => {
//         setSelectedCategory(categoryName);
//     };

//     const handleProductPress = (product: Product) => {
//         console.log('Product pressed:', product.name);
//         // Navigation vers la page détail du produit
//     };

//     const handleViewAllPress = () => {
//         console.log('View all pressed');
//         // Navigation vers la liste complète
//     };

//     const handleSearch = () => {
//         console.log('Search for:', searchQuery);
//     };

//     const handleLogin = () => {
//         if (isAuthenticated) {
//             setIsAuthenticated(false);
//             setCurrentUser(null);
//             setUnreadNotifications(0);
//             setShowUserDropdown(false);
//             console.log('User logged out');
//         } else {
//             setIsAuthenticated(true);
//             setCurrentUser(users[0]);
//             console.log('User logged in');
//         }
//     };

//     const handleSignup = () => {
//         console.log('Navigate to signup screen');
//         // Navigation vers la page d'inscription
//     };

//     const handleNavigate = (screen: string) => {
//         console.log('Navigate to:', screen);
//         // Implémentez la navigation ici
//     };

//     const handleAddProduct = () => {
//         console.log('Navigate to add product screen');
//         setShowUserDropdown(false);
//         // Navigation vers l'écran d'ajout de produit
//     };

//     const toggleUserDropdown = () => {
//         if (isAuthenticated) {
//             setShowUserDropdown(!showUserDropdown);
//         } else {
//             handleLogin(); // Si non connecté, redirige vers login
//         }
//     };

//     const navItems = [
//         { id: '1', icon: HomeIcon, label: 'Home', active: true },
//         { id: '2', icon: ShoppingCartIcon, label: 'Market' },
//         {
//             id: '3',
//             icon: ShoppingCartIcon,
//             label: 'Cart',
//             badgeCount: currentUser?.cartItems?.length || 0,
//         },
//         { id: '4', icon: ChatBubbleLeftRightIcon, label: 'Chat', badgeCount: 2 },
//         { id: '5', icon: UserIcon, label: 'Profile' },
//     ];

//     if (loading) {
//         return (
//             <SafeAreaView className="flex-1 bg-gray-50 justify-center items-center">
//                 <ActivityIndicator size="large" color="#10B981" />
//                 <Text className="mt-4 text-gray-600">Loading...</Text>
//             </SafeAreaView>
//         );
//     }

//     return (
//         <SafeAreaView className="flex-1 bg-gray-50">
//             <StatusBar barStyle="dark-content" backgroundColor="#F9FAFB" />

//             {/* Header fixe */}
//             <View className="bg-white border-b border-gray-200">
//                 {/* Première ligne: Logo à gauche extrême et User à droite */}
//                 <View className="flex-row items-center justify-between px-4 pt-2 pb-3">
//                     {/* Logo AgroConnect à l'extrême gauche */}
//                     <View className="flex-row items-center">
//                         <AgroConnectLogo size={36} />
//                         <View className="ml-3">
//                             <Text className="text-lg font-bold text-green-900">
//                                 AgroConnect
//                             </Text>
//                         </View>
//                     </View>

//                     {/* User avec avatar seulement (sans nom) */}
//                     <TouchableOpacity
//                         onPress={toggleUserDropdown}
//                         className="flex-row items-center"
//                         activeOpacity={0.7}
//                     >
//                         {isAuthenticated ? (
//                             <View className="w-10 h-10 rounded-full bg-green-100 border border-green-200 items-center justify-center">
//                                 <Text className="text-green-700 font-bold text-base">
//                                     {currentUser?.name?.charAt(0) || 'U'}
//                                 </Text>
//                             </View>
//                         ) : (
//                             <View className="flex-row items-center">
//                                 <UserCircleIcon size={28} color="#6B7280" />
//                             </View>
//                         )}
//                     </TouchableOpacity>
//                 </View>

//                 {/* Deuxième ligne: Search bar intégrée */}
//                 <View className="px-4 pb-3">
//                     <View className="flex-row items-center bg-gray-50 rounded-xl px-4 py-3 border border-gray-200">
//                         <MagnifyingGlassIcon size={20} color="#6B7280" />
//                         <TextInput
//                             className="flex-1 ml-3 text-gray-800"
//                             placeholder="Search produce, farmers, categories..."
//                             placeholderTextColor="#9CA3AF"
//                             value={searchQuery}
//                             onChangeText={setSearchQuery}
//                             onSubmitEditing={handleSearch}
//                             returnKeyType="search"
//                         />
//                         {searchQuery.length > 0 && (
//                             <TouchableOpacity onPress={() => setSearchQuery('')}>
//                                 <Text className="text-gray-400">✕</Text>
//                             </TouchableOpacity>
//                         )}
//                     </View>
//                 </View>

//                 {/* Troisième ligne: Localisation et liens d'authentification */}
//                 <View className="flex-row items-center justify-between px-4 pb-3">
//                     <View className="flex-row items-center">
//                         <MapPinIcon size={16} color="#4B5563" />
//                         <Text className="ml-2 text-gray-600 text-sm">
//                             {currentUser?.location || 'Lagos, Nigeria'}
//                         </Text>
//                     </View>

//                     {/* Liens d'authentification (texte seulement) - Sans "Profile" si connecté */}
//                     <View className="flex-row items-center space-x-4">
//                         {!isAuthenticated ? (
//                             <>
//                                 <TouchableOpacity onPress={handleLogin}>
//                                     <Text className="text-green-600 font-medium">
//                                         Login
//                                     </Text>
//                                 </TouchableOpacity>
//                                 <TouchableOpacity onPress={handleSignup}>
//                                     <Text className="text-gray-600 font-medium">
//                                         Sign Up
//                                     </Text>
//                                 </TouchableOpacity>
//                             </>
//                         ) : (
//                             <TouchableOpacity onPress={handleLogin}>
//                                 <Text className="text-red-600 font-medium">Logout</Text>
//                             </TouchableOpacity>
//                         )}
//                     </View>
//                 </View>
//             </View>

//             {/* Dropdown du profil utilisateur */}
//             <UserProfileDropdown
//                 user={currentUser}
//                 isVisible={showUserDropdown}
//                 onClose={() => setShowUserDropdown(false)}
//                 onLogout={handleLogin}
//                 onNavigate={handleNavigate}
//                 onAddProduct={handleAddProduct}
//             />

//             {/* Contenu scrollable */}
//             <ScrollView
//                 className="flex-1"
//                 showsVerticalScrollIndicator={false}
//                 contentContainerStyle={{ paddingBottom: 20 }}
//             >
//                 {/* Section Catégories */}
//                 <View className="mb-8 mt-4">
//                     <Text className="text-xl font-bold px-4 mb-4">Categories</Text>
//                     <ScrollView
//                         horizontal
//                         showsHorizontalScrollIndicator={false}
//                         className="pl-4"
//                     >
//                         {categories.map(category => (
//                             <TouchableOpacity
//                                 key={category.id}
//                                 className={`mr-3 px-5 py-3 rounded-full flex-row items-center ${
//                                     selectedCategory === category.name
//                                         ? 'bg-green-600'
//                                         : 'bg-white border border-gray-200'
//                                 }`}
//                                 onPress={() => handleCategorySelect(category.name)}
//                                 activeOpacity={0.7}
//                             >
//                                 {category.icon && (
//                                     <Text className="mr-2">{category.icon}</Text>
//                                 )}
//                                 <Text
//                                     className={`font-medium ${
//                                         selectedCategory === category.name
//                                             ? 'text-white'
//                                             : 'text-gray-700'
//                                     }`}
//                                 >
//                                     {category.name}
//                                 </Text>
//                                 {category.productCount && category.productCount > 0 && (
//                                     <Text
//                                         className={`ml-2 text-xs ${
//                                             selectedCategory === category.name
//                                                 ? 'text-white/80'
//                                                 : 'text-gray-500'
//                                         }`}
//                                     >
//                                         ({category.productCount})
//                                     </Text>
//                                 )}
//                             </TouchableOpacity>
//                         ))}
//                     </ScrollView>
//                 </View>

//                 {/* Section Fresh Arrivals */}
//                 <ProductListing
//                     products={freshArrivals}
//                     title="Fresh Arrivals"
//                     showViewAll
//                     horizontal
//                     onViewAllPress={handleViewAllPress}
//                     onProductPress={handleProductPress}
//                 />

//                 {/* Section Tous les produits */}
//                 <ProductListing
//                     products={filteredProducts}
//                     title={selectedCategory === 'All' ? 'All Products' : selectedCategory}
//                     onProductPress={handleProductPress}
//                     columns={2}
//                     emptyMessage={`No ${selectedCategory.toLowerCase()} found`}
//                 />
//             </ScrollView>

//             {/* Barre de navigation */}
//             <View className="bg-white border-t border-gray-200 px-6 py-4">
//                 <View className="flex-row justify-between items-center">
//                     {navItems.map(item => {
//                         const Icon = item.icon;
//                         const isActive = item.active;

//                         return (
//                             <TouchableOpacity
//                                 key={item.id}
//                                 className="items-center"
//                                 onPress={() => console.log(`Navigate to ${item.label}`)}
//                                 disabled={!isAuthenticated && item.label !== 'Home'}
//                                 activeOpacity={0.7}
//                             >
//                                 <View className="relative">
//                                     <Icon
//                                         size={24}
//                                         color={
//                                             !isAuthenticated && item.label !== 'Home'
//                                                 ? '#D1D5DB'
//                                                 : isActive
//                                                   ? '#059669'
//                                                   : '#6B7280'
//                                         }
//                                     />
//                                     {item.badgeCount &&
//                                         item.badgeCount > 0 &&
//                                         isAuthenticated && (
//                                             <View className="absolute -top-2 -right-2 bg-red-500 rounded-full w-5 h-5 items-center justify-center">
//                                                 <Text className="text-white text-xs font-bold">
//                                                     {item.badgeCount > 9
//                                                         ? '9+'
//                                                         : item.badgeCount}
//                                                 </Text>
//                                             </View>
//                                         )}
//                                 </View>
//                                 <Text
//                                     className={`text-xs mt-1 ${
//                                         !isAuthenticated && item.label !== 'Home'
//                                             ? 'text-gray-300'
//                                             : isActive
//                                               ? 'text-green-600 font-semibold'
//                                               : 'text-gray-500'
//                                     }`}
//                                 >
//                                     {item.label}
//                                 </Text>
//                             </TouchableOpacity>
//                         );
//                     })}

//                     {/* Bouton Sell flottant (seulement si authentifié et vendeur) */}
//                     {isAuthenticated &&
//                         (currentUser?.role === 'seller' ||
//                             currentUser?.role === 'buyer_seller') && (
//                             <TouchableOpacity
//                                 className="absolute -top-8 left-1/2 transform -translate-x-1/2"
//                                 onPress={handleAddProduct}
//                                 activeOpacity={0.8}
//                             >
//                                 <View className="bg-green-600 w-16 h-16 rounded-full items-center justify-center shadow-lg">
//                                     <PlusCircleIcon size={32} color="#FFFFFF" />
//                                 </View>
//                             </TouchableOpacity>
//                         )}
//                 </View>

//                 {/* Indicateur de connexion */}
//                 <View className="mt-3 flex-row justify-center">
//                     <View
//                         className={`px-3 py-1 rounded-full ${isAuthenticated ? 'bg-green-100' : 'bg-yellow-100'}`}
//                     >
//                         <Text
//                             className={`text-xs ${isAuthenticated ? 'text-green-700' : 'text-yellow-700'}`}
//                         >
//                             {isAuthenticated
//                                 ? `👋 Welcome back, ${currentUser?.name?.split(' ')[0] || 'User'}!`
//                                 : '🔓 Login to access all features'}
//                         </Text>
//                     </View>
//                 </View>
//             </View>
//         </SafeAreaView>
//     );
// };

// export default MarketplaceHome;

// ========================================================================================

import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    ScrollView,
    TextInput,
    TouchableOpacity,
    StatusBar,
    ActivityIndicator,
    Alert,
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
    UserCircleIcon,
} from 'react-native-heroicons/outline';
import ProductListing from './ProductListing';
import AgroConnectLogo from './AgroConnectLogo';
import UserProfileDropdown from './UserProfileDropdown';
import {
    users,
    categories,
    freshArrivals,
    allProducts,
    notifications,
} from '@/constants/data';
import { User, Product } from '@/interfaces';

const MarketplaceHome = () => {
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [searchQuery, setSearchQuery] = useState('');
    const [currentUser, setCurrentUser] = useState<User | null>(null);
    const [filteredProducts, setFilteredProducts] = useState<Product[]>(allProducts);
    const [loading, setLoading] = useState(false);
    const [unreadNotifications, setUnreadNotifications] = useState(0);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [showUserDropdown, setShowUserDropdown] = useState(false);

    // Initialisation
    useEffect(() => {
        setLoading(true);

        setTimeout(() => {
            const user = users[0];
            setCurrentUser(user);
            setIsAuthenticated(true);

            const unread = notifications.filter(
                n => !n.read && n.userId === user.id,
            ).length;
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
            filtered = filtered.filter(
                product =>
                    product.name.toLowerCase().includes(query) ||
                    product.seller.toLowerCase().includes(query) ||
                    product.description?.toLowerCase().includes(query) ||
                    product.tags?.some(tag => tag.toLowerCase().includes(query)),
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

    const handleLogin = () => {
        if (isAuthenticated) {
            setIsAuthenticated(false);
            setCurrentUser(null);
            setUnreadNotifications(0);
            setShowUserDropdown(false);
            console.log('User logged out');
        } else {
            setIsAuthenticated(true);
            setCurrentUser(users[0]);
            console.log('User logged in');
        }
    };

    const handleSignup = () => {
        console.log('Navigate to signup screen');
        // Navigation vers la page d'inscription
    };

    const handleNavigate = (screen: string) => {
        console.log('Navigate to:', screen);
        // Implémentez la navigation ici
    };

    const handleAddProduct = () => {
        if (!isAuthenticated) {
            // Si non connecté, demande de se connecter
            Alert.alert(
                'Authentication Required',
                'Please login or sign up to add products to the marketplace.',
                [
                    {
                        text: 'Cancel',
                        style: 'cancel',
                    },
                    {
                        text: 'Login',
                        onPress: () => {
                            // Simuler la connexion
                            setIsAuthenticated(true);
                            setCurrentUser(users[0]);
                            // Puis ouvrir le dropdown pour montrer "Add Product"
                            setTimeout(() => {
                                setShowUserDropdown(true);
                            }, 500);
                        },
                    },
                    {
                        text: 'Sign Up',
                        onPress: handleSignup,
                    },
                ],
                { cancelable: true },
            );
        } else if (
            currentUser?.role === 'seller' ||
            currentUser?.role === 'buyer_seller'
        ) {
            // Si connecté et vendeur, ajouter produit
            console.log('Navigate to add product screen');
            setShowUserDropdown(false);
            // Navigation vers l'écran d'ajout de produit
        } else {
            // Si connecté mais pas vendeur
            Alert.alert(
                'Seller Account Required',
                'You need a seller account to add products. Would you like to upgrade your account?',
                [
                    {
                        text: 'Later',
                        style: 'cancel',
                    },
                    {
                        text: 'Upgrade Now',
                        onPress: () => {
                            console.log('Navigate to upgrade account screen');
                            // Navigation vers l'écran de mise à niveau du compte
                        },
                    },
                ],
            );
        }
    };

    const handleFloatingButtonPress = () => {
        if (!isAuthenticated) {
            // Si non connecté, demande de se connecter
            Alert.alert(
                'Join AgroConnect',
                'Connect with farmers and buyers. Login or sign up to start selling!',
                [
                    {
                        text: 'Maybe Later',
                        style: 'cancel',
                    },
                    {
                        text: 'Login',
                        onPress: () => {
                            setIsAuthenticated(true);
                            setCurrentUser(users[0]);
                            // Après connexion, ouvrir le dropdown
                            setTimeout(() => {
                                setShowUserDropdown(true);
                            }, 500);
                        },
                    },
                    {
                        text: 'Sign Up',
                        onPress: handleSignup,
                    },
                ],
            );
        } else {
            // Si connecté, gérer selon le rôle
            if (currentUser?.role === 'seller' || currentUser?.role === 'buyer_seller') {
                handleAddProduct();
            } else {
                Alert.alert(
                    'Become a Seller',
                    'Upgrade to a seller account to start listing your products on AgroConnect.',
                    [
                        {
                            text: 'Not Now',
                            style: 'cancel',
                        },
                        {
                            text: 'Upgrade Account',
                            onPress: () => console.log('Navigate to upgrade screen'),
                        },
                    ],
                );
            }
        }
    };

    const toggleUserDropdown = () => {
        if (isAuthenticated) {
            setShowUserDropdown(!showUserDropdown);
        } else {
            Alert.alert(
                'Welcome to AgroConnect',
                'Login to access your profile, favorites, and seller tools.',
                [
                    {
                        text: 'Skip',
                        style: 'cancel',
                    },
                    {
                        text: 'Login',
                        onPress: () => {
                            setIsAuthenticated(true);
                            setCurrentUser(users[0]);
                            // Ouvrir le dropdown après connexion
                            setTimeout(() => {
                                setShowUserDropdown(true);
                            }, 500);
                        },
                    },
                    {
                        text: 'Create Account',
                        onPress: handleSignup,
                    },
                ],
            );
        }
    };

    const navItems = [
        { id: '1', icon: HomeIcon, label: 'Home', active: true },
        { id: '2', icon: ShoppingCartIcon, label: 'Market' },
        {
            id: '3',
            icon: ShoppingCartIcon,
            label: 'Cart',
            badgeCount: currentUser?.cartItems?.length || 0,
        },
        { id: '4', icon: ChatBubbleLeftRightIcon, label: 'Chat', badgeCount: 2 },
        { id: '5', icon: UserIcon, label: 'Profile' },
    ];

    if (loading) {
        return (
            <SafeAreaView className="flex-1 bg-gray-50 justify-center items-center">
                <ActivityIndicator size="large" color="#10B981" />
                <Text className="mt-4 text-gray-600">Loading...</Text>
            </SafeAreaView>
        );
    }

    return (
        <SafeAreaView className="flex-1 bg-gray-50">
            <StatusBar barStyle="dark-content" backgroundColor="#F9FAFB" />

            {/* Header fixe */}
            <View className="bg-white border-b border-gray-200">
                {/* Première ligne: Logo à gauche extrême et User à droite */}
                <View className="flex-row items-center justify-between px-4 pt-2 pb-3">
                    {/* Logo AgroConnect à l'extrême gauche */}
                    <View className="flex-row items-center">
                        <AgroConnectLogo size={36} />
                        <View className="ml-3">
                            <Text className="text-lg font-bold text-green-900">
                                AgroConnect
                            </Text>
                        </View>
                    </View>

                    {/* User avec avatar seulement (sans nom) */}
                    <TouchableOpacity
                        onPress={toggleUserDropdown}
                        className="flex-row items-center"
                        activeOpacity={0.7}
                    >
                        {isAuthenticated ? (
                            <View className="w-10 h-10 rounded-full bg-green-100 border border-green-200 items-center justify-center">
                                <Text className="text-green-700 font-bold text-base">
                                    {currentUser?.name?.charAt(0) || 'U'}
                                </Text>
                            </View>
                        ) : (
                            <View className="flex-row items-center">
                                <UserCircleIcon size={28} color="#6B7280" />
                            </View>
                        )}
                    </TouchableOpacity>
                </View>

                {/* Deuxième ligne: Search bar intégrée */}
                <View className="px-4 pb-3">
                    <View className="flex-row items-center bg-gray-50 rounded-xl px-4 py-3 border border-gray-200">
                        <MagnifyingGlassIcon size={20} color="#6B7280" />
                        <TextInput
                            className="flex-1 ml-3 text-gray-800"
                            placeholder="Search produce, farmers, categories..."
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

                {/* Troisième ligne: Localisation et liens d'authentification */}
                <View className="flex-row items-center justify-between px-4 pb-3">
                    <View className="flex-row items-center">
                        <MapPinIcon size={16} color="#4B5563" />
                        <Text className="ml-2 text-gray-600 text-sm">
                            {currentUser?.location || 'Lagos, Nigeria'}
                        </Text>
                    </View>

                    {/* Liens d'authentification (texte seulement) - Sans "Profile" si connecté */}
                    <View className="flex-row items-center space-x-4">
                        {!isAuthenticated ? (
                            <>
                                <TouchableOpacity onPress={handleLogin}>
                                    <Text className="text-green-600 font-medium">
                                        Login
                                    </Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={handleSignup}>
                                    <Text className="text-gray-600 font-medium">
                                        Sign Up
                                    </Text>
                                </TouchableOpacity>
                            </>
                        ) : (
                            <TouchableOpacity onPress={handleLogin}>
                                <Text className="text-red-600 font-medium">Logout</Text>
                            </TouchableOpacity>
                        )}
                    </View>
                </View>
            </View>

            {/* Dropdown du profil utilisateur */}
            <UserProfileDropdown
                user={currentUser}
                isVisible={showUserDropdown}
                onClose={() => setShowUserDropdown(false)}
                onLogout={handleLogin}
                onNavigate={handleNavigate}
                onAddProduct={handleAddProduct}
            />

            {/* Contenu scrollable */}
            <ScrollView
                className="flex-1"
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingBottom: 20 }}
            >
                {/* Section Catégories */}
                <View className="mb-8 mt-4">
                    <Text className="text-xl font-bold px-4 mb-4">Categories</Text>
                    <ScrollView
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        className="pl-4"
                    >
                        {categories.map(category => (
                            <TouchableOpacity
                                key={category.id}
                                className={`mr-3 px-5 py-3 rounded-full flex-row items-center ${
                                    selectedCategory === category.name
                                        ? 'bg-green-600'
                                        : 'bg-white border border-gray-200'
                                }`}
                                onPress={() => handleCategorySelect(category.name)}
                                activeOpacity={0.7}
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
                    columns={undefined}
                    emptyMessage={`No ${selectedCategory.toLowerCase()} found`}
                />
            </ScrollView>

            {/* Barre de navigation */}
            <View className="bg-white border-t border-gray-200 px-6 py-4">
                <View className="flex-row justify-between items-center">
                    {navItems.map(item => {
                        const Icon = item.icon;
                        const isActive = item.active;

                        return (
                            <TouchableOpacity
                                key={item.id}
                                className="items-center"
                                onPress={() => {
                                    if (!isAuthenticated && item.label !== 'Home') {
                                        Alert.alert(
                                            'Authentication Required',
                                            `Please login to access ${item.label}.`,
                                            [
                                                { text: 'Cancel', style: 'cancel' },
                                                { text: 'Login', onPress: handleLogin },
                                            ],
                                        );
                                    } else {
                                        console.log(`Navigate to ${item.label}`);
                                    }
                                }}
                                disabled={!isAuthenticated && item.label !== 'Home'}
                                activeOpacity={0.7}
                            >
                                <View className="relative">
                                    <Icon
                                        size={24}
                                        color={
                                            !isAuthenticated && item.label !== 'Home'
                                                ? '#D1D5DB'
                                                : isActive
                                                  ? '#059669'
                                                  : '#6B7280'
                                        }
                                    />
                                    {item.badgeCount &&
                                        item.badgeCount > 0 &&
                                        isAuthenticated && (
                                            <View className="absolute -top-2 -right-2 bg-red-500 rounded-full w-5 h-5 items-center justify-center">
                                                <Text className="text-white text-xs font-bold">
                                                    {item.badgeCount > 9
                                                        ? '9+'
                                                        : item.badgeCount}
                                                </Text>
                                            </View>
                                        )}
                                </View>
                                <Text
                                    className={`text-xs mt-1 ${
                                        !isAuthenticated && item.label !== 'Home'
                                            ? 'text-gray-300'
                                            : isActive
                                              ? 'text-green-600 font-semibold'
                                              : 'text-gray-500'
                                    }`}
                                >
                                    {item.label}
                                </Text>
                            </TouchableOpacity>
                        );
                    })}

                    {/* Bouton Sell flottant - Gère toutes les authentications */}
                    <TouchableOpacity
                        className="absolute -top-8 left-1/2 transform -translate-x-1/2"
                        onPress={handleFloatingButtonPress}
                        activeOpacity={0.8}
                    >
                        <View
                            className={`w-16 h-16 rounded-full items-center justify-center shadow-lg ${
                                !isAuthenticated
                                    ? 'bg-yellow-500'
                                    : currentUser?.role === 'seller' ||
                                        currentUser?.role === 'buyer_seller'
                                      ? 'bg-green-600'
                                      : 'bg-blue-500'
                            }`}
                        >
                            <PlusCircleIcon size={32} color="#FFFFFF" />
                        </View>

                        {/* Badge pour indiquer l'état */}
                        {!isAuthenticated && (
                            <View className="absolute -top-1 -right-1 bg-red-500 rounded-full w-6 h-6 items-center justify-center">
                                <Text className="text-white text-xs">!</Text>
                            </View>
                        )}
                    </TouchableOpacity>
                </View>

                {/* Indicateur de connexion */}
                <View className="mt-3 flex-row justify-center">
                    <View
                        className={`px-3 py-1 rounded-full ${isAuthenticated ? 'bg-green-100' : 'bg-yellow-100'}`}
                    >
                        <Text
                            className={`text-xs ${isAuthenticated ? 'text-green-700' : 'text-yellow-700'}`}
                        >
                            {isAuthenticated
                                ? `👋 Welcome back, ${currentUser?.name?.split(' ')[0] || 'User'}!`
                                : '🔓 Login to access all features'}
                        </Text>
                    </View>
                </View>
            </View>
        </SafeAreaView>
    );
};

export default MarketplaceHome;
