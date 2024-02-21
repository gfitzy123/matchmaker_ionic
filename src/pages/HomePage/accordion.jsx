import React, { useState } from "react";
import styled from "styled-components";
// import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import Plus from "../../assets/images/plus.svg";
import lightPlus from "../../assets/images/lightPlus.svg";
import Minus from "../../assets/images/minus.svg";
import lightMinus from "../../assets/images/lightMinus.svg";

const AccordionContainer = styled.div`
  border: ${({ toggleState }) =>
    toggleState
      ? "solid 1px rgba(255, 255, 255, 0.2)"
      : "solid 1px rgba(34, 34, 36, 0.2)"};
  border-left: none;
  border-right: none;
  color: white;
`;

const AccordionHeader = styled.div`
  padding: 30px 10px 30px 10px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;
`;

const AccordionContent = styled.div`
  width: 100%;
  text-align: left;
  margin-right: 3rem;
  @media screen and (max-width: 960px) {
    margin: 0px;
    max-width: 100%;
    padding: 0px;
    text-align: left;
  }
`;

const AccordionContentSub = styled.div`
  padding: 10px;
  color: ${({ toggleState }) =>
    toggleState ? "rgba(255, 255, 255, 0.6)" : "#222224"};
  @media screen and (max-width: 960px) {
    color: rgba(255, 255, 255, 0.6);
  }
`;
const AccordionContentHead = styled.div`
  padding: 10px;
  color: ${({ toggleState }) => (toggleState ? "white" : "#222224")};
  font-size: 18px;
`;

const ExpandIcon = styled.img`
  width: 48px;
  height: 48px;
`;

const AccordionNumber = styled.span`
  color: #c6a15a;
  margin-right: 3rem;
  @media screen and (max-width: 960px) {
    margin-right: 1rem;
    line-height: 21px;
    padding: 0px;
  }
`;
const Accordion = ({ title, children, index, toggleState }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleAccordion = () => {
    setIsOpen(!isOpen);
  };

  return (
    <AccordionContainer toggleState={toggleState}>
      <AccordionHeader onClick={toggleAccordion}>
        <AccordionNumber>{index + 1}</AccordionNumber>
        <AccordionContent>
          <AccordionContentHead toggleState={toggleState}>
            {title}
          </AccordionContentHead>
          {isOpen && (
            <AccordionContentSub toggleState={toggleState}>
              {children}
            </AccordionContentSub>
          )}
        </AccordionContent>
        {isOpen ? (
          <ExpandIcon src={toggleState ? Minus : lightMinus} alt="minus" />
        ) : (
          <ExpandIcon src={toggleState ? Plus : lightPlus} alt="plus" />
        )}
      </AccordionHeader>
    </AccordionContainer>
  );
};

export default Accordion;
