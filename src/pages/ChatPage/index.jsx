import "../ProfilePage/profileStyles.css";
import React, { useState, useEffect, useRef, useReducer } from "react";
import List from "@mui/material/List";
import MenuIcon from "../../assets/images/menu.png";
import AssistantImg from "../../assets/images/assistant.png";
import MenuDrawer from "../../components/drawer";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Chip from "@mui/material/Chip";
import axios from "axios";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import ProfilePage from "../ProfilePage";
import IconButton from "@mui/material/IconButton";
import SendIcon from "@mui/icons-material/Send";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { onAuthStateChanged, getAuth } from "firebase/auth";
import { useHistory } from "react-router-dom";
import LinearWithValueLabel from "../../components/linearProgress";
import {
	getUserDetail,
	getEncounterInformation,
} from "../../actions/userActions";
import MicIcon from "@mui/icons-material/Mic";
import SpeechRecognition, {
	useSpeechRecognition,
} from "react-speech-recognition";
import { useLocation } from "react-router-dom";
import { SERVER_BASE_URL } from "../../config/config";
import {
	getStreamingUrl,
	isJsonString,
	getReceiverFromEncounterId,
} from "./utils";
import { getFirestore, doc, setDoc, getDoc } from "firebase/firestore";
import { onSnapshot } from "firebase/firestore";
import { updateDoc, arrayUnion } from "firebase/firestore";
import Card from "../../components/Card";
import { db } from "../../config/firebase";

const messageListReducer = (state, action) => {
	// console.log('messageListReducer', action)
	switch (action.type) {
		case "SET_MESSAGES":
			return action.messages;
		case "APPEND_CONTENT":
			const newState = [...state];
			const lastMessageIndex = newState.findIndex(
				(message, index) =>
					index === newState.length - 1 && message.role === "assistant"
			);
			if (lastMessageIndex !== -1) {
				newState[lastMessageIndex] = {
					...newState[lastMessageIndex],
					content: newState[lastMessageIndex].content + action.content,
				};
			} else {
				// If the last message is not from an assistant, add a new assistant message
				newState.push({ role: "assistant", content: action.content });
			}
			return newState;
		case "ADD_MESSAGE":
			return [...state, action.message];
		case "ADD_SYSTEM_MESSAGE":
			return [...state, action.message];
		default:
			throw new Error();
	}
};

export default function ChatPage() {
	const [matchesFirstName, setMatchesFirstName] = useState("");
	const [hasActiveEncounter, setHasActiveEncounter] = useState(false);
	const [sessionId, setSessionId] = useState("");
	const [matches, setMatches] = useState([]);
	const [isNotBoarded, setIsNotBoarded] = useState(true);
	const [isMatchScreen, setMatchScreen] = useState(true);
	const [messageList, dispatch] = useReducer(messageListReducer, []);
	const [profilePictures, setProfilePicture] = useState(Array(5).fill(null));

	const [drillDownMessageList, setDrillDownMessageList] = useState({});
	const [message, setMessage] = useState();
	const [isDeletModal, setDeletModal] = useState(false);
	const [isContactSupport, setContactSupport] = useState(false);
	const [isUploadPicture, setUploadPicture] = useState(false);
	const [userDetails, setUserDetails] = useState({});
	const history = useHistory();
	const [upgradeModalOpen, setUpgradeModalOpen] = useState(false);
	const messagesEndRef = React.useRef(null);
	const [open, setOpen] = React.useState(false);
	const [onboardingProgress, setOnboardingProgress] = useState(() => {
		// Try to get the saved progress from localStorage, default to 0 if not found
		const savedProgress = localStorage.getItem("onboardingProgress");
		return savedProgress ? JSON.parse(savedProgress) : 0;
	});
	const [isOnboarding, setIsOnboarding] = React.useState(false);
	const [drawerOpen, setDrawerOpen] = useState(false);
	const [inputValue, setInputValue] = useState("");
	const [profileList, setProfileList] = useState([]);

	const [savedSearches, setSavedSearches] = useState([
		{
			id: 1,
			message:
				"Person who works in finance makes over 100k over 5 feet tall likes to travel",
			data: userDetails,
		},
		{
			id: 2,
			message: "Run Match Algo",
			data: userDetails,
		},
	]);

	const [userSearch, setUserSearch] = useState("");
	const [isLoading, setIsLoading] = useState(false);
	const [hasFetchedUserDetails, setHasFetchedUserDetails] = useState(false);
	const [drillDownProfile, setDrillDownProfile] = useState(null);
	const [encounterData, setEncounterData] = useState(null);
	const location = useLocation();
	const [loading, setLoading] = useState(false);
	const [isDrillDown, setIsDrillDown] = useState(false);
	const handleOpen = () => setDeletModal(true);
	const handleClose = () => setDeletModal(false);
	const openContactSupport = () => setContactSupport(true);
	const closeContactSupport = () => setContactSupport(false);
	const [dateRequestSent, setDateRequestSent] = useState(false);
	const [goBackToMatchScreenButton, setGoBackToMatchScreenButton] =
		useState(false);

	const { transcript, listening, browserSupportsSpeechRecognition } =
		useSpeechRecognition();

	useEffect(() => {
		messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
		// console.log('Updated messageList:', messageList)
	}, [messagesEndRef, messageList]);

	//Handling voice transcript
	useEffect(() => {
		setInputValue(transcript);
	}, [transcript]);

	// Inside your ChatPage component
	useEffect(() => {
		if (hasActiveEncounter && userDetails.activeEncounterId) {
			const db = getFirestore();
			const encounterDocRef = doc(
				db,
				"Encounters",
				userDetails.activeEncounterId
			);

			const unsubscribe = onSnapshot(encounterDocRef, (doc) => {
				if (doc.exists()) {
					const encounterData = doc.data();
					dispatch({
						type: "SET_MESSAGES",
						messages: encounterData.chatHistory,
					});
					setDateRequestSent(encounterData.dateRequestSent);
				} else {
					console.log("No such encounter!");
				}
			});

			// Cleanup the listener when the component unmounts
			return () => unsubscribe();
		}
	}, [hasActiveEncounter, userDetails.activeEncounterId, dispatch]);

	useEffect(() => {
		const fetchUserDetailsFromFirebase = async (user) => {
			console.log("fetchUserDetailsFromFirebase");
			if (user) {
				try {
					const userDetailsFromFirebase = await getUserDetail(user.uid);
					console.log(
						"hasActiveEncounter?",
						userDetailsFromFirebase.data.activeEncounterId
					);
					if (userDetailsFromFirebase.data.activeEncounterId) {
						handleActiveEncounter(userDetailsFromFirebase.data);
					} else if (userDetailsFromFirebase) {
						handleUserDetails(userDetailsFromFirebase.data);
					}
				} catch (error) {
					console.error("Error fetching user details from Firebase:", error);
				}
			}
		};

		const auth = getAuth();

		const unsubscribe = onAuthStateChanged(auth, fetchUserDetailsFromFirebase);

		// Cleanup subscription on unmount
		return () => unsubscribe();
	}, []); // Empty dependency array ensures this effect runs once on mount
	// useEffect(() => {
	//     if (location.state?.userDetails) {
	//         handleUserDetails(location.state.userDetails)
	//     }
	// }, [location.state?.userDetails])

	const handleUserDetails = async (userData) => {
		console.log("handleUserDetails", userData);
		setUserDetails(userData && userData.data ? userData.data : userData);
		setIsNotBoarded(!userData.onboarded);
		setHasActiveEncounter(userData.activeEncounterId ? true : false);

		if (userData.activeEncounterId) {
			setDrillDownProfile(
				getReceiverFromEncounterId(userData.activeEncounterId)
			);
		}
		setMatchScreen(userData.activeEncounterId ? false : true);

		if (
			userData.conversationHistory &&
			userData.conversationHistory.length &&
			userData.onboarded
		) {
			console.log("Setting conversation history to user.conversationHistory");
			dispatch({
				type: "SET_MESSAGES",
				messages: userData.conversationHistory,
			});
		} else if (!userData.onboarded) {
			// Only call sendStreamChatMessage if onboarding is not completed
			initializeOnboarding(userData);
			setIsOnboarding(true);
		}

		if (userData.drillDownMessageList) {
			setDrillDownMessageList(userData.drillDownMessageList);
		}
		if (userData.matches && userData.matches.length) {
			setMatches(userData.matches);
		}
		setHasFetchedUserDetails(true);
	};

	const initializeOnboarding = async (userData) => {
		const onboardingRef = doc(db, "Onboarding", userData.uid);
		const onboardingData = await getDoc(onboardingRef);

		if (onboardingData.exists() && onboardingData.data().chatHistory.length) {
			dispatch({
				type: "SET_MESSAGES",
				messages: onboardingData.data().chatHistory,
			});
		} else {
			console.log("No onboarding chat history or onboarding not started");
			sendStreamChatMessage(null, true, false);
		}
	};

	// Helper function to fetch full profile details
	async function fetchProfileDetails(profileId) {
		const db = getFirestore();
		const profileDoc = doc(db, "Users", profileId);
		const profileSnapshot = await getDoc(profileDoc);
		if (profileSnapshot.exists()) {
			return profileSnapshot.data();
		} else {
			console.log("No such profile!");
			return null;
		}
	}

	const handleActiveEncounter = (userData) => {
		// console.log('handleActiveEncounter', userData)
		setUserDetails(userData && userData.data ? userData.data : userData);
		setIsNotBoarded(!userData.onboarded);
		setHasActiveEncounter(userData.activeEncounterId ? true : false);
		setDrillDownProfile(getReceiverFromEncounterId(userData.activeEncounterId));
		// Check if conversationHistory exists in the user data

		getEncounterInformation(userData.activeEncounterId).then((response) => {
			// console.log('handleActiveEncounter - response', response)
			const encounterData = response.data;
			console.log("encounterData", encounterData);
			setEncounterData(encounterData);

			console.log(
				"Setting encounter conversation history",
				encounterData.chatHistory
			);

			dispatch({
				type: "SET_MESSAGES",
				messages: encounterData.chatHistory,
			});
		});

		setHasFetchedUserDetails(true);
	};

	const openUploadPicture = () => setUploadPicture(true);
	const closeUploadPicture = () => setUploadPicture(false);

	const handleImageChange = (index, event) => {
		let newImages = [...profilePictures];
		newImages[index] = URL.createObjectURL(event?.target?.files[0]);
		setProfilePicture(newImages);
	};

	const handleUploadImage = () => {
		let allFilled = profilePictures.every((element) => element !== null);
		const userRef = doc(db, "Users", userDetails.uid);

		if (allFilled) {
			setDoc(
				userRef,
				{ capital: true, profileUrls: profilePictures },
				{ merge: true }
			);
			closeUploadPicture();
		} else {
			alert("Please select all images");
		}
	};

	// When setting the drillDownMessageList for a specific profile, use the profile's ID as the key
	const setDrillDownProfileHandler = (profile, e) => {
		setIsDrillDown(true);
		console.log("setDrillDownProfileHandler", profile, e);
		setDrillDownProfile(profile);
		// dispatch({
		//     type: 'ADD_SYSTEM_MESSAGE',
		//     message: {
		//         role: 'system',
		//         content: `The user has navigated to the profile screen for ${profile.id}. Please only answer questions about this profile until the user navigates away.`,
		//     },
		// })
		const herOrHim = profile.gender === "Female" ? "her" : "him";

		if (
			!drillDownMessageList[profile.id] ||
			drillDownMessageList[profile.id].length === 0
		) {
			// If it is, add the welcome message
			setDrillDownMessageList((prevList) => {
				return {
					...prevList,
					[profile.id]: [
						{
							role: "assistant",
							content: `Welcome to ${profile.firstName}'s profile. Feel free to ask me anything you want to know about ${herOrHim}.`,
						},
					],
				};
			});
		}
	};

	// console.log('drillDownMessageList', drillDownMessageList)
	const handleAddStreamedMessage = async (inputValue, isSavedMessage) => {
		console.log("handleAddStreamedMessage: inputValue", inputValue);
		console.log("handleAddStreamedMessage", messageList);
		console.log("handleAddStreamedMessage -drillDownProfile", drillDownProfile);
		//temp

		if (inputValue === "Run Match Algo") {
			await axios
				.post(`${SERVER_BASE_URL}/findMatches`, {
					userId: userDetails.uid,
				})
				.then((response) => {
					console.log("Received matches: ", response);
					setMatches(response.data);
					const userDetails = JSON.parse(localStorage.getItem("userDetails"));
					userDetails.matches = response.data;
					localStorage.setItem("userDetails", JSON.stringify(userDetails));
				});
			return;
		}

		setIsLoading(true);

		let query = getQuery(inputValue);
		const userMessage = createUserMessage(query);

		dispatch({ type: "ADD_MESSAGE", message: userMessage });

		// Add a new assistant message to the list
		// dispatch({
		//     type: 'ADD_MESSAGE',
		//     message: { role: 'assistant', content: '' },
		// })

		// if (drillDownProfile) {
		// setDrillDownMessageList((prevList) => {
		//     const currentProfileMessages =
		//         prevList[drillDownProfile.metadata.id] || []
		//     return {
		//         ...prevList,
		//         [drillDownProfile.metadata.id]: [
		//             ...currentProfileMessages,
		//             { role: 'user', content: query },
		//             { role: 'assistant', content: '' },
		//         ],
		//     }
		// })
		// }

		const chatMessage = createChatMessage(query);
		// console.log('Message List before response', messageList)
		// console.log('chatMessage', chatMessage)

		sendStreamChatMessage(chatMessage, isOnboarding, hasActiveEncounter);
		setInputValue("");
	};

	const sendStreamChatMessage = (
		chatMessage,
		isOnboarding,
		hasActiveEncounter,
		isMatchScreen
	) => {
		console.log("sendStreamChatMessage: isOnboarding", isOnboarding);
		console.log(
			"sendStreamChatMessage: hasActiveEncounter",
			hasActiveEncounter
		);
		console.log("sendStreamChatMessage: isMatchScreen", isMatchScreen);
		const chatUrl = getStreamingUrl(isOnboarding, hasActiveEncounter);
		console.log("chatUrl", chatUrl);
		const url = new URL(chatUrl);
		// console.log('sendStreamChatMessage - messageList', messageList)
		// Filter the messages before sending

		url.searchParams.append("chatMessage", JSON.stringify(chatMessage));
		url.searchParams.append("isOnboarding", isOnboarding);

		url.searchParams.append(
			"userId",
			JSON.parse(localStorage.getItem("user"))?.uid || userDetails.uid
		);
		const encounterId =
			JSON.parse(localStorage.getItem("user"))?.activeEncounterId ||
			userDetails.activeEncounterId;

		if (encounterId) {
			url.searchParams.append("encounterId", encounterId);
		}
		url.searchParams.append("userName", userDetails.firstName);
		console.log("matchesFirstName", matchesFirstName);
		url.searchParams.append("matchesFirstName", matchesFirstName);

		url.searchParams.append("isMatchScreen", isMatchScreen);
		url.searchParams.append("hasActiveEncounter", hasActiveEncounter);

		const eventSource = new EventSource(url);
		// dispatch({
		//     type: 'ADD_MESSAGE',
		//     message: {
		//         role: 'assistant',
		//         content: '',
		//     },
		// })
		eventSource.onmessage = (event) => {
			// console.log('eventSource.onmessage', event)
			if (event.data === "END") {
				// Handle the end of the stream
				console.log("Stream ended", messageList);
				console.log("Stream ended");
			} else {
				try {
					const response = JSON.parse(event.data);
					// console.log('response', response)
					setIsLoading(false);
					handleStreamChatResponse(response);
				} catch (error) {
					console.error("Error parsing JSON from response", error);
				}
			}
		};

		eventSource.onclose = (event) => {
			// This event is triggered when the connection is closed (either explicitly or due to an error)
			console.log("Connection closed.");
		};
		eventSource.onerror = (error) => {
			if (eventSource.readyState === EventSource.CLOSED) {
				console.log("Connection was closed");
				setIsLoading(false);
			} else {
				console.log("eventSource.readyState ?", eventSource.readyState);
				console.error("An error occurred:", error);
			}
			eventSource.close();
		};
	};

	const handleStreamChatResponse = (response) => {
		const contentString = String.fromCharCode(...response.data);
		let content;

		if (isNaN(contentString) && isJsonString(contentString)) {
			content = JSON.parse(contentString);

			if (content.sessionId) {
				setSessionId(content.sessionId);
			} else if (content.role === "function") {
				console.log("Function being called", content.name);
				console.log("Function content", content.content);
				switch (content.name) {
					case "startOnboarding":
						setIsOnboarding(true);
						break;
					case "updateOnboardingProgress":
						// Update onboarding progress and save it to localStorage
						const newProgress = content.content;
						setOnboardingProgress(newProgress);
						localStorage.setItem(
							"onboardingProgress",
							JSON.stringify(newProgress)
						);
						break;
					case "updateFeedback":
						setGoBackToMatchScreenButton(true);
						break;
					case "onboardingComplete":
						console.log("Onboarding is complete.");
						console.log("User details", userDetails.conversationHistory);
						// to-do: we need to wait 5 seconds for the user to read the last onboarding message
						// and show a loading animation or something as we grab matches for them.
						// grabbing the matches will prob take 5-10 seconds so an animation needs
						// to be there when they hit the initial match screen
						dispatch({
							type: "SET_MESSAGES",
							messages: [
								...userDetails.conversationHistory,
								userDetails.dailyMatchIntroduction,
							],
						});
						setIsOnboarding(false);
						setMatchScreen(true);

						// sendStreamChatMessage(null, false, false, true)
						break;
					default:
						// Handle other function cases or add a warning for unhandled cases
						break;
				}
				// Prevent appending function messages to the screen
				return; // Stop execution for function messages
			}
		} else {
			content = contentString;
			// Append content to the last assistant message
			dispatch({
				type: "APPEND_CONTENT",
				content: content,
			});
		}
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

	const handleChatError = (error) => {
		setIsLoading(false);
		console.log("handleChatError: ERROR", error);
		const assistantMessage = {
			role: "assistant",
			content: "Sorry, something went wrong. Please try again.",
		};
		// setMessageList((prevMessages) => [...prevMessages, assistantMessage])
		dispatch({ type: "APPEND_CONTENT", assistantMessage });
	};

	const handleSavedMessage = (inputValue) => {
		console.log("handleSavedMessage: inputValue", inputValue);
		handleAddStreamedMessage(inputValue, true);
	};

	const handleSubmit = (event) => {
		event.preventDefault();
		handleAddStreamedMessage(inputValue);
	};

	const startListening = () => {
		SpeechRecognition.startListening({ continuous: true });
	};

	const handleSubscribe = (plan) => {
		console.log(`Subscribed to ${plan}`);
		setOpen(false);
	};

	const handleLike = async (profileId, likes) => {
		const isLike = likes ? true : false;
		console.log("handleLike - isLike", isLike);
		console.log("handleLike: profileId", profileId);

		const user = userDetails;
		// const likedProfile = await fetchProfileDetails(profileId.id)
		// console.log('likedProfile', likedProfile)

		const isMutualLike = profileId.hasLiked;
		console.log("isMutualLike", isMutualLike);

		if (isMutualLike) {
			setHasActiveEncounter(true);
			setDrillDownProfile(profileId.id);
			setIsDrillDown(true);
			setMatchScreen(false);
			console.log("drillDownProfile", drillDownProfile);
			console.log("isDrillDownProfile", isDrillDown);
		}

		// await pauseExecution(3)
		console.log("Sending payload");
		console.log("userId?", JSON.parse(localStorage.getItem("user"))?.uid);
		const payload = {
			isOnboarding: user.onboarded === true ? false : true,
			mutualLike: isMutualLike,
			isLike: isLike,
			userId: JSON.parse(localStorage.getItem("user"))?.uid || userDetails.uid,
			receiverProfileId: profileId.id,
		};

		console.log("Sending payload: ", payload);

		const url = new URL(`${SERVER_BASE_URL}/like`);
		url.searchParams.append("payload", JSON.stringify(payload));

		const eventSource = new EventSource(url);

		setIsLoading(true);
		console.log("payload", payload);
		dispatch({
			type: "ADD_MESSAGE",
			message: {
				role: "assistant",
				content: `You liked ${profileId.firstName}.`,
			},
			hasActiveEncounter: hasActiveEncounter,
			userId: userDetails,
		});

		dispatch({
			type: "ADD_MESSAGE",
			message: {
				role: "assistant",
				content: "",
			},
			hasActiveEncounter: hasActiveEncounter,
			userId: userDetails,
		});
		console.log("after dispatch", payload);
		eventSource.onmessage = (event) => {
			// console.log('onmessage')
			setIsLoading(false);
			if (event.data === "END") {
				console.log("Stream ended");
			} else {
				try {
					const response = JSON.parse(event.data);
					// console.log('POST like response: ', response)
					handleStreamChatResponse(response);
				} catch (error) {
					console.error("Error parsing JSON from response", error);
				}
			}
		};

		eventSource.onerror = (error) => {
			console.error("An error occurred:", error);
			eventSource.close();
		};
	};

	const handleEndEncounter = async () => {
		console.log("Calling handleEndEncounter..");
		await axios.post(`${SERVER_BASE_URL}/endEncounter`, {
			encounterId: userDetails.activeEncounterId,
		});
	};

	const handleProfileClick = async (profileId) => {
		console.log("handleProfileClick", profileId);
		const fullProfile = await fetchProfileDetails(profileId);
		setDrillDownProfile(fullProfile);

		// Check if the drillDownMessageList for this profile is empty
		console.log("handleProfileClick", fullProfile);
		console.log("drillDownMessageList", drillDownMessageList);
	};

	const goBackToMatchScreenHandler = (profile) => {
		console.log("goBackToMatchScreenHandler", profile);
		setHasActiveEncounter(false);
		setIsDrillDown(false);
		setMatchScreen(true); // Add this line
		dispatch({
			type: "ADD_SYSTEM_MESSAGE",
			message: {
				role: "system",
				content: `The user has switched to the main match screen where he can see all profiles. You may answer general questions about all profiles while the user is on this screen.`,
			},
		});
	};

	const setUpADateHandler = (profile) => {
		console.log("setUpADateHandler");
		console.log("setUpADateHandler: profile", profile);

		console.log("Sending payload");
		console.log("userId?", JSON.parse(localStorage.getItem("user"))?.uid);
		const payload = {
			userId: JSON.parse(localStorage.getItem("user"))?.uid || userDetails.uid,
			receiverId: profile.id,
		};

		console.log("Sending payload: ", payload);

		const url = new URL(`${SERVER_BASE_URL}/setUpADate`);

		url.searchParams.append("payload", JSON.stringify(payload));

		const eventSource = new EventSource(url);

		setIsLoading(true);
		console.log("payload", payload);

		dispatch({
			type: "ADD_MESSAGE",
			message: {
				role: "assistant",
				content: `You sent ${profile.firstName} a date request!`,
			},
		});

		dispatch({
			type: "ADD_MESSAGE",
			message: {
				role: "assistant",
				content: "",
			},
		});
		console.log("after dispatch", payload);
		eventSource.onmessage = (event) => {
			// console.log('onmessage')
			setIsLoading(false);

			if (event.data === "END") {
				console.log("Stream ended");
			} else {
				try {
					const response = JSON.parse(event.data);
					// console.log('POST like response: ', response)
					handleStreamChatResponse(response);
				} catch (error) {
					console.error("Error parsing JSON from response", error);
				}
			}
		};

		eventSource.onerror = (error) => {
			console.error("An error occurred:", error);
			eventSource.close();
		};
	};

	//If permission deined for voice
	if (!browserSupportsSpeechRecognition) {
		return <span>Browser doesn't support speech recognition.</span>;
	}
	return (
		<div className="chat-wrapper">
			{/* <audio controls src={audioSrc} hidden style={{ display: 'none' }} /> */}
			<div className="header">
				<div className="chat-header">
					<div className="btn-menu">
						<img
							src={MenuIcon}
							className="menu-icon"
							onClick={() => {
								setDrawerOpen(true);
							}}
						/>
					</div>
					{Object.keys(userDetails).length > 0 ? (
						<MenuDrawer
							user={userDetails}
							setUser={setUserDetails}
							savedSearches={savedSearches}
							open={drawerOpen}
							handleSearch={handleAddStreamedMessage}
							onClose={() => setDrawerOpen(false)}
							handleOpen={handleOpen}
							openContactSupport={openContactSupport}
							openUploadPicture={openUploadPicture}
						/>
					) : null}

					<div className="btn-upgrade-plan center-button">
						<Button
							onClick={() => setOpen(true)}
							style={{ color: "white", fontWeight: "bold" }}
						>
							Upgrade Plan
						</Button>
					</div>
				</div>
			</div>
			<div className="wrapper">
				{isOnboarding ? (
					<List className="messageArea">
						{messageList.map((item, index) => (
							<li key={index} ref={messagesEndRef}>
								<div className="message-box" style={{ color: "white" }}>
									{item.role === "user" && (
										<>
											<AccountCircleIcon />
											<p style={{ color: "white" }}>{item.content}</p>
										</>
									)}
									{item.role === "assistant" && (
										<>
											<img src={AssistantImg} className="message-img" />
											<div style={{ color: "white" }}>
												{item.content.split("\n").map((line, lineIndex) => (
													<React.Fragment key={lineIndex}>
														{lineIndex > 0 && <br />}
														{line}
													</React.Fragment>
												))}
											</div>
										</>
									)}
								</div>
							</li>
						))}

						{isLoading && (
							<div className="message-box" style={{ color: "white" }}>
								<img src={AssistantImg} className="message-img" />
								<p className="typing-indicator" style={{ color: "white" }}>
									Matchmaker assistant is typing a response
								</p>
							</div>
						)}
					</List>
				) : null}

				{(drillDownProfile || hasActiveEncounter) && !isOnboarding ? (
					<List className="messageArea">
						<ProfilePage
							handleLike={handleLike}
							profileItemString={drillDownProfile}
							profileId={drillDownProfile}
							setDrillDownProfile={setDrillDownProfileHandler}
							showLikeButton={true}
							showPassButton={true}
							userId={userDetails.uid}
							setMatchScreen={setMatchScreen}
							setIsDrillDown={setIsDrillDown}
							dispatch={dispatch}
							isEncounter={true}
							endEncounter={handleEndEncounter}
							showHover={false}
							isActiveEncounter={hasActiveEncounter}
							handleSetUpADate={setUpADateHandler}
							dateRequestSent={dateRequestSent}
							setMatchesFirstName={setMatchesFirstName}
						/>
						{messageList.length > 0 &&
							messageList.map((item, index) => {
								if (
									["user", "assistant", "function"].includes(item.role) &&
									item.content
								) {
									return (
										<li key={index} ref={messagesEndRef}>
											<div className="message-box" style={{ color: "white" }}>
												{item.role === "user" ? (
													<AccountCircleIcon />
												) : (
													<img src={AssistantImg} className="message-img" />
												)}
												{item.role === "user" ? (
													<p
														style={{
															color: "white",
														}}
													>
														{item.content}
													</p>
												) : (
													""
												)}
												{item.role === "assistant" && (
													<div
														style={{
															color: "white",
														}}
													>
														{item.content
															.split("\n\n")
															.map((paragraph, index) => (
																<p
																	key={index}
																	style={{
																		marginBottom: "1em",
																	}}
																>
																	{paragraph
																		.split("\n")
																		.map((line, lineIndex) => (
																			<React.Fragment key={lineIndex}>
																				{line}
																				<br />
																			</React.Fragment>
																		))}
																</p>
															))}
													</div>
												)}
												{item.role === "function" &&
													item.name === "searchForProfiles" && (
														<ProfilePage
															showLikeButton={true}
															handleLike={handleLike}
															profileItemString={item.content}
															style={{
																marginTop: "20px",
															}}
														/>
													)}
											</div>
										</li>
									);
								}
								return null;
							})}

						{isLoading ? (
							<div className="message-box" style={{ color: "white" }}>
								<img src={AssistantImg} className="message-img" />
								<p className="typing-indicator" style={{ color: "white" }}>
									Matchmaker assistant is typing a response
								</p>
							</div>
						) : (
							""
						)}

						{goBackToMatchScreenButton && (
							<div className="btn-set-match-screen center-button">
								<Button
									onClick={() => goBackToMatchScreenHandler()}
									style={{
										color: "white",
										fontWeight: "bold",
										width: "50%",
									}}
								>
									End Encounter
								</Button>
							</div>
						)}
						{/* {drillDownProfile &&
                            drillDownMessageList[
                                drillDownProfile.metadata.id
                            ] &&
                            drillDownMessageList[
                                drillDownProfile.metadata.id
                            ].map((item, index) => {
                                if (
                                    ['user', 'assistant', 'function'].includes(
                                        item.role
                                    ) &&
                                    item.content
                                ) {
                                    return (
                                        <li key={index} ref={messagesEndRef}>
                                            <div
                                                className="message-box"
                                                style={{ color: 'white' }}
                                            >
                                                {item.role === 'user' ? (
                                                    <AccountCircleIcon />
                                                ) : (
                                                    <img
                                                        src={AssistantImg}
                                                        className="message-img"
                                                    />
                                                )}
                                                {item.role === 'user' ? (
                                                    <p
                                                        style={{
                                                            color: 'white',
                                                        }}
                                                    >
                                                        {item.content}
                                                    </p>
                                                ) : (
                                                    ''
                                                )}
                                                {item.role === 'assistant' ? (
                                                    <p
                                                        style={{
                                                            color: 'white',
                                                        }}
                                                    >
                                                        {(() => {
                                                            try {
                                                                const parsedContent =
                                                                    JSON.parse(
                                                                        item.content
                                                                    )
                                                                return parsedContent &&
                                                                    parsedContent.message
                                                                    ? parsedContent.message
                                                                    : item.content
                                                            } catch (e) {
                                                                return item.content
                                                            }
                                                        })()}
                                                    </p>
                                                ) : (
                                                    ''
                                                )}
                                            </div>
                                        </li>
                                    )
                                }
                                return null
                            })} */}
					</List>
				) : null}

				{isMatchScreen &&
				!hasActiveEncounter &&
				!drillDownProfile & !isOnboarding ? (
					<div className="matchScreen">
						<Grid container spacing={2}>
							{matches.length &&
								matches.map((profileId, i) => (
									<Grid
										key={i}
										item
										xs={12}
										sm={4}
										style={{ height: "33.33%" }}
									>
										<ProfilePage
											onClick={() => handleProfileClick(profileId)}
											handleProfileClick={handleProfileClick}
											handleLike={handleLike}
											userId={userDetails.uid}
											profileId={profileId}
											setDrillDownProfile={setDrillDownProfileHandler}
											showPassButton={false}
											showLikeButton={false}
											showFindOutMoreButton={true}
											showHover={true}
											setMatchesFirstName={setMatchesFirstName}
										/>
									</Grid>
								))}
						</Grid>
						<List className="messageArea">
							{messageList.length > 0 &&
								messageList.map((item, index) => {
									if (
										["user", "assistant", "function"].includes(item.role) &&
										item.content
									) {
										return (
											<li key={index} ref={messagesEndRef}>
												<div className="message-box" style={{ color: "white" }}>
													{item.role === "user" ? (
														<AccountCircleIcon />
													) : (
														<img src={AssistantImg} className="message-img" />
													)}
													{item.role === "user" ? (
														<p
															style={{
																color: "white",
															}}
														>
															{item.content}
														</p>
													) : null}
													{item.role === "assistant" ? (
														<p
															style={{
																color: "white",
															}}
														>
															{(() => {
																try {
																	const parsedContent = JSON.parse(
																		item.content
																	);
																	return parsedContent && parsedContent.message
																		? parsedContent.message
																		: item.content;
																} catch (e) {
																	return item.content;
																}
															})()}
														</p>
													) : null}
													{item.role === "function" &&
														item.name === "searchForProfiles" && (
															<ProfilePage
																showLikeButton={true}
																handleLike={handleLike}
																profileItemString={item.content}
																style={{
																	marginTop: "20px",
																}}
															/>
														)}
												</div>
											</li>
										);
									}
									return null;
								})}

							{isLoading ? (
								<div className="message-box" style={{ color: "white" }}>
									<img src={AssistantImg} className="message-img" />
									<p className="typing-indicator" style={{ color: "white" }}>
										Matchmaker assistant is typing a response
									</p>
								</div>
							) : (
								""
							)}
						</List>
					</div>
				) : null}
				{userSearch && (
					<Chip
						label={userSearch}
						color="secondary"
						onClick={() => handleAddStreamedMessage(userSearch)}
					/>
				)}
				{/* <Button
                    onClick={playAudio}
                    style={{ coor: 'white', fontWeight: 'bold' }}
                >
                    Speak
                </Button>
                <p>
                    <audio
                        className="w-full"
                        ref={audioRef}
                        src={audioSrc}
                        controls
                    />
                </p> */}
				<div className="chip-container">
					{savedSearches &&
						savedSearches.map((item, index) => (
							<li key={index}>
								<Chip
									label={<span className="truncate">{`${item.message}`}</span>}
									color="primary"
									sx={{ width: "100%" }}
									onClick={() => handleSavedMessage(item.message)}
								/>
							</li>
						))}
				</div>

				{isOnboarding && <LinearWithValueLabel value={onboardingProgress} />}
				<div ref={messagesEndRef} />
				<form className="chatInput" onSubmit={handleSubmit}>
					<Box
						sx={{
							width: "90%", // 90% width
							margin: "0 auto", // center the TextField
							["@media (max-width:600px)"]: {
								// media query for screens smaller than or equal to 600px
								width: "100%", // 100% width on small screens
							},
							display: "flex",
						}}
					>
						<TextField
							fullWidth // make the TextField take up the full width of the Box
							value={inputValue}
							onChange={(e) => setInputValue(e.target.value)}
							variant="outlined"
							disabled={isLoading}
							style={{
								color: "white", // change text color
								backgroundColor: "white", // change background color
								borderColor: "#666666", // change border color
								WebkitAppearance: "none",
								MozAppearance: "textfield",
							}}
							InputProps={{
								endAdornment: (
									<>
										<IconButton
											onClick={() => handleAddStreamedMessage(inputValue)}
											style={{ marginRight: "10px" }}
										>
											<SendIcon />
										</IconButton>
										<button
											onTouchStart={startListening}
											onMouseDown={startListening}
											onTouchEnd={SpeechRecognition.stopListening}
											onMouseUp={SpeechRecognition.stopListening}
											style={micIconStyle}
										>
											<MicIcon
												style={{
													color: "#000",
													marginTop: "5px",
												}}
											/>
										</button>
									</>
								),
							}}
						/>
					</Box>
				</form>
			</div>
			<Modal
				onClose={handleClose}
				aria-labelledby="modal-modal-title"
				aria-describedby="modal-modal-description"
			>
				<Box sx={style}>
					<Typography id="modal-modal-title" variant="h6" component="h2">
						Delete Account
					</Typography>
					<Typography id="modal-modal-description" sx={{ mt: 2 }}>
						Are you sure you want to delete account?
					</Typography>
					<div style={{ marginTop: "30px" }}>
						<Button
							variant="contained"
							color="primary"
							sx={{
								backgroundColor: "goldenrod",
								color: "white",
								marginLeft: "10px",
							}}
							onClick={() => setDeletModal(!isDeletModal)}
						>
							NO
						</Button>
						<Button
							variant="contained"
							color="error"
							style={{ marginLeft: "10px" }}
							sx={{
								backgroundColor: "goldenrod",
								color: "white",
								marginLeft: "10px",
							}}
							onClick={() => setDeletModal(!isDeletModal)}
						>
							YES
						</Button>
					</div>
				</Box>
			</Modal>

			<Modal
				open={open}
				onClose={() => setOpen(false)}
				sx={{
					display: "flex",
					alignItems: "center",
					justifyContent: "center",
					backgroundColor: "black",
				}}
			>
				<Box
					sx={{
						width: "80%",
						margin: "auto",
						marginTop: "10%",
						backgroundColor: "white",
						padding: 2,
					}}
				>
					<Typography variant="h6" align="center">
						SELECT YOUR PLAN
					</Typography>
					<Box
						sx={{
							display: "flex",
							justifyContent: "space-around",
							marginTop: 2,
						}}
					>
						{["FREE", "MEMBER", "CUSTOM/PROFESSIONAL"].map((plan, index) => (
							<Box
								sx={{
									width: "30%",
									bgcolor: "background.paper",
									border: "2px solid goldenrod",
									boxShadow: 24,
									p: 4,
									padding: 2,
									borderRadius: 1,
									textAlign: "center",
								}}
								key={index}
							>
								<Typography variant="h6">{plan}</Typography>
								<Typography variant="subtitle1">
									$ {index * 24 + 24} <span>PER MONTH</span>
								</Typography>
								<ul>
									{plan === "FREE" && (
										<>
											<li>Your own AI matchmaker that learns what you want.</li>
											<li>Limited support</li>
										</>
									)}
									{plan === "MEMBER" && (
										<>
											<li>All basic features</li>
											<li>Priority support</li>
											<li>Access to exclusive content</li>
										</>
									)}
									{plan === "CUSTOM/PROFESSIONAL" && (
										<>
											<li>All member features</li>
											<li>Dedicated account manager</li>
											<li>Custom analytics</li>
										</>
									)}
								</ul>
								<Button
									variant="contained"
									color="primary"
									sx={{
										backgroundColor: "goldenrod",
										color: "white",
									}}
									onClick={() => handleSubscribe(plan)}
								>
									Sign up
								</Button>
							</Box>
						))}
					</Box>
				</Box>
			</Modal>

			<Modal
				open={isContactSupport}
				onClose={closeContactSupport}
				aria-labelledby="modal-modal-title"
				aria-describedby="modal-modal-description"
				sx={{
					display: "flex",
					alignItems: "center",
					justifyContent: "center",
					backgroundColor: "black",
				}}
			>
				<Box
					sx={{
						width: 400,
						bgcolor: "background.paper",
						border: "2px solid goldenrod",
						boxShadow: 24,
						p: 4,
					}}
				>
					<Typography
						id="modal-modal-title"
						variant="h6"
						component="h2"
						style={{ textAlign: "center" }}
					>
						Contact Support
					</Typography>
					<TextField
						multiline
						maxRows={4}
						label="Enter message"
						id="outlined-multiline-flexible"
						style={{ marginTop: "20px" }}
						value={message}
						onChange={(e) => setMessage(e.target.valu)}
					/>
					<div style={{ marginTop: "30px" }}>
						<Button
							color="primary"
							variant="contained"
							style={{}}
							sx={{
								backgroundColor: "goldenrod",
								color: "white",
								marginLeft: "10px",
								display: "flex",
								justifyContent: "center",
							}}
							onClick={closeContactSupport}
						>
							SEND
						</Button>
					</div>
				</Box>
			</Modal>

			<Modal
				open={isUploadPicture}
				onClose={closeUploadPicture}
				aria-labelledby="modal-modal-title"
				aria-describedby="modal-modal-description"
				sx={{
					display: "flex",
					alignItems: "center",
					justifyContent: "center",
					backgroundColor: "black",
				}}
			>
				<Box
					sx={{
						width: 400,
						bgcolor: "background.paper",
						border: "2px solid goldenrod",
						boxShadow: 24,
						p: 4,
					}}
				>
					<Typography
						id="modal-modal-title"
						variant="h6"
						component="h2"
						style={{ textAlign: "center", marginBottom: "20px" }}
					>
						Upload Picture
					</Typography>
					<div className="image-grid">
						{profilePictures.map((item, index) => (
							<div key={index} className="image-container">
								{item ? (
									<Card
										src={item}
										title={`Image ${index + 1}`}
										id={index}
										index={index}
										className={"uploaded-image"}
									/>
								) : (
									<label htmlFor={`fileInput${index}`} className="upload-label">
										<div className="upload-icon">+</div>
										<input
											type="file"
											id={`fileInput${index}`}
											className="file-input"
											onChange={(event) => handleImageChange(index, event)}
										/>
									</label>
								)}
							</div>
						))}
					</div>
					<div style={{ marginTop: "30px" }}>
						<Button
							color="primary"
							variant="contained"
							style={{}}
							sx={{
								backgroundColor: "goldenrod",
								color: "white",
								marginLeft: "120px",
								display: "flex",
								justifyContent: "center",
							}}
							onClick={handleUploadImage}
						>
							Upload
						</Button>
					</div>
				</Box>
			</Modal>
		</div>
	);
}

const style = {
	position: "absolute",
	top: "50%",
	left: "50%",
	transform: "translate(-50%, -50%)",
	width: 400,
	bgcolor: "background.paper",
	border: "2px solid #000",
	boxShadow: 24,
	p: 4,
	textAlign: "center",
};

const micIconStyle = {
	// height: "40px",
	// width: "40px",
	right: "80px",
	position: "absolute",
	height: "45px",
	width: "45px",
	borderRadius: "45px",
	backgroundColor: "rgba(255, 255, 255, 0.08)",
};
