// 게스트 핀볼: 주소 뒤의 값으로 이름표와 색을 바꾼다.
//   ?title=이름표 글자   ?color=색 판 이름   ?neon=네온 바·장애물 색 이름
// 값은 이 화면을 꾸미는 데만 쓰고 어디에도 보내지 않는다.
import { DOT, Themes } from './data/constants';

type Palette = {
  label: string;
  bg: string;
  band: string;
  box: string;
  line: string;
  lineSoft: string;
  ink: string;
  accent: string;
  red: string;
  redDeep: string;
  blue: string;
  cyan: string;
  /** 빨강 자리(시작 단추) 위의 글씨 색. 없으면 기본 글씨 색 */
  onRed?: string;
  /** 흑백 판: 공·이름·네온·색종이까지 흑백으로 */
  mono?: boolean;
};

export const DEFAULT_TITLE = '게스트 핀볼';
export const DEFAULT_COLOR = 'gray';
const MAX_TITLE_LENGTH = 12;

export const PALETTES: Record<string, Palette> = {
  bw: { label: '흑백', bg: '#111111', band: '#2b2b2b', box: '#1c1c1c', line: '#f4f4f4', lineSoft: '#bdbdbd', ink: '#000000', accent: '#ffffff', red: '#ffffff', redDeep: '#8a8a8a', blue: '#3a3a3a', cyan: '#ffffff', onRed: '#000000', mono: true },
  teal: { label: '청록', bg: '#1b2428', band: '#2f4a50', box: '#33454b', line: '#5f7f86', lineSoft: '#a7c4c9', ink: '#0c1214', accent: '#7ee8d0', red: '#c2475a', redDeep: '#6a2233', blue: '#2f7f8f', cyan: '#a7f0e0' },
  navy: { label: '남색', bg: '#1a1c2c', band: '#29366f', box: '#333c57', line: '#566c86', lineSoft: '#94b0c2', ink: '#0d0e17', accent: '#ffcd75', red: '#b13e53', redDeep: '#5d275d', blue: '#3b5dc9', cyan: '#73eff7' },
  purple: { label: '보라', bg: '#2e2a5c', band: '#5f53b8', box: '#48448a', line: '#a09ce2', lineSoft: '#d3d0f8', ink: '#141127', accent: '#a9d8ff', red: '#c23a52', redDeep: '#6b1f33', blue: '#3d3486', cyan: '#cdbcff' },
  brown: { label: '갈색', bg: '#2a1c18', band: '#6b3f2c', box: '#45302a', line: '#9a7058', lineSoft: '#d2ad94', ink: '#150d0b', accent: '#ffb3c7', red: '#c22f45', redDeep: '#5a2424', blue: '#a0522d', cyan: '#ffd9a0' },
  green: { label: '초록', bg: '#1c2a1e', band: '#2f5a3a', box: '#33503a', line: '#5f8a66', lineSoft: '#a9d0ae', ink: '#0b140d', accent: '#c8f070', red: '#c2475a', redDeep: '#6a2233', blue: '#2f8f5a', cyan: '#a7f070' },
  red: { label: '빨강', bg: '#2a1a1e', band: '#6b2a36', box: '#4a2c33', line: '#9a5f6a', lineSoft: '#d9a9b2', ink: '#150b0e', accent: '#ffd27a', red: '#d1495b', redDeep: '#6e1f2c', blue: '#8f3a4a', cyan: '#ffb3a0' },
  pink: { label: '분홍', bg: '#2c1f2a', band: '#7a3f6a', box: '#4f3349', line: '#a56f96', lineSoft: '#e0b8d4', ink: '#170e15', accent: '#ff9ec4', red: '#c2475a', redDeep: '#6a2233', blue: '#8a4f9a', cyan: '#ffc8e0' },
  sky: { label: '하늘', bg: '#18222e', band: '#2a5a8a', box: '#2f4257', line: '#5f86a8', lineSoft: '#a9cbe4', ink: '#0a1118', accent: '#8fd3ff', red: '#c2475a', redDeep: '#6a2233', blue: '#2f6fb0', cyan: '#b8e6ff' },
  gray: { label: '회색', bg: '#202226', band: '#3a3d45', box: '#34373e', line: '#6a6f7a', lineSoft: '#b4b9c4', ink: '#0e0f12', accent: '#f4f4f4', red: '#c2475a', redDeep: '#6a2233', blue: '#4a4f5c', cyan: '#d7dfe6' },
};

// 네온 바·장애물 색. auto는 색 판을 따른다(흑백 판은 흰색, 그 밖은 원래의 청록·노랑).
export const DEFAULT_NEON = 'purple';
export const NEONS: Record<string, { label: string; color: string }> = {
  auto: { label: '기본', color: '' },
  white: { label: '흰색', color: '#f4f4f4' },
  cyan: { label: '청록', color: '#35f0ff' },
  blue: { label: '파랑', color: '#5a8cff' },
  purple: { label: '보라', color: '#b48cff' },
  pink: { label: '분홍', color: '#ff7ac8' },
  red: { label: '빨강', color: '#ff5a6a' },
  orange: { label: '주황', color: '#ffa13d' },
  yellow: { label: '노랑', color: '#ffe14a' },
  green: { label: '초록', color: '#6cf06c' },
};

const state = { title: DEFAULT_TITLE, color: DEFAULT_COLOR, neon: DEFAULT_NEON };

function cleanTitle(value: string | null): string {
  const title = Array.from((value ?? '').replace(/\s+/g, ' ').trim()).slice(0, MAX_TITLE_LENGTH).join('');
  return title || DEFAULT_TITLE;
}

function rgba(hex: string, alpha: number): string {
  const value = Number.parseInt(hex.slice(1), 16);
  return `rgba(${(value >> 16) & 255}, ${(value >> 8) & 255}, ${value & 255}, ${alpha})`;
}

function applyColor(key: string) {
  const palette = PALETTES[key] ?? PALETTES[DEFAULT_COLOR];
  state.color = key in PALETTES ? key : DEFAULT_COLOR;

  const css: Record<string, string> = {
    '--dot-bg': palette.bg,
    '--dot-band': palette.band,
    '--dot-box': palette.box,
    '--dot-line': palette.line,
    '--dot-line-soft': palette.lineSoft,
    '--dot-ink': palette.ink,
    '--dot-accent': palette.accent,
    '--dot-red': palette.red,
    '--dot-red-deep': palette.redDeep,
    '--dot-blue': palette.blue,
    '--dot-cyan': palette.cyan,
    '--dot-on-red': palette.onRed ?? '#f4f4f4',
    '--dot-mark-shadow': palette.mono ? '#6a6a6a' : palette.red,
  };
  for (const [name, value] of Object.entries(css)) {
    document.documentElement.style.setProperty(name, value);
  }

  // 캔버스에 그리는 쪽(순위 목록, 당첨 표시, 미니맵, 경기장 바탕)
  DOT.line = palette.line;
  DOT.ink = palette.ink;
  DOT.textSoft = palette.lineSoft;
  DOT.accent = palette.accent;
  DOT.red = palette.mono ? '#6a6a6a' : palette.red;
  DOT.mono = !!palette.mono;

  Themes.dark.coolTimeIndicator = palette.mono ? '#9a9a9a' : 'red';
  Themes.dark.background = palette.ink;
  Themes.dark.minimapBackground = palette.bg;
  Themes.dark.winnerBackground = rgba(palette.ink, 0.9);
  applyNeon(state.neon);
}

function applyNeon(key: string) {
  state.neon = key in NEONS ? key : DEFAULT_NEON;
  const mono = !!(PALETTES[state.color] ?? PALETTES[DEFAULT_COLOR]).mono;
  const picked = NEONS[state.neon].color;
  const entity = Themes.dark.entity;
  if (picked) {
    // 바·네모·동그라미는 고른 색, 벽 선은 흰 선에 고른 색 번짐
    Object.assign(entity.box, { fill: picked, outline: picked, bloom: picked });
    Object.assign(entity.circle, { fill: picked, outline: picked, bloom: picked });
    Object.assign(entity.polyline, { fill: '#ffffff', outline: '#ffffff', bloom: picked });
  } else if (mono) {
    Object.assign(entity.box, { fill: '#f4f4f4', outline: '#f4f4f4', bloom: '#ffffff' });
    Object.assign(entity.circle, { fill: '#bdbdbd', outline: '#bdbdbd', bloom: '#ffffff' });
    Object.assign(entity.polyline, { fill: '#ffffff', outline: '#ffffff', bloom: '#ffffff' });
  } else {
    Object.assign(entity.box, { fill: 'cyan', outline: 'cyan', bloom: 'cyan' });
    Object.assign(entity.circle, { fill: 'yellow', outline: 'yellow', bloom: 'yellow' });
    Object.assign(entity.polyline, { fill: 'white', outline: 'white', bloom: 'cyan' });
  }
  DOT.neonAll = mono || !!picked;
}

function applyTitle(title: string) {
  state.title = cleanTitle(title);
  document.title = state.title;
  const text = document.querySelector('#brandTitle');
  if (text) text.textContent = state.title;
  const heading = document.querySelector('h1.sr-only');
  if (heading) heading.textContent = `${state.title} - 랜덤 추첨기`;
}

/** 지금 모양을 그대로 여는 주소. 명단(?names=)은 담지 않는다. */
function shareUrl(): string {
  const url = new URL(window.location.href);
  url.search = '';
  url.hash = '';
  if (state.title !== DEFAULT_TITLE) url.searchParams.set('title', state.title);
  if (state.color !== DEFAULT_COLOR) url.searchParams.set('color', state.color);
  if (state.neon !== DEFAULT_NEON) url.searchParams.set('neon', state.neon);
  return url.toString();
}

function syncAddress() {
  const url = new URL(window.location.href);
  if (state.title !== DEFAULT_TITLE) url.searchParams.set('title', state.title);
  else url.searchParams.delete('title');
  if (state.color !== DEFAULT_COLOR) url.searchParams.set('color', state.color);
  else url.searchParams.delete('color');
  if (state.neon !== DEFAULT_NEON) url.searchParams.set('neon', state.neon);
  else url.searchParams.delete('neon');
  window.history.replaceState(null, '', url);
}

function setupEditor() {
  const button = document.querySelector<HTMLButtonElement>('#brandMark');
  const editor = document.querySelector<HTMLElement>('#brandEditor');
  const input = document.querySelector<HTMLInputElement>('#in_brandTitle');
  const swatches = document.querySelector<HTMLElement>('#brandColors');
  const neons = document.querySelector<HTMLElement>('#brandNeons');
  const copy = document.querySelector<HTMLButtonElement>('#btnBrandCopy');
  const message = document.querySelector<HTMLElement>('#brandMessage');
  if (!button || !editor || !input || !swatches || !neons || !copy || !message) return;

  const close = () => {
    editor.hidden = true;
    button.setAttribute('aria-expanded', 'false');
  };
  const markColor = () => {
    swatches.querySelectorAll('button').forEach((swatch) => {
      swatch.classList.toggle('active', swatch.dataset.color === state.color);
    });
  };

  for (const [key, palette] of Object.entries(PALETTES)) {
    const swatch = document.createElement('button');
    swatch.type = 'button';
    swatch.dataset.color = key;
    swatch.title = palette.label;
    swatch.setAttribute('aria-label', `${palette.label} 색`);
    swatch.style.setProperty('--swatch-a', palette.band);
    swatch.style.setProperty('--swatch-b', palette.accent);
    swatch.addEventListener('click', () => {
      applyColor(key);
      markColor();
      syncAddress();
    });
    swatches.append(swatch);
  }

  const markNeon = () => {
    neons.querySelectorAll('button').forEach((swatch) => {
      swatch.classList.toggle('active', swatch.dataset.neon === state.neon);
    });
  };
  for (const [key, neon] of Object.entries(NEONS)) {
    const swatch = document.createElement('button');
    swatch.type = 'button';
    swatch.dataset.neon = key;
    swatch.title = neon.label;
    swatch.setAttribute('aria-label', `네온 ${neon.label}`);
    // "기본"은 색 판을 따른다는 뜻으로 반반 표시
    swatch.style.setProperty('--swatch-a', neon.color || '#f4f4f4');
    swatch.style.setProperty('--swatch-b', neon.color || '#35f0ff');
    swatch.addEventListener('click', () => {
      applyNeon(key);
      markNeon();
      syncAddress();
    });
    neons.append(swatch);
  }
  markNeon();

  input.maxLength = MAX_TITLE_LENGTH;
  input.value = state.title === DEFAULT_TITLE ? '' : state.title;
  input.addEventListener('input', () => {
    applyTitle(input.value);
    syncAddress();
  });

  button.addEventListener('click', () => {
    editor.hidden = !editor.hidden;
    button.setAttribute('aria-expanded', String(!editor.hidden));
    message.textContent = '';
    if (!editor.hidden) input.focus();
  });
  copy.addEventListener('click', () => {
    const url = shareUrl();
    const done = () => {
      message.textContent = '주소를 복사했습니다.';
    };
    if (navigator.clipboard) {
      navigator.clipboard.writeText(url).then(done, () => {
        message.textContent = url;
      });
    } else {
      message.textContent = url;
    }
  });
  document.addEventListener('mousedown', (event) => {
    const target = event.target as Node;
    if (!editor.hidden && !editor.contains(target) && !button.contains(target)) close();
  });
  editor.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
      close();
      button.focus();
    }
  });
  markColor();
}

export function setupGuest() {
  const params = new URLSearchParams(window.location.search);
  state.neon = params.get('neon') ?? DEFAULT_NEON;
  applyColor(params.get('color') ?? DEFAULT_COLOR);
  const ready = () => {
    applyTitle(params.get('title') ?? DEFAULT_TITLE);
    setupEditor();
  };
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', ready);
  else ready();
}
