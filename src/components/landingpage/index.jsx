import { useState, useEffect } from "react";
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
} from "@ionic/react";
import { close } from "ionicons/icons";
import WaitingList from "./waiting-list";
import Form from "./form";
import Cards from "./cards";
import Accordions from "./accordions";
import Footer from "./footer";
import VideoThumbnail from "../common/videoThumbnail";

const Welcome = () => {
  const [theme, setTheme] = useState("light");

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    localStorage.setItem("theme", newTheme);
    console.log({ newTheme });
    handleTheme(newTheme);
  };

  const handleTheme = (value) => {
    setTheme(value);
    document.querySelector("html")?.setAttribute("data-theme", value);
  };

  useEffect(() => {
    const currentTheme = localStorage.getItem("theme") || "dark";
    handleTheme(currentTheme);
  }, []);

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
            <IonButton className="w-full" fill="outline">
              Get Matched
            </IonButton>
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
            <IonToggle checked={theme === "light"} onClick={toggleTheme} />
            <span>Light</span>
          </IonButtons>
        </IonContent>
      </IonMenu>
      <IonPage id="main-content">
        <div className="flex justify-center"> 
          <IonToolbar className="max-w-[1280px]">
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
              <IonToggle checked={theme === "light"} onClick={toggleTheme} />
              <span>Light</span>
              <IonButton
                fill="outline"
                className="outline-primary hidden lg:block"
              >
                Get Matched
              </IonButton>
            </IonButtons>
            <IonButtons slot="end" className=" lg:hidden">
              <IonMenuButton></IonMenuButton>
            </IonButtons>
          </IonToolbar>
        </div>
        <IonContent className="ion-padding ">
     <div className="flex justify-center mt-10">
     <div className="flex flex-col items-center justify-center gap-20 w-full max-w-[1280px]">
            <div className="flex flex-col items-center justify-center max-w-[739px] gap-10">
              <IonText className="text-center text-wrap">
                <h1 className="text-6xl">
                  Love sparked <br /> by an instant Connection
                </h1>
                <p className="text-lg">
                  Discover meaningful connection and ignite love through our
                  expert matching
                </p>
              </IonText>
              <div className="w-full flex flex-col gap-1">
                <span className="text-base">Phone number</span>
                <IonInput className="h-20 text-lg" type="tel" fill="outline" placeholder="888 8888 888">
                  <IonButton slot="end" className="h-[60px] bg-primary hidden lg:block">
                    APPLY FOR MEMBERSHIP
                  </IonButton>
                </IonInput>
                <IonButton className="m-0 bg-primary w-full lg:hidden">
                  APPLY FOR MEMBERSHIP
                </IonButton>
              </div>
            </div>
            <VideoThumbnail videoId={"LXb3EKWsInQ"}/>
            {/* <div className="w-full h-64 lg:h-[800px] lg:p-10">
              <iframe
                className="rounded-2xl"
                width="100%"
                height="100%"
                src="https://www.youtube.com/embed/LXb3EKWsInQ"
                title="TRENDING| INSTAGRAM LOFI MASHUP| SLOWED+REVERBED | MIND FRESH LOFI SONG | LOFI SONGS #hindi(Part-18)"
                frameborder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerpolicy="strict-origin-when-cross-origin"
                allowfullscreen
              ></iframe>
            </div> */}
            <WaitingList />
            <Form />
            <Cards />
            <Accordions />
            <div className="flex flex-col lg:flex-row justify-between items-center bg-secondary rounded-2xl border gap-10 p-10 w-full max-w-[1280px]">
              <div className="flex flex-col gap-2 justify-center items-center">
                <h1 className="text-4xl">Find Your Perfect Match Today!</h1>
                <p>
                  Join Matchmaking AI and discover meaningful connections
                  tailored to you.
                </p>
              </div>
              <IonButton className="w-full lg:w-[282px]">
                ADVANCE POSITION
              </IonButton>
            </div>
            <Footer />
          </div>
     </div>
        </IonContent>
      </IonPage>
    </>
  );
};

export default Welcome;
