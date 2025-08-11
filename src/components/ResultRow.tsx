import React from 'react';

type Props = {
  password: string;
  onCopy: () => Promise<void>;
  onRegenerate?: () => void;
};

export default function ResultRow({ password, onCopy, onRegenerate }: Props) {
  return (
    <div className="mt-4">
      <label className="block text-sm font-medium text-gray-700">Contraseña</label>
      <div className="mt-2 flex gap-2">
        <input
          readOnly
          value={password}
          className="flex-1 p-2 rounded border bg-white"
          aria-label="Contraseña generada"
        />
        <button
          onClick={onCopy}
          className="px-4 py-2 rounded bg-indigo-600 text-white hover:bg-indigo-700 disabled:opacity-50"
          aria-label="Copiar contraseña"
        >
          Copiar
        </button>
        {onRegenerate && (
          <button
            onClick={onRegenerate}
            className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300"
            aria-label="Regenerar"
          >
            Regenerar
          </button>
        )}
      </div>
    </div>
  );
}
