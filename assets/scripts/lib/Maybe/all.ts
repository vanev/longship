import { Maybe, just, isNothing } from "./index";

function all<T1, T2, T3, T4, T5, T6, T7, T8, T9, T10>(
  values: readonly [
    Maybe<T1>,
    Maybe<T2>,
    Maybe<T3>,
    Maybe<T4>,
    Maybe<T5>,
    Maybe<T6>,
    Maybe<T7>,
    Maybe<T8>,
    Maybe<T9>,
    Maybe<T10>,
  ],
): Maybe<[T1, T2, T3, T4, T5, T6, T7, T8, T9, T10]>;
function all<T1, T2, T3, T4, T5, T6, T7, T8, T9>(
  values: readonly [
    Maybe<T1>,
    Maybe<T2>,
    Maybe<T3>,
    Maybe<T4>,
    Maybe<T5>,
    Maybe<T6>,
    Maybe<T7>,
    Maybe<T8>,
    Maybe<T9>,
  ],
): Maybe<[T1, T2, T3, T4, T5, T6, T7, T8, T9]>;
function all<T1, T2, T3, T4, T5, T6, T7, T8>(
  values: readonly [
    Maybe<T1>,
    Maybe<T2>,
    Maybe<T3>,
    Maybe<T4>,
    Maybe<T5>,
    Maybe<T6>,
    Maybe<T7>,
    Maybe<T8>,
  ],
): Maybe<[T1, T2, T3, T4, T5, T6, T7, T8]>;
function all<T1, T2, T3, T4, T5, T6, T7>(
  values: readonly [
    Maybe<T1>,
    Maybe<T2>,
    Maybe<T3>,
    Maybe<T4>,
    Maybe<T5>,
    Maybe<T6>,
    Maybe<T7>,
  ],
): Maybe<[T1, T2, T3, T4, T5, T6, T7]>;
function all<T1, T2, T3, T4, T5, T6>(
  values: readonly [
    Maybe<T1>,
    Maybe<T2>,
    Maybe<T3>,
    Maybe<T4>,
    Maybe<T5>,
    Maybe<T6>,
  ],
): Maybe<[T1, T2, T3, T4, T5, T6]>;
function all<T1, T2, T3, T4, T5>(
  values: readonly [Maybe<T1>, Maybe<T2>, Maybe<T3>, Maybe<T4>, Maybe<T5>],
): Maybe<[T1, T2, T3, T4, T5]>;
function all<T1, T2, T3, T4>(
  values: readonly [Maybe<T1>, Maybe<T2>, Maybe<T3>, Maybe<T4>],
): Maybe<[T1, T2, T3, T4]>;
function all<T1, T2, T3>(
  values: readonly [Maybe<T1>, Maybe<T2>, Maybe<T3>],
): Maybe<[T1, T2, T3]>;
function all<T1, T2>(values: readonly [Maybe<T1>, Maybe<T2>]): Maybe<[T1, T2]>;
function all<T1>(values: readonly [Maybe<T1>]): Maybe<[T1]>;
function all<T1>(values: Array<Maybe<T1>>): Maybe<Array<T1>>;
function all(results: any) {
  let finalMaybe: Maybe<any> = just([]);

  for (const result of results) {
    if (isNothing(finalMaybe)) break;
    if (isNothing(result)) {
      finalMaybe = result;
      break;
    }

    finalMaybe = just([...finalMaybe.value, result.value]);
  }

  return finalMaybe;
}

export default all;
