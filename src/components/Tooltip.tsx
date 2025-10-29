import React, { useState } from 'react';

type Props = {
  text: string;
  children: React.ReactNode;
};

export default function Tooltip({ text, children }: Props) {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <div
      className="relative flex items-center"
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}
    >
      {children}
      {isVisible && (
        <div className="absolute left-full ml-2 w-48 p-2 bg-gray-700 text-white text-xs rounded shadow-lg z-10">
          {text}
        </div>
      )}
    </div>
  );
}
