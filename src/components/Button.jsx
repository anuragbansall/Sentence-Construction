import React from "react";

function Button({ children, className, ...props }) {
  return (
    <button
      className={`px-4 py-2 border-1 border-zinc-300 rounded-md cursor-pointer hover:bg-zinc-100 transition duration-200 ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}

export default Button;
