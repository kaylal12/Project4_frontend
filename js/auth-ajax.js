$(document).ready(function(){
  var url = 'http://localhost:3000';
  var id = '';
  var token = '';

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
    }).fail(function(){
      console.log("error");
    });
  });

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

});
