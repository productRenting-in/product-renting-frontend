import HeroCategories from "./HeroCategories";
import HeroGallery from "./HeroGallery";

const Hero = () => {
  return (
    <section className="bg-base-100 py-10">
      <div className="mx-auto flex max-w-6xl flex-col gap-8 px-4 lg:flex-row lg:items-stretch">
        <div className="w-full lg:w-[55%]">
          <HeroCategories />
        </div>
        <div className="w-full lg:w-[45%] min-h-0">
          <HeroGallery />
        </div>
      </div>
    </section>
  );
};

export default Hero;
