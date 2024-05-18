import "./GetCode.scss";
import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import {
	IonPage,
	IonInput,
	IonTitle,
	IonButton,
	IonContent,
	IonIcon,
} from "@ionic/react";
import { closeOutline } from "ionicons/icons";
import axios from "axios";
import { useHistory } from "react-router";
import { db } from "../../config/firebase";
import Logo from "../../assets/images/logo.png";
import { doc, getDoc } from "firebase/firestore";
import { SERVER_BASE_URL } from "../../config/config";
import { ToastContainer, toast } from "react-toastify";
import { getAuth, RecaptchaVerifier } from "firebase/auth";
import IonModalComponent from "../../components/Modal/IonModal";

const GetCode: React.FC = (props) => {
	const params = useHistory();
	// const [otp, setOtp] = useState("");
	const [otpInputs, setOtpInputs] = useState(["", "", "", "", "", ""]);
	const ionInputEls = useRef<Array<HTMLIonInputElement>>([]);
	const [isModalOpen, setIsModalOpen] = useState(false);

	// const ionInputEl = useRef<HTMLIonInputElement>(null);
	// const [confirmationResult, setConfirmationResult] = useState(null);
	const confirmationResult = useSelector(
		(state: any) => state.HomeReducer.confirmResult
	);

	const recaptchaRef = React.createRef();

	const generatorRecaptcha = () => {
		(window as any).recaptchaVerifier = new RecaptchaVerifier(
			"recaptcha-container",
			{
				size: "invisible",
				callback: async (response) => {
					// Reset the reCAPTCHA after 500ms
					console.log("response", response);
					setTimeout(() => {
						console.log("recaptchaRef", recaptchaRef);

						const ref = recaptchaRef.current as { reset: () => void }; // Asserting the type
						if (ref) {
							ref.reset();
						}
					}, 500);
				},
			},
			getAuth()
		);
	};

	// useEffect(() => {
	//   if (
	//     params?.location?.search !== null &&
	//     params?.location?.search !== undefined
	//   ) {
	//     const jsonString = params?.location?.pathname;
	//     const jsonPart = jsonString.split(":").slice(1).join(":").trim();
	//     // Removing escape characters
	//     const cleanedJsonString = jsonPart.replace(/\\/g, "");
	//     // Parsing JSON
	//     const jsonData = JSON.parse(cleanedJsonString);
	//     // Extracting jsonData
	//     setConfirmationResult(jsonData);
	//   }
	// }, []);

	useEffect(() => {
		// Check if all OTP inputs are filled and length is 6
		if (otpInputs.length === 6 && otpInputs.every((input) => input !== "")) {
			generatorRecaptcha(); // Ensure reCAPTCHA is generated
			handleSubmit(new Event("submit")); // Programmatically trigger handleSubmit
		}
	}, [otpInputs]); // Dependency array includes otpInputs to trigger effect when it changes

	const handleSubmit = async (event) => {
		event.preventDefault();
		console.log("handleSubmit", otpInputs);
		console.log("joined inputs:", otpInputs.join(""));
		if (otpInputs.length === 6 && confirmationResult) {
			try {
				let confirmResult = confirmationResult;
				console.log("confirmResult", confirmResult);
				confirmResult
					.confirm(otpInputs.join(""))
					.then(async (result) => {
						console.log("Phone Verified Successfully - user", result.user);
						toast("Phone Verified Successfully");
						const user = result.user;
						const userDoc = doc(db, "Users", user.uid);
						const userDocData = await getDoc(userDoc);
						console.log("userDocData", userDocData.exists());
						setIsModalOpen(true);

						if (userDocData.exists()) {
							// If user exists, navigate to /chat_page
							console.log("Navigating to /chat_page");
							// localStorage.setItem("user", JSON.stringify(user));

							// const response = await axios.get(
							//   `${SERVER_BASE_URL}/users/${user.uid}`
							// );
							// const userDetails = response.data;
						} else {
						}
					})
					.catch((error) => {
						const errorCode = error.code;
						const errorMessage = error.message;
						console.log("otp_Error", errorCode, errorMessage);
						if (errorCode === "auth/invalid-verification-code") {
							toast("Invalid verification Code");
						} else {
							toast("Phone Verification Failed");
						}
					});
			} catch (e) {
				console.log("verifyOTP_Error", e);
			}
		} else {
			toast("Please enter your number we texted you");
		}
	};

	const onVerifyCode = (ev: Event) => {
		const target = ev.target as HTMLIonInputElement;
		const inputIndex = parseInt(target.getAttribute("data-index") || "0", 10);
		const value = (ev.target as HTMLIonInputElement).value as string;

		// Ensure the value is a single digit
		const filteredValue = value.replace(/\D/g, "").substring(0, 1);

		// Update the OTP array with the new value
		const newOtp = [...otpInputs];
		newOtp[inputIndex] = filteredValue;
		setOtpInputs(newOtp);

		// Move focus to the next input if available
		const nextInputIndex = inputIndex + 1;
		if (nextInputIndex < 6 && newOtp[inputIndex] !== "") {
			const nextInput = ionInputEls.current[nextInputIndex];
			if (nextInput) {
				nextInput.setFocus();
			}
		}
	};
	const handleClearAll = () => {
		setOtpInputs(["", "", "", "", "", ""]);

		const firstInputElement = ionInputEls.current[0];
		if (firstInputElement) {
			firstInputElement.setFocus();
		}
	};

	const handleCloseModal = () => {
		setIsModalOpen(false);
	};

	return (
		<IonPage id="get-code-page">
			<IonContent>
				<div className="container">
					<div className="login-logo">
						<img src={Logo} alt="Ionic logo" />
					</div>

					<IonTitle className="txt-phone">
						Enter your number we texted you
					</IonTitle>
					<form noValidate onSubmit={(event) => handleSubmit(event)}>
						<div style={{ display: "flex", margin: "5px" }}>
							{otpInputs.map((value, index) => (
								<IonInput
									key={index}
									ref={(el) => (ionInputEls.current[index] = el)}
									placeholder="0"
									maxlength={1}
									inputMode="numeric"
									style={{
										color: "white",
										textAlign: "center",
										marginRight: "3px",
									}}
									value={value}
									onIonInput={onVerifyCode}
									data-index={index}
								></IonInput>
							))}

							<IonButton onClick={handleClearAll} className="close-icon">
								<IonIcon icon={closeOutline} />
							</IonButton>
						</div>
						<div id="recaptcha-container"></div>
						<div style={{ marginBottom: "50px" }} />

						<IonButton type="submit" expand="block" className="button">
							SUBMIT
						</IonButton>
						<div style={{ marginBottom: "200px" }} />
					</form>
				</div>
				<IonModalComponent isOpen={isModalOpen} onClose={handleCloseModal} />
			</IonContent>
			<ToastContainer />
		</IonPage>
	);
};

export default GetCode;
