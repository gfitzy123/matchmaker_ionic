import {
  IonHeader,
  IonToolbar,
  IonImg,
  IonButton,
  IonToggle,
  IonButtons,
  IonIcon,
  IonMenu,
  IonContent,
  IonMenuButton,
  IonPage,
  IonText,
  IonInput,
  IonProgressBar,
} from "@ionic/react";
import { close } from "ionicons/icons";

const Welcome = () => {
  return (
    <>
          <IonMenu side="end" contentId="main-content">
          <IonToolbar>
            <IonButtons slot="end">
              <ion-menu-toggle>
                <IonIcon size="large" icon={close} />
              </ion-menu-toggle>
            </IonButtons>
          </IonToolbar>
        <IonContent className="ion-padding flex flex-col justify-center items-center">
          <IonButtons className="flex flex-col gap-5">
            <IonButton className="w-full" fill="outline">Get Matched</IonButton>
            <IonButton fill="clear">About</IonButton>
            <IonButton fill="clear">How it works</IonButton>
            <IonButton fill="clear">FAQ</IonButton>
            <div className="w-full divider border-b-2 h-1 mt-2 mb-2" />
            <IonButton fill="clear">Facebook</IonButton>
            <IonButton fill="clear">Instagram</IonButton>
            <IonButton fill="clear">X(Twitter)</IonButton>
            <IonButton fill="clear">LinkedIn</IonButton>
          </IonButtons>
          <IonButtons className="flex justify-center gap-1 p-10">
            <span>Dark</span>
            <IonToggle />
            <span>Light</span>
          </IonButtons>
        </IonContent>
      </IonMenu>
      <IonPage id="main-content">
        <IonHeader>
          <IonToolbar>
            <IonButtons slot="start" className="hidden lg:block">
              <IonButton fill="clear">About</IonButton>
              <IonButton fill="clear">How it works</IonButton>
              <IonButton fill="clear">FAQ</IonButton>
            </IonButtons>
            <div className="flex justify-center items-center">
              <IonImg className="w-96" src="logo.svg" alt="Logo" />
            </div>
            <IonButtons className="gap-2 hidden lg:flex" slot="primary">
              <span>Dark</span>
              <IonToggle />
              <span>Light</span>
              <IonButton fill="outline" className="outline-primary hidden lg:block">
                Get Matched
              </IonButton>
            </IonButtons>
            <IonButtons slot="end" className=" lg:hidden">
              <IonMenuButton></IonMenuButton>
            </IonButtons>
          </IonToolbar>
        </IonHeader>
        <IonContent className="ion-padding ">
<div className="flex flex-col items-center justify-center gap-10">
<div className="flex flex-col items-center justify-center max-w-[600px] gap-10">
    <IonText className="text-center text-wrap">
      <h1 className="text-5xl">Love sparked <br/> by an instant Connection</h1>
      <p>Discover meaningful connection and ignite love through our expert matching</p>
      </IonText>
  <div className="w-full flex flex-col gap-1"> 
  <span>Phone</span>
      <IonInput type="tel" fill="outline" placeholder="888 8888 888">
      <IonButton slot="end" className="bg-primary hidden lg:block">
        APPLY FOR MEMBERSHIP
        </IonButton>
      </IonInput>
      <IonButton className="m-0 bg-primary w-full lg:hidden">
        APPLY FOR MEMBERSHIP
        </IonButton>
  </div>
    </div>
    <div className="w-full h-64 lg:h-[800px] lg:p-10">
  <iframe className="rounded-2xl" width="100%" height="100%" src="https://www.youtube.com/embed/t1sF-ZZr4WM" title="TRENDING| INSTAGRAM LOFI MASHUP| SLOWED+REVERBED | MIND FRESH LOFI SONG | LOFI SONGS #hindi(Part-18)" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
  </div>
  <div className="flex flex-col items-center justify-center max-w-[600px]">
    <IonText className="text-center text-wrap flex flex-col gap-3">
    <h2 className="text-2xl text-primary">Waiting List</h2>
      <h1 className="text-3xl">Exclusive Matchmaking Awaits!</h1>
      <p className="text-justify">join our waiting list for exclusive access to personalized matchmaking services. be among the first to compatible signals and embark on a journey to find your perfect match. Dont miss out-signup now and start your romantic adventure!</p>
      </IonText>
      </div>
      <div className="w-full pl-5 pr-5 flex flex-col justify-center items-center gap-5">
      <IonProgressBar className="h-3 rounded-3xl" value={150/500}></IonProgressBar>
      <h1 className="text-4xl font-bold text-primary">150 / 500</h1>
      </div>
</div>
    </IonContent>
      </IonPage>
    </>
  );
};

export default Welcome;
