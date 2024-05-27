import {
  IonButton,
  IonCol,
  IonContent,
  IonGrid,
  IonIcon,
  IonItem,
  IonLabel,
  IonPage,
  IonRow,
  IonText,
  useIonRouter
} from '@ionic/react';
import NavBar from '../components/common/NavBar';
import Profile from './UploadPhoto';

function Welcome() {
  const router = useIonRouter();
  const handleChat = () => {
    router.push('/chat');
  };
  return (
   <>
    <IonPage>
      <NavBar />
      <IonContent>
        <IonGrid className="flex flex-col items-center bg-black text-white h-full justify-between">
          <IonRow className="ion-justify-content-center ion-align-items-center">
            <div className="flex flex-col items-center gap-5 ">
              <div className="flex flex-col items-center mt-[35px]">
                <IonLabel className="text-4xl max-w-xs w-full ">
                  <h1 className="barlow-semibold text-lg">Welcome to the MatchMaker AI!</h1>
                </IonLabel>
              </div>

              <div className="flex flex-col items-center gap-[10px] max-w-xs pr-4 pl-1">
                <IonText
                  className=" text-start "
                >
                  <IonLabel>Welcome to your personal assistant in finding the perfect partner!</IonLabel>
                </IonText>     <IonText
                  className=" text-start"
                >
                  <IonLabel>Here you can find your ideal match thanks to advanced artificial intelligence that helps you understand your preferences and find a suitable match.</IonLabel>
                </IonText>     <IonText
                  className=" text-start"
                >
                  <IonLabel>Just tell us about your preferences, and we'll play cupid, searching for potential matches among our users. Let Matchmaker AI help you find love and make your partner search an unforgettable adventure!</IonLabel>
                </IonText>


              </div>
            </div>
          </IonRow>
          <IonRow className="w-full max-w-xs mx-auto ">
            <IonCol>
              <IonButton
                className="mt-8 bg-secondary w-full"
                onClick={handleChat}
              >
                START
              </IonButton>
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
   </>
  )
}

export default Welcome
