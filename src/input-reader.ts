import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export const readInput = (path: string) => {
  const inputPath = join(__dirname, path);
  return readFileSync(inputPath, 'utf8');
};
