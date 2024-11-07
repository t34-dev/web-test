import React from "react";

interface WheelIconProps {
  className?: string;
  size?: number;
  color?: string;
}

export const LogoIconX: React.FC<WheelIconProps> = ({ className, size = 24, color = "currentColor" }) => (
  <svg width={size} height={size} viewBox="0 0 100 100" className={className} style={{ color }}>
    <g stroke="currentColor" fill="none" strokeWidth="4">
      <circle cx="50" cy="50" r="40" />
      <line x1="50" y1="10" x2="50" y2="90" />
      <line x1="10" y1="50" x2="90" y2="50" />
      <line x1="21.7" y1="21.7" x2="78.3" y2="78.3" />
      <line x1="21.7" y1="78.3" x2="78.3" y2="21.7" />
      <circle cx="50" cy="10" r="4" fill="currentColor" />
      <circle cx="78.3" cy="21.7" r="4" fill="currentColor" />
      <circle cx="90" cy="50" r="4" fill="currentColor" />
      <circle cx="78.3" cy="78.3" r="4" fill="currentColor" />
      <circle cx="50" cy="90" r="4" fill="currentColor" />
      <circle cx="21.7" cy="78.3" r="4" fill="currentColor" />
      <circle cx="10" cy="50" r="4" fill="currentColor" />
      <circle cx="21.7" cy="21.7" r="4" fill="currentColor" />
    </g>
  </svg>
);
