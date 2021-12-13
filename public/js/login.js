$("#login-form").submit((event) => {
  event.preventDefault();
  let username = $("#username").val();
  let password = $("#password").val();
  let requestConfig = {
    method: "POST",
    url: "/doctorsusers/ajax/login",
    data: { username: username, password: password },
  };
  $.ajax(requestConfig).then((message) => {
    location.href = "/doctorsusers/private";
  });
});
