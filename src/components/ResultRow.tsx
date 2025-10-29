import React from 'react';

type Props = {
  password: string;
  onCopy: () => Promise<void>;
  onRegenerate?: () => void;
  isCopied: boolean;
};

export default function ResultRow({ password, onCopy, onRegenerate, isCopied }: Props) {
  return (
    <div className="mt-4">
      <label className="block text-sm font-medium text-gray-700">Contraseña</label>
      <div className="mt-2 flex flex-col sm:flex-row gap-2">
        <input
          readOnly
          value={password}
          className="flex-1 p-2 rounded border bg-white dark:bg-gray-700 dark:text-gray-200"
          aria-label="Contraseña generada"
        />
        <button
          onClick={onCopy}
          className="px-4 py-2 rounded bg-indigo-600 text-white hover:bg-indigo-700 disabled:opacity-50 w-full sm:w-auto"
          aria-label="Copiar contraseña"
        >
          {isCopied ? 'Copiado ✅' : 'Copiar'}
        </button>
        {onRegenerate && (
          <button
            onClick={onRegenerate}
            className="px-4 py-2 rounded bg-gray-700 text-white hover:bg-gray-600 dark:bg-gray-700 dark:hover:bg-gray-600 w-full sm:w-auto"
            aria-label="Regenerar"
          >
            Regenerar
          </button>
        )}
      </div>
    </div>
  );
}
