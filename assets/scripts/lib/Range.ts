export type Range = [number, number];

export const range = (bottom: number, top: number): Range => [bottom, top];

export const fromArrayLength = (arr: Array<unknown>): Range => [
  0,
  arr.length - 1,
];

export const contains = (value: number) => ([bottom, top]: Range): boolean =>
  value <= top && value >= bottom;
