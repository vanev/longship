import { range, fromArrayLength, contains } from "./Range";

describe("Range.fromArrayLength", () => {
  it("creates a range from zero the length of the given array", () => {
    const array = [1, 2, 3, 4];

    const actual = fromArrayLength(array);

    const expected = range(0, 4);
    expect(actual).toEqual(expected);
  });
});

describe("Range.contains", () => {
  describe("when the given value is in the range", () => {
    it("returns true", () => {
      const actual = contains(5)(range(2, 8));

      expect(actual).toBe(true);
    });
  });

  describe("when the given value is not in the range", () => {
    it("returns false", () => {
      const actual = contains(20)(range(2, 8));

      expect(actual).toBe(false);
    });
  });
});
