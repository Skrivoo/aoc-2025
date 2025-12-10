import { readInput } from './input-reader.ts';

type Range = {
  start: number;
  end: number;
};

const exampleInput = `3-5
10-14
16-20
12-18

1
5
8
11
17
32`;

const myInput = readInput('../inputs/day5.txt');

const processInput = (
  input: string,
): { ranges: Array<Range>; ingredientIds: Array<number> } => {
  const sliced = input.replaceAll('\n', ',').split(',,');
  const ranges = sliced[0]!.split(',').map((s) => {
    const rangeParts = s.split('-');
    return {
      start: parseInt(rangeParts[0]!),
      end: parseInt(rangeParts[1]!),
    } as Range;
  });
  const ingredientIds: Array<number> =
    sliced[1]?.split(',').map((id) => parseInt(id)) ?? [];
  return { ranges, ingredientIds };
};

const getTotalUniqueIds = (ranges: Array<Range>): number => {
  const sorted = ranges.slice().sort((a, b) => a.start - b.start);
  const merged: Array<Range> = [];
  for (const range of sorted) {
    if (merged.length === 0) {
      merged.push({ ...range });
      continue;
    }
    const last = merged[merged.length - 1];
    if (range.start <= last!.end + 1) {
      last!.end = Math.max(last!.end, range.end);
    } else {
      merged.push({ ...range });
    }
  }
  return merged.reduce((acc, range) => acc + (range.end - range.start + 1), 0);
};

const task1 = (input: string): number => {
  const processedInput = processInput(input);
  return processedInput.ingredientIds.reduce((acc: number, id: number) => {
    const hasIdInRange: boolean = processedInput.ranges.some((range) => {
      return id <= range.end && id >= range.start;
    });
    if (hasIdInRange) return acc + 1;
    return acc;
  }, 0);
};

const task2 = (input: string): number => {
  const processedInput = processInput(input);
  return getTotalUniqueIds(processedInput.ranges);
};

console.log(task1(myInput));
console.log(task2(myInput));
