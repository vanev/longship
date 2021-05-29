import { Maybe, maybe } from "../Maybe";

export const select =
  <E extends Element = Element>(selector: string) =>
  (doc: Document): Maybe<E> =>
    maybe(doc.querySelector<E>(selector));

export const selectAll =
  <E extends Element = Element>(selector: string) =>
  (doc: Document): Array<E> =>
    Array.from(doc.querySelectorAll<E>(selector));
