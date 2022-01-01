export const validator = (value, fieldName) => {
  let errors = {};
  switch (fieldName) {
    case "userEmail":
      validateEmail(value, errors);
      break;
    case "userName":
      validateFullName(value, errors);
      break;

    default:
  }
  return errors;
};

export const validateEmail = (userEmail, errors) => {
  let result = true;

  if (!userEmail) {
    errors.userEmail = "Email is Required";
    result = false;
  } else {
    const re =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    result = re.test(String(userEmail).toLowerCase());

    if (!result) {
      return (errors.userEmail = "Invalid Email address");
    }
  }
  return result;
};
export const validateFullName = (userName, errors) => {
  let result = true;

  if (!userName) {
    errors.userName = "Invalid full name";
    result = false;
  } else {
    const re = /^[A-Za-z0-9 _]*[A-Za-z0-9][A-Za-z0-9 _]*$/;
    result = re.test(String(userName).toLowerCase());

    if (!result)
      return (errors.userName = "Invalid full name, remove special characters");
  }
  return result;
};
