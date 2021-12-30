import { useState, useEffect } from "react";
const useFormFields = ({ initState, validator }) => {
  const [stateValue, setStateValue] = useState(initState);
  const [errors, setErrors] = useState({});

  const [isSubmited, setIsSubmited] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setStateValue(() => ({
      ...stateValue,
      [name]: value,
    }));
  };
  const handleBlur = (e) => {
    const { name: fieldName } = e.target;
    const failedFields = validator(stateValue, fieldName);
    setErrors(() => ({
      ...errors,
      [fieldName]: Object.values(failedFields)[0],
    }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name: fieldName } = e.target;
    const failedFields = validator(stateValue, fieldName);
    setErrors(() => ({
      ...errors,
      [fieldName]: Object.values(failedFields)[0],
    }));
    setIsSubmited(true);
  };
  return {
    handleChange,
    handleSubmit,
    handleBlur,
    stateValue,
    errors,
  };
};
export default useFormFields;
