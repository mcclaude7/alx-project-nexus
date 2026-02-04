// interfaces/index.ts

// Interface de base pour un utilisateur
export interface User {
    id: string;
    name: string;
    email: string;
    phone?: string;
    location?: string;
    profileImage?: string;
    role: 'buyer' | 'seller' | 'buyer_seller' | 'admin';
    joinedDate: string;
    isVerified?: boolean;

    // Pour les acheteurs
    cartItems?: string[];
    favoriteProducts?: string[];
    orders?: string[];

    // Pour les vendeurs
    businessName?: string;
    products?: string[];
    rating?: number;
    totalSales?: number;
    bankDetails?: BankDetails;

    // Préférences
    preferences?: UserPreferences;
}

export interface BankDetails {
    accountName: string;
    accountNumber: string;
    bankName: string;
}

export interface UserPreferences {
    categories?: string[];
    notifications?: boolean;
    language?: string;
    currency?: string;
}

// Interface pour un produit
export interface Product {
    id: string;
    name: string;
    price: number;
    unit: string;
    seller: string;
    sellerId: string;
    imageUrl?: string;
    isFavorite?: boolean;
    rating?: number;
    reviews?: number;
    category: string;
    categoryId: string;
    description?: string;
    quantity: number;
    inStock: boolean;
    deliveryTime?: string;
    minimumOrder?: number;
    tags?: string[];
    createdAt: string;
}

// Interface pour les catégories
export interface Category {
    id: string;
    name: string;
    active: boolean;
    icon?: string;
    color?: string;
    productCount?: number;
}

// Interface pour les éléments du panier
export interface CartItem {
    id: string;
    productId: string;
    productName: string;
    price: number;
    quantity: number;
    unit: string;
    seller: string;
    sellerId: string;
    imageUrl?: string;
    inStock?: boolean;
}

// Interface pour les commandes
export interface Order {
    id: string;
    userId: string;
    items: OrderItem[];
    totalPrice: number;
    status: 'pending' | 'confirmed' | 'shipped' | 'delivered' | 'cancelled';
    orderDate: string;
    deliveryDate?: string;
    deliveryAddress: string;
    paymentMethod: 'card' | 'transfer' | 'cash';
    trackingNumber?: string;
    sellerNames: string[];
}

export interface OrderItem {
    productId: string;
    productName: string;
    quantity: number;
    price: number;
}

// Interface pour les notifications
export interface Notification {
    id: string;
    userId: string;
    title: string;
    message: string;
    type: 'order' | 'promotion' | 'system' | 'message' | 'review';
    read: boolean;
    date: string;
    data?: any;
}

// Interface pour les chats
export interface Chat {
    id: string;
    participants: string[]; // Array of user IDs
    lastMessage: string;
    lastMessageTime: string;
    unreadCount: number;
    productId?: string;
    orderId?: string;
}

// Interface pour les avis/reviews
export interface Review {
    id: string;
    productId: string;
    userId: string;
    userName: string;
    userImage?: string;
    rating: number;
    comment: string;
    date: string;
    helpful?: number;
}

// Interface pour les promotions
export interface Promotion {
    id: string;
    title: string;
    description: string;
    code: string;
    validUntil: string;
    color: string;
    discountPercentage?: number;
    minimumPurchase?: number;
    freeDelivery?: boolean;
    buyQuantity?: number;
    freeQuantity?: number;
    applicableCategories?: string[];
}

// Interface pour les éléments de navigation
export interface NavItem {
    id: string;
    icon: string;
    label: string;
    active?: boolean;
    badgeCount?: number;
}

// ============ PROPS INTERFACES ============

// Props pour ProductListingCard
export interface ProductListingCardProps {
    product: Product;
    compact?: boolean;
    onPress?: () => void;
    onFavoritePress?: (productId: string) => void;
    onAddToCart?: (product: Product) => void;
    showBuyButton?: boolean;
    style?: any;
    testID?: string;
}

// Props pour ProductListing
export interface ProductListingProps {
    products: Product[];
    title?: string;
    showViewAll?: boolean;
    horizontal?: boolean;
    onViewAllPress?: () => void;
    onProductPress?: (product: Product) => void;
    loading?: boolean;
    emptyMessage?: string;
    columns?: number;
    showCategoryFilter?: boolean;
}

// Props pour UserCard
export interface UserCardProps {
    user: User;
    onPress?: (user: User) => void;
    showRole?: boolean;
    showActions?: boolean;
    onMessagePress?: (userId: string) => void;
    onFollowPress?: (userId: string) => void;
}

// Props pour OrderCard
export interface OrderCardProps {
    order: Order;
    onPress?: (order: Order) => void;
    onTrackPress?: (orderId: string) => void;
    onReorderPress?: (order: Order) => void;
}

// Props pour NotificationCard
export interface NotificationCardProps {
    notification: Notification;
    onPress?: (notification: Notification) => void;
    onMarkAsRead?: (notificationId: string) => void;
    onDelete?: (notificationId: string) => void;
}

// Props pour CartSummary
export interface CartSummaryProps {
    items: CartItem[];
    onCheckout?: () => void;
    onUpdateQuantity?: (itemId: string, quantity: number) => void;
    onRemoveItem?: (itemId: string) => void;
    promoCode?: string;
    onApplyPromo?: (code: string) => void;
}

// Props pour SearchBar
export interface SearchBarProps {
    placeholder?: string;
    value: string;
    onChangeText: (text: string) => void;
    onSearch?: () => void;
    onClear?: () => void;
    autoFocus?: boolean;
    showFilters?: boolean;
    onFilterPress?: () => void;
}

// Props pour Rating
export interface RatingProps {
    rating: number;
    maxRating?: number;
    size?: number;
    editable?: boolean;
    onRatingChange?: (rating: number) => void;
    showText?: boolean;
    showCount?: boolean;
    count?: number;
}

// Props pour BottomNavBar
export interface BottomNavBarProps {
    items: NavItem[];
    activeItem?: string;
    onItemPress?: (item: NavItem) => void;
    showLabels?: boolean;
}

// Props pour FilterModal
export interface FilterModalProps {
    visible: boolean;
    onClose: () => void;
    onApply: (filters: FilterOptions) => void;
    categories: Category[];
    initialFilters?: FilterOptions;
}

export interface FilterOptions {
    minPrice?: number;
    maxPrice?: number;
    categories?: string[];
    rating?: number;
    sortBy?: 'price_asc' | 'price_desc' | 'rating' | 'newest' | 'popular';
    inStock?: boolean;
}

// Props pour ProductDetail
export interface ProductDetailProps {
    product: Product;
    onBack?: () => void;
    onAddToCart?: (product: Product, quantity: number) => void;
    onBuyNow?: (product: Product, quantity: number) => void;
    onFavoriteToggle?: (productId: string) => void;
    onContactSeller?: (sellerId: string) => void;
    showSellerInfo?: boolean;
}

// Props pour QuantitySelector
export interface QuantitySelectorProps {
    quantity: number;
    onQuantityChange: (quantity: number) => void;
    min?: number;
    max?: number;
    step?: number;
    size?: 'small' | 'medium' | 'large';
    unit?: string;
    showTotal?: boolean;
    pricePerUnit?: number;
}

// Props pour ChatBubble
export interface ChatBubbleProps {
    message: string;
    isSender: boolean;
    timestamp: string;
    senderName?: string;
    senderImage?: string;
    status?: 'sent' | 'delivered' | 'read';
}

// Props pour ProfileHeader
export interface ProfileHeaderProps {
    user: User;
    onEditProfile?: () => void;
    onLogout?: () => void;
    stats?: {
        orders?: number;
        reviews?: number;
        favorites?: number;
    };
}

// Props pour CategoryFilter
export interface CategoryFilterProps {
    categories: Category[];
    selectedCategory: string;
    onSelectCategory: (categoryId: string) => void;
    scrollable?: boolean;
    showAll?: boolean;
}

// Props pour PromotionCard
export interface PromotionCardProps {
    promotion: Promotion;
    onPress?: (promotion: Promotion) => void;
    onApplyCode?: (code: string) => void;
    showApplyButton?: boolean;
}

// Props pour ReviewCard
export interface ReviewCardProps {
    review: Review;
    onHelpfulPress?: (reviewId: string) => void;
    onReportPress?: (reviewId: string) => void;
    showProductInfo?: boolean;
}

// Props pour ImageCarousel
export interface ImageCarouselProps {
    images: string[];
    height?: number;
    showIndicators?: boolean;
    autoPlay?: boolean;
    interval?: number;
    onImagePress?: (index: number) => void;
}

// Props pour AddressForm
export interface AddressFormProps {
    initialValues?: Address;
    onSubmit: (address: Address) => void;
    onCancel?: () => void;
    mode?: 'add' | 'edit';
}

export interface Address {
    id: string;
    name: string;
    street: string;
    city: string;
    state: string;
    country: string;
    postalCode: string;
    phone: string;
    isDefault?: boolean;
}

// Props pour PaymentMethod
export interface PaymentMethodProps {
    selectedMethod: string;
    onSelectMethod: (method: string) => void;
    showSaveOption?: boolean;
    onSaveCard?: (card: CardDetails) => void;
}

export interface CardDetails {
    number: string;
    expiry: string;
    cvv: string;
    name: string;
}

// Type pour le contexte d'authentification
export interface AuthContextType {
    user: User | null;
    login: (email: string, password: string) => Promise<void>;
    logout: () => void;
    register: (userData: RegisterData) => Promise<void>;
    updateProfile: (userData: Partial<User>) => Promise<void>;
    loading: boolean;
    isAuthenticated: boolean;
}

export interface RegisterData {
    name: string;
    email: string;
    password: string;
    phone: string;
    role: User['role'];
    businessName?: string;
}

// Type pour le contexte du panier
export interface CartContextType {
    items: CartItem[];
    addItem: (product: Product, quantity: number) => void;
    removeItem: (itemId: string) => void;
    updateQuantity: (itemId: string, quantity: number) => void;
    clearCart: () => void;
    totalItems: number;
    totalPrice: number;
    isLoading: boolean;
}

// Export de tous les types
export type {
    User as IUser,
    Product as IProduct,
    Category as ICategory,
    CartItem as ICartItem,
    Order as IOrder,
    Notification as INotification,
    Chat as IChat,
    Review as IReview,
    Promotion as IPromotion,
    NavItem as INavItem,

    // Props
    ProductListingCardProps as IProductListingCardProps,
    ProductListingProps as IProductListingProps,
    UserCardProps as IUserCardProps,
    OrderCardProps as IOrderCardProps,
    NotificationCardProps as INotificationCardProps,
    CartSummaryProps as ICartSummaryProps,
    SearchBarProps as ISearchBarProps,
    RatingProps as IRatingProps,
    BottomNavBarProps as IBottomNavBarProps,
    FilterModalProps as IFilterModalProps,
    FilterOptions as IFilterOptions,
    ProductDetailProps as IProductDetailProps,
    QuantitySelectorProps as IQuantitySelectorProps,
    ChatBubbleProps as IChatBubbleProps,
    ProfileHeaderProps as IProfileHeaderProps,
    CategoryFilterProps as ICategoryFilterProps,
    PromotionCardProps as IPromotionCardProps,
    ReviewCardProps as IReviewCardProps,
    ImageCarouselProps as IImageCarouselProps,
    AddressFormProps as IAddressFormProps,
    PaymentMethodProps as IPaymentMethodProps,

    // Context types
    AuthContextType as IAuthContextType,
    CartContextType as ICartContextType,
};
