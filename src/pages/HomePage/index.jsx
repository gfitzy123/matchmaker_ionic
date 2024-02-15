import "./homePageStyles.css";
import React, { useState } from "react";
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
import { homeObjOne, homeObjThree, homeObjTwo, homeObjFour } from './Data';
import InfoSection from '../../components/InfoSection/InfoSection';
import styled from 'styled-components';
import { MuiTelInput, matchIsValidTel } from "mui-tel-input";
import ReactPlayer from 'react-player'
import ManIcon from "@mui/icons-material/Man";
import WomanIcon from "@mui/icons-material/Woman";

import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';

export default function HomePage() {
  const history = useHistory();
  const [phoneNumber, setPhoneNumber] = useState();

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
    <StyledContainer>
      <Navbar />
      <StyledSectionOne>
        <StyledLabel fontSize='30px' fontWeight='600' margin='1rem 0' textAlign='center'>Love sparked <br /> by an instant connection</StyledLabel>
        <StyledLabel color='#DDD' margin='1rem 0'>Discover meaningful connections and ignite love through our expert matchmaking</StyledLabel>
        <PhoneNumberInputContainer>
          <StyledLabel>Phone number</StyledLabel>
          <PhoneNumberWrapper>
            <CustomMuiTelInput
              InputProps={{
                style: {
                  color: 'white', // change text color
                  border: 'none',
                  outline: 'none',
                },
              }}
              defaultCountry="US"
              value={phoneNumber}
              onChange={setPhoneNumber}
            />
            <PhoneNumberApplyBtn>
              Apply For Membership
            </PhoneNumberApplyBtn>
          </PhoneNumberWrapper>
        </PhoneNumberInputContainer>
      </StyledSectionOne>
      <StyledSectionTwo>
        <ReactPlayer url='https://www.youtube.com/watch?v=LXb3EKWsInQ' width={'auto'} />
      </StyledSectionTwo>
      <StyledSectionThree>
        <WaitingListLabelContainer>
          <StyledLabel color='#C6A15A' fontSize='arem'>Waiting list</StyledLabel>
          <StyledLabel fontSize='2rem' margin='1rem'>Exclusive Matchmaking Awaits!</StyledLabel>
          <StyledLabel color='#DDD' fontSize='1rem'>Join our waiting list for exclusive access to personalized matchmaking services. Be among the first to connect with compatible singles and embark on a journey to find your perfect match. Don't miss out - sign up now and start your romantic adventure!</StyledLabel>
        </WaitingListLabelContainer>
        <ProgressBarContainer>
          <Progress progress={50} />
        </ProgressBarContainer>
        <StyledLabel color="#C6A15A" fontSize='3rem' fontWtight='700' textTransform='uppercase'>150 / 500</StyledLabel>
        <StyledLabel fontSize='1.5rem' fontWeight='400' margin='1rem'>Users joined</StyledLabel>
        <CompareContainer>
          <CompareSubContainer>
            <CompareHeader>
              <CompareLeftHeader>
                <WomanIcon style={{ color: 'red' }} />
                <CompareRightHeader>
                  <StyledLabel fontSize='2rem' fontWeight='600'>Women</StyledLabel>
                  <StyledLabel color='rgba(255, 255, 255, 0.60)' fontSize='1rem' fontWeight='400'>until launch</StyledLabel>
                </CompareRightHeader>
              </CompareLeftHeader>
              <StyledLabel fontSize='2rem' fontWeight='600'>50 / 250</StyledLabel>
            </CompareHeader>
            <List>
              <ListItem sx={{ borderBottom: '1px solid #383839', padding: '1rem' }}>
                <StyledLabel color='rgba(255, 255, 255, 0.60)' fontSize='1.125rem'>51</StyledLabel>
                <StyledLabel fontSize='1.125rem' margin='0 0 0 2rem'>Courtney</StyledLabel>
              </ListItem>
              <ListItem sx={{ borderBottom: '1px solid #383839', padding: '1rem' }}>
                <StyledLabel color='rgba(255, 255, 255, 0.60)' fontSize='1.125rem'>52</StyledLabel>
                <StyledLabel fontSize='1.125rem' margin='0 0 0 2rem'>Irma</StyledLabel>
              </ListItem>
              <Divider variant="inset" component="li" />
              <ListItem sx={{ borderBottom: '1px solid #383839', padding: '1rem' }}>
                <StyledLabel color='rgba(255, 255, 255, 0.60)' fontSize='1.125rem'>53</StyledLabel>
                <StyledLabel fontSize='1.125rem' margin='0 0 0 2rem'>Julie</StyledLabel>
              </ListItem>
              <Divider variant="inset" component="li" />
              <ListItem sx={{ borderBottom: '1px solid #383839', padding: '1rem' }}>
                <StyledLabel color='rgba(255, 255, 255, 0.60)' fontSize='1.125rem'>54</StyledLabel>
                <StyledLabel fontSize='1.125rem' margin='0 0 0 2rem'>Theresa</StyledLabel>
              </ListItem>
              <Divider variant="inset" component="li" />
              <ListItem sx={{ borderBottom: '1px solid #383839', padding: '1rem' }}>
                <StyledLabel color='rgba(255, 255, 255, 0.60)' fontSize='1.125rem'>55</StyledLabel>
                <StyledLabel fontSize='1.125rem' margin='0 0 0 2rem'>Jane</StyledLabel>
              </ListItem>
            </List>
          </CompareSubContainer>
          <CompareSubContainer>
            <CompareHeader>
              <CompareLeftHeader>
                <ManIcon style={{ color: 'blue' }} />
                <CompareRightHeader>
                  <StyledLabel fontSize='2rem' fontWeight='600'>Men</StyledLabel>
                  <StyledLabel color='rgba(255, 255, 255, 0.60)' fontSize='1rem' fontWeight='400'>until launch</StyledLabel>
                </CompareRightHeader>
              </CompareLeftHeader>
              <StyledLabel fontSize='2rem' fontWeight='600'>100 / 250</StyledLabel>
            </CompareHeader>
            <List>
              <ListItem sx={{ borderBottom: '1px solid #383839', padding: '1rem' }}>
                <StyledLabel color='rgba(255, 255, 255, 0.60)' fontSize='1.125rem'>101</StyledLabel>
                <StyledLabel fontSize='1.125rem' margin='0 0 0 2rem'>Bernard</StyledLabel>
              </ListItem>
              <Divider variant="inset" component="li" />
              <ListItem sx={{ borderBottom: '1px solid #383839', padding: '1rem' }}>
                <StyledLabel color='rgba(255, 255, 255, 0.60)' fontSize='1.125rem'>102</StyledLabel>
                <StyledLabel fontSize='1.125rem' margin='0 0 0 2rem'>Jacob</StyledLabel>
              </ListItem>
              <Divider variant="inset" component="li" />
              <ListItem sx={{ borderBottom: '1px solid #383839', padding: '1rem' }}>
                <StyledLabel color='rgba(255, 255, 255, 0.60)' fontSize='1.125rem'>103</StyledLabel>
                <StyledLabel fontSize='1.125rem' margin='0 0 0 2rem'>Jorge</StyledLabel>
              </ListItem>
              <Divider variant="inset" component="li" />
              <ListItem sx={{ borderBottom: '1px solid #383839', padding: '1rem' }}>
                <StyledLabel color='rgba(255, 255, 255, 0.60)' fontSize='1.125rem'>104</StyledLabel>
                <StyledLabel fontSize='1.125rem' margin='0 0 0 2rem'>Cody</StyledLabel>
              </ListItem>
              <Divider variant="inset" component="li" />
              <ListItem sx={{ borderBottom: '1px solid #383839', padding: '1rem' }}>
                <StyledLabel color='rgba(255, 255, 255, 0.60)' fontSize='1.125rem'>105</StyledLabel>
                <StyledLabel fontSize='1.125rem' margin='0 0 0 2rem'>Floyd</StyledLabel>
              </ListItem>
            </List>
          </CompareSubContainer>
        </CompareContainer>
        <AdvanceContainer>
          <Box>
            <StyledP fontSize='1.5rem' fontWeight='600'>Hi, Theresa! You are so close to exclusive matchmaking!</StyledP>
            <StyledP fontSize='1rem' fontWeight='400'>You are 54 in line, out of 50 people that will be accepted into the initial beta user group. Increase your chances of being accepted by inviting your friends.</StyledP>
          </Box>
          <AdvanceBtn>
            Advance Position
          </AdvanceBtn>
        </AdvanceContainer>
      </StyledSectionThree>
      <StyledSectionFour>
        <Box>
          <StyledP fontSize='3rem' fontWeight='500'>Why join the Matchmaker AI?</StyledP>
          <StyledP color='#C6A15A' fontSize='1rem' fontWeight='400'>If you value precision, efficiency, and cherish your time, joining our platform is the perfect fit for you. As a member, you'll experience heightened accuracy, faster connections, and an elevated caliber of matches.</StyledP>
          <StyledP fontSize='1rem' fontWeight='400'>Members contribute to our goal of maintaining Matchmaker AI as a discerning and top-tier dating and social networking hub. Our community encompasses individuals of various backgrounds, ages, orientations, and educational achievements, united by their ambition and determination to succeed. Naturally, they seek partners who share these qualities. Is there a quest more vital in life? We doubt it. Certain pursuits demand meticulous attention, and we firmly believe that optimizing your chances of finding The One is an investment in yourself that's truly invaluable.</StyledP>
        </Box>
        <MatchRightContainer>
              <GenderContainer>
                
              </GenderContainer>
        </MatchRightContainer>
      </StyledSectionFour>

      <InfoSection {...homeObjOne} />

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
    </StyledContainer>
  );
}

export const StyledContainer = styled.div`
  background: #222224;
  padding: 0 50px;
`

export const StyledSectionOne = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  max-width: 45%;
  margin: auto;
`

export const StyledLabel = styled.label`
  color: ${({ color }) => (color ?? '#fff')};
  font-size: ${({ fontSize }) => (fontSize ?? '16px')};
  font-weight: ${({ fontWeight }) => (fontWeight ?? '500')};
  margin: ${({ margin }) => (margin ?? 'inherit')};
  text-align: ${({ textAlign }) => (textAlign ?? 'left')};
  text-transform: ${({ textAlign }) => (textAlign ?? 'inherit')};
`

export const StyledP = styled.p`
  color: ${({ color }) => (color ?? '#fff')};
  font-size: ${({ fontSize }) => (fontSize ?? '16px')};
  font-weight: ${({ fontWeight }) => (fontWeight ?? '500')};
  text-align: ${({ textAlign }) => (textAlign ?? 'left')};
  text-transform: ${({ textAlign }) => (textAlign ?? 'inherit')};
`

export const PhoneNumberInputContainer = styled.div`
    width: 100%;
    margin-top: 1rem;
`;

export const PhoneNumberWrapper = styled.div`
  display: flex;
  padding: 0.5rem;
  background-color: #222224;
  border-radius: 1rem;
  margin-top: 0.5rem;
`;

export const CustomMuiTelInput = styled(MuiTelInput)`
  fieldset {
    border: none;
  }
`;

export const PhoneNumberApplyBtn = styled.button`
  padding: 0 20px;
  background: #C6A15A;
  border-radius: 8px;
  font-size: 18px;
  font-weight: 600;
  text-transform: uppercase;
  text-wrap: nowrap;
`;

export const StyledSectionTwo = styled.div`
  width: 80%;
  margin: 3rem auto;
`;

export const StyledSectionThree = styled.div`
  width: 70%;
  margin: 3rem auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const WaitingListLabelContainer = styled.div`
  width: 70%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const ProgressBarContainer = styled.div`
  width: 100%;
  height: 20px;
  background-color: #222224;
  border-radius: 10px;
  margin: 4rem 0 2rem;
`;

const Progress = styled.div`
  height: 100%;
  border-radius: 10px;
  background-color: #C6A15A;
  width: ${props => props.progress}%; /* Dynamically adjust width based on progress */
`;

const CompareContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
`

const CompareSubContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 40%;
`

const CompareHeader = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  align-items: center;
  border-radius: 0.75rem 0.75rem 0rem 0rem;
  border-bottom: 1px solid #FFF;
  padding-bottom: .3rem;
`

const CompareLeftHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`

const CompareRightHeader = styled.div`
  display: flex;
  flex-direction: column;
`

const AdvanceContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 3rem;
  background: #383839;
  border-radius: 1rem;
  margin-top: 3rem;
`

export const AdvanceBtn = styled.button`
  padding: 20px;
  background: #C6A15A;
  border-radius: 8px;
  font-size: 1.125rem;
  font-weight: 600;
  line-height: normal;
  text-transform: uppercase;
  text-wrap: nowrap;
`;

export const StyledSectionFour = styled.div`
  width: 80%;
  margin: 3rem auto;
  display: flex;
  justify-content: space-between;
`;

export const MatchRightContainer = styled.div`
  border-radius: 1rem;
  border: 1px solid #fff;
  padding: 3.75rem;
`

export const GenderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  alight-items: center;
`