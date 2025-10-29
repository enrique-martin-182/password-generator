export type Options = {
  upper: boolean;
  lower: boolean;
  numbers: boolean;
  symbols: boolean;
  excludeSimilar: boolean;
};

const UPPER = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const LOWER = 'abcdefghijklmnopqrstuvwxyz';
const NUMBERS = '0123456789';
const SYMBOLS = '!@#$%^&*()-_=+[]{};:,.<>/?~`';
const SIMILAR_CHARS = /[il1IoO0]/g;

function getCharset(options: Options) {
  let sets: string[] = [];
  let upper = UPPER;
  let lower = LOWER;
  let numbers = NUMBERS;

  if (options.excludeSimilar) {
    upper = upper.replace(SIMILAR_CHARS, '');
    lower = lower.replace(SIMILAR_CHARS, '');
    numbers = numbers.replace(SIMILAR_CHARS, '');
  }

  if (options.upper) sets.push(upper);
  if (options.lower) sets.push(lower);
  if (options.numbers) sets.push(numbers);
  if (options.symbols) sets.push(SYMBOLS);
  return sets;
}

function randomInt(max: number) {
  const array = new Uint32Array(1);
  crypto.getRandomValues(array);
  return array[0] % max;
}

export function generatePassword(length: number, options: Options): string {
  const sets = getCharset(options);
  if (sets.length === 0) return '';

  // Ensure inclusion when possible
  const mustInclude: string[] = [];
  for (const s of sets) {
    mustInclude.push(s[randomInt(s.length)]);
  }

  const combined = sets.join('');
  const result: string[] = [];

  for (const ch of mustInclude) result.push(ch);

  for (let i = result.length; i < length; i++) {
    result.push(combined[randomInt(combined.length)]);
  }

  // Shuffle
  for (let i = result.length - 1; i > 0; i--) {
    const j = randomInt(i + 1);
    [result[i], result[j]] = [result[j], result[i]];
  }

  return result.join('');
}

export function estimateEntropyBits(length: number, options: Options): number {
  const sets = getCharset(options);
  const charsetSize = sets.reduce((acc, s) => acc + s.length, 0);
  if (charsetSize === 0) return 0;
  return length * Math.log2(charsetSize);
}
