import {
  IonModal,
  IonToolbar,
  IonHeader,
  IonButtons,
  IonButton,
  IonContent,
  IonIcon,
  IonLabel,
} from "@ionic/react";
import { Menubg, Menubgfull } from "./common/svg-icons";
import crown from "../../public/assets/crown.svg";
import { checkmarkSharp, closeSharp } from "ionicons/icons";

const SubscriptionModal = ({ presentingElement, modal, dismiss }) => {
  return (
    <IonModal ref={modal} trigger="modal" presentingElement={presentingElement}>
      <IonHeader class="ion-no-border">
        <IonToolbar color={"secondary"}>
          <IonButtons slot="end">
            <IonButton onClick={() => dismiss()}>
              <IonIcon icon={closeSharp} className="text-light" />
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent color={"secondary"}>
        <div className="flex flex-col gap-10 relative">
          <div className="flex flex-col gap-4 items-center ">
            <IonIcon className="w-14 h-10" icon={crown} />
            <IonLabel className="text-3xl">Premium Plan</IonLabel>
            <div className="absolute top-0 left-0 -z-10 opacity-10 w-[375px] h-[368px] ">
              <Menubgfull />
            </div>
          </div>
          <div className="flex flex-col gap-4 w-full p-11 ">
            <div className="flex w-full items-center gap-3 border border-primary rounded-lg px-6 py-5">
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

            <div className="flex  w-full gap-3 border border-primary rounded-lg px-6 py-5">
              <IonIcon
                className="flex-shrink-0"
                icon={checkmarkSharp}
                size="large"
                color="primary"
              />
              <IonLabel className="flex-grow">Multiple Searches A Day</IonLabel>
            </div>

            <div className="flex  w-full gap-3 border border-primary rounded-lg px-6 py-5">
              <IonIcon
                className="flex-shrink-0"
                icon={checkmarkSharp}
                size="large"
                color="primary"
              />
              <IonLabel className="flex-grow">Search By Height</IonLabel>
            </div>
            <div className="flex  w-full gap-3 border border-primary rounded-lg px-6 py-5">
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
            <IonLabel className="text-textSecondary">Just $10/month</IonLabel>
            <div className="absolute bottom-0 left-0 -z-10 opacity-10 w-[375px] h-[138px] ">
              <Menubg />
            </div>
          </div>
        </div>
      </IonContent>
    </IonModal>
  );
};

export default SubscriptionModal;
