import {
  IonPage,
  useIonRouter,
  IonContent,
} from "@ionic/react";
import Profile from "../components/ProfilePage";
import Chat from "../components/Chat/Chat";
import NavBar from "../components/common/NavBar";

const ProfileChat = () => {
  const router = useIonRouter();
  const handleback = () => {
    router.push("/chat");
  };

  return (
    <IonPage>
      <NavBar backbutton={handleback} title="Back to matches" />
      <IonContent>
        <Profile otherUser />
        <div>
        <Chat otherUser />
        </div>
      </IonContent>
    </IonPage>
  );
};

export default ProfileChat;
