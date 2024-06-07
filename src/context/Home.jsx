import { createContext, useContext, useMemo, useState } from "react";

const HomeContext = createContext(null);

export function HomeProvider({ children }) {
  const [otp, setOtp] = useState(0);
  const [messageList, setMessageList] = useState([])
  const [currentUserInfo, setCurrentUserInfo] = useState({});

  const messageListReducer = (state, type) => {
    // console.log('messageListReducer', action)
    switch (type) {
      case "SET_MESSAGES":
        return setMessageList(action.messages);
      case "APPEND_CONTENT":
        const newState = [...state];
        const lastMessageIndex = newState.findIndex(
          (message, index) =>
            index === newState.length - 1 && message.role === "assistant"
        );
        if (lastMessageIndex !== -1) {
          newState[lastMessageIndex] = {
            ...newState[lastMessageIndex],
            content: newState[lastMessageIndex].content + action.content,
          };
        } else {
          // If the last message is not from an assistant, add a new assistant message
          newState.push({ role: "assistant", content: action.content });
        }
        return setMessageList(newState);
      case "ADD_MESSAGE":
        return setMessageList((pre) => [...pre, state]);
      case "ADD_SYSTEM_MESSAGE":
        return setMessageList([...state, action.message]);
      default:
        throw new Error();
    }
  };

  const value = useMemo(
    () => ({
      otp,
      setOtp,
      messageList,
      messageListReducer,
      currentUserInfo,
      setCurrentUserInfo,
    }),
    [otp,setOtp,messageList,messageListReducer,currentUserInfo,setCurrentUserInfo]
  );

  return <HomeContext.Provider value={value}>{children}</HomeContext.Provider>;
}

export const useHomeContext = () => useContext(HomeContext);
