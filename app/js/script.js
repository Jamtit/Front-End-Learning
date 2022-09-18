const form = document.getElementById('form__login');
const email = document.getElementById('mail');
const pass = document.getElementById('pass');
const loginButton = document.getElementsByClassName("button__login");
var userData;


// const getUserData = () =>{
//   return {
//     email: document.getElementById('mail').value,
//     password: document.getElementById('pass').value,
//   }
// };


function getUserData (){
  return {
    email: document.getElementById('mail').value,
    password: document.getElementById('pass').value,
  }
};

const errorMessage = (input, message) =>{
  let credentialElement = input.parentElement;
  let small = credentialElement.querySelector('small');
  small.innerText = message;
  return credentialElement.className = 'credentials--error';
}

const successMessage = (input) =>{
  let credentialElement = input.parentElement;
  return credentialElement.className = 'credentials--success';
}


form.addEventListener('submit', (e) =>{
  let validated = false;
  e.preventDefault();

  if(!validated){
    validated = checkInputs();
    console.log(`Validation: ${validated}`);
  }
  else {
    loginButton.onSubmit= getUserData();
  }

});
const checkInputs = () =>{

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
    errorMessage(email, 'Email cannot be blank!');
  }
  else if(emailValue.match(validationRegexes['validGmail']) || emailValue.match(validationRegexes['validYahoo']) 
  || (emailValue.match(validationRegexes['validOutlook1']) || emailValue.match(validationRegexes['validOutlook2'])) 
  || (emailValue.match(validationRegexes['validProton1']) || emailValue.match(validationRegexes['validProton2']))){
    successMessage(email);
  }
  else{
    errorMessage(email, 'Email is invalid!');
  }


  if(!passValue){
    errorMessage(pass, 'Password cannot be blank!')
  }
  else if (passValue.length <= 6){
    errorMessage(pass, 'Password must be longer than 6 characters')
  }
  else if(!passValue.match(/[A-Z]/)){
    errorMessage(pass, 'Password must contain capital letters.');
  }
  else if(!passValue.match(/[0-9]/)){
    errorMessage(pass, 'Password must contain numbers.');
  }
  else if(!passValue.match(/[.!#$%&'*+/=?^_`{|}~-]/)){
    errorMessage(pass,'Password must contain special symbols!');
  }
  else{
    successMessage(pass);
  }

  if(email.parentElement.className === 'credentials--success' && pass.parentElement.className === 'credentials--success') return true;
  else return false;
}