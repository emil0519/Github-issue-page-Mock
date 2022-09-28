export function hourAdder(numOfHours: number, date = new Date()) {
  date.setHours(date.getHours() + numOfHours);
  return date;
}

// 👇️ Subtract 1 hour from the current date
// const result = hourAdder(1);

// 👇️ Subtract 2 hours from another date
// const date = new Date("2022-09-28T09:38:48");

// 👇️ Wed Apr 27 2022 06:30:10
// console.log(hourAdder(8, date));
