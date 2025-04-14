import React from "react";

function Button({ children, className, ...props }) {
  return (
    <button
      className={`px-4 py-2 border rounded-md cursor-pointer transition duration-200 ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}

export default Button;
