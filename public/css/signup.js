// var username = document.getElementById("username")
// var password = document.getElementById("password")
// var firstname=document.getElementById("firstname")
// var lastname=document.getElementById("lastname")
// var city=document.getElementById("city")
// var date = document.getElementById("start")
// var email = document.getElementById("email")
// var city = document
// var btnsubmit = document.getElementById("Btnsubmit")
// btnsubmit.onclick = (event)=>{
//     const username_error=document.getElementById("username_error")
//     const password_error = document.getElementById("password_error")
//     const firstname_error = document.getElementById("firstname_error")
//     const lastname_error = document.getElementById("lastname_error")    
//     const city_error = document.getElementById("city_error")
//     const email_error = document.getElementById("email_error")
//     const phonenumber_error = document.getElementById("phonenumber_error")
//     var username_error= username.value
//     var password_error = password.value
//     if (firstname.length === 0 ) 
//     {
//          firstname_error.innerHTML= 'firstname is empty';
//          firstname_error.hidden=false
//          lastname_error.hidden=true
//          email_error.hidden=true
//          city_error.hidden=true
//          phonenumber_error.hidden=true
//          password_error.hidden=true 
//          username_error.hidden=true   
//          event.preventDefault();
//      }
//      else if (lastname.length === 0 ) 
//     {
//         lastname_error.innerHTML= 'lastname is empty';
//         lastname_error.hidden=false
//         firstname_error.hidden=true
//         email_error.hidden=true
//         city_error.hidden=true
//         phonenumber_error.hidden=true
//         password_error.hidden=true 
//         username_error.hidden=true   
//         event.preventDefault();
//      }
//     else if (username.length === 0 ) 
//     {
//         username_error.innerHTML= 'firstname is empty';
//         username_error.hidden=false
//         lastname_error.hidden=true
//         email_error.hidden=true
//         city_error.hidden=true
//         phonenumber_error.hidden=true
//         password_error.hidden=true 
//         firstname_error.hidden=true   
//         event.preventDefault();
//      }
//     else if(password.length === 0){
//         password_error.innerHTML= 'password is empty';
//         password_error.hidden=false
//          lastname_error.hidden=true
//          email_error.hidden=true
//          city_error.hidden=true
//          phonenumber_error.hidden=true
//          firstname_error.hidden=true 
//          username_error.hidden=true   
//          event.preventDefault();
//     } 
//      else if (username.trim().length === 0) 
//     {
//         username_error.innerHTML= 'username is empty';
//         username_error.hidden=false
//         lastname_error.hidden=true
//         email_error.hidden=true
//         city_error.hidden=true
//         phonenumber_error.hidden=true
//         password_error.hidden=true 
//         firstname_error.hidden=true   
//         event.preventDefault();
//      }
//      else if (username.length<= 3) 
//     {
//         username_error.innerHTML= 'username has less characters';
//         username_error.hidden=false
//         lastname_error.hidden=true
//         email_error.hidden=true
//         city_error.hidden=true
//         phonenumber_error.hidden=true
//         password_error.hidden=true 
//         firstname_error.hidden=true   
//         event.preventDefault();
//      }
//      else if (password.length<= 5) 
//      {
//         error2.innerHTML= 'password has less characters';
//         error1.hidden=true
//         error1.hidden=false
//         event.preventDefault();
//      }
//     //  if (/\s/.test(username))
//     //  {
//     //      error1.innerHTML= 'username has white spaces';
//     //      error2.hidden=true
//     //  }
//     //  if (/\s/.test(password))
//     //  {
//     //      throw 'password has white spaces';
//     //  }
 
//      let ptn = "^[a-zA-Z0-9]*$"
//      // let ptn = /^.*(?=.*\d)(?=.*[a-zA-Z]).*$/;
//      if (username.match(ptn) == null) {
//          error1.innerHTML =  'username should contain only alphanumeric characters';
//          error1.hidden = false
//          error2.hidden =true
//          event.preventDefault();
//      }
 
// }
