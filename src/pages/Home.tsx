import Hero from "../components/home/Hero";
import CategoriesSection from "../components/home/CategoriesSection";
import Footer from "../components/footer";

const RENT_FROM_US_SUBCATEGORIES = [
  { name: "Gadde" },
  { name: "Takiye" },
  { name: "Chairs" },
  { name: "Heaters" },
  { name: "Coolers" },
  { name: "Carpet Section" },
  { name: "Fans" },
  { name: "Water" }
];

const PLAN_A_DECOR_SUBCATEGORIES = [
  { name: "Balloon decor" },
  { name: "Plan Birthday decor" },
  { name: "Plan Anniversary decor" }
];

const CUSTOMIZE_WITH_US_SUBCATEGORIES = [
  { name: "Water bottles" },
  { name: "Gifts" },
  { name: "Welcome signboard" },
  { name: "Haldi tray" },
  { name: "Ring platter" },
  { name: "Varmaala" }
];

const Home = () => {
  return (
    <div className="flex min-h-screen flex-col bg-base-200">
      <main className="flex-1">
        <Hero />
        <CategoriesSection title="Rent from Us" subcategories={RENT_FROM_US_SUBCATEGORIES} />
        <CategoriesSection title="Plan & Decorate" subcategories={PLAN_A_DECOR_SUBCATEGORIES} />
        <CategoriesSection title="Customize with Us" subcategories={CUSTOMIZE_WITH_US_SUBCATEGORIES} />
      </main>
      <Footer />
    </div>
  );
};

export default Home;
