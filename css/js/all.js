$(document).ready(function() {
   $('.hamburger').on('click',  function(e){
      e.preventDefault();
      $('.menu').toggleClass('show-menu');
  });
});