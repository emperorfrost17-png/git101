import { formatCurrency } from "../scripts/utils/money.js";

//This is to create a Test Suite
//in case you forgot a Test suite is a collection of related test cases grouped together
//describe() can take two parameters
describe("Test suite: formatCurrency", () => {
  //it() is to create a test
  it("converts cents into dollars", () => {
    //expect() lets us compare a value to another value
    //.toEqual() is obviously for comparing to values or variables and etc
    expect(formatCurrency(2095)).toEqual("20.95");
  });
  it("Works with 0", () => {
    expect(formatCurrency(0)).toEqual("0.00");
  });
  it("rounds up to the nearest cents", () => {
    expect(formatCurrency(2000.5)).toEqual("20.01");
  });
});
