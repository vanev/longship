import { Maybe, maybe } from "../../Maybe";
import swipeObservable from "./swipeObservable";

export const select = <E extends Element = Element>(selector: string) => (
  el: Element,
): Maybe<E> => maybe(el.querySelector<E>(selector));

export const selectAll = <E extends Element = Element>(selector: string) => (
  el: Element,
): Array<E> => Array.from(el.querySelectorAll<E>(selector));

export const attr = (name: string) => (el: Element): Maybe<string> =>
  maybe(el.getAttribute(name));

export { swipeObservable };
