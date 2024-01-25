import React, { useId } from "react";

function Select({ label, options, className = "", ...props },ref) {
  let id = useId();
  return (
    <div>
      {label && <label htmlFor={id} className=''>{label}</label>}
      <select id={id} className={`block w-full mt-1 ${className}`} ref={ref}>
        {
           options?. options.map((option)=>{
                <option key={option} value={option} >{option}</option>
            })
        }
      </select>
    </div>
  );
}

export default React.forwardRef(Select);
