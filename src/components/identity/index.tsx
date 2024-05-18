import "./identityComponent.scss";
import { useEffect } from "react";
import { Veriff } from "@veriff/js-sdk";
import { db } from "../../config/firebase";
import { doc, setDoc } from "firebase/firestore";
import { VERIFY_API_KEY } from "../../config/config";
import VeriffImage from "../../assets/images/logo.svg";
import { createVeriffFrame } from "@veriff/incontext-sdk";
import { useLocation, useHistory } from "react-router-dom";
import { IonPage, IonTitle, IonText, IonContent } from "@ionic/react";

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
				// console.log("Updating user identity info: ", identityVerification);
				console.log("response", response);
				createVeriffFrame({ url: response.verification.url });
				updateUserIdentityInfo(identityVerification);
			}
		},
	});

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
			history.push("/final", {
				state: {
					uid: state?.uid.toString(),
				},
			});
		}, 60000);
	};

	return (
		<IonPage id="identity-component">
			<IonContent>
				<div className="container">
					<div className="login-logo">
						<img src={VeriffImage} alt="Ionic logo" />
					</div>
					<IonText className="txt-veriff">
						We need to verify your identity to keep everyone safe. All members
						undergo mandatory id verification.
					</IonText>
					<div style={{ marginBottom: "30px" }} />
					<div id="veriff-root"></div>
					<div style={{ marginBottom: "300px" }} />
				</div>
			</IonContent>
		</IonPage>
	);
}
