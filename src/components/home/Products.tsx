import ProductCard, { type ProductItem } from "./ProductCard";
import { Heading } from "../../ui";

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
        <Heading level="h3" className="mb-6 text-2xl md:text-3xl text-base-content">
          {title}
        </Heading>
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
