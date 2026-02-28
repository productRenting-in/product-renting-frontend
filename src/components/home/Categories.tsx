import { BedDouble, Armchair, Zap, Tent, LayoutGrid } from "lucide-react";
import type { ReactNode } from "react";
import { Button, Card, Heading, Loading, Text } from "../../ui";
import { useGetCategoriesQuery } from "../../app/api/categoriesApi";
import type { Category } from "../../types";

const CATEGORY_ICONS: Record<string, ReactNode> = {
  "1": <BedDouble className="h-5 w-5 text-secondary" />,
  "2": <Armchair className="h-5 w-5 text-secondary" />,
  "3": <Zap className="h-5 w-5 text-secondary" />,
  "4": <Tent className="h-5 w-5 text-secondary" />,
  "5": <LayoutGrid className="h-5 w-5 text-secondary" />
};

const Categories = () => {
  const { data: categories = [], isLoading, isError } = useGetCategoriesQuery();

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

      {isLoading && (
        <div className="flex justify-center py-6">
          <Loading variant="dots" size="md" text="Loading categories…" />
        </div>
      )}

      {isError && (
        <Text variant="error" size="sm">
          Failed to load categories.
        </Text>
      )}

      {!isLoading && !isError && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {categories.map((category: Category) => (
            <Button
              key={category.categoryId}
              type="button"
              styleType="ghost"
              onClick={() => handleClick(category.categoryId)}
              className="w-full h-auto justify-start gap-1.5 rounded-xl bg-base-200 px-2 py-2 hover:bg-base-300 border-transparent hover:border-transparent"
            >
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-base-100 text-primary">
                {CATEGORY_ICONS[category.categoryId] ?? <LayoutGrid className="h-5 w-5 text-secondary" />}
              </div>
              <Text size="sm" weight="medium" className="text-base-content leading-snug text-start pl-2">
                {category.categoryName}
              </Text>
            </Button>
          ))}
        </div>
      )}
    </Card>
  );
};

export default Categories;
