import { select, clickObservable } from "./lib/DOM/Element";
import { map as maybeMap, isJust } from "./lib/Maybe";
import { Observer, observe } from "./lib/Observable";
import { Result, fromMaybe, map as resultMap } from "./lib/Result";
import { State, state } from "./lib/State";
import { pipe3, pipe4 } from "./lib/Function";

const stateFromInput = (inputEl: HTMLInputElement): State<number> => {
  const initial = parseInt(inputEl.value, 10);

  const [observable, update] = state<number>(initial);

  observable((value) => {
    inputEl.value = `${value}`;
  });

  return [observable, update];
};

const stateFromElement = pipe3(
  select<HTMLInputElement>("input[type='hidden']"),
  fromMaybe("Could not find input for number input."),
  resultMap(stateFromInput),
);

const observeChildClick = (selector: string) => (
  onClick: Observer<MouseEvent>,
) =>
  pipe3(
    select<HTMLElement>(selector),
    maybeMap(clickObservable),
    maybeMap(observe(onClick)),
  );

const increment = (value: number): number => value + 1;
const decrement = (value: number): number => (value <= 1 ? value : value - 1);

export const initialize = (rootEl: HTMLElement): Result<string, void> => {
  const state = stateFromElement(rootEl);

  return resultMap(([observable, update]: State<number>): void => {
    observeChildClick("[data-number-increase]")(() => update(increment))(
      rootEl,
    );
    observeChildClick("[data-number-decrease]")(() => update(decrement))(
      rootEl,
    );

    const displayEl = select<HTMLElement>("[data-number-display]")(rootEl);
    if (isJust(displayEl)) {
      observable((value) => {
        displayEl.value.innerText = `${value}`;
      });
    }
  })(state);
};
