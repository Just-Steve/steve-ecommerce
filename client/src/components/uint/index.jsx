import React from 'react';

export const Card = ({ children, className = "" }) => (
  <div className={`bg-white rounded shadow p-4 ${className}`}>
    {children}
  </div>
);

export const CardContent = ({ children, className = "" }) => (
  <div className={`p-4 ${className}`}>
    {children}
  </div>
);

export const Button = ({ children, className = "", ...props }) => (
  <button className={`px-4 py-2 rounded shadow ${className}`} {...props}>
    {children}
  </button>
);

export const Input = ({ className = "", ...props }) => (
  <input className={`border rounded p-2 ${className}`} {...props} />
);

export const Select = ({ className = "", children, ...props }) => (
  <select className={`border rounded p-2 ${className}`} {...props}>
    {children}
  </select>
);

export const Label = ({ children, className = "", ...props }) => (
  <label className={`block text-sm font-medium ${className}`} {...props}>
    {children}
  </label>
);
