var fruits = [
  { id: 1, name: "banana", color: "yellow" },
  { id: 2, name: "apple", color: "red" },
];

// function searchByName(obj, fruitName) {
//   obj.forEach(function (fruit) {
//     if (fruit.name.toLowerCase() === fruitName.toLowerCase()) {
//       return fruit;
//     }
//     return "not found";
//   });
// }
function searchByName(obj, fruitName) {
  var len = obj.length;
  for (var i = 0; i < len; i++) {
    if (obj[i].name.toLowerCase() === fruitName.toLowerCase()) {
      return obj[i];
    }
  }
  return "Not Found";
}
function searchByKey(obj, key, value) {
  var len = obj.length;
  for (var i = 0; i < len; i++) {
    if (obj[i][key] === value) {
      return obj[i];
    }
  }
  return "Not Found";
}

console.log(searchByName(fruits, "apple"));
console.log(searchByKey(fruits, "name", "apple"));
console.log(searchByKey(fruits, "id", 1));
