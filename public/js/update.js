
var name_f=document.getElementById("firstname_1")
var name_l=document.getElementById("lastname_1")
// var date = document.getElementById("start")
// var id_mail = document.getElementById("email_id_1")
var contact = document.getElementById("phonenumber_1")
var btn_enter = document.getElementById("submit_button")
btn_enter.onclick = (event)=>{
    const firstname_error = document.getElementById("f_error")
    const lastname_error = document.getElementById("l_error")
    // const email_error = document.getElementById("email_error_1")
    const phonenumber_error = document.getElementById("contact_error")
    //var ptn = "^[a-zA-Z0-9]*$"
    //var user_name= name_u.value
    //var pass_word = passwrd.value
    var first_name=name_f.value
    var last_name=name_l.value
    //var email_id=id_mail.value
    var contact_info = contact.value
    // let ptn = /^.*(?=.*\d)(?=.*[a-zA-Z]).*$/;
    //var phonepattern = /^\d{10}$/;
    if ((!first_name || first_name.length === 0) || (first_name.trim().length === 0))
    {
         firstname_error.innerHTML= 'firstname is empty';
         firstname_error.hidden=false
         lastname_error.hidden=true
         
         phonenumber_error.hidden=true
         
         event.preventDefault();
     }
     else if ((!last_name || last_name.length === 0 ) || (last_name.trim().length==0) )
    {
        lastname_error.innerHTML= 'lastname is empty';
        lastname_error.hidden=false
        firstname_error.hidden=true
        
        phonenumber_error.hidden=true
        
        event.preventDefault();
    }
     else if ((!contact_info || contact_info.length === 0) || (contact_info.trim().length==0) )
    {
        phonenumber_error.innerHTML= 'contact is empty';
        phonenumber_error.hidden=false
        lastname_error.hidden=true
        firstname_error.hidden=true
        event.preventDefault();
     }
     
     else if (contact_info.test(ptn))
    {
        phonenumber_error.innerHTML= 'Enter the proper contact number';
        phonenumber_error.hidden=false
        lastname_error.hidden=true
        firstname_error.hidden=true
        event.preventDefault();
    }
}