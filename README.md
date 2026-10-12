# 게스트 핀볼

구슬을 물리 엔진으로 굴려 당첨자를 뽑는 웹 추첨기입니다. 전용 핀볼 사이트가 없는 스트리머 누구나 쓸 수 있는 공용 판입니다. 원본
[Marble Roulette](https://github.com/lazygyu/roulette)를 기반으로 하며, 광고·분석 코드 없이 동작합니다.

## 주요 기능

- 쉼표 또는 줄바꿈으로 참가자 입력, `이름*3` 형식으로 같은 참가자의 구슬 수 지정
- 여러 핀볼 맵과 첫 번째·마지막·지정 순위 당첨 방식
- 그림 파일 없이 그려지는 물음표 공(같은 이름은 항상 같은 공)
- 경기 중 1x·2x·5x 배속, 당첨 뒤 카운트다운 타이머
- `?names=이름1,이름2` 주소로 명단 자동 입력

## 주소로 꾸미기

왼쪽 위 이름표를 누르면 이름표 글자, 색, 네온 바·장애물 색을 바꿀 수 있고 "이 모양의 주소 복사"로 그 모양의 주소를 얻습니다.
주소에 직접 적어도 됩니다.

| 값 | 뜻 | 예 |
|---|---|---|
| `title` | 이름표 글자(12자까지) | `?title=민수 핀볼` |
| `color` | 색 판: `gray`(기본), `bw`, `teal`, `navy`, `purple`, `brown`, `green`, `red`, `pink`, `sky` | `?color=navy` |
| `neon` | 네온 색: `purple`(기본), `auto`, `white`, `cyan`, `blue`, `pink`, `red`, `orange`, `yellow`, `green` | `?neon=cyan` |

이 값들은 화면을 꾸미는 데만 쓰이며 어디에도 전송되지 않습니다.

## 실행과 빌드

Node.js 24와 pnpm 11.19.0을 권장합니다.

```powershell
pnpm install
pnpm dev
pnpm build
```

## 이미지와 라이선스

소스 코드는 MIT 라이선스입니다. `assets/guest-character.png`와 글꼴에 관한 내용은 `NOTICE.md`를 보세요.
