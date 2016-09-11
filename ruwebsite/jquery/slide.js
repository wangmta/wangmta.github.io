var main = function() {
    $('#contactuslink').click(function() {
      $('#slider').slideDown(500);
      $('#scrollbox').slideUp(300);
    });

    $('#close').click(function() {
      $('#slider').slideUp(500);
    });

    $('#versionlink').click(function() {
      $('#scrollbox').slideDown(500);
      $('#slider').slideUp(300);
    });

    $('#close1').click(function() {
      $('#scrollbox').slideUp(500);
    });

    $('#close , #close1').hover(function(){
      $(this).toggleClass('activate');
    });
};

$(document).ready(main);

