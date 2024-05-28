import {
  IonButton,
  IonChip,
  IonContent,
  IonPage,
  IonRow,
  IonTextarea,
  useIonRouter,
} from "@ionic/react";
import React from "react";
import NavBar from "../components/common/NavBar";
import { RANDOMCHIP } from "../data";

function EditHobbies() {
  const router = useIonRouter();

  const handleback = () => {
    router.push("/profile");
  };
  return (
    <IonPage>
      <NavBar backbutton={handleback} title="Appearance and Health" />
      <IonContent className="p-4 bg-gray-900 text-white">
        <div className="flex flex-col p-4 gap-4 ">
          <div className="w-full flex flex-col gap-4">
            <IonRow className="w-full">
              {RANDOMCHIP.map((value, index) => (
                <IonChip key={index} className="bg-pausebutton">
                  {value}
                </IonChip>
              ))}
            </IonRow>
            <IonTextarea
              label="Celebrities I Like"
              labelPlacement="stacked"
              className="border-b border-bg-primary"
            />
          </div>
          <IonButton
            expand="block"
            className="bg-yellow-500 text-black font-semibold rounded-lg"
          >
            SAVE
          </IonButton>
        </div>
      </IonContent>
    </IonPage>
  );
}

export default EditHobbies;
