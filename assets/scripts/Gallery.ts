import { map } from "./lib/Array";
import { failure, Result, success } from "./lib/Result";
import { isNothing } from "./lib/Maybe";
import { select, selectAll, attr, clickObservable } from "./lib/DOM/Element";

export const initialize = (rootEl: HTMLElement): Result<string, string> => {
  const maybeDisplayEl = select<HTMLImageElement>("[data-gallery-display]")(
    rootEl,
  );

  if (isNothing(maybeDisplayEl))
    return failure("Cannot initialize a gallery without a display element");
  const displayEl = maybeDisplayEl.value;

  const thumbnailEls = selectAll<HTMLElement>("[data-gallery-thumbnail]")(
    rootEl,
  );

  map((thumbnailEl: HTMLElement): Result<string, HTMLElement> => {
    const maybeSrc = attr("data-gallery-display-src")(thumbnailEl);

    if (isNothing(maybeSrc)) return failure("Display source missing.");
    const src = maybeSrc.value;

    clickObservable(thumbnailEl)(() => {
      displayEl.src = src;
    });

    return success(thumbnailEl);
  })(thumbnailEls);

  return success("Gallery Initialized");
};
