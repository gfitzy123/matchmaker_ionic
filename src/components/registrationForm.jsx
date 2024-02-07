import "./styles.css";
import React, { useState } from "react";
// import { getAuth} from "firebase/auth";
// import { regex } from "../utils/regex";
// import { signUp } from "../actions/socialLogin";

export default function Registration() {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const handleEmail = (e) => {
    setEmail(e.target.value);
  };

  const handlePassword = (e) => {
    setPassword(e.target.value);
  };

  // const handleSubmit = () => {
  //   const auth = getAuth();

  //   if (!email) {
  //     alert("Email Required");
  //   } else if (!regex.validateEmail(email)) {
  //     alert("Invalid Email");
  //   } else if (!password) {
  //     alert("Passsword Required");
  //   } else {
  //     signUp(email, password)
  //       .then(async (userCredential) => {
  //         console.log("userCredential--", userCredential);
  //       })
  //       .catch((error) => {
  //         const errorCode = error.code;
  //         const errorMessage = error.message;
  //         if (errorMessage) {
  //           if (errorCode === "auth/email-already-in-use") {
  //             alert("User Already Exist!");
  //           } else {
  //             alert("Signup Failed");
  //           }
  //         }
  //       });
  //   }
  // };

  return (
    <div className="registration-form">
      <input
        type="email"
        placeholder="Email"
        className="email-input"
        value={email}
        onChange={handleEmail}
      />
      <input
        type="password"
        placeholder="Password"
        className="password-input"
        value={password}
        onChange={handlePassword}
      />
      <button className="btn-signup">Signup</button>
      <button className="btn-signup-google">Sign Up With Google</button>
    </div>
  );
}
