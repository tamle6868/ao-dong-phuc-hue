import { cn } from "@/lib/utils";

/**
 * Inline SVG wordmark for Áo Đồng Phục Huế.
 * Shape: a stylized shield (jersey + corporate identity) with monogram "AĐ".
 * Uses currentColor for the badge stroke + theme primary fill so it adapts.
 */
export function BrandMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 64 64"
      role="img"
      aria-label="Áo Đồng Phục Huế logo"
      className={cn("text-primary", className)}
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* shield body */}
      <path
        d="M32 4 L56 12 V32 C56 46 45 56 32 60 C19 56 8 46 8 32 V12 Z"
        fill="currentColor"
      />
      {/* inner highlight */}
      <path
        d="M32 9 L51 15.5 V31.5 C51 43 42 51 32 54.5 C22 51 13 43 13 31.5 V15.5 Z"
        fill="rgba(255,255,255,0.08)"
      />
      {/* monogram AĐ */}
      <text
        x="32"
        y="40"
        textAnchor="middle"
        fontFamily="ui-serif, Georgia, 'Times New Roman', serif"
        fontSize="22"
        fontWeight="700"
        fill="#fff"
        letterSpacing="-0.5"
      >
        AĐ
      </text>
      {/* chevron under monogram */}
      <path
        d="M22 46 L32 50 L42 46"
        stroke="#fff"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
        opacity="0.85"
      />
    </svg>
  );
}
