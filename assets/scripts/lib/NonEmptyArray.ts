import { failure, Result, success } from "./Result";

export type NonEmptyArray<T> = Array<T> & { _: "NonEmptyArray" };

export const fromArray = <A>(
  arr: Array<A>,
): Result<string, NonEmptyArray<A>> => {
  if (arr.length === 0) {
    return failure("Cannot construct non-empty array from empty array.");
  }

  return success(arr as NonEmptyArray<A>);
};
