import { generatePassword, estimateEntropyBits } from '../../src/utils/generator';

describe('generatePassword', () => {
  test('returns empty string if no charset selected', () => {
    const p = generatePassword(10, { upper: false, lower: false, numbers: false, symbols: false });
    expect(p).toBe('');
  });

  test('generates correct length', () => {
    const p = generatePassword(12, { upper: true, lower: true, numbers: true, symbols: false });
    expect(p.length).toBe(12);
  });

  test('includes at least one of each selected type', () => {
    const p = generatePassword(8, { upper: true, lower: true, numbers: true, symbols: true });
    const hasUpper = /[A-Z]/.test(p);
    const hasLower = /[a-z]/.test(p);
    const hasNum = /[0-9]/.test(p);
    const hasSym = /[!@#\$%\^&\*()\-_=+\[\]{};:,.<>/?~`]/.test(p);
    expect(hasUpper).toBe(true);
    expect(hasLower).toBe(true);
    expect(hasNum).toBe(true);
    expect(hasSym).toBe(true);
  });
});

describe('estimateEntropyBits', () => {
  test('returns 0 if no charset', () => {
    expect(estimateEntropyBits(10, { upper: false, lower: false, numbers: false, symbols: false })).toBe(0);
  });

  test('returns positive entropy for charset', () => {
    const e = estimateEntropyBits(12, { upper: true, lower: true, numbers: true, symbols: false });
    expect(e).toBeGreaterThan(0);
  });
});
