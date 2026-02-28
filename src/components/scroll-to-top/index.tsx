import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";
import { Button } from "../../ui";

const SHOW_AFTER_PX = 300;

const ScrollToTop = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > SHOW_AFTER_PX);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <Button
      type="button"
      variant="secondary"
      onClick={scrollToTop}
      aria-label="Scroll to top"
      className={[
        "fixed bottom-5 right-4 z-50 h-11 w-11 rounded-full p-0 shadow-lg transition-all duration-300",
        visible ? "opacity-100 translate-y-0 pointer-events-auto" : "opacity-0 translate-y-4 pointer-events-none"
      ].join(" ")}
    >
      <ArrowUp className="h-5 w-5" />
    </Button>
  );
};

export default ScrollToTop;
