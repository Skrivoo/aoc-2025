import { readInput } from './input-reader.ts';

type Position = {
  x: number;
  y: number;
};

const exampleInput = `..@@.@@@@.
@@@.@.@.@@
@@@@@.@.@@
@.@@@@..@.
@@.@@@@.@@
.@@@@@@@.@
.@.@.@.@@@
@.@@@.@@@@
.@@@@@@@@.
@.@.@@@.@.`.split('\n');

const inputRows = readInput('../inputs/day4.txt')
  .split('\n')
  .map((e) => e.split(''));

const example: Array<Array<string>> = exampleInput.map((e) => e.split(''));

const hasEnoughNeighbours = (
  position: Position,
  grid: Array<Array<string>>,
  maxAllowedNumber: number,
) => {
  if (grid![position.x]![position.y] !== '@') {
    return false;
  }
  const borders = [-1, 0, 1];
  const neighbors = borders
    .flatMap((dx) =>
      borders.map(
        (dy) =>
          ({
            x: position.x + dx,
            y: position.y + dy,
          }) as Position,
      ),
    )
    .filter((e) => !(e.x === position.x && e.y === position.y));
  return (
    neighbors.reduce((acc, neighbour: Position) => {
      try {
        if (grid![neighbour.x]![neighbour.y] === '@') {
          return acc + 1;
        }
      } catch {
        return acc;
      }
      return acc;
    }, 0) <= maxAllowedNumber
  );
};

const task1 = (input: Array<Array<string>>) => {
  let coordinatesToClear: Array<Position> = [];
  const numberOfMoveableRolls = input
    .flatMap((e, ei) => {
      return e.map((_, ti) => {
        const isItEnough: boolean = hasEnoughNeighbours(
          { x: ei, y: ti },
          input,
          3,
        );
        if (isItEnough) {
          coordinatesToClear = [...coordinatesToClear, { x: ei, y: ti }];
        }
        return isItEnough;
      });
    })
    .filter((e) => e === true).length;
  const newGrid = input.map((e) => [...e]);
  for (const coord of coordinatesToClear) {
    newGrid![coord.x]![coord.y] = '.';
  }
  return { numberOfMoveableRolls, grid: newGrid };
};

const task2 = (input: Array<Array<string>>, acc: number): number => {
  const movedPaperRolls = task1(input);
  if (movedPaperRolls.numberOfMoveableRolls === 0) {
    return acc;
  }
  return task2(
    movedPaperRolls.grid,
    acc + movedPaperRolls.numberOfMoveableRolls,
  );
};

console.log(task1(inputRows).numberOfMoveableRolls);
console.log(task2(inputRows, 0));
