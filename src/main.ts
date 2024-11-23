import * as d3 from 'd3-shape';
import * as fs from 'fs';
import path from "node:path/win32";
import { ALPHABET_FOLDER } from "./shared/get-folder.js";
import { EXTENDED_DOTS, SHORT_DOTS } from "./dots.class.js";

const FOLDER_NAME = 'alphabet';
let folderPath = '';

const availableDots: [number, number][] = [
  [10, 10],  [50, 10], [90, 10],
  // [10, 30], [30, 30], [50, 30], [70, 30], [90, 30],
  [10, 50],  [50, 50], [90, 50],
  // [10, 70], [30, 70], [50, 70], [70, 70], [90, 70],
  [10, 90],  [50, 90],  [90, 90]
];

function getPathByDots(dots: [number, number][]) {
  const line = d3.line<[number, number]>()
    .curve(d3.curveStepAfter)
    // .curve(d3.curveCatmullRom.alpha(1))
    // .curve(d3.curveMonotoneY)
    .x(d => d[0])
    .y(d => d[1]);
  return line(dots);
}



function generateSvg(letter: string, generatedPath: string | null) {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100">
    <path d="${generatedPath}" stroke="black" fill="transparent" stroke-width="5"/>
  </svg>`;
  const filePath = path.join(folderPath, `${letter}.svg`);
  fs.writeFileSync(filePath, svg);
}

function generateFolder() {
  try {
    folderPath = ALPHABET_FOLDER;
    if (!fs.existsSync(folderPath)) {
      fs.mkdirSync(folderPath, { recursive: true });
    }
  } catch (error) {
    console.error(`Ошибка при создании папки: ${error}`);
  }
}

generateFolder();
const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.toLowerCase();
for (const letter of letters) {
  // const dots = SHORT_DOTS.getRandomDots(4,8); // Получение массива точек для буквы
  const dots = EXTENDED_DOTS.getRandomDots(5,6); // Получение массива точек для буквы
  const generatedPath = getPathByDots(dots); // Генерация пути на основе точек
  generateSvg(letter, generatedPath); // Генерация SVG-файла
}

console.log(`SVG-файлы для алфавита сохранены в папке: ${FOLDER_NAME}`);

