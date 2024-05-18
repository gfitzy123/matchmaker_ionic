import React from "react";
import { Route, useHistory } from "react-router-dom";
import { IonApp, IonRouterOutlet } from "@ionic/react";

import DemoPage from "./pages/DemoPage";
import HomePage from "./pages/HomePage";
import SignUpPage from "./pages/SignUpPage";
import ProfilePage from "./pages/ProfilePage";
import ChatPage from "./pages/ChatPage";
import GenderSelectionPage from "./pages/GenderSelectionPage";
import IncomeVerificationPage from "./pages/IncomeVerificationPage";
import IdentityVerification from "./components/identity";
import FinalPage from "./pages/FinalPage";
import { useLocation } from "react-router-dom";
import { onAuthStateChanged, getAuth } from "firebase/auth";
import { useEffect, useState } from "react";
import UploadPictures from "./components/uploadPictures";
import MultipleImageUpload from "./components/multipleImageComponent";
import ErrorBoundary from "./components/errorBoundary";
import JoinNow from "./pages/JoinNow";
import GetCode from "./pages/GetCode";
import AccountSetUpPage from "./pages/AccountSetUpPage";
import UploadPhotoPage from "./pages/UploadPhotoPage";
import PlaidComponent from './components/plaid';
import WelcomePage from "./pages/WelcomePage";

export default function Routing() {
  const [isAuthenticated, setIsAuthenticated] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    handleLoginned();
  }, []);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(getAuth(), (user) => {
      setIsAuthenticated(!!user);
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, []);

  const handleLoginned = async () => {
    const loggedInUser = await localStorage.getItem("user");
    if (loggedInUser && loggedInUser !== undefined && loggedInUser !== null) {
      setUser(JSON.parse(loggedInUser));
    }
  };

  return user == null ? (
    <ion-content>
      <Route path="/">
        <JoinNow />
      </Route>
      <Route path="/get_code">
        <GetCode />
      </Route>
      <Route path="/account-setup">
        <AccountSetUpPage />
      </Route>
      <Route path="/upload-photo">
        <UploadPhotoPage />
      </Route>
      <Route path="/demo">
        <DemoPage />
      </Route>
      <Route path="/profile_page">
        <AuthWrapper>
          <ProfilePage />
        </AuthWrapper>
      </Route>
      <Route path="/sign_up_page">
        <SignUpPage />
      </Route>
      <Route path="/gender">
        <GenderSelectionPage />
      </Route>
      <Route path="/argyle">
        <IncomeVerificationPage />
      </Route>
      <Route path="/identity">
        <AuthWrapper>
          <IdentityVerification />
        </AuthWrapper>
      </Route>
      <Route path="/plaid">
        <PlaidComponent />
      </Route>
      <Route path="/final">
        <AuthWrapper>
          <FinalPage />
        </AuthWrapper>
      </Route>
    </ion-content>
  ) : (
    <ion-content>
      <Route path="/">
        <ChatPage />
      </Route>
      <Route path="/uploadpictures">
        <UploadPictures />
      </Route>
      <Route path="/multipleImageUpload">
        <MultipleImageUpload />
      </Route>
      <Route path="/welcome">
        <WelcomePage />
      </Route>
    </ion-content>
  );
}

function AuthWrapper({ children, isAuthenticated }) {
  let location = useLocation();
  let history = useHistory();
  if (!isAuthenticated) {
    history.push("/", { state: { from: location } });
    return <></>;
  }
  return children;
}
