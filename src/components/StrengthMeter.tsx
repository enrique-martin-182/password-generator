import React from 'react';
import { estimateEntropyBits } from '../utils/generator';
import type { Options } from '../utils/generator';
import { zxcvbn, zxcvbnOptions } from '@zxcvbn-ts/core';
import * as zxcvbnCommonPackage from '@zxcvbn-ts/language-common';
import * as zxcvbnEsEsPackage from '@zxcvbn-ts/language-es-es';

type Props = {
  password: string;
  length: number;
  options: Options;
};

const options = {
  translations: zxcvbnEsEsPackage.translations,
  graphs: zxcvbnCommonPackage.adjacencyGraphs,
  dictionary: {
    ...zxcvbnCommonPackage.dictionary,
    ...zxcvbnEsEsPackage.dictionary,
  },
};

zxcvbnOptions.setOptions(options);

export default function StrengthMeter({ password, length, options }: Props) {
  const entropy = estimateEntropyBits(length, options);
  let zxcvbnResult: any = null;
  try {
    if (password) {
      zxcvbnResult = zxcvbn(password);
    }
  } catch (e) {
    zxcvbnResult = null;
  }

  const feedback = zxcvbnResult?.feedback;
  const crackTime = zxcvbnResult?.crack_times_display?.offline_fast_hashing_1e10_per_second;

  // Make the meter more demanding by adjusting the entropy divisor
  const score = zxcvbnResult ? zxcvbnResult.score : Math.min(4, Math.floor(entropy / 30));

  const labels = ['Muy débil', 'Débil', 'Mediana', 'Fuerte', 'Excelente'];
  const colors = ['bg-red-600', 'bg-orange-500', 'bg-amber-500', 'bg-green-500', 'bg-blue-600'];

  return (
    <div className="mt-4 space-y-2">
      <div className="flex items-center justify-between">
        <div className="text-sm font-medium">Robustez</div>
        <div aria-live="polite" className="text-sm font-semibold text-gray-800 dark:text-gray-200">
          {password ? labels[score] : '—'}
        </div>
      </div>

      <div className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded flex overflow-hidden">
        {[0, 1, 2, 3, 4].map((segmentIndex) => (
          <div
            key={segmentIndex}
            className={`h-full flex-1 transition-colors duration-300 ${score >= segmentIndex ? colors[segmentIndex] : 'bg-gray-300 dark:bg-gray-600'}`}
            aria-hidden
          />
        ))}
      </div>

      {password && (
        <div className="text-xs text-gray-600 dark:text-gray-400 space-y-2 pt-1">
          <div className="flex justify-between">
            <span>Tiempo de descifrado (offline):</span>
            <span className="font-medium text-gray-800 dark:text-gray-200">{crackTime}</span>
          </div>
          
          {/* Zxcvbn Feedback */}
          {feedback?.warning && (
            <div className="p-2 bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 rounded">
              <span className="font-bold">Advertencia:</span> {feedback.warning}
            </div>
          )}
          {feedback?.suggestions && feedback.suggestions.length > 0 && (
            <div className="p-2 bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-200 rounded space-y-1">
              <div className="font-bold">Sugerencias:</div>
              <ul className="list-disc list-inside">
                {feedback.suggestions.map((suggestion, i) => <li key={i}>{suggestion}</li>)}
              </ul>
            </div>
          )}

          {/* Custom Suggestions */}
          {score < 3 && (
            <div className="p-2 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-200 rounded space-y-1">
              <div className="font-bold">Consejos para mejorar:</div>
              <ul className="list-disc list-inside">
                {length < 12 && <li>Intenta usar al menos 12 caracteres.</li>}
                {!options.upper && <li>Incluye letras mayúsculas.</li>}
                {!options.lower && <li>Incluye letras minúsculas.</li>}
                {!options.numbers && <li>Incluye números.</li>}
                {!options.symbols && <li>Incluye símbolos para mayor robustez.</li>}
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
