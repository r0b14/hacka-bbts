import React from 'react';

export default function Logo({ size = 36 }: { size?: number }) {
  return (
    <div style={{ width: size }} className="font-display text-sky-700 font-bold">
      Revolux
    </div>
  );
}
