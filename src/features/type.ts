export interface Book {
  _id: string;
  title: string;
  author: string;
  genre?: string;
  isbn?: string;
  description?: string;
  copies: number;
  available: boolean;
}

export interface BorrowPayload {
  bookId: string;
  quantity: number;
  dueDate: string;
}

export interface BorrowResponse {
  bookId: string;
  userId: string;
  borrowedAt: string;
  dueDate?: string;
}
