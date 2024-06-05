import { useRef, useState, useEffect } from "react";
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
  IonList,
  IonMenu,
  IonMenuToggle,
  IonRow,
  IonText,
  IonToolbar,
  useIonRouter,
} from "@ionic/react";
import { chevronForward, close } from "ionicons/icons";
import personImg from "../../public/assets/Ellipse.svg";
import chat from "../../public/assets/chat.svg";
import crown from "../../public/assets/crown.svg";
import headset from "../../public/assets/headset.svg";
import preferences from "../../public/assets/preferences.svg";
import settings from "../../public/assets/settings.svg";
import { Logo, Menubg } from "./common/svg-icons"
import SubscriptionModal from "./subscribtion-modal";

const SideMenu = () => {
  const router = useIonRouter();
  const modal = useRef(null);
  const page = useRef(undefined);
  const [presentingElement, setPresentingElement] = useState(undefined);

  function dismiss() {
    modal.current?.dismiss();
  }

  useEffect(() => {
    setPresentingElement(page.current);
  }, []);

  const handlechat = () => {
    router.push("/chat");
  };
  const handleprofile = () => {
    router.push("/profile");
  };
  const handlepreferences = () => {
    router.push("/preferences");
  };

  return (
    <IonMenu ref={page} contentId="main-content">
      <IonHeader class="ion-no-border">
        <IonToolbar
          color="secondary"
          className="flex justify-between items-center"
        >
          <div className="flex justify-between items-center px-8 pt-8">
            <Logo />
            <IonButtons slot="end">
              <IonMenuToggle>
                <IonIcon size="small" icon={close} />
              </IonMenuToggle>
            </IonButtons>
          </div>
        </IonToolbar>
      </IonHeader>
      <IonContent color="secondary">
        <IonItem className=" border-b mx-8 max-h-1 border-borderColor"></IonItem>
        <IonList inset={true} lines="none">
          <IonItem onClick={handlechat}>
            <IonIcon slot="start" icon={chat} size="medium" />
            <IonLabel>Chat with AI</IonLabel>
          </IonItem>
          <IonItem onClick={handlepreferences}>
            <IonIcon slot="start" icon={preferences} size="medium" />
            <IonLabel>My Preferences</IonLabel>
          </IonItem>
          <IonItem>
            <IonIcon slot="start" icon={settings} size="medium" />
            <IonLabel>Settings</IonLabel>
          </IonItem>
          <IonItem>
            <IonIcon slot="start" icon={headset} size="medium" />
            <IonLabel>Support</IonLabel>
          </IonItem>
          <IonItem className="border-b mx-4 max-h-3 py-2 border-borderColor"></IonItem>
          <IonItem className="pt-2" onClick={handleprofile}>
            <IonIcon slot="start" icon={personImg} size="large" />
            <IonLabel>Devon Lane</IonLabel>
            <IonIcon
              color="light"
              slot="end"
              icon={chevronForward}
              size="small"
            />
          </IonItem>
        </IonList>
      </IonContent>
      <IonFooter className="p-4 relative">
        <IonRow>
          <IonCol className="flex flex-col gap-3" size="10">
            <IonText className="flex flex-col gap-3">
              <h1 className="text-lg">Enjoy all benefits!</h1>
              <p className="text-sm">
                Find ideal partners with no restrictions on any parameters!
              </p>
            </IonText>
            <IonButton
              className="w-3/4"
              onClick={() => modal.current?.present()}
            >
              Get Premium
            </IonButton>
          </IonCol>
          <IonCol size="2">
            <IonIcon icon={crown} size="large"></IonIcon>
          </IonCol>
        </IonRow>
        <div className="absolute top-0 left-0 -z-10 opacity-20 w-[343px] h-[148px]">
          <Menubg />
        </div>
      </IonFooter>
      <SubscriptionModal
        modal={modal}
        presentingElement={presentingElement}
        dismiss={dismiss}
      />
    </IonMenu>
  );
};

export default SideMenu;
