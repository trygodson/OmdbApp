import React from 'react';
import { ImSpinner2 } from 'react-icons/im';

const CustomButton = ({ type, className, children, clickHandler, disabled, loading }) => {
  return (
    <button
      disabled={disabled}
      type={type ?? 'button'}
      onClick={clickHandler}
      className={`py-4 text-sm px-12 rounded bg-primary disabled:!bg-primary/70 text-white font-medium ${className}`}
    >
      <div className="flex gap-3 items-center justify-center">
        {loading && (
          <span className="mr-1">
            <ImSpinner2 size={18} className="animate-spin" />
          </span>
        )}
        {children}
      </div>
    </button>
  );
};

export default CustomButton;
