import { Loader } from "@googlemaps/js-api-loader";
import { pipe4 } from "../lib/Function";
import { attr } from "../lib/DOM/Element";
import { Maybe } from "../lib/Maybe";
import {
  PromiseResult,
  fromMaybe,
  fromPromise,
  chain,
  map,
} from "../lib/PromiseResult";

export type Map = {
  element: HTMLElement;
  map: google.maps.Map;
  pinSrc: Maybe<string>;
};

const mapOptions: google.maps.MapOptions = {
  center: { lat: 40.73237288517519, lng: -73.99710594765148 },
  zoom: 7,
  disableDefaultUI: true,
  zoomControl: true,
};

const loadFromApiKey = (apiKey: string): PromiseResult<unknown, void> =>
  fromPromise(new Loader({ apiKey, version: "weekly" }).load());

export const fromElement = (
  element: HTMLElement,
): PromiseResult<unknown, Map> =>
  pipe4(
    attr("data-api-key"),
    fromMaybe("Cannot initialize map without Google Maps API key."),
    chain(loadFromApiKey),
    map(() => ({
      element,
      map: new google.maps.Map(element, mapOptions),
      pinSrc: attr("data-pin-src")(element),
    })),
  )(element);
