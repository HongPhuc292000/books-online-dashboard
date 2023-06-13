const baseUrl = process.env.REACT_APP_API;

const emailRegex = /^[\w-\\.]+@([\w-]+\.)+[\w-]{2,4}$/;

const monthsKeyValue = [
  { value: 0, key: "january" },
  { value: 1, key: "february" },
  { value: 2, key: "march" },
  { value: 3, key: "april" },
  { value: 4, key: "may" },
  { value: 5, key: "june" },
  { value: 6, key: "july" },
  { value: 7, key: "august" },
  { value: 8, key: "september" },
  { value: 9, key: "october" },
  { value: 10, key: "november" },
  { value: 11, key: "december" },
];

export { emailRegex, baseUrl, monthsKeyValue };
