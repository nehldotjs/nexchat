import { create } from "zustand";
import { db } from "./Firebase";
import { doc, getDoc } from "firebase/firestore";
import { useUserStore } from "./UseStore";

export const useChatStore = create((set) => ({
  chatId: null,
  user: null,
  isLoading: true,
  isCurrentUserBlocked: false,
  isReceiverBlocked: false,

  changeChat: (chatId, user) => {
    const currentUser = useUserStore.getState().currentUser;

    // CHECK IF CURRENT USER IS BLOCKED by the receiver
    if (user.blocked?.includes(currentUser.uid)) {
      return set({
        chatId,
        user: null,
        isCurrentUserBlocked: true,
        isReceiverBlocked: false
      });
    }

    // CHECK IF RECEIVER IS BLOCKED by the current user
    else if (currentUser.blocked?.includes(user.uid)) {
      return set({
        chatId,
        user: null,
        isCurrentUserBlocked: false,
        isReceiverBlocked: true
      });
    } else {
      return set({
        chatId,
        user,
        isCurrentUserBlocked: false,
        isReceiverBlocked: false
      });
    }

    // If no one is blocked, set the chat
  },

  // Toggle receiver block status
  changeBlocked: () => {
    set((state) => ({
      ...state,
      isReceiverBlocked: !state.isReceiverBlocked
    }));
  }
}));
