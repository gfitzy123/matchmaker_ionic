import React, { useRef, useState } from "react";
import "./AccountSetUp.scss";
import { useHistory } from "react-router";

import {
  IonPage,
  IonInput,
  IonTitle,
  IonButton,
  IonContent,
  useIonRouter,
  IonIcon,
} from "@ionic/react";
import { arrowBack } from "ionicons/icons";

import { ToastContainer } from "react-toastify";
import SetUpSuccess from "../../assets/images/setup-success.svg";

export default function AccountSetUp() {
  const history = useHistory();
  const onConfirm = () => {
    history.push("/upload-photo");
  };
  return (
    <IonPage id="account-setup-page">
      <IonContent>
        <div className="container">
          <div className="back-button">
            <IonIcon
              icon={arrowBack}
              // onClick={onClick}
              style={{ fontSize: "36px", cursor: "pointer", color: "white" }}
            />
          </div>
          <div className="setup-content">
            <img src={SetUpSuccess} alt="success"></img>
            <p className="txt-setup">Your account is set up</p>
          </div>
          <IonButton onClick={onConfirm} className="button">
            CONTINUE
          </IonButton>
        </div>
      </IonContent>
      <ToastContainer />
    </IonPage>
  );
}
