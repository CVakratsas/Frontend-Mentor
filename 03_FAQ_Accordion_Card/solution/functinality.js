"use strict";

function toggleClass(p, label, arrow) {
  var labels = document.querySelectorAll(".questions");

  // for (var i = 0; i < labels.length; i++) {
  //   var current = document.getElementById("l" + i);
  //   // console.log(labels[i].classList.contains("makeBold"));
  //   // if (labels[i].classList.contains("makeBold")) console.log(" hello there");
  //   if (labels[i].classList.contains("makeBold") && labels[i] != current) {
  //     var str = "a" + i;
  //     console.log(i);
  //     // document.getElementById(str).classList.toggle("hide");
  //   }
  // }

  var p = document.getElementById(p);
  p.classList.toggle("hide");
  var label = document.getElementById(label);
  label.classList.toggle("makeBold");
  var arrow = document.getElementById(arrow);
  arrow.classList.toggle("rotate");

  // labels.forEach((e) => {
  //   if (e !== label) {
  //     e.classList.toggle("hide");
  //   }
  // });
}

function show(ans) {
  var answer = document.getElementById(ans);
  answer.style.display = "block";
}

function hide(ans) {
  var answer = document.getElementById(ans);
  answer.style.display = "none";
}
