import React from 'react';

const ImageWithPath = React.memo(({ 
  category, 
  filename, 
  alt, 
  className = "",
  style,
  loading = "lazy",
  ...props 
}) => {
  const src = `${process.env.PUBLIC_URL}/images/${category}/${filename}`;
  
  return (
    <img
      src={src}
      alt={alt}
      className={className}
      style={style}
      loading={loading}
      {...props}
    />
  );
});

ImageWithPath.displayName = 'ImageWithPath';

export default ImageWithPath;