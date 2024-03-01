import "./UploadPhoto.scss";
import React, { useRef, useState } from "react";
import { useHistory } from "react-router";

import {
  IonPage,
  IonIcon,
  IonButton,
  IonContent,
  isPlatform,
} from "@ionic/react";
import { Capacitor } from '@capacitor/core';
import { db } from "../../config/firebase";
import { ToastContainer } from "react-toastify";
import { doc, setDoc } from "firebase/firestore";
import { Preferences } from '@capacitor/preferences';
import { arrowBack, logoInstagram } from "ionicons/icons";
import ImgUpload from "../../assets/images/image-upload.svg";
import { Filesystem, Directory } from '@capacitor/filesystem';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';

export default function UploadPhoto() {
  const history = useHistory();
  const onConfirm = () => {
    history.push("/");
  };
  const onBack = () => {
    history.push("/");
  };

  const takePhoto = async () => {
    const photo = await Camera.getPhoto({
      resultType: CameraResultType.Uri,
      source: CameraSource.Photos,
      quality: 100,
    });
    if(photo) {
      handleUploadImage(photo);
    }
  };

  const takeCameraRoll = async () => {
    const photo = await Camera.getPhoto({
      resultType: CameraResultType.Uri,
      source: CameraSource.Camera,
      quality: 100,
    });
    if(photo) {
      handleUploadImage(photo);
    }
  };
  

  const handleUploadImage = (photo) => {
    const debuigUid = "s1toERHmgcHZuRNTXoCY";
    const userRef = doc(db, 'Users', debuigUid);
    console.log("photo", photo)

    if (photo !== null) {
        setDoc(
            userRef,
            { capital: true, newImage: photo },
            { merge: true }
        )
        alert("Photo Upload Successfully!")
    }
}

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
            <IonButton onClick={takePhoto} className="button">
              Take Photo
            </IonButton>
            <IonButton onClick={takeCameraRoll} className="button">
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
