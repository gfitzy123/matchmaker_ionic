import { IonCol, IonContent, IonFooter, IonGrid, IonIcon, IonPage, IonRow } from '@ionic/react';
import NavBar from '../components/common/NavBar';
import { closeCircleOutline, micOutline, pauseOutline } from 'ionicons/icons';
function VoiceCommunication() {
  return (
    <IonPage>
  <NavBar/>
      <IonContent className="flex flex-col items-center bg-black text-white h-full p-0">
        <div className="flex justify-center items-center h-1/2 mb-5">
          {/* Add your waveform visualization here */}
          {/* <img src="waveform.svg" alt="Waveform" className="w-4/5 h-auto" /> */}
        </div>
        <div className="text-center mx-5 leading-relaxed text-lg">
          <p>Yeah, sure. So, I'm about 6 feet tall, got a medium build, kinda average, I guess. My hair's dark brown, like really dark, almost black. Eyes? They're hazel, you know, a mix of green and brown ...</p>
        </div>
      </IonContent>
      <IonFooter>
        <IonGrid>
          <IonRow className="flex justify-center">
            <IonCol size="auto">
              <IonIcon icon={pauseOutline} className="text-4xl text-white m-2" />
            </IonCol>
            <IonCol size="auto">
              <IonIcon icon={micOutline} className="text-4xl text-red-500 m-2" />

            </IonCol>
            <IonCol size="auto">
              <IonIcon icon={closeCircleOutline} className="text-4xl text-red-500 m-2" />
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonFooter>
    </IonPage>
  )
}

export default VoiceCommunication
