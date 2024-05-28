import {
  IonButton,
  IonContent,
  IonInput,
  IonPage,
  useIonRouter,
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
        <div className="flex flex-col p-4 gap-4 ">
          <div className="w-full flex flex-col gap-4">
            <IonInput
              label="Name"
              labelPlacement="stacked"
              className="border-b border-bg-primary"
            />
            <IonInput
              label="Gender"
              labelPlacement="stacked"
              className="border-b border-bg-primary"
            />
            <IonInput
              label="Birthday"
              type="date"
              labelPlacement="stacked"
              className="border-b border-bg-primary"
            />
            <IonInput
              label="Ethnicity"
              labelPlacement="stacked"
              className="border-b border-bg-primary"
            />
            <IonInput
              label="City"
              labelPlacement="stacked"
              className="border-b border-bg-primary"
            />
            <IonInput
              label="Address"
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
};

export default EditPersonalInfo;
