import { useState } from "react";
import {
  Button,
  Badge,
  Input,
  Loading,
  Heading,
  Text,
  Checkbox,
  Toggle,
  Radio,
  Progress,
  Select,
  Avatar,
  Modal,
  Accordion,
  Card,
  Divider,
  Tooltip,
  Textarea,
  Toast,
  Pagination,
  Breadcrumbs,
  Carousel,
  Table
} from "../ui";

const VARIANTS = ["neutral", "primary", "secondary", "accent", "info", "success", "warning", "error"] as const;

const SIZES = ["xs", "sm", "md", "lg"] as const;

const TOOLTIP_POSITIONS = [
  "top",
  "bottom",
  "left",
  "right",
  "top-start",
  "top-end",
  "bottom-start",
  "bottom-end"
] as const;

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mb-12">
      <Heading level="h2" className="mb-6 border-b border-base-300 pb-2">
        {title}
      </Heading>
      {children}
    </section>
  );
}

function SubSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="mb-8">
      <Heading level="h3" className="mb-4 text-2xl">
        {title}
      </Heading>
      {children}
    </div>
  );
}

export default function ComponentDemo() {
  const [modalOpen, setModalOpen] = useState(false);
  const [modalSize, setModalSize] = useState<"sm" | "md" | "lg" | "full">("md");
  const [paginationPage, setPaginationPage] = useState(1);
  const [radioValue, setRadioValue] = useState("a");

  return (
    <div className="container mx-auto max-w-6xl px-4 py-10">
      <Heading level="h1" className="mb-2">
        UI Component Demo
      </Heading>
      <Text size="lg" className="text-base-content/70 mb-10">
        Every size and variant of the design system components.
      </Text>

      <Section title="Button">
        <SubSection title="Variants (solid)">
          <div className="flex flex-wrap gap-2">
            {VARIANTS.map(v => (
              <Button key={v} variant={v}>
                {v}
              </Button>
            ))}
          </div>
        </SubSection>
        <SubSection title="Style types">
          <div className="flex flex-wrap gap-2">
            <Button styleType="solid" variant="primary">
              Solid
            </Button>
            <Button styleType="outline" variant="primary">
              Outline
            </Button>
            <Button styleType="ghost" variant="primary">
              Ghost
            </Button>
            <Button styleType="link" variant="primary">
              Link
            </Button>
          </div>
        </SubSection>
        <SubSection title="Sizes">
          <div className="flex flex-wrap items-center gap-3">
            {SIZES.map(s => (
              <Button key={s} size={s} variant="primary">
                {s}
              </Button>
            ))}
          </div>
        </SubSection>
        <SubSection title="States">
          <div className="flex flex-wrap gap-2">
            <Button variant="primary" loading>
              Loading
            </Button>
            <Button variant="primary" disabled>
              Disabled
            </Button>
          </div>
        </SubSection>
      </Section>

      <Section title="Badge">
        <SubSection title="Variants">
          <div className="flex flex-wrap gap-2">
            {VARIANTS.map(v => (
              <Badge key={v} variant={v}>
                {v}
              </Badge>
            ))}
            <Badge variant="ghost">ghost</Badge>
          </div>
        </SubSection>
        <SubSection title="Outline">
          <div className="flex flex-wrap gap-2">
            {VARIANTS.slice(0, 4).map(v => (
              <Badge key={v} variant={v} outline>
                {v} outline
              </Badge>
            ))}
          </div>
        </SubSection>
        <SubSection title="Sizes">
          <div className="flex flex-wrap items-center gap-3">
            {SIZES.map(s => (
              <Badge key={s} size={s} variant="primary">
                {s}
              </Badge>
            ))}
          </div>
        </SubSection>
      </Section>

      <Section title="Input">
        <SubSection title="Sizes">
          <div className="flex flex-col gap-3 max-w-xs">
            {SIZES.map(s => (
              <Input key={s} size={s} placeholder={`Size ${s}`} label={`Label ${s}`} />
            ))}
          </div>
        </SubSection>
        <SubSection title="Variants">
          <div className="flex flex-col gap-3 max-w-xs">
            {VARIANTS.slice(0, 4).map(v => (
              <Input key={v} variant={v} placeholder={v} label={v} />
            ))}
          </div>
        </SubSection>
        <SubSection title="States">
          <div className="flex flex-col gap-3 max-w-xs">
            <Input label="With helper" helperText="Helper text here" />
            <Input label="Error" error="This field has an error" />
          </div>
        </SubSection>
      </Section>

      <Section title="Loading">
        <SubSection title="Variants">
          <div className="flex flex-wrap gap-6">
            {["spinner", "dots", "ring", "ball", "bars", "infinity"].map(v => (
              <div key={v} className="flex flex-col items-center gap-1">
                <Loading variant={v as "spinner" | "dots" | "ring" | "ball" | "bars" | "infinity"} />
                <Text size="xs">{v}</Text>
              </div>
            ))}
          </div>
        </SubSection>
        <SubSection title="Sizes">
          <div className="flex flex-wrap items-center gap-6">
            {SIZES.map(s => (
              <Loading key={s} size={s} variant="spinner" />
            ))}
          </div>
        </SubSection>
        <SubSection title="With text">
          <Loading variant="spinner" text="Loading..." />
        </SubSection>
      </Section>

      <Section title="Heading">
        <SubSection title="Levels">
          <div className="flex flex-col gap-1">
            {(["h1", "h2", "h3", "h4", "h5", "h6"] as const).map(level => (
              <Heading key={level} level={level}>
                Heading {level}
              </Heading>
            ))}
          </div>
        </SubSection>
        <SubSection title="Variants">
          <div className="flex flex-wrap gap-4">
            {VARIANTS.map(v => (
              <Heading key={v} level="h3" variant={v}>
                {v}
              </Heading>
            ))}
          </div>
        </SubSection>
      </Section>

      <Section title="Text">
        <SubSection title="Sizes">
          <div className="flex flex-col gap-1">
            {(["xs", "sm", "base", "lg", "xl", "2xl", "3xl"] as const).map(s => (
              <Text key={s} size={s}>
                Text size {s}
              </Text>
            ))}
          </div>
        </SubSection>
        <SubSection title="Weights">
          <div className="flex flex-col gap-1">
            {(["light", "normal", "medium", "semibold", "bold"] as const).map(w => (
              <Text key={w} weight={w}>
                Weight {w}
              </Text>
            ))}
          </div>
        </SubSection>
        <SubSection title="Variants">
          <div className="flex flex-wrap gap-3">
            {VARIANTS.map(v => (
              <Text key={v} variant={v}>
                {v}
              </Text>
            ))}
          </div>
        </SubSection>
      </Section>

      <Section title="Checkbox">
        <SubSection title="Variants">
          <div className="flex flex-wrap gap-6">
            {VARIANTS.map(v => (
              <Checkbox key={v} variant={v} label={v} defaultChecked />
            ))}
          </div>
        </SubSection>
        <SubSection title="Sizes">
          <div className="flex flex-wrap items-center gap-6">
            {SIZES.map(s => (
              <Checkbox key={s} size={s} variant="primary" label={s} />
            ))}
          </div>
        </SubSection>
      </Section>

      <Section title="Toggle">
        <SubSection title="Variants">
          <div className="flex flex-wrap gap-6">
            {VARIANTS.map(v => (
              <Toggle key={v} variant={v} label={v} defaultChecked />
            ))}
          </div>
        </SubSection>
        <SubSection title="Sizes">
          <div className="flex flex-wrap items-center gap-6">
            {SIZES.map(s => (
              <Toggle key={s} size={s} variant="primary" label={s} />
            ))}
          </div>
        </SubSection>
      </Section>

      <Section title="Radio">
        <SubSection title="Variants">
          <div className="flex flex-wrap gap-6">
            {VARIANTS.map(v => (
              <Radio key={v} variant={v} name={`radio-${v}`} value={v} label={v} />
            ))}
          </div>
        </SubSection>
        <SubSection title="Sizes (grouped)">
          <div className="flex flex-wrap gap-6">
            {SIZES.map(s => (
              <Radio
                key={s}
                size={s}
                variant="primary"
                name="size-group"
                value={s}
                label={s}
                checked={radioValue === s}
                onChange={() => setRadioValue(s)}
              />
            ))}
          </div>
        </SubSection>
      </Section>

      <Section title="Progress">
        <SubSection title="Variants">
          <div className="flex flex-col gap-4 max-w-md">
            {VARIANTS.map(v => (
              <Progress key={v} variant={v} value={60} label={v} showValue />
            ))}
          </div>
        </SubSection>
      </Section>

      <Section title="Select">
        <SubSection title="Sizes">
          <div className="flex flex-col gap-3 max-w-xs">
            {SIZES.map(s => (
              <Select
                key={s}
                size={s}
                label={`Size ${s}`}
                options={[
                  { value: "1", label: "Option 1" },
                  { value: "2", label: "Option 2" }
                ]}
              />
            ))}
          </div>
        </SubSection>
        <SubSection title="Variants">
          <div className="flex flex-col gap-3 max-w-xs">
            {VARIANTS.slice(0, 4).map(v => (
              <Select
                key={v}
                variant={v}
                label={v}
                options={[
                  { value: "1", label: "Option 1" },
                  { value: "2", label: "Option 2" }
                ]}
              />
            ))}
          </div>
        </SubSection>
      </Section>

      <Section title="Avatar">
        <SubSection title="Sizes">
          <div className="flex flex-wrap items-end gap-4">
            {(["xs", "sm", "md", "lg"] as const).map(s => (
              <Avatar key={s} size={s} fallback={s.toUpperCase()} />
            ))}
          </div>
        </SubSection>
        <SubSection title="Status">
          <div className="flex flex-wrap gap-4">
            <Avatar size="md" status="online" fallback="ON" />
            <Avatar size="md" status="offline" fallback="OFF" />
            <Avatar size="md" status="away" fallback="AW" />
          </div>
        </SubSection>
      </Section>

      <Section title="Modal">
        <SubSection title="Sizes">
          <div className="flex flex-wrap gap-2">
            {(["sm", "md", "lg", "full"] as const).map(s => (
              <Button
                key={s}
                variant="primary"
                onClick={() => {
                  setModalSize(s);
                  setModalOpen(true);
                }}
              >
                Open {s}
              </Button>
            ))}
          </div>
        </SubSection>
        <Modal
          isOpen={modalOpen}
          onClose={() => setModalOpen(false)}
          title={`Modal ${modalSize}`}
          size={modalSize}
          footer={
            <Button variant="primary" onClick={() => setModalOpen(false)}>
              Close
            </Button>
          }
        >
          <Text>Modal content. Size: {modalSize}.</Text>
        </Modal>
      </Section>

      <Section title="Accordion">
        <div className="max-w-xl">
          <Accordion
            items={[
              {
                id: "a1",
                title: "Item 1",
                children: "Content for item 1."
              },
              {
                id: "a2",
                title: "Item 2",
                children: "Content for item 2.",
                defaultOpen: true
              },
              {
                id: "a3",
                title: "Item 3",
                children: "Content for item 3."
              }
            ]}
          />
        </div>
      </Section>

      <Section title="Card">
        <SubSection title="Options">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card title="Default" shadow>
              <Text size="sm">With title and shadow.</Text>
            </Card>
            <Card title="Compact" compact shadow>
              <Text size="sm">Compact body.</Text>
            </Card>
            <Card title="Bordered" bordered>
              <Text size="sm">Bordered, no shadow.</Text>
            </Card>
          </div>
        </SubSection>
        <SubSection title="With image and actions">
          <div className="max-w-sm">
            <Card
              title="Card with image"
              imageSrc="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
              imageAlt="Shoes"
              actions={
                <Button size="sm" variant="primary">
                  Action
                </Button>
              }
            >
              <Text size="sm">Description here.</Text>
            </Card>
          </div>
        </SubSection>
      </Section>

      <Section title="Divider">
        <SubSection title="Colors">
          <div className="flex flex-col gap-4">
            {(["neutral", "primary", "secondary", "accent", "success", "warning", "info", "error"] as const).map(c => (
              <div key={c}>
                <Text size="sm" className="mb-1">
                  {c}
                </Text>
                <Divider color={c} />
              </div>
            ))}
          </div>
        </SubSection>
        <SubSection title="Alignment">
          <div className="flex flex-col gap-4">
            <Divider align="start">Start</Divider>
            <Divider align="center">Center</Divider>
            <Divider align="end">End</Divider>
          </div>
        </SubSection>
        <SubSection title="Vertical">
          <div className="flex gap-4 h-20 items-center">
            <span>Left</span>
            <Divider vertical />
            <span>Right</span>
          </div>
        </SubSection>
      </Section>

      <Section title="Tooltip">
        <SubSection title="Positions">
          <div className="flex flex-wrap gap-4 p-8">
            {TOOLTIP_POSITIONS.map(pos => (
              <Tooltip key={pos} content={`Tooltip ${pos}`} position={pos}>
                <Button size="sm" variant="neutral">
                  {pos}
                </Button>
              </Tooltip>
            ))}
          </div>
        </SubSection>
      </Section>

      <Section title="Textarea">
        <SubSection title="Sizes">
          <div className="flex flex-col gap-3 max-w-md">
            {SIZES.map(s => (
              <Textarea key={s} size={s} placeholder={`Size ${s}`} label={`Label ${s}`} rows={2} />
            ))}
          </div>
        </SubSection>
        <SubSection title="Variants">
          <div className="flex flex-col gap-3 max-w-md">
            {VARIANTS.slice(0, 3).map(v => (
              <Textarea key={v} variant={v} label={v} placeholder={v} rows={2} />
            ))}
          </div>
        </SubSection>
      </Section>

      <Section title="Toast">
        <SubSection title="Variants">
          <div className="flex flex-wrap gap-2">
            {(["info", "success", "warning", "error"] as const).map(v => (
              <Toast key={v} variant={v} message={`Toast ${v}`} duration={0} onClose={undefined} />
            ))}
          </div>
        </SubSection>
      </Section>

      <Section title="Pagination">
        <Pagination currentPage={paginationPage} totalPages={10} onPageChange={setPaginationPage} showFirstLast />
      </Section>

      <Section title="Breadcrumbs">
        <Breadcrumbs items={[{ label: "Home", href: "#" }, { label: "Products", href: "#" }, { label: "Current" }]} />
      </Section>

      <Section title="Carousel">
        <SubSection title="Snap (center), full width items">
          <Carousel snap="center" className="w-full max-w-2xl" showIndicators>
            <Carousel.Item className="w-full">
              <img
                src="https://img.daisyui.com/images/stock/photo-1559703248-dcaaec9fab78.webp"
                alt="Slide 1"
                className="w-full object-cover"
              />
            </Carousel.Item>
            <Carousel.Item className="w-full">
              <img
                src="https://img.daisyui.com/images/stock/photo-1565098772267-60af42b81ef2.webp"
                alt="Slide 2"
                className="w-full object-cover"
              />
            </Carousel.Item>
            <Carousel.Item className="w-full">
              <img
                src="https://img.daisyui.com/images/stock/photo-1572635148818-ef6fd45eb394.webp"
                alt="Slide 3"
                className="w-full object-cover"
              />
            </Carousel.Item>
          </Carousel>
        </SubSection>
        <SubSection title="With arrows">
          <Carousel snap="center" className="w-full max-w-2xl" showArrows showIndicators>
            <Carousel.Item className="w-full">
              <img
                src="https://img.daisyui.com/images/stock/photo-1559703248-dcaaec9fab78.webp"
                alt="1"
                className="w-full object-cover"
              />
            </Carousel.Item>
            <Carousel.Item className="w-full">
              <img
                src="https://img.daisyui.com/images/stock/photo-1565098772267-60af42b81ef2.webp"
                alt="2"
                className="w-full object-cover"
              />
            </Carousel.Item>
          </Carousel>
        </SubSection>
      </Section>

      <Section title="Table">
        <SubSection title="Sizes">
          <div className="space-y-6">
            {SIZES.map(size => (
              <div key={size}>
                <Text size="sm" className="mb-2">
                  Size: {size}
                </Text>
                <Table
                  size={size}
                  columns={[
                    { key: "name", header: "Name" },
                    { key: "role", header: "Role" }
                  ]}
                  data={[
                    { name: "Alice", role: "Admin" },
                    { name: "Bob", role: "User" }
                  ]}
                />
              </div>
            ))}
          </div>
        </SubSection>
        <SubSection title="Striped & hover">
          <Table
            striped
            hover
            columns={[
              { key: "name", header: "Name" },
              { key: "role", header: "Role" }
            ]}
            data={[
              { name: "Alice", role: "Admin" },
              { name: "Bob", role: "User" }
            ]}
          />
        </SubSection>
      </Section>
    </div>
  );
}
