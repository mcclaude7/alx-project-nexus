// import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
// import { Stack } from 'expo-router';
// import { StatusBar } from 'expo-status-bar';
// import 'react-native-reanimated';

// import { useColorScheme } from '@/hooks/use-color-scheme';

// import '../global.css';

// export const unstable_settings = {
//     anchor: '(tabs)',
// };

// export default function RootLayout() {
//     const colorScheme = useColorScheme();

//     return (
//         <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
//             <Stack>
//                 <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
//                 <Stack.Screen
//                     name="modal"
//                     options={{ presentation: 'modal', title: 'Modal' }}
//                 />
//             </Stack>
//             <StatusBar style="auto" />
//         </ThemeProvider>
//     );
// }

// import { Stack } from 'expo-router';
// import '../global.css';

// export default function RootLayout() {
//     return (
//         <Stack>
//             <Stack.Screen name="index" options={{ headerShown: false }} />
//         </Stack>
//     );
// }

import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';

// Update the import path below if your use-color-scheme hook is located elsewhere
import { useColorScheme } from '../hooks/use-color-scheme';

import '../global.css';

export const unstable_settings = {
    anchor: '(tabs)',
};

export default function RootLayout() {
    const colorScheme = useColorScheme();

    return (
        <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
            <Stack>
                {/* IMPORTANT : index */}
                <Stack.Screen name="index" options={{ headerShown: false }} />

                {/* SignUp_page */}
                <Stack.Screen
                    name="signUp_page"
                    options={{
                        headerShown: false,
                        title: 'Sign Up', // Optionnel
                    }}
                />

                {/* Login */}
                <Stack.Screen
                    name="login"
                    options={{
                        headerShown: false,
                        title: 'Login', // Optionnel
                    }}
                />

                {/* Tabs */}
                <Stack.Screen name="(tabs)" options={{ headerShown: false }} />

                {/* Modal */}
                <Stack.Screen
                    name="modal"
                    options={{ presentation: 'modal', title: 'Modal' }}
                />
            </Stack>
            <StatusBar style="auto" />
        </ThemeProvider>
    );
}
