import { useRef, useState } from "react";
import {
  IonContent,
  IonPage,
  useIonRouter,
  IonModal,
  IonGrid,
  IonText,
  IonButton,
  IonLabel,
  IonIcon,
  IonToolbar,
} from "@ionic/react";
import AccordionItem from "../components/common/AccordionItem";
import NavBar from "../components/common/NavBar";
import SwipImage from "../components/common/SwipImage";
import { IMAGE_URLS, otherProfileData } from "../data";
import { close, lockClosed } from "ionicons/icons";

const UserProfile = () => {
  const router = useIonRouter();
  const [showModal, setShowModal] = useState(false);

  const handleback = () => {
    router.push("/chat");
  };

  const handleSubscriptionModal = () => {
    setShowModal(true);
  };

  return (
    <IonPage>
      <NavBar backbutton={handleback} title="Back to matches" />
      <IonContent className="p-4">
        <div className="flex flex-col items-start gap-10 w-full">
          <SwipImage images={IMAGE_URLS} upload={true} pagination={true} />
        </div>
        <div className="py-10">
          <AccordionItem
            otherUser
            data={otherProfileData}
            handleSubscriptionModal={handleSubscriptionModal}
          />
        </div>
      </IonContent>
      <IonModal
        id="confirm-modal"
        isOpen={showModal}
        onDidDismiss={() => setShowModal(false)}
        trigger="open-modal"
        className="-bottom-80"
      >
        <IonContent color="secondary">
          <IonToolbar color={"secondary"}>
            <IonIcon slot="end" icon={close} onClick={() => setShowModal(false)} />
          </IonToolbar>
          <IonGrid className="flex flex-col gap-4 w-full justify-center items-center px-10">
            <div className="flex items-center justify-between w-full">
              <IonIcon icon={lockClosed} className="w-5 h-5" />
              <IonLabel className="w-full text-justify text-xl">
                This Feature is Locked
              </IonLabel>
            </div>
            <div className="flex items-center">
              <IonText>
                <p className="text-base text-justify w-full">
                  Become a Paid Member if you would like to use this feature
                </p>
              </IonText>
            </div>
            <IonButton className="w-full" color="primary">JOIN TO UNLOCK</IonButton>
          </IonGrid>
        </IonContent>
      </IonModal>
    </IonPage>
  );
};

export default UserProfile;
