import {
  IonButton,
  IonButtons,
  IonCol,
  IonContent,
  IonGrid,
  IonHeader,
  IonIcon,
  IonInput,
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
import { chevronBack, closeOutline } from "ionicons/icons";
import { useRef, useState } from "react";
import Group from "../../public/assets/Group 1000001992.svg";
import brand from "../../public/assets/bg.svg";
function Otp() {
  const inputRefs = useRef([]);
  const [showModal, setShowModal] = useState(false);
  const modalRef = useRef(null);
  const router = useIonRouter();

  function handleOpenModal() {
    setShowModal(true);
  }

  function handleCloseModal() {
    setShowModal(false);
  }

  const handleConfirm = () => {
    handleCloseModal();
    router.push("/accountsetup");
  };
  const handleInputChange = (index, event) => {
    const { value } = event.target;
    if (value.length === 1 && index < inputRefs.current.length - 1) {
      inputRefs.current[index + 1].setFocus();
    }
  };

  const handleKeyDown = (index, event) => {
    if (event.key === "Backspace" && !event.target.value && index > 0) {
      inputRefs.current[index - 1].setFocus();
    }
  };
  const handleBackButtonClick = () => {
    router.push("/joinnow");
  };
  return (
    <>
      <IonPage>
        <IonHeader class="ion-no-border">
          <IonToolbar>
            <IonButtons slot="start">
              <IonButton onClick={handleBackButtonClick}>
                <IonIcon icon={chevronBack} defaultHref="" />
              </IonButton>
            </IonButtons>
          </IonToolbar>
        </IonHeader>
        <IonContent>
          <div className="flex flex-col items-center bg-black text-white h-full">
            <IonGrid className="flex flex-col items-center bg-black text-white h-full justify-around">
              <div className="flex flex-col justify-around gap-6">
                <IonRow className="flex justify-center ">
                  <IonCol size="auto">
                    <IonText>
                      <h1 className="text-3xl font-semibold mb-4">
                        Enter the number we texted you
                      </h1>
                    </IonText>
                  </IonCol>
                </IonRow>
                <IonRow className="flex w-full items-center gap-[30px] justify-evenly leading-none">
                  <div className="flex gap-2">
                    {[...Array(6)].map((_, index) => (
                      <IonRow key={index}>
                        <IonInput
                        type="tel"
                          maxlength={1}
                          className=" border-b border-gray-600 text-white w-10 text-center items-center"
                          ref={(inputElement) =>
                            (inputRefs.current[index] = inputElement)
                          }
                          onIonInput={(e) => handleInputChange(index, e)}
                          onKeyDown={(e) => handleKeyDown(index, e)}
                        ></IonInput>
                      </IonRow>
                    ))}
                  </div>
                  <IonIcon
                    className=" w-[22px] h-[22px]"
                    icon={closeOutline}
                  ></IonIcon>
                </IonRow>
                <IonRow className="flex justify-start mb-4">
                  <IonCol>
                    <IonText color="light">
                      <a href="#" className="underline text-primary">
                        Get new code
                      </a>
                    </IonText>
                  </IonCol>
                </IonRow>
              </div>
              <IonRow className="w-full max-w-xs mx-auto ">
                <IonCol>
                  <IonButton
                    onClick={handleOpenModal}
                    className="mt-8 bg-secondary w-full"
                  >
                    SUBMIT
                  </IonButton>
                  <IonModal
                    id="example-modal"
                    isOpen={showModal}
                    onDidDismiss={handleCloseModal}
                    ref={modalRef}
                    trigger="open-modal"
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
                        <IonGrid className="flex flex-col w-full justify-center items-center">
                          <IonRow className="relative">
                            <IonCol size="auto">
                              <IonItem lines="none">
                                <IonIcon
                                  size="large"
                                  icon={Group}
                                  className="z-10 w-24 h-24"
                                />
                              </IonItem>
                            </IonCol>
                          </IonRow>
                          <IonRow>
                            <IonCol>
                              <IonItem lines="none">
                                <IonLabel className="text-2xl w-64">
                                  <h1>
                                    The Matchmaker AI has partnered with{" "}
                                    <b>Veriff</b> to verify your income
                                  </h1>
                                </IonLabel>
                              </IonItem>
                            </IonCol>
                          </IonRow>
                          <IonRow>
                            <IonCol size="auto">
                              <IonItem
                                className="border border-bg-primary rounded-full  w-64"
                                lines="none"
                                button={true}
                                detail={false}
                                onClick={handleConfirm}
                              >
                                <IonIcon
                                  className="mr-6 w-8 h-8"
                                  icon={brand}
                                ></IonIcon>

                                <IonLabel>
                                  <b>Continue with Veriff</b>{" "}
                                </IonLabel>
                              </IonItem>
                            </IonCol>
                          </IonRow>
                        </IonGrid>
                      </IonList>
                    </IonContent>
                  </IonModal>
                </IonCol>
              </IonRow>
            </IonGrid>
          </div>
        </IonContent>
      </IonPage>
    </>
  );
}

export default Otp;
