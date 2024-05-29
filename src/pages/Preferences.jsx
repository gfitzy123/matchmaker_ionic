import {
  IonButton,
  IonButtons,
  IonCol,
  IonContent,
  IonFooter,
  IonHeader,
  IonIcon,
  IonItem,
  IonLabel,
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
  const modal2 = useRef(null);
  const page = useRef(undefined);

  const [presentingElement, setPresentingElement] = useState(undefined);

  useEffect(() => {
    setPresentingElement(page.current);
  }, []);

  function dismiss() {
    modal.current?.dismiss();
  }
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
                <IonIcon icon={lockClosed}  />
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
                <IonItem lines="none">
                  <div className="flex w-full gap-3 border rounded-lg px-6 py-5">
                    <IonIcon icon={checkmarkSharp} size="large" />
                    <IonLabel>
                      Search By Verified Income Bracket +$150,000
                    </IonLabel>
                  </div>
                </IonItem>

                <IonItem lines="none">
                  <div className="flex  w-full gap-3 border rounded-lg px-6 py-5">
                    <IonIcon icon={checkmarkSharp} size="large" />
                    <IonLabel>Multiple Searches A Day</IonLabel>
                  </div>
                </IonItem>
                <IonItem lines="none">
                  <div className="flex  w-full gap-3 border rounded-lg px-6 py-5">
                    <IonIcon icon={checkmarkSharp} size="large" />
                    <IonLabel>Search By Height</IonLabel>
                  </div>
                </IonItem>
                <IonItem lines="none">
                  <div className="flex  w-full gap-3 border rounded-lg px-6 py-5">
                    <IonIcon icon={checkmarkSharp} size="large" />
                    <IonLabel>Search By Attractiveness Level</IonLabel>
                  </div>
                </IonItem>
              </div>
              <div className="flex flex-col justify-center items-center gap-3 p-4">
                <IonButton  className=" font-semibold rounded-lg w-full">
                  JOIN TO UPGRADE
                </IonButton>
                <IonLabel className="">Just $10/month</IonLabel>
              </div>
            </div>
          </IonContent>
        </IonModal>
        <IonModal ref={modal2} trigger="open-modal" initialBreakpoint={1} breakpoints={[0, 5]}>
          <div className="block">Block of Content</div>
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
