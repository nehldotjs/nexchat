import { create } from "zustand";
import { db } from "./Firebase";
import { doc, getDoc } from "firebase/firestore";

export const useUserStore = create((set) => ({
  currentUser: null,
  isLoading: true,

  fetchUserInfo: async (uid) => {
    if (!uid) return set({ currentUser: null, isLoading: false });
    
    try {
      const docRef = doc(db, "user", uid);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        set({
          currentUser: docSnap.data(),
          isLoading: false
        });
      } else {
        set({ currentUser: null, isLoading: false });
      }

    } catch (err) {
      console.log("Error fetching user info:", err.message);
      set({ currentUser: null, isLoading: false });
    }
  }
}));