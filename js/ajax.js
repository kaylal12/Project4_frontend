$(document).ready(function(){
  var url = 'https://agile-brook-1884.herokuapp.com';
  // var url = 'http://localhost:3000';
  var awsurl = 'https://s3.amazonaws.com/wdi-project4/images/medium/';
  var id = '';
  var token = '';

  // REGISTER
  $("#register").on('submit', function(event) {
    event.preventDefault();

    $.ajax({
      method: 'POST',
      url: url + '/register',
      data: JSON.stringify({
        credentials: {
          email: $("#email").val(),
          password: $("#password").val(),
          password_confirmation: $("#password_confirmation").val()
        },
        profile: {
          first_name: $("#first_name").val(),
          surname: $("#surname").val()
        }
      }),
      contentType: 'application/json'
    }).done(function(){
      console.log("success");
      $("#register").hide();
      $(".complete-registration").fadeIn();
    }).fail(function(){
      console.log("error");
    });
  });

  // LOGIN
  $("#login").on('submit', function(event) {
    event.preventDefault();

    $.ajax({
      method: 'POST',
      url: url + '/login',
      data: JSON.stringify({
        credentials: {
          email: $("#login-email").val(),
          password: $("#login-password").val()
        }
      }),
      contentType: 'application/json'
    }).done(function(data){
      token = data.user.token;
      id = data.user.id;
      $("#login").hide();
      $("#signup").hide();
      $(".loggedin-links").show();

      $('#login').each(function(){
            this.reset();
          });
    }).fail(function(){
      console.log("error");
    });
  });

  // LOGOUT
  $("#logout").on('click', function(event) {
    event.preventDefault();

    $.ajax({
      method: 'DELETE',
      url: url + '/logout/' + id,
      headers: {
        Authorization: 'Token token=' + token
      }
    }).done(function(){
      $(".home").slideDown();
      $(".loggedin-links").hide();
      $("#login").show();
      $("#signup").show();
      $(".profile-page").slideUp();
      $(".find").slideUp();
      $(".create-listing").slideUp();
    }).fail(function(){
      console.log("error");
    });
  });

  // SHOW PROFILE
  $("#profile").on('click', function(event){
    event.preventDefault();

    // LISTINGS INDEX TEMPLATE
    var showProfileTemplate = Handlebars.compile($("#show-profile").html());

    $.ajax({
      method: 'GET',
      url: url + '/profiles/' + id,
      dataType: 'json',
      headers: {
        Authorization: 'Token token=' + token
      }
    }).done(function(data){
      console.log(data);
      $(".profile-page").slideDown();

      var content = showProfileTemplate(data);
      $('.profile-page').html(content);
    }).fail(function(){
      console.log("error");
    });
  });

  // UPDATE PROFILE PICTURE
  $(".profile-page").on('click', 'button[data-type=update-photo]', function(event){
    event.preventDefault();
    var reader = new FileReader();

    reader.onload = function(event){
      $.ajax({
        method: 'PATCH',
        url: url + '/profiles/' + id,
        data: {
          profile: {
            profile_picture: event.target.result
          }
        },
        headers: {
          Authorization: 'Token token=' + token
        },
      }).done(function(data){
        // returns undefined
        console.log(data);
      }).fail(function(){
        console.log('fail');
      });
    };

    $fileInput = $('#new-photo');
    reader.readAsDataURL($fileInput[0].files[0]);
  });

  // UPDATE PROFILE DESCRIPTION
  $('.profile-page').on('click', 'button[data-type=save-desc]', function(event){
    event.preventDefault();
    var profileId = $(this).data("id");
    console.log(profileId);

    $.ajax({
      method: 'PATCH',
      url: url + '/profiles/' + profileId,
      headers: {
        Authorization: 'Token token=' + token
      },
      contentType: 'application/json',
      data: JSON.stringify({
        profile: {
          description: $('[data-field=description][data-id=' + profileId + ']').val()
        }
      }),
      dataType: 'json'
    }).done(function(data){
      $(event.target).parent().parent().children().children(".profile").show();
      $(event.target).parent().parent().children().children().children(".profile").hide();
      $(event.target).parent().parent().children().children().children(".profile-input").hide();
    }).fail(function(){
      console.log('error');
    });
  });

  // CREATE LISTING
  $("#listing").on('submit', function(event){
    event.preventDefault();
    var reader = new FileReader();

    reader.onload = function(event){
      $.ajax({
      method: 'POST',
      url: url + '/listings',
      data: {
        listings: {
          title: $("#title").val(),
          address: $("#address").val(),
          description: $("#description").val(),
          bedrooms: $("#bedrooms").val(),
          bathrooms: $("#bathrooms").val(),
          price: $("#price").val(),
          image: event.target.result
        }
      },
      headers: {
        Authorization: 'Token token=' + token
      }
      }).done(function(){
        console.log("success");

        $("#listing").fadeOut();
        $(".complete-listing").fadeIn();
      }).fail(function(){
        console.log("error");
      });
    };

    $fileInput = $('#image');
    reader.readAsDataURL($fileInput[0].files[0]);

  });

  // GET ALL APTS
  $("#find-apt").on('click', function(event){
    event.preventDefault();

    // LISTINGS INDEX TEMPLATE
    var showListingsTemplate = Handlebars.compile($("#show-listings").html());

    $.ajax({
      method: 'GET',
      url: url + '/listings',
      dataType: 'json'
    }).done(function(data){
      console.log(data);
      $(".find").slideDown();

      var content = showListingsTemplate(data);
      $('#apts').html(content);
    }).fail(function(){
      console.log("error");
    });
  });

  // UPDATE LISTING
  $('.profile-page').on('click', 'button[data-type=save]', function(event){
    event.preventDefault();
    var listingId = $(this).data("id");

    $.ajax({
      method: 'PATCH',
      url: url + '/listings/' + listingId,
      headers: {
        Authorization: 'Token token=' + token
      },
      contentType: 'application/json',
      data: JSON.stringify({
          listings: {
            title: $('[data-field=title][data-id=' + listingId + ']').val(),
            address: $('[data-field=address][data-id=' + listingId + ']').val(),
            description: $('[data-field=description][data-id=' + listingId + ']').val(),
            bedrooms: $('[data-field=bedrooms][data-id=' + listingId + ']').val(),
            bathrooms: $('[data-field=bathrooms][data-id=' + listingId + ']').val(),
            price: $('[data-field=price][data-id=' + listingId + ']').val()
          }
      }),
      dataType: 'json'
    }).done(function(data){
      $(event.target).parent().parent().children().children(".list-name").show();
      $(event.target).parent().parent().children().children(".list-input").hide();
    }).fail(function(){
      console.log('error');
    });
  });

  // DELETE LISTING
  $('.profile-page').on('click', 'button[data-type=delete]', function(event) {
        event.preventDefault();
        var listingId = $(this).data("id");

        $.ajax({
          method: 'DELETE',
          url: url + '/listings/' + listingId,
          headers: {
            Authorization: 'Token token=' + token
          },
          contentType: 'application/json',
          dataType: 'json'
        }).done(function(){
          $(event.target).parent().parent().children().children(".list-name").hide();
          $(event.target).parent().parent().children().children(".img").hide();
        }).fail(function(){
          console.log("error");
        });
      });

});
