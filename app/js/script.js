let users = [];
const form = document.getElementById('form__login');
const email = document.getElementById('mail');
const pass = document.getElementById('pass');
const loginButton = document.getElementsByClassName("button__login");


const getUserData = () => {
  let user = {
    email: document.getElementById('mail').value,
    password: document.getElementById('pass').value,
  }
  users.push(user);
  console.table(user);
}

const errorMessage = (input, message) =>{
  let credentialElement = input.parentElement;
  let small = credentialElement.querySelector('small');
  small.innerText = message;

  credentialElement.className = 'credentials--error';
}

const successMessage = (input) =>{
  let credentialElement = input.parentElement;

  credentialElement.className = 'credentials--success';
}


form.addEventListener('submit', (e) =>{
  let validated = false;
  e.preventDefault();
  if(validated === false){
    validated = checkInputs();
    console.log(`Validation: ${validated}`);
  }
  else loginButton.onSubmit = getUserData();

});

let checkInputs = () =>{

  let emailValue = email.value.trim();
  let passValue = pass.value.trim();
  let validationRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  let validGmail = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@gmail.com/;
  let validYahoo = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@yahoo.com/;
  let validOutlook1 = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@outlook.com/;
  let validOutlook2 = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@hotmail.com/;
  let validProton1 = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@protonmail.com/;
  let validProton2 = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@pm.com/;
  
  if(emailValue === ''){
    errorMessage(email, 'Email cannot be blank!');
  }
  else if(emailValue.match(validGmail) || emailValue.match(validYahoo) || (emailValue.match(validOutlook1) || emailValue.match(validOutlook2)) || (emailValue.match(validProton1) || emailValue.match(validProton2))){
    successMessage(email);
  }
  else{
    errorMessage(email, 'Email is invalid!');
  }

  if(passValue === ''){
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