import { failure, Result, success } from "./Result";

export type NonEmptyArray<T> = Array<T> & { _: "NonEmptyArray" };

export const isNonEmpty = <A>(arr: Array<A>): arr is NonEmptyArray<A> =>
  arr.length !== 0;

export const fromArray = <A>(
  arr: Array<A>,
): Result<string, NonEmptyArray<A>> => {
  if (isNonEmpty(arr)) return success(arr);

  return failure("Cannot construct non-empty array from empty array.");
};
