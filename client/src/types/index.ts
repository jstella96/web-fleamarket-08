export interface Region {
  code: number;
  name: string;
}

export interface Category {
  id: number;
  name: string;
  iconUrl: string;
}

export interface User {
  id: number;
  name: string;
}

export interface Thumbnail {
  id: number;
  imageUrl: string;
}

export interface Product {
  id: number;
  createdAt: string;
  updatedAt: string;
  title: string;
  price: string;
  content: string;
  status: string;
  views: number;
  author: User;
  thumbnail: Thumbnail;
  isLiked: boolean;
  chatCount: number;
  likeCount: number;
}

export interface Image {
  id: number;
  imageUrl: string;
}

export interface ProductDetail {
  id: number;
  createdAt: string;
  updatedAt: string;
  title: string;
  price: string;
  content: string;
  status: string;
  views: number;
  author: User;
  isLiked: boolean;
  images: Image[];
  chatCount: number;
  likeCount: number;
}

export interface Chat {
  id: number;
  content: string;
  createdAt: string;
}

export interface ChatRoom {
  id: number;
  isSellerActive: boolean;
  isBuyerActive: boolean;
  sellerLastActiveTime: string;
  buyerLastActiveTime: string;
  lastChat: Chat;
  unReadContents: Chat[];
  seller: User;
  buyer: User;
}

export interface ChatDetail {
  content: string;
  user: User;
  id: number;
  createdAt: string;
}

export interface ChatsResponse {
  contents: ChatDetail[];
  id: number;
  title: string;
  price: string;
  status: string;
  thumbnail: string;
}
