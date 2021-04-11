import always from "../lib/always";
import { select, selectAll } from "../lib/DOM/Element";
import { pipe, pipe3 } from "../lib/Function";
import { fromArray } from "../lib/NonEmptyArray";
import { fromMaybe, mapFailure } from "../lib/Result";

export const carousel = pipe(
  select<HTMLElement>("[data-carousel]"),
  fromMaybe("Carousel element not found."),
);

export const frame = pipe(
  select<HTMLElement>("[data-carousel-frame]"),
  fromMaybe("Carousel frame element not found."),
);

export const items = pipe3(
  selectAll<HTMLElement>("[data-carousel-item]"),
  fromArray,
  mapFailure(always("Carousel item elements not found.")),
);

export const dots = pipe3(
  selectAll<HTMLElement>("[data-carousel-dot]"),
  fromArray,
  mapFailure(always("Carousel dot elements not found.")),
);
