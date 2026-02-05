import { Link } from "react-router-dom";
import { Minus, Plus, ShoppingBag, Trash2 } from "lucide-react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { removeFromCart, setQuantity, type CartItem } from "../../app/slices/cartSlice";
import { Button } from "../../ui";

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

const CartDropdownItem = ({ item }: { item: CartItem }) => {
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
    <div className="flex gap-3 border-b border-base-200 py-4 last:border-0">
      <img
        src={imageSrc}
        alt={item.name}
        className="h-14 w-14 shrink-0 rounded-xl object-cover bg-base-200 ring-1 ring-base-300/50"
      />
      <div className="min-w-0 flex-1">
        <p className="text-sm font-medium text-base-content line-clamp-2 leading-snug">{item.name}</p>
        <p className="mt-0.5 text-xs text-base-content/60">{formatPrice(price)} each</p>
        <div className="mt-2 flex items-center gap-2">
          <Button
            type="button"
            size="xs"
            styleType="ghost"
            className="btn-circle min-h-7 h-7 w-7 p-0 text-base-content/70 hover:text-base-content hover:bg-base-200"
            aria-label="Decrease quantity"
            onClick={() => handleQuantityChange(-1)}
          >
            <Minus className="h-3.5 w-3.5" />
          </Button>
          <span className="min-w-6 text-center text-sm font-bold tabular-nums text-base-content" aria-live="polite">
            {item.quantity}
          </span>
          <Button
            type="button"
            size="xs"
            styleType="ghost"
            className="btn-circle min-h-7 h-7 w-7 p-0 text-base-content/70 hover:text-base-content hover:bg-base-200"
            aria-label="Increase quantity"
            onClick={() => handleQuantityChange(1)}
          >
            <Plus className="h-3.5 w-3.5" />
          </Button>
          <Button
            type="button"
            size="xs"
            styleType="ghost"
            className="btn-circle min-h-7 h-7 w-7 p-0 text-error hover:text-error hover:bg-error/10"
            aria-label="Remove from cart"
            onClick={() => dispatch(removeFromCart(item.id))}
          >
            <Trash2 className="h-3.5 w-3.5" />
          </Button>
        </div>
      </div>
      <div className="shrink-0 text-right">
        <p className="text-sm font-semibold text-primary tabular-nums">{formatPrice(lineTotal)}</p>
      </div>
    </div>
  );
};

const CartDropdown = () => {
  const items = useAppSelector(state => state.cart.items);
  const totalQuantity = items.reduce((sum, i) => sum + i.quantity, 0);
  const totalValue = items.reduce((sum, i) => sum + (i.price ?? DEFAULT_PRICE) * i.quantity, 0);

  if (items.length === 0) {
    return (
      <div className="bg-base-100 rounded-2xl shadow-xl border border-base-200 w-96 max-h-[70vh] overflow-hidden">
        <div className="px-5 py-4 border-b border-base-200">
          <h3 className="text-base font-semibold text-base-content">Cart</h3>
        </div>
        <div className="p-8 flex flex-col items-center justify-center text-center">
          <div className="rounded-full bg-base-200 p-4 mb-3">
            <ShoppingBag className="h-8 w-8 text-base-content" />
          </div>
          <p className="text-sm text-base-content/70">Your cart is empty.</p>
          <p className="mt-1 text-xs text-base-content/50">Add items from the categories below.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-base-100 rounded-2xl shadow-xl border border-base-200 w-96 max-h-[70vh] overflow-hidden flex flex-col">
      <div className="px-5 py-4 border-b border-base-200 shrink-0">
        <h3 className="text-base font-semibold text-base-content">
          Your Cart ({totalQuantity} {totalQuantity === 1 ? "item" : "items"})
        </h3>
      </div>
      <div className="overflow-y-auto px-4 py-3 flex-1 min-h-0">
        {items.map(item => (
          <CartDropdownItem key={item.id} item={item} />
        ))}
      </div>
      <div className="p-4 border-t border-base-200 bg-base-200/30 shrink-0 space-y-3">
        <div className="flex items-center justify-between gap-2">
          <span className="text-sm font-semibold text-base-content">Total</span>
          <span className="text-xl font-bold text-primary tabular-nums">{formatPrice(totalValue)}</span>
        </div>
        <Link to="/checkout" className="btn btn-secondary btn-block btn-sm rounded-xl">
          Checkout
        </Link>
      </div>
    </div>
  );
};

export default CartDropdown;
