import React, { useState } from "react";
import styled from "styled-components";

export default ({ checked = false, color = "#6ab04c" }) => {
    const [toggle, setToggle] = useState(checked);

    return (
        <Container>
            <Label light>LIGHT</Label>
            <Switch>
                <Input {...{ color }} type="checkbox" defaultChecked={toggle} />
                <Slider {...{ toggle, color }} onClick={() => setToggle(!toggle)} />
            </Switch>
            <Label>DARK</Label>
        </Container>
    );
};

const Container = styled.div`
    display: flex;
    align-items: center;
`

const Slider = styled.span`
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: ${({ toggle, color }) => (toggle ? color : "white")};
  border-radius: 15px;
  transition: 0.4s;

  &:before {
    content: "";

    position: absolute;
    left: 2px;
    bottom: 2px;

    width: 20px;
    height: 20px;
    border-radius: 100%;

    background-color: ${({ toggle, color }) => (toggle ? "white" : color)};

    transition: 0.4s;
  }
`;

const Input = styled.input`
  &:checked + ${Slider}:before {
    transform: translateX(23.4px);
  }
`;

const Switch = styled.label`
  position: relative;
  display: inline-block;
  width: 48px;
  height: 24px;
  margin: 0.5rem;
  border-radius: 15px;
  transition: 0.4s;

  & ${Input} {
    opacity: 0;
    width: 0;
    height: 0;
  }
`;

const Label = styled.label`
  color: ${({ light }) => (light ? 'rgba(255, 255, 255, 0.60)' : '#FFF')};
`;