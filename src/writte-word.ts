import fs from 'fs';
import path from 'path';
import { fileURLToPath } from "node:url";
import { ALPHABET_FOLDER } from "./shared/get-folder.js";

async function generateWordSvg(word: string): Promise<void> {
  const wordLowerCase = word.toLowerCase();
  const svgElements: string[] = [];

  let xOffset = 0;
  const letterWidth = 100;
  const letterHeight = 100;

  for (const letter of wordLowerCase) {
    const svgFilePath = path.join(ALPHABET_FOLDER, `${letter}.svg`);
    if (letter === ' ') {
      const updatedSvgContent = `<g transform="translate(${xOffset}, 0)"></g>`;
      svgElements.push(updatedSvgContent);
      xOffset += letterWidth;
    } else if (fs.existsSync(svgFilePath)) {
      const svgContent = fs.readFileSync(svgFilePath, 'utf-8');
      const updatedSvgContent = `<g transform="translate(${xOffset}, 0)">${svgContent}</g>`;
      svgElements.push(updatedSvgContent);
      xOffset += letterWidth;
    } else {
      console.log(letter)
      const updatedSvgContent = `<g transform="translate(${xOffset}, 0)"></g>`;
      svgElements.push(updatedSvgContent);
      xOffset += letterWidth;
      console.warn(`Файл для буквы "${letter}" не найден.`);
    }
  }

  const finalSvg = `
  <svg xmlns="http://www.w3.org/2000/svg" width="${xOffset}" height="${letterHeight}">
    ${svgElements.join('')}
  </svg>
  `;

  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);

  const outputFilePath = path.join(__dirname, 'text.svg');

  // Записываем итоговый SVG в файл
  fs.writeFileSync(outputFilePath, finalSvg);

  console.log(`SVG файл с словом "${word}" был успешно создан по пути ${outputFilePath}`);
}

// Пример использования
// const word = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.toLowerCase();
const word = 'Zaplavskiy Dmitriy'.toLowerCase();
generateWordSvg(word);
