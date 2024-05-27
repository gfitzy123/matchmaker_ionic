import { IonCol, IonContent, IonFooter, IonGrid, IonIcon, IonPage, IonRow, useIonRouter } from '@ionic/react';
import { close } from 'ionicons/icons';
import pauseicon from "../../public/assets/pause.svg";
import voiceicon from "../../public/assets/voice icon.svg";
import NavBar from '../components/common/NavBar';
function VoiceCommunication() {
  const router = useIonRouter();


  const handleAssessvoice = () => {
    router.push('/assessvoicecommunication')
  };
  return (
    <IonPage>
      <NavBar />
      <IonContent className="flex flex-col items-center bg-black text-white h-full p-0">
        <div className="flex justify-center items-center h-1/2 mb-5">

          {/* Audio wave */}
        </div>
        <div className="text-center mx-5 leading-relaxed text-lg">
          <p>Yeah, sure. So, I'm about 6 feet tall, got a medium build, kinda average, I guess. My hair's dark brown, like really dark, almost black. Eyes? They're hazel, you know, a mix of green and brown ...</p>
        </div>
      </IonContent>
      <IonFooter>
        <IonGrid>
          <IonRow className="flex justify-around">
            <IonCol size="auto">
              <IonIcon icon={pauseicon} className=" m-2  p-4 rounded-full bg-pausebutton" />
            </IonCol>
            <IonCol size="auto">
              <IonIcon onClick={handleAssessvoice} icon={voiceicon} className=" m-2 p-4 rounded-full" />

            </IonCol>
            <IonCol size="auto">
              <IonIcon icon={close} className=" p-4 rounded-full bg-closeButton" />
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonFooter>
    </IonPage>
  )
}

export default VoiceCommunication
