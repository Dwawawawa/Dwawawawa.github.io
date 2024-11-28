// /utils/memoManager.js

class MemoManager {
    constructor() {
        this.autoSaveTimeout = null;
        this.auth = null;
        this.db = null;
    }

    async initialize() {
        // Firebase 초기화
        if (window.firebase) {
            this.auth = firebase.auth();
            this.db = firebase.firestore();
        }

        await this.loadSavedMemo();
        this.setupEventListeners();
    }

    toggleMemo() {
        const memoContainer = document.getElementById('memoContainer');
        if (!memoContainer) return;
        
        const isVisible = window.getComputedStyle(memoContainer).display !== 'none';
        memoContainer.style.display = isVisible ? 'none' : 'block';
    }

    async saveMemo() {
        const memoText = document.getElementById('memoText')?.value || '';
        const questionId = this.getCurrentQuestionId();
        
        // 로컬 저장
        localStorage.setItem(`memo_${questionId}`, memoText);

        // Firebase에 저장
        if (this.auth?.currentUser && this.db) {
            try {
                await this.db.doc(`users/${this.auth.currentUser.uid}/memos/${questionId}`).set({
                    content: memoText,
                    updatedAt: new Date().toISOString()
                });
                console.log('메모가 클라우드에 저장됨');
            } catch (error) {
                console.error('클라우드 저장 실패:', error);
            }
        }
    }

    async clearMemo() {
        if (!confirm('메모를 지우시겠습니까?')) return;

        const memoText = document.getElementById('memoText');
        if (memoText) memoText.value = '';

        const questionId = this.getCurrentQuestionId();
        localStorage.removeItem(`memo_${questionId}`);

        // Firebase에서도 삭제
        if (this.auth?.currentUser && this.db) {
            try {
                await this.db.doc(`users/${this.auth.currentUser.uid}/memos/${questionId}`).delete();
                console.log('메모가 클라우드에서 삭제됨');
            } catch (error) {
                console.error('클라우드 삭제 실패:', error);
            }
        }
    }

    autoSaveMemo() {
        clearTimeout(this.autoSaveTimeout);
        this.autoSaveTimeout = setTimeout(() => {
            this.saveMemo();
        }, 1000);
    }

    async loadSavedMemo() {
        const questionId = this.getCurrentQuestionId();
        const memoText = document.getElementById('memoText');
        if (!memoText) return;

        // 로컬 스토리지에서 먼저 로드
        const localMemo = localStorage.getItem(`memo_${questionId}`);
        if (localMemo) {
            memoText.value = localMemo;
        }

        // Firebase에서 로드 (있다면 덮어씀)
        if (this.auth?.currentUser && this.db) {
            try {
                const memoDoc = await this.db.doc(`users/${this.auth.currentUser.uid}/memos/${questionId}`).get();
                if (memoDoc.exists) {
                    const memoData = memoDoc.data();
                    memoText.value = memoData.content;
                    localStorage.setItem(`memo_${questionId}`, memoData.content);
                }
            } catch (error) {
                console.error('클라우드에서 메모 로드 실패:', error);
            }
        }
    }

    getCurrentQuestionId() {
        return sessionStorage.getItem('currentQuestionId') || 'default';
    }

    setupEventListeners() {
        const memoText = document.getElementById('memoText');
        if (memoText) {
            memoText.addEventListener('input', () => this.autoSaveMemo());
        }

        // Firebase 인증 상태 변경 감지
        if (this.auth) {
            this.auth.onAuthStateChanged(async (user) => {
                if (user) {
                    await this.loadSavedMemo(); // 로그인 시 클라우드 데이터 로드
                }
            });
        }
    }
}

export default new MemoManager();