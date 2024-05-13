import React from 'react';

const InfoBox = ({ children, className }) => {
  // Kết hợp className được truyền vào với className mặc định
  const combinedClassName = `text-center bg-blue-100 p-4 rounded-lg border-4 border-blue-100`;

  return <div className={className || combinedClassName}>{children}</div>;
};

export default InfoBox;
