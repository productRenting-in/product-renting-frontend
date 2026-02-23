import { BedDouble, Armchair, Zap, Tent, LayoutGrid } from "lucide-react";
import type { ReactNode } from "react";
import { Card, Text, Heading } from "../../ui";
import categories from "../../dummy-data/categories.json";

export interface Category {
  categoryId: string;
  categoryName: string;
  categoryDescription: string;
  categorySlug: string;
}

const CATEGORY_ICONS: Record<string, ReactNode> = {
  "1": <BedDouble className="h-5 w-5" />,
  "2": <Armchair className="h-5 w-5" />,
  "3": <Zap className="h-5 w-5" />,
  "4": <Tent className="h-5 w-5" />,
  "5": <LayoutGrid className="h-5 w-5" />
};

const Categories = () => {
  const handleClick = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <Card shadow="xl" bordered={false} className="h-full flex flex-col">
      <Heading level="h3" className="mb-4">
        What are you looking for?
      </Heading>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {categories.map((category: Category) => (
          <button
            key={category.categoryId}
            type="button"
            onClick={() => handleClick(category.categoryId)}
            className="flex items-center gap-3 rounded-xl bg-base-200 px-3 py-3 text-left transition-colors hover:bg-base-300 focus-visible:outline-none"
          >
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-base-100 text-primary">
              {CATEGORY_ICONS[category.categoryId] ?? <LayoutGrid className="h-5 w-5" />}
            </div>
            <Text size="sm" weight="medium" className="text-base-content leading-snug">
              {category.categoryName}
            </Text>
          </button>
        ))}
      </div>
    </Card>
  );
};

export default Categories;
