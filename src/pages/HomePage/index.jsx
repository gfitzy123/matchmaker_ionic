import "./homePageStyles.css";
import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { db } from "../../config/firebase";
import { useHistory } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { SERVER_BASE_URL } from "../../config/config";
import MatchMakerLogo from "../../assets/images/logoAI.png";
import LoginWithPhoneNumber from "../../components/loginWithPhoneNumber";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import Box from "@mui/material/Box";
import {
  homeObjOne,
  homeObjThree,
  homeObjTwo,
  homeObjFour,
  womenLists,
  menLists,
  titles,
} from "./Data";
import InfoSection from "../../components/InfoSection/InfoSection";
// import styled from "styled-components";
// import { MuiTelInput, matchIsValidTel } from "mui-tel-input";
import ReactPlayer from "react-player";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";

import Women from "../../assets/images/women.svg";
import Men from "../../assets/images/men.svg";
import Search from "../../assets/images/search.svg";
import Rocket from "../../assets/images/rocket.svg";
import Target from "../../assets/images/target.svg";

import PersonalForm from "./personalForm";
import FAQAccordion from "./accordion";
import {
  StyledContainer,
  StyledSectionOne,
  StyledLabel,
  StyledP,
  PhoneNumberInputContainer,
  PhoneNumberWrapper,
  CustomMuiTelInput,
  PhoneNumberApplyBtn,
  StyledSectionTwo,
  StyledSectionThree,
  WaitingListLabelContainer,
  ProgressBarContainer,
  Progress,
  CompareContainer,
  CompareSubContainer,
  CompareHeader,
  CompareLeftHeader,
  CompareRightHeader,
  AdvanceContainer,
  AdvanceBtn,
  StyledSectionFour,
  MatchRightContainer,
  GenderContainer,
  WomenIcon,
  MenIcon,
  StyledSectionFive,
  SubscriptionBlock,
  StyledSectionSix,
  FAQHeader,
  SectionIcons,
} from "./homePageStyles";
import useMobileCheck from './mobileCheck';

export default function HomePage() {
  const history = useHistory();
  const [phoneNumber, setPhoneNumber] = useState();
  const isMobile = useMobileCheck();
  const toggleState = useSelector((state) => state.HomeReducer.toggle);

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
    <StyledContainer toggleState={toggleState}>
      <Navbar isMobile={isMobile} />
      <StyledSectionOne>
        <StyledLabel
          color={toggleState ? "white" : "#222224"}
          fontSize="30px"
          fontWeight="600"
          margin="1rem 0"
          textAlign="center"
        >
          Love sparked <br /> by an instant connection
        </StyledLabel>
        <StyledLabel
          color={toggleState ? "#DDD" : "#222224CC"}
          margin="1rem 0"
          textAlign="center"
        >
          Discover meaningful connections and ignite love through our expert
          matchmaking
        </StyledLabel>
        <PhoneNumberInputContainer>
          <StyledLabel color={toggleState ? "white" : "#222224"}>
            Phone number
          </StyledLabel>
          <PhoneNumberWrapper toggleState={toggleState}>
            <CustomMuiTelInput
              InputProps={{
                style: {
                  color: toggleState ? "white" : "#222224",
                  border: "none",
                  outline: "none",
                },
              }}
              defaultCountry="US"
              value={phoneNumber}
              onChange={setPhoneNumber}
            />
            {!isMobile && (
              <PhoneNumberApplyBtn
                toggleState={toggleState}
                onClick={() => hnanleTryNow}
              >
                Apply For Membership
              </PhoneNumberApplyBtn>
            )}
          </PhoneNumberWrapper>
          {isMobile && (
            <PhoneNumberApplyBtn
              onClick={() => hnanleTryNow}
              toggleState={toggleState}
            >
              Apply For Membership
            </PhoneNumberApplyBtn>
          )}
        </PhoneNumberInputContainer>
      </StyledSectionOne>
      <StyledSectionTwo>
        <ReactPlayer
          url="https://www.youtube.com/watch?v=LXb3EKWsInQ"
          width={"auto"}
        />
      </StyledSectionTwo>
      <StyledSectionThree>
        <WaitingListLabelContainer>
          <StyledLabel color="#C6A15A" fontSize="16px">
            WAITING LIST
          </StyledLabel>
          <StyledLabel
            color={toggleState ? "white" : "#222224"}
            fontSize="32px"
            margin="1rem"
          >
            Exclusive Matchmaking Awaits!
          </StyledLabel>
          <StyledLabel
            color={!toggleState ? "#222224CC" : "#FFFFFF99"}
            fontSize="16px"
            lineHeight="26px"
          >
            Join our waiting list for exclusive access to personalized
            matchmaking services. Be among the first to connect with compatible
            singles and embark on a journey to find your perfect match. Don't
            miss out - sign up now and start your romantic adventure!
          </StyledLabel>
        </WaitingListLabelContainer>
        <ProgressBarContainer toggleState={toggleState}>
          <Progress progress={50} />
        </ProgressBarContainer>
        <StyledLabel
          color="#C6A15A"
          fontSize="32px"
          fontWtight="700"
          textTransform="uppercase"
          margin={isMobile && "0 0 2rem 0"}
        >
          150 / 500
        </StyledLabel>
        <StyledLabel
          color={!toggleState ? "#222224CC" : "#DDD"}
          fontSize="24px"
          fontWeight="400"
          margin="1rem"
        >
          Users joined
        </StyledLabel>
        <CompareContainer>
          <CompareSubContainer toggleState={toggleState}>
            <CompareHeader>
              <CompareLeftHeader toggleState={toggleState}>
                <WomenIcon src={Women} alt="Women" />
                <CompareRightHeader>
                  <StyledLabel
                    color={!toggleState ? "#222224CC" : "#DDD"}
                    fontSize="24px"
                    fontWeight="600"
                    textAlign="left"
                  >
                    Women
                  </StyledLabel>
                  <StyledLabel
                    color={!toggleState ? "#222224CC" : "#FFFFFF99"}
                    fontSize="16px"
                    fontWeight="400"
                  >
                    until launch
                  </StyledLabel>
                </CompareRightHeader>
              </CompareLeftHeader>
              <StyledLabel
                color={!toggleState ? "#222224CC" : "#DDD"}
                fontSize="24px"
                fontWeight="600"
              >
                50 / 250
              </StyledLabel>
            </CompareHeader>
            <List
              sx={{
                "& .MuiListItem-root:hover": {
                  backgroundColor: "#383839",
                },
              }}
            >
              {womenLists.map((women, index) => {
                return (
                  <ListItem
                    sx={{
                      borderBottom: "1px solid #383839",
                      padding: "1rem",
                    }}
                  >
                    <StyledLabel
                      color={toggleState ? "#FFFFFF99" : "#222224"}
                      fontSize="18px"
                      margin={isMobile && "0 2rem 0 0"}
                    >
                      {women.num}
                    </StyledLabel>
                    <StyledLabel
                      color={toggleState ? "white" : "black"}
                      fontSize="18px"
                      margin="0 0 0 2rem"
                    >
                      {women.name}
                    </StyledLabel>
                  </ListItem>
                );
              })}
            </List>
          </CompareSubContainer>
          <CompareSubContainer toggleState={toggleState}>
            <CompareHeader>
              <CompareLeftHeader toggleState={toggleState}>
                <MenIcon src={Men} alt="Men" />
                <CompareRightHeader>
                  <StyledLabel
                    color={!toggleState ? "#222224CC" : "#DDD"}
                    fontSize="24px"
                    fontWeight="600"
                    textAlign="left"
                  >
                    Men
                  </StyledLabel>
                  <StyledLabel
                    color={!toggleState ? "#222224CC" : "#FFFFFF99"}
                    fontSize="16px"
                    fontWeight="400"
                  >
                    until launch
                  </StyledLabel>
                </CompareRightHeader>
              </CompareLeftHeader>
              <StyledLabel
                color={!toggleState ? "#222224CC" : "#DDD"}
                fontSize="24px"
                fontWeight="600"
              >
                100 / 250
              </StyledLabel>
            </CompareHeader>
            <List
              sx={{
                "& .MuiListItem-root:hover": { backgroundColor: "#383839" },
              }}
            >
              {menLists.map((men, index) => {
                return (
                  <ListItem
                    sx={{
                      borderBottom: "1px solid #383839",
                      padding: "1rem",
                    }}
                  >
                    <StyledLabel
                      color={toggleState ? "#FFFFFF99" : "#222224"}
                      fontSize="18px"
                    >
                      {men.num}
                    </StyledLabel>
                    <StyledLabel
                      color={toggleState ? "white" : "black"}
                      fontSize="18px"
                      margin="0 0 0 2rem"
                    >
                      {men.name}
                    </StyledLabel>
                  </ListItem>
                );
              })}
            </List>
          </CompareSubContainer>
        </CompareContainer>
        <AdvanceContainer toggleState={toggleState}>
          <Box>
            <StyledP
              color={!toggleState ? "#222224" : "white"}
              fontSize="24px"
              fontWeight="600"
            >
              Hi, Theresa! You are so close to exclusive matchmaking!
            </StyledP>
            <StyledP
              color={!toggleState ? "#222224CC" : "#FFFFFF"}
              fontSize="16px"
              fontWeight="400"
            >
              You are <b>54</b> in line, out of 50 people that will be accepted
              into the initial beta user group. Increase your chances of being
              accepted by inviting your friends.
            </StyledP>
          </Box>
          <AdvanceBtn toggleState={toggleState}>Advance Position</AdvanceBtn>
        </AdvanceContainer>
      </StyledSectionThree>
      <StyledSectionFour>
        <Box sx={{ paddingRight: !isMobile && "5rem", width: "100%" }}>
          <StyledLabel
            color={!toggleState ? "#222224CC" : "#FFFFFF"}
            fontSize={isMobile ? "32px" : "48px"}
            fontWeight="500"
          >
            Why join the Matchmaker AI?
          </StyledLabel>
          <StyledP
            fontStyle="Italic"
            lineHeight="26px"
            color="#C6A15A"
            fontSize="16px"
            fontWeight="400"
          >
            If you value precision, efficiency, and cherish your time, joining
            our platform is the perfect fit for you. As a member, you'll
            experience heightened accuracy, faster connections, and an elevated
            caliber of matches.
          </StyledP>
          <StyledP
            color={!toggleState ? "#222224" : "#FFFFFF"}
            fontSize="16px"
            fontWeight="400"
            lineHeight="26px"
          >
            Members contribute to our goal of maintaining Matchmaker AI as a
            discerning and top-tier dating and social networking hub. Our
            community encompasses individuals of various backgrounds, ages,
            orientations, and educational achievements, united by their ambition
            and determination to succeed. Naturally, they seek partners who
            share these qualities. Is there a quest more vital in life? We doubt
            it. Certain pursuits demand meticulous attention, and we firmly
            believe that optimizing your chances of finding The One is an
            investment in yourself that's truly invaluable.
          </StyledP>
        </Box>
        <PersonalForm isMobile={isMobile} toggleState={toggleState} />
      </StyledSectionFour>
      <StyledSectionFive>
        <Box
          sx={{
            width: !isMobile ? "240px" : "100%",
            display: isMobile && "flex",
            marginTop: isMobile && "40px",
          }}
        >
          <SectionIcons src={Search} />
          <SubscriptionBlock>
            <StyledP
              color={!toggleState ? "#222224" : "#FFFFFF"}
              fontSize="24px"
              fontWeight="500"
              margin={isMobile && "0px"}
            >
              Smart Compatibility
            </StyledP>
            <StyledP
              color={!toggleState ? "#222224" : "#FFFFFFCC"}
              fontSize="16px"
              fontWeight="400"
              margin={isMobile && "24px 0 0 0"}
              lineHeight="26px"
            >
              Our matchmaking AI intelligently analyzes your preferences and
              behavior to find the perfect match tailored just for you.
            </StyledP>
          </SubscriptionBlock>
        </Box>
        <Box
          sx={{
            width: !isMobile ? "240px" : "100%",
            display: isMobile && "flex",
            marginTop: isMobile && "40px",
          }}
        >
          <SectionIcons src={Rocket} />
          <SubscriptionBlock>
            <StyledP
              color={!toggleState ? "#222224" : "#FFFFFF"}
              fontSize="24px"
              fontWeight="500"
              margin={isMobile && "0px"}
            >
              Effortless Connections
            </StyledP>
            <StyledP
              color={!toggleState ? "#222224" : "#FFFFFFCC"}
              fontSize="16px"
              fontWeight="400"
              margin={isMobile && "24px 0 0 0"}
              lineHeight="26px"
            >
              With our AI-driven matchmaking, effortlessly connect with
              like-minded individuals who share your interests and values,
              saving you time and energy in your search for love.
            </StyledP>
          </SubscriptionBlock>
        </Box>
        <Box
          sx={{
            width: !isMobile ? "240px" : "100%",
            display: isMobile && "flex",
            marginTop: isMobile && "40px",
          }}
        >
          <SectionIcons src={Target} />
          <SubscriptionBlock>
            <StyledP
              color={!toggleState ? "#222224" : "#FFFFFF"}
              fontSize="24px"
              fontWeight="500"
              margin={isMobile && "0px"}
            >
              Personalized Matches
            </StyledP>
            <StyledP
              color={!toggleState ? "#222224" : "#FFFFFFCC"}
              fontSize="16px"
              fontWeight="400"
              margin={isMobile && "24px 0 0 0"}
              lineHeight="26px"
            >
              Experience personalized matchmaking tailored to your unique
              personality and desires, ensuring every match has the potential
              for a meaningful connection.
            </StyledP>
          </SubscriptionBlock>
        </Box>
      </StyledSectionFive>

      <StyledSectionSix>
        <FAQHeader>
          <StyledP color="#C6A15A;" textAlign="center">
            FAQ
          </StyledP>
          <StyledLabel
            color={!toggleState ? "#222224" : "#FFFFFF"}
            fontSize="32px"
            textAlign="center"
          >
            Have Questions? We've Got Answers!
          </StyledLabel>
        </FAQHeader>
        {titles.map((title, i) => {
          return (
            <div>
              <FAQAccordion
                title={title.head}
                children={title.sub}
                index={i}
                toggleState={toggleState}
              />
            </div>
          );
        })}
      </StyledSectionSix>
      <AdvanceContainer toggleState={toggleState}>
        <Box>
          <StyledP
            color={!toggleState ? "#222224" : "#FFFFFF"}
            fontSize="32px"
            fontWeight="500"
            margin="2rem 0 2rem 0"
            lineHeight="35px"
          >
            Find Your Perfect Match Today!
          </StyledP>
          <StyledP
            fontSize="16px"
            color={!toggleState ? "#222224" : "#FFFFFF99"}
            fontWeight="400"
          >
            Join Matchmaking AI and discover meaningful connections tailored to
            you.
          </StyledP>
        </Box>
        <AdvanceBtn toggleState={toggleState}>Apply For Membership</AdvanceBtn>
      </AdvanceContainer>
      <Footer toggleState={toggleState} />
    </StyledContainer>
  );
}
