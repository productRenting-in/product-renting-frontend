import Categories from "./Categories";
import Gallery from "./Gallery";

const Hero = () => {
  return (
    <section className="flex-1 min-h-0 bg-base-100 py-14">
      <div className="mx-auto flex h-full max-w-6xl flex-col gap-6 px-4 lg:flex-row lg:items-stretch">
        <div className="w-full lg:w-[55%]">
          <Categories />
        </div>
        <div className="w-full min-h-[220px] lg:w-[45%] lg:min-h-0">
          <Gallery />
        </div>
      </div>
    </section>
  );
};

export default Hero;
