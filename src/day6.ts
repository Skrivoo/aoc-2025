import { readInput } from './input-reader.ts';

const exampleInput = `123 328  51 64 
 45 64  387 23 
  6 98  215 314
*   +   *   +`; //I cut down the last line's last whitespaces >:D

const myInput = readInput('../inputs/day6.txt');
const newLineRegex = / *\n */g;
const regex = / +/g;

const processInput = (input: string) => {
  const inputWithoutWhitespaces = input
    .replace(newLineRegex, '|')
    .replace(regex, ',');
  let arrayOfProblems: Array<Array<string>> = [[]];
  inputWithoutWhitespaces.split('|').map((line) => {
    line.split(',').map((e, index) => {
      const partialProblem: Array<string> = arrayOfProblems[index] ?? [];
      arrayOfProblems[index] = [...partialProblem, e];
    });
  });
  return arrayOfProblems;
};

const task = (input: string[][], task1: boolean = false) => {
  return input.reduce((acc: number, problem: Array<string>) => {
    let operator = problem[0]?.charAt(problem[0].length - 1); //used in task 2
    const numbers: Array<number> = problem.map((e) => {
      const cleared = e.trim();
      const maybeNum = parseInt(cleared);
      if (isNaN(maybeNum)) {
        if (task1) {
          operator = e.includes('+') ? '+' : '*';
          return operator === '+' ? 0 : 1;
        } else {
          return parseInt(cleared.slice(0, cleared.length - 1));
        }
      }
      return maybeNum;
    });
    return operator === '+'
      ? acc + numbers.reduce((a, b) => a + b, 0)
      : acc + numbers.reduce((a, b) => a * b, 1);
  }, 0);
};

const processInput2 = (input: string): string[][] => {
  const lines = input.split('\n');
  const lineLength = lines[0]?.length ?? 0;

  const getProblems = (
    collector: string[][],
    lineCharIndex: number,
    current: string[],
  ): string[][] => {
    if (lineCharIndex === lineLength) {
      return [...collector, current];
    }
    const column = lines.map((line) => line.charAt(lineCharIndex));
    if (column.every((c) => c === ' ')) {
      return getProblems([...collector, current], lineCharIndex + 1, []);
    }
    return getProblems(collector, lineCharIndex + 1, [
      ...current,
      column.join(''),
    ]);
  };
  return getProblems([], 0, []);
};

console.log(task(processInput(myInput), true));
console.log(task(processInput2(myInput)));
