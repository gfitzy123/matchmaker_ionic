import React from 'react'
import Home from './pages/Home'
import AccountSetup from './pages/AccountSetup'
import Otp from './pages/Otp'
import Profile from './pages/Profile'
import { IonContent, IonPage } from '@ionic/react'
import { Redirect, Route } from 'react-router'
import Welcome from './pages/Welcome'
import Chat from './pages/Chat'
import VoiceCommunication from './pages/VoiceCommunication'
import Landing from './components/landingpage'


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
        <Route exact path="/profile">
          <Profile />
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
        </IonContent>
  </IonPage>
  )
}
