import { findIndex } from "../lib/Array";
import { NonEmptyArray } from "../lib/NonEmptyArray";
import * as Range from "../lib/Range";
import { Result, map } from "../lib/Result";
import { State, state } from "../lib/State";
import { WheelCounter, wheelCounter } from "../lib/WheelCounter";
import itemElementIsCurrent from "./itemElementIsCurrent";

export type CurrentItemState = State<WheelCounter>;

export const fromItemElements = (
  itemEls: NonEmptyArray<HTMLElement>,
): Result<string, CurrentItemState> => {
  const range = Range.fromArrayLength(itemEls);
  const value = findIndex(itemElementIsCurrent)(itemEls);

  const counter = wheelCounter(range)(value);

  return map<WheelCounter, CurrentItemState>(state)(counter);
};
