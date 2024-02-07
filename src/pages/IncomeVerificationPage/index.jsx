import "./incomeVerificationPageStyles.css";
import React from "react";
import { useArgyleLink } from "../../utils/use-argyle-link";
import { useLocation } from "react-router-dom";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../../config/firebase";
import matchmakerAILogo from "../../assets/images/logoAI.png";
import { useDispatch } from "react-redux";
import { LOGIN } from "../../store/actions/types";
import { useHistory } from "react-router-dom";
import { getUserDetail } from "../../actions/userActions";
import MatchMakerLogo from "../../assets/images/logoAI.png";
import ArgyleLogo from "../../assets/images/argyle-white.png";
import axios from "axios";
import { getIncomeBracket } from "../../components/drawer";
import { SERVER_BASE_URL } from "../../config/config";

export default function IncomeVerificationPage() {
  let { state } = useLocation();
  const history = useHistory();
  const dispatch = useDispatch();

  const verifyUserIncome = (incomeVerification) => {
    console.log("verifyUserIncome", incomeVerification);
    console.log("state", state);
    const userRef = doc(db, "Users", state.uid);
    setDoc(userRef, { capital: true, incomeVerification }, { merge: true });
  };

  const { error, ready, open, close } = useArgyleLink({
    sandbox: true,
    apiHost: "https://api-sandbox.argyle.com/v1",
    pluginKey: "018545e6-b226-02f4-7233-a304c114a77e",
    onAccountCreated: (params) => verifyUserIncome(params),
    onAccountConnected: (params) => accountConnected(params),
    onAccountUpdated: (params) => verifyUserIncome(params),
    onAccountRemoved: (params) => verifyUserIncome(params),
    onUserCreated: (params) => verifyUserIncome(params),
    onClose: () => console.log("Link closed"),
    onTokenExpired: (params) => console.log("Token expired: ", params),
  });

  const accountConnected = (incomeVerification) => {
    console.log("accountConnected", incomeVerification);
    const userRef = doc(db, "Users", state.uid);
    setDoc(userRef, { capital: true, incomeVerification }, { merge: true });

    // make call to server to get user income and save it to user
    axios
      .post(`${SERVER_BASE_URL}/argyle`, {
        uid: state.uid.toString(),
        incomeVerification,
      })
      .then((response) => {
        console.log("GET income response: ", response);
        const income = response.data.income;
        const incomeBracket = getIncomeBracket(income);
        console.log("incomeBracket: ", incomeBracket);
        setDoc(userRef, { income, incomeBracket }, { merge: true });
        navigate("/final", {
          state: {
            uid: state.uid.toString(),
          },
        });
      });
  };

  return (
    <div class="wrapper">
      <span className="txt-identity">
        <img src={MatchMakerLogo} className="matchmaker-logo" />
        <p> uses Argyle </p>
        to verify identity and employment.
      </span>
      <div style={{ marginTop: 10 }} />
      {error && <div style={{ color: "red" }}>{error}</div>}
      <button
        disabled={!!error}
        onClick={() => open()}
        className="btn-connect-account"
      >
        <img src={ArgyleLogo} className="argyle-logo" />
      </button>
    </div>
  );
}

const styles = {
  container: {
    display: "block",
    alignItems: "flex-center",
    justifyContent: "flex-center",
    height: "100%",
    marginTop: "100px",
  },
  tierLogo: {
    position: "absolute",
    left: "56px",
    top: "48px",
    width: "300px",
    height: "40px",
  },
  txtIdentity: {
    fontFamily: "Montserrat",
    fontStyle: "normal",
    fontWeight: 700,
    fontSize: "32px",
    lineHeight: "133.4%",
    letterSpacing: "0.0125em",
    color: "#ffffff",
    marginTop: "50px",
  },
};
