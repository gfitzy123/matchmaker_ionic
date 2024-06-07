import {
  IonButton,
  IonCol,
  IonGrid,
  IonIcon,
  IonImg,
  IonInput,
  IonLabel,
  IonModal,
  IonProgressBar,
  IonRow,
  IonText,
  IonList,
  IonToolbar,
} from "@ionic/react";
import axios from "axios";
import {
  doc,
  getDoc
} from "firebase/firestore";
import { person } from "ionicons/icons";
import { useEffect, useRef, useState } from "react";
import "tailwindcss/tailwind.css";
import message from "../../../public/assets/msg.svg";
import sender from "../../../public/assets/sender.svg";
import thumbsdown from "../../../public/assets/thumb down.svg";
import thumbsup from "../../../public/assets/thumb up.svg";
import voiceicon from "../../../public/assets/voice icon.svg";
import { authentication, db } from "../../config/firebase";
import { useHomeContext } from "../../context/Home";
import MatchedImages from "../MatchedImages";
import VoiceCommunication from "../VoiceCommunication";
import PopoverMenu from "../common/PopoverMenu";
import { getStreamingUrl } from "./utils";

const ChatInner = ({ otherUser }) => {
  const [inputValue, setInputValue] = useState("");
  const [questionCount, setQuestionCount] = useState(3);
  const [showPopover, setShowPopover] = useState(false);
  const [popoverEvent, setPopoverEvent] = useState(null);
  const [isCommunicationModal, setIsCommunicationModal] = useState(false);
  const [transcribedText, setTranscribedText] = useState("");
  const [showMatchedImages, setShowMatchedImages] = useState(false);
  const { messageList, messageListReducer } = useHomeContext();
  const [isLoading, setIsLoading] = useState(false);
  const [onboardingData, setOnboardingData] = useState([]);
  const [progressData, setProgressData] = useState(0);
  const messagesEndRef = useRef(null);

  const userId = authentication?.currentUser.uid;

  const handleSeeMoreClick = () => {
    setShowMatchedImages(true);
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

  const getQuery = (inputValue) => {
    if (Number.isInteger(inputValue)) {
      return savedSearches[inputValue].message;
    } else {
      return inputValue;
    }
  };

  const createChatMessage = (query) => {
    return {
      content: query,
      role: "user",
    };
  };

  const handleAddStreamedMessage = async (inputValue) => {
    setIsLoading(true);

    const query = getQuery(inputValue);
    const chatMessage = createChatMessage(query);
    messageListReducer(chatMessage, "ADD_MESSAGE");

    sendStreamChatMessage(chatMessage, true);

    setInputValue("");
  };

  const fetchOnboardingData = async () => {
    try {
      const querySnapRef = doc(db, "Onboarding", userId);
      const data = (await getDoc(querySnapRef)).data();
      setOnboardingData(data);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching onboarding data: ", error);
    }
  };

  const sendStreamChatMessage = async (chatMessage, isOnboarding) => {
    const chatUrl = getStreamingUrl(isOnboarding);

    const url = new URL(chatUrl);

    url.searchParams.append("chatMessage", JSON.stringify(chatMessage));
    url.searchParams.append("userId", userId);
    try {
      setIsLoading(true);
      await axios.get(url);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching chat response:", error);
      throw error;
    }
  };

  useEffect(() => {
    fetchOnboardingData();
  }, [isLoading]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messagesEndRef, onboardingData]);
  return (
    <>
      {!otherUser && (
        <IonGrid className="p-4 bg-dark">
          <IonRow className="flex items-center justify-center  text-sm mb-2  ">
            <IonRow className="flex justify-center items-center w-full relative">
              <IonLabel className="mr-2">
                <b>{progressData}% </b>profile completed
              </IonLabel>
              {progressData <= 10 && (
                <div className="flex absolute right-0">
                  <IonImg
                    src={person}
                    alt="User 1"
                    className="w-6 h-6 p-1 bg-secondary rounded-full border-2"
                  />
                  <IonImg
                    src={person}
                    alt="User 2"
                    className="w-6 h-6 p-1 bg-secondary rounded-full border-2"
                  />
                  <IonImg
                    src={person}
                    alt="User 3"
                    className="w-6 h-6 p-1 bg-secondary rounded-full border-2"
                  />
                  <IonText>120 matches</IonText>
                </div>
              )}
            </IonRow>
          </IonRow>
          <IonRow>
            <IonCol>
              <IonProgressBar value={progressData}></IonProgressBar>
            </IonCol>
          </IonRow>
        </IonGrid>
      )}
      <IonGrid className={"relative"}>
        <div
          className={`${
            otherUser ? "max-h-72" : "h-[82vh]"
          } overflow-auto pb-10`}
        >
          <IonGrid className="p-4">
            <IonRow className="flex gap-2 items-center">
              <IonIcon icon={person} className="border rounded-full"></IonIcon>
              <IonText className="text-sm text-center text-textSecondary">
                <b>Matchmaker AI</b>
              </IonText>
            </IonRow>
            <IonRow>
              <IonCol>
                <IonText className="text-sm text-textSecondary">
                  Hi Devon, I found some potential matches for you based on your
                  criteria. Take a look and see if any catch your eye!
                </IonText>
              </IonCol>
            </IonRow>
          </IonGrid>
          <IonList className="px-4 bg-background flex flex-col gap-10">
            <MatchedImages />
            <MatchedImages />
            <MatchedImages />
          </IonList>
          <div>
            {onboardingData.chatHistory?.map((message, msgIndex) => (
              <IonRow
                ref={messagesEndRef}
                key={msgIndex}
                className="flex items-center mb-4"
              >
                <IonCol>
                  {message.role === "user" && (
                    <IonLabel>
                      <h4 className="text-primary border-b border-bg-secondary p-2 mb-2">
                        {transcribedText.length > 1
                          ? "APPEARANCE AND HEALTH"
                          : "PERSONAL INFORMATION"}
                      </h4>
                    </IonLabel>
                  )}
                  <IonGrid className="p-4">
                    <IonRow className="flex gap-2 items-center">
                      <IonIcon
                        icon={person}
                        className="border rounded-full"
                      ></IonIcon>
                      <IonText className="text-sm text-center text-textSecondary">
                        <b>
                          {message.role === "assistant"
                            ? "Matchmaker AI"
                            : message.role === "system"
                            ? "System"
                            : message.role === "function"
                            ? "Function"
                            : "You"}
                        </b>
                      </IonText>
                      {transcribedText.length > 1 && (
                        <IonIcon icon={voiceicon} className="ml-2"></IonIcon>
                      )}
                    </IonRow>
                    <IonRow>
                      <IonCol>
                        <IonText
                          className="text-sm text-textSecondary"
                          onClick={
                            message.role === "assistant"
                              ? handleLongPress
                              : null
                          }
                        >
                          {transcribedText.length > 1
                            ? transcribedText
                            : message.content}
                        </IonText>
                        {transcribedText.length > 1 && (
                          <IonIcon icon={voiceicon} className="ml-2"></IonIcon>
                        )}
                        </IonCol>
                      </IonRow>
                      <IonRow>
                        <IonCol size="auto">
                          <IonRow className="flex items-center">
                            <IonButton
                              fill="clear"
                              size="small"
                              className="mr-2"
                            >
                              <IonIcon icon={thumbsup} slot="icon-only" />
                            </IonButton>
                            <IonButton fill="clear" size="small">
                              <IonIcon icon={thumbsdown} slot="icon-only" />
                            </IonButton>
                          </IonRow>
                        </IonCol>
                      </IonRow>
                  </IonGrid>
                  {message.role === "assistant" && (
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
                        <div
                          className={`w-[200%] ${
                            showMatchedImages ? "hidden" : ""
                          }`}
                        >
                        </div>
                        {showMatchedImages && <MatchedImages />}
                      </div>
                    </>
                  )}
                </IonCol>
              </IonRow>
            ))}
          </div>
        </div>
        <div className="absolute z-10 bottom-0 p-4 w-full">
          {isLoading && <IonProgressBar type="indeterminate"></IonProgressBar>}
          <IonRow className="flex items-center gap-3 w-full">
            <IonCol className="flex justify-center items-center">
              <IonInput
                placeholder="Write a message..."
                className="w-full text-white bg-secondary rounded-full "
                value={inputValue}
                onIonInput={handleInputChange}
              />
              <IonCol className="flex w-full h-full items-center">
                {inputValue ? (
                  <IonIcon
                    className="p-3 w-5 h-5 rounded-full bg-secondary"
                    icon={sender}
                    onClick={() => handleAddStreamedMessage(inputValue)}
                  />
                ) : (
                  <IonIcon
                    onClick={() => setIsCommunicationModal(true)}
                    className="p-3 w-5 h-5 rounded-full bg-secondary"
                    icon={message}
                  />
                )}
              </IonCol>
            </IonCol>
          </IonRow>
        </div>
      </IonGrid>
      <PopoverMenu
        isOpen={showPopover}
        event={popoverEvent}
        onDidDismiss={handlePopoverDismiss}
        handleMenuItemClick={handleMenuItemClick}
      />
      <IonModal isOpen={isCommunicationModal}>
        <VoiceCommunication
          setTranscribedText={setTranscribedText}
          setIsCommunicationModal={setIsCommunicationModal}
        />
      </IonModal>
    </>
  );
};

export default ChatInner;
