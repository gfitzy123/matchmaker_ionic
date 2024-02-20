import "./GetCode.scss";
import React, { useEffect, useRef, useState } from "react";
import {
  IonPage,
  IonInput,
  IonTitle,
  IonButton,
  IonContent,
} from "@ionic/react";
import axios from "axios";
import { useHistory } from "react-router";
import { db } from "../../config/firebase";
import Logo from "../../assets/images/logo.png";
import { doc, getDoc } from "firebase/firestore";
import { SERVER_BASE_URL } from "../../config/config";
import { ToastContainer, toast } from "react-toastify";
import { getAuth, RecaptchaVerifier } from "firebase/auth";

const GetCode: React.FC = (props) => {
  const params = useHistory();
  const [otp, setOtp] = useState("");
  const ionInputEl = useRef<HTMLIonInputElement>(null);
  const [confirmationResult, setConfirmationResult] = useState(null);
  console.log("confirmationResult", confirmationResult)
  const recaptchaRef = React.createRef();

  const generatorRecaptcha = () => {
    (window as any).recaptchaVerifier = new RecaptchaVerifier(
      "recaptcha-container",
      {
        size: "invisible",
        callback: async (response) => {
          // Reset the reCAPTCHA after 500ms
          console.log("response", response);
          setTimeout(() => {
            console.log("recaptchaRef", recaptchaRef);

            const ref = recaptchaRef.current as { reset: () => void }; // Asserting the type
            if (ref) {
              ref.reset();
            }
          }, 500);
        },
      },
      getAuth()
    );
  };

  useEffect(() => {
    if (
      params?.location?.search !== null &&
      params?.location?.search !== undefined
    ) {
      const jsonString = params?.location?.pathname;
      const jsonPart = jsonString.split(":").slice(1).join(":").trim();
      // Removing escape characters
      const cleanedJsonString = jsonPart.replace(/\\/g, "");
      // Parsing JSON
      const jsonData = JSON.parse(cleanedJsonString);
      // Extracting jsonData
      setConfirmationResult(jsonData);
    }
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (otp.length === 6 && confirmationResult) {
      try {
        let confirmResult = confirmationResult;
        confirmResult
          .confirm(otp)
          .then(async (result) => {
            console.log("Phone Verified Successfully - user", result.user);
            toast("Phone Verified Successfully");
            const user = result.user;
            const userDoc = doc(db, "Users", user.uid);
            const userDocData = await getDoc(userDoc);
            console.log("userDocData", userDocData.exists());

            if (userDocData.exists()) {
              // If user exists, navigate to /chat_page
              console.log("Navigating to /chat_page");
              // localStorage.setItem("user", JSON.stringify(user));

              // const response = await axios.get(
              //   `${SERVER_BASE_URL}/users/${user.uid}`
              // );
              // const userDetails = response.data;
            } else {
            }
          })
          .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log("otp_Error", errorCode, errorMessage);
            if (errorCode === "auth/invalid-verification-code") {
              toast("Invalid verification Code");
            } else {
              toast("Phone Verification Failed");
            }
          });
      } catch (e) {
        console.log("verifyOTP_Error", e);
      }
    }
  };

  const onVerifyCode = (ev: Event) => {
    const value = (ev.target as HTMLIonInputElement).value as string;

    const filteredValue = value.replace(/[^a-zA-Z0-9]+/g, "");

    setOtp(filteredValue);

    const inputCmp = ionInputEl.current;
    if (inputCmp !== null) {
      generatorRecaptcha();
      inputCmp.value = filteredValue;
    }
  };

  return (
    <IonPage id="join-now-page">
      <IonContent>
        <div className="container">
          {/* <img src={Logo} alt="avatar" className="logo" /> */}
          <div className="login-logo">
            <img src={Logo} alt="Ionic logo" />
          </div>

          <IonTitle className="txt-join">Join now</IonTitle>
          <IonTitle className="txt-phone">
            Enter your phone number register in the page
          </IonTitle>
          <form noValidate onSubmit={(event) => handleSubmit(event)}>
            <IonInput
              ref={ionInputEl}
              placeholder="000000"
              maxlength={6}
              inputMode="numeric"
              class="custom"
              value={otp}
              onIonInput={onVerifyCode}
            ></IonInput>
            <div id="recaptcha-container"></div>
            <div style={{ marginBottom: "50px" }} />

            <IonButton type="submit" expand="block">
              SUBMIT
            </IonButton>
            <div style={{ marginBottom: "200px" }} />
          </form>
        </div>
      </IonContent>
      <ToastContainer />
    </IonPage>
  );
};

export default GetCode;
