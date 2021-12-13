var dusername = document.getElementById("nameu")
var password = document.getElementById("wordp")
var btnsubmit = document.getElementById("sub_btn") 
console.log(btnsubmit)
btnsubmit.onclick = (event)=>{
    const error1=document.getElementById("nameu_error")
    const error2 = document.getElementById("wordp_error")
    var dusername1= dusername.value
    var password1 = password.value
    if (dusername1.length === 0 ) 
    {
        event.preventDefault();
         error1.innerHTML= 'username is empty';
         error2.hidden=true
         error1.hidden=false
         
     }
    else if(password1.length === 0 || password1.trim().length==0){
        event.preventDefault();
        error2.innerHTML="password is empty"
        error1.hidden=true
        error2.hidden=false
    } 
     else if (dusername1.trim().length === 0) 
    {
        event.preventDefault();
        error1.innerHTML= 'username is empty';
        error2.hidden=true
        error1.hidden=false
     }
     else if (dusername1.length<= 3) 
    {
        event.preventDefault();
        error1.innerHTML= 'username has less characters';
        error2.hidden=true
        error1.hidden=false
     }
     else if (password1.length<= 5) 
     {
        event.preventDefault();
        error2.innerHTML= 'password has less characters';
        error1.hidden=true
        error2.hidden=false
     }
    //  if (/\s/.test(dusername))
    //  {
    //      error1.innerHTML= 'dusername has white spaces';
    //      error2.hidden=true
    //  }
    //  if (/\s/.test(password))
    //  {
    //      throw 'password has white spaces';
    //  }
 
     let ptn = "^[a-zA-Z0-9]*$"
     // let ptn = /^.*(?=.*\d)(?=.*[a-zA-Z]).*$/;
     if (dusername1.match(ptn) == null) {
        event.preventDefault();
         error1.innerHTML =  'dusername should contain only alphanumeric characters';
         error1.hidden = false
         error2.hidden =true
     }
 
}