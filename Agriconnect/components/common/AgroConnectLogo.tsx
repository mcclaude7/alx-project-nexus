// components/common/AgroConnectLogo.tsx
import React from 'react';
import Svg, { G, Path, Text, Circle } from 'react-native-svg';

interface AgroConnectLogoProps {
    size?: number;
    showText?: boolean;
}

const AgroConnectLogo = ({ size = 40, showText = true }: AgroConnectLogoProps) => {
    return (
        <Svg width={size} height={size} viewBox="0 0 100 100">
            {/* Fond circulaire avec gradient */}
            <Circle cx="50" cy="50" r="45" fill="url(#gradient)" />

            {/* Définition du gradient */}
            <defs>
                <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#10B981" />
                    <stop offset="100%" stopColor="#059669" />
                </linearGradient>
            </defs>

            {/* Icône de plante/agriculture */}
            <G transform="translate(25, 25) scale(0.5)">
                <Path
                    d="M50 10 Q60 0 70 10 Q80 20 70 30 Q60 40 50 30 Q40 20 50 10 Z"
                    fill="#FFFFFF"
                />
                <Path
                    d="M50 30 L50 70"
                    stroke="#FFFFFF"
                    strokeWidth="8"
                    strokeLinecap="round"
                />
                <Path
                    d="M30 50 L70 50"
                    stroke="#FFFFFF"
                    strokeWidth="8"
                    strokeLinecap="round"
                />
                <Circle cx="50" cy="50" r="15" fill="#FFFFFF" />
            </G>

            {/* Texte AC (optionnel) */}
            {showText && (
                <Text
                    x="50"
                    y="85"
                    textAnchor="middle"
                    fill="white"
                    fontSize="24"
                    fontWeight="bold"
                    fontFamily="Arial"
                >
                    AC
                </Text>
            )}
        </Svg>
    );
};

export default AgroConnectLogo;

// ===========================================================

// components/common/AgroConnectLogo.tsx - Version simplifiée
// import React from 'react';
// import Svg, { Path, Text, Rect, LinearGradient, Stop } from 'react-native-svg';

// interface AgroConnectLogoProps {
//   size?: number;
// }

// const AgroConnectLogo = ({ size = 40 }: AgroConnectLogoProps) => {
//   return (
//     <Svg width={size} height={size} viewBox="0 0 100 100">
//       {/* Fond carré arrondi */}
//       <Rect
//         x="5"
//         y="5"
//         width="90"
//         height="90"
//         rx="15"
//         fill="url(#logoGradient)"
//       />
      
//       <LinearGradient id="logoGradient" x1="0" y1="0" x2="1" y2="1">
//         <Stop offset="0" stopColor="#10B981" stopOpacity="1" />
//         <Stop offset="1" stopColor="#047857" stopOpacity="1" />
//       </LinearGradient>
      
//       {/* Feuille gauche */}
//       <Path
//         d="M35 40 Q25 30 30 20 Q35 10 45 15 Q50 20 45 30 Q40 40 35 40 Z"
//         fill="#FFFFFF"
//         opacity="0.9"
//       />
      
//       {/* Feuille droite */}
//       <Path
//         d="M65 40 Q75 30 70 20 Q65 10 55 15 Q50 20 55 30 Q60 40 65 40 Z"
//         fill="#FFFFFF"
//         opacity="0.9"
//       />
      
//       {/* Tige centrale */}
//       <Path
//         d="M50 30 L50 70"
//         stroke="#FFFFFF"
//         strokeWidth="6"
//         strokeLinecap="round"
//       />
      
//       {/* Lettre A stylisée */}
//       <Path
//         d="M45 55 L50 45 L55 55"
//         stroke="#FFFFFF"
//         strokeWidth="4"
//         fill="none"
//         strokeLinecap="round"
//       />
//       <Path
//         d="M48 52 L52 52"
//         stroke="#FFFFFF"
//         strokeWidth="4"
//         strokeLinecap="round"
//       />
//     </Svg>
//   );
// };

// export default AgroConnectLogo;