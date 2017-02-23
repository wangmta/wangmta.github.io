var i, c, txt ="";
function returntxt() {
  for (var i = 0; i < name.lenght; i++) {
    c = name[i];
    if (i % 2 === 0) {
      c = name[i].toUpperCase()
    }
    txt += c;
  }
  return txt;
}