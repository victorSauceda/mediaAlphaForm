export const validator = (values, fieldName) => {
  let errors = {};
  switch (fieldName) {
    case "email":
      validateEmail(values.email, errors);
      break;
    case "fullName":
      validateFullName(values.fullName, errors);
      break;

    default:
  }
  return errors;
};

export const validateEmail = (email, errors) => {
  let result = true;

  if (!email) {
    errors.email = "Email is Required";
    result = false;
  } else {
    const re =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    result = re.test(String(email).toLowerCase());
    if (!result) errors.email = "Invalid Email address";
  }
  return result;
};
export const validateFullName = (fullName, errors) => {
  let result = true;

  if (!fullName) {
    errors.fullName = "Invalid full name";
    result = false;
  } else {
    const re = /^[A-Za-z0-9 _]*[A-Za-z0-9][A-Za-z0-9 _]*$/;
    result = re.test(String(fullName).toLowerCase());
    if (!result)
      errors.fullName = "Invalid full name, remove special characters";
  }
  return result;
};
