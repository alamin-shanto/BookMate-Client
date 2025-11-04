export interface Book {
  _id: string;
  title: string;
  author: string;
  genre?: string;
  isbn?: string;
  description?: string;
  copies: number;
  available: boolean;
  image?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface BorrowPayload {
  bookId: string;
  quantity: number;
  dueDate: string;
  borrowerName: string;
}

export interface BorrowResponse {
  bookId: string;
  userId: string;
  borrowerName: string;
  borrowedAt: string;
  dueDate?: string;
}
