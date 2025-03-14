const ALPHABET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const WEIGHTS = [
  10, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 23, 24, 25, 26, 27, 28, 29, 30,
  31, 32, 34, 35, 36, 37, 38,
];

export function calculateContainerCheckDigit(
  ownerCode: string,
  categoryIdentifier: string,
  serialNumber: string,
): number {
  const chars = ownerCode.concat(categoryIdentifier, serialNumber);
  let sum = 0;

  for (let i = 0; i < chars.length; i++) {
    if (i < 4) {
      // for ownerCode and categoryIdentifier
      const charIndex = ALPHABET.indexOf(chars[i]);
      if (charIndex !== -1) {
        const numericalValue = WEIGHTS[charIndex];
        sum += numericalValue * Math.pow(2, i);
      }
    } else {
      // for serialNumber
      sum += Number(chars[i]) * Math.pow(2, i);
    }
  }

  const checkDigit = sum % 11;
  return checkDigit === 10 ? 0 : checkDigit;
}

interface PrefixConfig {
  [key: number]: string;
}

export function generateContainerNumber(prefixConfig: PrefixConfig = {}): string {
  let prefix = '';
  
  // Generate prefix with fixed positions
  for (let i = 0; i < 4; i++) {
    if (prefixConfig[i] && ALPHABET.includes(prefixConfig[i])) {
      prefix += prefixConfig[i];
    } else {
      prefix += ALPHABET.charAt(Math.floor(Math.random() * ALPHABET.length));
    }
  }
  
  const ownerCode = prefix.slice(0, 3);
  const categoryIdentifier = prefix.slice(3, 4);
  const serialNumber = Math.floor(Math.random() * 1000000).toString().padStart(6, '0');
  
  const checkDigit = calculateContainerCheckDigit(ownerCode, categoryIdentifier, serialNumber);
  
  return `${prefix}${serialNumber}${checkDigit}`;
}

export function isValidContainerNumber(code: string): boolean {
  if (!/^[A-Z]{4}\d{7}$/.test(code)) {
    return false;
  }

  const ownerCode = code.slice(0, 3);
  const categoryIdentifier = code.slice(3, 4);
  const serialNumber = code.slice(4, 10);
  const checkDigit = Number(code.slice(10, 11));

  const calculatedCheckDigit = calculateContainerCheckDigit(
    ownerCode,
    categoryIdentifier,
    serialNumber,
  );

  return calculatedCheckDigit === checkDigit;
}