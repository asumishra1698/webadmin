import React from 'react';

interface IconProps {
  name: string;
  className?: string;
  size?: number;
}

const Icon: React.FC<IconProps> = ({ name, className = '', size = 20 }) => {
  const importIcon = () => {
    try {
      return require(`../../assets/icons/${name}.png`).default;
    } catch (error) {
      console.warn(`Icon ${name} not found`);
      return null;
    }
  };

  const iconSrc = importIcon();

  if (!iconSrc) {
    return <div className={`w-5 h-5 ${className}`} />;
  }

  return (
    <img
      src={iconSrc}
      alt={name}
      className={`w-${size/4} h-${size/4} ${className}`}
      style={{ width: `${size}px`, height: `${size}px` }}
    />
  );
};

export default Icon;