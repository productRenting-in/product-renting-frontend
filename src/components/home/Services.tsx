import { PackageOpen, Sparkles, Wand2 } from "lucide-react";
import { Card, Heading, Text } from "../../ui";

const SERVICES = [
  {
    id: "rent",
    icon: PackageOpen,
    title: "Rent from Us",
    description:
      "Browse our wide catalogue of furniture, decor, appliances and more. Pick what you need, for as long as you need it — delivered to your door."
  },
  {
    id: "plan",
    icon: Sparkles,
    title: "Plan & Decorate",
    description:
      "Let us handle the look and feel of your event or space. From birthday setups to wedding mandaps, we plan, arrange and decorate everything for you."
  },
  {
    id: "customize",
    icon: Wand2,
    title: "Customize with Us",
    description:
      "Have a specific vision? We bring it to life. Share your ideas and our team will tailor every detail — themes, colours, props and layouts — just for you."
  }
];

const Services = () => {
  return (
    <section className="bg-base-200 py-8 md:py-14">
      <div className="mx-auto max-w-6xl px-4">
        <div className="mb-8 md:mb-10 text-center">
          <Heading level="h2" className="text-2xl sm:text-3xl md:text-4xl text-base-content">
            What We Offer
          </Heading>
          <Text size="sm" className="mt-3 text-base-content/60 sm:text-base">
            Everything you need for your home, event or celebration — in one place.
          </Text>
        </div>

        <div className="grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map(({ id, icon: Icon, title, description }) => (
            <Card
              key={id}
              shadow
              bordered={false}
              className="transition hover:shadow-xl"
              title={
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <Icon className="h-5 w-5" strokeWidth={1.8} />
                  </div>
                  <Text as="span" size="lg" weight="semibold" className="text-base-content">
                    {title}
                  </Text>
                </div>
              }
            >
              <Text size="sm" className="leading-relaxed text-base-content/65">
                {description}
              </Text>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
