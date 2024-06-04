import {
  IonContent,
  IonIcon,
  IonPage,
  IonProgressBar,
  useIonRouter,
} from "@ionic/react";
import Pencil from "../../public/assets/Pencil.svg";
import AccordionItem from "../components/common/AccordionItem";
import NavBar from "../components/common/NavBar";
import SwipImage from "../components/common/SwipImage";
import { IMAGE_URLS } from "../data";

const Profile = () => {
  const router = useIonRouter();
 
  const handleback = () => {
    router.push("/chat");
  };
  
  return (
    <IonPage>
      <NavBar backbutton={handleback} title="Profile" vertical />
      <IonContent className="p-4">
        <div className="flex flex-col items-start gap-10 w-full">
        <SwipImage
        images={IMAGE_URLS}
        upload={true}
        pagination={true}
      />
          <div className="relative px-4 w-full flex flex-col gap-3">
            <div className="absolute right-4 bottom-12 z-10">
              <IonIcon
                size="large"
                className="p-3 rounded-full bg-secondary"
                icon={Pencil}
              />
            </div>
            <p className="text-gray-500">
              80% profile completed.{" "}
              <span className="font-bold text-primary">Edit with AI</span>
            </p>
            <IonProgressBar value={0.8} />
          </div>
        </div>
        <div className="py-10">
        <AccordionItem />
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Profile;
