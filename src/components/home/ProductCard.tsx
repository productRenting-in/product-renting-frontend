import { Minus, Plus } from "lucide-react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { addToCart, removeFromCart, setQuantity } from "../../app/slices/cartSlice";
import { Button, Card, Text } from "../../ui";

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

const getItemId = (item: ProductItem) => item.productId ?? item.productName.toLowerCase().replace(/\s+/g, "-");

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

  const stop = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const cardActions =
    cartQuantity > 0 ? (
      <div className="flex items-center gap-2">
        <Button
          type="button"
          variant="secondary"
          size="sm"
          aria-label="Decrease quantity"
          onClick={e => {
            stop(e);
            if (cartQuantity <= 1) {
              dispatch(removeFromCart(id));
            } else {
              dispatch(setQuantity({ id, quantity: cartQuantity - 1 }));
            }
          }}
          className="h-7 w-7 p-0 rounded-full"
        >
          <Minus className="h-3.5 w-3.5" />
        </Button>
        <span className="min-w-5 text-center text-sm font-bold tabular-nums text-base-content" aria-live="polite">
          {cartQuantity}
        </span>
        <Button
          type="button"
          variant="secondary"
          size="sm"
          aria-label="Increase quantity"
          onClick={e => {
            stop(e);
            dispatch(setQuantity({ id, quantity: cartQuantity + 1 }));
          }}
          className="h-7 w-7 p-0 rounded-full"
        >
          <Plus className="h-3.5 w-3.5" />
        </Button>
      </div>
    ) : (
      <Button
        type="button"
        variant="secondary"
        size="sm"
        onClick={e => {
          stop(e);
          dispatch(addToCart({ ...item, imageSrc }));
        }}
        className="rounded-xl"
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
      className="overflow-hidden rounded-2xl transition hover:shadow-xl flex flex-col w-full h-full"
      bodyClassName="flex flex-col flex-1"
      actions={cardActions}
    >
      <Text size="sm" className="flex-1 text-base-content/80">
        {description}
      </Text>
      <Text weight="semibold" variant="primary" className="mt-1">
        {formatPrice(price)}/day
      </Text>
    </Card>
  );
};

export default ProductCard;
