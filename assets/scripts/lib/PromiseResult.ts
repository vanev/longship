import {
  Result,
  Success,
  Failure,
  success as resultSuccess,
  failure as resultFailure,
  map as resultMap,
  mapFailure as resultMapFailure,
  isFailure,
} from "./Result";
import { map as promiseMap, chain as promiseChain } from "./Promise";
import { Maybe, isNothing } from "./Maybe";

export type PromiseResult<E, A> = Promise<Result<E, A>>;

export const success = <A>(value: A): Promise<Success<A>> =>
  Promise.resolve(resultSuccess(value));

export const failure = <E>(error: E): Promise<Failure<E>> =>
  Promise.resolve(resultFailure(error));

export const fromMaybe = <E>(reason: E) => <A>(
  maybe: Maybe<A>,
): PromiseResult<E, A> => {
  if (isNothing(maybe)) return failure(reason);
  return success(maybe.value);
};

export const fromPromise = <E, A>(promise: Promise<A>): PromiseResult<E, A> =>
  promise.then(resultSuccess).catch(resultFailure);

export const map = <E, A, B>(
  f: (a: A) => B,
): ((pra: PromiseResult<E, A>) => PromiseResult<E, B>) =>
  promiseMap(resultMap(f));

export const mapFailure = <E, F, A>(
  f: (e: E) => F,
): ((pra: PromiseResult<E, A>) => PromiseResult<F, A>) =>
  promiseMap(resultMapFailure(f));

export const chain = <E, A, B>(
  f: (a: A) => PromiseResult<E, B>,
): ((pra: PromiseResult<E, A>) => PromiseResult<E, B>) =>
  promiseChain(
    (ra: Result<E, A>): PromiseResult<E, B> => {
      if (isFailure(ra)) return Promise.resolve(ra);
      return f(ra.value);
    },
  );
