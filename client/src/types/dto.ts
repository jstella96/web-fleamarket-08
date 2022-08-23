export interface ProductDto {
  title: string;
  price: number;
  content: string;
  imageUrls: string[];
  categoryId: number;
  regionCode: number;
}

export interface CreateChatRoomDto {
  content: string;
  productId: number;
}

export interface CreateChatContentDto {
  content: string;
}
