$(document).ready(function() {

  // opens registration box
  $("#signup").on('click', function(){
    $(".register-wrapper").fadeIn();
  });

  // closes registration box
  $(".close").on('click', function(){
    $(".register-wrapper").fadeOut();
  });

  $("#list-apt").on('click', function(){
    $(".home").hide();
    $(".create-listing").slideDown();
  });

});
