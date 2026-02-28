export interface Category {
  categoryId: string;
  categoryName: string;
  categoryDescription: string;
  categorySlug: string;
}

export interface ProductItem {
  productId: string;
  productName: string;
  productDescription: string;
  category: string;
  pricePerDay: number;
  imageSrc?: string;
  pricePerWeek: number | null;
  pricePerMonth: number | null;
}
