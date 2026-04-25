import { formatCurrency } from "../../scripts/utils/money.js";

//This is is a basic test case because 2095 is a normal number.
console.log("test suite: formatCurrency");
console.log("works with 2095");
if (formatCurrency(2095) === "20.95") {
  console.log("passed");
} else {
  console.log("failed");
}

//This is a Tricky Test case because 0 is neither positive or negative.
//This is also known as Edge Cases
console.log("works with 0");
if (formatCurrency(0) === "0.00") {
  console.log("passed");
} else {
  console.log("failed");
}

//This is a tricky Test because 2000.5 is a number that requires some rounding.
//This is also known as Edge Cases
console.log("rounds up to the nearest cents");
if (formatCurrency(2000.5) === "20.01") {
  console.log("passed");
} else {
  console.log("failed");
}
console.log("rounds up to the nearest cents");
if (formatCurrency(2000.4) === "20.00") {
  console.log("passed");
} else {
  console.log("failed");
}
