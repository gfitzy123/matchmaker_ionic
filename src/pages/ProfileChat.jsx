import {
  IonPage,
  useIonRouter,
  IonContent,
} from "@ionic/react";
import Profile from "../components/ProfilePage";
import NavBar from "../components/common/NavBar";
import ChatInner from "../components/Chat/Chat";

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
        <ChatInner otherUser />
        </div>
      </IonContent>
    </IonPage>
  );
};

export default ProfileChat;
