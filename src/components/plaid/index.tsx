import "./plaid.scss";
import { useEffect, useState } from "react";
import { IonPage, IonButton, IonContent, IonTitle } from "@ionic/react";
import axios from "axios";
import { db } from "../../config/firebase";
import { useLocation } from "react-router-dom";
import { usePlaidLink } from "react-plaid-link";
import { doc, setDoc } from "firebase/firestore";

const linkTokenUrl = `https://us-central1-tier-dating.cloudfunctions.net/app/create_token`;

export default function PlaidComponent() {
  let { state } = useLocation();
  const [linkTokenResponse, setLinkTokenResponse] = useState(null);

  useEffect(() => {
    axios
      .post(linkTokenUrl)
      .then((response: any) => {
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
      if(metadata && public_token) {
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
        <div className="container">
          <div style={{ marginTop: "200px" }} />
          <IonTitle className="txt-veriff">
            We need to verify your income.
          </IonTitle>
          <IonButton
            type="submit"
            expand="block"
            onClick={() => open()}
            disabled={!ready}
          >
            Connect
          </IonButton>
          <div style={{ marginBottom: "300px" }} />
        </div>
      </IonContent>
    </IonPage>
  );
}
