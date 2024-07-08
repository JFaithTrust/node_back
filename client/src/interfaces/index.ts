export interface IPost {
  _id: string;
  title: string;
  content: string;
  picture: string;
  createdAt: string;
  author: string;
}

export interface IUser {
  email: string;
  isActivated: boolean;
  id: string;
}