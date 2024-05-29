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
  IonMenuButton,
  IonMenuToggle,
  IonModal,
  IonPopover,
  IonRow,
  IonText,
  IonTitle,
  IonToolbar,
  useIonRouter,
} from "@ionic/react";
import {
  chevronBack,
  chevronForward,
  close,
  logOutOutline,
  shareSocialOutline,
} from "ionicons/icons";
import { useRef, useState } from "react";
import verticalmenu from "../../../public/assets/DotsThreeVertical.svg";
import personImg from "../../../public/assets/Ellipse.svg";
import trash from "../../../public/assets/TrashSimple.svg";
import chat from "../../../public/assets/chat.svg";
import crown from "../../../public/assets/crown.svg";
import headset from "../../../public/assets/headset.svg";
import namelogo from "../../../public/assets/namelogo.svg";
import preferences from "../../../public/assets/preferences.svg";
import settings from "../../../public/assets/settings.svg";
import { Logo, Menubg } from "./svg-icons";

function NavBar({ backbutton, vertical, title }) {
  const router = useIonRouter();
  const [showModal, setShowModal] = useState(false);
  const [modalContent, setModalContent] = useState("");
  const modalRef = useRef(null);

  const handleOpenModal = (content) => {
    setModalContent(content);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

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
    <>
      <IonHeader id="main-content">
        <IonToolbar>
          <IonRow className="flex px-4 justify-around items-center flex-nowrap w-full ">
            {backbutton ? (
              <IonIcon
                onClick={backbutton}
                color="white"
                icon={chevronBack}
                size="medium"
              />
            ) : (
              <IonMenuButton />
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
              <IonIcon
                id="bottom-start"
                className="w-8 h-8"
                icon={verticalmenu}
              ></IonIcon>
            )}
          </IonRow>
        </IonToolbar>
      </IonHeader>
      <IonPopover trigger="bottom-start" side="bottom" alignment="start">
        <IonList>
          <IonItem>
            <IonIcon
              color="white"
              size="large"
              icon={shareSocialOutline}
            ></IonIcon>
            <IonLabel className="ml-3">Share</IonLabel>
          </IonItem>
          <IonItem onClick={() => handleOpenModal("logout")}>
            <IonIcon color="white" size="large" icon={logOutOutline}></IonIcon>
            <IonLabel className="ml-3">Logout</IonLabel>
          </IonItem>
          <IonItem lines="none" onClick={() => handleOpenModal("delete")}>
            <IonIcon color="white" size="large" icon={trash}></IonIcon>
            <IonLabel className="ml-3 ">Delete</IonLabel>
          </IonItem>
        </IonList>
      </IonPopover>

      <IonModal
        id="confirm-modal"
        isOpen={showModal}
        onDidDismiss={handleCloseModal}
        ref={modalRef}
        trigger="open-modal"
      >
        <IonContent>
          <IonList className="ion-justify-content-center ion-align-items-center">
            <IonRow>
              <IonCol>
                <IonItem lines="none">
                  <IonLabel className="text-2xl w-full">
                    <h1>{modalContent === "logout" ? "Logout" : "Delete"}</h1>
                  </IonLabel>
                </IonItem>
                <IonItem lines="none">
                  <IonLabel className="text-2xl w-full">
                    <h1>
                      {modalContent === "logout"
                        ? "Are you sure you want to logout?"
                        : "Are you want to delet your account?This action cannot be undone"}
                    </h1>
                  </IonLabel>
                </IonItem>
              </IonCol>
            </IonRow>
          </IonList>
          <IonFooter>
            <div className="flex justify-end gap-6 p-4">
              <IonLabel color="primary" onClick={handleCloseModal}>
                NO
              </IonLabel>
              <IonLabel color="primary" onClick={handleCloseModal}>
                YES
              </IonLabel>
            </div>
          </IonFooter>
        </IonContent>
      </IonModal>

      <IonMenu contentId="main-content">
        <IonHeader class="ion-no-border">
          <IonToolbar className="flex justify-between items-center">
            <div className="flex justify-between items-center px-8">
              <Logo />
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
            <IonItem onClick={handleprofile}>
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
              <IonButton className="w-3/4">Get Premium</IonButton>
            </IonCol>
            <IonCol size="2">
              <IonIcon icon={crown} size="large"></IonIcon>
            </IonCol>
          </IonRow>
          <div className="absolute top-0 left-0 -z-10 opacity-20 w-[343px] h-[148px]">
            <Menubg />
          </div>
        </IonFooter>
      </IonMenu>
    </>
  );
}

export default NavBar;
