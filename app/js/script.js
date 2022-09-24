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

function setMessage(target, message, isError){
  const credentialElement = target.parentElement;
  if(isError){
    credentialElement.querySelector('small').innerText = message;
    credentialElement.className = 'credentials--error';
  }
  else{
    credentialElement.className = 'credentials--success';
  }
  
};

function checkEmail(value){

  const validGmails = {
    generalRegex: /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
    validGmail: /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@gmail.com/,
    validYahoo: /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@yahoo.com/,
    validOutlook1: /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@outlook.com/,
    validOutlook2: /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@hotmail.com/,
    validProton1: /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@protonmail.com/,
    validProton2: /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@pm.com/
  }

  if(!value){
    return setMessage(email,'Email cannot be blank!', true);
  }

  if(value.match(validGmails['validGmail']) || value.match(validGmails['validYahoo']) 
  || (value.match(validGmails['validOutlook1']) || value.match(validGmails['validOutlook2'])) 
  || (value.match(validGmails['validProton1']) || value.match(validGmails['validProton2']))){
    return setMessage(email,'', false);
  }
  
  return setMessage(email,'Email is invalid!', true);
}

function checkPassword(value){

  if(!value){
    return setMessage(pass, 'Password cannot be blank!', true)
  }

  if (value.length <= 6){
    return setMessage(pass, 'Password must be longer than 6 characters', true)
  }

  if(!value.match(/[A-Z]/)){
    return setMessage(pass, 'Password must contain capital letters', true)
  }

  if(!value.match(/[0-9]/)){
    return setMessage(pass, 'Password must contain numbers.', true)
  }

  if(!value.match(/[.!#$%&'*+/=?^_`{|}~-]/)){
    return setMessage(pass, 'Password must contain special symbols!', true)
  }
    
  return setMessage(pass, '', false)

}

function checkInputs (){

  const emailValue = email.value.trim();
  const passValue = pass.value.trim();
  
  checkEmail(emailValue);
  checkPassword(passValue);
  
}

function validationClarification (){
  if(email.parentElement.className === 'credentials--success' && pass.parentElement.className === 'credentials--success') return true;
  return false;
}


form.addEventListener('submit', (e) =>{
  e.preventDefault();
  checkInputs();
  let validation = validationClarification();

  if(validation){
    userData = loginButton.onsubmit = getUserData();
    console.table(userData);
  }
});