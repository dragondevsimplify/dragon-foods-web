export interface Category {
  id: string;
  name: string;
  imageUrl: string;
}

export interface CreateCategory {
  name: string;
  imageUrl?: string;
}
