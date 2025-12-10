import { readInput } from './input-reader.ts';

const exampleInput = `987654321111111
811111111111119
234234234234278
818181911112111`.split('\n');

const inputRows = readInput('../inputs/day3.txt').split('\n');
const task1 = inputRows.reduce((acc: number, row: string) => {
  const numberArray = row.split('').map(Number);
  const biggestNumber = Math.max(...numberArray.slice(0, -1));
  const position = numberArray.indexOf(biggestNumber);
  const restArray = numberArray.slice(position + 1);
  const secondBiggest = restArray.length
    ? Math.max(...restArray)
    : biggestNumber;
  const combined = Number(`${biggestNumber}${secondBiggest}`);
  return acc + combined;
}, 0);

const pickDescendingSequence = (
  numbers: number[],
  required: number
): number[] => {
  const helper = (
    list: number[],
    collected: number[],
    remaining: number
  ): number[] => {
    if (remaining === 0) return collected;
    const sorted = [...list].sort((a, b) => b - a);
    for (const n of sorted) {
      const pos = list.indexOf(n);
      const rest = list.slice(pos + 1);
      if (rest.length >= remaining - 1) {
        return helper(rest, [...collected, n], remaining - 1);
      }
    }
    return collected;
  };
  return helper(numbers, [], required);
};

// this will also work for task 1 if required is set to 2
const task2 = inputRows.reduce((acc: number, row: string, required = 12) => {
  const numberArray = row.split('').map(Number);
  const numberSeq = pickDescendingSequence(numberArray, required);
  const combined = Number(`${numberSeq.map((e) => e.toString()).join('')}`);
  return acc + combined;
}, 0);

console.log(task1);
console.log(task2);