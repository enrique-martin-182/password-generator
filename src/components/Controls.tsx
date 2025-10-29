import React from 'react';
import type { Options } from '../utils/generator';
import Tooltip from './Tooltip';

type Props = {
  length: number;
  setLength: (n: number) => void;
  options: Options;
  setOptions: (o: Options) => void;
  disabled: boolean;
};

export default function Controls({ length, setLength, options, setOptions, disabled }: Props) {
  const toggle = (key: keyof Options) => {
    setOptions({ ...options, [key]: !options[key] });
  };

  return (
    <div className="space-y-4">
      <div>
        <label htmlFor="length" className="block text-sm font-medium text-gray-700 mb-2">
          Longitud: <span className="font-semibold text-blue-600">{length}</span>
        </label>
        <div className="relative flex items-center">
          <input
            id="length"
            type="range"
            min={4}
            max={64}
            value={length}
            onChange={(e) => setLength(Number(e.target.value))}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
            disabled={disabled}
          />
        </div>
      </div>

      <fieldset className="border p-3 rounded">
        <legend className="text-sm font-medium">Incluir</legend>
        <div className="mt-2 grid grid-cols-1 sm:grid-cols-2 gap-2">
          <label htmlFor="toggle-upper" className="flex items-center cursor-pointer">
            <div className="relative">
              <input
                type="checkbox"
                id="toggle-upper"
                className="sr-only"
                checked={options.upper}
                onChange={() => toggle('upper')}
              />
              <div className="block bg-gray-600 w-10 h-6 rounded-full"></div>
              <div className="dot absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition"></div>
            </div>
            <div className="ml-3 text-gray-900 dark:text-gray-300">Mayúsculas</div>
          </label>

          <label htmlFor="toggle-lower" className="flex items-center cursor-pointer">
            <div className="relative">
              <input
                type="checkbox"
                id="toggle-lower"
                className="sr-only"
                checked={options.lower}
                onChange={() => toggle('lower')}
              />
              <div className="block bg-gray-600 w-10 h-6 rounded-full"></div>
              <div className="dot absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition"></div>
            </div>
            <div className="ml-3 text-gray-900 dark:text-gray-300">Minúsculas</div>
          </label>

          <label htmlFor="toggle-numbers" className="flex items-center cursor-pointer">
            <div className="relative">
              <input
                type="checkbox"
                id="toggle-numbers"
                className="sr-only"
                checked={options.numbers}
                onChange={() => toggle('numbers')}
              />
              <div className="block bg-gray-600 w-10 h-6 rounded-full"></div>
              <div className="dot absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition"></div>
            </div>
            <div className="ml-3 text-gray-900 dark:text-gray-300">Números</div>
          </label>

          <label htmlFor="toggle-symbols" className="flex items-center cursor-pointer">
            <div className="relative">
              <input
                type="checkbox"
                id="toggle-symbols"
                className="sr-only"
                checked={options.symbols}
                onChange={() => toggle('symbols')}
              />
              <div className="block bg-gray-600 w-10 h-6 rounded-full"></div>
              <div className="dot absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition"></div>
            </div>
            <div className="ml-3 text-gray-900 dark:text-gray-300">Símbolos</div>
          </label>

          <label htmlFor="toggle-similar" className="flex items-center cursor-pointer">
            <div className="relative">
              <input
                type="checkbox"
                id="toggle-similar"
                className="sr-only"
                checked={options.excludeSimilar}
                onChange={() => toggle('excludeSimilar')}
              />
              <div className="block bg-gray-600 w-10 h-6 rounded-full"></div>
              <div className="dot absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition"></div>
            </div>
            <div className="ml-3 flex items-center gap-2 text-gray-900 dark:text-gray-300">
              Excluir similares
              <Tooltip text="Excluye caracteres ambiguos como i, l, 1, O, 0">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </Tooltip>
            </div>
          </label>
        </div>
      </fieldset>
    </div>
  );
}
