# Google Sheets 연동 설정 가이드

## 1. Google Cloud Console 설정

### 1-1. 프로젝트 생성
1. [Google Cloud Console](https://console.cloud.google.com/) 접속
2. 새 프로젝트 생성 (예: `npc-magz-survey`)

### 1-2. Google Sheets API 활성화
1. 좌측 메뉴 → "API 및 서비스" → "라이브러리"
2. "Google Sheets API" 검색 후 "사용 설정" 클릭

### 1-3. 서비스 계정 생성
1. 좌측 메뉴 → "API 및 서비스" → "사용자 인증 정보"
2. "사용자 인증 정보 만들기" → "서비스 계정" 선택
3. 서비스 계정 이름 입력 (예: `sheets-writer`)
4. "만들고 계속하기" 클릭
5. 역할: "편집자" 선택 → "완료"

### 1-4. 서비스 계정 키 생성
1. 생성된 서비스 계정 클릭
2. "키" 탭 → "키 추가" → "새 키 만들기"
3. JSON 형식 선택 → "만들기"
4. JSON 파일 다운로드 (안전한 곳에 보관!)

## 2. Google Sheets 설정

### 2-1. 스프레드시트 생성
1. [Google Sheets](https://sheets.google.com/) 접속
2. 새 스프레드시트 생성
3. 첫 번째 행에 헤더 입력:
   ```
   A1: 제출시간
   B1: 이름
   C1: 전화번호
   D1: 결과타입
   ```

### 2-2. 스프레드시트 공유
1. 우측 상단 "공유" 버튼 클릭
2. 다운로드한 JSON 파일에서 `client_email` 값 복사
3. 해당 이메일 주소를 "편집자" 권한으로 추가
4. URL에서 스프레드시트 ID 복사:
   ```
   https://docs.google.com/spreadsheets/d/{이_부분이_ID}/edit
   ```

## 3. 환경변수 설정

### 3-1. 로컬 개발 (.env.local)
다운로드한 JSON 파일에서 값을 복사하여 `.env.local` 파일에 입력:

```env
GOOGLE_SHEET_ID=스프레드시트_ID
GOOGLE_SERVICE_ACCOUNT_EMAIL=JSON파일의_client_email_값
GOOGLE_PRIVATE_KEY="JSON파일의_private_key_값_전체"
```

**주의사항:**
- `GOOGLE_PRIVATE_KEY`는 반드시 큰따옴표로 감싸기
- `\n` 문자가 포함되어 있어야 함 (그대로 복사)

### 3-2. Vercel 배포 환경변수
1. Vercel 대시보드 → 프로젝트 선택
2. Settings → Environment Variables
3. 위 3개 환경변수 추가:
   - `GOOGLE_SHEET_ID`
   - `GOOGLE_SERVICE_ACCOUNT_EMAIL`
   - `GOOGLE_PRIVATE_KEY` (Value에 JSON의 private_key 전체 복사)

## 4. 테스트

### 로컬 테스트
```bash
npm run dev
```

1. http://localhost:3000 접속
2. 이름 입력 후 설문 진행
3. 결과 확인 후 경품 추첨 참여
4. Google Sheets에 데이터가 추가되었는지 확인

### 배포 후 테스트
1. Vercel에 배포
2. 실제 URL에서 테스트
3. Google Sheets 확인

## 5. 문제 해결

### "서버 설정 오류" 발생 시
- 환경변수가 제대로 설정되었는지 확인
- Vercel 환경변수는 배포 후 적용됨 (재배포 필요)

### "전송 실패" 발생 시
- 서비스 계정 이메일이 스프레드시트에 공유되었는지 확인
- 스프레드시트 ID가 정확한지 확인
- private_key에 `\n` 문자가 포함되어 있는지 확인

### API 할당량 초과 시
- Google Sheets API는 무료로 분당 100회 요청 가능
- 초과 시 Google Cloud Console에서 할당량 확인

## 6. 보안 주의사항

- `.env.local` 파일은 절대 Git에 커밋하지 말 것 (이미 .gitignore에 포함됨)
- JSON 키 파일도 Git에 올리지 말 것
- 서비스 계정 키는 안전하게 보관
- Vercel 환경변수는 암호화되어 저장됨
