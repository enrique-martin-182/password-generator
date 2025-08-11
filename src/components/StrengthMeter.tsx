import React from 'react';
import { estimateEntropyBits } from '../utils/generator';
import type { Options } from '../utils/generator';
import zxcvbn from 'zxcvbn';

type Props = {
  password: string;
  length: number;
  options: Options;
};

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

  const score = zxcvbnResult ? zxcvbnResult.score : Math.min(4, Math.floor(entropy / 15));
  const feedbackText = zxcvbnResult?.feedback?.warning || zxcvbnResult?.feedback?.suggestions?.[0] || '';

  const labels = ['Muy débil', 'Débil', 'Mediana', 'Fuerte', 'Excelente'];
  const colors = ['bg-red-500', 'bg-orange-400', 'bg-yellow-400', 'bg-green-500', 'bg-indigo-600'];

  return (
    <div className="mt-4">
      <div className="flex items-center justify-between">
        <div className="text-sm font-medium">Robustez</div>
        <div aria-live="polite" className="text-sm text-gray-600">
          {password ? labels[score] : '—'}
        </div>
      </div>

      <div className="w-full h-3 bg-gray-200 rounded mt-2 overflow-hidden">
        <div
          className={`h-full ${colors[score]}`}
          style={{ width: password ? `${(score / 4) * 100}%` : '0%' }}
          aria-hidden
        />
      </div>

      <div className="mt-2 text-xs text-gray-600">
        <div>Entropía estimada: {Math.round(entropy)} bits</div>
        {feedbackText && <div className="mt-1 text-red-600">{feedbackText}</div>}
      </div>
    </div>
  );
}
