import toast from "react-hot-toast";

// validate login page username
export async function usernameValidate(values) {
  const errors = usernameVerify({}, values);

  return errors;
}

// validate password
export async function passwordValidate(values) {
  const errors = passwordVerify({}, values);

  return errors;
}

/**        validate register form       **/ 
export async function registerValidation(values) {
  const errors = usernameVerify({}, values)
  passwordVerify(errors, values)
}

/**      validate profile page form     **/
export async function postValidate(values) {
  const errors = emailVerify({}, values);
  return errors;
}



/***  **** ***** ******* ********   ************/ 

// validate password
function passwordVerify(error = {}, values) {
  const specialChars = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;

  if (!values.password) {
    error.passwords = toast.error("Password Required!");
  } else if (values.password.includes(" ")) {
    error.password = toast.error("Invalid Password...!");
  } else if (values.password.length < 4) {
    error.password = toast.error(
      "Your password must be more than 4 characters long!"
    );
  } else if (!specialChars.test(values.password)) {
    error.password = toast.error("Password must have special character");
  }
  return error;
}

// validate Username
function usernameVerify(error = {}, values) {
  if (!values.username) {
    error.username = toast.error("Username Required!");
  } else if (values.username.includes(" ")) {
    error.username = toast.error("Invalid Username...!");
  }
  return error;
}

// validate email
function emailVerify(error = {}, values) {
    if(!values.email){
      error.email = toast.error("Email Required...!")
    } else if(values.email.includes(" ")) {
      error.email = toast.error("Wrong email...!")
    } else if(!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
      error.email = toast.error("Invalid email address...!")
    }
    return error
}
