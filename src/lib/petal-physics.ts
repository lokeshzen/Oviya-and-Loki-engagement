export const COLORS = {
  royalPink: "#0B3A6A",
  royalPurple: "#061E3A",
  ivory: "#FEFCF8",
  ivoryGold: "#C9A227",
  champagne: "#F3E6C4",
  deepPlum: "#061E3A",
  roseBlush: "#E7EEF6",
  petalLight: "#F3E6C4",
  petalMid: "#0B3A6A",
  gold: "#C9A227",
  gray: "#4A5A6E",
  grayLight: "#5F6E80",
} as const;

export type PetalConfig = {
  left: number;
  delay: number;
  duration: number;
  drift: number;
  size: number;
  color: string;
  rotation: number;
  swayDuration: number;
};

function seeded(index: number, salt: number): number {
  const x = Math.sin(index * 12.9898 + salt * 78.233) * 43758.5453;
  return x - Math.floor(x);
}

const FEATHER_COLORS = [
  COLORS.champagne,
  COLORS.petalMid,
  COLORS.gold,
] as const;

export function getPetalConfig(index: number, total: number): PetalConfig {
  const t = total || 1;
  return {
    left: (index / t) * 100 + (seeded(index, 1) - 0.5) * 12,
    delay: seeded(index, 2) * 10,
    duration: 10 + seeded(index, 3) * 10,
    drift: (seeded(index, 4) - 0.5) * 100,
    size: 10 + seeded(index, 5) * 14,
    color: FEATHER_COLORS[index % FEATHER_COLORS.length],
    rotation: seeded(index, 6) * 360,
    swayDuration: 3 + seeded(index, 7) * 4,
  };
}

export const PETAL_DENSITY = {
  light: 11,
  medium: 14,
  heavy: 20,
  burst: 24,
} as const;

export type PetalDensity = keyof typeof PETAL_DENSITY;
