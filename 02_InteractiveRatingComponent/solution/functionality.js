(function () {
  document.querySelector(".thank_you_box").style = "none";
})();

function submit() {
  var radios = document.getElementsByName("rating");

  for (var i = 0, length = radios.length; i < length; i++) {
    if (radios[i].checked) {
      console.log(radios[i].value);
      break;
    }
  }
}

function change_div() {
  var rating_box = document.querySelector(".rating_box");
  var thank_you_box = document.querySelector(".thank_you_box");
  rating_box.style.display = "none";
  thank_you_box.style.display = "block";
}

// (function () {
//   //   document.querySelector(".thank_you_box").style = "none";
//   console.log("HELLO");
// })();
