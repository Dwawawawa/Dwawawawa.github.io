# Coffee_Gum 위키 GitHub Pages 배포 가이드

## 개요

이 가이드는 Coffee_Gum 위키 웹사이트를 GitHub Pages를 통해 호스팅하는 방법을 설명합니다. 

## 1. 사전 준비사항

### 필요한 리포지토리
- **Coffee_Gum 리포지토리** (private): 마크다운 파일 및 데이터 저장소
- **Dwawawawa.github.io 리포지토리** (public): 웹사이트 호스팅용

### 파일 구조
```
Dwawawawa.github.io/
├── index.html          # 메인 HTML 파일
├── style.css           # 스타일시트
├── app.js             # JavaScript 파일
├── assets/            # 이미지, 폰트 등 정적 자원
└── README.md          # 리포지토리 설명
```

## 2. 기존 파일 정리

현재 Dwawawawa.github.io에 있는 수능순웅(SNSN) 프로젝트 파일들을 정리해야 합니다.

### 백업 및 정리 단계
1. 기존 파일들을 별도 브랜치에 백업
```bash
git checkout -b backup-snsn
git add .
git commit -m "Backup SNSN project files"
git push origin backup-snsn
```

2. main 브랜치에서 기존 파일 삭제
```bash
git checkout main
# 필요한 파일들만 남기고 삭제
git rm -r assets/ pages/ (기존 SNSN 파일들)
git commit -m "Clear repository for Coffee_Gum wiki"
```

## 3. 위키 파일 업로드

### 생성된 웹 애플리케이션 파일들을 리포지토리에 추가

1. 새로운 파일들 추가
```bash
# 위에서 생성된 파일들을 로컬 리포지토리에 복사 후
git add index.html
git add style.css
git add app.js
git commit -m "Add Coffee_Gum wiki application"
git push origin main
```

## 4. GitHub Pages 설정

### 4.1 리포지토리 설정
1. GitHub에서 Dwawawawa.github.io 리포지토리로 이동
2. **Settings** 탭 클릭
3. 왼쪽 사이드바에서 **Pages** 메뉴 선택

### 4.2 배포 소스 설정
- **Source**: Deploy from a branch
- **Branch**: main
- **Folder**: / (root)
- **Save** 버튼 클릭

## 5. Coffee_Gum 리포지토리 연동

### 5.1 GitHub API를 통한 파일 접근
Coffee_Gum 리포지토리가 private이므로 직접 접근은 제한됩니다. 다음 방법들을 고려할 수 있습니다:

#### 옵션 1: Public 서브폴더 생성
```
Coffee_Gum/
├── private/           # private 내용
└── public/           # 공개할 위키 내용
    └── HJ/           # 효제 폴더
        ├── README.md
        ├── docs/
        └── ...
```

#### 옵션 2: 별도 Public 리포지토리
- `Coffee_Gum-public` 리포지토리 생성
- 공개할 마크다운 파일들만 저장
- 위키 웹사이트에서 이 리포지토리의 파일들을 로드

### 5.2 JavaScript에서 GitHub 파일 로드
```javascript
// GitHub API를 통한 마크다운 파일 로드 예시
async function loadMarkdownFile(filePath) {
    const url = `https://api.github.com/repos/earltrash/Coffee_Gum-public/contents/${filePath}`;
    
    try {
        const response = await fetch(url);
        const data = await response.json();
        
        // Base64 디코딩
        const content = atob(data.content);
        return content;
    } catch (error) {
        console.error('파일 로드 실패:', error);
        return null;
    }
}
```

## 6. 도메인 설정

### 6.1 기본 도메인
- 자동 생성되는 URL: `https://dwawawawa.github.io/`

### 6.2 커스텀 도메인 (선택사항)
1. 도메인 구매 후 CNAME 파일 생성
2. GitHub Pages 설정에서 커스텀 도메인 입력
3. DNS 설정 (A 레코드 또는 CNAME 레코드)

## 7. 배포 확인

### 7.1 배포 상태 확인
- Settings > Pages에서 배포 URL 확인
- "Your site is live at ..." 메시지 확인

### 7.2 Actions 탭에서 빌드 로그 확인
- 리포지토리의 **Actions** 탭에서 배포 과정 모니터링
- 오류 발생 시 로그에서 원인 파악

## 8. 유지보수

### 8.1 콘텐츠 업데이트
1. 마크다운 파일 수정
2. Git으로 변경사항 커밋 및 푸시
3. GitHub Pages 자동 재배포 (보통 1-5분 소요)

### 8.2 캐시 문제 해결
- 브라우저 강제 새로고침: `Ctrl+Shift+R` (Windows) / `Cmd+Shift+R` (Mac)
- 최대 10분 정도 기다린 후 확인

## 9. 보안 고려사항

### 9.1 Private 데이터 보호
- Coffee_Gum 리포지토리의 민감한 정보는 절대 public 리포지토리에 포함하지 않음
- GitHub token이나 API key를 클라이언트 코드에 포함하지 않음

### 9.2 접근 권한 관리
- 필요한 경우에만 리포지토리를 public으로 설정
- 협업자 권한 적절히 관리

## 10. 문제 해결

### 10.1 일반적인 문제들
- **404 오류**: 파일 경로 및 이름 확인
- **빌드 실패**: Jekyll 설정 파일이나 문법 오류 확인
- **스타일 깨짐**: CSS 파일 경로 확인

### 10.2 디버깅 방법
- 브라우저 개발자 도구 콘솔 확인
- GitHub Actions 로그 확인
- 로컬에서 먼저 테스트 후 배포

## 마무리

이 가이드를 따라하면 Coffee_Gum 위키를 성공적으로 GitHub Pages에 배포할 수 있습니다. 추가 질문이나 문제가 발생하면 GitHub Issues를 활용하여 해결할 수 있습니다.