import { Result, success, isFailure } from "./index";

function all<E, T1, T2, T3, T4, T5, T6, T7, T8, T9, T10>(
  values: readonly [
    Result<E, T1>,
    Result<E, T2>,
    Result<E, T3>,
    Result<E, T4>,
    Result<E, T5>,
    Result<E, T6>,
    Result<E, T7>,
    Result<E, T8>,
    Result<E, T9>,
    Result<E, T10>,
  ],
): Result<E, [T1, T2, T3, T4, T5, T6, T7, T8, T9, T10]>;
function all<E, T1, T2, T3, T4, T5, T6, T7, T8, T9>(
  values: readonly [
    Result<E, T1>,
    Result<E, T2>,
    Result<E, T3>,
    Result<E, T4>,
    Result<E, T5>,
    Result<E, T6>,
    Result<E, T7>,
    Result<E, T8>,
    Result<E, T9>,
  ],
): Result<E, [T1, T2, T3, T4, T5, T6, T7, T8, T9]>;
function all<E, T1, T2, T3, T4, T5, T6, T7, T8>(
  values: readonly [
    Result<E, T1>,
    Result<E, T2>,
    Result<E, T3>,
    Result<E, T4>,
    Result<E, T5>,
    Result<E, T6>,
    Result<E, T7>,
    Result<E, T8>,
  ],
): Result<E, [T1, T2, T3, T4, T5, T6, T7, T8]>;
function all<E, T1, T2, T3, T4, T5, T6, T7>(
  values: readonly [
    Result<E, T1>,
    Result<E, T2>,
    Result<E, T3>,
    Result<E, T4>,
    Result<E, T5>,
    Result<E, T6>,
    Result<E, T7>,
  ],
): Result<E, [T1, T2, T3, T4, T5, T6, T7]>;
function all<E, T1, T2, T3, T4, T5, T6>(
  values: readonly [
    Result<E, T1>,
    Result<E, T2>,
    Result<E, T3>,
    Result<E, T4>,
    Result<E, T5>,
    Result<E, T6>,
  ],
): Result<E, [T1, T2, T3, T4, T5, T6]>;
function all<E, T1, T2, T3, T4, T5>(
  values: readonly [
    Result<E, T1>,
    Result<E, T2>,
    Result<E, T3>,
    Result<E, T4>,
    Result<E, T5>,
  ],
): Result<E, [T1, T2, T3, T4, T5]>;
function all<E, T1, T2, T3, T4>(
  values: readonly [Result<E, T1>, Result<E, T2>, Result<E, T3>, Result<E, T4>],
): Result<E, [T1, T2, T3, T4]>;
function all<E, T1, T2, T3>(
  values: readonly [Result<E, T1>, Result<E, T2>, Result<E, T3>],
): Result<E, [T1, T2, T3]>;
function all<E, T1, T2>(
  values: readonly [Result<E, T1>, Result<E, T2>],
): Result<E, [T1, T2]>;
function all<E, T1>(values: readonly [Result<E, T1>]): Result<E, [T1]>;
function all(results: any) {
  let finalResult: Result<any, any> = success([]);

  for (const result of results) {
    if (isFailure(finalResult)) break;
    if (isFailure(result)) {
      finalResult = result;
      break;
    }

    finalResult = success([...finalResult.value, result.value]);
  }

  return finalResult;
}

export default all;
