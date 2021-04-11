import { Direction } from "../Physics/Direction";
import { Distance } from "../Physics/Distance";
import { Speed } from "../Physics/Speed";
import { Time } from "../Physics/Time";
import { Velocity } from "../Physics/Velocity";

export type SwipeEvent = {
  duration: Time;
  deltaY: Distance;
  deltaX: Distance;
};

export const duration = ({ duration }: SwipeEvent): Time => duration;

export const distance = ({ deltaY, deltaX }: SwipeEvent): Distance =>
  Math.hypot(deltaX, deltaY);

export const direction = ({ deltaY, deltaX }: SwipeEvent): Direction =>
  Math.atan2(deltaY, deltaX) * (180 / Math.PI);

export const speed = (swipeEvent: SwipeEvent): Speed =>
  distance(swipeEvent) / swipeEvent.duration;

export const velocity = (swipeEvent: SwipeEvent): Velocity => [
  speed(swipeEvent),
  direction(swipeEvent),
];
