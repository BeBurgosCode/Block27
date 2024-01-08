import React, { useState } from "react";

const SignUpForm = ({ token, setToken }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [message, setMessage] = useState(null);
  const [validate, setvalidate] = useState(null);
  async function handleSubmit(event) {
    event.preventDefault();
    if (username.length < 8) {
      setvalidate(`username must have 8 characters`);
      return;
    }
    try {
      const response = await fetch(
        "https://fsa-jwt-practice.herokuapp.com/signup",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ username, password }),
        }
      );
      const result = await response.json();
      setToken(await result.token);
      setMessage(result.message);
      //console.log(token);
    } catch (error) {
      setError(error.message);
    }
  }
  return (
    (!message && (
      <>
        <h2>Sign Up</h2>
        {error && <p>{error}</p>}
        <form onSubmit={handleSubmit}>
          <label>
            Username:{" "}
            <input
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </label>
          <label>
            Password:{" "}
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </label>
          {validate}
          <button>Submit</button>
        </form>
      </>
    )) || (
      <>
        {message} {username}
      </>
    )
  );
};

export default SignUpForm;
