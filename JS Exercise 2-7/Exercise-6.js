var arr = [
  {
    id: 2,
    name: "John",
  },
  {
    id: 1,
    name: "Mary",
  },
  {
    id: 6,
    name: "Andrew",
  },
];
function sortBy(arr, key) {
  len = arr.length;
  for (var i = 0; i < len; i++) {
    for (var j = 0; j < len - i - 1; j++) {
      if (arr[j][key] > arr[j + 1][key]) {
        temp = arr[j];
        arr[j] = arr[j + 1];
        arr[j + 1] = temp;
      }
    }
  }
  return arr;
}
var sorted = sortBy(arr, "id");
console.log(sorted);
