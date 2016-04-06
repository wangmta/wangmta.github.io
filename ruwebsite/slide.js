var main = function() {
  /* Push the body and the nav over*/
  $('#sidebar').click(function() {
    $('#slider').animate({ right: "0px"}, 800);

    $('body').animate({ right: "330px" }, 800);
  });

  /* Then push them back */
  $('#close').click(function() {
    $('#slider').animate({ right: "-343px"}, 800);

    $('body').animate({ right: "0px", }, 800);
  });
};


$(document).ready(main);


/*
  $('#sidebar').click(function() {
    var post = $('.status-box').val();
    $('<li>').text(post).prependTo('.posts');
    $('.btn').addClass('disabled'); 
  });
  
  $('.status-box').keyup(function() {
    var postLength = $(this).val().length;
    var charactersLeft = 140 - postLength;
    $('.counter').text(charactersLeft);
  
    if(charactersLeft < 0) {
      $('.btn').addClass('disabled'); 
    }
    else if(charactersLeft == 140) {
      $('.btn').addClass('disabled');
    }
    else {
      $('.btn').removeClass('disabled');
    }
  });
  
  $('.btn').addClass('disabled');
*/