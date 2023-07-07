import React, { useState } from "react";

const UseForm = (initialForm, onValidate) => {
  const [form, setForm] = useState(initialForm);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const handleChange = async (e, functionAfter) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
    if (functionAfter) await functionAfter()
  }

  const handleSubmit = async (e, functionSubmit, functionPrev, functionAfter) => {
    e.preventDefault();
    if (functionPrev) await functionPrev();
    const err = await onValidate(form);
    if (Object.entries(err).length === 0) {
      await functionSubmit();
    } else {
      setErrors(err);
      return;
    }
    if (functionAfter) await functionAfter()
  }

  return { form, errors, loading, handleChange, handleSubmit, setForm, setErrors }
}

export default UseForm;