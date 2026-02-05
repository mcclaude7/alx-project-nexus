// app/components/navigation/TabBarIcon.tsx
import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import { ComponentProps } from 'react';

interface TabBarIconProps {
    name: ComponentProps<typeof Ionicons>['name'];
    color: string;
    focused: boolean;
    size?: number;
}

export const TabBarIcon: React.FC<TabBarIconProps> = ({
    name,
    color,
    focused,
    size = 24,
}) => {
    return <Ionicons name={name} size={size} color={color} />;
};
