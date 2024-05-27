import { IonContent, IonPage } from '@ionic/react'
import { Redirect, Route } from 'react-router'
import Landing from './components/landingpage'
import AccountSetup from './pages/AccountSetup'
import AssessVoiceCommunication from './pages/AssessVoiceCommunication'
import Chat from './pages/Chat'
import Home from './pages/Home'
import Otp from './pages/Otp'
import UploadPhoto from './pages/UploadPhoto'
import VoiceCommunication from './pages/VoiceCommunication'
import Welcome from './pages/Welcome'
import Profile from './pages/Profile'


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
          <Otp/>
        </Route>
        <Route exact path="/uploadphoto">
          <UploadPhoto />
        </Route>
        <Route exact path="/welcome">
          <Welcome />
        </Route>
        <Route exact path="/chat">
          <Chat/>
        </Route>
        <Route exact path="/voicecommunication">
          <VoiceCommunication/>
        </Route>
        <Route exact path="/assessvoicecommunication">
          <AssessVoiceCommunication/>
        </Route>
        <Route exact path="/profile">
          <Profile/>
        </Route>
        </IonContent>
  </IonPage>
  )
}
