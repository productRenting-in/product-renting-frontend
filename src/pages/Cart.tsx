import { Link } from "react-router-dom";
import { Minus, Plus, ShoppingBag, Trash2 } from "lucide-react";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { removeFromCart, setQuantity, type CartItem } from "../app/slices/cartSlice";
import { Button } from "../ui";

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
  PLACEHOLDER_IMAGES[item.name] ??
  "https://picsum.photos/seed/" + encodeURIComponent(item.name) + "/400/300";

const formatPrice = (amount: number) =>
  new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(amount);

const CartItemRow = ({ item }: { item: CartItem }) => {
  const dispatch = useAppDispatch();
  const price = item.price ?? DEFAULT_PRICE;
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
    <li className="flex gap-4 rounded-2xl border border-base-200 bg-base-100 p-4 shadow-sm">
      <img
        src={imageSrc}
        alt={item.name}
        className="h-20 w-20 shrink-0 rounded-xl object-cover bg-base-200 ring-1 ring-base-300/50"
      />
      <div className="min-w-0 flex-1">
        <p className="font-semibold text-base-content">{item.name}</p>
        <p className="mt-0.5 text-sm text-base-content/60">{formatPrice(price)} each</p>
        <div className="mt-3 flex items-center gap-2">
          <Button
            type="button"
            size="sm"
            variant="secondary"
            className="btn-circle min-h-8 h-8 w-8 p-0"
            aria-label="Decrease quantity"
            onClick={() => handleQuantityChange(-1)}
          >
            <Minus className="h-4 w-4" />
          </Button>
          <span className="min-w-7 text-center text-sm font-bold tabular-nums" aria-live="polite">
            {item.quantity}
          </span>
          <Button
            type="button"
            size="sm"
            variant="secondary"
            className="btn-circle min-h-8 h-8 w-8 p-0"
            aria-label="Increase quantity"
            onClick={() => handleQuantityChange(1)}
          >
            <Plus className="h-4 w-4" />
          </Button>
          <Button
            type="button"
            size="sm"
            styleType="ghost"
            className="btn-circle min-h-8 h-8 w-8 p-0 text-error hover:text-error hover:bg-error/10 ml-1"
            aria-label="Remove from cart"
            onClick={() => dispatch(removeFromCart(item.id))}
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </div>
      <div className="shrink-0 text-right">
        <p className="text-base font-semibold text-primary tabular-nums">{formatPrice(lineTotal)}</p>
      </div>
    </li>
  );
};

const Cart = () => {
  const items = useAppSelector(state => state.cart.items);
  const total = items.reduce((sum, i) => sum + (i.price ?? DEFAULT_PRICE) * i.quantity, 0);

  if (items.length === 0) {
    return (
      <div className="mx-auto max-w-lg px-4 py-20 text-center">
        <div className="rounded-full bg-base-200 p-6 inline-block mb-4">
          <ShoppingBag className="h-12 w-12 text-base-content" />
        </div>
        <h1 className="text-2xl font-bold text-base-content">Your cart is empty</h1>
        <p className="mt-2 text-base-content/70">Add items from the home page to get started.</p>
        <Link to="/" className="btn btn-primary mt-6">
          Continue shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-2xl px-4 py-8">
      <h1 className="text-2xl font-bold text-base-content">Your cart</h1>
      <p className="mt-1 text-sm text-base-content/70">
        {items.length} {items.length === 1 ? "item" : "items"}
      </p>

      <ul className="mt-6 space-y-4">
        {items.map(item => (
          <CartItemRow key={item.id} item={item} />
        ))}
      </ul>

      <div className="mt-6 rounded-2xl border border-base-200 bg-base-100 p-5 shadow-sm">
        <div className="flex items-center justify-between gap-4">
          <span className="text-base font-semibold text-base-content">Total</span>
          <span className="text-xl font-bold text-primary tabular-nums">{formatPrice(total)}</span>
        </div>
      </div>

      <div className="mt-6 flex flex-col gap-1 sm:flex-row sm:justify-between">
        <Link to="/" className="btn btn-ghost btn-block sm:btn-wide order-2 sm:order-1">
          Continue shopping
        </Link>
        <Link to="/checkout" className="btn btn-primary btn-block sm:btn-wide order-1 sm:order-2">
          Checkout
        </Link>
      </div>
    </div>
  );
};

export default Cart;
