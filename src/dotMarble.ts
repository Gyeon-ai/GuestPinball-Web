// 게스트 핀볼의 공 그림: 그림 파일 없이 "물음표가 그려진 동그란 공"을 도트로 그려서 쓴다(게스트 캐릭터의 물음표).
// 흑백 판에서는 이름마다 공 밝기가 다르고, 색 판에서는 순위 목록의 이름 색과 같은 색 공이 된다.
import { DOT } from './data/constants';

// 칸을 잘게(32칸) 나눠 공의 테두리가 각져 보이지 않게 한다. 물음표는 두 칸을 한 점으로 써서 도트 느낌을 남긴다.
const GRID = 32;
const SCALE = 3;

// 물음표(5x7)
const QUESTION = ['.###.', '#...#', '....#', '...#.', '..#..', '.....', '..#..'];

type Colors = { fill: string; light: string; shade: string; outline: string; mark: string };

const MONO: Colors[] = [
  { fill: '#ffffff', light: '#ffffff', shade: '#bdbdbd', outline: '#000000', mark: '#000000' },
  { fill: '#dcdcdc', light: '#ffffff', shade: '#9a9a9a', outline: '#000000', mark: '#000000' },
  { fill: '#a8a8a8', light: '#d8d8d8', shade: '#6e6e6e', outline: '#000000', mark: '#000000' },
  { fill: '#2b2b2b', light: '#555555', shade: '#111111', outline: '#f4f4f4', mark: '#ffffff' },
];

const cache = new Map<string, HTMLCanvasElement>();

function nameHash(name: string): number {
  let hash = 0;
  for (const character of name) {
    hash = (Math.imul(hash, 31) + (character.codePointAt(0) ?? 0)) >>> 0;
  }
  return hash;
}

function drawBall(colors: Colors): HTMLCanvasElement {
  const canvas = document.createElement('canvas');
  canvas.width = GRID * SCALE;
  canvas.height = GRID * SCALE;
  const ctx = canvas.getContext('2d');
  if (!ctx) return canvas;
  const dot = (x: number, y: number, color: string) => {
    ctx.fillStyle = color;
    ctx.fillRect(x * SCALE, y * SCALE, SCALE, SCALE);
  };

  const center = (GRID - 1) / 2;
  for (let y = 0; y < GRID; y++) {
    for (let x = 0; x < GRID; x++) {
      const distance = Math.hypot(x - center, y - center);
      if (distance > 15.7) continue;                                       // 공 바깥
      let color = colors.fill;
      if (Math.hypot(x - 11.5, y - 11.5) > 14) color = colors.shade;      // 오른쪽 아래 그늘
      if (Math.hypot(x - 9.5, y - 9.5) < 4.2) color = colors.light;       // 왼쪽 위 밝은 면
      if (distance > 13.9) color = colors.outline;
      dot(x, y, color);
    }
  }
  QUESTION.forEach((row, rowIndex) => {
    Array.from(row).forEach((cell, columnIndex) => {
      if (cell !== '#') return;
      // 물음표의 한 점 = 가로 4칸(두 점 굵기) x 세로 2칸
      for (let dy = 0; dy < 2; dy++) {
        for (let dx = 0; dx < 4; dx++) {
          dot(10 + columnIndex * 2 + dx, 9 + rowIndex * 2 + dy, colors.mark);
        }
      }
    });
  });
  return canvas;
}

/** 같은 이름은 항상 같은 공을 받는다. */
export function getDotMarble(name: string, hue: number): HTMLCanvasElement | undefined {
  if (typeof document === 'undefined') return undefined;
  const roundedHue = Math.round(hue) % 360;
  const variant = nameHash(name) % MONO.length;
  const key = DOT.mono ? `mono:${variant}` : `hue:${roundedHue}`;
  let marble = cache.get(key);
  if (!marble) {
    marble = drawBall(
      DOT.mono
        ? MONO[variant]
        : {
            fill: `hsl(${roundedHue} 95% 72%)`,
            light: `hsl(${roundedHue} 100% 88%)`,
            shade: `hsl(${roundedHue} 70% 52%)`,
            outline: `hsl(${roundedHue} 50% 16%)`,
            mark: `hsl(${roundedHue} 50% 16%)`,
          }
    );
    cache.set(key, marble);
  }
  return marble;
}
