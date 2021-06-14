import { useState, useCallback, useRef } from "react";

function useForm(initialValue) {
  const formRef = useRef();
  const [data, setData] = useState(initialValue);

  const handleChange = (e) => {
    const { name, type, value, checked, files, multiple } = e.target;
    let updatedValue;

    if (["password", "text", "email", "radio", "select-one"].includes(type)) {
      updatedValue = value;
    } else if (type === "checkbox") {
      updatedValue = checked;
    } else if (type === "file") {
      if (multiple) {
        updatedValue = Array.from(files);
      } else {
        updatedValue = files[0];
      }
    }

    setData((prev) => {
      return { ...prev, [name]: updatedValue };
    });
  };

  const clearForm = useCallback(
    (fields) => {
      if (Array.isArray(fields)) {
        setData((prev) => {
          let newValue = { ...prev };
          fields.forEach((field) => {
            newValue[field] = initialValue[field];
          });
          return newValue;
        }); // end of setData
        return;
      }
      setData(initialValue);
      formRef?.current?.reset();
      return;
    },
    [initialValue]
  );

  return [data, handleChange, formRef, clearForm];
}

export default useForm;
