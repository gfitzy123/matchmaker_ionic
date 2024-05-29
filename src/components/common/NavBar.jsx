import {
  IonContent,
  IonHeader,
  IonIcon,
  IonRow,
  IonToolbar,
  IonMenuButton,
  IonMenu,
  IonButtons,
  IonList,
  IonLabel,
  IonItem,
  IonFooter,
  IonCol,
  IonText,
  IonButton,
  IonMenuToggle,
  useIonRouter,
  IonTitle,
} from "@ionic/react";
import namelogo from "../../../public/assets/namelogo.svg";
import verticalmenu from "../../../public/assets/DotsThreeVertical.svg";
import { chevronBack, chevronForward, close } from "ionicons/icons";
import chat from "../../../public/assets/chat.svg";
import settings from "../../../public/assets/settings.svg";
import preferences from "../../../public/assets/preferences.svg";
import headset from "../../../public/assets/headset.svg";
import personImg from "../../../public/assets/Ellipse.svg";
import crown from "../../../public/assets/crown.svg";
import { Menubg, Logo } from "./svg-icons";

function NavBar({backbutton,vertical,title}) {
  const router = useIonRouter();

  const handleprofile = () => {
    router.push("/profile");
  };
  return (
    <>
      <IonHeader id="main-content">
        <IonToolbar>
          <IonRow className="flex px-4 justify-around items-center flex-nowrap w-full ">
          {backbutton ? (
                <IonIcon onClick={backbutton} color="white" icon={chevronBack} size="medium" />
            ) : (
              <IonMenuButton/>
            )}
          {vertical && !title && (
              <IonTitle>
                <IonIcon className="w-44 h-4" icon={namelogo}></IonIcon>
              </IonTitle>
            )}

            {title || vertical ? (
              <IonLabel className="flex-1 text-center">{title}</IonLabel>
            ) : null}
            {vertical && (
              <IonIcon className="w-8 h-8" icon={verticalmenu}></IonIcon>
            )}
          </IonRow>
        </IonToolbar>
      </IonHeader>
      <IonMenu contentId="main-content">
        <IonHeader class="ion-no-border">
          <IonToolbar  className="flex justify-between items-center">
            <div className="flex justify-between items-center px-8">
          <Logo/>
              <IonButtons slot="end">
                <IonMenuToggle>
                  <IonIcon size="small" icon={close} />
                </IonMenuToggle>
              </IonButtons>
            </div>
          </IonToolbar>
        </IonHeader>
        <IonContent>
        <IonItem className=" border-b mx-8 max-h-1 border-borderColor"></IonItem>
          <IonList inset={true} lines="none">
            <IonItem>
              <IonIcon slot="start" icon={chat} size="medium" />
              <IonLabel>Chat with AI</IonLabel>
            </IonItem>
            <IonItem>
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
            <IonItem onClick={handleprofile}>
              <IonIcon slot="start" icon={personImg} size="large" />
              <IonLabel>Devon Lane</IonLabel>
              <IonIcon color="light" slot="end" icon={chevronForward} size="small" />
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
              <IonButton className="w-3/4">Get Premium</IonButton>
            </IonCol>
            <IonCol size="2">
              <IonIcon icon={crown} size="large"></IonIcon>
            </IonCol>
          </IonRow>
          <div className="absolute top-0 left-0 -z-10 opacity-20 w-[343px] h-[193px]">
            <Menubg/>
          </div>
        </IonFooter>
      </IonMenu>
    </>
  );
}

export default NavBar;