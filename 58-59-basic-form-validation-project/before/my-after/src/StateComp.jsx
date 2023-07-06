import { useState, useMemo } from "react";

// import React from 'react'

export default function StateComp() {
  const [emailEntry, setEmailEntry] = useState("test@test.com");
  const [passwordEntry, setPasswordEntry] = useState("Password123!");
  const [isAfterSubmit, setIsAfterSubmit] = useState(false);

  function checkEmail(email) {
    const errors = [];

    if (email === "") {
      errors.push("Required (Cannot be blank)");
    }

    if (!email.endsWith("@webdevsimplified.com")) {
      errors.push("Must end in `@webdevsimplified.com`");
    }

    return errors;
  }

  function checkPassword(password) {
    const errors = [];
    const regexLower = /[a-z]/;
    const regexUpper = /[A-Z]/;
    const regexNumber = /[0-9]/;

    if (password === "") {
      errors.push("Required (Cannot be blank)");
    }

    if (password.length < 10) {
      errors.push("Must Be 10 characters or longer");
    }

    if (!password.match(regexLower)) {
      errors.push("Must include a lowercase letter");
    }

    if (!password.match(regexUpper)) {
      errors.push("Must include an uppercase letter");
    }

    if (!password.match(regexNumber)) {
      errors.push("Must include a number");
    }
    return errors;
  }

  const emailErrors = useMemo(() => {
    return isAfterSubmit ? checkEmail(emailEntry) : "";
  }, [isAfterSubmit, emailEntry]);

  const passwordErrors = useMemo(() => {
    return isAfterSubmit ? checkPassword(passwordEntry) : [];
  }, [isAfterSubmit, passwordEntry]);

  function entryHandler(e) {
    e.preventDefault();
    setIsAfterSubmit(true);

    const emailResults = checkEmail(emailEntry);
    const passwordResults = checkPassword(passwordEntry);

    if (emailResults.length === 0 && passwordResults.length === 0) {
      alert("Success");
    }
  }

  return (
    <>
      <form onSubmit={entryHandler} className="form">
        <div className={`form-group ${emailErrors.length > 0 ? "error" : ""}`}>
          <label className="label" htmlFor="email">
            Email
          </label>
          <input
            className="input"
            type="email"
            id="email"
            value={emailEntry}
            onChange={(e) => setEmailEntry(e.target.value)}
          />
          {emailErrors.length > 0 && (
            <div className="msg">{emailErrors.join(", ")}</div>
          )}
        </div>
        <div
          className={`form-group ${passwordErrors.length > 0 ? "error" : ""}`}
        >
          <label className="label" htmlFor="password">
            Password
          </label>
          <input
            className="input"
            value={passwordEntry}
            onChange={(e) => setPasswordEntry(e.target.value)}
            type="password"
            id="password"
          />
          {passwordErrors.length > 0 && (
            <div className="msg">{passwordErrors.join(", ")}</div>
          )}
        </div>
        <button className="btn" type="submit">
          Submit
        </button>
      </form>
    </>
  );
}
