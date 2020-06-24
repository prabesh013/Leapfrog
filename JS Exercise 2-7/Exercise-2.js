function pattern(num) {
  if (num === 0) {
    return "";
  } else {
    var s = "";
    for (var i = 0; i < num; i++) {
      s = s + "*";
    }
    console.log(s);
    pattern(num - 1);
  }
}

var userInput = prompt();
pattern(Number(userInput));
