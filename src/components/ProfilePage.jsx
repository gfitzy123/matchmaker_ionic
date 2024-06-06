import { useState } from "react";
import {
  IonContent,
  IonIcon,
  IonPage,
  IonProgressBar,
  useIonRouter,
  IonModal,
  IonGrid,
  IonText,
  IonButton,
  IonLabel,
  IonToolbar,
} from "@ionic/react";
import Pencil from "../../public/assets/Pencil.svg";
import AccordionItem from "./common/AccordionItem";
import NavBar from "./common/NavBar";
import SwipImage from "./common/SwipImage";
import { IMAGE_URLS, ACCORDION_DATA, otherProfileData } from "../data";
import { lockClosed, close } from "ionicons/icons";

const ProfilePage = ({ otherUser }) => {
  const [showModal, setShowModal] = useState(false);

  const handleSubscriptionModal = () => {
    setShowModal(true);
  };

  return (
    <IonContent className="p-4">
      <div className="flex flex-col items-start gap-10 w-full">
        <SwipImage images={IMAGE_URLS} upload={true} pagination={true} />
        {!otherUser && (
          <div className="relative px-4 w-full flex flex-col gap-3">
            <div className="absolute right-4 bottom-12 z-10">
              <IonIcon
                size="large"
                className="p-3 rounded-full bg-secondary"
                icon={Pencil}
              />
            </div>
            <p className="text-gray-500">
              80% profile completed.{" "}
              <span className="font-bold text-primary">Edit with AI</span>
            </p>
            <IonProgressBar value={0.8} />
          </div>
        )}
      </div>
      <div className="py-10">
        <AccordionItem
          otherUser={otherUser}
          data={otherUser ? otherProfileData : ACCORDION_DATA}
          handleSubscriptionModal={handleSubscriptionModal}
        />
      </div>
      <IonModal
        id="confirm-modal"
        isOpen={showModal}
        onDidDismiss={() => setShowModal(false)}
        trigger="open-modal"
        className="-bottom-80"
      >
        <IonContent color="secondary">
          <IonToolbar color={"secondary"}>
            <IonIcon
              slot="end"
              icon={close}
              onClick={() => setShowModal(false)}
            />
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
            <IonButton className="w-full" color="primary">
              JOIN TO UNLOCK
            </IonButton>
          </IonGrid>
        </IonContent>
      </IonModal>
    </IonContent>
  );
};

export default ProfilePage;
