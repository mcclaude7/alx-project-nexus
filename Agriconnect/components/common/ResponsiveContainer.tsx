// components/common/ResponsiveContainer.tsx
import React from 'react';
import { View, useWindowDimensions } from 'react-native';

interface ResponsiveContainerProps {
    children: React.ReactNode;
    className?: string;
    maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
}

const ResponsiveContainer = ({
    children,
    className = '',
    maxWidth = 'lg',
}: ResponsiveContainerProps) => {
    const { width } = useWindowDimensions();

    const getMaxWidth = () => {
        switch (maxWidth) {
            case 'sm':
                return 640;
            case 'md':
                return 768;
            case 'lg':
                return 1024;
            case 'xl':
                return 1280;
            default:
                return width;
        }
    };

    const containerWidth = Math.min(width, getMaxWidth());

    return (
        <View className={`mx-auto ${className}`} style={{ width: containerWidth }}>
            {children}
        </View>
    );
};

export default ResponsiveContainer;
