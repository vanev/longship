import { Result, success } from "./lib/Result";

export const initialize = (
  imageEl: HTMLImageElement,
): Result<string, string> => {
  const baseImageUrl = imageEl.src;
  const hoverImageUrl = imageEl.getAttribute("data-hover-swap");

  if (hoverImageUrl) {
    const image = new Image();
    image.src = hoverImageUrl;
  }

  imageEl.addEventListener("mouseenter", () => {
    if (hoverImageUrl) {
      imageEl.src = hoverImageUrl;
    }
  });

  imageEl.addEventListener("mouseleave", () => {
    imageEl.src = baseImageUrl;
  });

  return success("Image Hover Swap Initialized");
};
