import "./homePageStyles.css";
import React from "react";
import axios from "axios";
import { db } from "../../config/firebase";
import { useHistory } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { SERVER_BASE_URL } from "../../config/config";
import MatchMakerLogo from "../../assets/images/logoAI.png";
import LoginWithPhoneNumber from "../../components/loginWithPhoneNumber";
import Navbar from '../../components/Navbar/Navbar';
import Footer from '../../components/Footer/Footer';
import Box from "@mui/material/Box";
import { homeObjOne, homeObjThree, homeObjTwo, homeObjFour} from './Data';
import InfoSection from '../../components/InfoSection/InfoSection';

export default function HomePage() {
  const history = useHistory();

  const hnanleTryNow = () => {
    const uid = "Xf0wqJ6rIGWck1aV4LMYh4dysSD3";
    const docRef = doc(db, "Users", uid);

    getDoc(docRef)
      .then(async (response) => {
        const data = response.data();
        if (data) {
          // If user exists, navigate to /chat_page
          console.log("Navigating to /chat_page");
          localStorage.setItem("user", JSON.stringify(data));

          // const response = await axios.get(
          //     `${SERVER_BASE_URL}/users/${data.uid}`
          // )
          // console.og('GOt user    ', response)
          // const userDetails = response.data
          // console.log('userDetails--', userDetails)

          // Navigate to ChatPage with user details
          history.push("/", { state: { userDetails: data } });
          setTimeout(() => {
            window.location.reload(false);
          }, 3000);
        }
      })
      .catch((error) => {
        console.log("error--->", error);
      });
  };

  return (
    <Box>
      <Navbar />
      <InfoSection {...homeObjOne} />
      <InfoSection {...homeObjThree} />
      <InfoSection {...homeObjTwo} />
      <InfoSection {...homeObjFour} />
      {/* <img src={MatchMakerLogo} className="matchmaker-logo" />
      <button
        className="btn-submit"
        onClick={() => {
          hnanleTryNow();
          // navigate('/sign_up_page')
        }}
      >
        Join Now
      </button> */}

      <LoginWithPhoneNumber />
      <Footer />
    </Box>
  );
}
