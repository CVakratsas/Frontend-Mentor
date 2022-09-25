function clicked(ans) {
  var radios = document.getElementsByName("questions");

  for (var i = 0; i < radios.length; i++) {
    if (radios[i].checked) {
      var answer = document.getElementById(ans);
      break;
    }
  }
}
