import "./Joinnow.scss";
import React, { useRef, useState } from "react";
import {
  IonPage,
  IonInput,
  IonTitle,
  IonButton,
  IonContent,
} from "@ionic/react";
import {
  getAuth,
  RecaptchaVerifier,
  signInWithPhoneNumber,
} from "firebase/auth";
import axios from "axios";
import { db } from "../../config/firebase";
import Logo from "../../assets/images/logo.png";
import { doc, getDoc } from "firebase/firestore";
import { SERVER_BASE_URL } from "../../config/config";
import { ToastContainer, toast } from "react-toastify";

const JoinNow: React.FC = () => {
  const [otp, setOtp] = useState();
  const [expandedOtpForm, setExpandedOtpForm] = useState(false);
  const [confirmationResult, setConfirmationResult] = useState(null);
  const [phoneNumber, setPhoneNumber] = useState("");
  const ionInputEl = useRef<HTMLIonInputElement>(null);

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

  const handlePhoneNumberLogin = async (event) => {
    event.preventDefault();
    let phone = phoneNumber;
    console.log("loginWithPhoneNumber - phone", phone);
    // Hardcoded phone number for debugging
    const debugPhoneNumber = "+1 413 658 4988";

    generatorRecaptcha();
    setExpandedOtpForm(true);

    let appVerifier = (window as any).recaptchaVerifier;

    try {
      const result = await signInWithPhoneNumber(getAuth(), phone, appVerifier);
      console.log("signInWithPhoneNumber: result", result);
      setConfirmationResult(result);
    } catch (error) {
      console.log("loginWithPhoneNumber_Error", error);
    }
  };

  const verifyOTP = async (e) => {
    let otp = e.target.value;
    if (otp.length <= 6) {
      setOtp(otp);
    }

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
              localStorage.setItem("user", JSON.stringify(user));

              const response = await axios.get(
                `${SERVER_BASE_URL}/users/${user.uid}`
              );
              const userDetails = response.data;
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

  const onPhoneInput = (ev: Event) => {
    const value = (ev.target as HTMLIonInputElement).value as string;

    const filteredValue = value.replace(/[^a-zA-Z0-9]+/g, "");

    /**
     * Update both the state variable and
     * the component to keep them in sync.
     */
    setPhoneNumber("+" + filteredValue);

    const inputCmp = ionInputEl.current;
    if (inputCmp !== null) {
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
          <form noValidate onSubmit={(event) => handlePhoneNumberLogin(event)}>
            <IonInput
              ref={ionInputEl}
              placeholder="+1 000 - 000 - 0000"
              maxlength={12}
              inputMode="numeric"
              class="custom"
              value={phoneNumber}
              onIonInput={onPhoneInput}
            ></IonInput>
            <div id="recaptcha-container"></div>
            <div style={{ marginBottom: "50px" }} />

            <IonButton type="submit" expand="block">
              Continue
            </IonButton>
            <div style={{ marginBottom: "200px" }} />
          </form>
        </div>
      </IonContent>
      <ToastContainer />
    </IonPage>
  );
};

export default JoinNow;
