import { type ReactNode, useState } from "react";

export interface AccordionItemProps {
  id: string;
  title: ReactNode;
  children: ReactNode;
  defaultOpen?: boolean;
  className?: string;
}

export interface AccordionProps {
  items: AccordionItemProps[];
  className?: string;
}

export const Accordion = ({ items, className = "" }: AccordionProps) => {
  const [openId, setOpenId] = useState<string | null>(() => items.find(i => i.defaultOpen)?.id ?? null);

  return (
    <div className={`join join-vertical w-full ${className}`}>
      {items.map(item => {
        const isOpen = openId === item.id;
        return (
          <div
            key={item.id}
            className={`collapse collapse-arrow bg-base-100 ${isOpen ? "collapse-open" : "collapse-close"}`}
          >
            <input type="radio" name="ds-accordion" checked={isOpen} onChange={() => setOpenId(item.id)} />
            <div className="collapse-title text-base font-medium">{item.title}</div>
            <div className="collapse-content">{item.children}</div>
          </div>
        );
      })}
    </div>
  );
};
