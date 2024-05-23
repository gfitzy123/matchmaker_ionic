import {
    IonHeader,
    IonToolbar,
    IonImg,
    IonButton,
    IonToggle,
    IonButtons,
    IonIcon,
    IonMenu,
    IonContent,
    IonMenuButton,
    IonPage,
    IonText,
    IonInput,
  } from "@ionic/react";
  import { close } from "ionicons/icons";
const Header = () => {
  return (
    <div>
              <IonMenu side="end" contentId="main-content">
        <IonToolbar>
          <IonButtons slot="end">
            <ion-menu-toggle>
              <IonIcon size="large" icon={close} />
            </ion-menu-toggle>
          </IonButtons>
        </IonToolbar>
        <IonContent className="ion-padding flex flex-col justify-center items-center">
          <IonButtons className="flex flex-col gap-5">
            <IonButton className="w-full" fill="outline">
              Get Matched
            </IonButton>
            <IonButton fill="clear">About</IonButton>
            <IonButton fill="clear">How it works</IonButton>
            <IonButton fill="clear">FAQ</IonButton>
            <div className="w-full divider border-b-2 h-1 mt-2 mb-2" />
            <IonButton fill="clear">Facebook</IonButton>
            <IonButton fill="clear">Instagram</IonButton>
            <IonButton fill="clear">X(Twitter)</IonButton>
            <IonButton fill="clear">LinkedIn</IonButton>
          </IonButtons>
          <IonButtons className="flex justify-center gap-1 p-10">
            <span>Dark</span>
            <IonToggle
            />
            <span>Light</span>
          </IonButtons>
        </IonContent>
      </IonMenu>
      <div className="flex w-full justify-between p-3 fixed bg-secondary">
            <div className="hidden lg:flex gap-3">
              <button>About</button>
              <button>How it works</button>
              <button>FAQ</button>
            </div>
            <div className="flex justify-center items-center">
              <img className="w-96" src="logo.svg" alt="Logo" />
            </div>
            <div className="gap-3 hidden lg:flex items-center">
              <span>Dark</span>
              <IonToggle />
              <span>Light</span>
              <button
                className="outline-primary hidden lg:block"
              >
                Get Matched
              </button>
            </div>
            <IonButtons slot="end" className=" lg:hidden">
              <IonMenuButton></IonMenuButton>
            </IonButtons>
        </div>
    </div>
  )
};

export default Header;
