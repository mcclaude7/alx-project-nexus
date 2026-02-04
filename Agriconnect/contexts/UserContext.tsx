// contexts/UserContext.tsx
import React, { createContext, useContext, useState, ReactNode } from 'react';
import { users, cartItems, orders } from '@/constants/data';
import { User, CartItem, Order } from '@/interfaces';

interface UserContextType {
  currentUser: User | null;
  userCart: CartItem[];
  userOrders: Order[];
  favoriteProducts: string[];
  login: (email: string) => void;
  logout: () => void;
  updateProfile: (updates: Partial<User>) => void;
  addToCart: (productId: string, quantity: number) => void;
  removeFromCart: (itemId: string) => void;
  updateCartItem: (itemId: string, quantity: number) => void;
  clearCart: () => void;
  addToFavorites: (productId: string) => void;
  removeFromFavorites: (productId: string) => void;
  placeOrder: (items: CartItem[], address: string, paymentMethod: string) => string;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [userCart, setUserCart] = useState<CartItem[]>(cartItems);
  const [userOrders, setUserOrders] = useState<Order[]>(orders);
  const [favoriteProducts, setFavoriteProducts] = useState<string[]>(['2', '7', '11']);

  const login = (email: string) => {
    const user = users.find(u => u.email === email);
    if (user) {
      setCurrentUser(user);
      // Filtrer le panier pour cet utilisateur
      const userCartItems = cartItems.filter(item => 
        user.cartItems?.includes(item.id)
      );
      setUserCart(userCartItems);
      
      // Filtrer les commandes pour cet utilisateur
      const userOrderList = orders.filter(order => 
        order.userId === user.id
      );
      setUserOrders(userOrderList);
      
      setFavoriteProducts(user.favoriteProducts || []);
    }
  };

  const logout = () => {
    setCurrentUser(null);
    setUserCart([]);
    setUserOrders([]);
    setFavoriteProducts([]);
  };

  const updateProfile = (updates: Partial<User>) => {
    if (currentUser) {
      setCurrentUser({ ...currentUser, ...updates });
    }
  };

  const addToCart = (productId: string, quantity: number) => {
    // Implémentation simplifiée
    console.log(`Added ${quantity} of product ${productId} to cart`);
  };

  const removeFromCart = (itemId: string) => {
    setUserCart(prev => prev.filter(item => item.id !== itemId));
  };

  const updateCartItem = (itemId: string, quantity: number) => {
    setUserCart(prev => 
      prev.map(item => 
        item.id === itemId ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
    setUserCart([]);
  };

  const addToFavorites = (productId: string) => {
    if (!favoriteProducts.includes(productId)) {
      setFavoriteProducts(prev => [...prev, productId]);
    }
  };

  const removeFromFavorites = (productId: string) => {
    setFavoriteProducts(prev => prev.filter(id => id !== productId));
  };

  const placeOrder = (items: CartItem[], address: string, paymentMethod: string) => {
    // Générer un ID de commande
    const orderId = `ORD${Date.now()}`;
    
    // Créer la nouvelle commande
    const newOrder: Order = {
      id: orderId,
      userId: currentUser?.id || '1',
      items: items.map(item => ({
        productId: item.productId,
        productName: item.productName,
        quantity: item.quantity,
        price: item.price
      })),
      totalPrice: items.reduce((sum, item) => sum + (item.price * item.quantity), 0),
      status: 'pending',
      orderDate: new Date().toISOString().split('T')[0],
      deliveryAddress: address,
      paymentMethod: paymentMethod as any,
      sellerNames: [...new Set(items.map(item => item.seller))]
    };
    
    setUserOrders(prev => [...prev, newOrder]);
    clearCart();
    
    return orderId;
  };

  return (
    <UserContext.Provider value={{
      currentUser,
      userCart,
      userOrders,
      favoriteProducts,
      login,
      logout,
      updateProfile,
      addToCart,
      removeFromCart,
      updateCartItem,
      clearCart,
      addToFavorites,
      removeFromFavorites,
      placeOrder
    }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};