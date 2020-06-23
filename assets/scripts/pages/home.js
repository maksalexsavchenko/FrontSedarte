/* eslint-disable */

let home = {
  init() {
    this.menu();
  },
  menu() {
    console.log('menu');
  }
}

$(document).ready(function () {
  home.init();
})


$(document).ready(function(){
  $(".hamburger").click(function(){
    $(this).stop().toggleClass("is-active");
  });
});

$(document).ready(function(){
  $(".hamburger").click(function(){
    $("#sedarte-menu ul").slideToggle();
  });
});

$(document).ready(function(){
  $(".hamburger").hover(function(){
    $(".header__menu-item a ::after").slideToggle();
  });
});

$(document).ready(function(){
  $(".btn").click(function(){
    $(".home-text").slideToggle();
  });
});





