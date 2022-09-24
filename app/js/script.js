const form = document.getElementById('form__login');
const email = document.getElementById('mail');
const pass = document.getElementById('pass');
const loginButton = document.getElementsByClassName("button__login");
var userData;


function getUserData (){
  return {
    email: document.getElementById('mail').value,
    password: document.getElementById('pass').value,
  }
};

function setMessage(target, message, valid){
  const credentialElement = target.parentElement;
  if(!valid){
    credentialElement.querySelector('small').innerText = message;
    credentialElement.className = 'credentials--error';
  }
  else{
    credentialElement.className = 'credentials--success';
  }
  
};

function checkEmail(value){

  const validEmails = {
    generalRegex: /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
    validGmail: /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@gmail.com/,
    validYahoo: /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@yahoo.com/,
    validOutlook1: /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@outlook.com/,
    validOutlook2: /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@hotmail.com/,
    validProton1: /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@protonmail.com/,
    validProton2: /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@pm.com/
  }

  const validation = {message: '', isValid: false};

  if(!value){
    validation.message = 'Email cannot be blank!';
    return validation;
  }

  if(value.match(validEmails['validGmail']) || value.match(validEmails['validYahoo']) 
  || (value.match(validEmails['validOutlook1']) || value.match(validEmails['validOutlook2'])) 
  || (value.match(validEmails['validProton1']) || value.match(validEmails['validProton2']))){
    validation.isValid = true;
    return validation;
  }


  validation.message = 'Email is invalid!';
  return validation;
}

function checkPassword(value){
  const validation = {message: '', isValid: false}

  if(!value){
    validation.message = 'Password cannot be blank!';
    return validation;
  }

  if (value.length <= 6){
    validation.message = 'Password must be longer than 6 characters';
    return validation;
  }

  if(!value.match(/[A-Z]/)){
    validation.message = 'Password must containe capital letters';
    return validation;
  }

  if(!value.match(/[0-9]/)){
    validation.message = 'Password must contain numbers';
    return validation;
  }

  if(!value.match(/[.!#$%&'*+/=?^_`{|}~-]/)){
    validation.message = 'Password must contain special symbols';
    return validation;
  }

  validation.isValid = true;
  return validation;

}

function checkInputs (){

  const emailCheck = checkEmail(email.value.trim());
  const passwordCheck = checkPassword(pass.value.trim());

  if((!emailCheck.isValid || !passwordCheck.isValid) || (emailCheck.isValid && passwordCheck.isValid)){
    setMessage(email, emailCheck.message, emailCheck.isValid);
    setMessage(pass, passwordCheck.message, passwordCheck.isValid);
  }

  if(emailCheck.isValid && passwordCheck.isValid) return true
  return false;
}


form.addEventListener('submit', (e) =>{
  e.preventDefault();
  const validatedInputs = checkInputs();
 
  if(validatedInputs){
    userData = loginButton.onsubmit = getUserData();
    console.table(userData);
  }
});