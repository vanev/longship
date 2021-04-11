import { Maybe, maybe } from "./Maybe";
import { Pair, fst, snd, pair } from "./Pair";

export const map = <A, B>(f: (a: A) => B) => (as: Array<A>): Array<B> =>
  as.map(f);

export const find = <A>(p: (a: A) => boolean) => (as: Array<A>): Maybe<A> =>
  maybe<A>(as.find(p));

export const filter = <A>(p: (a: A) => boolean) => (as: Array<A>): Array<A> =>
  as.filter(p);

export const traversePairs = <A, B>(
  pairs: Array<Pair<A, B>>,
): Pair<Array<A>, Array<B>> => {
  const firsts = map(fst)(pairs);
  const seconds = map(snd)(pairs);

  return pair(firsts, seconds);
};

export const findIndex = <A>(p: (a: A) => boolean) => (arr: Array<A>): number =>
  arr.findIndex(p);
