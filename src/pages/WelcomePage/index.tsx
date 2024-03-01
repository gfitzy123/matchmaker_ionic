import "./welcomePageStyles.scss";
import { IonIcon, IonPage, IonContent } from "@ionic/react";
import { ToastContainer } from "react-toastify";
import { ellipsisVertical, menu } from "ionicons/icons";
import MatchMakerLogo from "../../assets/images/logoAI.png";

export default function WelcomePage() {
  const onMenuClick = () => {};
  const onMoreClick = () => {};

  return (
    <IonPage id="welcome-page">
      <IonContent>
        <div className="container">
          <div className="chat-header">
            <div className="btn-menu">
              <IonIcon icon={menu} onClick={onMenuClick} className="icon" />
            </div>
            <img
              src={MatchMakerLogo}
              alt="MatchMaker Logo"
              className="matchmaker-logo"
            />
            <div className="btn-more">
              <IonIcon
                icon={ellipsisVertical}
                onClick={onMoreClick}
                className="icon"
              />
            </div>
          </div>
          <div className="welcome-container">
            <h1 className="heading">Welcome To the Matchmaker AI!</h1>
            <p className="txt-description">{`Welcome to your personal assistant in finding the perfect partner!`}</p>
            <p className="txt-description">{`Here you can find your ideal match thanks to advanced artificial intelligence that helps you understand your preferences and find a suitable match.`}</p>
            <p className="txt-description">{`Just tell us about your preferences, and we'll play cupid, searching for potential matches among our users. Let Matchmaker AI help you find love and make your partner search an unforgettable adventure!`}</p>
          </div>
        </div>
      </IonContent>
      <ToastContainer />
    </IonPage>
  );
}
