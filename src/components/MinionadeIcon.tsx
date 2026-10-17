import React from 'react';

interface MinionadeIconProps {
  className?: string;
  size?: number;
  glow?: boolean;
}

/**
 * Minionade Official Channel & Brand Icon
 * Pixel-art stylized mascot: A chilled mason jar mug of sparkling lemonade with
 * floating ice cubes, a red & white striped straw, a fresh lemon wheel garnish,
 * sporting Minion goggles and a cheerful pixel smile.
 */
export const MinionadeIcon: React.FC<MinionadeIconProps> = ({
  className = 'w-8 h-8',
  size,
  glow = false,
}) => {
  return (
    <div
      className={`relative inline-flex items-center justify-center shrink-0 select-none ${glow ? 'filter drop-shadow-[0_0_8px_rgba(250,204,21,0.5)]' : ''} ${className}`}
      style={size ? { width: size, height: size } : undefined}
    >
      <svg
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full"
        shapeRendering="crispEdges"
      >
        <defs>
          {/* Gradients for retro pixel-art depth */}
          <linearGradient id="lemonadeGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#FEF08A" />
            <stop offset="35%" stopColor="#FDE047" />
            <stop offset="70%" stopColor="#EAB308" />
            <stop offset="100%" stopColor="#CA8A04" />
          </linearGradient>

          <linearGradient id="glassShine" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.8" />
            <stop offset="40%" stopColor="#FFFFFF" stopOpacity="0.2" />
            <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0" />
          </linearGradient>

          <linearGradient id="goggleRing" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#CBD5E1" />
            <stop offset="50%" stopColor="#94A3B8" />
            <stop offset="100%" stopColor="#475569" />
          </linearGradient>
        </defs>

        {/* --- Background Tile (Soft Dark Capsule/Bezel) --- */}
        <rect x="2" y="2" width="96" height="96" rx="20" fill="#0B1120" stroke="#1E293B" strokeWidth="2.5" />
        {/* Subtle inner grid/glow */}
        <rect x="6" y="6" width="88" height="88" rx="16" fill="#0F172A" />

        {/* Ambient Lemonade Backglow */}
        <circle cx="50" cy="56" r="32" fill="#FACC15" fillOpacity="0.12" filter="blur(6px)" />

        {/* --- GLASS MUG HANDLE (Right Side) --- */}
        <path
          d="M 68 40 H 78 V 66 H 68 V 60 H 72 V 46 H 68 Z"
          fill="#38BDF8"
          fillOpacity="0.5"
          stroke="#0F172A"
          strokeWidth="1.5"
        />
        <rect x="70" y="44" width="4" height="18" fill="#E0F2FE" fillOpacity="0.7" />

        {/* --- DIAGONAL RED & WHITE STRIPED STRAW --- */}
        {/* Straw emerges from top right of jar */}
        <g id="straw">
          {/* Base straw tube (tilted) */}
          <path d="M 56 28 L 74 6" stroke="#0F172A" strokeWidth="6" strokeLinecap="square" />
          <path d="M 56 28 L 74 6" stroke="#FFFFFF" strokeWidth="4.5" strokeLinecap="square" />
          {/* Red diagonal stripes */}
          <line x1="59" y1="24" x2="63" y2="21" stroke="#EF4444" strokeWidth="3" />
          <line x1="65" y1="17" x2="69" y2="14" stroke="#EF4444" strokeWidth="3" />
          <line x1="71" y1="10" x2="74" y2="7" stroke="#EF4444" strokeWidth="3" />
        </g>

        {/* --- LEMON SLICE GARNISH (Perched on Left Rim) --- */}
        <g id="lemonGarnish">
          {/* Outer Rind (Yellow Wheel) */}
          <circle cx="28" cy="27" r="14" fill="#FACC15" stroke="#CA8A04" strokeWidth="2" />
          {/* Inner Pith (Cream white) */}
          <circle cx="28" cy="27" r="11" fill="#FEF9C3" />
          {/* Lemon Segments */}
          <circle cx="28" cy="27" r="9" fill="#EAB308" />
          {/* Segment Spokes (White cross) */}
          <line x1="19" y1="27" x2="37" y2="27" stroke="#FEF9C3" strokeWidth="1.5" />
          <line x1="28" y1="18" x2="28" y2="36" stroke="#FEF9C3" strokeWidth="1.5" />
          <line x1="22" y1="21" x2="34" y2="33" stroke="#FEF9C3" strokeWidth="1.5" />
          <line x1="22" y1="33" x2="34" y2="21" stroke="#FEF9C3" strokeWidth="1.5" />
          {/* Center pip */}
          <circle cx="28" cy="27" r="2" fill="#FEF08A" />
        </g>

        {/* --- MASON JAR / GLASS BODY --- */}
        {/* Jar Rim / Threading */}
        <rect x="30" y="28" width="40" height="4" rx="1.5" fill="#94A3B8" stroke="#0F172A" strokeWidth="1.5" />
        <rect x="32" y="32" width="36" height="3" fill="#64748B" />

        {/* Main Jar Container */}
        <path
          d="M 28 35 H 72 V 76 Q 72 82 66 82 H 34 Q 28 82 28 76 Z"
          fill="#0F172A"
          stroke="#0F172A"
          strokeWidth="2"
        />

        {/* Lemonade Liquid Fill */}
        <path
          d="M 30 38 H 70 V 75 Q 70 80 65 80 H 35 Q 30 80 30 75 Z"
          fill="url(#lemonadeGrad)"
        />

        {/* Liquid Surface Meniscus / Wave */}
        <path
          d="M 30 38 Q 40 36 50 38 T 70 38 V 42 H 30 Z"
          fill="#FEF08A"
        />

        {/* --- FLOATING ICE CUBES --- */}
        {/* Ice Cube 1 (Top Left) */}
        <g opacity="0.88">
          <rect x="34" y="42" width="9" height="9" fill="#E0F2FE" stroke="#38BDF8" strokeWidth="1" rx="1" />
          <path d="M 35 43 H 41 V 45 H 35 Z" fill="#FFFFFF" />
        </g>
        {/* Ice Cube 2 (Top Right) */}
        <g opacity="0.85">
          <rect x="56" y="44" width="8" height="8" fill="#E0F2FE" stroke="#38BDF8" strokeWidth="1" rx="1" />
          <path d="M 57 45 H 61 V 47 H 57 Z" fill="#FFFFFF" />
        </g>

        {/* Sparkling Bubbles */}
        <circle cx="34" cy="62" r="1.5" fill="#FEF08A" opacity="0.9" />
        <circle cx="65" cy="66" r="1.5" fill="#FEF08A" opacity="0.9" />
        <circle cx="37" cy="74" r="1" fill="#FEF08A" opacity="0.7" />
        <circle cx="62" cy="75" r="1.2" fill="#FEF08A" opacity="0.7" />

        {/* --- MINION GOGGLE STRAP (Black strap across the jar) --- */}
        <rect x="29" y="52" width="42" height="6" fill="#0F172A" rx="1" />
        <rect x="30" y="53" width="40" height="2" fill="#334155" />

        {/* --- DUAL MINION GOGGLES (Metallic Silver Rims + Eyes) --- */}
        {/* Left Goggle Rim */}
        <circle cx="43" cy="55" r="9" fill="url(#goggleRing)" stroke="#0F172A" strokeWidth="2" />
        {/* Right Goggle Rim */}
        <circle cx="57" cy="55" r="9" fill="url(#goggleRing)" stroke="#0F172A" strokeWidth="2" />

        {/* Left Eye Sclera (White) */}
        <circle cx="43" cy="55" r="6.2" fill="#FFFFFF" />
        {/* Right Eye Sclera (White) */}
        <circle cx="57" cy="55" r="6.2" fill="#FFFFFF" />

        {/* Left Eye Iris (Hazel / Golden Brown) */}
        <circle cx="44.2" cy="55" r="3.2" fill="#78350F" />
        {/* Left Pupil (Black) */}
        <circle cx="44.2" cy="55" r="2" fill="#0F172A" />
        {/* Left Catchlight (White sparkle) */}
        <circle cx="43.2" cy="54" r="1" fill="#FFFFFF" />

        {/* Right Eye Iris (Hazel / Golden Brown) */}
        <circle cx="55.8" cy="55" r="3.2" fill="#78350F" />
        {/* Right Pupil (Black) */}
        <circle cx="55.8" cy="55" r="2" fill="#0F172A" />
        {/* Right Catchlight (White sparkle) */}
        <circle cx="54.8" cy="54" r="1" fill="#FFFFFF" />

        {/* Goggle Center Bridge Connection */}
        <rect x="49" y="53.5" width="2" height="3" fill="#475569" stroke="#0F172A" strokeWidth="0.8" />

        {/* --- CHEERFUL PIXEL SMILE --- */}
        <path
          d="M 46 68 Q 50 72 54 68"
          stroke="#713F12"
          strokeWidth="2"
          strokeLinecap="round"
          fill="none"
        />
        {/* Cute cheek blushes */}
        <circle cx="40" cy="67" r="1.5" fill="#F87171" opacity="0.6" />
        <circle cx="60" cy="67" r="1.5" fill="#F87171" opacity="0.6" />

        {/* --- GLASS SHINE / SPECULAR HIGHLIGHT (Left vertical strip) --- */}
        <path
          d="M 31 40 H 34 V 73 H 31 Z"
          fill="url(#glassShine)"
        />
        <path
          d="M 36 40 H 37 V 70 H 36 Z"
          fill="#FFFFFF"
          fillOpacity="0.4"
        />

        {/* --- CORNER SPARKLE / RETRO GLINT (Top Left) --- */}
        <g transform="translate(14, 14)">
          <path
            d="M 4 0 L 5 3 L 8 4 L 5 5 L 4 8 L 3 5 L 0 4 L 3 3 Z"
            fill="#FACC15"
          />
        </g>
      </svg>
    </div>
  );
};
