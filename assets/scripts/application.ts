import { map } from "./lib/Array";
import { WineSection, fromElement } from "./WineSection";
import * as BackgroundColorChanger from "./BackgroundColorChanger";

const wineEls = Array.from(
  window.document.querySelectorAll<HTMLElement>("section.Wine"),
);

const wineSections: Array<WineSection> = map(fromElement)(wineEls);

BackgroundColorChanger.initialize(wineSections);
