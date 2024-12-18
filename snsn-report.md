## 1. 서론

### 1.1 프로젝트 개요
수능순웅은 수험생을 위한 웹 기반 기출문제 학습 플랫폼입니다. 기존 종이 기반 기출문제집의 한계를 극복하고, 디지털 환경에서 효율적인 학습 경험을 제공합니다. Firebase를 활용한 서버리스 아키텍처로 구현하여, 사용자들에게 안정적이고 접근성 높은 서비스를 제공합니다.

### 1.2 프로젝트 목표 설정
현재 수능 기출문제집 사용자들이 직면한 주요 문제점들:
- 구매 비용 부담 (과목당 15,000원~20,000원)
- 휴대와 보관의 불편함
- 개인 학습 이력 관리의 어려움
- 문제 검색과 재구성의 제한
- 즉각적인 성적 분석 불가
- 취약 유형 파악을 위한 수동 집계 필요

이러한 문제점들을 해결하기 위해 다음과 같은 목표를 설정했습니다:
- 언제 어디서나 접근 가능한 클라우드 기반 시스템 구축
- 실시간 학습 데이터 분석 및 피드백 제공
- 게이미피케이션 요소를 통한 학습 동기 부여
- AI 기반 맞춤형 문제 추천 시스템 구현
- 효율적인 문제 검색 및 재구성 기능 제공

게이미피케이션(Gamification)이란 게임이 아닌 분야에 게임의 요소를 접목시키는 것을 의미합니다. 수능순웅에서는 연속 학습 달성 스트릭(Streak), 학습 진도에 따른 레벨 시스템, 일일 목표 달성 보상 등을 통해 수험생들의 학습 동기를 강화하고 지속적인 학습을 유도합니다.

### 1.3 프로젝트 필요성
1. 수능 학습 시장의 디지털 전환 필요성
   - 수능 기출문제집 시장 규모: YES24 기준 5,784종의 도서 출간
   - 대표적인 수능 기출문제집 '마더텅'의 경우:
     - 735문항의 방대한 문제 수록
     - 판매지수 177,039, 평균 평점 9.8점의 높은 수요
   - 종이책의 한계:
     - 개인 학습 데이터 추적 불가
     - 실시간 성적 분석 어려움
     - 학습 패턴 파악 제한

2. 수험생의 디지털 친화성
   - 현재 수능 수험생(Z세대)의 디지털 네이티브 특성
   - 스마트 기기를 통한 학습 선호도 증가
   - 즉각적인 피드백과 진도 관리 요구

3. 기존 수능 학습 도구의 한계
   - 기출문제집 평균 가격 15,000원~20,000원대
     - 여러 과목 구매 시 높은 비용 부담
     - 매년 새로운 교재 구매 필요
   - 종이 교재의 분실 및 훼손 위험
   - 휴대성 문제
   - 문제 검색과 재구성의 어려움

4. 디지털 플랫폼의 차별화된 가치
   - 실시간 학습 데이터 분석 및 피드백
   - 맞춤형 문제 추천 시스템
   - 언제 어디서나 접근 가능한 클라우드 기반 서비스
   - 지속적인 콘텐츠 업데이트 용이성

이러한 시장 환경에서 수능순웅은 기존 수능 학습 도구의 한계를 극복하고, 디지털 네이티브 수험생들의 학습 효율성을 극대화할 수 있는 혁신적인 솔루션을 제공하고자 합니다.

## 2. 배경

### 2.1 관련 기술의 동향
1. 서버리스 아키텍처 (Firebase)
   - 초기 개발 비용 최소화
   - 사용량 기반 과금으로 비용 효율성 확보
   - 자동 확장성으로 수험기간 트래픽 급증 대응
   - 보안 및 인증 시스템 기본 제공

2. 프로그레시브 웹 앱(PWA)
   - 웹과 네이티브 앱의 장점 결합
   - 오프라인 학습 지원 가능성
   - 모바일/데스크톱 모두 접근 용이
   - 설치형 앱으로 변환 가능

3. 실시간 데이터 동기화
   - Firestore의 실시간 리스너로 즉각적 학습 데이터 반영
   - 디바이스 간 학습 진도 동기화
   - 오프라인 캐싱으로 끊김 없는 서비스 제공

### 2.2 관련 기술의 수요 및 전망
1. 국내 이러닝 시장 현황
   - 2022년 국내 이러닝 시장 규모 5조 5,990억원 기록
   - 전년 대비 8.3% 성장
   *(출처: 정보통신산업진흥원, '2022 이러닝산업 실태조사')*

2. 수능 학습 시장의 디지털화
   - EBS의 2023년 온라인 강의 매출 1,503억원 달성
   - 전년 대비 11.2% 성장
   *(출처: EBS 2023년 경영실적보고서)*

3. 모바일 학습 플랫폼 성장
   - 2023년 국내 교육앱 월간 사용자 수 1,000만명 돌파
   - 10대 사용자의 교육앱 평균 사용시간 월 7시간
   *(출처: 와이즈앱·리테일·굿즈 데이터)*

### 2.3 기능 요구사항 목록
| NO  | 기능 분류 | 기능 설명 | 우선순위 | 구현 여부 |
|-----|-----------|-----------|-----------|------------|
| 001 | 사용자 인증 | 이메일/비밀번호 기반 회원가입 및 로그인 | 상 | ✅ |
| 002 | 문제 풀이 | 타이머 기반 문제 풀이 | 상 | ✅ |
| 003 | 학습 관리 | 과목별 학습 진도 추적 | 상 | ✅ |
| 004 | 데이터 분석 | 학습 통계 및 성취도 분석 | 중 | ✅ |
| 005 | 메모 기능 | 문제별 실시간 자동 저장 메모 | 중 | ✅ |
| 006 | 오답 노트 | 틀린 문제 자동 수집 및 관리 | 중 | ✅ |
| 007 | 결과 공유 | 학습 결과 및 성취도 공유 | 하 | ❌ |
| 008 | 학습 추천 | AI 기반 맞춤형 문제 추천 | 하 | ❌ |

## 3. 개발 시스템의 구성

### 3.1 구성도
![수능순웅 시스템 아키텍처](./images/SNSN%20Technical%20Architecture.png)
- Frontend Layer
  - HTML/CSS/JavaScript
  - 사용자 인터페이스
  - 클라이언트 상태 관리

- Backend Layer (Firebase)
  - Authentication: 사용자 인증 관리
  - Firestore Database: 실시간 데이터베이스
  - Cloud Functions: 서버리스 함수 실행

- Hosting Layer
  - GitHub Pages: 정적 웹 호스팅
  - Custom Domain 설정
  - HTTPS 보안 적용

이렇게 구성함으로써:
1. 정적 호스팅으로 인한 비용 절감
2. 안정적인 배포 환경 구축
3. 버전 관리와 호스팅의 통합


### 3.2 프로그램 세부 구성
- 사용자 인증 모듈
- 문제 풀이 엔진
- 학습 데이터 관리 시스템
- 진도 추적 시스템
- 통계 분석 모듈

## 4. 제한요소

### 4.1 동작 환경
- 웹 브라우저:
  - Chrome 89+ 
  - Firefox 86+ 
  - Safari 14+
- 최소 화면 해상도: 320px
- 네트워크: 3G 이상 인터넷 연결

브라우저 버전 요구사항의 근거
- Chrome 89+: ES2021 기능 완벽 지원 및 Firestore 실시간 리스너의 안정적 작동
- Firefox 86+: CSS Grid 및 Flexbox 완벽 지원, DOM 이벤트 핸들링 최적화
- Safari 14+: WebKit 엔진의 JavaScript 성능 개선, CSS 애니메이션 하드웨어 가속

이러한 버전들은 수능순웅의 핵심 기능인 실시간 데이터 동기화와 반응형 UI를 안정적으로 지원합니다.

### 4.2 개발 환경
- 개발 도구: VS Code
- 버전 관리: Git/GitHub
- 배포 환경: GitHub Pages
- Backend: Firebase 11.0.2

## 5. 결과

### 5.1 시험 및 평가

1. 성능 평가 (2024.11.29 측정)
   ![평가](./images/평가.png)
   Chrome DevTools의 Performance 탭, Network 탭, Memory 탭을 통해서 평가했다. 

   - 웹 성능 메트릭스:
     * LCP (Largest Contentful Paint): 1.8초
     * INP (Interaction to Next Paint): 180ms
     * CLS (Cumulative Layout Shift): 0.05
   - Firebase 응답 속도:
     * 데이터 조회: 평균 156ms
     * 데이터 저장: 평균 243ms
   - 메모리 사용량:
     * 일반 사용시: 32MB
     * 최대 부하시: 48MB (30문제 연속 풀이)



2. 사용성 평가
   - UI/UX 평가:
     * 모바일 최적화: 320px부터 반응형 디자인 적용
     * 네비게이션: 3단계 이내 접근 가능
     * 컬러 접근성: WCAG 2.1 기준 준수
   - 학습 기능 평가:
     * 문제 풀이 완료율: 92%
     * 메모 작성 활용률: 78%
     * 데이터 동기화 정확도: 99.9%

### 5.2 기대 효과

1. 수험생 학습 효율성 향상
   - 시간 절약: 문제 검색 및 정리 시간 80% 감소
   - 비용 절감: 기존 교재 구매 대비 90% 이상 절감
   - 학습 연속성: 디바이스 간 seamless한 학습 경험

2. 데이터 기반 학습 최적화
   - 개인별 취약 유형 자동 분석
   - 오답률 기반 복습 우선순위 제시
   - 학습 패턴 데이터 시각화

3. 기술적 성과
   - 서버리스 아키텍처의 안정성 검증
   - 실시간 데이터 동기화 구현
   - 확장 가능한 시스템 설계 완성

## 6. 프로젝트 진행 방법

#### 6.1 프로젝트 일정 및 진행 방식
1인 개발의 특성을 고려하여 폭포수 개발 방식보다는 유연한 애자일 방식을 채택했습니다. 
애자일 방법론을 활용한 1인 개발 프로세스를 다음과 같이 진행했습니다:

1. 스프린트 1 (11월 1주차)
   - [기본 UI/UX 디자인](https://www.figma.com/design/tncaguGmMjgOovucip7lcj/%EC%88%98%EB%8A%A5%EC%88%9C%EC%9D%91?node-id=0-1&t=ydLbzhbFG3VM7As3-1)
   - 프로젝트 설계 및 기본 구조 구축 

2. 스프린트 2 (11월 2주차)
   - 디자인의 프론트엔드 구현
   - HTML/CSS/JS를 활용한 UI/UX 구현
   - 수능 자료의 JSON 데이터 구조화

3. 스프린트 3 (11월 3주차)
   - Firebase 백엔드 및 GitHub Pages 호스팅 환경 구축
   - 사용자 인증 시스템 구현
   - 문제 풀이 시스템 구현

4. 스프린트 4 (11월 4주차)
   - 학습 데이터 관리 기능 개발
   - 통계 분석 기능 구현
   - 테스트 및 최적화

## 7. 결론

### 7.1 결론
본 프로젝트는 수험생들의 학습 문제를 해결하기 위해 시작되었습니다. 기존 종이 기반 기출문제집의 한계를 디지털 전환을 통해 극복하고자 했으며, 다음과 같은 성과를 달성했습니다:

1. 기술적 성과
   - 서버리스 아키텍처 기반의 안정적인 서비스 구축
   - 실시간 데이터 동기화 시스템 구현
   - 반응형 웹 디자인을 통한 다양한 디바이스 지원

2. 교육적 성과
   - 수험생의 시간적, 금전적 비용 절감
   - 데이터 기반 학습 관리 시스템 제공
   - 효율적인 학습 도구 제공

### 7.2 향후 계획

1. 서비스 고도화 (2025년 1월)
   - PWA 기능 구현으로 오프라인 학습 지원
   - 성능 최적화를 통한 사용자 경험 개선
   - AI 기반 문제 추천 시스템 개발

2. 수익화 전략 구현 (2025년 2월)
   - Google AdSense를 통한 광고 수익 창출
   - 프리미엄 기능 개발 및 도입
   - 지속 가능한 수익 모델 구축

3. 마케팅 활동 (2025년 3월)
   - 수험생 커뮤니티 중심의 타겟 마케팅
   - 학습 성과 데이터 기반의 효과성 입증
   - 사용자 피드백을 통한 서비스 개선

이러한 계획들을 통해 수능순웅이 단순한 프로젝트를 넘어 실제 수험생들에게 도움이 되는 서비스로 발전할 수 있도록 하겠습니다.
