var start_name=document.getElementById("start_name")
var end_name=document.getElementById("end_name")
var id_mail_ = document.getElementById("id_mail_")
var contactno = document.getElementById("contactno")
var dob=document.getElementById("dob")
var btn_enter = document.getElementById("btn-enter")
var txtdate = document.getElementById("txtdate") 
btn_enter.onclick=(event)=>{
    var start_name_1=start_name.value
    var end_name_1=end_name.value
    var id_mail_1=id_mail_.value
    var contactno_1=contactno.value
    var dob1 = dob.value
    var start_error=document.getElementById("start_error")
    var end_error=document.getElementById("end_error")
    var mailid_error=document.getElementById("mailid_error")
    var phone_error=document.getElementById("phone_error")
    var dob_error = document.getElementById("dob_error")
    var txtdate_error = document.getElementById("txtdate_error")
    //var phonepattern1 = /^\d{10}$/;
    var validRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

    if(start_name_1.length==0 || start_name_1.trim().length==0){
        start_error.innerHTML="Enter the first name"
        start_error.hidden=false
        end_error.hidden=true
        mailid_error.hidden=true
        phone_error.hidden=true
        dob_error.hidden=true
        txtdate_error.hidden=true
        event.preventDefault();
    }
    else if(end_name_1.length==0 || end_name_1.trim().length==0){
        end_error.innerHTML="Enter the last name"
        end_error.hidden=false
        start_error.hidden=true
        mailid_error.hidden=true
        phone_error.hidden=true
        dob_error.hidden=true
        txtdate_error.hidden=true
        event.preventDefault();
    }
    else if(dob1=="" || dob1==null){
        dob_error.innerHTML="Select a date of birth"
        dob_error.hidden=false
        start_error.hidden=true
        end_error.hidden=true
        mailid_error.hidden=true
        phone_error.hidden=true
        txtdate_error.hidden=true
        event.preventDefault();
    }
    else if(id_mail_1.length==0 || id_mail_1.trim().length==0){
        mailid_error.innerHTML="Enter the mail id"
        mailid_error.hidden=false
        start_error.hidden=true
        end_error.hidden=true
        phone_error.hidden=true
        dob_error.hidden=true
        txtdate_error.hidden=true
        event.preventDefault();
    }
    else if(!id_mail_1.test(validRegex)){
        mailid_error.innerHTML="Enter the proper mail id"
        mailid_error.hidden=false
        start_error.hidden=true
        end_error.hidden=true
        phone_error.hidden=true
        dob_error.hidden=true
        txtdate_error.hidden=true
        event.preventDefault();
    }
    else if(contactno_1.length==0 || contactno_1.trim().length==0){
        phone_error.innerHTML="Enter the contact"
        phone_error.hidden=false
        start_error.hidden=true
        end_error.hidden=true
        mailid_error.hidden=true
        phone_error.hidden=true
        dob_error.hidden=true
        txtdate_error.hidden=true
        event.preventDefault();
    }
    else if(txtdate.selected){
        txtdate_error.innerHTML="Select a date"
        txtdate_error.hidden=false
        start_error.hidden=true
        end_error.hidden=true
        mailid_error.hidden=true
        phone_error.hidden=true
        dob_error.hidden=true
        event.preventDefault();
    }
    // else if(!contactno_1.match(phonepattern1)){
    //     phone_error.innerHTML="Enter the valid contact"
    //     phone_error.hidden=false
    //     start_error.hidden=true
    //     end_error.hidden=true
    //     mailid_error.hidden=true
    //     phone_error.hidden=true
    //     dob_error.hidden=true
    //     txtdate_error.hidden=true
    //     event.preventDefault();
    // }
    

}