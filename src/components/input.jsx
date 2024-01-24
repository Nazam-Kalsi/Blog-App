import React, { useId } from "react";

const Input = React.forwardRef(
  (Input = ({ label, type = "text", className = "", ...props }, ref) => {
    const id = useId();
    return (
      <div className="w-full">
        {label && (
          <label className="mb-1 pl-1 inline-block" htmlFor={id}>
            {label}
          </label>
        )}
        <input
          type={type}
          className={` ${className}`}
          {...props}
          id={id}
          ref={ref}
        />
      </div>
    );
  })
);

export default Input;
