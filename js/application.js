$(document).ready(function() {

  // opens registration box
  $("#signup").on('click', function(){
    $(".register-wrapper").fadeIn();
  });

  // closes registration box
  $(".close").on('click', function(){
    $(".register-wrapper").fadeOut();
  });

  // opens profile page, hides other pages
  $("#profile").on('click', function(){
    $(".home").hide();
    $("#listing-apt").hide();
    $(".find").hide();
  });

  // opens create form, hides other pages
  $("#list-apt").on('click', function(){
    $(".home").hide();
    $(".profile-page").hide();
    $(".find").hide();
    $(".create-listing").slideDown();
  });

  // opens listings, hides other pages
  $(".find").on('click', function(){
    $(".home").hide();
    $(".profile-page").hide();
    $("#list-apt").hide();
  });

   // edit photo functionality
  $("#edit").click(function(){
    $("#change-photo").trigger('click');
  });

});
