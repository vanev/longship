import { pipe3 } from "../lib/Function";
import { attr } from "../lib/DOM/Element";
import { Result, success, fromMaybe, map, all, isFailure } from "../lib/Result";
import { Map } from "./Map";

export type Location = {
  element: HTMLElement;
  lat: number;
  lng: number;
  marker: google.maps.Marker;
};

const getCoordinate = (
  key: "latitude" | "longitude",
): ((element: HTMLElement) => Result<string, number>) =>
  pipe3(attr(`data-${key}`), fromMaybe(`Missing ${key}.`), map(parseFloat));

type Coordinates = [number, number];

const coordsFromElement = (element: HTMLElement): Result<string, Coordinates> =>
  all([
    getCoordinate("latitude")(element),
    getCoordinate("longitude")(element),
  ]);

export const fromElement =
  ({ map, pinSrc }: Map) =>
  (element: HTMLElement): Result<string, Location> => {
    const coords = coordsFromElement(element);

    if (isFailure(coords)) return coords;

    const [lat, lng] = coords.value;

    const marker = new google.maps.Marker({
      position: {
        lat,
        lng,
      },
    });

    if (pinSrc.tag === "Just") {
      marker.setIcon({
        url: pinSrc.value,
        scaledSize: new google.maps.Size(45, 45),
      });
    }

    marker.setMap(map);

    element.addEventListener("click", () => {
      element.parentElement
        ?.querySelector("._active")
        ?.classList.remove("_active");

      element.classList.add("_active");

      map.setCenter({ lat, lng });
      map.setZoom(14);
    });

    return success({
      element,
      lat,
      lng,
      marker,
    });
  };
