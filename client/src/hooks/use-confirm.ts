import {create} from "zustand";
import {IPost} from "@/interfaces";

type ConfirmState = {
  post: IPost;
  isOpen: boolean;
  onClose: () => void;
  onOpen: () => void;
  setPost: (post: IPost) => void;
}

export const useConfirm = create<ConfirmState>(set => ({
  isOpen: false,
  post: {} as IPost,
  onClose: () => set({isOpen: false}),
  onOpen: () => set({isOpen: true}),
  setPost: (post) => set({post})
}))