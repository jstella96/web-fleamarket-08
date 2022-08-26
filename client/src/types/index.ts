export interface Region {
  code: number;
  name: string;
}

export interface UserRegion {
  regionCode: number;
  name: string;
  isPrimary: boolean;
  region: Region;
}

export interface Category {
  id: number;
  name: string;
  iconUrl: string;
}

export interface User {
  id: number;
  name: string;
  userRegions: UserRegion[];
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
  region: Region;
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
  region: Region;
  category: Category;
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
  product: Product;
}

export interface ChatContent {
  content: string;
  user: User;
  id: number;
  createdAt: string;
}

export interface ChatDetail {
  chatContents: ChatContent[];
  chatRoom: ChatRoom;
  product: Product;
}

export interface KaKaoRegion {
  region_type: string;
  code: string;
  address_name: string;
  region_1depth_name: string;
  region_2depth_name: string;
  region_3depth_name: string;
  region_4depth_name: string;
  x: number;
  y: number;
}
