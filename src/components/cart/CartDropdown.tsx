import { Link } from "react-router-dom";
import { Minus, Plus, ShoppingBag, Trash2, X } from "lucide-react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { removeFromCart, setQuantity, type CartItem } from "../../app/slices/cartSlice";
import { Button, Heading, Text } from "../../ui";

const DEFAULT_PRICE = 129;

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
  "Balloon decor": "https://picsum.photos/seed/balloon/400/300",
  "Plan Birthday decor": "https://picsum.photos/seed/bday/400/300",
  "Plan Anniversary decor": "https://picsum.photos/seed/anniversary/400/300",
  "Water bottles": "https://picsum.photos/seed/waterbottle/400/300",
  Gifts: "https://picsum.photos/seed/gifts/400/300",
  "Welcome signboard": "https://picsum.photos/seed/signboard/400/300",
  "Haldi tray": "https://picsum.photos/seed/haldi/400/300",
  "Ring platter": "https://picsum.photos/seed/ringplatter/400/300",
  Varmaala: "https://picsum.photos/seed/varmaala/400/300"
};

const getItemImage = (item: CartItem) =>
  item.imageSrc ??
  PLACEHOLDER_IMAGES[item.productName] ??
  "https://picsum.photos/seed/" + encodeURIComponent(item.productName) + "/400/300";

const formatPrice = (amount: number) =>
  new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(amount);

const CartDropdownItem = ({ item }: { item: CartItem }) => {
  const dispatch = useAppDispatch();
  const price = item.pricePerDay ?? DEFAULT_PRICE;
  const lineTotal = price * item.quantity;
  const imageSrc = getItemImage(item);

  const handleQuantityChange = (delta: number) => {
    const next = item.quantity + delta;
    if (next <= 0) {
      dispatch(removeFromCart(item.id));
    } else {
      dispatch(setQuantity({ id: item.id, quantity: next }));
    }
  };

  return (
    <div className="flex gap-3 border-b border-base-200 py-4 last:border-0">
      <img
        src={imageSrc}
        alt={item.productName}
        className="h-14 w-14 shrink-0 rounded-xl object-cover bg-base-200 ring-1 ring-base-300/50"
      />
      <div className="min-w-0 flex-1">
        <Text size="sm" weight="medium" className="text-base-content line-clamp-2 leading-snug">
          {item.productName}
        </Text>
        <Text size="xs" className="mt-0.5 text-base-content/60">
          {formatPrice(price)} each
        </Text>
        <div className="mt-2 flex items-center gap-2">
          <Button
            type="button"
            variant="secondary"
            size="sm"
            aria-label="Decrease quantity"
            onClick={() => handleQuantityChange(-1)}
            className="h-7 w-7 p-0 rounded-full"
          >
            <Minus className="h-3.5 w-3.5" />
          </Button>
          <span className="min-w-6 text-center text-sm font-bold tabular-nums text-base-content" aria-live="polite">
            {item.quantity}
          </span>
          <Button
            type="button"
            variant="secondary"
            size="sm"
            aria-label="Increase quantity"
            onClick={() => handleQuantityChange(1)}
            className="h-7 w-7 p-0 rounded-full"
          >
            <Plus className="h-3.5 w-3.5" />
          </Button>
          <Button
            type="button"
            size="sm"
            styleType="link"
            aria-label="Remove from cart"
            onClick={() => dispatch(removeFromCart(item.id))}
            className="h-7 w-7 p-0 rounded-full"
          >
            <Trash2 className="h-5 w-5 text-secondary" />
          </Button>
        </div>
      </div>
      <div className="shrink-0 text-right">
        <Text size="sm" weight="semibold" variant="primary" className="tabular-nums">
          {formatPrice(lineTotal)}
        </Text>
      </div>
    </div>
  );
};

interface CartDropdownProps {
  onClose?: () => void;
}

const CartDropdown = ({ onClose }: CartDropdownProps) => {
  const items = useAppSelector(state => state.cart.items);
  const totalQuantity = items.reduce((sum, i) => sum + i.quantity, 0);
  const totalValue = items.reduce((sum, i) => sum + (i.pricePerDay ?? DEFAULT_PRICE) * i.quantity, 0);

  const containerClass =
    "bg-base-100 rounded-2xl shadow-xl border border-base-200 w-full md:w-96 max-h-[75vh] overflow-hidden";

  if (items.length === 0) {
    return (
      <div className={containerClass}>
        <div className="flex items-center justify-between px-5 py-4 border-b border-base-200">
          <Heading level="h6" className="text-base font-semibold text-base-content">
            Cart
          </Heading>
          {onClose && (
            <Button
              type="button"
              size="xs"
              styleType="ghost"
              onClick={onClose}
              aria-label="Close cart"
              className="rounded-full p-1"
            >
              <X className="h-4 w-4 text-base-content/60" />
            </Button>
          )}
        </div>
        <div className="p-8 flex flex-col items-center justify-center text-center">
          <div className="rounded-full bg-base-200 p-4 mb-3">
            <ShoppingBag className="h-8 w-8 text-base-content" />
          </div>
          <Text size="sm" className="text-base-content/70">
            Your cart is empty.
          </Text>
          <Text size="xs" className="mt-1 text-base-content/50">
            Add items from the categories below.
          </Text>
        </div>
      </div>
    );
  }

  return (
    <div className={`${containerClass} flex flex-col`}>
      <div className="flex items-center justify-between px-5 py-4 border-b border-base-200 shrink-0">
        <Heading level="h6" className="text-base font-semibold text-base-content">
          Your Cart ({totalQuantity} {totalQuantity === 1 ? "item" : "items"})
        </Heading>
        {onClose && (
          <Button
            type="button"
            size="xs"
            styleType="ghost"
            onClick={onClose}
            aria-label="Close cart"
            className="rounded-full p-1"
          >
            <X className="h-4 w-4 text-base-content/60" />
          </Button>
        )}
      </div>
      <div className="overflow-y-auto px-4 py-3 flex-1 min-h-0">
        {items.map(item => (
          <CartDropdownItem key={item.id} item={item} />
        ))}
      </div>
      <div className="p-4 border-t border-base-200 bg-base-200/30 shrink-0 space-y-3">
        <div className="flex items-center justify-between gap-2">
          <Text as="span" size="sm" weight="semibold" className="text-base-content">
            Total
          </Text>
          <Text as="span" size="xl" weight="bold" variant="primary" className="tabular-nums">
            {formatPrice(totalValue)}
          </Text>
        </div>
        <Link to="/checkout" onClick={onClose} className="btn btn-secondary btn-block btn-sm rounded-xl">
          Checkout
        </Link>
      </div>
    </div>
  );
};

export default CartDropdown;
