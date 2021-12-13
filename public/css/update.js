// var fname=document.getElementById("firstname_1")
// var lname=document.getElementById("lastname_1")
// var e_mail = document.getElementById("email_1")
// var phoneno = document.getElementById("phonenumber_1")
// var sex = document.getElementById("gender_1")
// var btn_s = document.getElementById("submit_button")
// btn_s.onclick=(event)=>{
//     var fname1=fname.value
//     var lname1=lname.value
//     var e_mail1=e_mail.value
//     var phoneno1=phoneno.value
//     var sex1=sex.value
//     var fname_e = document.getElementById("f_error")
//     var lname_e = document.getElementById("l_error")
//     var gender_e = document.getElementById("gender_error")
//     var contact_e = document.getElementById("contact_error")
//     var mail_e = document.getElementById("mail_error")
//     var validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
//     if(fname1.length==0){
//         fname_e.innerHTML="Enter the first name"
//         fname_e.hidden=false;
//         lname_e.hidden=true;
//         gender_e.hidden=true;
//         contact_e.hidden=true;
//         mail_e.hidden=true;
//         event.preventDefault();
//     }
//     else if(lname1.length==0){
//         lname_e.innerHTML="Enter the last name"
//         lname_e.hidden=false;
//         fname_e.hidden=true;
//         gender_e.hidden=true;
//         contact_e.hidden=true;
//         mail_e.hidden=true;
//         event.preventDefault();
//     }
//     else if(sex1=="gender"){
//         gender_e.innerHTML="select a proper gender"
//         gender_e.hidden=false;
//         fname_e.hidden=true;
//         lname_e.hidden=true;
//         contact_e.hidden=true;
//         mail_e.hidden=true;
//         event.preventDefault();
//     }
//     else if(phoneno1.length==0){
//         contact_e.innerHTML="Enter the last name"
//         contact_e.hidden=false;
//         fname_e.hidden=true;
//         lname_e.hidden=true
//         gender_e.hidden=true;
//         mail_e.hidden=true;
//         event.preventDefault();
//     }
//     else if(e_mail1.length==0){
//         mail_e.innerHTML="Enter the last name"
//         mail_e.hidden=false;
//         fname_e.hidden=true;
//         lname_e.hidden=true
//         gender_e.hidden=true;
//         contact_e.hidden=true;
//         mail_e.hidden=true;
//         event.preventDefault();
//     }
//     else if(!phoneno1.match("/^\d{10}$/")){
//         contact_e.innerHTML="Enter a valid contact number"
//         contact_e.hidden=false;
//         gender_e.hidden=true;
//         fname_e.hidden=true;
//         lname_e,hidden=true;
//         mail_e.hidden=true;
//         event.preventDefault();
//     }
//     else if(!e_mail1.match(validRegex)){
//         mail_e.innerHTML="Enter a valid mail id"
//         mail_e.hidden=false;
//         contact_e.hidden=true;
//         gender_e.hidden=true;
//         fname_e.hidden=true;
//         lname_e.hidden=true;
//         event.preventDefault();
//     }

// }