import { average } from "chroma-js";
import { map, traversePairs } from "./lib/Array";
import { select } from "./lib/DOM/Document";
import { isJust } from "./lib/Maybe";
import { makePair } from "./lib/Pair";
import { WineSection, color, weight } from "./WineSection";

const headerElement = select<HTMLElement>("header.Header")(window.document);

const setBackground = (wineSections: Array<WineSection>) => () => {
  const pairs = map(makePair(color, weight(window.innerHeight)))(wineSections);

  const [colors, weights] = traversePairs(pairs);

  const finalColor = average(colors, "lrgb", weights).hex();

  window.document.body.style.backgroundColor = finalColor;

  if (isJust(headerElement)) {
    headerElement.value.style.backgroundColor = finalColor;
  }
};

export const initialize = (wineSections: Array<WineSection>) => {
  window.addEventListener("scroll", () =>
    window.requestAnimationFrame(setBackground(wineSections)),
  );

  setBackground(wineSections)();

  wineSections.forEach((wineSection) => {
    wineSection.rootElement.style.backgroundColor = "transparent";
  });
};
