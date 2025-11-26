/**
 * Text validation utilities to detect spam and random text
 */

/**
 * Calculate text entropy (randomness measure)
 * Higher entropy = more random/gibberish
 */
function calculateEntropy(text) {
  const frequencies = {};
  for (const char of text.toLowerCase()) {
    if (/[a-z]/.test(char)) {
      frequencies[char] = (frequencies[char] || 0) + 1;
    }
  }

  const length = Object.values(frequencies).reduce((a, b) => a + b, 0);
  let entropy = 0;

  for (const count of Object.values(frequencies)) {
    const probability = count / length;
    entropy -= probability * Math.log2(probability);
  }

  return entropy;
}

/**
 * Check vowel to consonant ratio
 * Natural text has ~40% vowels
 */
function checkVowelRatio(text) {
  const vowels = text.toLowerCase().match(/[aeiou]/g) || [];
  const consonants = text.toLowerCase().match(/[bcdfghjklmnpqrstvwxyz]/g) || [];

  if (consonants.length === 0) return false;

  const ratio = vowels.length / (vowels.length + consonants.length);

  // Natural text has 30-50% vowels
  return ratio >= 0.25 && ratio <= 0.55;
}

/**
 * Check for excessive character repetition
 */
function hasExcessiveRepetition(text) {
  // Check for same character repeated 4+ times
  if (/(.)\1{3,}/i.test(text)) return true;

  // Check for same 2-char pattern repeated 3+ times
  if (/(.{2})\1{2,}/i.test(text)) return true;

  return false;
}

/**
 * Check if text contains at least some recognizable words
 * (has spaces and reasonable word lengths)
 */
function hasRecognizableStructure(text) {
  const words = text.trim().split(/\s+/);

  // Must have at least 2 words for meaningful text
  if (words.length < 2) return false;

  // Count single character words
  const singleCharWords = words.filter((word) => word.length === 1);

  // Reject if more than 40% are single characters (allow some single letters like "I" or "D")
  if (singleCharWords.length / words.length > 0.4) return false;

  // At least 50% of words should be 2-20 characters
  const validWords = words.filter((word) => word.length >= 2 && word.length <= 20);
  const validRatio = validWords.length / words.length;

  return validRatio >= 0.5;
}

/**
 * Check for keyboard mashing patterns (consecutive keys)
 */
function hasKeyboardMashing(text) {
  const keyboardRows = ["qwertyuiop", "asdfghjkl", "zxcvbnm", "1234567890"];

  const lowerText = text.toLowerCase();

  for (const row of keyboardRows) {
    // Check for 4+ consecutive keys in order
    for (let i = 0; i < row.length - 3; i++) {
      const pattern = row.substring(i, i + 4);
      if (
        lowerText.includes(pattern) ||
        lowerText.includes(pattern.split("").reverse().join(""))
      ) {
        return true;
      }
    }
  }

  return false;
}

/**
 * Check for single character spam
 */
function isSingleCharacterSpam(text) {
  const cleanText = text.replace(/[^a-zA-Z]/g, "").trim();

  // If all text is just one or two characters repeated
  if (cleanText.length <= 2) return true;

  // Check if text is just single characters with spaces like "s s s" or "a b c"
  const words = text.trim().split(/\s+/);
  if (words.every((word) => word.length === 1)) return true;

  return false;
}

/**
 * Main validation function
 * Returns { isValid: boolean, reason: string }
 */
export function validateTextQuality(text, minLength = 10, messages = {}) {
  const defaultMessages = {
    tooShort: `Text must be at least ${minLength} characters`,
    singleCharacters: "Please enter meaningful text, not single characters",
    meaningfulContent: "Text must contain meaningful content",
    randomKeyboard: "Text appears to be random keyboard input",
    tooMuchRepetition: "Text contains too much repetition",
    randomCharacters: "Text appears to be random characters",
    notNaturalLanguage: "Text does not appear to be natural language",
    recognizableWords: "Text must contain recognizable words",
  };

  const msg = { ...defaultMessages, ...messages };

  if (!text || text.length < minLength) {
    return {
      isValid: false,
      reason: msg.tooShort,
    };
  }

  // Check for single character spam first
  if (isSingleCharacterSpam(text)) {
    return {
      isValid: false,
      reason: msg.singleCharacters,
    };
  }

  // Remove extra spaces and special characters for checking
  const cleanText = text.replace(/[^a-zA-Z\s]/g, "").trim();

  if (cleanText.length < minLength / 2) {
    return { isValid: false, reason: msg.meaningfulContent };
  }

  // Check for keyboard mashing
  if (hasKeyboardMashing(cleanText)) {
    return { isValid: false, reason: msg.randomKeyboard };
  }

  // Check for excessive repetition
  if (hasExcessiveRepetition(cleanText)) {
    return { isValid: false, reason: msg.tooMuchRepetition };
  }

  // Check entropy (randomness)
  const entropy = calculateEntropy(cleanText);
  if (entropy > 4.3) {
    // Very high entropy = likely gibberish
    return { isValid: false, reason: msg.randomCharacters };
  }

  // Check vowel ratio
  if (!checkVowelRatio(cleanText)) {
    return { isValid: false, reason: msg.notNaturalLanguage };
  }

  // Check structure
  if (!hasRecognizableStructure(cleanText)) {
    return { isValid: false, reason: msg.recognizableWords };
  }

  return { isValid: true, reason: "" };
}

/**
 * Yup custom validation method
 */
export function yupTextQualityTest(
  message = "Text appears to be spam or gibberish",
  messages = {}
) {
  return function (value) {
    if (!value) return true; // Let required() handle empty values

    const result = validateTextQuality(value, 10, messages);

    if (!result.isValid) {
      return this.createError({ message: result.reason || message });
    }

    return true;
  };
}
