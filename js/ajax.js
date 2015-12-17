$(document).ready(function(){
  var url = 'http://localhost:3000';
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
      $(".profile-name").html('');
      $(".description").html('');

      var name = data.first_name + ' ' + data.surname;
      var description = data.description;
      var photo = data.profile_picture_file_name;

      $(".profile-name").append("<h2>" + name + "</h2>");
      $(".description").append("<p>" + description + "</p>");
      $(".profile-picture").css("background-image", "url(" + awsurl + photo + ")");

    }).fail(function(){
      console.log("error");
    });
  });

  // UPDATE PROFILE PICTURE
  $("#update-photo").on('submit', function(event){
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

    $fileInput = $('#change-photo');
    reader.readAsDataURL($fileInput[0].files[0]);
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

    $fileInput = $('#change-photo');
    reader.readAsDataURL($fileInput[0].files[0]);

  });

  // LISTINGS INDEX TEMPLATE
  var showListingsTemplate = Handlebars.compile($("#show-listings").html());

  // GET ALL APTS
  $("#find-apt").on('click', function(event){
    event.preventDefault();

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

  // DELETE LISTING

});
