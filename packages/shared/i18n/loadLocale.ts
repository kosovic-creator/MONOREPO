import fs from "fs/promises";
import path from "path";

export type Locale = "en" | "sr";

export async function loadLocale(locale: Locale, page: string): Promise<Record<string, string>> {
  const filePath = path.resolve(process.cwd(), 'locale', locale, `${page}.json`);
  try {
    await fs.access(filePath);
  } catch {
    throw new Error(`Missing locale file: ${filePath}`);
  }
  const data = await fs.readFile(filePath, "utf-8");
  return JSON.parse(data);
}
