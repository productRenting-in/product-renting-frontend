import { Link } from "react-router-dom";
import {
  Search,
  ShoppingBag,
  ShoppingCart,
  User2,
} from "lucide-react";
import { Button, Input, Badge } from "../../ui";

const Navbar = () => {
  return (
    <header className="sticky top-0 z-50 border-b border-base-200 bg-base-100/95 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center gap-4 px-4 py-2">
        {/* Brand */}
        <Link to="/" className="flex items-center gap-2">
          <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-neutral text-neutral-content">
            <ShoppingBag className="h-5 w-5" />
          </span>
          <div className="hidden sm:flex flex-col leading-tight">
            <span className="text-sm font-semibold text-base-content">
              Native
            </span>
            <span className="text-xs text-base-content/60">Services</span>
          </div>
        </Link>

        <Input
          type="text"
          placeholder="Search for services"
          size="sm"
          variant="neutral"
          bordered
          className="rounded-full h-9 bg-base-100"
          leftIcon={<Search className="h-4 w-4 text-base-content/60" />}
          fullWidth
        />

        <div className="ml-auto flex items-center gap-2">

          <Button
            type="button"
            buttonType="ghost"
            size="sm"
            className="btn-circle md:hidden"
            aria-label="Search"
          >
            <Search className="h-5 w-5" />
          </Button>

          {/* Cart with badge */}
          <div className="indicator">
            <Badge className="indicator-item badge-error badge-xs text-xs">
              1
            </Badge>
            <Button
              type="button"
              buttonType="ghost"
              className="btn-circle"
              aria-label="Cart"
            >
              <ShoppingCart className="h-5 w-5" />
            </Button>
          </div>

          <Button
            type="button"
            buttonType="ghost"
            className="btn-circle"
            aria-label="Account"
          >
            <User2 className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;

