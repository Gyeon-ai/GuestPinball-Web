import type { ColorTheme } from '../types/ColorTheme';

export const initialZoom = 30;
export const canvasWidth = 1600;
export const canvasHeight = 900;
export const zoomThreshold = 5;
export const STUCK_DELAY = 5000;
export const winnerAreaHeight = 168;
export const TAYO_LAVENDER = '#aaa0ff';
export const UI_FONT_FAMILY = `'Pretendard Variable', Pretendard, 'Noto Sans KR', 'Malgun Gothic', 'Apple SD Gothic Neo', system-ui, sans-serif`;
// 오락실 도트 테마의 캔버스용 색과 글꼴(패널 쪽 값은 assets/style.scss의 :root)
// 게스트 핀볼은 주소의 ?color= 값에 따라 색 판을 바꾸므로(src/guest.ts) 고정값이 아니라 바꿀 수 있는 묶음으로 둔다.
export const DOT = {
  line: '#6a6f7a',
  ink: '#0e0f12',
  textSoft: '#b4b9c4',
  accent: '#f4f4f4',
  red: '#c2475a',
  // 흑백 판: 이름 색과 색종이도 회색 계열로 그린다
  mono: false,
  // 네온 색을 따로 골랐거나 흑백 판일 때: 맵에 색이 지정된 장애물도 고른 색으로 그린다
  neonAll: true,
};

/** 공·이름·순위 글씨의 색. 흑백 판에서는 색상 대신 밝기만 조금씩 다르게 한다. */
export function nameColor(hue: number, lightness: number): string {
  if (DOT.mono) return `hsl(0 0% ${Math.round(62 + (((hue % 360) + 360) % 360) / 360 * 34)}%)`;
  return `hsl(${hue} 100% ${lightness}%)`;
}
export const NAME_FONT_FAMILY = `'Noto Sans KR', sans-serif`;
export const DOT_FONT_FAMILY = `'Galmuri11', 'Noto Sans KR', sans-serif`;
export const NUMBER_FONT_FAMILY = `'Press Start 2P', 'Galmuri11', monospace`;
export const WINNER_NAME_FONT_FAMILY = `'Do Hyeon', 'Noto Sans KR', sans-serif`;

export enum Skills {
  None,
  Impact,
}

export const DefaultEntityColor = {
  box: 'cyan',
  circle: 'yellow',
  polyline: 'white',
} as const;

export const DefaultBloomColor = {
  box: 'cyan',
  circle: 'yellow',
  polyline: 'cyan',
};

export const Themes: Record<string, ColorTheme> = {
  light: {
    background: '#eee',
    marbleLightness: 50,
    marbleWinningBorder: 'black',
    skillColor: '#69c',
    coolTimeIndicator: '#999',
    entity: {
      box: {
        fill: '#226f92',
        outline: 'black',
        bloom: 'cyan',
        bloomRadius: 0,
      },
      circle: {
        fill: 'yellow',
        outline: '#ed7e11',
        bloom: 'yellow',
        bloomRadius: 0,
      },
      polyline: {
        fill: 'white',
        outline: 'black',
        bloom: 'cyan',
        bloomRadius: 0,
      },
    },
    rankStroke: 'black',
    minimapBackground: '#fefefe',
    minimapViewport: '#6699cc',

    winnerBackground: 'rgba(255, 255, 255, 0.5)',
    winnerOutline: 'black',
    winnerText: '#cccccc',
  },
  dark: {
    background: DOT.ink,
    marbleLightness: 75,
    marbleWinningBorder: 'white',
    skillColor: 'white',
    coolTimeIndicator: 'red',
    entity: {
      box: {
        fill: 'cyan',
        outline: 'cyan',
        bloom: 'cyan',
        bloomRadius: 15,
      },
      circle: {
        fill: 'yellow',
        outline: 'yellow',
        bloom: 'yellow',
        bloomRadius: 15,
      },
      polyline: {
        fill: 'white',
        outline: 'white',
        bloom: 'cyan',
        bloomRadius: 15,
      },
    },
    rankStroke: '',
    minimapBackground: '#202226',
    minimapViewport: 'white',
    winnerBackground: 'rgba(14, 15, 18, 0.9)',
    winnerOutline: '',
    winnerText: 'white',
  },
};
