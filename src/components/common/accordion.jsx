import React, { useState } from "react";

const AccordionItem = ({id, title, children }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleAccordion = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="border-b border-gray-200 w-full">
      <button
        className="flex justify-between items-center w-full py-4 text-left focus:outline-none"
        onClick={toggleAccordion}
      >
        <div className="flex gap-7">
          <span className="text-lg font-medium">{id}</span>
          <span className="text-lg font-medium">{title}</span>
        </div>
        <span className="min-w-12">{isOpen ? <img src="minus.svg" alt="" /> : <img src="plus.svg" alt="" /> }</span>
      </button>
      {isOpen && <div className="p-4 text-gray-700">{children}</div>}
    </div>
  );
};

export default AccordionItem;
