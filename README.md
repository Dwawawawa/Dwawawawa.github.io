# 수능순웅 (SNSN - Suneung Adaptation)

## 프로젝트 소개
수능순웅은 2025학년도 대학수학능력시험을 준비하는 수험생들을 위한 무료 웹 기반 학습 플랫폼입니다. 국어 영역에 특화된 맞춤형 학습 서비스를 제공합니다.

## 주요 기능
- 🔐 사용자 인증 시스템
- 📚 과목별 문제 풀이 (독서, 문학, 화법과 작문, 언어와 매체)
- ⏱️ 실시간 타이머
- 📝 메모 기능 (자동 저장)
- 📊 개인별 학습 통계
- 📈 학습 진도 추적
- 🎯 정답률 분석

## 기술 스택
- Frontend: HTML, CSS, JavaScript
- Backend: Firebase
  - Authentication
  - Firestore
- Hosting: GitHub Pages

## 설치 방법
1. 저장소 클론
```bash
git clone https://github.com/[your-username]/SNSN.git
cd SNSN
```

2. Firebase 설정
- Firebase 콘솔에서 새 프로젝트 생성
- 웹 앱 추가
- Firebase 구성 객체를 복사하여 적용
- Authentication에서 이메일/비밀번호 로그인 활성화
- Firestore 데이터베이스 생성

3. firebase-config.js 파일 생성 및 구성
```javascript
const firebaseConfig = {
  // Firebase 설정값 입력
};
```

## 프로젝트 구조
```
SNSN
 ┣ 📂assets
 ┃ ┣ 📂css
 ┃ ┣ 📂data
 ┃ ┣ 📂img
 ┃ ┗ 📂js
 ┣ 📂pages
 ┣ 📜.gitignore
 ┣ 📜404.html
 ┣ 📜index.html
 ┗ 📜README.md
```

## Firebase 데이터 구조
```javascript
users/
  {userId}/
    profile/
      name, school, grade
    submissions/
      {submissionId}/
        questionSetId, answers, timeSpent
    progress/
      streakDays, totalSolved
```

## 개발 환경 설정
1. Firebase CLI 설치
```bash
npm install -g firebase-tools
```

2. Firebase 로그인
```bash
firebase login
```

3. Firebase 초기화
```bash
firebase init
```

## 로컬 개발
```bash
# 로컬 서버 실행
firebase serve
```

## 배포
```bash
# GitHub Pages 배포
git push origin main
```

## 기여 방법
1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 라이선스
MIT License

## 문의사항
- 이슈 등록: [GitHub Issues](https://github.com/[your-username]/SNSN/issues)

## 개발자 정보
- [Your Name]
- Email: [your-email]
- GitHub: [@your-username]

---
⭐️ 이 프로젝트가 도움이 되었다면 스타를 눌러주세요!