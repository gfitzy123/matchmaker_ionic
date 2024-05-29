import {
  IonButton,
  IonContent,
  IonIcon,
  IonInput,
  IonItem,
  IonLabel,
  IonList,
  IonPage,
  IonPopover,
  IonProgressBar,
  IonGrid,
  IonRow,
  IonCol,
  useIonRouter,
  IonImg,
  IonText,
} from "@ionic/react";
import {
  arrowBackOutline,
  copyOutline,
  person,
  volumeMediumOutline,
} from "ionicons/icons";
import { useRef, useState } from "react";
import SelectionPlus from "../../public/assets/SelectionPlus.svg";
import message from "../../public/assets/msg.svg";
import sender from "../../public/assets/sender.svg";
import thumbsdown from "../../public/assets/thumb down.svg";
import thumbsup from "../../public/assets/thumb up.svg";
import "tailwindcss/tailwind.css";
import NavBar from "../components/common/NavBar";
import Slider from "../components/slider";
import { messages as initialMessages } from "../data";

const Chat = () => {
  const [messages, setMessages] = useState(initialMessages);
  const [inputValue, setInputValue] = useState("");
  const [questionCount, setQuestionCount] = useState(3);
  const router = useIonRouter();
  const [showPopover, setShowPopover] = useState(false);
  const [popoverEvent, setPopoverEvent] = useState(null);
  const popoverRef = useRef(null);

  const handleSend = () => {
    if (inputValue.trim()) {
      const newMessages = [...messages, { type: "user", text: inputValue }];
      setMessages(newMessages);
      setInputValue("");
      setQuestionCount((prevCount) => Math.min(prevCount + 1, 10));
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

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleLongPress = (e) => {
    setPopoverEvent(e.detail);
    setShowPopover(true);
  };

  const handlePopoverDismiss = () => {
    setShowPopover(false);
  };

  const handleMenuItemClick = (action) => {
    console.log("Clicked:", action);
    setShowPopover(false);
  };

  const handleVoice = () => {
    router.push("/voicecommunication");
  };

  return (
    <IonPage>
      <NavBar vertical />
      <IonContent>
        <IonGrid className="p-4">
          <IonRow className="flex items-center justify-center  text-sm mb-2  ">
            <IonRow className="flex justify-center items-center w-full relative">
              <IonLabel className="mr-2">
                <b>{questionCount * 10}% </b>profile completed
              </IonLabel>
              <div className="flex absolute right-0">
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
                <IonText>120 matches</IonText>
              </div>
            </IonRow>
          </IonRow>
          <IonRow>
            <IonCol>
              <IonProgressBar value={questionCount * 0.1}></IonProgressBar>
            </IonCol>
          </IonRow>
        </IonGrid>
        <IonGrid className="p-4 mb-6">
          {messages.map((message, index) => (
            <IonRow key={index} className="flex items-center mb-4">
              <IonCol>
                {message.type === "user" && (
                  <IonLabel>
                    <h4 className="text-primary border-b border-bg-secondary p-2 mb-2">
                      PERSONAL INFORMATION
                    </h4>
                  </IonLabel>
                )}
                <IonGrid className="p-4">
                  <IonRow className="flex gap-2">
                    <IonIcon
                      icon={person}
                      className="border rounded-full"
                    ></IonIcon>
                    <IonText className="text-sm mb-2">
                      <b>{message.type === "ai" ? "Matchmaker AI" : "You"}</b>
                    </IonText>
                  </IonRow>
                  <IonRow>
                    <IonCol>
                      <IonText
                        className="text-sm"
                        onClick={message.type === "ai" ? handleLongPress : null}
                      >
                        {message.text}
                      </IonText>
                    </IonCol>
                  </IonRow>
                </IonGrid>
                {message.type === "ai" && (
                  <>
                    <IonRow className="flex items-center mt-2">
                      <IonButton fill="clear" size="small" className="mr-2">
                        <IonIcon icon={thumbsup} slot="icon-only" />
                      </IonButton>
                      <IonButton fill="clear" size="small">
                        <IonIcon icon={thumbsdown} slot="icon-only" />
                      </IonButton>
                    </IonRow>
                    <div className="flex-grow overflow-scroll whitespace-nowrap hide-scrollbar">
                      <div className="w-[200%]">
                        <Slider />
                      </div>
                    </div>
                  </>
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
                    onClick={handleVoice}
                    className="border p-2 rounded-full bg-primaryBtn"
                    icon={message}
                  />
                )}
              </IonCol>
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
      <IonPopover
        ref={popoverRef}
        event={popoverEvent}
        isOpen={showPopover}
        onDidDismiss={handlePopoverDismiss}
      >
        <IonList>
          <IonItem button onClick={() => handleMenuItemClick("Copy")}>
            <IonIcon color="white" size="large" icon={copyOutline}></IonIcon>
            <IonLabel className="ml-3">Copy</IonLabel>
          </IonItem>
          <IonItem button onClick={() => handleMenuItemClick("SelectText")}>
            <IonIcon color="white" size="large" icon={SelectionPlus}></IonIcon>
            <IonLabel className="ml-3">Select Text</IonLabel>
          </IonItem>
          <IonItem button onClick={() => handleMenuItemClick("ReadAloud")}>
            <IonIcon
              color="white"
              size="large"
              icon={volumeMediumOutline}
            ></IonIcon>
            <IonLabel className="ml-3">Read Aloud</IonLabel>
          </IonItem>
          <IonItem button onClick={() => handleMenuItemClick("Close")}>
            <IonIcon
              color="white"
              size="large"
              icon={arrowBackOutline}
            ></IonIcon>
            <IonLabel className="ml-3">Close</IonLabel>
          </IonItem>
        </IonList>
      </IonPopover>
    </IonPage>
  );
};

export default Chat;
