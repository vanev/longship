import { swipeObservable } from "../lib/DOM/Element";
import { duration, distance, direction } from "../lib/DOM/SwipeEvent";
import { pipe, pipe4 } from "../lib/Function";
import { filter, map } from "../lib/Observable";
import { fromAngle } from "./Direction";

const MAX_DURATION = 400;
const MIN_DISTANCE = 100;

const swipeDirectionObservable = pipe4(
  swipeObservable,
  filter((event) => duration(event) < MAX_DURATION),
  filter((event) => distance(event) > MIN_DISTANCE),
  map(pipe(direction, fromAngle)),
);

export default swipeDirectionObservable;
