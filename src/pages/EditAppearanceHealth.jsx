import React from "react";
import {
  IonPage,
  IonContent,
  IonLabel,
  IonInput,
  IonTextarea,
  IonToggle,
  IonButton,
  useIonRouter,
  IonGrid,
  IonRow,
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
        <IonGrid className="flex flex-col p-4 gap-10">
          <IonRow className="w-full flex flex-col gap-4">
            <IonInput
              label="Height"
              labelPlacement="floating"
              className="border-b h-16"
            />
            <IonInput
              label="Build"
              labelPlacement="floating"
              className="border-b h-16"
            />
            <IonInput
              label="Hair color"
              labelPlacement="floating"
              className="border-b h-16"
            />
            <IonInput
              label="Eye color"
              labelPlacement="floating"
              className="border-b h-16"
            />
            <IonTextarea
              label="Physical description"
              labelPlacement="floating"
              className="border-b border-bg-primary"
            />
            <div className="flex justify-between items-center">
              <IonLabel >COVID Vaccinated</IonLabel>
              <IonToggle mode="md" className="rounded-full" color="primary" />
            </div>
            <div className="flex justify-between items-center">
              <IonLabel >Smoking</IonLabel>
              <IonToggle mode="md" className="rounded-full" color="primary" />
            </div>
          </IonRow>
          <IonButton
            expand="block"
            className="bg-yellow-500 text-black font-semibold rounded-lg"
          >
            SAVE
          </IonButton>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default EditAppearanceHealth;
