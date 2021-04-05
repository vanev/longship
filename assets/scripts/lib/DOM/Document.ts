import { Maybe, maybe } from "../Maybe";

export const select = <E extends Element = Element>(selector: string) => (
  doc: Document,
): Maybe<E> => maybe(doc.querySelector<E>(selector));
