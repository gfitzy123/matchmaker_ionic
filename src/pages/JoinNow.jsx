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
import { useState } from "react";
import Logo from "../../public/assets/logo.svg";
import { MuiTelInput } from "mui-tel-input";

const JoinNow = () => {
  const [phone, setPhone] = useState("");
  const router = useIonRouter();

  const handleotp = () => {
    router.push("/otp");
  };

  const handlePhoneChange = (newPhone) => {
    setPhone(newPhone);
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
                    <p className="text-center mb-8 text-zinc-300 text-base">
                      Enter your phone number to register in the app.
                    </p>
                  </IonText>
                </IonCol>
              </IonRow>
              <IonRow className="w-full max-w-xs mx-auto"></IonRow>
              <IonRow className="w-full max-w-xs mx-auto">
              </IonRow>
              <IonRow className="w-full max-w-xs mx-auto">
                <IonCol>
                  <MuiTelInput
                    label="Phone number"
                    value={phone}
                    onChange={handlePhoneChange}
                    defaultCountry="US"
                    fullWidth
                    sx={{
                      borderBottom:
                        "1px solid  rgba(221, 221, 221, 1) !important",
                      "& .MuiFormLabel-root": {
                        color: " rgba(255, 255, 255, 0.6) !important",
                      },
                    }}
                    variant="standard"
                    inputProps={{
                      style: {
                        color: "white",
                      },
                    }}
                    focused={false}
                    placeholder="Select Country"
                  />
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
