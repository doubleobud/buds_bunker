// src/components/SymbolTreeStub.jsx
import React from 'react';

export default function SymbolTreeStub({ self = 0.0 }) {
  return (
    <pre className="bg-[#f4f4f4] border border-gray-200 rounded-lg p-4 text-sm leading-6">
{`self (${self.toFixed(1)})
├─ mental    [fogged]
└─ physical  [fogged]`}
    </pre>
  );
}
