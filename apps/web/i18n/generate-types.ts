// generate-types.ts
import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const LOCALES_PATH = path.resolve(__dirname, "../i18n/locales");
const TYPES_PATH = path.resolve(__dirname, "../i18n/types.ts");

// Функция для преобразования имени файла в PascalCase
function toPascalCase(str: string): string {
  return str
    .split(/[-_.]/)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join("");
}

// Функция для генерации TypeScript интерфейса из JSON объекта
function generateTypeFromJSON(obj: unknown, indent = ""): string {
  if (typeof obj !== "object" || obj === null) {
    return "string";
  }

  const entries = Object.entries(obj as Record<string, unknown>);
  if (entries.length === 0) {
    return "Record<string, never>";
  }

  const properties = entries.map(([key, value]) => {
    const propertyType = generateTypeFromJSON(value, indent + "  ");
    return `${indent}  ${key}: ${propertyType};`;
  });

  return `{\n${properties.join("\n")}\n${indent}}`;
}

async function generateTypes(): Promise<void> {
  try {
    // Получаем список языковых директорий
    const langs = await fs.readdir(LOCALES_PATH);
    const namespaces = new Set<string>();
    const translations: Record<string, unknown> = {};

    // Читаем все файлы переводов
    for (const lang of langs) {
      const langPath = path.join(LOCALES_PATH, lang);
      const stats = await fs.stat(langPath);

      if (!stats.isDirectory()) continue;

      const files = await fs.readdir(langPath);
      for (const file of files) {
        if (!file.endsWith(".json")) continue;

        const namespace = path.basename(file, ".json");
        namespaces.add(namespace);

        const content = await fs.readFile(path.join(langPath, file), "utf-8");
        const json = JSON.parse(content);

        if (!translations[namespace]) {
          translations[namespace] = json;
        }
      }
    }

    // Генерируем интерфейс
    const interfaceContent = generateTypeFromJSON(translations);

    // Формируем содержимое файла с типами
    const typeFileContent = `// This file is auto-generated. Do not edit it manually
// Generated at ${new Date().toISOString()}

export interface Translations ${interfaceContent}

export type PathsToStringProps<T> = T extends string
  ? []
  : {
      [K in Extract<keyof T, string>]: [K, ...PathsToStringProps<T[K]>];
    }[Extract<keyof T, string>];

export type Join<T extends string[], D extends string> = T extends []
  ? never
  : T extends [infer F]
    ? F
    : T extends [infer F, ...infer R]
      ? F extends string
        ? \`\${F}\${D}\${Join<Extract<R, string[]>, D>}\`
        : never
      : string;

export type TranslationKey = Join<PathsToStringProps<Translations>, ":">;

export interface TranslationValues {
  [key: string]: string | number | boolean | Date | null | undefined;
}

export const SUPPORTED_NAMESPACES = [${Array.from(namespaces)
      .map((ns) => `"${ns}"`)
      .join(", ")}] as const;
export type Namespaces = (typeof SUPPORTED_NAMESPACES)[number];
`;

    // Записываем файл с типами
    await fs.writeFile(TYPES_PATH, typeFileContent);
    console.log("✨ Translation types generated successfully!");
  } catch (error) {
    console.error("Error generating types:", error instanceof Error ? error.message : String(error));
  }
}

// Запускаем генерацию типов
generateTypes();
