import React from "react";
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonItem,
  IonLabel,
  IonInput,
  IonTextarea,
  IonToggle,
  IonButton,
  useIonRouter,
} from "@ionic/react";
import NavBar from "../components/common/NavBar";

const EditAppearanceHealth = () => {
  const router = useIonRouter();

  const handleback = () => {
    router.push("/profile");
  };
  return (
    <IonPage>
      <NavBar backbutton={handleback} title="Appearance and Health"/>
      <IonContent>
        <div className="flex flex-col p-4  ">
          <div className="w-full flex flex-col gap-4">
            <IonInput
              label="Height"
              labelPlacement="stacked"
              className="border-b border-bg-primary"
            />
            <IonInput
              label="Build"
              labelPlacement="stacked"
              className="border-b border-bg-primary"
            />
            <IonInput
              label="Hair color"
              labelPlacement="stacked"
              className="border-b border-bg-primary"
            />
            <IonInput
              label="Eye color"
              labelPlacement="stacked"
              className="border-b border-bg-primary"
            />
            <IonTextarea
              label="Physical description"
              labelPlacement="stacked"
              className="border-b border-bg-primary"
            />
            <div className="flex justify-between">
              <IonLabel className="text-gray-400">COVID Vaccinated</IonLabel>
              <IonToggle checked color="primary" />
            </div>
            <div className="flex justify-between">
              <IonLabel className="text-gray-400">Smoking</IonLabel>
              <IonToggle color="primary" />
            </div>
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
};

export default EditAppearanceHealth;
