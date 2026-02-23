import { Minus, Plus } from "lucide-react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { addToCart, removeFromCart, setQuantity } from "../../app/slices/cartSlice";
import { Card, Button } from "../../ui";

export interface ProductItem {
  productId: string;
  productName: string;
  productDescription: string;
  category: string;
  pricePerDay: number;
  imageSrc?: string;
  pricePerWeek: number | null;
  pricePerMonth: number | null;
}

const formatPrice = (amount: number) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0
  }).format(amount);

const DEFAULT_DESCRIPTION = "Rent this item for your occasion.";

const getItemId = (item: ProductItem) => `product-${item.productId}`;

const getImageSrc = (item: ProductItem) =>
  item.imageSrc ?? `https://picsum.photos/seed/product-${item.productId}/400/300`;

interface ProductCardProps {
  item: ProductItem;
}

const ProductCard = ({ item }: ProductCardProps) => {
  const dispatch = useAppDispatch();
  const id = getItemId(item);
  const imageSrc = getImageSrc(item);
  const description = item.productDescription || DEFAULT_DESCRIPTION;
  const price = item.pricePerDay;

  const cartQuantity = useAppSelector(state => state.cart.items.find(i => i.id === id)?.quantity) ?? 0;

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
        Add to Cart
      </Button>
    );

  return (
    <Card
      imageSrc={imageSrc}
      imageAlt={item.productName}
      title={item.productName}
      compact
      shadow
      bordered={false}
      imageClassName="h-44"
      className="min-w-[200px] shrink-0 overflow-hidden rounded-2xl transition hover:shadow-xl md:min-w-0 flex flex-col w-full h-full"
      bodyClassName="flex flex-col flex-1"
      actions={cardActions}
    >
      <p className="flex-1 text-sm text-base-content/80 line-clamp-3">{description}</p>
      <p className="mt-1 font-semibold text-primary">{formatPrice(price)}/day</p>
    </Card>
  );
};

export default ProductCard;
