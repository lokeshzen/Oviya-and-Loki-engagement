export const COLORS = {
  royalPink: "#B8336A",
  royalPurple: "#6B1E3C",
  ivory: "#FEFCF8",
  ivoryGold: "#E6D7B8",
  champagne: "#F4E8D0",
  deepPlum: "#3A2A3E",
  roseBlush: "#F8E8F0",
  petalLight: "#E8A0BF",
  petalMid: "#D4688E",
  gray: "#7A6B7E",
  grayLight: "#A89AAD",
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

const PETAL_COLORS = [
  COLORS.petalLight,
  COLORS.petalMid,
  COLORS.royalPink,
] as const;

export function getPetalConfig(index: number, total: number): PetalConfig {
  const t = total || 1;
  return {
    left: (index / t) * 100 + (seeded(index, 1) - 0.5) * 12,
    delay: seeded(index, 2) * 10,
    duration: 10 + seeded(index, 3) * 10,
    drift: (seeded(index, 4) - 0.5) * 100,
    size: 7 + seeded(index, 5) * 11,
    color: PETAL_COLORS[index % PETAL_COLORS.length],
    rotation: seeded(index, 6) * 360,
    swayDuration: 3 + seeded(index, 7) * 4,
  };
}

export const PETAL_DENSITY = {
  light: 8,
  medium: 14,
  heavy: 20,
  burst: 24,
} as const;

export type PetalDensity = keyof typeof PETAL_DENSITY;
