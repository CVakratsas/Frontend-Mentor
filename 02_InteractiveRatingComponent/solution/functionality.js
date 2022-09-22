function submit() {
  var radios = document.getElementsByName("rating");

  for (var i = 0, length = radios.length; i < length; i++) {
    if (radios[i].checked) {
      var span = document.getElementById("choice");
      span.innerHTML = radios[i].value;
      break;
    }
  }
}

function change_div() {
  var rating_box = document.querySelector(".rating_box");
  var thank_you_box = document.querySelector(".thank_you_box");
  submit();
  rating_box.style.display = "none";
  thank_you_box.style.display = "flex";
}
