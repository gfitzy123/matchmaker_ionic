import "./styles.css";
import React from "react";
import { db } from "../config/firebase";
import { doc, setDoc } from "firebase/firestore";
import { useLocation, useHistory } from "react-router-dom";

export default function GenderIdentification() {
  const history = useHistory();
  let { state } = useLocation();
  const userId = state?.uid;
  return (
    <div className="gender-identification">
      <button
        className="gender-button"
        onClick={() => {
          const userRef = doc(db, "Users", userId);
          setDoc(userRef, { gender: "Male" }, { merge: true });
          setTimeout(() => {
            history.push("/argyle", {
              state: {
                uid: state.uid.toString(),
              },
            });
          }, 2000);
        }}
      >
        Man
      </button>
      <button
        className="gender-button"
        onClick={() => {
          const userRef = doc(db, "Users", userId);
          setDoc(userRef, { gender: "Female" }, { merge: true });
          setTimeout(() => {
            navigate("/identity", {
              state: {
                uid: state.uid.toString(),
              },
            });
          }, 2000);
        }}
      >
        Woman
      </button>
    </div>
  );
}
