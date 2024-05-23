import { IonButton, IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import ExploreContainer from '../components/ExploreContainer';
import './Home.css';
import Login from './Login';
import { useState } from 'react';

const Home = () => {

  return (
    <IonPage>
      {/* <Welcome/> */}
      <Login />
    </IonPage>
  );
};

export default Home;
