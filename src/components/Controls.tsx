import React from 'react';
import type { Options } from '../utils/generator';

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
        <label htmlFor="length" className="block text-sm font-medium text-gray-700">
          Longitud: <span className="font-semibold">{length}</span>
        </label>
        <input
          id="length"
          type="range"
          min={4}
          max={64}
          value={length}
          onChange={(e) => setLength(Number(e.target.value))}
          className="w-full mt-2"
          disabled={disabled}
        />
      </div>

      <fieldset className="border p-3 rounded">
        <legend className="text-sm font-medium">Incluir</legend>
        <div className="mt-2 grid grid-cols-2 gap-2">
          <label className="inline-flex items-center">
            <input
              type="checkbox"
              checked={options.upper}
              onChange={() => toggle('upper')}
              className="mr-2"
            />
            Mayúsculas
          </label>
          <label className="inline-flex items-center">
            <input
              type="checkbox"
              checked={options.lower}
              onChange={() => toggle('lower')}
              className="mr-2"
            />
            Minúsculas
          </label>
          <label className="inline-flex items-center">
            <input
              type="checkbox"
              checked={options.numbers}
              onChange={() => toggle('numbers')}
              className="mr-2"
            />
            Números
          </label>
          <label className="inline-flex items-center">
            <input
              type="checkbox"
              checked={options.symbols}
              onChange={() => toggle('symbols')}
              className="mr-2"
            />
            Símbolos
          </label>
        </div>
      </fieldset>
    </div>
  );
}
