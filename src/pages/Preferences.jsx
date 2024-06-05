import {
  IonButton,
  IonButtons,
  IonCol,
  IonContent,
  IonGrid,
  IonIcon,
  IonLabel,
  IonList,
  IonModal,
  IonPage,
  IonRow,
  IonText,
  IonToolbar,
  useIonRouter,
} from "@ionic/react";
import { chevronForward, closeOutline, lockClosed } from "ionicons/icons";
import { useEffect, useRef, useState } from "react";
import crown from "../../public/assets/crown.svg";
import NavBar from "../components/common/NavBar";
import { Menubg } from "../components/common/svg-icons";
import { itemData } from "../data";
import SubscriptionModal from "../components/subscribtion-modal";

const Preferences = () => {
  const router = useIonRouter();

  const handleprofile = () => {
    router.push("/chat");
  };
  const modal = useRef(null);
  const modalRef = useRef(null);
  const page = useRef(undefined);
  const [presentingElement, setPresentingElement] = useState(undefined);
  const [showModal, setShowModal] = useState(false);

  function handleOpenModal() {
    setShowModal(true);
  }

  function handleCloseModal() {
    setShowModal(false);
  }

  function dismiss() {
    modal.current?.dismiss();
  }

  useEffect(() => {
    setPresentingElement(page.current);
  }, []);

  return (
    <IonPage ref={page} className="p-4">
      <NavBar backbutton={handleprofile} title="My Preferences" />
      <IonContent>
        <IonGrid className=" flex flex-col justify-center gap-6 transform translate-y-6">
          {itemData.map((item, index) => (
            <IonRow
              key={index}
              lines="none"
              className="rounded-lg bg-secondary p-3"
            >
              <IonCol className="flex items-center">
                <IonLabel>{item.label}</IonLabel>
              </IonCol>
              <IonCol className="flex gap-1 justify-end items-center">
                {item.value ? (
                  <IonLabel className="text-right">{item.value}</IonLabel>
                ) : (
                  <IonIcon icon={lockClosed} onClick={handleOpenModal} />
                )}
                <IonIcon className="min-w-6 h-6" icon={chevronForward} />
              </IonCol>
            </IonRow>
          ))}
          <IonRow className="relative bg-[#30313696] p-4 rounded-lg">
            <IonCol size="8" className="flex flex-col gap-3">
              <IonText className="flex flex-col gap-3">
                <h1 className="text-lg">Enjoy all benefits!</h1>
                <p className="text-sm">
                  Find ideal partners with no restrictions on any parameters!
                </p>
              </IonText>
              <IonButton
                className="w-3/4"
                expand="block"
                onClick={() => modal.current?.present()}
              >
                Get Premium
              </IonButton>
            </IonCol>
            <IonCol size="4" className="flex justify-center items-center">
              <IonIcon className="w-20 h-14" icon={crown}></IonIcon>
            </IonCol>
            <IonRow className="absolute rounded-lg top-0 left-0 -z-10 opacity-10">
              <Menubg />
            </IonRow>
          </IonRow>
        </IonGrid>
        <SubscriptionModal
          presentingElement={presentingElement}
          dismiss={dismiss}
          modal={modal}
        />
        <IonModal
          id="lockmodal"
          isOpen={showModal}
          onDidDismiss={handleCloseModal}
          ref={modalRef}
          trigger="lockmodal"
          initialBreakpoint={0.25}
          breakpoints={[0, 0.25, 0.5, 0.75]}
          handleBehavior="cycle"
        >
          <IonToolbar color="secondary">
            <IonButtons slot="end">
              <IonButton onClick={handleCloseModal}>
                <IonIcon icon={closeOutline} defaultHref="" />
              </IonButton>
            </IonButtons>
          </IonToolbar>
          <IonContent color="secondary">
            <IonList className="ion-justify-content-center ion-align-items-center">
              <IonGrid className="flex flex-col gap-4 w-full justify-center items-center">
                <div className="flex items-center gap-3">
                  <IonIcon icon={lockClosed} size="large" />
                  <IonLabel className="w-full text-xl">
                    This Feature is Locked
                  </IonLabel>
                </div>
                <div className="flex items-center px-16 ">
                  <IonText>
                    <p className="text-base  w-full">
                      Become a Paid Member if you would like to use this feature
                    </p>
                  </IonText>
                </div>
                <IonButton color="primary">JOIN TO UNLOCK</IonButton>
              </IonGrid>
            </IonList>
          </IonContent>
        </IonModal>
      </IonContent>
    </IonPage>
  );
};

export default Preferences;
