import { create } from 'zustand';
import { doc, getDoc } from "firebase/firestore";
import { db } from './firebase';

export const useUserStore = create((set) => ({
    currentUser: null,
    isLoading: true,
    error: null,

    fetchUserInfo: async (uid) => {
        if (!uid) {
            return set({ currentUser: null, isLoading: false });
        }

        set({ isLoading: true, error: null });

        try {
            const docRef = doc(db, "users", uid);
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
                set({ currentUser: docSnap.data(), isLoading: false });
            } else {
                console.log("No such document!");
                set({ currentUser: null });
            }

        } catch (err) {
            console.log("Error fetching user info:", err);
            set({ error: err, currentUser: null });
        } finally {
            set({ isLoading: false });
        }
    }
}));
