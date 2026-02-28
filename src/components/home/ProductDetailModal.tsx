import { Minus, Plus, X } from "lucide-react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { addToCart, removeFromCart, setQuantity } from "../../app/slices/cartSlice";
import { Badge, Button, Modal, Text } from "../../ui";
import type { ProductItem } from "./ProductCard";

const formatPrice = (amount: number) =>
  new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(amount);

const getItemId = (item: ProductItem) => item.productId ?? item.productName.toLowerCase().replace(/\s+/g, "-");

const getImageSrc = (item: ProductItem) =>
  item.imageSrc ?? `https://picsum.photos/seed/product-${item.productId}/400/300`;

interface ProductDetailModalProps {
  item: ProductItem | null;
  onClose: () => void;
}

const PricingCell = ({ label, price, highlight }: { label: string; price: number | null; highlight?: boolean }) => (
  <div
    className={`rounded-xl p-3 text-center transition-colors ${
      price ? (highlight ? "bg-secondary/10 ring-1 ring-secondary/20" : "bg-base-200") : "bg-base-200 opacity-40"
    }`}
  >
    <Text size="xs" className="text-base-content/50 mb-1 block">
      {label}
    </Text>
    <Text weight="bold" className="text-base-content tabular-nums">
      {price ? formatPrice(price) : "—"}
    </Text>
  </div>
);

const ProductDetailModal = ({ item, onClose }: ProductDetailModalProps) => {
  const dispatch = useAppDispatch();

  const id = item ? getItemId(item) : "";
  const imageSrc = item ? getImageSrc(item) : "";
  const cartQuantity = useAppSelector(state => state.cart.items.find(i => i.id === id)?.quantity) ?? 0;

  if (!item) return null;

  const description = item.productDescription || "Rent this item for your occasion.";
  const showCategory = item.category && !/^\d+$/.test(item.category.trim());

  return (
    <Modal isOpen={!!item} onClose={onClose} size="lg" closeOnBackdrop className="p-0! overflow-hidden rounded-2xl">
      <div className="flex flex-col sm:flex-row">
        {/* Left — image panel: fixed aspect on mobile, stretches to match right on desktop */}
        <div className="sm:w-5/12 shrink-0 bg-base-200 overflow-hidden">
          <img
            src={imageSrc}
            alt={item.productName}
            className="h-52 sm:h-full w-full object-cover"
            style={{ minHeight: "200px" }}
          />
        </div>

        {/* Right — scrollable panel with sticky footer */}
        <div className="flex-1 flex flex-col overflow-y-auto" style={{ maxHeight: "75vh" }}>
          {/* Content — natural height, no flex-1 so no dead space */}
          <div className="px-6 pt-5 pb-4">
            {/* Name + close button */}
            <div className="flex items-center justify-between gap-3 mb-2">
              <h3 className="text-xl font-bold text-base-content leading-tight">{item.productName}</h3>
              <button
                type="button"
                onClick={onClose}
                className="btn btn-sm btn-circle btn-ghost shrink-0"
                aria-label="Close"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {showCategory && (
              <Badge variant="secondary" size="sm" outline className="mb-4">
                {item.category}
              </Badge>
            )}

            {/* Description */}
            <Text size="sm" className="text-base-content/70 leading-relaxed">
              {description}
            </Text>

            {/* Pricing table */}
            <div className="mt-5">
              <Text size="xs" weight="semibold" className="text-base-content/40 uppercase tracking-widest mb-3 block">
                Rental Pricing
              </Text>
              <div className="grid grid-cols-3 gap-2">
                <PricingCell label="Per Day" price={item.pricePerDay} />
                <PricingCell label="Per Week" price={item.pricePerWeek} highlight />
                <PricingCell label="Per Month" price={item.pricePerMonth} highlight />
              </div>
            </div>
          </div>

          {/* Footer — sticky inside the scrollable right panel */}
          <div className="sticky bottom-0 mt-auto px-6 py-4 border-t border-base-200 bg-base-100 flex items-center justify-between gap-4">
            <div className="min-w-0">
              <Text size="xs" className="text-base-content/40 block leading-none mb-0.5">
                Starting from
              </Text>
              <span className="font-bold text-lg text-secondary tabular-nums">
                {formatPrice(item.pricePerDay)}
                <span className="text-xs font-normal text-base-content/50 ml-0.5">/day</span>
              </span>
            </div>

            {cartQuantity > 0 ? (
              <div className="flex items-center gap-2 shrink-0">
                <Button
                  type="button"
                  variant="secondary"
                  size="sm"
                  aria-label="Decrease quantity"
                  onClick={() => {
                    if (cartQuantity <= 1) dispatch(removeFromCart(id));
                    else dispatch(setQuantity({ id, quantity: cartQuantity - 1 }));
                  }}
                  className="h-9 w-9 p-0 rounded-full"
                >
                  <Minus className="h-4 w-4" />
                </Button>
                <span className="min-w-8 text-center font-bold tabular-nums text-base-content" aria-live="polite">
                  {cartQuantity}
                </span>
                <Button
                  type="button"
                  variant="secondary"
                  size="sm"
                  aria-label="Increase quantity"
                  onClick={() => dispatch(setQuantity({ id, quantity: cartQuantity + 1 }))}
                  className="h-9 w-9 p-0 rounded-full"
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            ) : (
              <Button
                type="button"
                variant="secondary"
                onClick={() => dispatch(addToCart({ ...item, imageSrc }))}
                className="rounded-xl shrink-0"
              >
                Add to Cart
              </Button>
            )}
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default ProductDetailModal;
