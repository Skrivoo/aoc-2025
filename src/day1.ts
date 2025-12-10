import { readInput } from './input-reader.ts';

const exampleInputs = 'L68,L30,R48,L5,R60,L55,L1,L99,R14,L82';
const rawInputs = readInput('../inputs/day1.txt').replaceAll('\n', ',');

type Rotation = {
  direction: 'R' | 'L';
  step: number;
};

const createStep = (rawStep: string): number => {
  const stepAsInt = parseInt(rawStep);
  return stepAsInt;
};

const inputs: Array<Rotation> = rawInputs.split(',').map((e) => {
  const direction = e.charAt(0) as 'R' | 'L';
  const step = createStep(e.slice(1));
  return { direction, step };
});

const rollLeft = (
  step: number,
  currentPosition: number,
  turnCounter: number = 0,
): { newPosition: number; turnCounter: number } => {
  if (step > 100) return rollLeft(step - 100, currentPosition, turnCounter + 1);
  const left = currentPosition - step;
  if (currentPosition === 0)
    return { newPosition: 100 - Math.abs(left), turnCounter };
  if (left < 0)
    return { newPosition: 100 - Math.abs(left), turnCounter: turnCounter + 1 };
  return { newPosition: left, turnCounter };
};

const rollRight = (
  step: number,
  currentPosition: number,
  turnCounter: number = 0,
): { newPosition: number; turnCounter: number } => {
  if (step > 100)
    return rollRight(step - 100, currentPosition, turnCounter + 1);
  const right = currentPosition + step;
  if (right === 100) return { newPosition: 0, turnCounter };
  if (right > 100)
    return { newPosition: right - 100, turnCounter: turnCounter + 1 };
  return { newPosition: right, turnCounter };
};

const solvePuzzle = (
  inputs: Rotation[],
  currentPosition: number,
  collectedValues: number[],
  firstTask: boolean = true,
): number[] => {
  if (inputs.length === 0) return collectedValues;
  const [rotation, ...rest] = inputs;
  const calculatedPosition =
    rotation!.direction === 'L'
      ? rollLeft(rotation!.step, currentPosition)
      : rollRight(rotation!.step, currentPosition);
  const extendedCollectedValues: Array<number> = firstTask
    ? collectedValues
    : [
        ...collectedValues,
        ...Array.from({ length: calculatedPosition.turnCounter }, () => 0),
      ];
  return solvePuzzle(
    rest,
    calculatedPosition.newPosition,
    [...extendedCollectedValues, calculatedPosition.newPosition],
    firstTask,
  );
};

console.log(solvePuzzle(inputs, 50, []).filter((e) => e === 0).length);
console.log(solvePuzzle(inputs, 50, [], false).filter((e) => e === 0).length);
