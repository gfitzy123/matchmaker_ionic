import {
  IonButton,
  IonCol,
  IonContent,
  IonFooter,
  IonGrid,
  IonIcon,
  IonImg,
  IonInput,
  IonLabel,
  IonModal,
  IonPage,
  IonProgressBar,
  IonRow,
  IonText,
} from "@ionic/react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import {
  addDoc,
  arrayUnion,
  collection,
  doc,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { person } from "ionicons/icons";
import { useEffect, useState } from "react";
import "tailwindcss/tailwind.css";
import message from "../../../public/assets/msg.svg";
import sender from "../../../public/assets/sender.svg";
import thumbsdown from "../../../public/assets/thumb down.svg";
import thumbsup from "../../../public/assets/thumb up.svg";
import voiceicon from "../../../public/assets/voice icon.svg";
import { getUserDetail } from "../../actions/userActions";
import MatchedImages from "../MatchedImages";
import VoiceCommunication from "../VoiceCommunication";
import PopoverMenu from "../common/PopoverMenu";
import { authentication, db } from "../../config/firebase";
import { useHomeContext } from "../../context/Home";
import { messages as initialMessages } from "../../data";

const ChatInner = ({otherUser}) => {
  const [messages, setMessages] = useState(initialMessages);
  const [inputValue, setInputValue] = useState("");
  const [questionCount, setQuestionCount] = useState(3);
  const [showPopover, setShowPopover] = useState(false);
  const [popoverEvent, setPopoverEvent] = useState(null);
  const [isCommunicationModal, setIsCommunicationModal] = useState(false);
  const [transcribedText, setTranscribedText] = useState("");
  const [showMatchedImages, setShowMatchedImages] = useState(false);
  const { messageList, messageListReducer } = useHomeContext();
  const [matches, setMatches] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [onboardingData, setOnboardingData] = useState([]);

  const userId = authentication?.currentUser?.uid;

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

  const createUserMessage = (query) => {
    return {
      role: "user",
      content: query,
    };
  };

  const createChatMessage = (query) => {
    return {
      content: query,
      role: "user",
    };
  };

  const handleAddStreamedMessage = async (inputValue) => {
    setIsLoading(true);

    const userMessage = createUserMessage(inputValue);
    let docId;

    try {
      const querySnapshot = await getDocs(
        query(collection(db, "Onboarding"), where("userId", "==", userId))
      );

      if (querySnapshot.empty) {
        // Create a new document for the user
        const docRef = await addDoc(collection(db, "Onboarding"), {
          userId,
          chatHistory: [userMessage],
        });
        console.log("Document added with ID: ", docRef.id);
      } else {
        docId = querySnapshot.docs[0].id;
        await updateDoc(doc(db, "Onboarding", docId), {
          chatHistory: arrayUnion(userMessage),
        });
      }

      setTimeout(async () => {
        const aiMessage = {
          role: "ai",
          content:
            "Thank you for your information. Let's move to the next step.",
        };

        if (docId) {
          await updateDoc(doc(db, "Onboarding", docId), {
            chatHistory: arrayUnion(aiMessage),
          });
        }
      }, 1000);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
    messageListReducer(userMessage, "ADD_MESSAGE");

    //  const chatMessage = createChatMessage(query);

    //  sendStreamChatMessage(chatMessage);
    setInputValue("");
    setIsLoading(false);
  };

  const fetchOnboardingData = async () => {
    setIsLoading(true);
    try {
      const querySnapshot = await getDocs(collection(db, "Onboarding"));
      const data = querySnapshot.docs.map((doc) => doc.data());
      setOnboardingData(data);
    } catch (error) {
      console.error("Error fetching onboarding data: ", error);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    fetchOnboardingData();
  }, [inputValue]);

  useEffect(() => {
    const fetchUserDetailsFromFirebase = async (user) => {
      console.log("fetchUserDetailsFromFirebase");
      if (user) {
        try {
          const userDetailsFromFirebase = await getUserDetail(user.uid);
        } catch (error) {
          console.error("Error fetching user details from Firebase:", error);
        }
      }
    };

    const auth = getAuth();

    const unsubscribe = onAuthStateChanged(auth, fetchUserDetailsFromFirebase);

    return () => unsubscribe();
  }, []);

  const handleVoice = () => {};
  return (
<>
<IonContent>
      {!otherUser && <IonGrid className="p-4 bg-dark">
          <IonRow className="flex items-center justify-center  text-sm mb-2  ">
            <IonRow className="flex justify-center items-center w-full relative">
              <IonLabel className="mr-2">
                <b>{questionCount * 10}% </b>profile completed
              </IonLabel>
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
            </IonRow>
          </IonRow>
          <IonRow>
            <IonCol>
              <IonProgressBar value={questionCount * 0.1}></IonProgressBar>
            </IonCol>
          </IonRow>
        </IonGrid>}
        <IonGrid className="p-4 mb-6">
          {onboardingData.map((data, index) => (
            <div key={index}>
              {data.chatHistory.map((message, msgIndex) => (
                <IonRow key={index} className="flex items-center mb-4">
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
                            {message.role === "ai" ? "Matchmaker AI" : "You"}
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
                              message.role === "ai" ? handleLongPress : null
                            }
                          >
                            {transcribedText.length > 1
                              ? transcribedText
                              : message.content}
                          </IonText>
                        </IonCol>
                      </IonRow>
                      {transcribedText.length > 1 && (
                        <IonRow className="flex flex-nowrap items-center mt-2 bg-pausebutton p-2">
                          <IonCol size="auto">
                            <IonText>
                              <h4 className="mb-0">
                                Assess voice communication
                              </h4>
                            </IonText>
                          </IonCol>
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
                      )}
                    </IonGrid>
                    {message.role === "ai" && (
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
                            {/* <Slider handleClick={handleSeeMoreClick} /> */}
                          </div>
                          {showMatchedImages && <MatchedImages />}
                        </div>
                      </>
                    )}
                  </IonCol>
                </IonRow>
              ))}
            </div>
          ))}
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
      </IonContent>
      <IonFooter>
                <IonGrid className="fixed inset-x-0 bottom-0 p-4 w-full">
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
        </IonGrid>
      </IonFooter>
</>
  );
};

export default ChatInner;
