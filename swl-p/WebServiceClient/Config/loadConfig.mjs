import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function loadConfig() {
  const configPath = path.resolve(__dirname, "../../AppSettings.json");
  const data = await fs.readFile(configPath, "utf-8");
  return JSON.parse(data);
}

export const config = await loadConfig();
