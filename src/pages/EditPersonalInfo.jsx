import {
  IonButton,
  IonContent,
  IonGrid,
  IonInput,
  IonPage,
  IonRow,
  useIonRouter,
  IonCol,
} from "@ionic/react";
import NavBar from "../components/common/NavBar";

const EditPersonalInfo = () => {
  const router = useIonRouter();

  const handleback = () => {
    router.push("/profile");
  };
  return (
    <IonPage>
      <NavBar backbutton={handleback} title="Personal Information"/>
      <IonContent>
        <IonGrid className="flex flex-col p-4 gap-4 ">
          <IonRow>
            <IonCol className="w-full flex flex-col gap-4">
            <IonInput
              label="Name"
              labelPlacement="floating"
              className="border-b h-16"
            />
            <IonInput
              label="Gender"
              labelPlacement="floating"
              className="border-b h-16"
            />
            <IonInput
              label="Birthday"
              type="date"
              labelPlacement="floating"
              className="border-b h-16"
            />
            <IonInput
              label="Ethnicity"
              labelPlacement="floating"
              className="border-b h-16"
            />
            <IonInput
              label="City"
              labelPlacement="floating"
              className="border-b h-16"
            />
            <IonInput
              label="Address"
              labelPlacement="floating"
              className="border-b h-16"
            />
            </IonCol>
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

export default EditPersonalInfo;
