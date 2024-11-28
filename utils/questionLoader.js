// utils/questionLoader.js
class QuestionLoader {
    static async loadQuestionsBySubject(subject) {
        try {
            const response = await fetch(`/data/question-${subject}.json`);
            if (!response.ok) {
                throw new Error('Failed to load question data');
            }
 
            const data = await response.json();
            const subjectQuestions = data.questionSets[subject];
            
            if (!Array.isArray(subjectQuestions) || subjectQuestions.length === 0) {
                throw new Error(`No questions found for subject: ${subject}`);
            }
 
            // 랜덤하게 하나의 문제 세트 선택
            const randomIndex = Math.floor(Math.random() * subjectQuestions.length);
            const selectedSet = subjectQuestions[randomIndex];
 
            return {
                id: selectedSet.id,
                metadata: selectedSet.metadata,
                passage: selectedSet.passage,
                questionSet: selectedSet.questions.map(q => ({
                    id: q.id,
                    type: q.type,
                    points: q.points,
                    content: q.content,
                    options: q.options,
                    correctAnswer: q.correctAnswer,
                    explanation: q.explanation
                }))
            };
        } catch (error) {
            console.error('Error loading questions:', error);
            throw error;
        }
    }
 
    // 특정 ID의 문제 세트 가져오기
    static async loadQuestionSetById(subject, setId) {
        try {
            const response = await fetch(`/data/question-${subject}.json`);
            const data = await response.json();
            
            const selectedSet = data.questionSets[subject].find(set => set.id === setId);
            if (!selectedSet) {
                throw new Error(`Question set not found: ${setId}`);
            }
 
            return {
                id: selectedSet.id,
                metadata: selectedSet.metadata,
                passage: selectedSet.passage,
                questionSet: selectedSet.questions
            };
        } catch (error) {
            console.error('Error loading specific question set:', error);
            throw error;
        }
    }
 
    // Firebase에 답안 저장
    static async saveAnswer(userId, questionSetId, answers) {
        try {
            // answers는 Map 객체로 전달됨
            const answersObj = Object.fromEntries(answers);
            await setDoc(doc(db, `users/${userId}/submissions/${Date.now()}`), {
                questionSetId,
                answers: answersObj,
                submittedAt: new Date().toISOString(),
                subject: sessionStorage.getItem('selectedSubject')
            });
        } catch (error) {
            console.error('Error saving answers:', error);
            throw error;
        }
    }
 
    // 과목별 문제 세트 메타데이터만 가져오기
    static async getQuestionSetsMetadata(subject) {
        try {
            const response = await fetch(`/data/question-${subject}.json`);
            const data = await response.json();
            
            return data.questionSets[subject].map(set => ({
                id: set.id,
                metadata: set.metadata,
                title: set.passage.title
            }));
        } catch (error) {
            console.error('Error loading metadata:', error);
            throw error;
        }
    }
 
    // 사용자의 문제 풀이 진행상황 저장
    static async saveProgress(userId, questionSetId, currentQuestionId, answers) {
        try {
            await setDoc(doc(db, `users/${userId}/progress/${questionSetId}`), {
                currentQuestionId,
                answers: Object.fromEntries(answers),
                updatedAt: new Date().toISOString()
            });
        } catch (error) {
            console.error('Error saving progress:', error);
            throw error;
        }
    }
 
    // 사용자의 문제 풀이 진행상황 불러오기
    static async loadProgress(userId, questionSetId) {
        try {
            const progressDoc = await getDoc(doc(db, `users/${userId}/progress/${questionSetId}`));
            if (progressDoc.exists()) {
                const data = progressDoc.data();
                return {
                    currentQuestionId: data.currentQuestionId,
                    answers: new Map(Object.entries(data.answers))
                };
            }
            return null;
        } catch (error) {
            console.error('Error loading progress:', error);
            throw error;
        }
    }
 }
 
 export default QuestionLoader;