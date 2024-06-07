import {
  IonButton,
  IonContent,
  IonImg,
  IonPage,
  IonText,
  IonTitle,
  useIonRouter,
} from "@ionic/react";
import axios from "axios";
import { doc, setDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { usePlaidLink } from "react-plaid-link";
import PlaidLogo from "../../public/assets/plaid-white.svg";
import { LINK_PLAID_TOKEN_URL } from "../config/config";
import { db } from "../config/firebase";
import { useHomeContext } from "../context/Home";

export default function Plaid() {
  const [linkTokenResponse, setLinkTokenResponse] = useState(null);
  const { currentUserInfo } = useHomeContext();
  const router = useIonRouter();

  useEffect(() => {
    axios
      .post(LINK_PLAID_TOKEN_URL)
      .then((response) => {
        setLinkTokenResponse(response);
      })
      .catch((error) => {
        console.log("error", error);
      });
  }, []);

  const { open, ready } = usePlaidLink({
    token: linkTokenResponse?.data?.response?.link_token,
    onSuccess: (public_token, metadata) => {
      if (metadata && public_token) {
        updateUserIncomeyInfo(metadata);
      }
    },
  });

  const updateUserIncomeyInfo = async (incomeVerification) => {
    const uid = currentUserInfo?.uid;
    const userRef = doc(db, "Users", uid);
    const onboardingRef = doc(db, "Onboarding", uid);
    setDoc(
      userRef,
      {
        capital: true,
        incomeVerificationData: incomeVerification,
        onboarded: false,
        isOnboarding: true,
        hasStartedOnboarding: true,
        isOnboarded:false,
      },
      { merge: true }
    );
    setDoc(onboardingRef, {
      status: "inProgress",
      progress: 0,
      createdAt: new Date(),
      chatHistory: [],
    });
    router.push("/uploadphoto");
  };

  return (
    <IonPage id="plaid-component">
      <IonContent>
        <div className="bg-black flex flex-col gap-4 items-center justify-center">
          <div>
            <IonImg src={PlaidLogo} alt="Ionic logo" />
          </div>

          <div>
            <IonTitle className="text-white text-center text-25px">
              MatchmakerAI uses Plaid to to verify your income bracket.
            </IonTitle>
          </div>

          <div>
            <IonButton
              type="submit"
              expand="block"
              onClick={() => open()}
              //   disabled={!ready}
              className="bg-C6A15A hover:bg-eee4d0 active:bg-eee4d0 focus:bg-eee4d0 text-white border-solid border-black border-1 box-shadow-md ripple-color-d7bd8b pt-10 pb-10"
            >
              Connect
            </IonButton>
          </div>

          <IonText className="text-white text-center text-25px">
            <a href="https://plaid.com/">Plaid</a> is a financial technology
            company that makes it easy, safe and reliable for people to connect
            their financial data to apps and services.
          </IonText>
        </div>
      </IonContent>
    </IonPage>
  );
}
