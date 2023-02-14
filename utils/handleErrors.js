const handleErrors = (err) => {
    //error messages error code = 11000
    let errors = { email: "", password: "" };
    if (err.code === 11000) {
      errors.email = "Email is already in use";
      return errors;
    }
    if (err.messsage === " incorrect Email"){
        errors.email = "this email has not been registered";
        return errors;
    }
  
    if (err.messsage === " incorrect password"){
        errors.email = "invalid email or password"
        errors.password = " invalid email or password"
        return errors;
    }

    if (err.message.includes("user validation failed")) {
      Object.values(err.errors).forEach(({ properties }) => {
        errors[properties.path] = properties.message;
      });
    }
    return errors;
  };
  
  module.exports = handleErrors;