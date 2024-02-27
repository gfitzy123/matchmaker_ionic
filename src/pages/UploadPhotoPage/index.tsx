import "./UploadPhoto.scss";
import React, { useRef, useState } from "react";
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
import { arrowBack, logoInstagram } from "ionicons/icons";

import { ToastContainer } from "react-toastify";
import ImgUpload from "../../assets/images/image-upload.svg";

export default function UploadPhoto() {
  const history = useHistory();
  const onConfirm = () => {
    history.push("/");
  };
  const onBack = () => {
    history.push("/");
  };
  return (
    <IonPage id="image-upload-page">
      <IonContent>
        <div className="container">
          <div className="back-button">
            <IonIcon
              icon={arrowBack}
              onClick={onBack}
              style={{ fontSize: "36px", cursor: "pointer", color: "white" }}
            />
          </div>
          <div className="upload-content">
            <img src={ImgUpload} alt="image-upload"></img>
            <p className="txt-setup">Upload photo on your profile</p>
          </div>
          <div>
            <IonButton onClick={onConfirm} className="button">
              Take Photo
            </IonButton>
            <IonButton onClick={onConfirm} className="button">
              Choose From Camera Roll
            </IonButton>
            <IonButton onClick={onConfirm} className="button">
              <div className="icon">
                <IonIcon icon={logoInstagram} className="instagram-icon" />
              </div>
              Use From Your Instagram
            </IonButton>
          </div>
        </div>
      </IonContent>
      <ToastContainer />
    </IonPage>
  );
}
