import { map } from "./lib/Array";
import { NonEmptyArray } from "./lib/NonEmptyArray";
import { Result, success } from "./lib/Result";
import { WineSection } from "./WineSection";

const convertRootEl = (
  rootEl: HTMLAnchorElement,
): Result<string, HTMLAnchorElement> => {
  rootEl.removeAttribute("href");
  rootEl.classList.add("_submenu");
  rootEl.innerText = "";

  return success(rootEl);
};

const createCheckboxEl = (doc: Document): HTMLInputElement => {
  const checkboxEl = doc.createElement("input");
  checkboxEl.setAttribute("type", "checkbox");
  checkboxEl.className = "Header-MainMenu-SubmenuToggle";
  checkboxEl.id = "header_submenu_wines_toggle";

  return checkboxEl;
};

const createLabelEl =
  (doc: Document) =>
  (text: string): HTMLLabelElement => {
    const labelEl = doc.createElement("label");
    labelEl.className = "Header-MainMenu-SubmenuLabel";
    labelEl.innerHTML = text;
    labelEl.htmlFor = "header_submenu_wines_toggle";

    return labelEl;
  };

const createSubmenuEl = (doc: Document): HTMLDivElement => {
  const submenuEl = doc.createElement("div");
  submenuEl.className = "Header-MainMenu-Submenu";

  return submenuEl;
};

const wineSectionToSubmenuItemEl =
  (doc: Document) =>
  (wineSection: WineSection): HTMLAnchorElement => {
    const submenuItemEl = doc.createElement("a");
    submenuItemEl.href = `#${wineSection.rootElement.id}`;
    submenuItemEl.className = "Header-MainMenu-Submenu-Item";
    submenuItemEl.innerHTML = wineSection.name;

    const imageEl = doc.createElement("img");
    imageEl.src = wineSection.menuHoverImage;
    imageEl.className = "Header-MainMenu-Submenu-Item-Image";

    submenuItemEl.append(imageEl);

    return submenuItemEl;
  };

export const initialize = (
  doc: Document,
  rootEl: HTMLAnchorElement,
  wineSections: NonEmptyArray<WineSection>,
): Result<string, string> => {
  const labelText = rootEl.innerText;

  convertRootEl(rootEl);

  const checkboxEl = createCheckboxEl(doc);
  rootEl.append(checkboxEl);

  const labelEl = createLabelEl(doc)(labelText);
  rootEl.append(labelEl);

  const submenuEl = createSubmenuEl(doc);
  rootEl.append(submenuEl);

  const submenuItemEls = map(wineSectionToSubmenuItemEl(doc))(wineSections);

  submenuEl.append(...submenuItemEls);

  return success("Wines Header Submenu Initialized");
};
