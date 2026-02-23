import { BedDouble, Armchair, Zap, Tent, LayoutGrid } from "lucide-react";
import type { ReactNode } from "react";
import { Button, Card, Heading, Text } from "../../ui";
import categories from "../../dummy-data/categories.json";

export interface Category {
  categoryId: string;
  categoryName: string;
  categoryDescription: string;
  categorySlug: string;
}

const CATEGORY_ICONS: Record<string, ReactNode> = {
  "1": <BedDouble className="h-5 w-5 text-secondary" />,
  "2": <Armchair className="h-5 w-5 text-secondary" />,
  "3": <Zap className="h-5 w-5 text-secondary" />,
  "4": <Tent className="h-5 w-5 text-secondary" />,
  "5": <LayoutGrid className="h-5 w-5 text-secondary" />
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
          <Button
            key={category.categoryId}
            type="button"
            styleType="ghost"
            onClick={() => handleClick(category.categoryId)}
            className="w-full h-auto justify-start gap-3 rounded-xl bg-base-200 px-3 py-3 hover:bg-base-300 border-transparent hover:border-transparent"
          >
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-base-100 text-primary">
              {CATEGORY_ICONS[category.categoryId] ?? <LayoutGrid className="h-5 w-5 text-secondary" />}
            </div>
            <Text size="sm" weight="medium" className="text-base-content leading-snug">
              {category.categoryName}
            </Text>
          </Button>
        ))}
      </div>
    </Card>
  );
};

export default Categories;
