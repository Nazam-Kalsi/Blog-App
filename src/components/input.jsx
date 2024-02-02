import React, { useId } from "react";

const Input = React.forwardRef(
  (({ label, type = "text", className = "", ...props }, ref) => {
    const id = useId();
    return (
      <div className="w-full">
        {label && (
          <label className="inline-block pl-1 mb-1" htmlFor={id}>
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
