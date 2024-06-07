import { IonPage, IonContent } from "@ionic/react";
import NavBar from "../components/common/NavBar";
import ChatInner from "../components/Chat/Chat";



const Chat = () => {
  return (
<IonPage>
<NavBar vertical />
<IonContent>
<ChatInner/>
</IonContent>
</IonPage>  
)
};

export default Chat;
