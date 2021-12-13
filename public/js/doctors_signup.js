var username = document.getElementById("user")
var password = document.getElementById("pass")
var btnsubmit = document.getElementById("final_btn") 
console.log(btnsubmit)
btnsubmit.onclick = (event)=>{
    const error1=document.getElementById("user_error")
    const error2 = document.getElementById("pass_error")
    var username1= username.value
var password1 = password.value
    if (username1.length === 0 ) 
    {
         error1.innerHTML= 'username is empty';
         error2.hidden=true
         error1.hidden=false
         event.preventDefault();
     }
    else if(password1.length === 0){
        error2.innerHTML="password is empty"
        error1.hidden=true
        error2.hidden=false
        event.preventDefault();
    } 
     else if (username1.trim().length === 0) 
    {
        error1.innerHTML= 'username is empty';
        error2.hidden=true
        error1.hidden=false
        event.preventDefault();
     }
     else if (username1.length<= 3) 
    {
        error1.innerHTML= 'username has less characters';
        error2.hidden=true
        error1.hidden=false
        event.preventDefault();
     }
     else if (password1.length<= 5) 
     {
        error2.innerHTML= 'password has less characters';
        error1.hidden=true
        error2.hidden=false
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
 
     let ptn = "^[a-zA-Z0-9]*$"
     // let ptn = /^.*(?=.*\d)(?=.*[a-zA-Z]).*$/;
     if (username1.match(ptn) == null) {
         error1.innerHTML =  'username should contain only alphanumeric characters';
         error1.hidden = false
         error2.hidden =true
         event.preventDefault();
     }
 
}