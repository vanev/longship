import { pipe } from "../Function";
import { Maybe, isNothing } from "../Maybe";
import all from "./all";

export type Success<A> = { tag: "Success"; value: A };
export type Failure<E> = { tag: "Failure"; reason: E };

export type Result<E, A> = Failure<E> | Success<A>;

export const success = <A>(value: A): Success<A> => ({
  tag: "Success",
  value,
});
export const failure = <E>(reason: E): Failure<E> => ({
  tag: "Failure",
  reason,
});

export const fromMaybe = <E>(reason: E) => <A>(
  maybe: Maybe<A>,
): Result<E, A> => {
  if (isNothing(maybe)) return failure(reason);
  return success(maybe.value);
};

export const isSuccess = <E, A>(rea: Result<E, A>): rea is Success<A> =>
  rea.tag === "Success";
export const isFailure = <E, A>(rea: Result<E, A>): rea is Failure<E> =>
  rea.tag === "Failure";

export const map = <A, B>(f: (a: A) => B) => <E>(
  rea: Result<E, A>,
): Result<E, B> => (isSuccess(rea) ? success(f(rea.value)) : rea);

export const mapFailure = <E, F>(f: (e: E) => F) => <A>(
  rea: Result<E, A>,
): Result<F, A> => (isFailure(rea) ? failure(f(rea.reason)) : rea);

export const join = <E, A>(rra: Result<E, Result<E, A>>): Result<E, A> =>
  isSuccess(rra) ? rra.value : rra;

export const chain = <E, A, B>(
  f: (a: A) => Result<E, B>,
): ((rea: Result<E, A>) => Result<E, B>) => pipe(map(f), join);

export { all };
