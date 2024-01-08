import React, { useState } from "react";

function Authenticate({ token, setToken }) {
  const [successMessage, setSuccessMessage] = useState(null);
  const [error, setError] = useState(null);
  async function handleClick() {
    try {
      const response = await fetch(
        "https://fsa-jwt-practice.herokuapp.com/authenticate",
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const result = await response.json();
      console.log(result);
      setSuccessMessage(result.message);
    } catch (error) {
      console.log(error);
      setError(error);
    }
  }
  return !successMessage &&(
    <>
      <h2>Authenticate!</h2>
      <button onClick={handleClick}>Authenticate Token</button>
    </>
  ) || <>{successMessage}</>
}

export default Authenticate;
