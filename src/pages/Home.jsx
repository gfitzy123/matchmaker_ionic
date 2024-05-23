import { IonButton, IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import JoinNow from './JoinNow';
import { useState } from 'react';

const Home = () => {

  return (
    <IonPage>
      <JoinNow />
    </IonPage>
  );
};

export default Home;
