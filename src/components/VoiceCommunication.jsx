import { useEffect, useState } from "react";
import {
  IonCol,
  IonContent,
  IonFooter,
  IonGrid,
  IonIcon,
  IonPage,
  IonRow,
  IonText,
} from "@ionic/react";
import { close, pause, play } from "ionicons/icons";
import voiceicon from "../../public/assets/voice icon.svg";
import { LiveAudioVisualizer } from "react-audio-visualize";
import { useAudioRecorder } from "react-audio-voice-recorder";
import { SpeechRecognition } from "@capacitor-community/speech-recognition";

function VoiceCommunication({ setIsCommunicationModal, setTranscribedText }) {
  const recorder = useAudioRecorder();
  const [text, setText] = useState("");
  const [listening, setListening] = useState(false);

  useEffect(() => {
    const startRecording = async () => {
      startListening();
      recorder.startRecording();
    };
    startRecording();
  }, []);

  const startListening = async () => {
    const { available } = await SpeechRecognition.available();
    await SpeechRecognition.requestPermissions();
    try {
      if (available) {
        await SpeechRecognition.start({
          language: "en-US",
          partialResults: true,
          popup: false,
        });

        SpeechRecognition.addListener("partialResults", (data) => {
          if (data.matches && data.matches.length > 0) {
            setText(data.matches[0]);
          }
        });

        setListening(true);
      }
    } catch (error) {
      console.error("Error starting speech recognition:", error);
    }
  };

  const stopListening = async () => {
    try {
      await SpeechRecognition.stop();
      setListening(false);
    } catch (error) {
      console.error("Error stopping speech recognition:", error);
    }
  };

  const toggleRecorder = async () => {
    recorder.togglePauseResume();
    if (listening) {
      await stopListening();
    } else {
      await startListening();
    }
  };

  const handleClose = () => {
    setTranscribedText((prevText) => prevText + " " + text);
    recorder.stopRecording();
    stopListening();
    setIsCommunicationModal(false);
  };

  return (
    <IonPage>
      <IonContent className="flex flex-col items-center justify-around bg-black text-white h-full p-0">
        <div className="flex flex-col justify-center items-center h-1/2 mb-5">
        <div className="text-center mx-5 leading-relaxed text-lg">
          <p>{text}</p>
        </div>
          {recorder.mediaRecorder && (
            <div className="flex items-center flex-col gap-14">
              <IonText>
                <h1 className="text-2xl">
                  {recorder.isPaused ? "Paused" : "Please Speak"}
                </h1>
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

      </IonContent>
      <IonFooter>
        <IonGrid>
          <IonRow className="flex justify-around">
            <IonCol size="auto">
              <IonIcon
                icon={recorder.isPaused ? play : pause}
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
                onClick={handleClose}
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
