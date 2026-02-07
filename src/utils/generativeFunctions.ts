/**
 * Generative transformations and mathematical utility functions.
 * These functions are used to create complex symmetric patterns from simple input strings.
 */

/**
 * Creates a symmetric 8x8-like pattern from a 4-character input string.
 * Uses various axis symmetry functions (SAV, SAH, SAC) to populate the pattern.
 */
export function simmetrica(string: string) {
  const a = string.charAt(0);
  const b = string.charAt(1);
  const c = string.charAt(2);
  const d = string.charAt(3);

  // Constructing the complex string by combining symmetric variants of the base characters
  const r1 = a + b + sav(b) + sav(a) + a + b + sav(b) + sav(a);
  const r2 = c + d + sav(d) + sav(c) + c + d + sav(d) + sav(c);
  const r3 = sah(c) + sah(d) + sac(d) + sac(c) + sah(c) + sah(d) + sac(d) + sac(c);
  const r4 = sah(a) + sah(b) + sac(b) + sac(a) + sah(a) + sah(b) + sac(b) + sac(a);
  const r5 = a + b + sav(b) + sav(a) + a + b + sav(b) + sav(a);
  const r6 = c + d + sav(d) + sav(c) + c + d + sav(d) + sav(c);
  const r7 = sah(c) + sah(d) + sac(d) + sac(c) + sah(c) + sah(d) + sac(d) + sac(c);
  const r8 = sah(a) + sah(b) + sac(b) + sac(a) + sah(a) + sah(b) + sac(b) + sac(a);

  const newString = r1 + r2 + r3 + r4 + r5 + r6 + r7 + r8;

  return newString;
}

/**
 * Converts a decimal number to a string in a specific base (usually base 4).
 * Pads the resulting string with leading zeros to match the specified 'classe' length.
 * Used for generating the character codes for modules.
 * 
 * @param num The decimal number to convert
 * @param classe The fixed length of the output string
 */
export function toBase(num: number, classe: number) {
  const base = 4;
  let converted = num.toString(base);
  while (converted.length < classe) {
    converted = '0' + converted;
  }
  return converted;
}

/**
 * Splits a long string into an array of smaller string chunks of length 'l'.
 * Represents converting a flat string into a matrix-like row structure.
 */
export function matrix(string: string, l: number) {
  const array = [];
  for (let i = 0; i <= string.length / l; i += 1) {
    const riga = string.substring(i * l, i * l + l);
    if (riga) array.push(riga);
  }
  return array;
}

/**
 * SAV: Simmetria su Asse Verticale (Vertical Axis Symmetry).
 * Maps a character to its vertically mirrored counterpart.
 */
export function sav(letter: string) {
  let newLetter = 'z';

  // Mapping for Module 1 characters
  if (letter == '0') newLetter = '3';
  if (letter == '1') newLetter = '2';
  if (letter == '2') newLetter = '1';
  if (letter == '3') newLetter = '0';

  // Mapping for Module 2 characters
  if (letter == '4') newLetter = '5';
  if (letter == '5') newLetter = '4';

  return newLetter;
}

/**
 * SAH: Simmetria su Asse Orizzontale (Horizontal Axis Symmetry).
 * Maps a character to its horizontally mirrored counterpart.
 */
export function sah(letter: string) {
  let newLetter = 'z';

  // Mapping for Module 1 characters
  if (letter == '0') newLetter = '1';
  if (letter == '1') newLetter = '0';
  if (letter == '2') newLetter = '3';
  if (letter == '3') newLetter = '2';

  // Mapping for Module 2 characters
  if (letter == '4') newLetter = '5';
  if (letter == '5') newLetter = '4';

  return newLetter;
}

/**
 * SAC: Simmetria su Asse Centrale (Central / Point Symmetry).
 * Maps a character to its counterpart mirrored through the center point.
 */
export function sac(letter: string) {
  let newLetter = 'z';

  // Mapping for Module 1 characters
  if (letter == '0') newLetter = '2';
  if (letter == '1') newLetter = '3';
  if (letter == '2') newLetter = '0';
  if (letter == '3') newLetter = '1';

  // Mapping for Module 2 characters
  if (letter == '4') newLetter = '4';
  if (letter == '5') newLetter = '5';

  return newLetter;
}
