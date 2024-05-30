import {
  IonButton,
  IonButtons,
  IonCol,
  IonContent,
  IonFooter,
  IonGrid,
  IonHeader,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonModal,
  IonPage,
  IonRow,
  IonText,
  IonToolbar,
  useIonRouter,
} from "@ionic/react";
import {
  checkmarkSharp,
  chevronForward,
  closeOutline,
  closeSharp,
  lockClosed,
} from "ionicons/icons";
import { useEffect, useRef, useState } from "react";
import crown from "../../public/assets/crown.svg";
import NavBar from "../components/common/NavBar";
import { Menubg, Menubgfull } from "../components/common/svg-icons";
import { itemData } from "../data";

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
        <div className=" flex flex-col gap-6 transform translate-y-6">
          {itemData.map((item, index) => (
            <IonItem
              key={index}
              color="secondary"
              lines="none"
              className="rounded-lg"
            >
              <IonLabel>{item.label}</IonLabel>
              {item.value ? (
                <IonLabel className="text-right">{item.value}</IonLabel>
              ) : (
                <IonIcon icon={lockClosed} onClick={handleOpenModal} />
              )}
              <IonIcon icon={chevronForward} />
            </IonItem>
          ))}
        </div>
        <IonModal
          ref={modal}
          trigger="modal"
          presentingElement={presentingElement}
        >
          <IonHeader class="ion-no-border">
            <IonToolbar>
              <IonButtons slot="end">
                <IonButton onClick={() => dismiss()}>
                  <IonIcon icon={closeSharp} className="text-white" />
                </IonButton>
              </IonButtons>
            </IonToolbar>
          </IonHeader>
          <IonContent>
            <div className="flex flex-col gap-10 relative">
              <div className="flex flex-col gap-4 items-center ">
                <IonIcon size="large" icon={crown} />
                <IonLabel className="text-2xl">Premium Plan</IonLabel>
                <div className="absolute top-0 left-0 -z-10 opacity-10 w-[375px] h-[368px] ">
                  <Menubgfull />
                </div>
              </div>
              <div className="flex flex-col gap-4 w-full p-11 ">
                <div className="flex w-full items-center gap-3 border rounded-lg px-6 py-5">
                  <IonIcon
                    icon={checkmarkSharp}
                    size="large"
                    className="flex-shrink-0"
                    color="primary"
                  />
                  <IonLabel className="flex-grow">
                    Search By Verified Income Bracket +$150,000
                  </IonLabel>
                </div>

                <div className="flex  w-full gap-3 border rounded-lg px-6 py-5">
                  <IonIcon
                    className="flex-shrink-0"
                    icon={checkmarkSharp}
                    size="large"
                    color="primary"
                  />
                  <IonLabel className="flex-grow">
                    Multiple Searches A Day
                  </IonLabel>
                </div>

                <div className="flex  w-full gap-3 border rounded-lg px-6 py-5">
                  <IonIcon
                    className="flex-shrink-0"
                    icon={checkmarkSharp}
                    size="large"
                    color="primary"
                  />
                  <IonLabel className="flex-grow">Search By Height</IonLabel>
                </div>

                <div className="flex  w-full gap-3 border rounded-lg px-6 py-5">
                  <IonIcon
                    className="flex-shrink-0"
                    icon={checkmarkSharp}
                    size="large"
                    color="primary"
                  />
                  <IonLabel className="flex-grow">
                    Search By Attractiveness Level
                  </IonLabel>
                </div>
              </div>
              <div className="flex flex-col justify-center items-center gap-3 p-4 ">
                <IonButton className=" font-semibold rounded-lg w-full">
                  JOIN TO UPGRADE
                </IonButton>
                <IonLabel className="">Just $10/month</IonLabel>
                <div className="absolute bottom-0 left-0 -z-10 opacity-10 w-[375px] h-[138px] ">
                  <Menubg />
                </div>
              </div>
            </div>
          </IonContent>
        </IonModal>
        <IonModal
        id='lockmodal'
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
      <IonFooter className="p-4 bg-secondary rounded-lg relative">
        <IonRow className="" color="secondary">
          <IonCol size="8" className="flex flex-col gap-3">
            <IonText className="flex flex-col gap-3">
              <h1 className="text-lg">Enjoy all benefits!</h1>
              <p className="text-sm">
                Find ideal partners with no restrictions on any parameters!
              </p>
            </IonText>
            <IonButton className="w-3/4" id="modal" expand="block">
              Get Premium
            </IonButton>
          </IonCol>
          <IonCol size="4" className="flex justify-center items-center">
            <IonIcon icon={crown} size="large"></IonIcon>
          </IonCol>
        </IonRow>
        <div className="absolute top-0 left-0 -z-10 opacity-10 w-[343px] h-[148px] ">
          <Menubg />
        </div>
      </IonFooter>
    </IonPage>
  );
};

export default Preferences;
