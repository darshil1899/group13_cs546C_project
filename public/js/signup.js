var name_u = document.getElementById("user_name_1")
var passwrd = document.getElementById("pass_word_1")
var name_f=document.getElementById("first_name_1")
var name_l=document.getElementById("last_name_1")
// var date = document.getElementById("start")
var id_mail = document.getElementById("email_id_1")
var contact = document.getElementById("phone_number_1")
var btn_enter = document.getElementById("enter-btn")
btn_enter.onclick = (event)=>{
    const username_error=document.getElementById("username_error_1")
    const password_error = document.getElementById("password_error_1")
    const firstname_error = document.getElementById("firstname_error_1")
    const lastname_error = document.getElementById("lastname_error_1")   
    const email_error = document.getElementById("email_error_1")
    const phonenumber_error = document.getElementById("phonenumber_error_1")
    var ptn = "^[a-zA-Z0-9]*$"
    var validRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    var user_name= name_u.value
    var pass_word = passwrd.value
    var first_name=name_f.value
    var last_name=name_l.value
    var email_id=id_mail.value
    var contact_info = contact.value
    // let ptn = /^.*(?=.*\d)(?=.*[a-zA-Z]).*$/;
    var phonepattern = /^\d{10}$/;

    if ((first_name.length === 0) || (first_name.trim().length === 0)) 
    {
         firstname_error.innerHTML= 'firstname is empty';
         firstname_error.hidden=false
         lastname_error.hidden=true
         email_error.hidden=true
         phonenumber_error.hidden=true
         password_error.hidden=true 
         username_error.hidden=true   
         event.preventDefault();
     }
     else if ((last_name.length === 0 ) || (last_name.trim().length==0) )
    {
        lastname_error.innerHTML= 'lastname is empty';
        lastname_error.hidden=false
        firstname_error.hidden=true
        email_error.hidden=true
        phonenumber_error.hidden=true
        password_error.hidden=true 
        username_error.hidden=true   
        event.preventDefault();
     }
    else if ((user_name.length === 0) || (user_name.trim().length==0) ) 
    {
        username_error.innerHTML= 'username is empty';
        username_error.hidden=false
        lastname_error.hidden=true
        email_error.hidden=true
        phonenumber_error.hidden=true
        password_error.hidden=true 
        firstname_error.hidden=true   
        event.preventDefault();
     }
     else if ((email_id.length === 0 ) || (email_id.trim().length==0) )
    {
        email_error.innerHTML= 'mail id is empty';
        email_error.hidden=false
        lastname_error.hidden=true
        username_error.hidden=true
        phonenumber_error.hidden=true
        password_error.hidden=true 
        firstname_error.hidden=true   
        event.preventDefault();
     }
     else if ((contact_info.length === 0) || (contact_info.trim().length==0) ) 
    {
        phonenumber_error.innerHTML= 'contact is empty';
        phonenumber_error.hidden=false
        lastname_error.hidden=true
        email_error.hidden=true
        username_error.hidden=true
        password_error.hidden=true 
        firstname_error.hidden=true   
        event.preventDefault();
     }
    else if((pass_word.length === 0) || (pass_word.trim().length==0)){
        password_error.innerHTML= 'password is empty';
        password_error.hidden=false
         lastname_error.hidden=true
         email_error.hidden=true
         phonenumber_error.hidden=true
         firstname_error.hidden=true 
         username_error.hidden=true   
         event.preventDefault();
    } 
    //  else if (user_name.trim().length === 0) 
    // {
    //     username_error.innerHTML= 'username is empty';
    //     username_error.hidden=false
    //     lastname_error.hidden=true
    //     email_error.hidden=true
    //     phonenumber_error.hidden=true
    //     password_error.hidden=true 
    //     firstname_error.hidden=true   
    //     event.preventDefault();
    //  }
     else if (user_name.length<= 3) 
    {
        username_error.innerHTML= 'username has less characters';
        username_error.hidden=false
        lastname_error.hidden=true
        email_error.hidden=true
        phonenumber_error.hidden=true
        password_error.hidden=true 
        firstname_error.hidden=true   
        event.preventDefault();
     }
     else if (pass_word.length<= 5) 
     {
        password_error.innerHTML= 'password has less characters';
        password_error.hidden=false
         lastname_error.hidden=true
         email_error.hidden=true
         phonenumber_error.hidden=true
         firstname_error.hidden=true 
         username_error.hidden=true   
         event.preventDefault();
     }
    //  if (/\s/.test(username))
    //  {
    //      error1.innerHTML= 'username has white spaces';
    //      error2.hidden=true
    //  }
    //  if (/\s/.test(password))
    //  {
    //      throw 'password has white spaces';
    //  }
 
     else if (user_name.match(ptn) == null) {

        username_error.innerHTML= 'username should contain only alphanumeric characters';
        username_error.hidden=false
        lastname_error.hidden=true
        email_error.hidden=true
        phonenumber_error.hidden=true
        password_error.hidden=true 
        firstname_error.hidden=true   
        event.preventDefault();
     }
     else if (contact_info.match(phonepattern)) 
    {
        phonenumber_error.innerHTML= 'Enter the proper contact number';
        phonenumber_error.hidden=false
        lastname_error.hidden=true
        email_error.hidden=true
        username_error.hidden=true
        password_error.hidden=true 
        firstname_error.hidden=true   
        event.preventDefault();
    }
}
