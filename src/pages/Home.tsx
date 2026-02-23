import Hero from "../components/home/Hero";
import ServicesSection from "../components/home/Services";
import ProductSection from "../components/home/Products";
import Footer from "../components/footer";
import categories from "../dummy-data/categories.json";
import type { Category } from "../components/home/Categories";
import products from "../dummy-data/products.json";

const Home = () => {
  return (
    <div className="flex min-h-screen flex-col bg-base-200">
      <main className="flex-1">
        <Hero />
        <ServicesSection />
        {categories.map((category: Category) => (
          <ProductSection
            key={category.categoryId}
            title={category.categoryName}
            products={products.filter(p => p.category === category.categoryId)}
            sectionId={category.categoryId}
          />
        ))}
      </main>
      <Footer />
    </div>
  );
};

export default Home;
