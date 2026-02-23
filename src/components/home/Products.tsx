import ProductCard, { type ProductItem } from "./ProductCard";

export type { ProductItem };

interface ProductSectionProps {
  title: string;
  products: ProductItem[];
  sectionId?: string;
}

const Products = ({ title, products, sectionId }: ProductSectionProps) => {
  return (
    <section id={sectionId} className="bg-base-100 py-12 scroll-mt-24">
      <div className="mx-auto max-w-6xl px-4">
        <h2 className="mb-6 text-2xl font-bold text-base-content md:text-3xl">{title}</h2>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {products.map(item => (
            <ProductCard key={item.productId ?? item.productName} item={item} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Products;
