import React from "react";
import { IonModal, IonContent, IonIcon, IonButton } from "@ionic/react";
import { close } from "ionicons/icons";
import { useHistory } from "react-router-dom";

import "./IonModal.scss";
import VeriffLogo from "../../assets/images/veriff-logo.svg";
import VeriffLogoBtn from "../../assets/images/veriff-logo-button.svg";

const IonModalComponent = ({ isOpen, onClose }) => {
  const history = useHistory();

  const onConfirm = () => {
    history.push("/account-setup");
  };

  return (
    <IonModal isOpen={isOpen} onDidDismiss={onClose} cssClass="veriff-modal">
      <IonContent
        style={{
          "--background": "#303136",
          "--color": "white",
        }}
      >
        <IonIcon icon={close} onClick={onClose} className="modal-close-icon" />
        <img src={VeriffLogo} alt="veriff-logo" className="content-img"></img>
        <p className="content-text">
          The Matchmaker AI has partnered with Veriff to verify your income
        </p>
        <button onClick={onConfirm} className="veriff-button">
          <img
            src={VeriffLogoBtn}
            alt="veriff-logo-button"
            className="veriff-logo-button"
          ></img>
          Continue with Veriff
        </button>
      </IonContent>
    </IonModal>
  );
};

export default IonModalComponent;
