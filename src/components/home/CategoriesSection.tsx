import { Link } from "react-router-dom";
import { Minus, Plus } from "lucide-react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { addToCart, removeFromCart, setQuantity } from "../../app/slices/cartSlice";
import { Card, Button } from "../../ui";

export interface SubcategoryItem {
  name: string;
  slug?: string;
  imageSrc?: string;
  description?: string;
  price?: number;
}

interface CategoriesSectionProps {
  title: string;
  subcategories: SubcategoryItem[];
  onAddToCart?: (item: SubcategoryItem) => void;
  sectionId?: string;
}

const PLACEHOLDER_IMAGES: Record<string, string> = {
  Gadde: "https://picsum.photos/seed/gadde/400/300",
  Takiye: "https://picsum.photos/seed/takiye/400/300",
  Chairs: "https://picsum.photos/seed/chairs/400/300",
  Heaters: "https://picsum.photos/seed/heaters/400/300",
  Coolers: "https://picsum.photos/seed/coolers/400/300",
  "Carpet section": "https://picsum.photos/seed/carpet/400/300",
  "Carpet Section": "https://picsum.photos/seed/carpet/400/300",
  Fans: "https://picsum.photos/seed/fans/400/300",
  Water: "https://picsum.photos/seed/water/400/300",
  "Baloon decoration": "https://picsum.photos/seed/balloon/400/300",
  "Balloon ecor": "https://picsum.photos/seed/balloon/400/300",
  "Plan a bday decoration": "https://picsum.photos/seed/bday/400/300",
  "Plan birthday decor": "https://picsum.photos/seed/bday/400/300",
  "Plan a anniversary decoration": "https://picsum.photos/seed/anniversary/400/300",
  "Plan anniversary decor": "https://picsum.photos/seed/anniversary/400/300",
  "Water bottles": "https://picsum.photos/seed/waterbottle/400/300",
  Gifts: "https://picsum.photos/seed/gifts/400/300",
  "Welcome signboard": "https://picsum.photos/seed/signboard/400/300",
  "Haldi tray": "https://picsum.photos/seed/haldi/400/300",
  "Ring platter": "https://picsum.photos/seed/ringplatter/400/300",
  Varmaala: "https://picsum.photos/seed/varmaala/400/300"
};

const formatPrice = (amount: number) =>
  new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(amount);

const DEFAULT_DESCRIPTION = "Rent this item for your occasion.";

const DEFAULT_PRICE = 129;

const getItemId = (item: SubcategoryItem) => item.slug ?? item.name.toLowerCase().replace(/\s+/g, "-");

const CategoriesSection = ({ title, subcategories, onAddToCart: _onAddToCart, sectionId }: CategoriesSectionProps) => {
  const dispatch = useAppDispatch();
  const cartItems = useAppSelector(state => state.cart.items);

  return (
    <section id={sectionId} className="bg-base-100 py-12 scroll-mt-24">
      <div className="mx-auto max-w-6xl px-4">
        <h2 className="mb-6 text-2xl font-bold text-base-content md:text-3xl">{title}</h2>
        <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-thin md:grid md:grid-cols-2 md:overflow-visible lg:grid-cols-4">
          {subcategories.map(item => {
            const imageSrc =
              item.imageSrc ??
              PLACEHOLDER_IMAGES[item.name] ??
              "https://picsum.photos/seed/" + encodeURIComponent(item.name) + "/400/300";
            const slug = item.slug ?? item.name.toLowerCase().replace(/\s+/g, "-");
            const id = getItemId(item);
            const cartEntry = cartItems.find(i => i.id === id);
            const cartQuantity = cartEntry?.quantity ?? 0;
            const description = item.description ?? DEFAULT_DESCRIPTION;
            const price = item.price ?? DEFAULT_PRICE;

            const cardActions =
              cartQuantity > 0 ? (
                <div className="flex items-center justify-end gap-1">
                  <Button
                    type="button"
                    size="sm"
                    variant="secondary"
                    className="btn-circle min-h-8 h-8 w-8 p-0 text-base-100"
                    aria-label="Decrease quantity"
                    onClick={e => {
                      e.preventDefault();
                      e.stopPropagation();
                      if (cartQuantity <= 1) {
                        dispatch(removeFromCart(id));
                      } else {
                        dispatch(setQuantity({ id, quantity: cartQuantity - 1 }));
                      }
                    }}
                  >
                    <Minus className="h-4 w-4" />
                  </Button>
                  <span className="min-w-6 text-center text-sm font-bold tabular-nums" aria-live="polite">
                    {cartQuantity}
                  </span>
                  <Button
                    type="button"
                    size="sm"
                    variant="secondary"
                    className="btn-circle min-h-8 h-8 w-8 p-0 text-base-100"
                    aria-label="Increase quantity"
                    onClick={e => {
                      e.preventDefault();
                      e.stopPropagation();
                      dispatch(setQuantity({ id, quantity: cartQuantity + 1 }));
                    }}
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              ) : (
                <Button
                  type="button"
                  size="sm"
                  variant="secondary"
                  onClick={e => {
                    e.preventDefault();
                    e.stopPropagation();
                    dispatch(addToCart({ ...item, imageSrc }));
                  }}
                >
                  Add to cart
                </Button>
              );

            const card = (
              <Card
                key={item.name}
                imageSrc={imageSrc}
                imageAlt={item.name}
                title={item.name}
                compact
                shadow
                bordered={false}
                className="min-w-[180px] shrink-0 overflow-hidden rounded-2xl transition hover:shadow-xl md:min-w-0"
                actions={cardActions}
              >
                <p className="text-sm text-base-content/80 line-clamp-2">{description}</p>
                <p className="mt-1 font-semibold text-primary">{formatPrice(price)}</p>
              </Card>
            );
            return (
              <Link
                key={item.name}
                to={`/products?category=${encodeURIComponent(slug)}`}
                className="focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded-2xl"
              >
                {card}
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default CategoriesSection;
