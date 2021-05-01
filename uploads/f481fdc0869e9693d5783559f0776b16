mobile_menu_state = false;

window.onscroll = function () {
  var nav = document.getElementById("navbar");
  if (window.pageYOffset > 100) {
    nav.classList.add("whitenav");
  } else {
    nav.classList.remove("whitenav");
  }
};



function showMobile(event) {
  var menu = document.getElementById("mobile-menu");
  if (mobile_menu_state) {
    menu.classList.remove("add");
    menu.classList.add("hide");
    mobile_menu_state = false;
  } else {
    menu.classList.add("show");
    menu.classList.remove("hide");
    mobile_menu_state = true;
  }
}