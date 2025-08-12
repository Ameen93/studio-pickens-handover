import React, { useState } from 'react';

const FAQItem = ({ question, answer, isOpen = false }) => {
  const [open, setOpen] = useState(isOpen);

  const toggleOpen = () => {
    setOpen(!open);
  };

  return (
    <div className="border-b border-studio-blue/10 py-6">
      <button
        onClick={toggleOpen}
        className="w-full flex items-center justify-between text-left focus:outline-none group"
      >
        <h3 className="font-proxima font-bold text-lg md:text-xl text-studio-blue tracking-studio uppercase pr-4 group-hover:text-studio-blue/80 transition-colors duration-300">
          {question}
        </h3>
        <div className="flex-shrink-0">
          <svg
            className={`w-6 h-6 text-studio-blue transition-transform duration-300 ${
              open ? 'rotate-180' : ''
            }`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </div>
      </button>

      <div
        className={`overflow-hidden transition-all duration-300 ${
          open ? 'max-h-96 opacity-100 mt-4' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="text-studio-blue/80 leading-relaxed text-base md:-mt-3">
          {answer}
        </div>
      </div>
    </div>
  );
};

export default FAQItem;