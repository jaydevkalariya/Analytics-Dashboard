let namee=document.getElementById('name');
let email=document.getElementById('email');
let password1=document.getElementById('password');
let password2=document.getElementById('repassword');
let mobile=document.getElementById('contact');
console.log(namee.value);
 namee.addEventListener('blur',f); 
function f() { 
    let reg=/^[a-zA-Z0-9]{0,20}$/;   
     if(!reg.test(namee.value))
     {        
          alert("enter valid name");
     }
}
 email.addEventListener('blur',f2); 
function f2() { 
    let reg=/^[a-zA-Z0-9]+@[a-zA-Z0-9]+.[a-zA-Z]{2,4}$/;    
     if(!reg.test(email.value))
     {        
          alert("enter valid email");
     }
}
 mobile.addEventListener('blur',f3); 
function f3() { 
    let reg=/^[0-9]{10}$/;   
     if(!reg.test(mobile.value))
     {        
          alert("enter valid mobile no.");
     }
}
 password1.addEventListener('blur',f4); 
function f4() { 
    let reg=/^[A-Z]+[a-z]+[0-9]+\W+$/;   
     if(!reg.test(password1.value))
     {        
          alert("enter valid password");
     }
}
 password2.addEventListener('blur',f5); 
function f5() {    
     if(password1.value!=password2.value)
     {        
          alert("password not matched with original password.try again!");
     }
}
