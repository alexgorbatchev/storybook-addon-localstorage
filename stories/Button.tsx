import React from 'react';
import './button.css';

type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  primary?: boolean;
  size: string;
  label: string;
};

export const Button = ({ primary, size, label, ...props }: Props) => {
  const mode = primary ? 'storybook-button--primary' : 'storybook-button--secondary';
  return (
    <button type="button" className={['storybook-button', `storybook-button--${size}`, mode].join(' ')} {...props}>
      {label}
    </button>
  );
};
