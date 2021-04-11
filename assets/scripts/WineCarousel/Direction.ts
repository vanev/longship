export type Direction = "Left" | "Right";

export const fromAngle = (angle: number) =>
  angle > -90 && angle < 90 ? "Right" : "Left";
