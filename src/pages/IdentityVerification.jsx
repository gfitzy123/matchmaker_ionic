import {
	IonContent,
	IonImg,
	IonPage,
	IonText
} from "@ionic/react";
import { createVeriffFrame } from "@veriff/incontext-sdk";
import { Veriff } from "@veriff/js-sdk";
import { doc, setDoc } from "firebase/firestore";
import { useEffect } from "react";
import { useHistory, useLocation } from "react-router-dom";
import VeriffImage from "../../public/assets/logo.svg";
import { VERIFY_API_KEY } from "../config/config";
import { db } from "../config/firebase";

export default function IdentityVerification() {
  const history = useHistory();
  let { state } = useLocation();

  useEffect(() => {
    veriff.setParams({
      person: {
        givenName: "asad ",
        lastName: " akram",
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
      console.log("Veriff response: ", response);
      if (err) {
        console.log("Veriff error: ", err);
        return;
      }
      if (response.status === "success") {
        let identityVerification = {
          userId: state?.uid,
          veriffId: response.verification.id,
          vendorData: response.verification.vendorData,
        };
        console.log("Updating user identity info: ", identityVerification);
        console.log("response", response);
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
      history.push("/plaid", {
        state: {
          uid: state?.uid.toString(),
        },
      });
    }, 60000);
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
