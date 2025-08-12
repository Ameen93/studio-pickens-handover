import React from 'react';

const TypeExample = ({ element, className, children, description, variant = "text" }) => {
  const Component = element || 'div';
  
  return (
    <div className="border-l-4 border-studio-orange pl-6">
      <Component className={className}>
        {children}
      </Component>
      <p className="text-small md:text-small sm:text-small-mobile font-proxima text-studio-blue/60 mt-2">
        {description}
      </p>
    </div>
  );
};

export default TypeExample;