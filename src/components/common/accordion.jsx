import React, { useState } from "react";

const AccordionItem = ({id, title, children }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleAccordion = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="border-t-2 border-borderColor w-full py-10">
      <button
        className="flex justify-between items-center w-full gap-8 text-left focus:outline-none"
        onClick={toggleAccordion}
      >
        <div className="flex items-center gap-16">
          <span className="text-lg font-medium">{id}</span>
          <span className="text-2xl font-medium">{title}</span>
        </div>
        <span className="min-w-12">{isOpen ? <img src="minus.svg" alt="" /> : <img src="plus.svg" alt="" /> }</span>
      </button>
      {isOpen && <div className="text-base">{children}</div>}
    </div>
  );
};

export default AccordionItem;
