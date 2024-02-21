import React, { useState } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";

export default ({ checked = false, color = "#6ab04c" }) => {
  const dispatch = useDispatch();
  const [toggle, setToggle] = useState(checked);
  return (
    <Container>
      <Label color={toggle ? "#FFFFFF80" : "#222224"}>LIGHT</Label>
      <Switch>
        <Input {...{ color }} type="checkbox" defaultChecked={toggle} />
        <Slider
          {...{ toggle, color }}
          onClick={() => {
            setToggle(!toggle);
            console.log({ toggle });
            dispatch({
              type: "Toggle",
              toggle: !toggle,
            });
          }}
        />
      </Switch>
      <Label toggle={toggle} color={toggle ? "#FFFFFF80" : "#222224"}>DARK</Label>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  align-items: center;
  z-index: 999;
`;

const Slider = styled.span`
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: ${({ toggle, color }) => (toggle ? color : "#383839")};
  border-radius: 15px;
  transition: 0.4s;
  background-image: ${({ toggle, color }) =>
    toggle ? "linear-gradient(to bottom, #4B4B4B 0%, #757575 100%)" : "white"};

  &:before {
    content: "";

    position: absolute;
    left: 2px;
    bottom: 2px;

    width: 20px;
    height: 20px;
    border-radius: 100%;

    background-color: ${({ toggle, color }) => (toggle ? "#383839" : "white")};

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
  background-color: #383839;

  & ${Input} {
    opacity: 0;
    width: 0;
    height: 0;
  }
`;

const Label = styled.label`
  color: ${({ color }) => color ?? color};
`;
