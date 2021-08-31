//När användaren skrollar mer än 400px från roten av toppen (t ex html-taggen eller body) så ska tillbaka uppåt-knappen visas
export function showUpButton() {
  if (
      document.body.scrollTop > 400 ||
      document.documentElement.scrollTop > 400
  ) {
      mybutton.style.display = "block";
  } else {
      mybutton.style.display = "none";
  }
  
}

var mybutton = document.querySelector("#upButton");

mybutton.addEventListener("click", backToTop);

window.onscroll = function () {
  showUpButton();
};

function backToTop() {
  document.body.scrollTop = 0; // För Safari
  document.documentElement.scrollTop = 0; // För Chrome, Firefox, IE och Opera
}