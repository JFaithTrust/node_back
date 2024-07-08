import {IPost} from "@/interfaces";
import {create} from "zustand";

type PostStoreState = {
  posts: IPost[];
  setPosts: (posts: IPost[]) => void;
}

export const postStore = create<PostStoreState>(set => ({
  posts: [],
  setPosts: (posts) => set({posts})
}))