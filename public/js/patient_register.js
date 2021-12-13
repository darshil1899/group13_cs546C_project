var name_f=document.getElementById("firstname")
var name_l=document.getElementById("lastname")
var birthdate = document.getElementById("dateofbirth")
var id_mail = document.getElementById("emailid")
var unique_no=document.getElementById("patientuniquenumber")
var disease = document.getElementById("diseasename")
var disease_score = document.getElementById("diseasescore")
var btn_enter = document.getElementById("register")
btn_enter.onclick = (event)=>{
    const dscore_error=document.getElementById("dscore_error")
    const birthdate_error=document.getElementById("birthdate_error")
    const firstname_error = document.getElementById("sname_error")
    const lastname_error = document.getElementById("lname_error")   
    const email_error = document.getElementById("error_mail")
    const unique_error=document.getElementById("unique_error")
    const disease_error = document.getElementById("disease_error_1")
    //var validRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    var birth_date= birthdate.value
    var uniqueno=unique_no.value
    var disease1=disease.value
    var diseasescore = disease_score.value
    var first_name=name_f.value
    var last_name=name_l.value
    var email_id=id_mail.value
    let isnum = /^\d+$/
    // let ptn = /^.*(?=.*\d)(?=.*[a-zA-Z]).*$/;

    if ((first_name.length === 0) || (first_name.trim().length === 0)) 
    {
         firstname_error.innerHTML= 'firstname is empty';
         firstname_error.hidden=false
         lastname_error.hidden=true
         email_error.hidden=true
         dscore_error.hidden=true
         disease_error.hidden=true 
         unique_error.hidden=true   
         birthdate_error.hidden=true
         event.preventDefault();
     }
     else if ((last_name.length === 0 ) || (last_name.trim().length==0) )
    {
        lastname_error.innerHTML= 'lastname is empty';
        lastname_error.hidden=false
        firstname_error.hidden=true
        email_error.hidden=true
        dscore_error.hidden=true
        birthdate_error.hidden=true 
        disease_error.hidden=true 
        unique_error.hidden=true   
        event.preventDefault();
     }
     else if (birth_date=="" || birth_date==null )
    {
        birthdate_error.innerHTML= 'username is empty';
        unique_error.hidden=true
        lastname_error.hidden=true
        email_error.hidden=true
        dscore_error.hidden=true
        birthdate_error.hidden=false 
        disease_error.hidden=true 
        firstname_error.hidden=true   
        event.preventDefault();
     }
     else if (email_id.length==0 || email_id.trim().length==0 )
    {
        email_error.innerHTML= 'mail id is empty';
        email_error.hidden=false
        lastname_error.hidden=true
        unique_error.hidden=true
        dscore_error.hidden=true
        birthdate_error.hidden=true 
        disease_error.hidden=true 
        firstname_error.hidden=true   
        event.preventDefault();
     }
     else if (uniqueno.length==0 || uniqueno.trim().length==0 ) 
    {
        unique_error.innerHTML= 'Enter a unique number';
        unique_error.hidden=false
        lastname_error.hidden=true
        email_error.hidden=true
        dscore_error.hidden=true
        birthdate_error.hidden=true 
        disease_error.hidden=true 
        firstname_error.hidden=true   
        event.preventDefault();
     }
     else if (isnum.test(uniqueno)==false ) 
    {
        unique_error.innerHTML= 'Enter a valid unique number';
        unique_error.hidden=false
        lastname_error.hidden=true
        email_error.hidden=true
        dscore_error.hidden=true
        birthdate_error.hidden=true 
        disease_error.hidden=true 
        firstname_error.hidden=true   
        event.preventDefault();
     }
    else if((disease1.length === 0) || (disease1.trim().length==0)){
        disease_error.innerHTML= 'password is empty';
        disease_error.hidden=false
         lastname_error.hidden=true
         email_error.hidden=true
         birthdate_error.hidden=true
         dscore_error.hidden=true
         firstname_error.hidden=true 
         unique_error.hidden=true   
         event.preventDefault();
    } 
    //  else if (user_name.trim().length === 0) 
    // {
    //     unique_error.innerHTML= 'username is empty';
    //     unique_error.hidden=false
    //     lastname_error.hidden=true
    //     email_error.hidden=true
    //     dscore_error.hidden=true
    //     password_error.hidden=true 
    //     firstname_error.hidden=true   
    //     event.preventDefault();
    //  }
     else if (diseasescore.length==0 || diseasescore.trim().length==0) 
    {
        dscore_error.innerHTML= 'disease score is empty';
        dscore_error.hidden=false
        unique_error.hidden=true
        lastname_error.hidden=true
        email_error.hidden=true
        password_error.hidden=true 
        firstname_error.hidden=true   
        event.preventDefault();
     }
    //  else if (pass_word.length<= 5) 
    //  {
    //     password_error.innerHTML= 'password has less characters';
    //     password_error.hidden=false
    //      lastname_error.hidden=true
    //      email_error.hidden=true
    //      dscore_error.hidden=true
    //      firstname_error.hidden=true 
    //      unique_error.hidden=true   
    //      event.preventDefault();
    //  }
    //  if (/\s/.test(username))
    //  {
    //      error1.innerHTML= 'username has white spaces';
    //      error2.hidden=true
    //  }
    //  if (/\s/.test(password))
    //  {
    //      throw 'password has white spaces';
    //  }
 
    //  else if (user_name.match(ptn) == null) {

    //     unique_error.innerHTML= 'username should contain only alphanumeric characters';
    //     unique_error.hidden=false
    //     lastname_error.hidden=true
    //     email_error.hidden=true
    //     dscore_error.hidden=true
    //     password_error.hidden=true 
    //     firstname_error.hidden=true   
    //     event.preventDefault();
    //  }
    //  else if (contact_info.match(phonepattern)) 
    // {
    //     dscore_error.innerHTML= 'Enter the proper contact number';
    //     dscore_error.hidden=false
    //     lastname_error.hidden=true
    //     email_error.hidden=true
    //     unique_error.hidden=true
    //     password_error.hidden=true 
    //     firstname_error.hidden=true   
    //     event.preventDefault();
    // }
}
