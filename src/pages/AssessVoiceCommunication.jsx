import {
  IonButton,
  IonContent,
  IonIcon,
  IonInput,
  IonPage,
  IonProgressBar,
  useIonRouter,
  IonGrid,
  IonRow,
  IonCol,
  IonText,
  IonImg,
} from "@ionic/react";
import { person } from "ionicons/icons";
import { useState } from "react";
import "tailwindcss/tailwind.css";
import message from "../../public/assets/msg.svg";
import sender from "../../public/assets/sender.svg";
import thumbsdown from "../../public/assets/thumb down.svg";
import thumbsup from "../../public/assets/thumb up.svg";
import voiceicon from "../../public/assets/voice icon.svg";
import NavBar from "../components/common/NavBar";
import { messages as initialMessages } from "../data";

const AssessVoiceCommunication = () => {
  const [messages, setMessages] = useState(initialMessages);
  const [inputValue, setInputValue] = useState("");
  const router = useIonRouter();

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleSend = () => {
    if (inputValue.trim()) {
      const newMessages = [...messages, { type: "user", text: inputValue }];
      setMessages(newMessages);
      setInputValue("");
      handleAIResponse(newMessages);
    }
  };

  const handleAIResponse = (currentMessages) => {
    setTimeout(() => {
      const aiMessage = {
        type: "ai",
        text: "Thank you for your information. Let's move to the next step.",
      };
      setMessages([...currentMessages, aiMessage]);
    }, 1000);
  };

  return (
    <IonPage>
      <NavBar vertical />
      <IonContent>
        <IonGrid className="p-4 ">
          <IonRow className="items-center justify-center text-sm mb-2">
            <IonRow className="flex items-center">
              <IonText className="mr-2">
                <b>10% </b>profile completed
              </IonText>
              <IonRow className="flex">
                <IonImg
                  src={person}
                  alt="User 1"
                  className="w-6 h-6 rounded-full border-2 border-gray-900"
                />
                <IonImg
                  src={person}
                  alt="User 2"
                  className="w-6 h-6 rounded-full border-2 border-gray-900"
                />
                <IonImg
                  src={person}
                  alt="User 3"
                  className="w-6 h-6 rounded-full border-2 border-gray-900"
                />
              </IonRow>
            </IonRow>
            <IonText>120 matches</IonText>
          </IonRow>
          <IonRow>
            <IonCol>
              <IonProgressBar value={0.1}></IonProgressBar>
            </IonCol>
          </IonRow>
        </IonGrid>
        <IonGrid className="p-4 mb-10">
          {messages.map((message, index) => (
            <IonRow key={index} className="flex items-center mb-4">
              <IonCol>
                {message.type === "user" && (
                  <IonText>
                    <h4 className="text-primary border-b border-pausebutton p-2 mb-2">
                      APPEARANCE AND HEALTH
                    </h4>
                  </IonText>
                )}
                <IonGrid className="p-4">
                  <IonRow className="flex items-center gap-2">
                    <IonIcon
                      icon={person}
                      className="border rounded-full"
                    ></IonIcon>
                    <IonText className="text-sm ">
                      <b>{message.type === "ai" ? "Matchmaker AI" : "You"}</b>
                    </IonText>
                    {message.type === "user" && (
                      <IonIcon icon={voiceicon} className="ml-2"></IonIcon>
                    )}
                  </IonRow>
                  <IonRow>
                    <IonCol>
                      <IonText className="text-sm">{message.text}</IonText>
                    </IonCol>
                  </IonRow>
                </IonGrid>
                {message.type === "user" && (
                  <IonRow className="flex flex-nowrap items-center mt-2 bg-pausebutton p-2">
                    <IonCol size="auto">
                      <IonText>
                        <h4 className="mb-0">Assess voice communication</h4>
                      </IonText>
                    </IonCol>
                    <IonCol size="auto">
                      <IonRow className="flex items-center">
                        <IonButton fill="clear" size="small" className="mr-2">
                          <IonIcon icon={thumbsup} slot="icon-only" />
                        </IonButton>
                        <IonButton fill="clear" size="small">
                          <IonIcon icon={thumbsdown} slot="icon-only" />
                        </IonButton>
                      </IonRow>
                    </IonCol>
                  </IonRow>
                )}
              </IonCol>
            </IonRow>
          ))}
        </IonGrid>
        <IonGrid className="fixed inset-x-0 bottom-0 p-4 w-full">
          <IonRow className="flex items-center gap-3 w-full">
            <IonCol className="flex justify-center  items-center">
              <IonInput
                placeholder="Write a message..."
                className="w-full text-white border rounded-full px-4 py-2"
                value={inputValue}
                onIonInput={handleInputChange}
              />
              <IonCol>
                {inputValue ? (
                  <IonIcon
                    size="small"
                    className="border p-2 rounded-full bg-primaryBtn"
                    icon={sender}
                    onClick={handleSend}
                  />
                ) : (
                  <IonIcon
                    size="small"
                    className="border p-2 rounded-full bg-primaryBtn"
                    icon={message}
                    onclick={() => router.push("/voicecommunication")}
                  />
                )}
              </IonCol>
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default AssessVoiceCommunication;
