import { map } from "./lib/Array";
import { select, selectAll } from "./lib/DOM/Document";
import { isNonEmpty } from "./lib/NonEmptyArray";
import { isJust } from "./lib/Maybe";
import { WineSection, fromElement } from "./WineSection";
import * as BackgroundColorChanger from "./BackgroundColorChanger";
import * as WineCarousel from "./WineCarousel";
import * as ImageHoverSwap from "./ImageHoverSwap";
import * as LocateSection from "./LocateSection";
import * as NumberInput from "./NumberInput";
import * as WinesHeaderSubmenu from "./WinesHeaderSubmenu";

const wineEls = selectAll<HTMLElement>("section.Wine")(window.document);

const wineSections: Array<WineSection> = map(fromElement)(wineEls);

if (isNonEmpty(wineSections)) {
  BackgroundColorChanger.initialize(wineSections);

  map(WineCarousel.initialize)(wineSections);
}

const winesMenuItemEl = select<HTMLAnchorElement>(
  "header#shopify-section-header nav a[href='/']",
)(window.document);

if (isNonEmpty(wineSections) && isJust(winesMenuItemEl)) {
  WinesHeaderSubmenu.initialize(
    window.document,
    winesMenuItemEl.value,
    wineSections,
  );
}

const imageHoverSwapEls = selectAll<HTMLImageElement>("img[data-hover-swap]")(
  window.document,
);

map(ImageHoverSwap.initialize)(imageHoverSwapEls);

const locateEls = selectAll<HTMLElement>("section.Locate")(window.document);

map(LocateSection.initialize)(locateEls);

const numberInputEls = selectAll<HTMLElement>("[data-number-input]")(
  window.document,
);

map(NumberInput.initialize)(numberInputEls);
