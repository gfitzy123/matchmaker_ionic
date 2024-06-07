import {
  IonContent,
  IonImg,
  IonPage,
  IonText,
  useIonRouter
} from "@ionic/react";
import { createVeriffFrame } from "@veriff/incontext-sdk";
import { Veriff } from "@veriff/js-sdk";
import { doc, setDoc } from "firebase/firestore";
import { useEffect } from "react";
import VeriffImage from "../../public/assets/logo.svg";
import { VERIFY_API_KEY } from "../config/config";
import { db } from "../config/firebase";
import { useHomeContext } from "../context/Home";

export default function IdentityVerification() {
  const router = useIonRouter();
  const {currentUserInfo} = useHomeContext();

  useEffect(() => {
    veriff.setParams({
      person: {
        givenName: " ",
        lastName: " ",
      },
      vendorData: " ",
    });
    veriff.mount();
  }, []);

  const veriff = Veriff({
    host: "https://stationapi.veriff.com",

    apiKey: VERIFY_API_KEY,
    parentId: "veriff-root",
    onSession: function (err, response) {
      if (err) {
        console.log("Veriff error: ", err);
        return;
      }
      if (response.status === "success") {
        let identityVerification = {
          userId: currentUserInfo?.uid,
          veriffId: response.verification.id,
          vendorData: response.verification.vendorData,
        };
        createVeriffFrame({ url: response.verification.url });
        updateUserIdentityInfo(identityVerification);
      }
    },
  });

  const updateUserIdentityInfo = (identityVerification) => {
    const userRef = doc(db, "Users", identityVerification.userId);
    setDoc(
      userRef,
      {
        capital: true,
        idVerified: false,
        veriffId: identityVerification.veriffId,
        identityVerificationData: identityVerification,
      },
      { merge: true }
    );
    setTimeout(() => {
      router.push("/plaid")
    }, 2000);
  };

  return (
    <IonPage id="identity-component">
      <IonContent>
        <div className="flex flex-col gap-8 items-center justify-center">
          <div className="py-[100px] px-0 pt-[50px] pb-0 text-center mt-[100px] min-h-[10px]">
            <IonImg
              src={VeriffImage}
              alt="Ionic logo"
              className="max-w-[120px]"
            />
          </div>
          <IonText className=" text-[15px] text-center">
            We need to verify your identity to keep everyone safe. All members
            undergo mandatory id verification.
          </IonText>

          <div id="veriff-root"></div>
        </div>
      </IonContent>
    </IonPage>
  );
}
