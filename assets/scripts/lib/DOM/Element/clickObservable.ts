import { Observable } from "../../Observable";

const clickObservable = (element: HTMLElement): Observable<MouseEvent> => (
  observer,
) => {
  element.addEventListener("click", observer);
};

export default clickObservable;
