// utils/profileManager.js 파일 생성
class ProfileManager {
    static async loadUserProfile(userId) {
        try {
            const db = getFirestore();
            const userDoc = await getDoc(doc(db, "users", userId));
            
            if (userDoc.exists()) {
                return userDoc.data();
            } else {
                throw new Error('사용자 프로필을 찾을 수 없습니다.');
            }
        } catch (error) {
            console.error('Error loading user profile:', error);
            throw error;
        }
    }

    static async updateUserProfile(userId, profileData) {
        try {
            const db = getFirestore();
            await setDoc(doc(db, "users", userId), profileData, { merge: true });
        } catch (error) {
            console.error('Error updating user profile:', error);
            throw error;
        }
    }
}

export default ProfileManager;