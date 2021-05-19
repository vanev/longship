import { just, nothing } from "./index";
import all from "./all";

describe("Maybe.all", () => {
  describe("when all maybes are just", () => {
    it("returns a maybe of an array of the values", () => {
      const maybes = [just(1), just(2), just(3)];

      const actual = all(maybes);

      const expected = just([1, 2, 3]);
      expect(actual).toEqual(expected);
    });
  });

  describe("when any maybe is nothing", () => {
    it("returns a nothing", () => {
      const maybes = [just(1), just(2), nothing];

      const actual = all(maybes);

      const expected = nothing;
      expect(actual).toEqual(expected);
    });
  });
});
