import {
  IonButton,
  IonContent,
  IonImg,
  IonPage,
  IonText,
  IonTitle,
} from "@ionic/react";
import axios from "axios";
import { useEffect, useState } from "react";

import { doc, setDoc } from "firebase/firestore";
import { usePlaidLink } from "react-plaid-link";
import { useLocation } from "react-router-dom";
import PlaidLogo from "../../public/assets/plaid-white.svg";
import { db } from "../config/firebase";

const linkTokenUrl = `https://us-central1-tier-dating.cloudfunctions.net/app/create_token`;

export default function Plaid() {
  let { state } = useLocation();
  const [linkTokenResponse, setLinkTokenResponse] = useState(null);

  useEffect(() => {
    axios
      .post(linkTokenUrl)
      .then((response) => {
        setLinkTokenResponse(response);
      })
      .catch((error) => {
        console.log("error", error);
      });
  }, []);

  const { open, ready } = usePlaidLink({
    token: linkTokenResponse?.data?.response?.link_token,
    onSuccess: (public_token, metadata) => {
      console.log("public_token", public_token);
      console.log("metadata", metadata);
      if (metadata && public_token) {
        updateUserIncomeyInfo(metadata);
      }
    },
  });

  const updateUserIncomeyInfo = (incomeVerification) => {
    const uid = state?.uid.toString;
    const userRef = doc(db, "Users", uid);
    setDoc(
      userRef,
      {
        capital: true,
        incomeVerificationData: incomeVerification,
      },
      { merge: true }
    );
  };

  return (
    <IonPage id="plaid-component">
      <IonContent>
        <div className="bg-black flex flex-col gap-4 items-center justify-center">
          <div>
            <IonImg src={PlaidLogo} alt="Ionic logo" />
          </div>

          <div>
            <IonTitle className="text-white text-center text-25px">
              MatchmakerAI uses Plaid to to verify your income bracket.
            </IonTitle>
          </div>

          <div>
            <IonButton
              type="submit"
              expand="block"
              onClick={() => open()}
              //   disabled={!ready}
              className="bg-C6A15A hover:bg-eee4d0 active:bg-eee4d0 focus:bg-eee4d0 text-white border-solid border-black border-1 box-shadow-md ripple-color-d7bd8b pt-10 pb-10"
            >
              Connect
            </IonButton>
          </div>

          <IonText className="text-white text-center text-25px">
            <a href="https://plaid.com/">Plaid</a> is a financial technology
            company that makes it easy, safe and reliable for people to connect
            their financial data to apps and services.
          </IonText>
        </div>
      </IonContent>
    </IonPage>
  );
}
