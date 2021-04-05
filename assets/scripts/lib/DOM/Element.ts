import { Maybe, maybe } from "../Maybe";

export const select = <E extends Element = Element>(selector: string) => (
  el: Element,
): Maybe<E> => maybe(el.querySelector<E>(selector));
