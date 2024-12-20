import { Category } from "./category.model";

export interface Food {
  id: number;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  tags: string[];
  type: string;
  extrast: string[];
  postDate: Date;
  categoryId: string;
  variants: FoodVariant[];

  // Preloads
  category?: Category | null
}

export interface FoodType {
  value: string;
  label: string;
}

export interface FoodExtrast {
  value: string;
  label: string;
}

export interface FoodVariant {
  name: string;
  size: string;
}

export interface CreateFood {
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  tags: string[];
  type: string;
  extrast: string[];
  postDate: Date;
  categoryId: string;
  variants: FoodVariant[];
}

export interface UpdateFood {
  id: number;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  tags: string[];
  type: string;
  extrast: string[];
  postDate: Date;
  categoryId: string;
  variants: FoodVariant[];
}
