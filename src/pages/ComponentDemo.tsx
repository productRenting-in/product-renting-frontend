import { useState } from "react";
import {
  Bell,
  Mail,
  AlertTriangle as AlertTriangleIcon,
  CheckCircle2 as CheckCircleIcon,
  Home,
  User,
  Settings,
  ShoppingCart,
  Star
} from "lucide-react";
import {
  Button,
  Badge,
  Input,
  Toggle,
  Checkbox,
  Radio,
  Alert,
  Text,
  Heading,
  Modal,
  Card,
  Select,
  Tabs,
  TabList,
  Tab,
  TabPanel,
  Accordion,
  AccordionItem,
  Pagination,
  Breadcrumbs,
  Progress,
  Loading,
  Tooltip,
  Avatar,
  AvatarGroup,
  Divider,
  Table,
  Textarea,
  Range,
  FileInput,
  Rating,
  Stats,
  Stat,
  Drawer,
  Toast,
  ToastContainer,
  Skeleton,
  Carousel,
} from "../ui";

const ComponentDemo = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [progressValue, setProgressValue] = useState(65);
  const [ratingValue, setRatingValue] = useState(4);
  const [toasts, setToasts] = useState<
    Array<{ id: number; message: string; variant: "info" | "success" | "warning" | "error" }>
  >([]);

  const showToast = (message: string, variant: "info" | "success" | "warning" | "error") => {
    const id = Date.now();
    setToasts([...toasts, { id, message, variant }]);
    setTimeout(() => {
      setToasts(toasts.filter((t) => t.id !== id));
    }, 3000);
  };

  const tableData = [
    { id: 1, name: "John Doe", email: "john@example.com", role: "Admin" },
    { id: 2, name: "Jane Smith", email: "jane@example.com", role: "User" },
    { id: 3, name: "Bob Johnson", email: "bob@example.com", role: "User" },
  ];

  const tableColumns = [
    { key: "id", header: "ID" },
    { key: "name", header: "Name" },
    { key: "email", header: "Email" },
    { key: "role", header: "Role" },
  ];

  return (
    <div className="container mx-auto p-6 space-y-12">
      <Heading level="h1">UI Component Library</Heading>
      <Text>Complete set of production-ready components built with DaisyUI</Text>

      {/* Breadcrumbs */}
      <section className="space-y-4">
        <Heading level="h2">Breadcrumbs</Heading>
        <Breadcrumbs
          items={[
            { label: "Home", href: "/", icon: <Home className="h-4 w-4" /> },
            { label: "Components", icon: <Settings className="h-4 w-4" /> },
            { label: "Demo" },
          ]}
        />
      </section>

      {/* Buttons Section */}
      <section className="space-y-4">
        <Heading level="h2">Buttons</Heading>
        <div className="space-y-4">
          <div className="flex flex-wrap gap-2">
            <Button variant="primary" icon={<Bell className="h-4 w-4" />}>
              Primary
            </Button>
            <Button variant="secondary" icon={<Mail className="h-4 w-4" />}>
              Secondary
            </Button>
            <Button variant="accent">Accent</Button>
            <Button variant="success">Success</Button>
            <Button variant="warning">Warning</Button>
            <Button variant="error">Error</Button>
            <Button buttonType="outline" variant="primary">
              Outline
            </Button>
            <Button buttonType="ghost" variant="primary">
              Ghost
            </Button>
            <Button loading variant="primary">
              Loading
            </Button>
          </div>
        </div>
      </section>

      {/* Badges */}
      <section className="space-y-4">
        <Heading level="h2">Badges</Heading>
        <div className="flex flex-wrap gap-2">
          <Badge variant="primary" icon={<Star className="h-3 w-3" />}>
            Primary
          </Badge>
          <Badge variant="success">Success</Badge>
          <Badge variant="warning">Warning</Badge>
          <Badge variant="error">Error</Badge>
          <Badge variant="info">Info</Badge>
          <Badge outline variant="primary">
            Outline
          </Badge>
        </div>
      </section>

      {/* Form Inputs */}
      <section className="space-y-4">
        <Heading level="h2">Form Inputs</Heading>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            label="Email"
            placeholder="email@example.com"
            type="email"
            bordered
            leftIcon={<Mail className="h-4 w-4" />}
          />
          <Input
            label="Password"
            type="password"
            placeholder="Enter password"
            bordered
            helperText="Must be at least 8 characters"
          />
          <Select
            label="Country"
            placeholder="Select a country"
            options={[
              { value: "us", label: "United States" },
              { value: "uk", label: "United Kingdom" },
              { value: "in", label: "India" },
            ]}
            bordered
          />
          <Textarea
            label="Message"
            placeholder="Enter your message"
            bordered
            rows={4}
          />
          <Range
            label="Volume"
            min={0}
            max={100}
            value={progressValue}
            onChange={(e) => setProgressValue(Number(e.target.value))}
            showValue
          />
          <FileInput label="Upload File" bordered />
        </div>
      </section>

      {/* Toggles, Checkboxes, Radio */}
      <section className="space-y-4">
        <Heading level="h2">Toggles, Checkboxes & Radio</Heading>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <Text weight="semibold" className="mb-2">
              Toggles
            </Text>
            <div className="space-y-2">
              <Toggle variant="primary" label="Enable notifications" defaultChecked />
              <Toggle variant="success" label="Auto-save" />
              <Toggle variant="warning" label="Beta features" />
            </div>
          </div>
          <div>
            <Text weight="semibold" className="mb-2">
              Checkboxes
            </Text>
            <div className="space-y-2">
              <Checkbox variant="primary" label="Terms & Conditions" />
              <Checkbox variant="success" label="Newsletter" defaultChecked />
              <Checkbox variant="info" label="Marketing emails" />
            </div>
          </div>
          <div>
            <Text weight="semibold" className="mb-2">
              Radio Buttons
            </Text>
            <div className="space-y-2">
              <Radio
                name="plan"
                value="basic"
                variant="primary"
                label="Basic Plan"
                defaultChecked
              />
              <Radio name="plan" value="pro" variant="primary" label="Pro Plan" />
              <Radio name="plan" value="enterprise" variant="primary" label="Enterprise" />
            </div>
          </div>
        </div>
      </section>

      {/* Tabs */}
      <section className="space-y-4">
        <Heading level="h2">Tabs</Heading>
        <Tabs defaultValue="tab1">
          <TabList>
            <Tab value="tab1" icon={<Home className="h-4 w-4" />}>
              Home
            </Tab>
            <Tab value="tab2" icon={<User className="h-4 w-4" />}>
              Profile
            </Tab>
            <Tab value="tab3" icon={<Settings className="h-4 w-4" />}>
              Settings
            </Tab>
          </TabList>
          <TabPanel value="tab1">
            <Text>This is the home tab content.</Text>
          </TabPanel>
          <TabPanel value="tab2">
            <Text>This is the profile tab content.</Text>
          </TabPanel>
          <TabPanel value="tab3">
            <Text>This is the settings tab content.</Text>
          </TabPanel>
        </Tabs>
      </section>

      {/* Accordion */}
      <section className="space-y-4">
        <Heading level="h2">Accordion</Heading>
        <Accordion>
          <AccordionItem
            title="What is DaisyUI?"
            icon={<Star className="h-4 w-4" />}
            defaultOpen
          >
            <Text>
              DaisyUI is a component library for Tailwind CSS. It provides
              beautiful, accessible components.
            </Text>
          </AccordionItem>
          <AccordionItem title="How to use it?">
            <Text>
              Simply install DaisyUI and start using the components in your
              project.
            </Text>
          </AccordionItem>
          <AccordionItem title="Is it free?">
            <Text>Yes, DaisyUI is completely free and open source.</Text>
          </AccordionItem>
        </Accordion>
      </section>

      {/* Alerts */}
      <section className="space-y-4">
        <Heading level="h2">Alerts</Heading>
        <div className="space-y-4">
          <Alert
            variant="info"
            icon={<AlertTriangleIcon className="h-5 w-5" />}
            action={<Button size="sm">View</Button>}
          >
            4 New Messages
          </Alert>
          <Alert
            variant="success"
            icon={<CheckCircleIcon className="h-5 w-5" />}
            action={<Button size="sm">View</Button>}
          >
            Order confirmed successfully!
          </Alert>
          <Alert variant="warning">Your subscription expires in 3 days.</Alert>
          <Alert variant="error" onClose={() => alert("Closed")}>
            Payment failed. Please try again.
          </Alert>
        </div>
      </section>

      {/* Progress */}
      <section className="space-y-4">
        <Heading level="h2">Progress</Heading>
        <div className="space-y-4">
          <Progress value={75} variant="primary" label="Upload Progress" showValue />
          <Progress value={50} variant="success" label="Download Progress" />
          <Progress value={25} variant="warning" />
          <Progress value={90} variant="error" />
        </div>
      </section>

      {/* Loading */}
      <section className="space-y-4">
        <Heading level="h2">Loading</Heading>
        <div className="flex flex-wrap gap-8">
          <Loading type="spinner" size="lg" text="Loading..." />
          <Loading type="dots" size="md" />
          <Loading type="ring" size="sm" />
          <Loading type="ball" />
          <Loading type="bars" />
          <Loading type="infinity" />
        </div>
      </section>

      {/* Rating */}
      <section className="space-y-4">
        <Heading level="h2">Rating</Heading>
        <div className="space-y-4">
          <div>
            <Text className="mb-2">Interactive Rating</Text>
            <Rating
              value={ratingValue}
              onChange={setRatingValue}
              showValue
            />
          </div>
          <div>
            <Text className="mb-2">Read-only Rating</Text>
            <Rating value={4.5} readonly showValue />
          </div>
        </div>
      </section>

      {/* Avatar */}
      <section className="space-y-4">
        <Heading level="h2">Avatar</Heading>
        <div className="flex items-center gap-4">
          <Avatar
            src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
            alt="User"
            size="lg"
            status="online"
          />
          <Avatar placeholder="JD" size="md" status="away" />
          <Avatar placeholder="AB" size="sm" status="offline" />
          <AvatarGroup>
            <Avatar
              src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
              size="sm"
            />
            <Avatar placeholder="JD" size="sm" />
            <Avatar placeholder="AB" size="sm" />
          </AvatarGroup>
        </div>
      </section>

      {/* Tooltip */}
      <section className="space-y-4">
        <Heading level="h2">Tooltip</Heading>
        <div className="flex flex-wrap gap-4">
          <Tooltip content="This is a tooltip" position="top">
            <Button>Hover me (Top)</Button>
          </Tooltip>
          <Tooltip content="Bottom tooltip" position="bottom">
            <Button>Hover me (Bottom)</Button>
          </Tooltip>
          <Tooltip content="Left tooltip" position="left">
            <Button>Hover me (Left)</Button>
          </Tooltip>
          <Tooltip content="Right tooltip" position="right">
            <Button>Hover me (Right)</Button>
          </Tooltip>
        </div>
      </section>

      {/* Divider */}
      <section className="space-y-4">
        <Heading level="h2">Divider</Heading>
        <Divider />
        <Divider text="OR" />
        <Divider text="Continue with" position="start" />
        <Divider variant="primary" />
        <Divider variant="accent" text="Section" />
      </section>

      {/* Table */}
      <section className="space-y-4">
        <Heading level="h2">Table</Heading>
        <Table
          columns={tableColumns}
          data={tableData}
          striped
          hover
        />
      </section>

      {/* Stats */}
      <section className="space-y-4">
        <Heading level="h2">Stats</Heading>
        <Stats horizontal>
          <Stat
            title="Total Users"
            value="12,345"
            desc="↗︎ 400 (22%)"
            icon={<User className="h-8 w-8" />}
          />
          <Stat
            title="Revenue"
            value="₹45,678"
            desc="↗︎ 400 (22%)"
            icon={<ShoppingCart className="h-8 w-8" />}
          />
          <Stat
            title="Orders"
            value="1,234"
            desc="↘︎ 90 (14%)"
            icon={<Bell className="h-8 w-8" />}
          />
        </Stats>
      </section>

      {/* Cards */}
      <section className="space-y-4">
        <Heading level="h2">Cards</Heading>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card
            title="Card Title"
            shadow="xl"
            actions={<Button variant="primary">Action</Button>}
          >
            <Text>This is a card with a title and action button.</Text>
          </Card>
          <Card
            image="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
            imageAlt="Shoes"
            title="Product Card"
            shadow="xl"
            actions={<Button variant="primary">Buy Now</Button>}
          >
            <Text>Product description goes here.</Text>
          </Card>
          <Card bordered shadow="lg" title="Bordered Card">
            <Text>This card has a border instead of shadow.</Text>
          </Card>
        </div>
      </section>

      {/* Skeleton */}
      <section className="space-y-4">
        <Heading level="h2">Skeleton</Heading>
        <div className="space-y-4">
          <div className="flex gap-4">
            <Skeleton variant="circle" width={64} height={64} />
            <div className="flex-1 space-y-2">
              <Skeleton height={20} />
              <Skeleton height={20} width="80%" />
            </div>
          </div>
          <Skeleton variant="rect" height={200} />
        </div>
      </section>

      {/* Carousel */}
      <section className="space-y-4">
        <Heading level="h2">Carousel</Heading>
        <Carousel
          autoPlay
          interval={3000}
          showIndicators
          showArrows
          className="w-full h-64"
        >
          <div className="bg-primary text-primary-content flex items-center justify-center h-full">
            <Text size="2xl" weight="bold">
              Slide 1
            </Text>
          </div>
          <div className="bg-secondary text-secondary-content flex items-center justify-center h-full">
            <Text size="2xl" weight="bold">
              Slide 2
            </Text>
          </div>
          <div className="bg-accent text-accent-content flex items-center justify-center h-full">
            <Text size="2xl" weight="bold">
              Slide 3
            </Text>
          </div>
        </Carousel>
      </section>

      {/* Pagination */}
      <section className="space-y-4">
        <Heading level="h2">Pagination</Heading>
        <Pagination
          currentPage={currentPage}
          totalPages={10}
          onPageChange={setCurrentPage}
          showFirstLast
        />
      </section>

      {/* Modal */}
      <section className="space-y-4">
        <Heading level="h2">Modal</Heading>
        <Button variant="primary" onClick={() => setIsModalOpen(true)}>
          Open Modal
        </Button>
        <Modal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          title="Modal Title"
          footer={
            <>
              <Button variant="ghost" onClick={() => setIsModalOpen(false)}>
                Cancel
              </Button>
              <Button variant="primary" onClick={() => setIsModalOpen(false)}>
                Confirm
              </Button>
            </>
          }
        >
          <Text>This is a modal dialog. You can put any content here.</Text>
        </Modal>
      </section>

      {/* Drawer */}
      <section className="space-y-4">
        <Heading level="h2">Drawer</Heading>
        <Button variant="primary" onClick={() => setIsDrawerOpen(true)}>
          Open Drawer
        </Button>
        <Drawer
          isOpen={isDrawerOpen}
          onClose={() => setIsDrawerOpen(false)}
          title="Navigation Menu"
          side="right"
        >
          <ul className="menu p-4 w-80">
            <li>
              <a>Home</a>
            </li>
            <li>
              <a>About</a>
            </li>
            <li>
              <a>Contact</a>
            </li>
          </ul>
        </Drawer>
      </section>

      {/* Toast */}
      <section className="space-y-4">
        <Heading level="h2">Toast</Heading>
        <div className="flex flex-wrap gap-2">
          <Button
            variant="info"
            onClick={() => showToast("Info message", "info")}
          >
            Show Info Toast
          </Button>
          <Button
            variant="success"
            onClick={() => showToast("Success message", "success")}
          >
            Show Success Toast
          </Button>
          <Button
            variant="warning"
            onClick={() => showToast("Warning message", "warning")}
          >
            Show Warning Toast
          </Button>
          <Button
            variant="error"
            onClick={() => showToast("Error message", "error")}
          >
            Show Error Toast
          </Button>
        </div>
        <ToastContainer position="top-right">
          {toasts.map((toast) => (
            <Toast
              key={toast.id}
              message={toast.message}
              variant={toast.variant}
              onClose={() =>
                setToasts(toasts.filter((t) => t.id !== toast.id))
              }
            />
          ))}
        </ToastContainer>
      </section>
    </div>
  );
};

export default ComponentDemo;
