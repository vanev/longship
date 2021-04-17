import { map } from "./lib/Array";
import { selectAll } from "./lib/DOM/Document";
import { isNonEmpty } from "./lib/NonEmptyArray";
import { WineSection, fromElement } from "./WineSection";
import * as BackgroundColorChanger from "./BackgroundColorChanger";
import * as WineCarousel from "./WineCarousel";
import * as ImageHoverSwap from "./ImageHoverSwap";
import * as LocateSection from "./LocateSection";

const wineEls = selectAll<HTMLElement>("section.Wine")(window.document);

const wineSections: Array<WineSection> = map(fromElement)(wineEls);

if (isNonEmpty(wineSections)) {
  BackgroundColorChanger.initialize(wineSections);

  map(WineCarousel.initialize)(wineSections);
}

const imageHoverSwapEls = selectAll<HTMLImageElement>("img[data-hover-swap]")(
  window.document,
);

map(ImageHoverSwap.initialize)(imageHoverSwapEls);

const locateEls = selectAll<HTMLElement>("section.Locate")(window.document);

Promise.all(map(LocateSection.initialize)(locateEls))
  .then((value) => {
    console.log(value);
  })
  .catch((reason) => {
    console.error(reason);
  });
