var username = document.getElementById("username")
var password = document.getElementById("password")
var btnsubmit = document.getElementById("btnsubmit") 
console.log(btnsubmit)
btnsubmit.onclick = (event)=>{
    const error1=document.getElementById("username_error")
    const error2 = document.getElementById("password_error")
    var username1= username.value
var password1 = password.value
let ptn = "^[a-zA-Z0-9]*$"
    if (username1.length === 0 || (username1.trim().length === 0)) 
    {
         error1.innerHTML= 'username is empty';
         error2.hidden=true
         error1.hidden=false
         event.preventDefault();
     }
    else if(password1.length === 0 || password1.trim().length === 0){
        error2.innerHTML="password is empty"
        error1.hidden=true
        error2.hidden=false
        event.preventDefault();
    } 
    else if (/\s/.test(username1)) {
        error1.innerHTML= 'username has empty space';
        error2.hidden=true
        error1.hidden=false
        event.preventDefault();
    }
    else if(/\s/,test(password1)){
        error2.innerHTML="password has empty spaces"
        error1.hidden=true
        error2.hidden=false
        event.preventDefault();
    }
    else if (username1.match(ptn) == null) {
        error1.innerHTML =  'username should contain only alphanumeric characters';
        error1.hidden = false
        error2.hidden =true
        event.preventDefault();
    }
    //  else if (username1.trim().length === 0) 
    // {
    //     error1.innerHTML= 'username is empty';
    //     error2.hidden=true
    //     error1.hidden=false
    //     event.preventDefault();
    //  }
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
 
     
     // let ptn = /^.*(?=.*\d)(?=.*[a-zA-Z]).*$/;
     
 
}
