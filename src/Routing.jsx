import { IonContent, IonPage } from "@ionic/react";
import { Redirect, Route } from "react-router";
import Landing from "./components/landingpage";
import AccountSetup from "./pages/AccountSetup";
import AssessVoiceCommunication from "./pages/AssessVoiceCommunication";
import Chat from "./pages/Chat";
import EditPersonalInfo from "./pages/EditPersonalInfo";
import Home from "./pages/Home";
import Otp from "./pages/Otp";
import Profile from "./pages/Profile";
import UploadPhoto from "./pages/UploadPhoto";
import VoiceCommunication from "./pages/VoiceCommunication";
import Welcome from "./pages/Welcome";
import EditAppearanceHealth from "./pages/EditAppearanceHealth";
import EditHobbies from "./pages/EditHobbies";
import EditCareer from "./pages/EditCareer";

export default function Routing() {
  return (
    <IonPage>
      <IonContent>
        <Route exact path="/joinnow">
          <Home />
        </Route>
        <Route exact path="/">
          <Redirect to="/joinnow" />
        </Route>
        <Route exact path="/landingpage">
          <Landing />
        </Route>
        <Route exact path="/accountsetup">
          <AccountSetup />
        </Route>
        <Route exact path="/otp">
          <Otp />
        </Route>
        <Route exact path="/uploadphoto">
          <UploadPhoto />
        </Route>
        <Route exact path="/welcome">
          <Welcome />
        </Route>
        <Route exact path="/chat">
          <Chat />
        </Route>
        <Route exact path="/voicecommunication">
          <VoiceCommunication />
        </Route>
        <Route exact path="/assessvoicecommunication">
          <AssessVoiceCommunication />
        </Route>
        <Route exact path="/profile">
          <Profile />
        </Route>
        <Route exact path="/editpersonalinfo">
          <EditPersonalInfo />
        </Route>
        <Route exact path="/editappearance">
          <EditAppearanceHealth />
        </Route>
        <Route exact path="/edithobbies">
          <EditHobbies />
        </Route>
        <Route exact path="/editcareer">
          <EditCareer />
        </Route>
      </IonContent>
    </IonPage>
  );
}
