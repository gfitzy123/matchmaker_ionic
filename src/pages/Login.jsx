import {
  IonAvatar,
  IonBackButton,
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonIcon,
  IonImg,
  IonInput,
  IonItem,
  IonLabel,
  IonList,
  IonModal,
  IonPage,
  IonSelect,
  IonSelectOption,
  IonText,
  IonTitle,
  IonToolbar,
  IonGrid,
  IonRow,
  IonCol,
  useIonRouter,
} from "@ionic/react";
import React, { useRef, useState } from "react";
import { countries } from "../data";
import Logo from "../../public/assets/logo.svg";
import Group from "../../public/assets/Group 1000001992.svg";
import brand from "../../public/assets/bg.svg";
import { chevronBack, closeOutline, personCircle } from "ionicons/icons";
import { MuiTelInput } from "mui-tel-input";

const Login = () => {
  const [step, setStep] = useState(0);
  const modal = useRef(null);
  const [showModal, setShowModal] = useState(false);
  const modalRef = useRef(null);
  const [phone, setPhone] = useState('');
  const inputRefs = useRef([]);
  const router = useIonRouter();

  const handleStepChange = (newStep) => {
    setStep(newStep);
  };
  const handleBackButtonClick = () => {
    setStep((prevStep) => Math.max(0, prevStep - 1));
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

  function dismiss() {
    modal.current?.dismiss();
  }

  function handleOpenModal() {
    setShowModal(true);
  }

  function handleCloseModal() {
    setShowModal(false);
  }
  const handleConfirm = () => {
    handleCloseModal();
    router.push('/accountsetup');
  };

  const handlePhoneChange = (newPhone) => {
    setPhone(newPhone);
  };
  return (
    <IonPage>
      <IonContent>
        {step === 0 && (
          <IonGrid className="flex flex-col items-center bg-black text-white h-full">
            <IonRow className="flex justify-center mb-8">
              <IonCol size="auto">
                <div className="bg-white p-4 rounded-full">
                  <img src={Logo} alt="Logo" className="h-16 w-16" />
                </div>
              </IonCol>
            </IonRow>
            <IonRow>
              <IonCol>
                <IonText>
                  <h1 className="text-3xl font-semibold text-center mb-4">
                    Join now
                  </h1>
                </IonText>
              </IonCol>
            </IonRow>
            <IonRow>
              <IonCol>
                <IonText>
                  <p className="text-center mb-8">
                    Enter your phone number to register in the app.
                  </p>
                </IonText>
              </IonCol>
            </IonRow>
            <IonRow className="w-full max-w-xs mx-auto">
              <IonCol>
                <IonLabel>Phone number</IonLabel>
              </IonCol>
            </IonRow>
            <IonRow className="w-full max-w-xs mx-auto">
              <IonCol>
                <MuiTelInput
                  value={phone}
                  onChange={handlePhoneChange}
                  defaultCountry="US"
                  inputProps={{
                    className: 'w-full '
                  }}
                  placeholder="Select Country"
                />
              </IonCol>
            </IonRow>
            <IonRow className="w-full max-w-xs mx-auto">
              <IonCol>
                <IonButton
                  className="mt-8 bg-secondary w-full"
                  onClick={() => handleStepChange(1)}
                >
                  CONTINUE
                </IonButton>
              </IonCol>
            </IonRow>
          </IonGrid>
        )}
        {step === 1 && (
          <>
            <IonHeader>
              <IonToolbar>
                <IonButtons slot="start">
                  <IonBackButton
                    icon={chevronBack}
                    defaultHref=""
                    onClick={handleBackButtonClick}
                  />
                </IonButtons>
              </IonToolbar>
            </IonHeader>
            <div className="flex flex-col items-center bg-black text-white h-full">
              <IonGrid className="flex flex-col items-start bg-black text-white h-full">
                <IonRow className="flex justify-center ">
                  <IonCol size="auto">
                    <IonText>
                      <h1 className="text-2xl font-semibold text-center mb-4">
                        Enter the number we texted you
                      </h1>
                    </IonText>
                  </IonCol>
                </IonRow>
                <IonRow className="flex justify-center items-center mb-8">
                  {[...Array(6)].map((_, index) => (
                    <IonCol size="auto" key={index}>
                      <IonInput
                        type="number"
                        maxlength={1}
                        className="text-center border-b border-gray-600 text-white w-12 text-2xl"
                        ref={(inputElement) =>
                          (inputRefs.current[index] = inputElement)
                        }
                        onIonInput={(e) => handleInputChange(index, e)}
                        onKeyDown={(e) => handleKeyDown(index, e)}
                      ></IonInput>
                    </IonCol>
                  ))}
                  <IonIcon className="mr-6 w-8 h-8" icon={closeOutline}></IonIcon>
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
                <IonRow className="w-full max-w-xs mx-auto ">
                  <IonCol>
                    <IonButton
                      onClick={handleOpenModal}
                      className="mt-8 bg-secondary w-full"
                    >
                      SUBMIT
                    </IonButton>
                  </IonCol>
                </IonRow>
              </IonGrid>
            </div>
          </>
        )}

        <IonModal
          isOpen={showModal}
          onDidDismiss={handleCloseModal}
          ref={modalRef}
        >
          <IonContent>
            <IonToolbar>
              <IonButtons slot="end">
                <IonBackButton
                  icon={closeOutline}
                  defaultHref=""
                  onClick={handleCloseModal}
                />
              </IonButtons>
            </IonToolbar>
            <IonList className="ion-justify-content-center ion-align-items-center">
              <IonGrid className="flex flex-col w-full justify-center items-center gap-8">
                <IonRow className="relative">
                  <IonCol size="auto">
                    <IonItem lines="none">
                      <IonIcon
                        size="large"
                        icon={Group}
                        className="z-10 w-24 h-24"
                      />
                      {/* <IonIcon
                        size="large"
                        icon={personCircle}
                        className="absolute top-2 left-4"
                      /> */}
                    </IonItem>
                  </IonCol>
                </IonRow>
                <IonRow>
                  <IonCol>
                    <IonItem lines="none">
                      <IonLabel className="text-4xl w-64">
                        <h1 className="text-lg">
                          The Matchmaker AI has partnered with Veriff to verify
                          your incom
                        </h1>
                      </IonLabel>
                    </IonItem>
                  </IonCol>
                </IonRow>
                <IonRow>
                  <IonCol size="auto">
                    <IonItem
                      className="border border-bg-primary rounded-full w-64"
                      lines="none"
                      button={true}
                      detail={false}
                    >
                      <IonIcon className="mr-6 w-8 h-8" icon={brand}></IonIcon>

                      <IonLabel onClick={handleConfirm}> Continue with Veriff</IonLabel>

                    </IonItem>
                  </IonCol>
                </IonRow>
              </IonGrid>
            </IonList>
          </IonContent>
        </IonModal>
      </IonContent>
    </IonPage>
  );
};

export default Login;
