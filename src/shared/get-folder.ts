import { fileURLToPath } from 'url';
import path from 'path';

export function getFolderPath(folderName = '') {
  const __filename = fileURLToPath(import.meta.url); // Преобразуем URL в путь
  const __dirname = path.dirname(__filename); // Получаем директорию файла
  return path.join(__dirname,'..', folderName); // Объединяем с папкой
}

export const ALPHABET_FOLDER = getFolderPath('alphabet');
