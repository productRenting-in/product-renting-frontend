import { Link } from "react-router-dom";
import { Search, ShoppingCart, User2 } from "lucide-react";
import { Badge, Button, Input } from "../../ui";

const Navbar = () => {
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

          <div className="indicator">
            <Badge className="indicator-item badge-error badge-xs text-xs">1</Badge>
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

          <Button
            type="button"
            styleType="link"
            size="sm"
            className="px-1 text-base-100/90 no-underline hover:no-underline hover:bg-transparent min-h-0 h-auto"
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
