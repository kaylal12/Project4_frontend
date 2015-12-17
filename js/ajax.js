$(document).ready(function(){
  var url = 'http://localhost:3000';
  var id = '';
  var token = '';

  // REGISTER
  // not working with attached file; works without paperclip in profile
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
      $(".home").show();
      $(".loggedin-links").hide();
      $("#login").show();
      $("#signup").show();
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
      $(".home").hide();
      $(".profile-page").show();

      var name = data.first_name + ' ' + data.surname;
      var description = data.description;

      $(".profile-name").append("<h2>" + name + "</h2>");
      $(".description").append("<p>" + description + "</p>");

    }).fail(function(){
      console.log("error");
    });
  });

  // UPDATE PROFILE PICTURE

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
      $(".home").hide();

      // var templateTarget = $('#show-listings').html();
      // var template = Handlebars.compile(templateTarget);
      var content = showListingsTemplate(data);
      $('#apts').html(content);

      // var newHTML = data.map(showListingsTemplate).reduce(function(a,b){return a + b;});

      // $("#apts").html(newHTML);
    }).fail(function(){
      console.log("error");
    });
  });

  // UPDATE LISTING

  // DELETE LISTING

});
