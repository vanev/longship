import always from "./always";
import identity from "./identity";

export type Just<T> = { tag: "Just"; value: T };
export type Nothing = { tag: "Nothing" };

export type Maybe<T> = Just<T> | Nothing;

export const just = <A>(value: A): Just<A> => ({ tag: "Just", value });
export const nothing: Nothing = { tag: "Nothing" };

export const maybe = <A>(a: A | void | null): Maybe<A> =>
  a ? just(a) : nothing;

export const isJust = <A>(ma: Maybe<A>): ma is Just<A> => ma.tag === "Just";
export const isNothing = <A>(ma: Maybe<A>): ma is Nothing =>
  ma.tag === "Nothing";

export const map = <A, B>(f: (a: A) => B) => (ma: Maybe<A>): Maybe<B> =>
  isJust(ma) ? just(f(ma.value)) : ma;

export const extract = <A, B>(onJust: (a: A) => B, onNothing: () => B) => (
  ma: Maybe<A>,
): B => (isJust(ma) ? onJust(ma.value) : onNothing());

export const valueOr = <A>(other: A) => extract<A, A>(identity, always(other));
