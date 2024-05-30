import {
  IonHeader,
  IonToolbar,
  IonButton,
  IonButtons,
  IonCol,
  IonContent,
  IonGrid,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonModal,
  IonPage,
  IonRow,
  useIonRouter,
} from "@ionic/react";
import { chevronBack } from "ionicons/icons";
import profile from "../../public/assets/UserSquare.svg";
import Insta from "../../public/assets/insta.svg";
import { useRef, useState } from "react";

function UploadPhoto() {
  const modal = useRef(null);
  const [showModal, setShowModal] = useState(false);
  const router = useIonRouter();

  const handleConfirm = () => {
    router.push("/accountsetup");
  };
  const handlewelcome = () => {
    router.push("/welcome");
  };

  function handleCloseModal() {
    setShowModal(false);
  }

  return (
    <IonPage>
      <IonHeader class="ion-no-border">
        <IonToolbar>
          <IonButtons slot="start">
            <IonButton color="light" onClick={handleConfirm}>
              <IonIcon  icon={chevronBack} defaultHref="" />
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonGrid className="flex justify-center items-center w-full h-full">
          <IonRow className="ion-justify-content-center w-full ion-align-items-center">
            <div className="flex flex-col w-full items-center gap-[120px] ">
              <div className="flex flex-col items-center">
                <IonIcon
                  size="large"
                  icon={profile}
                  className="z-10 w-20 h-20"
                />
                <IonLabel className="text-4xl w-full">
                  <h1 className="text-lg">Upload photo on your profile</h1>
                </IonLabel>
              </div>
              <IonList className="flex flex-col w-full p-4 items-center gap-6 bg-background">
                <IonButton
                  className="border border-light rounded-full w-full text-center"
                  lines="none"
                  button
                  color="light"
                  fill="clear"
                  detail={false}
                  onClick={handlewelcome}
                >
                  <IonLabel>Take Photo</IonLabel>
                </IonButton>
                <IonButton
                  className="border border-light rounded-full w-full text-center"
                  lines="none"
                  button
                  color="light"
                  fill="clear"
                  detail={false}
                >
                  <IonLabel>Choose From Camera Roll</IonLabel>
                </IonButton>
                <IonButton
                  className="border border-light rounded-full pr-9 w-full"
                  lines="none"
                  button
                  color="light"
                  fill="clear"
                  detail={false}
                >
                  <IonIcon slot="start" className="mr-6 w-6 h-6" icon={Insta}></IonIcon>
                  <IonLabel>Use From Your Instagram</IonLabel>
                </IonButton>
              </IonList>
            </div>
          </IonRow>
        </IonGrid>
        <IonModal
          isOpen={showModal}
          onDidDismiss={handleCloseModal}
          ref={modal}
        >
          <IonList className="ion-justify-content-center bg-background ion-align-items-center h-full ">
            <div className="flex flex-col w-full justify-between items-center ">
              <div>
                <IonLabel className="text-4xl w-full">
                  <h1 className="text-lg text-center">
                    "Matchmaker AI" Would Like To Access The Camera
                  </h1>
                </IonLabel>
                <IonLabel className="text-4xl w-64">
                  <h2 className="text-lg text-center">
                    This lets you do things take and share photos, record
                    videos, and use other special features and effects.
                  </h2>
                </IonLabel>
              </div>
              <div>
                <IonGrid className="w-full">
                  <IonRow className="flex items-center justify-center  gap-10">
                    <IonCol size="auto">
                      <IonItem
                        className="w-full whitespace-nowrap"
                        lines="none"
                        button={true}
                        detail={false}
                        onClick={handleCloseModal}
                      >
                        <IonLabel onClick={handleConfirm}>Don't Allow</IonLabel>
                      </IonItem>
                    </IonCol>
                    <IonCol size="auto">
                      <IonItem
                        className="w-full"
                        lines="none"
                        button={true}
                        detail={false}
                        onClick={handleCloseModal}
                      >
                        <IonLabel onClick={handleCloseModal}>Ok</IonLabel>
                      </IonItem>
                    </IonCol>
                  </IonRow>
                </IonGrid>
              </div>
            </div>
          </IonList>
        </IonModal>
      </IonContent>
    </IonPage>
  );
}

export default UploadPhoto;
