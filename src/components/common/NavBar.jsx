import {
  IonCol,
  IonContent,
  IonFooter,
  IonHeader,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonMenuButton,
  IonModal,
  IonPopover,
  IonRow,
  IonText,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { chevronBack } from "ionicons/icons";
import { useRef, useState } from "react";
import verticalmenu from "../../../public/assets/DotsThreeVertical.svg";
import trash from "../../../public/assets/TrashSimple.svg";
import shareIcon from "../../../public/assets/Share.svg";
import signOutIcon from "../../../public/assets/SignOut.svg";
import namelogo from "../../../public/assets/namelogo.svg";
import SideMenu from "../SideMenu";

function NavBar({ backbutton, vertical, title }) {
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

  return (
    <>
      <IonHeader id="main-content" className="ion-no-border">
        <IonToolbar>
          <IonRow className="flex px-2 justify-around items-center flex-nowrap w-full ">
            {backbutton ? (
              <IonIcon className="w-6 h-6"
                onClick={backbutton}
                color="white"
                icon={chevronBack}
              />
            ) : (
              <IonMenuButton color="light" />
            )}
            {vertical && !title && (
              <IonTitle>
                <IonIcon className="w-44 h-4" icon={namelogo}></IonIcon>
              </IonTitle>
            )}

            {title || vertical ? (
              <IonLabel className="flex-1 text-xl text-center">
                {title}
              </IonLabel>
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
      <IonPopover
        className="border-0"
        trigger="bottom-start"
        side="bottom"
        alignment="start"
      >
        <IonList>
          <IonItem>
            <IonIcon icon={shareIcon}></IonIcon>
            <IonLabel className="ml-3">Share</IonLabel>
          </IonItem>
          <IonItem onClick={() => handleOpenModal("logout")}>
            <IonIcon icon={signOutIcon}></IonIcon>
            <IonLabel className="ml-3">Logout</IonLabel>
          </IonItem>
          <IonItem lines="none" onClick={() => handleOpenModal("delete")}>
            <IonIcon icon={trash}></IonIcon>
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
        <IonContent color="secondary">
          <IonList className="ion-justify-content-center ion-align-items-center">
            <IonRow>
              <IonCol>
                <IonItem lines="none">
                  <IonText className="w-full">
                    <h1
                      className={`text-base ${
                        modalContent === "logout"
                          ? "text-light"
                          : "text-dangerText"
                      }`}
                    >
                      {modalContent === "logout" ? "Logout" : "Delete Profile"}
                    </h1>
                  </IonText>
                </IonItem>
                <IonItem lines="none">
                  <IonText className="text-base leading-6 w-full">
                    <p>
                      {modalContent === "logout"
                        ? "Are you sure you want to logout?"
                        : "Are you want to delete your account? This action cannot be undone."}
                    </p>
                  </IonText>
                </IonItem>
              </IonCol>
            </IonRow>
          </IonList>
          <IonFooter>
            <div className="flex justify-end items-center gap-6 py-4 px-5 h-full">
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
      <SideMenu />
    </>
  );
}

export default NavBar;
