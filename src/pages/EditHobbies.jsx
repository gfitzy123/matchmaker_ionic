import {
  IonButton,
  IonChip,
  IonContent,
  IonPage,
  IonRow,
  IonTextarea,
  useIonRouter,
  IonText,
  IonGrid,
} from "@ionic/react";
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
        <IonGrid className="flex flex-col p-4 gap-8">
          <IonRow className="w-full flex flex-col">
            <IonText className="text-xs text-textSecondary">Favourite Activities</IonText>
            <IonRow className="w-full">
              {RANDOMCHIP.map((value, index) => (
                <IonChip key={index} className="bg-pausebutton text-light">
                  {value}
                </IonChip>
              ))}
            </IonRow>
          </IonRow>
          <IonRow>
          <IonTextarea
              label="Celebrities I Like"
              labelPlacement="floating"
              className="border-b border-bg-primary"
            />
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
}

export default EditHobbies;
