import always from "../lib/always";
import { NonEmptyArray } from "../lib/NonEmptyArray";
import { Result, success, chain, map, all } from "../lib/Result";
import { increment, decrement } from "../lib/WheelCounter";
import { WineSection } from "../WineSection";
import { CurrentItemState, fromItemElements } from "./CurrentItemState";
import * as ElementSelectors from "./ElementSelectors";
import swipeDirectionObservable from "./swipeDirectionObservable";

const setupStateObserver = ([itemEls, dotEls, state]: [
  NonEmptyArray<HTMLElement>,
  NonEmptyArray<HTMLElement>,
  CurrentItemState,
]): void => {
  const [observable] = state;

  observable(({ value }) => {
    itemEls.forEach((itemEl) => itemEl.classList.remove("_current"));
    itemEls[value].classList.add("_current");

    dotEls.forEach((dotEl) => dotEl.classList.remove("_current"));
    dotEls[value]?.classList.add("_current");
  });
};

const setupSwipeObserver = ([carouselEl, state]: [
  HTMLElement,
  CurrentItemState,
]) => {
  swipeDirectionObservable(carouselEl)((direction) => {
    const [_, update] = state;

    switch (direction) {
      case "Left":
        update(increment);
        break;
      case "Right":
        update(decrement);
        break;
    }
  });
};

export const initialize = (
  wineSection: WineSection,
): Result<string, string> => {
  const carouselEl = ElementSelectors.carousel(wineSection.rootElement);

  const itemEls = chain(ElementSelectors.items)(carouselEl);
  const dotEls = chain(ElementSelectors.dots)(carouselEl);

  const state = chain(fromItemElements)(itemEls);

  const itemElsAndDotElsAndState = all([itemEls, dotEls, state]);
  const stateObserver = map(setupStateObserver)(itemElsAndDotElsAndState);

  const carouselElAndState = all([carouselEl, state]);
  const swipeObserver = map(setupSwipeObserver)(carouselElAndState);

  const observers = all([stateObserver, swipeObserver]);
  return map(always("Carousel Initialized."))(observers);
};
