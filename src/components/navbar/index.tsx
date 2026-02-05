import { Link } from "react-router-dom";
import { Search, ShoppingCart, User2 } from "lucide-react";
import { useAppSelector } from "../../app/hooks";
import CartDropdown from "../cart/CartDropdown";
import { Badge, Button, Input } from "../../ui";

const Navbar = () => {
  const cartQuantity = useAppSelector(state => state.cart.items.reduce((sum, item) => sum + item.quantity, 0));

  return (
    <header className="sticky top-0 z-50 border-b border-secondary/20 bg-secondary text-secondary-content backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center gap-4 px-4 py-4">
        <Link to="/" className="flex items-center gap-2">
          <div className="hidden sm:flex flex-col leading-tight">
            <span className="text-sm font-semibold text-secondary-content">Let's</span>
            <span className="text-xs text-secondary-content/70">Function</span>
          </div>
        </Link>

        <div className="flex-1 flex justify-center">
          <div className="w-full max-w-lg">
            <Input
              type="text"
              placeholder="Search for services"
              size="sm"
              variant="primary"
              className="rounded-full h-9 bg-base-100 text-base-content placeholder:text-secondary/70"
              leftIcon={<Search className="h-4 w-4 text-base-content/60" />}
              fullWidth
              bordered={false}
            />
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Button
            type="button"
            styleType="link"
            size="sm"
            className="md:hidden px-1 text-base-100/90 no-underline hover:no-underline hover:bg-transparent min-h-0 h-auto"
            aria-label="Search"
          >
            <Search className="h-5 w-5" />
          </Button>

          <div className="relative group py-2">
            <div className="indicator inline-block">
              {cartQuantity > 0 && (
                <Badge className="indicator-item badge-error badge-xs text-xs">
                  {cartQuantity > 99 ? "99+" : cartQuantity}
                </Badge>
              )}
              <Button
                type="button"
                styleType="link"
                size="sm"
                className="px-1 text-base-100/90 no-underline hover:no-underline hover:bg-transparent min-h-0 h-auto"
                aria-label="Cart"
              >
                <ShoppingCart className="h-5 w-5" />
              </Button>
            </div>
            <div className="absolute right-0 top-full pt-1 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-opacity duration-150 pointer-events-none group-hover:pointer-events-auto">
              <CartDropdown />
            </div>
          </div>

          <Link to="/login">
            <Button
              type="button"
              styleType="link"
              size="sm"
              className="px-1 text-base-100/90 no-underline hover:no-underline hover:bg-transparent min-h-0 h-auto"
              aria-label="Account"
            >
              <User2 className="h-5 w-5" />
            </Button>
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
