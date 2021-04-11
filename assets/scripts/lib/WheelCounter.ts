import * as Result from "./Result";
import * as Range from "./Range";

export type WheelCounter = {
  value: number;
  range: Range.Range;
};

export const wheelCounter = (range: Range.Range) => (
  value: number,
): Result.Result<string, WheelCounter> => {
  if (!Range.contains(value)(range)) {
    return Result.failure(
      "Cannot create wheel counter with value outside of range.",
    );
  }

  return Result.success({
    value,
    range,
  });
};

export const increment = ({ value, range }: WheelCounter): WheelCounter => {
  const [bottom, top] = range;

  let newValue = value + 1;

  if (newValue > top) newValue = bottom;

  return {
    range,
    value: newValue,
  };
};

export const decrement = ({ value, range }: WheelCounter): WheelCounter => {
  const [bottom, top] = range;

  let newValue = value - 1;

  if (newValue < bottom) newValue = top;

  return {
    range,
    value: newValue,
  };
};
