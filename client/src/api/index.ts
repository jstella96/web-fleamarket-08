import axios from 'axios';
import { Category, ChatDetail, ChatRoom, ChatsResponse, Product, ProductDetail, Region, User } from 'src/types';
import { CreateChatContentDto, CreateChatRoomDto, ProductDto } from 'src/types/dto';

const instance = axios.create({
  baseURL: process.env.REACT_APP_API_ENDPOINT,
  withCredentials: true,
});

const api = {
  getUser: () => instance.get<User>('/user'),
  setUserRegion: (regionCode: number) => instance.post('/user/region', { regionCode }),
  deleteUserRegion: (regionCode: number) => instance.delete(`/user/region/${regionCode}`),
  changeUserPrimaryRegion: (regionCode: number) => instance.post(`/user/region/${regionCode}/primary`),

  getRegions: (value: string) => instance.get<Region[]>(`/regions?value=${value}`),

  getCategories: () => instance.get<Category[]>('/categories'),

  createProduct: (product: ProductDto) => instance.post<ProductDetail>('/products', product),
  getProducts: () => instance.get<Product[]>('/products'),
  getProduct: (productId: number) => instance.get<ProductDetail>(`/products/${productId}`),
  updateProduct: (productId: number, product: Partial<ProductDto>) =>
    instance.patch<ProductDetail>(`/products/${productId}`, product),
  deleteProudct: (productId: number) => instance.delete(`products/${productId}`),
  likeProduct: (productId: number) => instance.post(`/products/${productId}/like`),

  getChatRooms: () => instance.get<ChatRoom[]>('/chats'),
  createChatRoom: (chatRoom: CreateChatRoomDto) => instance.post<ChatRoom>('/chats', chatRoom),
  getChats: (chatRoomId: number) => instance.get<ChatsResponse>(`/chats/${chatRoomId}`),
  createChat: (chatRoomId: number, chat: CreateChatContentDto) =>
    instance.post<ChatDetail>(`/chats/${chatRoomId}`, chat),

  socialLogin: (authorizationCode: string) => instance.post('/social-login', { authorizationCode }),

  socialLoginTest: () => instance.get('/social-login'),

  checkLogin: () => instance.get<User>('/login/check'),
  mockLogin: () => instance.post<User>('/login/mock'),

  logout: () => instance.post('/logout'),

  getSignedUrl: () => instance.get('/aws/signed-url'),
};

export default api;
