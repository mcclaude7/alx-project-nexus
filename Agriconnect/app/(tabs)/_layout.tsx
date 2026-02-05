// import { Tabs } from 'expo-router';
// import React from 'react';

// import { HapticTab } from '../../components/haptic-tab';
// import { IconSymbol } from '../../components/ui/icon-symbol';
// import { Colors } from '../../constants/theme';
// import { useColorScheme } from '../../hooks/use-color-scheme';

// export default function TabLayout() {
//     const colorScheme = useColorScheme();

//     return (
//         <Tabs
//             screenOptions={{
//                 tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
//                 headerShown: false,
//                 tabBarButton: HapticTab,
//             }}
//         >
//             <Tabs.Screen
//                 name="index"
//                 options={{
//                     title: 'Home',
//                     tabBarIcon: ({ color }: { color: string }) => (
//                         <IconSymbol size={28} name="house.fill" color={color} />
//                     ),
//                 }}
//             />
//             <Tabs.Screen
//                 name="explore"
//                 options={{
//                     title: 'Explore',
//                     tabBarIcon: ({ color }: { color: string }) => (
//                         <IconSymbol size={28} name="paperplane.fill" color={color} />
//                     ),
//                 }}
//             />
//         </Tabs>
//     );
// }

// =========================================

// import { Tabs } from 'expo-router';
// import { TabBarIcon } from '../../components/navigation/TabBarIcon';

// export default function TabLayout() {
//   return (
//     <Tabs screenOptions={{ headerShown: false }}>
//       <Tabs.Screen
//         name="index"
//         options={{
//           title: 'Home',
//           tabBarIcon: ({ color, focused }) => (
//             <TabBarIcon name={focused ? 'home' : 'home-outline'} color={color} />
//           ),
//         }}
//       />
//       <Tabs.Screen
//         name="search"
//         options={{
//           title: 'Search',
//           tabBarIcon: ({ color, focused }) => (
//             <TabBarIcon name={focused ? 'search' : 'search-outline'} color={color} />
//           ),
//         }}
//       />
//       {/* Add other tabs as needed */}
//     </Tabs>
//   );
// }

// ==========================================================

// app/(tabs)/_layout.tsx - WITH TYPE ANNOTATIONS
import { Tabs } from 'expo-router';
import { TabBarIcon } from '@/components/navigation/TabBarIcon';

export default function TabLayout() {
    return (
        <Tabs screenOptions={{ headerShown: false }}>
            <Tabs.Screen
                name="index"
                options={{
                    title: 'Home',
                    tabBarIcon: ({
                        color,
                        focused,
                    }: {
                        color: string;
                        focused: boolean;
                    }) => (
                        <TabBarIcon
                            name={focused ? 'home' : 'home-outline'}
                            color={color}
                            focused={focused}
                        />
                    ),
                }}
            />

            <Tabs.Screen
                name="search"
                options={{
                    title: 'Search',
                    tabBarIcon: ({
                        color,
                        focused,
                    }: {
                        color: string;
                        focused: boolean;
                    }) => (
                        <TabBarIcon
                            name={focused ? 'search' : 'search-outline'}
                            color={color}
                            focused={focused}
                        />
                    ),
                }}
            />
        </Tabs>
    );
}
