// components/common/UserProfileDropdown.tsx
import React, { useState, useRef } from 'react';
import { View, Text, TouchableOpacity, Modal, Animated, StyleSheet } from 'react-native';
import {
    UserIcon,
    Cog6ToothIcon,
    HeartIcon,
    ShoppingBagIcon,
    ArrowRightOnRectangleIcon,
    ChevronUpIcon,
    UserCircleIcon,
    ListBulletIcon,
    ShieldCheckIcon,
    PlusCircleIcon,
    TagIcon,
    ChartBarIcon,
} from 'react-native-heroicons/outline';
import { User } from '@/interfaces';

interface UserProfileDropdownProps {
    user: User | null;
    isVisible: boolean;
    onClose: () => void;
    onLogout: () => void;
    onNavigate: (screen: string) => void;
    onAddProduct: () => void; // Nouvelle prop
}

const UserProfileDropdown = ({
    user,
    isVisible,
    onClose,
    onLogout,
    onNavigate,
    onAddProduct,
}: UserProfileDropdownProps) => {
    const slideAnim = useRef(new Animated.Value(300)).current;

    React.useEffect(() => {
        if (isVisible) {
            Animated.spring(slideAnim, {
                toValue: 0,
                tension: 50,
                friction: 10,
                useNativeDriver: true,
            }).start();
        } else {
            Animated.spring(slideAnim, {
                toValue: 300,
                tension: 50,
                friction: 10,
                useNativeDriver: true,
            }).start();
        }
    }, [isVisible]);

    // Items pour tous les utilisateurs
    const commonItems = [
        {
            id: 'profile',
            icon: UserCircleIcon,
            label: 'My Profile',
            color: '#3B82F6',
            onPress: () => onNavigate('Profile'),
        },
        {
            id: 'favorites',
            icon: HeartIcon,
            label: 'Favorites',
            color: '#EC4899',
            onPress: () => onNavigate('Favorites'),
        },
        {
            id: 'orders',
            icon: ShoppingBagIcon,
            label: 'My Orders',
            color: '#F59E0B',
            onPress: () => onNavigate('Orders'),
        },
        {
            id: 'settings',
            icon: Cog6ToothIcon,
            label: 'Settings',
            color: '#6B7280',
            onPress: () => onNavigate('Settings'),
        },
    ];

    // Items spécifiques aux vendeurs
    const sellerItems =
        user?.role === 'seller' || user?.role === 'buyer_seller'
            ? [
                  {
                      id: 'add-product',
                      icon: PlusCircleIcon,
                      label: 'Add Product',
                      color: '#10B981',
                      onPress: onAddProduct,
                  },
                  {
                      id: 'listings',
                      icon: ListBulletIcon,
                      label: 'My Listings',
                      color: '#8B5CF6',
                      onPress: () => onNavigate('Listings'),
                  },
                  {
                      id: 'analytics',
                      icon: ChartBarIcon,
                      label: 'Analytics',
                      color: '#6366F1',
                      onPress: () => onNavigate('Analytics'),
                  },
                  {
                      id: 'manage-products',
                      icon: TagIcon,
                      label: 'Manage Products',
                      color: '#F97316',
                      onPress: () => onNavigate('ManageProducts'),
                  },
              ]
            : [];

    // Items de sécurité
    const securityItems = [
        {
            id: 'security',
            icon: ShieldCheckIcon,
            label: 'Security',
            color: '#10B981',
            onPress: () => onNavigate('Security'),
        },
        {
            id: 'logout',
            icon: ArrowRightOnRectangleIcon,
            label: 'Logout',
            color: '#EF4444',
            onPress: onLogout,
        },
    ];

    // Combinez tous les items
    const menuItems = [...commonItems, ...sellerItems, ...securityItems];

    if (!isVisible) return null;

    return (
        <Modal
            transparent
            visible={isVisible}
            animationType="fade"
            onRequestClose={onClose}
        >
            <TouchableOpacity style={styles.overlay} activeOpacity={1} onPress={onClose}>
                <Animated.View
                    style={[
                        styles.dropdown,
                        {
                            transform: [{ translateY: slideAnim }],
                        },
                    ]}
                >
                    {/* Flèche vers le haut */}
                    <View className="items-center mb-2">
                        <ChevronUpIcon size={24} color="#6B7280" />
                    </View>

                    {/* En-tête du profil */}
                    <View className="flex-row items-center px-4 py-3 border-b border-gray-200">
                        <View className="w-12 h-12 rounded-full bg-green-100 items-center justify-center mr-3">
                            <Text className="text-green-700 text-xl font-bold">
                                {user?.name?.charAt(0) || 'U'}
                            </Text>
                        </View>
                        <View className="flex-1">
                            <Text className="font-bold text-gray-900">
                                {user?.name || 'Guest'}
                            </Text>
                            <Text className="text-gray-500 text-sm">
                                {user?.email || 'Not logged in'}
                            </Text>
                            {user?.role && (
                                <View className="mt-1 flex-row items-center">
                                    <Text
                                        className={`text-xs px-2 py-1 rounded-full ${
                                            user.role === 'seller'
                                                ? 'bg-purple-100 text-purple-700'
                                                : user.role === 'buyer_seller'
                                                  ? 'bg-blue-100 text-blue-700'
                                                  : 'bg-green-100 text-green-700'
                                        }`}
                                    >
                                        {user.role.charAt(0).toUpperCase() +
                                            user.role.slice(1)}
                                    </Text>
                                    {sellerItems.length > 0 && (
                                        <Text className="text-xs text-green-600 ml-2">
                                            • Seller Account
                                        </Text>
                                    )}
                                </View>
                            )}
                        </View>
                    </View>

                    {/* Section: Mes achats */}
                    <View className="pt-3 px-4">
                        <Text className="text-xs font-semibold text-gray-500 uppercase mb-2">
                            My Account
                        </Text>
                        {commonItems.map(item => (
                            <TouchableOpacity
                                key={item.id}
                                className="flex-row items-center py-3 active:bg-gray-50"
                                onPress={() => {
                                    item.onPress();
                                    onClose();
                                }}
                            >
                                <item.icon size={22} color={item.color} />
                                <Text className="ml-3 text-gray-700 font-medium">
                                    {item.label}
                                </Text>
                            </TouchableOpacity>
                        ))}
                    </View>

                    {/* Section: Vendeur (seulement pour les vendeurs) */}
                    {sellerItems.length > 0 && (
                        <View className="pt-2 px-4 border-t border-gray-100">
                            <Text className="text-xs font-semibold text-gray-500 uppercase mb-2">
                                Seller Tools
                            </Text>
                            {sellerItems.map(item => (
                                <TouchableOpacity
                                    key={item.id}
                                    className="flex-row items-center py-3 active:bg-gray-50"
                                    onPress={() => {
                                        item.onPress();
                                        onClose();
                                    }}
                                >
                                    <item.icon size={22} color={item.color} />
                                    <Text className="ml-3 text-gray-700 font-medium">
                                        {item.label}
                                    </Text>
                                    {item.id === 'add-product' && (
                                        <View className="ml-auto bg-green-100 px-2 py-1 rounded-full">
                                            <Text className="text-green-700 text-xs font-bold">
                                                NEW
                                            </Text>
                                        </View>
                                    )}
                                </TouchableOpacity>
                            ))}
                        </View>
                    )}

                    {/* Section: Sécurité */}
                    <View className="pt-2 px-4 border-t border-gray-100">
                        <Text className="text-xs font-semibold text-gray-500 uppercase mb-2">
                            Security
                        </Text>
                        {securityItems.map(item => (
                            <TouchableOpacity
                                key={item.id}
                                className="flex-row items-center py-3 active:bg-gray-50"
                                onPress={() => {
                                    item.onPress();
                                    onClose();
                                }}
                            >
                                <item.icon size={22} color={item.color} />
                                <Text className="ml-3 text-gray-700 font-medium">
                                    {item.label}
                                </Text>
                            </TouchableOpacity>
                        ))}
                    </View>

                    {/* Pied de page */}
                    <View className="px-4 py-3 border-t border-gray-200 mt-2">
                        <Text className="text-xs text-gray-500 text-center">
                            AgroConnect v1.0 • {user ? 'Connected' : 'Guest Mode'}
                        </Text>
                        {user && (
                            <Text className="text-xs text-gray-400 text-center mt-1">
                                Member since {user.joinedDate || '2024'}
                            </Text>
                        )}
                    </View>
                </Animated.View>
            </TouchableOpacity>
        </Modal>
    );
};

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.3)',
        justifyContent: 'flex-start',
        alignItems: 'center',
        paddingTop: 60,
    },
    dropdown: {
        backgroundColor: 'white',
        borderRadius: 16,
        width: '90%',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 12,
        elevation: 5,
    },
});

export default UserProfileDropdown;
