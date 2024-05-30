import { useState } from "react";
import {
  IonButton,
  IonCol,
  IonContent,
  IonGrid,
  IonPage,
  IonRow,
  IonText,
  useIonRouter,
} from "@ionic/react";
import Logo from "../../public/assets/logo.svg";
import PhoneInput from "react-phone-number-input";
import Input from "react-phone-number-input/input";
import "react-phone-number-input/style.css";

const JoinNow = () => {
  const router = useIonRouter();

  const handleotp = () => {
    router.push("/otp");
  };

  return (
    <IonPage>
      <IonContent>
        <IonGrid className="flex flex-col items-center bg-black text-white h-full justify-around ">
          <div className="flex flex-col gap-[14px]">
            <IonRow className="flex justify-center ">
              <IonCol size="auto">
                <div className="bg-white p-4 rounded-full">
                  <img src={Logo} alt="Logo" className="h-16 w-16" />
                </div>
              </IonCol>
            </IonRow>
            <div>
              <IonRow>
                <IonCol>
                  <IonText>
                    <h1 className="text-3xl font-semibold text-center ">
                      Join now
                    </h1>
                  </IonText>
                </IonCol>
              </IonRow>
              <IonRow>
                <IonCol>
                  <IonText>
                    <p className="text-center mb-8 text-base text-textSecondary">
                      Enter your phone number to register in the app.
                    </p>
                  </IonText>
                </IonCol>
              </IonRow>
              <IonRow className="w-full max-w-xs mx-auto"></IonRow>
              <IonRow className="w-full max-w-xs mx-auto"></IonRow>
              <IonRow className="w-full max-w-xs mx-auto">
                <IonCol className="flex flex-col border-b">
                  <IonText>
                    <h5 className="text-xs text-textSecondary">Phone Number</h5>
                  </IonText>
                  <div className="flex">
                    <PhoneInput
                      initialValueFormat="national"
                      countryCallingCodeEditable={false}
                      defaultCountry="US"
                      international
                      placeholder="000-000-0000"
                      onChange={() => ""}
                    />
                    <Input
                      className="outline-none bg-background"
                      placeholder="000-000-0000"
                      type="tel"
                      onChange={() => ""}
                    />
                  </div>
                </IonCol>
              </IonRow>
            </div>
          </div>
          <IonRow className="w-full max-w-xs mx-auto">
            <IonCol>
              <IonButton
                className="mt-8 bg-secondary w-full"
                onClick={handleotp}
              >
                CONTINUE
              </IonButton>
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default JoinNow;
