import always from "./lib/always";
import { select } from "./lib/DOM/Element";
import { extract } from "./lib/Maybe";

export type WineSection = {
  rootElement: HTMLElement;
  color: string;
  id: string;
  name: string;
};

const extractColor = extract<HTMLInputElement, string>(
  (element) => element.value,
  always("#ffffff"),
);

const extractName = extract<HTMLInputElement, string>(
  (element) => element.value,
  always("Unknown"),
);

export const fromElement = (rootElement: HTMLElement): WineSection => {
  const id = rootElement.id;
  const backgroundEl = select<HTMLInputElement>("[data-attr='background']")(
    rootElement,
  );
  const color = extractColor(backgroundEl);
  const nameEl = select<HTMLInputElement>("[data-attr='name']")(rootElement);
  const name = extractName(nameEl);

  return {
    rootElement,
    color,
    id,
    name,
  };
};

export const color = (section: WineSection): string => section.color;

export const weight =
  (viewportHeight: number) =>
  (section: WineSection): number => {
    const { top, bottom, height } = section.rootElement.getBoundingClientRect();

    if (bottom <= 0 || top >= viewportHeight) return 0;

    if (top <= 0) return bottom / viewportHeight;

    if (bottom >= viewportHeight)
      return (viewportHeight - top) / viewportHeight;

    return height / viewportHeight;
  };
