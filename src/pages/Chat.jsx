import { IonPage } from "@ionic/react";
import NavBar from "../components/common/NavBar";
import ChatInner from "../components/Chat/Chat";

const Chat = () => {
  return (
<IonPage>
<NavBar vertical />
<ChatInner/>
</IonPage>  
)
};

export default Chat;
