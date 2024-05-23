import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import ExploreContainer from "../components/ExploreContainer";
import "./Home.css";
import Welcome from "../components/landingpage";

const Home = () => {
  return (
    <IonPage>
      <Welcome />
    </IonPage>
  );
};

export default Home;
