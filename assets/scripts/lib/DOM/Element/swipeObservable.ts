import { Observable } from "../../Observable";
import { SwipeEvent } from "../SwipeEvent";

const swipeObservable = (element: Element): Observable<SwipeEvent> => (
  observer,
) => {
  let startX: number;
  let startY: number;
  let startTime: number;

  const onTouchStart = (event: TouchEvent) => {
    event.preventDefault();

    const { pageX, pageY } = event.changedTouches[0];

    startX = pageX;
    startY = pageY;
    startTime = new Date().getTime();
  };

  const onTouchMove = (event: TouchEvent) => {
    event.preventDefault();
  };

  const onTouchEnd = (event: TouchEvent) => {
    event.preventDefault();

    const endTime = new Date().getTime();
    const duration = endTime - startTime;

    const { pageY, pageX } = event.changedTouches[0];

    const deltaY = pageY - startY;
    const deltaX = pageX - startX;

    observer({
      duration,
      deltaX,
      deltaY,
    });
  };

  element.addEventListener("touchstart", onTouchStart);
  element.addEventListener("touchmove", onTouchMove);
  element.addEventListener("touchend", onTouchEnd);
};

export default swipeObservable;
