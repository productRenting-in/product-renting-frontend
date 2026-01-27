import { type ReactNode, useState } from "react";

interface AccordionItemProps {
  title: string;
  children: ReactNode;
  defaultOpen?: boolean;
  icon?: ReactNode;
  className?: string;
}

const AccordionItem = ({
  title,
  children,
  defaultOpen = false,
  icon,
  className = "",
}: AccordionItemProps) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className={`collapse collapse-arrow bg-base-200 ${className}`}>
      <input
        type="checkbox"
        checked={isOpen}
        onChange={(e) => setIsOpen(e.target.checked)}
      />
      <div className="collapse-title text-xl font-medium flex items-center gap-2">
        {icon && icon}
        {title}
      </div>
      <div className="collapse-content">{children}</div>
    </div>
  );
};

interface AccordionProps {
  children: ReactNode;
  className?: string;
  allowMultiple?: boolean;
}

const Accordion = ({
  children,
  className = "",
  allowMultiple = false,
}: AccordionProps) => {
  return (
    <div className={`join join-vertical w-full ${className}`}>
      {children}
    </div>
  );
};

export { Accordion, AccordionItem };

