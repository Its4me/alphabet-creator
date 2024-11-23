import { getRandomNumber } from "./shared/random.js";

export class Dots {
  topArray: [number, number][] = [];
  bottomArray: [number, number][] = [];
  allArray: [number, number][] = [];

  constructor(dotArray: [number, number][]) {
    this.allArray = dotArray;

    const maxY = Math.max(...dotArray.map(dot => dot[1]));
    const minY = Math.min(...dotArray.map(dot => dot[1]));

    this.topArray = dotArray.filter(dot => dot[1] === maxY);
    this.bottomArray = dotArray.filter(dot => dot[1] === minY);
  }

  getRandomDots(min: number, max: number): [number, number][] {
    const dotsCount = getRandomNumber(min, max);
    const dots: [number, number][] = [];

    // Выбираем одну точку из topArray и одну из bottomArray
    const randomTop = this.topArray[getRandomNumber(0, this.topArray.length - 1)];
    const randomBottom = this.bottomArray[getRandomNumber(0, this.bottomArray.length - 1)];

    // Добавляем их в результат
    dots.push(randomTop, randomBottom);

    // Добавляем остальные точки случайным образом из allArray
    for (let i = 0; i < dotsCount - 2; i++) {
      dots.push(this.allArray[getRandomNumber(0, this.allArray.length - 1)]);
    }

    return shuffleArray(dots);
  }
}

function shuffleArray<T>(array: T[]): T[] {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]]; // меняем местами элементы
  }
  return array;
}

const availableDotsShort: [number, number][] = [
  [10, 10],  [50, 10], [90, 10],
  [10, 50],  [50, 50], [90, 50],
  [10, 90],  [50, 90],  [90, 90]
];
export const SHORT_DOTS = new Dots(availableDotsShort);

const availableDotsxtended: [number, number][] = [
  [10, 10], [30, 10], [50, 10], [70, 10], [90, 10],
  [10, 30], [30, 30], [50, 30], [70, 30], [90, 30],
  [10, 50], [30, 50], [50, 50], [70, 50], [90, 50],
  [10, 70], [30, 70], [50, 70], [70, 70], [90, 70],
  [10, 90], [30, 90], [50, 90], [70, 90], [90, 90]
]

export const EXTENDED_DOTS = new Dots(availableDotsxtended);
