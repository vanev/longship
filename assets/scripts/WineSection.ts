import always from "./lib/always";
import { select } from "./lib/DOM/Element";
import { extract } from "./lib/Maybe";

export type WineSection = {
  rootElement: HTMLElement;
  color: string;
};

const extractColor = extract<HTMLInputElement, string>(
  (element) => element.value,
  always("#ffffff"),
);

export const fromElement = (rootElement: HTMLElement): WineSection => {
  const selector = "[data-attr='background']";
  const backgroundEl = select<HTMLInputElement>(selector)(rootElement);
  const color = extractColor(backgroundEl);

  return {
    rootElement,
    color,
  };
};

export const color = (section: WineSection): string => section.color;

export const weight = (viewportHeight: number) => (
  section: WineSection,
): number => {
  const { top, bottom, height } = section.rootElement.getBoundingClientRect();

  if (bottom <= 0 || top >= viewportHeight) return 0;

  if (top <= 0) return bottom / viewportHeight;

  if (bottom >= viewportHeight) return (viewportHeight - top) / viewportHeight;

  return height / viewportHeight;
};
