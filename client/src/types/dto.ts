export interface ProductDto {
  title: string;
  price: number;
  content: string;
  imageUrls: string[];
  categoryId: number;
}

export interface CreateChatRoomDto {
  content: string;
  productId: number;
}

export interface CreateChatContentDto {
  content: string;
}
