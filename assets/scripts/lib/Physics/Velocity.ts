import { Speed } from "./Speed";
import { Direction } from "./Direction";

export type Velocity = [Speed, Direction];

export const speed = ([s, _]: Velocity): Speed => s;
export const direction = ([_, d]: Velocity): Direction => d;
