import { pipe, pipe5 } from "../lib/Function";
import always from "../lib/always";
import { map as arrayMap } from "../lib/Array";
import { select, selectAll } from "../lib/DOM/Element";
import {
  PromiseResult,
  fromMaybe,
  map as promiseResultMap,
  chain,
} from "../lib/PromiseResult";
import { Map, fromElement as mapFromElement } from "./Map";
import { fromElement as locationFromElement } from "./Location";

const setupLocations = (rootEl: HTMLElement) => (map: Map) =>
  pipe(
    selectAll<HTMLElement>("[data-location]"),
    arrayMap(locationFromElement(map)),
  )(rootEl);

export const initialize = (
  rootEl: HTMLElement,
): PromiseResult<unknown, string> =>
  pipe5(
    select<HTMLElement>("[data-locate-map]"),
    fromMaybe("Cannot initialize locate section without map element."),
    chain(mapFromElement),
    promiseResultMap(setupLocations(rootEl)),
    promiseResultMap(always("Locate Section Initialized.")),
  )(rootEl);
