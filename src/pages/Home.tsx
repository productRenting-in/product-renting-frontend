import Hero from "../components/home/Hero";
import ServicesSection from "../components/home/Services";
import ProductSection from "../components/home/Products";
import Footer from "../components/footer";
import { Loading, Text } from "../ui";
import { useGetCategoriesQuery } from "../app/api/categoriesApi";
import { useGetProductsQuery } from "../app/api/productsApi";
import type { Category, ProductItem } from "../types";

const Home = () => {
  const { data: categories = [], isLoading: categoriesLoading, isError: categoriesError } = useGetCategoriesQuery();

  const { data: products = [], isLoading: productsLoading, isError: productsError } = useGetProductsQuery();

  const isLoading = categoriesLoading || productsLoading;
  const isError = categoriesError || productsError;

  return (
    <div className="flex min-h-screen flex-col bg-base-200">
      <main className="flex-1">
        <Hero />
        <ServicesSection />

        {isLoading && (
          <div className="flex justify-center py-20">
            <Loading variant="dots" size="lg" text="Loading products…" />
          </div>
        )}

        {isError && (
          <div className="flex justify-center py-20">
            <Text variant="error">Failed to load products. Please try again.</Text>
          </div>
        )}

        {!isLoading &&
          !isError &&
          categories.map((category: Category) => (
            <ProductSection
              key={category.categoryId}
              title={category.categoryName}
              products={products.filter((p: ProductItem) => p.category === category.categoryId)}
              sectionId={category.categoryId}
            />
          ))}
      </main>
      <Footer />
    </div>
  );
};

export default Home;
