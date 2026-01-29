const HeroGallery = () => {
  return (
    <div className="grid h-full grid-cols-2 grid-rows-2 gap-2 overflow-hidden rounded-lg">
      <div className="overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800&q=80"
          alt="Salon service"
          className="h-full w-full object-cover"
        />
      </div>
      <div className="overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1603415526960-f7e0328c63b1?w=800&q=80"
          alt="Massage service"
          className="h-full w-full object-cover"
        />
      </div>
      <div className="overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800&q=80"
          alt="Home repair"
          className="h-full w-full object-cover"
        />
      </div>
      <div className="overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1621905252507-b35492cc74b4?w=800&q=80"
          alt="AC cleaning"
          className="h-full w-full object-cover"
        />
      </div>
    </div>
  );
};

export default HeroGallery;
