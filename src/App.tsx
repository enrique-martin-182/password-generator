import React, { useState } from 'react';
import Controls from './components/Controls';
import ResultRow from './components/ResultRow';
import StrengthMeter from './components/StrengthMeter';
import { generatePassword } from './utils/generator';
import type { Options } from './utils/generator';

export default function App() {
  const [length, setLength] = useState<number>(16);
  const [options, setOptions] = useState<Options>({
    upper: true,
    lower: true,
    numbers: true,
    symbols: false
  });
  const [password, setPassword] = useState<string>('');
  const [toast, setToast] = useState<string | null>(null);

  const canGenerate = Object.values(options).some(Boolean);

  const gen = () => {
    if (!canGenerate) {
      setToast('Selecciona al menos una categoría.');
      setTimeout(() => setToast(null), 2500);
      return;
    }
    const p = generatePassword(length, options);
    setPassword(p);
  };

  const copy = async () => {
    if (!password) return;
    try {
      await navigator.clipboard.writeText(password);
      setToast('Copiado al portapapeles ✅');
    } catch {
      const ta = document.createElement('textarea');
      ta.value = password;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand('copy');
      ta.remove();
      setToast('Copiado al portapapeles (fallback) ✅');
    } finally {
      setTimeout(() => setToast(null), 2000);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <div className="max-w-xl w-full bg-white rounded-2xl shadow p-6">
        <h1 className="text-2xl font-bold mb-2">Generador de contraseñas</h1>
        <p className="text-sm text-gray-600 mb-4">
          Elige las opciones y pulsa <span className="font-medium">Generar</span>.
        </p>

        <Controls
          length={length}
          setLength={setLength}
          options={options}
          setOptions={setOptions}
          disabled={false}
        />

        <div className="mt-4 flex gap-2">
          <button
            onClick={gen}
            className={`flex-1 px-4 py-2 rounded ${canGenerate ? 'bg-indigo-600 text-white hover:bg-indigo-700' : 'bg-gray-200 cursor-not-allowed'}`}
          >
            Generar contraseña
          </button>
          <button
            onClick={() => {
              setPassword('');
              setToast(null);
            }}
            className="px-4 py-2 rounded bg-gray-100 hover:bg-gray-200"
          >
            Limpiar
          </button>
        </div>

        <ResultRow password={password} onCopy={copy} onRegenerate={gen} />

        <StrengthMeter password={password} length={length} options={options} />

        <div className="mt-4 text-xs text-gray-500">
          <div>Generación criptográficamente segura con <code>crypto.getRandomValues()</code>.</div>
          <div className="mt-1">Consejo: usa al menos 12 caracteres con mayúsculas, minúsculas y números.</div>
        </div>

        {toast && (
          <div className="fixed bottom-6 right-6 bg-black text-white px-4 py-2 rounded shadow">
            {toast}
          </div>
        )}
      </div>
    </div>
  );
}
