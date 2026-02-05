import { CalendarHeart, ReceiptIndianRupee, WandSparkles } from "lucide-react";
import { Card, Text, Heading } from "../../ui";

type Category = {
  id: string;
  label: string;
  description?: string;
  icon: React.ReactNode;
};

const categories: Category[] = [
  {
    id: "rent-products",
    label: "Rent from Us",
    icon: <ReceiptIndianRupee />
  },
  {
    id: "plan-decor",
    label: "Plan & Decorate",
    icon: <CalendarHeart />
  },
  {
    id: "customization",
    label: "Customize with Us",
    icon: <WandSparkles />
  }
];

const HeroCategories = () => {
  const handleClick = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <Card shadow="xl" bordered={true} title="" className="h-full flex flex-col">
      <Heading level="h3" className="mb-4">
        What are you looking for?
      </Heading>
      <div className="grid grid-cols-2 gap-4">
        {categories.map(category => (
          <button
            key={category.id}
            type="button"
            onClick={() => handleClick(category.id)}
            className="flex items-center gap-3 rounded-xl bg-base-200 px-3 py-3 text-left transition-colors hover:bg-base-300 focus-visible:outline-none"
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-base-100 text-2xl">
              <span aria-hidden>{category.icon}</span>
            </div>
            <Text size="sm" weight="medium" className="text-base-content">
              {category.label}
            </Text>
          </button>
        ))}
      </div>
    </Card>
  );
};

export default HeroCategories;
