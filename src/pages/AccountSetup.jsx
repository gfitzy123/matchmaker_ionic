import {
  IonButtons,
  IonButton,
  IonContent,
  IonHeader,
  IonIcon,
  IonItem,
  IonLabel,
  IonPage,
  IonToolbar,
  useIonRouter,
  IonGrid,
  IonRow,
  IonCol,
} from "@ionic/react";
import { chevronBack } from "ionicons/icons";
import checkmark from "../../public/assets/done.svg";

function AccountSetup() {
  const router = useIonRouter();

  const handleConfirm = () => {
    router.push("/uploadphoto");
  };
  const handleBack = () => {
    router.push("/joinnow");
  };

  return (
    <IonPage>
      <IonHeader class="ion-no-border">
        <IonToolbar>
          <IonButtons slot="start">
            <IonButton color="light" onClick={handleBack}>
              <IonIcon icon={chevronBack} defaultHref="" />
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonGrid className="flex flex-col px-4 h-full justify-around ">
          <div>
            <IonRow className="ion-align-items-center ion-justify-content-center">
              <IonCol size="auto">
                <IonIcon
                  size="large"
                  icon={checkmark}
                  className="z-10 w-12 h-12"
                ></IonIcon>
              </IonCol>
            </IonRow>

            <IonRow className="ion-align-items-center ion-justify-content-center">
              <IonCol size="auto">
                <IonLabel className="text-4xl w-full">
                  <h1 className="text-lg">Your account is set up</h1>
                </IonLabel>
              </IonCol>
            </IonRow>
          </div>

          <div>
            <IonRow className="ion-align-items-center ion-justify-content-center">
              <IonCol>
                <IonButton
                  className="rounded-full w-full text-center"
                  lines="none"
                  button={true}
                  detail={false}
                  onClick={handleConfirm}
                >
                  <IonLabel>Continue</IonLabel>
                </IonButton>
              </IonCol>
            </IonRow>
          </div>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
}

export default AccountSetup;
