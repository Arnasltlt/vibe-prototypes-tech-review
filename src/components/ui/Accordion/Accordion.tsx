import React, { useState, ReactNode } from 'react';

interface AccordionProps {
  title: string;
  defaultOpen?: boolean;
  children: ReactNode;
}

export const Accordion: React.FC<AccordionProps> = ({ title, defaultOpen = false, children }) => {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <div className="border border-gray-200 rounded-lg overflow-hidden">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="w-full flex justify-between items-center px-4 py-3 bg-gray-50 hover:bg-gray-100"
      >
        <span className="text-sm font-semibold text-gray-800">{title}</span>
        <span className="text-gray-500 text-xl leading-none">{open ? '−' : '+'}</span>
      </button>
      {open && <div className="p-4 bg-white">{children}</div>}
    </div>
  );
}; 