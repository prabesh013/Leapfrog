var numbers = [1, 2, 3, 4];

function transform(collection, tranFunc) {
  var arr = [];
  var len = collection.length;
  for (var i = 0; i < len; i++) {
    arr.push(tranFunc(collection[i]));
  }
  return arr;
}

var output = transform(numbers, function (num) {
  return num * 2;
});
console.log(output);
