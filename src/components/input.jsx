import React, { useId } from "react";

const Input = React.forwardRef(
  (({ label, type = "text", className = "", ...props }, ref) => {
    const id = useId();
    return (
      <div className="w-full">
        {label && (
          <label className="block pl-1 mb-1" htmlFor={id}>
            {label}
          </label>
        )}
        <input
          type={type}
          className={`w-full border border-zinc-700 rounded-md bg-white/10 py-1.5 pl-1 text-white placeholder:text-white/70 placeholder:text-sm focus:outline-0 focus:shadow-blue-600 focus:shadow-[0_0_0_2px] transition-all ${className}`}
          {...props}
          id={id}
          ref={ref}
        />
      </div>
    );
  })
);

export default Input;
