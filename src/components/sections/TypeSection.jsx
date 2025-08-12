import React from 'react';

const TypeSection = ({ title, children }) => {
  return (
    <section className="space-y-8">
      <h2 className="text-sub-lg md:text-sub-lg sm:text-sub-lg-mobile font-proxima-wide text-studio-orange uppercase">
        {title}
      </h2>
      <div className="space-y-6">
        {children}
      </div>
    </section>
  );
};

export default TypeSection;