import fs from 'fs/promises'; // Use promise-based fs for cleaner async handling
import path from 'path';
import { v2 } from '@google-cloud/translate';
const { Translate } = v2;

// Initialize Google Cloud Translate API client
const translateClient = new Translate({
  projectId: process.env.GOOGLE_PROJECT_ID,
  key: process.env.GOOGLE_API_KEY,
});

// Directory paths
const englishFilePath = path.resolve('./messages/en.json');
const middlewarePath = path.resolve('./src/middleware.ts');

/**
 * Reads a JSON file and parses its contents.
 * @param {string} filePath - The file path to read.
 * @returns {Promise<Object>} The parsed JSON object.
 */
async function readJsonFile(filePath) {
  const data = await fs.readFile(filePath, 'utf8');
  return JSON.parse(data);
}

/**
 * Writes a JSON object to a specified file path.
 * @param {string} filePath - The file path to write to.
 * @param {Object} content - The JSON content to write.
 * @returns {Promise<void>}
 */
async function writeJsonFile(filePath, content) {
  const jsonData = JSON.stringify(content, null, 2); // Format with 2 spaces
  await fs.writeFile(filePath, jsonData, 'utf8');
}

/**
 * Translates text to the target language.
 * @param {string} text - The text to translate.
 * @param {string} targetLanguage - The target language code (e.g., 'es').
 * @returns {Promise<string>} The translated text.
 */
async function translateText(text, targetLanguage) {
  if (targetLanguage === 'en') return text; // Skip translation for English
  const [translation] = await translateClient.translate(text, targetLanguage);
  return translation;
}

/**
 * Recursively translates content, handling nested objects.
 * Excludes specific keys and attributes (e.g., 'tag', 'href', 'locales').
 * @param {Object} content - The content to translate.
 * @param {string} targetLanguage - The target language code.
 * @returns {Promise<Object>} The translated content.
 */
async function translateNestedContent(content, targetLanguage) {
  const translatedContent = {};
  const skipTranslationKeys = new Set(['tag', 'href', 'locales', 'src']);

  for (const [key, value] of Object.entries(content)) {
    if (skipTranslationKeys.has(key)) {
      translatedContent[key] = value; // Copy as-is
    } else if (typeof value === 'string') {
      translatedContent[key] = await translateText(value, targetLanguage);
    } else if (Array.isArray(value)) {
      // Recursively handle arrays
      translatedContent[key] = await Promise.all(
        value.map(item => (typeof item === 'object' ? translateNestedContent(item, targetLanguage) : item))
      );
    } else if (typeof value === 'object' && value !== null) {
      // Recursively handle objects
      translatedContent[key] = await translateNestedContent(value, targetLanguage);
    } else {
      translatedContent[key] = value; // Copy other types as-is
    }
  }

  return translatedContent;
}

/**
 * Translates the content of an English JSON file into multiple languages.
 * @param {Object} content - The English content to translate.
 * @returns {Promise<Object>} An object containing translations for each language.
 */
async function translateContent(content) {
  const translations = { en: content };
  const supportedLanguages = Object.keys(content.locales || {}); // Dynamically get languages from locales object

  console.log(`Translating content to ${supportedLanguages.length - 1} locales...`);
  for (const lang of supportedLanguages) {
    if (lang === 'en') continue;
    console.log(`Translating content to ${lang}...`);
    translations[lang] = await translateNestedContent(content, lang);
    translations[lang].locales = content.locales; // Preserve locales
  }

  return translations;
}

/**
 * Updates the matcher and locales in src/middleware.ts with the latest locales.
 * @param {Array<string>} locales - The list of supported locales.
 * @returns {Promise<void>}
 */
async function updateMiddleware(locales) {
  const localesString = locales.map(locale => `'${locale}'`).join(', ');
  console.log(`Updating middleware locales constant to support languages: ${localesString}`);

  const localesRegex = /(export const locales = \[).*(\];)/;
  let middlewareContent = await fs.readFile(middlewarePath, 'utf8');

  middlewareContent = middlewareContent.replace(
    localesRegex,
    `$1${localesString}$2`
  );

  await fs.writeFile(middlewarePath, middlewareContent, 'utf8');
  console.log(`Updated middleware locales constant to support languages: ${localesString}`);
}

/**
 * Generates translations for the `en.json` file into all supported languages.
 * Saves each translation as a separate JSON file in the same directory.
 * @returns {Promise<void>}
 */
async function generateTranslations() {
  try {
    console.log('Generating Translations...');
    const englishContent = await readJsonFile(englishFilePath);
    const translations = await translateContent(englishContent);

    console.log(`Writing content to ${Object.keys(translations).length - 1} files...`);
    for (const lang in translations) {
      if (lang === 'en') continue;
      const outputFilePath = path.resolve(`./messages/${lang}.json`);
      await writeJsonFile(outputFilePath, translations[lang]);
    }

    console.log(`Generated ${Object.keys(translations).length - 1} Translations`);
    const locales = Object.keys(translations);
    await updateMiddleware(locales);
  } catch (error) {
    console.error('Error processing translations:', error);
  }
}

// Run the translation generation function
generateTranslations();
