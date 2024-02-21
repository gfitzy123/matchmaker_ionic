import React, { useState } from "react";
import styled from "styled-components";
import { MuiTelInput, matchIsValidTel } from "mui-tel-input";
import Input from "@mui/material/Input";
import TextField from "@mui/material/TextField";

const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
  width: 70%;
  border-radius: 16px;
  padding: 60px;
  border: solid 1px white;
  margin-left: 40px;
  background: ${({ toggleState }) => !toggleState && "white"};
  @media screen and (max-width: 960px) {
    width: 100%;
    margin: 2rem 0 0 0;
    padding: 24px 16px 24px 16px;
  }
`;

const RaddioButtonInput = styled.input`
  color: #c6a15a;

  appearance: none;
  width: 16px;
  height: 16px;
  border: 2px solid #c6a15a;
  border-radius: 50%;
  outline: none;
  margin-right: 5px;
  position: relative;
  cursor: pointer;

  &:checked::after {
    content: "";
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background-color: #c6a15a;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
`;
const Button = styled.button`
  padding: 20px;
  background: #c6a15a;
  border-radius: 8px;
  font-size: 18px;
  font-weight: 600;
  line-height: normal;
  text-transform: uppercase;
  text-wrap: nowrap;
  color: ${({ toggleState }) => (!toggleState ? "white" : "#222224")};
  margin-top: 2rem;
`;

const GenderInput = styled.div`
  margin-bottom: 2rem;
  display: flex;
  justify-content: space-between;
  @media screen and (max-width: 960px) {
    flex-direction: column;
  }
`;

const GenderBox = styled.div`
  background-color: ${({ toggleState }) =>
    !toggleState ? "white" : "#383839"};
  border: ${({ toggleState }) => !toggleState && "solid 1px #DDD"};
  border-radius: 8px;
  width: 40%;
  padding: ${({ padding }) => padding ?? padding};
  text-align: center;
  align-items: center;
  display: flex;
  justify-content: center;
  @media screen and (max-width: 960px) {
    width: 100%;
    margin-top: 20px;
  }
`;

const StyledLabel = styled.label`
  color: ${({ color }) => color ?? "#fff"};
  font-size: ${({ fontSize }) => fontSize ?? "16px"};
  font-weight: ${({ fontWeight }) => fontWeight ?? "500"};
  text-align: ${({ textAlign }) => textAlign ?? "left"};
  text-transform: ${({ textAlign }) => textAlign ?? "inherit"};
  padding-top: ${({ paddingTop }) => paddingTop};
`;

const PhoneNumberWrapper = styled.div`
  display: flex;
  background-color: ${({ toggleState }) =>
    !toggleState ? "white" : "#383839"};
  color: ${({ toggleState }) => (!toggleState ? "white" : "#383839")};
  border: ${({ toggleState }) =>
    !toggleState ? "solid 1px #DDDDDD" : "#383839"};
  border-radius: 8px;
  margin-top: 0.5rem;
  height: 3.5rem;
`;

const CustomMuiTelInput = styled(MuiTelInput)`
  fieldset {
    border: none;
  }
`;

const NameInput = styled(Input)`
  & input {
    background: ${({ toggleState }) => (!toggleState ? "white" : "#383839")};
    border: ${({ toggleState }) =>
      !toggleState ? "solid 1px #DDD" : "#383839"};
    color: ${({ toggleState }) => (!toggleState ? "black" : "white")};
    margin-top: 0.5rem;
    padding: 1rem;
    border-radius: 8px;
    &:focus {
      outline: none;
      box-shadow: none;
    }
    &:before {
      border-bottom: 0;
    }
  }
  .MuiInput-underline:before {
    border-bottom: none;
  }
`;

const Form = ({ isMobile, toggleState }) => {
  const [gender, setGender] = useState("female");
  const [phoneNumber, setPhoneNumber] = useState();
  const [name, setName] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submitted Data:", { gender, phoneNumber, name });
  };

  return (
    <FormContainer toggleState={toggleState} onSubmit={handleSubmit}>
      <GenderInput>
        <GenderBox padding="1rem" toggleState={toggleState}>
          <RaddioButtonInput
            type="radio"
            name="gender"
            value="male"
            checked={gender === "male"}
            onChange={(e) => setGender(e.target.value)}
          />
          <StyledLabel color={toggleState ? "white" : "#222224"}>
            Female
          </StyledLabel>
        </GenderBox>
        <GenderBox
          padding={isMobile ? "1rem 2rem 1rem 1rem" : "1rem"}
          toggleState={toggleState}
        >
          <RaddioButtonInput
            type="radio"
            name="gender"
            value="female"
            color="#C6A15A"
            checked={gender === "female"}
            onChange={(e) => setGender(e.target.value)}
          />
          <StyledLabel color={toggleState ? "white" : "#222224"}>
            Male
          </StyledLabel>
        </GenderBox>
      </GenderInput>
      <StyledLabel color={toggleState ? "white" : "#222224"}>
        First name
      </StyledLabel>
      <NameInput
        disableUnderline
        placeholder="Enter your first name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        toggleState={toggleState}
      />
      <StyledLabel color={toggleState ? "white" : "#222224"} paddingTop="2rem">
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
      </PhoneNumberWrapper>
      <Button toggleState={toggleState} type="submit">
        Submit
      </Button>
    </FormContainer>
  );
};

export default Form;
