import React from 'react';

type Props = React.InputHTMLAttributes<HTMLInputElement> & { label?: string };

export default function Input({ label, className = '', ...rest }: Props) {
  return (
    <label className={`block text-sm text-slate-700 ${className}`}>
      {label && <span className="block mb-1 font-medium">{label}</span>}
      <input className="form-control" {...rest} />
    </label>
  );
}
