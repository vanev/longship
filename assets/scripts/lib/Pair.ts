export type Pair<A, B> = [A, B];

export const pair = <A, B>(a: A, b: B): Pair<A, B> => [a, b];

export const makePair = <A, B, C>(f: (a: A) => B, s: (a: A) => C) => (
  a: A,
): Pair<B, C> => pair(f(a), s(a));

export const fst = <A, B>([a, _]: Pair<A, B>): A => a;
export const snd = <A, B>([_, b]: Pair<A, B>): B => b;
