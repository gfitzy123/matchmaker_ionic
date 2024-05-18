import "./styles.css";
import React, { useEffect } from "react";
import { Veriff } from "@veriff/js-sdk";
import { db } from "../config/firebase";
import { doc, setDoc } from "firebase/firestore";
import { VERIFY_API_KEY } from "../config/config";
import { createVeriffFrame } from "@veriff/incontext-sdk";
import { useLocation, useHistory } from "react-router-dom";
import VeriffImage from "../assets/images/logo.svg";

export default function IdentityVerification(props) {
	const history = useHistory();
	let { state } = useLocation();

	useEffect(() => {
		veriff.setParams({
			person: {
				givenName: " ",
				lastName: " ",
			},
			vendorData: " ",
		});
		veriff.mount();
	}, []);

	const veriff = Veriff({
		host: "https://stationapi.veriff.com",

		apiKey: VERIFY_API_KEY,
		parentId: "veriff-root",
		onSession: function (err, response) {
			console.log("Veriff response: ", response);
			if (err) {
				console.log("Veriff error: ", err);
				return;
			}
			if (response.status === "success") {
				let identityVerification = {
					userId: state?.uid.toString(),
					veriffId: response.verification.id,
					vendorData: response.verification.vendorData,
				};
				console.log("Updating user identity info: ", identityVerification);
				createVeriffFrame({ url: response.verification.url });
				updateUserIdentityInfo(identityVerification);
			}
		},
	});

	//       const veriff = Veriff({
	//     apiKey: 'f46c32a5-1a9b-4267-9503-a9591d273651',
	//     parentId: 'veriff-root',
	//     onSession: function(err, response) {
	//       window.veriffSDK.createVeriffFrame({ url: response.verification.url });
	//     }
	//   });
	const updateUserIdentityInfo = (identityVerification) => {
		const userRef = doc(db, "Users", identityVerification.userId);
		setDoc(
			userRef,
			{
				capital: true,
				idVerified: false,
				veriffId: identityVerification.veriffId,
				identityVerificationData: identityVerification,
			},
			{ merge: true }
		);
		setTimeout(() => {
			history.psuh("/final", {
				state: {
					uid: state.uid.toString(),
				},
			});
		}, 60000);
	};

	return (
		<div class="wrapper">
			<img src={VeriffImage} className="veriffLogo" />
			<span className="txt-veriff">
				1We need to verify your identity to keep everyone safe.
			</span>
			<div style={{ marginTop: 20 }} />
			<div id="veriff-root"></div>
		</div>
	);
}
