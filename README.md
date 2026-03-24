# 패션 설문 웹앱

글로벌 럭셔리 패션 매거진 스타일의 모바일 최적화 설문 페이지입니다.

## 기술 스택

- **Next.js 14** - React 프레임워크
- **TypeScript** - 타입 안정성
- **Tailwind CSS** - 유틸리티 CSS 프레임워크
- **Framer Motion** - 부드러운 애니메이션
- **Lucide React** - 아이콘 라이브러리

## 특징

- 📱 **모바일 최적화** - 터치 친화적 인터페이스
- 🎨 **패션 매거진 스타일** - Vogue, GQ 스타일의 세련된 디자인
- ✨ **부드러운 애니메이션** - Framer Motion 기반 페이지 전환
- 🎯 **패션 심리학** - 4가지 퍼스널리티 타입 분석
- 🖤 **흑백 대비** - 굵은 타이포그래피와 미니멀 디자인

## 설치 및 실행

```bash
# 의존성 설치
npm install

# 개발 서버 실행
npm run dev
```

브라우저에서 [http://localhost:3000](http://localhost:3000)을 열어 확인하세요.

## 프로젝트 구조

```
├── pages/
│   ├── _app.tsx          # 앱 설정
│   ├── _document.tsx     # HTML 문서 설정
│   └── index.tsx         # 메인 설문 페이지
├── styles/
│   └── globals.css       # 글로벌 스타일
├── package.json
├── tailwind.config.js
└── tsconfig.json
```

## 패션 퍼스널리티 타입

1. **PERFECTIONIST** - 완벽주의 철벽 셋업형
2. **MINIMALIST** - 실용주의 코지형  
3. **CREATIVE** - 마이웨이 도파민 드레서
4. **TRENDSETTER** - 트렌드-어댑터 야망캐

## 디자인 컨셉

- **크림 배경** (#F8F6F0) + **차콜 텍스트** (#1A1A1A)
- **액센트 컬러** (#FF4500) - 오렌지 레드 포인트
- **Inter 폰트** - 본문용 산세리프
- **Playfair Display** - 제목용 세리프
- **카드 기반 레이아웃** - 호버 효과와 그림자
- **부드러운 페이드 인/아웃** 애니메이션