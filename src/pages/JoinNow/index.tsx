import "./Joinnow.scss";
import React from "react";
import {
  IonPage,
  IonTitle,
  IonContent,
  IonList,
  IonItem,
  IonInput,
  IonButton,
} from "@ionic/react";
import Logo from "../../assets/images/logo.png";

const JoinNow: React.FC = () => {
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
          <form noValidate>
            <IonList>
              <IonItem>
                <IonInput
                  ref={async (phoneInput) => {
                    if (phoneInput) {
                      const input = await phoneInput.getInputElement();
                    }
                  }}
                  placeholder="+1 000 - 000 - 0000"
                  maxlength={12}
                ></IonInput>
              </IonItem>
            </IonList>
            <div style={{ marginBottom: "100px" }} />

            <IonButton type="submit" expand="block" className="btn-continue">
              Continue
            </IonButton>
          </form>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default JoinNow;
