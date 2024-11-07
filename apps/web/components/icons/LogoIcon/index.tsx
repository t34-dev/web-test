import React from "react";

interface WheelIconProps {
  className?: string;
  size?: number;
  color?: string;
}

export const LogoIcon: React.FC<WheelIconProps> = ({ className, size = 24, color = "inherit" }) => (
  <svg width={size} height={size} viewBox="0 0 200 200" className={className} xmlns="http://www.w3.org/2000/svg">
    <circle cx="100" cy="100" r="70" stroke={color} strokeWidth="5" fill="none" />

    <line x1="100" y1="30" x2="100" y2="170" stroke={color} strokeWidth="5" />
    <line x1="30" y1="100" x2="170" y2="100" stroke={color} strokeWidth="5" />
    <line x1="45" y1="45" x2="155" y2="155" stroke={color} strokeWidth="5" />
    <line x1="45" y1="155" x2="155" y2="45" stroke={color} strokeWidth="5" />

    <circle cx="100" cy="30" r="10" fill={color} />
    <circle cx="100" cy="170" r="10" fill={color} />
    <circle cx="30" cy="100" r="10" fill={color} />
    <circle cx="170" cy="100" r="10" fill={color} />
    <circle cx="45" cy="45" r="10" fill={color} />
    <circle cx="155" cy="155" r="10" fill={color} />
    <circle cx="45" cy="155" r="10" fill={color} />
    <circle cx="155" cy="45" r="10" fill={color} />
  </svg>
);
