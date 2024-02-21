import styled from "styled-components";
import { MuiTelInput, matchIsValidTel } from "mui-tel-input";

export const StyledContainer = styled.div`
  background: ${({ toggleState }) => (toggleState ? "#222224" : "#F5F6FA")};
  color: ${({ toggleState }) => (toggleState ? "#222224" : "white")};
  padding: 0 50px;
  @media screen and (max-width: 768px) {
    padding: 0px 20px 0px 20px;
  }
`;

export const StyledSectionOne = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  max-width: 45%;
  margin: auto;
  @media screen and (max-width: 960px) {
    margin: 0px;
    max-width: 100%;
  }
`;

export const StyledLabel = styled.label`
  color: ${({ color }) => color ?? "#fff"};
  font-size: ${({ fontSize }) => fontSize ?? "16px"};
  font-weight: ${({ fontWeight }) => fontWeight ?? "500"};
  margin: ${({ margin }) => margin ?? "inherit"};
  text-align: ${({ textAlign }) => textAlign ?? "left"};
  text-transform: ${({ textAlign }) => textAlign ?? "inherit"};
  line-height: ${({ lineHeight }) => lineHeight ?? lineHeight};
  @media screen and (max-width: 960px) {
    text-align: center;
    line-height: 32px;
  }
`;

export const StyledP = styled.p`
  color: ${({ color }) => color ?? "#fff"};
  font-size: ${({ fontSize }) => fontSize ?? "16px"};
  font-weight: ${({ fontWeight }) => fontWeight ?? "500"};
  text-align: ${({ textAlign }) => textAlign ?? "left"};
  text-transform: ${({ textAlign }) => textAlign ?? "inherit"};
  padding: ${({ padding }) => padding ?? padding};
  margin: ${({ margin }) => margin ?? margin};
  font-style: ${({ fontStyle }) => fontStyle ?? fontStyle};
  line-height: ${({ lineHeight }) => lineHeight ?? lineHeight};
`;

export const PhoneNumberInputContainer = styled.div`
  width: 100%;
  margin-top: 1rem;
`;

export const PhoneNumberWrapper = styled.div`
  display: flex;
  padding: 8px;
  background-color: ${({ toggleState }) =>
    !toggleState ? "white" : "#383839"};
  border: ${({ toggleState }) =>
    !toggleState ? "solid 1px #DDDDDD" : "#383839"};
  border-radius: 8px;
  margin-top: 0.5rem;
  @media screen and (max-width: 960px) {
    height: 56px;
    padding: 0;
  }
`;

export const CustomMuiTelInput = styled(MuiTelInput)`
  fieldset {
    border: none;
  }
`;

export const PhoneNumberApplyBtn = styled.button`
  padding: 0 20px;
  background: #c6a15a;
  border-radius: 8px;
  font-size: 18px;
  font-weight: 600;
  text-transform: uppercase;
  text-wrap: nowrap;
  color: ${({ toggleState }) => (!toggleState ? "white" : "#383839")};
  @media screen and (max-width: 960px) {
    border-radius: 8px;
    width: 100%;
    padding: 1rem;
    height: 56px;
    margin-top: 1rem;
  }
`;

export const StyledSectionTwo = styled.div`
  width: 100%;
  margin: 3rem auto;
  border-radius: 16px;
  @media screen and (max-width: 960px) {
    width: 100%;
  }
`;

export const StyledSectionThree = styled.div`
  width: 70%;
  margin: 3rem auto;
  margin-top: 5rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  @media screen and (max-width: 960px) {
    width: 100%;
    margig: 3rem 0 0 0;
  }
`;

export const WaitingListLabelContainer = styled.div`
  width: 70%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  @media screen and (max-width: 960px) {
    width: 100%;
    text-align: center;
  }
`;

export const ProgressBarContainer = styled.div`
  width: 100%;
  height: 20px;
  background-color: ${({ toggleState }) =>
    !toggleState ? "#DDDDDD" : "#383839"};
  border-radius: 10px;
  margin: 4rem 0 2rem;
`;

export const Progress = styled.div`
  height: 100%;
  border-radius: 10px;
  background-color: #c6a15a;
  width: ${(props) =>
    props.progress}%; /* Dynamically adjust width based on progress */
`;

export const CompareContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin-top: 1rem;
  @media screen and (max-width: 960px) {
    display: block;
  }
`;

export const CompareSubContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 40%;
  border-radius: 40px;
  padding: 40px;
  border: ${({ toggleState }) => !toggleState && "solid 1px #ddd"};
  background-color: ${({ toggleState }) => !toggleState && "white"};
  @media screen and (max-width: 960px) {
    width: 100%;
    padding: 20px 10px 20px 10px;
    margin-top: 20px;
    border-radius: 16px;
  }
`;

export const CompareHeader = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  align-items: center;
  border-radius: 0.75rem 0.75rem 0rem 0rem;
  border-bottom: 1px solid #fff;
  padding-bottom: 0.3rem;
`;

export const CompareLeftHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const CompareRightHeader = styled.div`
  display: flex;
  flex-direction: column;
  text-align: left;
  color: ${({ toggleState }) => (!toggleState ? "black" : "white")};
`;

export const AdvanceContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 3rem;
  background: ${({ toggleState }) => (!toggleState ? "white" : "#383839")};
  border-radius: 1rem;
  margin-top: 5rem;
  margin-bottom: 5rem;
  @media screen and (max-width: 960px) {
    flex-direction: column;
    padding: 0 24px 24px 24px;
    margin: 1rem 0 3rem 0;
  }
`;

export const AdvanceBtn = styled.button`
  padding: 20px;
  background: #c6a15a;
  border-radius: 8px;
  font-size: 18px;
  font-weight: 600;
  line-height: normal;
  text-transform: uppercase;
  text-wrap: nowrap;
  color: ${({ toggleState }) => (!toggleState ? "white" : "#222224")};
`;

export const StyledSectionFour = styled.div`
  width: 100%;
  margin: 3rem auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  @media screen and (max-width: 960px) {
    flex-direction: column;
  }
`;

export const MatchRightContainer = styled.div`
  border-radius: 1rem;
  border: 1px solid #fff;
  padding: 3.75rem;
`;

export const GenderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  alight-items: center;
`;

export const WomenIcon = styled.img`
  width: 32px;
  height: 32px;
  margin-right: 1rem;
`;

export const MenIcon = styled.img`
  width: 26px;
  height: 26px;
  margin-right: 1rem;
`;

export const StyledSectionFive = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 5rem auto;
  @media screen and (max-width: 960px) {
    flex-direction: column;
  }
`;

export const SubscriptionBlock = styled.div`
  display: block;
  @media screen and (max-width: 960px) {
    flex-direction: column;
  }
`;

export const StyledSectionSix = styled.div`
  margin: 3rem auto;
`;

export const FAQHeader = styled.div`
  display: block;
  justify-content: center;
  text-align: center;
  margin-bottom: 3rem;
`;

export const SectionIcons = styled.img`
  width: 56px;
  height: 56px;
`;
