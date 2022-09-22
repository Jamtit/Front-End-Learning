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
  let credentialElement = target.parentElement;
  if(isError){
    let small = credentialElement.querySelector('small');
    small.innerText = message;
    credentialElement.className = 'credentials--error';
  }
  else{
    credentialElement.className = 'credentials--success';
  }
  
};

function checkInputs (){

  let emailValue = email.value.trim();
  let passValue = pass.value.trim();

  const validationRegexes = {
    generalRegex: /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
    validGmail: /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@gmail.com/,
    validYahoo: /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@yahoo.com/,
    validOutlook1: /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@outlook.com/,
    validOutlook2: /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@hotmail.com/,
    validProton1: /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@protonmail.com/,
    validProton2: /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@pm.com/
  }
  
  if(!emailValue){
    setMessage(email,'Email cannot be blank!', true)
  }
  else if(emailValue.match(validationRegexes['validGmail']) || emailValue.match(validationRegexes['validYahoo']) 
  || (emailValue.match(validationRegexes['validOutlook1']) || emailValue.match(validationRegexes['validOutlook2'])) 
  || (emailValue.match(validationRegexes['validProton1']) || emailValue.match(validationRegexes['validProton2']))){
    setMessage(email,'', false)
  }
  else{
    setMessage(email,'Email is invalid!', true)
  }


  if(!passValue){
    setMessage(pass, 'Password cannot be blank!', true)
  }
  else if (passValue.length <= 6){
    setMessage(pass, 'Password must be longer than 6 characters', true)
  }
  else if(!passValue.match(/[A-Z]/)){
    setMessage(pass, 'Password must contain capital letters', true)
  }
  else if(!passValue.match(/[0-9]/)){
    setMessage(pass, 'Password must contain numbers.', true)
  }
  else if(!passValue.match(/[.!#$%&'*+/=?^_`{|}~-]/)){
    setMessage(pass, 'Password must contain special symbols!', true)
  }
  else{
    setMessage(pass, '', false)
  }

  if(email.parentElement.className === 'credentials--success' && pass.parentElement.className === 'credentials--success') return true;
  else return false;
}


form.addEventListener('submit', (e) =>{
  let validated = checkInputs();
  e.preventDefault();

  if(validated){
    userData = loginButton.onsubmit = getUserData()
    console.table(userData);
  }
  else{
    console.log('One of inputs is incorrect.');
  }

});