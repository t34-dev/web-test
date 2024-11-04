import fs from "fs/promises";
import path from "path";
import axios from "axios";
import { config } from "dotenv";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const envPath = path.resolve(__dirname, "../.env");

// Загружаем .env
try {
  await fs.access(envPath);
  config({ path: envPath });
} catch (_err) {
  throw new Error(`.env file not found at ${envPath}. Please create one with required environment variables.`);
}

// Конфигурация i18n
const API_KEY = process.env.VITE_I18NEXUS_API_KEY || "t-3QIfqCSgEFu7-11RKoww";
const LANGUAGES = ["en", "ru"] as const;
const NAMESPACES = ["default", "common"] as const;
const BASE_PATH = path.resolve(__dirname, "../i18n/locales1");

type Language = (typeof LANGUAGES)[number];
type Namespace = (typeof NAMESPACES)[number];

async function fetchTranslations(lang: Language, ns: Namespace): Promise<object> {
  try {
    const response = await axios.get(
      `https://api.i18nexus.com/project_resources/translations/${lang}/${ns}.json?api_key=${API_KEY}`,
    );
    return response.data;
  } catch (error) {
    console.error(
      `Error fetching translations for ${lang}/${ns}:`,
      error instanceof Error ? error.message : String(error),
    );
    return {};
  }
}

async function saveTranslations(lang: Language, ns: Namespace, data: object): Promise<void> {
  const dirPath = path.join(BASE_PATH, lang);
  const filePath = path.join(dirPath, `${ns}.json`);

  try {
    // Создаем директорию для языка, если её нет
    await fs.mkdir(dirPath, { recursive: true });

    // Сохраняем переводы в файл
    await fs.writeFile(filePath, JSON.stringify(data, null, 2), "utf-8");

    console.log(`✓ Saved translations for ${lang}/${ns}`);
  } catch (error) {
    console.error(
      `Error saving translations for ${lang}/${ns}:`,
      error instanceof Error ? error.message : String(error),
    );
  }
}

async function generateTranslations(): Promise<void> {
  try {
    for (const lang of LANGUAGES) {
      for (const ns of NAMESPACES) {
        const translations = await fetchTranslations(lang, ns);
        await saveTranslations(lang, ns, translations);
      }
    }

    console.log("\n✨ All translations have been downloaded successfully!");
  } catch (error) {
    console.error("Error generating translations:", error instanceof Error ? error.message : String(error));
  }
}

// Запускаем генерацию
generateTranslations();
