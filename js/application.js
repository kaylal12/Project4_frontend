$(document).ready(function() {

  $("#homepage").on('click', function(){
    $(".home").slideDown();
    $(".profile-page").slideUp();
    $(".find").slideUp();
    $(".create-listing").slideUp();
  });

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
    $(".create-listing").slideUp();
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
  $("#find-apt").on('click', function(){
    $(".home").hide();
    $(".profile-page").slideUp();
    $(".create-listing").slideUp();
  });

  // click edit button to open input field - profile description
  $('.profile-page').on("click", "button[data-type=edit]", function(event) {
    $(event.target).parent().parent().children().children(".list-name").hide();
    $(event.target).parent().parent().children().children(".list-input").show();
  });

  // click edit button to open input fields - listings
  $('.profile-page').on("click", "button[data-type=edit-profile]", function(event) {
    $(event.target).parent().parent().children().children(".profile").hide();
    $(event.target).parent().parent().children().children().children(".profile").hide();
    $(event.target).parent().parent().children().children().children(".profile-input").show();
  });

});
