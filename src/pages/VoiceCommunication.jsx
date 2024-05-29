import { useState, useEffect } from "react";
import {
  IonCol,
  IonContent,
  IonFooter,
  IonGrid,
  IonIcon,
  IonPage,
  IonRow,
  IonText,
  useIonRouter,
} from "@ionic/react";
import { close } from "ionicons/icons";
import pauseicon from "../../public/assets/pause.svg";
import voiceicon from "../../public/assets/voice icon.svg";
import { LiveAudioVisualizer } from "react-audio-visualize";
import {  useAudioRecorder } from "react-audio-voice-recorder";

function VoiceCommunication() {
  const router = useIonRouter();
  const recorder = useAudioRecorder();

  useEffect(() => {
    recorder.startRecording();
  }, []);

  const toggleRecorder = () => {
    recorder.togglePauseResume();
  };

  const handleAssessvoice = () => {
    recorder.stopRecording();
    router.push("/assessvoicecommunication");
  };
  const handleback = () => {
    router.push("/chat");
  };
  return (
    <IonPage>
      <IonContent className="flex flex-col items-center justify-around bg-black text-white h-full p-0">
        <div className="flex flex-col justify-center items-center h-1/2 mb-5">
          {recorder.mediaRecorder && (
            <div className="flex items-center flex-col gap-14">
              <IonText>
                <h1 className="text-2xl">Please Speak</h1>
              </IonText>
              <LiveAudioVisualizer
                mediaRecorder={recorder.mediaRecorder}
                width={250}
                height={75}
                barColor={"#c6a15a"}
              />
            </div>
          )}
        </div>

        <div className="text-center mx-5 leading-relaxed text-lg">
          <p>
            Yeah, sure. So, I'm about 6 feet tall, got a medium build, kinda
            average, I guess. My hair's dark brown, like really dark, almost
            black. Eyes? They're hazel, you know, a mix of green and brown ...
          </p>
        </div>
      </IonContent>
      <IonFooter>
        <IonGrid>
          <IonRow className="flex justify-around">
            <IonCol size="auto">
              <IonIcon
                icon={pauseicon}
                onClick={toggleRecorder}
                className=" m-2  p-4 rounded-full bg-pausebutton"
              />
            </IonCol>
            <IonCol size="auto">
              <IonIcon icon={voiceicon} className=" m-2 p-4 rounded-full" />
            </IonCol>
            <IonCol size="auto">
              <IonIcon
                icon={close}
                onClick={handleAssessvoice}
                className=" p-4 rounded-full bg-closeButton"
              />
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonFooter>
    </IonPage>
  );
}

export default VoiceCommunication;
