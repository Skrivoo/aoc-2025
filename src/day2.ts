import { readInput } from './input-reader.ts';

const exampleInput =
  '11-22,95-115,998-1012,1188511880-1188511890,222220-222224,1698522-1698528,446443-446449,38593856-38593862,565653-565659,824824821-824824827,2121212118-2121212124';
const myInput = readInput('../inputs/day2.txt');

type Range = {
  start: number;
  end: number;
};

const input = (rawInput: string): Array<Range> =>
  rawInput.split(',').map((ranges) => {
    const rangeArray = ranges.split('-');
    const start = parseInt(rangeArray[0]!);
    const end = parseInt(rangeArray[1]!);
    return { start, end };
  });

const generateNumbersOfRange = (range: Range): Array<number> => {
  return Array.from(
    { length: range.end - range.start + 1 },
    (_, a) => a + range.start,
  );
};

const isIdInvalid = (id: number): boolean => {
  const stringId = id.toString();
  if (stringId.length > 1 && stringId.length % 2 == 0) {
    const firstHalf = stringId.slice(0, stringId.length / 2);
    const secondHalf = stringId.slice(stringId.length / 2);
    return firstHalf === secondHalf;
  }
  return false;
};

const isIdInvalidWithOtherSillyPatterns = (id: number): boolean => {
  const stringId = id.toString();
  const check = (patternLength: number): boolean => {
    if (patternLength > stringId.length / 2) {
      return false;
    }
    const pattern = stringId.slice(0, patternLength);
    if (stringId.length % patternLength === 0) {
      if (pattern.repeat(stringId.length / patternLength) === stringId) {
        return true;
      }
    }
    return check(patternLength + 1);
  };

  return check(1);
};

const solvePuzzle = (input: Array<Range>, task1: boolean = true) => {
  return input.reduce((invalidIdSum, range) => {
    const currentIds = generateNumbersOfRange(range);
    const invalidIdsOfThisRange = currentIds.reduce((a, b) => {
      if (
        (isIdInvalid(b) && task1) ||
        (!task1 && (isIdInvalid(b) || isIdInvalidWithOtherSillyPatterns(b)))
      ) {
        return a + b;
      } else {
        return a;
      }
    }, 0);
    return invalidIdSum + invalidIdsOfThisRange;
  }, 0);
};

console.log(solvePuzzle(input(myInput)));
console.log(solvePuzzle(input(myInput), false));
