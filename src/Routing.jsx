import { IonContent, IonPage } from '@ionic/react'
import { Redirect, Route } from 'react-router'
import AccountSetup from './pages/AccountSetup'
import AssessVoiceCommunication from './pages/AssessVoiceCommunication'
import Chat from './pages/Chat'
import EditAppearanceHealth from './pages/EditAppearanceHealth'
import EditCareer from './pages/EditCareer'
import EditHobbies from './pages/EditHobbies'
import EditPersonalInfo from './pages/EditPersonalInfo'
import Home from './pages/Home'
import Otp from './pages/Otp'
import Preferences from './pages/Preferences'
import Profile from './pages/Profile'
import UploadPhoto from './pages/UploadPhoto'
import Welcome from './pages/Welcome'

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
        <Route exact path="/preferences">
          <Preferences/>
        </Route>
        </IonContent>
  </IonPage>
  )
}
