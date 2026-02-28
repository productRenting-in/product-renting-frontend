import { Carousel } from "../../ui";

const SLIDES = [
  {
    src: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800&q=80",
    alt: "Rental items"
  },
  {
    src: "https://images.unsplash.com/photo-1603415526960-f7e0328c63b1?w=800&q=80",
    alt: "Event decoration"
  },
  {
    src: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&q=80",
    alt: "Home setup"
  },
  {
    src: "https://images.unsplash.com/photo-1621905252507-b35492cc74b4?w=800&q=80",
    alt: "Custom arrangement"
  }
];

const Gallery = () => {
  return (
    <Carousel
      autoPlay
      interval={5000}
      pauseOnHover
      showArrows
      showIndicators
      dotIndicators
      className="h-full min-h-[220px] rounded-2xl"
    >
      {SLIDES.map(slide => (
        <Carousel.Item key={slide.src}>
          <img src={slide.src} alt={slide.alt} className="h-full w-full object-cover" />
        </Carousel.Item>
      ))}
    </Carousel>
  );
};

export default Gallery;
