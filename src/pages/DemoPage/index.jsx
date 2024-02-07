import "./demoStyles.css";
import React from "react";
import { useHistory } from "react-router-dom";
import MatchMakerLogo from "../../assets/images/logoAI.png";

export default function DemoPage() {
  const history = useHistory();
  return (
    <div className="wrapper">
      <img src={MatchMakerLogo} className="matchmaker-logo" />
      {/* <input placeholder="Type in what you're looking for" className="input" /> */}
      <button
        className="btn-submit"
        onClick={() => {
          history.push("/");
        }}
      >
        Try our demo
      </button>
    </div>
  );
}
