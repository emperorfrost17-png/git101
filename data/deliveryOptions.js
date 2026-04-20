import dayjs from "https://unpkg.com/dayjs@1.11.10/esm/index.js";

export const deliveryOptions = [
  {
    id: "1",
    deliveryDays: 7,
    priceCents: 0,
  },
  {
    id: "2",
    deliveryDays: 3,
    priceCents: 499,
  },
  {
    id: "3",
    deliveryDays: 1,
    priceCents: 999,
  },
];

export function getDeliveryOption(deliveryOptionId) {
  let deliveryOption;

  // The cart item only stores the chosen delivery option id, so we loop
  // through deliveryOptions to find the full object and save it in
  // deliveryOption. After that, we can use properties like deliveryDays.
  deliveryOptions.forEach((option) => {
    if (option.id === deliveryOptionId) {
      deliveryOption = option;
    }
  });
  return deliveryOption || deliveryOptions[0];
}

function isWeekend(date) {
  // "dddd" turns the date into a day name like "Monday" or "Saturday".
  const dayOfWeek = date.format("dddd");

  // Return true only for Saturday or Sunday.
  return dayOfWeek === "Saturday" || dayOfWeek === "Sunday";
}

export function calculateDeliveryDate(deliveryOption) {
 // Start with the number of delivery days from the selected option.
  let remainingDays = deliveryOption.deliveryDays;

  // Start counting from today.
  let deliveryDate = dayjs();

  // Move forward one day at a time until we have counted
  // all the delivery days we need.
  while (remainingDays > 0) {
    deliveryDate = deliveryDate.add(1, "day");

    // Only weekdays count as delivery days, so skip weekends.
    if (!isWeekend(deliveryDate)) {
      remainingDays--;
    }
  }

  // Turn the final date into readable text for the page.
  const dateString = deliveryDate.format("dddd, MMMM D");

  return dateString;
}