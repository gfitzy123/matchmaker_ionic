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
  IonModal,
  IonPage,
  IonRow,
  IonText,
  IonToast,
  IonToolbar,
  useIonRouter,
} from "@ionic/react";
import { doc, getDoc } from "firebase/firestore";
import { chevronBack, closeOutline } from "ionicons/icons";
import { useRef, useState } from "react";
import { useHistory } from "react-router";
import Group from "../../public/assets/Group 1000001992.svg";
import brand from "../../public/assets/bg.svg";
import { db } from "../config/firebase";
import { useHomeContext } from "../context/Home";

function Otp() {
  const inputRefs = useRef([]);
  const [showModal, setShowModal] = useState(false);
  const modalRef = useRef(null);
  const router = useIonRouter();
  const history = useHistory();
  const [inputOtp, setInputOtp] = useState("");
  const [toast, setToast] = useState({
    show: false,
    message: "",
  });
  const { otp } = useHomeContext();

  function handleCloseModal() {
    setShowModal(false);
  }

  const handleConfirm = () => {
    handleCloseModal();
    router.push("/identity");
  };

  const handleInputChange = (index, event) => {
    const { value } = event.target;
    if (value.length === 1 && index < inputRefs.current.length - 1) {
      inputRefs.current[index + 1].setFocus();
    }
    setInputOtp((prevOtp) => prevOtp + value);
  };

  const handleKeyDown = (index, event) => {
    if (event.key === "Backspace" && !event.target.value && index > 0) {
      inputRefs.current[index - 1].setFocus();
      setInputOtp((prevOtp) => prevOtp.slice(0, -1));
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log("handleSubmit", inputOtp);
    console.log("handleSubmit", otp);

    if (otp) {
      try {
        let confirmResult = otp;
        console.log("confirmResult", confirmResult);
        confirmResult
          .confirm(inputOtp)
          .then(async (result) => {
            setToast({
              show: true,
              message: "Phone Verified Successfully",
            });
            const user = result.user;
            const userDoc = doc(db, "Users", user.uid);
            console.log("userDoc", userDoc);
            console.log(user.uid);
            const userDocData = await getDoc(userDoc);
            console.log("userDocData", userDocData.exists());
            setShowModal(true);

            if (userDocData.exists()) {
              router.push("/chat");
            } else {
              setTimeout(() => {
                history.push("/identity", {
                  state: {
                    email: user?.email,
                    uid: user?.uid,
                  },
                });
              }, 1000);
            }
          })
          .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log("otp_Error", errorCode, errorMessage);
            if (errorCode === "auth/invalid-verification-code") {
              setToast({
                show: true,
                message: "Error verifying OTP",
              });
            } else {
              setToast({
                show: true,
                message: "Phone Verification Failed",
              });
            }
          });
      } catch (e) {
        console.log("verifyOTP_Error", e);
      }
    }
  };
  const handleClearOtp = () => {
    setInputOtp("");
    inputRefs.current.forEach((inputRef) => (inputRef.value = ""));
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
              <IonButton color="light" onClick={handleBackButtonClick}>
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
                    onClick={handleClearOtp}
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
                    onClick={handleSubmit}
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
                      <IonGrid className="flex flex-col w-full h-full px-8 justify-around items-center">
                        <IonRow>
                          <IonItem lines="none">
                            <IonIcon
                              size="large"
                              icon={Group}
                              className="w-24 h-12"
                            />
                          </IonItem>
                        </IonRow>
                        <IonRow>
                          <IonItem lines="none">
                            <IonLabel className="text-2xl w-full text-center">
                              <h1>
                                The Matchmaker AI has partnered with{" "}
                                <b>Veriff</b> to verify your income
                              </h1>
                            </IonLabel>
                          </IonItem>
                        </IonRow>
                        <IonRow className="w-full">
                          <IonButton
                            className="border border-light text-light rounded-full w-full"
                            lines="none"
                            fill="clear"
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
                          </IonButton>
                        </IonRow>
                      </IonGrid>
                    </IonContent>
                  </IonModal>
                </IonCol>
              </IonRow>
            </IonGrid>
          </div>
          <IonToast
            isOpen={toast.show}
            onDidDismiss={() =>
              setToast({
                show: false,
                message: "",
              })
            }
            message={toast.message}
            duration={2000}
          />
        </IonContent>
      </IonPage>
    </>
  );
}

export default Otp;
