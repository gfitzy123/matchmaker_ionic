import { IonPage,IonContent, useIonRouter } from "@ionic/react";
import ProfilePage from "../components/ProfilePage";
import NavBar from "../components/common/NavBar";

const Profile = () => {
  const router = useIonRouter();
  const handleback = () => {
    router.push("/chat");
  };
  return (
    <IonPage>
      <NavBar backbutton={handleback} title="Profile" vertical />
      <IonContent>
        <ProfilePage />
      </IonContent>
    </IonPage>
  );
};

export default Profile;
