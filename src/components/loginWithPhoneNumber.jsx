import "./styles.css";
import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import Box from "@mui/material/Box";
import { createTheme } from "@mui/material/styles";
import { MuiTelInput, matchIsValidTel } from "mui-tel-input";
import { ToastContainer, toast } from "react-toastify";
import { regex } from "../utils/regex";
import TextField from "@mui/material/TextField";
import { useDispatch } from "react-redux";
import { getUserDetail } from "../actions/userActions";
import { SIGNUP } from "../store/actions/types";
import { db } from "../config/firebase";
import axios from "axios";
import { doc, setDoc, getDoc } from "firebase/firestore";
import {
	getAuth,
	RecaptchaVerifier,
	signInWithPhoneNumber,
} from "firebase/auth";
import { signUp } from "../actions/socialLogin";
import { SERVER_BASE_URL } from "../config/config";

function OTPInput({ onOTPSubmit }) {
	const [otp, setOtp] = useState("");

	const handleSubmit = (event) => {
		event.preventDefault();
		onOTPSubmit(otp);
	};

	return (
		<form onSubmit={handleSubmit}>
			<label>
				OTP:
				<input
					type="number"
					value={otp}
					onChange={(e) => setOtp(e.target.value)}
				/>
			</label>
			<input type="submit" value="Verify OTP" />
		</form>
	);
}

export default function LoginWithPhoneNumber() {
	const history = useHistory();
	const dispatch = useDispatch();
	const [phoneNumber, setPhoneNumber] = useState();
	const [email, setEmail] = useState();
	const [password, setPassword] = useState();
	const [expanededForm, setExpandedForm] = useState(false);
	const [otp, setOtp] = useState();
	const [checked, setChecked] = useState(false);
	const [user, setUser] = useState(null);
	const [code, setCode] = useState("");
	const [errorMessage, setErrorMessage] = useState("");
	const [confirmationResult, setConfirmationResult] = useState(null);
	const [expandedOtpForm, setExpandedOtpForm] = useState(false);
	const [showRecaptcha, setShowRecaptcha] = useState(true);

	const recaptchaRef = React.createRef();

	const generatorRecaptcha = (auth) => {
		window.recaptchaVerifier = new RecaptchaVerifier(
			getAuth(),
			"recaptcha-container",
			{
				size: "invisible",
				callback: async (response) => {
					// Reset the reCAPTCHA after 500ms
					console.log("response", response);
					setTimeout(() => {
						console.log("recaptchaRef", recaptchaRef);

						if (recaptchaRef.current) {
							recaptchaRef.current.reset();
						}
					}, 500);
				},
			}
			// getAuth()
		);
	};

	const handlePhoneNumberLogin = async (event, phone) => {
		event.preventDefault();
		console.log("handlePhoneNumberLogin: event", event);
		console.log("loginWithPhoneNumber - phone", phone);
		// Hardcoded phone number for debugging
		const debugPhoneNumber = "+1 413 658 4988";

		// if (phone === debugPhoneNumber) {
		//     // Bypass Firebase and simulate a successful login
		//     console.log(
		//         'Debug phone number entered, bypassing Firebase authentication'
		//     )
		//     const userDoc = doc(db, 'Users', 'hSLfngCKRHUey4KbJvK1cYmh5yw1')
		//     const userDocData = await getDoc(userDoc)
		//     console.log('userDocData', userDocData.exists())

		//     if (userDocData.exists()) {
		//         // If user exists, navigate to /chat_page

		//         const response = await axios.get(
		//             `http://localhost:8080/users/hSLfngCKRHUey4KbJvK1cYmh5yw1`
		//         )
		//         console.log('Got user    ', response)

		//         localStorage.setItem('user', JSON.stringify(response.data))

		//         const userDetails = response.data

		//         // Navigate to ChatPage with user details
		//         navigate('/', { state: { userDetails } })
		//         // window.location.reload(false)
		//     }
		// }
		console.log("matchIsValidTel(phone)", matchIsValidTel(phone));
		// if (matchIsValidTel(phone) === false) {
		//     toast('Invalid Phone Number')
		// } else if (matchIsValidTel(phone) === true) {
		generatorRecaptcha();
		setExpandedOtpForm(true);

		let appVerifier = window.recaptchaVerifier;

		try {
			const result = await signInWithPhoneNumber(getAuth(), phone, appVerifier);
			console.log("signInWithPhoneNumber: result", result);
			setConfirmationResult(result);
		} catch (error) {
			console.log("loginWithPhoneNumber_Error", error);
		}
		// }
	};

	const verifyOTP = async (e) => {
		let otp = e.target.value;
		if (otp.length <= 6) {
			setOtp(otp);
		}
		console.log("OTP", otp);
		console.log("confirmationResult", confirmationResult);

		if (otp.length === 6 && confirmationResult) {
			try {
				let confirmResult = confirmationResult;
				console.log("confirmResult", confirmResult);
				confirmResult
					.confirm(otp)
					.then(async (result) => {
						console.log("Phone Verified Successfully - user", result.user);
						toast("Phone Verified Successfully");
						const user = result.user;
						const userDoc = doc(db, "Users", user.uid);
						const userDocData = await getDoc(userDoc);
						console.log("userDocData", userDocData.exists());

						if (userDocData.exists()) {
							// If user exists, navigate to /chat_page
							console.log("Navigating to /chat_page");
							localStorage.setItem("user", JSON.stringify(user));

							const response = await axios.get(
								`${SERVER_BASE_URL}/users/${user.uid}`
							);
							console.log("GOt user    ", response);
							const userDetails = response.data;

							// Navigate to ChatPage with user details
							history.push("/", { state: { userDetails } });
							window.location.reload(false);
						} else {
							setTimeout(() => {
								history.push("/gender", {
									state: {
										email: user?.email,
										uid: user?.uid,
									},
								});
							}, 1000);
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
		}
	};

	return (
		<div style={{ marginTop: "20px", alignItems: "center" }}>
			<Box
				component="form"
				noValidate
				onSubmit={(event) => handlePhoneNumberLogin(event, phoneNumber)}
			>
				<MuiTelInput
					InputProps={{
						style: {
							color: "black", // change text color
							backgroundColor: "white", // change background color
							borderColor: "#666666", // change border color
							marginTop: "20px",
						},
					}}
					defaultCountry="US"
					// onlyCountries={['US']}

					value={phoneNumber}
					onChange={setPhoneNumber}
				/>

				{/* {showRecaptcha && <div id="recaptcha-container"></div>} */}
				<div id="recaptcha-container"></div>
				{expandedOtpForm === true && (
					<div style={{ marginTop: '1rem' }}>
						<label style={{ color: "#fff" }}>OTP</label>
						<TextField
							id="otpInput"
							value={otp}
							maxLength={6}
							onChange={verifyOTP}
							style={{
								color: "white",
								borderRadius: "5px",
								marginRight: "100px",
								borderColor: "#666666",
								WebkitAppearance: "none",
								MozAppearance: "textfield",
								backgroundColor: "#ffffff",
								width: '100%',
							}}
						/>
						<div id="otpHelp" className="form-text" style={{ color: "white" }}>
							Please enter the one time pin that sent your phone
						</div>
					</div>
				)}
				{expandedOtpForm === false && (
					<button type="submit" className="request-otp">
						Request OTP
					</button>
				)}
			</Box>
			<ToastContainer />
		</div>
	);
}
