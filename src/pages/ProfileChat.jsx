import { IonPage, useIonRouter, IonContent, IonGrid, IonRow, IonFooter } from "@ionic/react";
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
        <IonContent>
      <NavBar backbutton={handleback} title="Back to matches" />
        <Profile otherUser/>
      <IonFooter className="bg-primary">
      <Chat otherUser/>
      </IonFooter>
      </IonContent>
    </IonPage>
  );
};

export default ProfileChat;
