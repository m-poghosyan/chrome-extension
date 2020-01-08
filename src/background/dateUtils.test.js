const { lessThanSeveralMinutesAgo } = require("./dateUtils");

const testData = [
  { input: null, expected: false },
  { input: undefined, expected: false },
  { input: false, expected: false },
  { input: "", expected: false },
  { input: "2016-09-15", expected: false },
  { input: Date.now(), expected: true },
  { input: Date.now() + 1, expected: true },
  { input: Date.now() - 1, expected: true },
  { input: Date.now() - 1000 * 60 * 1, expected: true },
  { input: Date.now() - 1000 * 60 * 5, expected: true },
  { input: Date.now() - 1000 * 60 * 9, expected: true },
  { input: Date.now() - 1000 * 60 * 11, expected: false },
  { input: Date.now() - 1000 * 60 * 60, expected: false },
  { input: Date.now() - 1000 * 60 * 60 * 24, expected: false },
  { input: Date.now() - 1000 * 60 * 60 * 24 * 30, expected: false },
  { input: Date.now() - 1000 * 60 * 60 * 24 * 30 * 12, expected: false }
];

describe("dateUtils.js", () => {
  describe("lessThanSeveralMinutesAgo", () => {
    testData.forEach(test => {
      it(`when shop domain is ${test.input}`, () => {
        const result = lessThanSeveralMinutesAgo(test.input);
        expect(result).toBe(test.expected);
      });
    });
  });
});
