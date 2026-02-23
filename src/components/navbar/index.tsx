import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { Search, ShoppingCart, User2, X } from "lucide-react";
import { useAppSelector } from "../../app/hooks";
import CartDropdown from "../cart/CartDropdown";
import { Badge, Button, Input } from "../../ui";

const Navbar = () => {
  const cartQuantity = useAppSelector(state => state.cart.items.reduce((sum, item) => sum + item.quantity, 0));

  const [cartOpen, setCartOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const cartRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!cartOpen) return;
    const handler = (e: MouseEvent) => {
      if (cartRef.current && !cartRef.current.contains(e.target as Node)) {
        setCartOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [cartOpen]);

  useEffect(() => {
    document.body.style.overflow = cartOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [cartOpen]);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-secondary text-secondary-content shadow-sm">
      {/* Main bar */}
      <div className="mx-auto flex max-w-6xl items-center gap-3 px-4 h-14 md:h-16">
        {/* Logo */}
        <Link to="/" className="flex shrink-0 items-center gap-2.5">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-secondary-content/15 text-secondary-content font-bold text-sm select-none">
            LF
          </div>
          <div className="hidden sm:flex flex-col leading-tight">
            <span className="text-sm font-semibold text-secondary-content">Let's Function</span>
            <span className="text-[10px] text-secondary-content/60 leading-none">Rent · Plan · Celebrate</span>
          </div>
        </Link>

        {/* Search bar — desktop only inline */}
        <div className="hidden md:flex flex-1 justify-center">
          <div className="w-full max-w-lg">
            <Input
              type="text"
              placeholder="Search for services…"
              size="sm"
              variant="primary"
              className="rounded-full h-9 bg-base-100 text-base-content placeholder:text-base-content/50"
              leftIcon={<Search className="h-4 w-4 text-base-content/60" />}
              fullWidth
              bordered={false}
            />
          </div>
        </div>

        {/* Spacer on mobile */}
        <div className="flex-1 md:hidden" />

        {/* Actions */}
        <div className="flex items-center">
          {/* Mobile search toggle */}
          <Button
            type="button"
            styleType="ghost"
            aria-label={searchOpen ? "Close search" : "Search"}
            onClick={() => setSearchOpen(o => !o)}
            className="md:hidden h-9 w-9 p-0 rounded-full text-secondary-content/90 hover:bg-secondary-content/10"
          >
            {searchOpen ? <X className="h-5 w-5" /> : <Search className="h-5 w-5" />}
          </Button>

          {/* Cart */}
          <div ref={cartRef} className="relative">
            <Button
              type="button"
              styleType="ghost"
              aria-label="Cart"
              aria-expanded={cartOpen}
              onClick={() => setCartOpen(o => !o)}
              className="relative h-9 w-9 p-0 rounded-full text-secondary-content/90 hover:bg-secondary-content/10"
            >
              <ShoppingCart className="h-5 w-5" />
              {cartQuantity > 0 && (
                <Badge className="absolute -top-0.5 -right-0.5 badge-error badge-xs min-w-[18px] h-[18px] text-[10px] flex items-center justify-center p-0">
                  {cartQuantity > 99 ? "99+" : cartQuantity}
                </Badge>
              )}
            </Button>

            {cartOpen && (
              <>
                {/* Mobile: full-width panel fixed below navbar */}
                <div className="md:hidden fixed left-0 right-0 top-14 z-50 px-3 pt-2">
                  <CartDropdown onClose={() => setCartOpen(false)} />
                </div>
                {/* Desktop: anchored dropdown */}
                <div className="hidden md:block absolute right-0 top-full pt-2 z-50">
                  <CartDropdown onClose={() => setCartOpen(false)} />
                </div>
              </>
            )}
          </div>

          {/* Account */}
          <Link
            to="/login"
            aria-label="Account"
            className="flex h-9 w-9 items-center justify-center rounded-full text-secondary-content/90 hover:bg-secondary-content/10 transition-colors"
          >
            <User2 className="h-5 w-5" />
          </Link>
        </div>
      </div>

      {/* Mobile search bar — expands below main bar */}
      <div
        className={[
          "md:hidden overflow-hidden transition-all duration-200",
          searchOpen ? "max-h-16 border-t border-secondary-content/10" : "max-h-0"
        ].join(" ")}
      >
        <div className="px-4 py-2">
          <Input
            type="text"
            placeholder="Search for services…"
            size="sm"
            variant="primary"
            className="rounded-full h-9 bg-base-100 text-base-content placeholder:text-base-content/50"
            leftIcon={<Search className="h-4 w-4 text-base-content/60" />}
            fullWidth
            bordered={false}
            autoFocus={searchOpen}
          />
        </div>
      </div>
    </header>
  );
};

export default Navbar;
