import { useState, useEffect } from "react";
import {
  IonToolbar,
  IonButton,
  IonButtons,
  IonIcon,
  IonMenu,
  IonContent,
  IonMenuButton,
  IonPage,
  IonText,
} from "@ionic/react";
import { close } from "ionicons/icons";
import WaitingList from "./waiting-list";
import Form from "./form";
import Cards from "./cards";
import Accordions from "./accordions";
import Footer from "./footer";
import VideoThumbnail from "../common/videoThumbnail";
import Input from "react-phone-number-input/input";

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
            <div className="border w-full border-primary py-4 px-8 text-base rounded-lg text-center leading-4 lg:block">
              Get Matched
            </div>
            <IonButton className="text-base" fill="clear">
              About
            </IonButton>
            <IonButton className="text-base" fill="clear">
              How it works
            </IonButton>
            <IonButton className="text-base" fill="clear">
              FAQ
            </IonButton>
            <div className="w-full divider border-b-2 h-1 mt-2 mb-2" />
            <IonButton className="text-sm" fill="clear">
              Facebook
            </IonButton>
            <IonButton className="text-sm" fill="clear">
              Instagram
            </IonButton>
            <IonButton className="text-sm" fill="clear">
              X(Twitter)
            </IonButton>
            <IonButton className="text-sm" fill="clear">
              LinkedIn
            </IonButton>
          </IonButtons>
          <IonButtons className="flex text-base justify-center gap-1 p-10">
            <span>Dark</span>
            <label className="flex cursor-pointer select-none items-center">
              <div className="relative">
                <input
                  type="checkbox"
                  checked={theme === "light"}
                  onChange={toggleTheme}
                  className="sr-only"
                />
                <div
                  className={`box block h-8 w-14 rounded-full bg-secondary`}
                ></div>
                <div
                  className={`absolute left-1 top-1 flex h-6 w-6 items-center justify-center rounded-full bg-gradient-to-r from-toggleOne to-toggleTwo transition
             ${theme === "light" ? "translate-x-full" : ""}`}
                ></div>
              </div>
            </label>
            <span>Light</span>
          </IonButtons>
        </IonContent>
      </IonMenu>
      <IonPage id="main-content">
        <div className="flex justify-center">
          <IonToolbar className="mt-8 py-2 max-w-[1280px]">
            <IonButtons slot="start" className="hidden lg:block">
              <IonButton fill="clear">About</IonButton>
              <IonButton fill="clear">How it works</IonButton>
              <IonButton fill="clear">FAQ</IonButton>
            </IonButtons>
            <div className="flex justify-center items-center">
              <svg
                width="322"
                height="26"
                viewBox="0 0 322 26"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M115.683 7.37595C117.035 7.347 118.374 7.63826 119.593 8.22593C120.723 8.79896 121.649 9.70567 122.246 10.8231C122.922 12.1821 123.247 13.6886 123.191 15.2052V25.8206H120.716V15.4319C120.775 14.6453 120.677 13.8549 120.429 13.1061C120.181 12.3573 119.788 11.6649 119.271 11.0687C118.733 10.5588 118.096 10.1657 117.398 9.91377C116.701 9.66188 115.96 9.55669 115.22 9.60479C114.042 9.57767 112.876 9.84722 111.829 10.3887C110.873 10.8997 110.095 11.6905 109.601 12.6553C109.053 13.7603 108.783 14.9827 108.817 16.2158V25.8206H106.342V0H108.817V10.7069C109.404 9.79609 110.206 9.0367 111.159 8.49982C112.538 7.72503 114.101 7.33677 115.683 7.37595ZM0 1.4639V25.8206H2.47439V6.45101L12.0414 22.7229H13.2219L22.8267 6.34138V25.8206H25.3011V1.4639H23.1762L12.682 19.5412L2.12495 1.4639H0ZM39.3826 25.3201C40.5075 25.7976 41.7214 26.0294 42.9431 26C44.4524 26.0528 45.9458 25.6762 47.2496 24.914C48.0737 24.4187 48.7567 23.7285 49.2424 22.9103V25.8206L51.5656 25.7639V14.4308C51.5971 12.0383 50.9675 10.2565 49.6768 9.08541C48.1395 7.82685 46.1817 7.19899 44.1991 7.32878C42.8044 7.32483 41.4179 7.54158 40.0909 7.97099C38.8687 8.36017 37.7333 8.98235 36.7476 9.80317L37.8621 11.692C38.6659 11.0084 39.5876 10.4772 40.582 10.1243C41.6629 9.73312 42.8041 9.53492 43.9536 9.53873C45.3604 9.43339 46.7528 9.8806 47.8352 10.7854C48.2903 11.2599 48.6413 11.8242 48.8657 12.4422C49.0901 13.0602 49.183 13.7182 49.1385 14.3742V15.4697H43.3303C41.9077 15.4126 40.489 15.6538 39.1654 16.178C38.2486 16.5639 37.4734 17.2236 36.946 18.0669C36.4905 18.856 36.2557 19.753 36.266 20.664C36.2474 21.6464 36.5273 22.6113 37.0687 23.4312C37.6409 24.2715 38.4447 24.9277 39.3826 25.3201ZM49.1385 17.3586H43.4436C41.6775 17.3586 40.4592 17.6702 39.7698 18.303C39.4326 18.6159 39.1673 18.9981 38.992 19.4234C38.8168 19.8486 38.7358 20.3068 38.7546 20.7664C38.7735 21.226 38.8917 21.676 39.1012 22.0855C39.3107 22.495 39.6065 22.8542 39.9681 23.1384C40.9688 23.8217 42.1679 24.1538 43.3775 24.0829C44.6426 24.119 45.8915 23.7912 46.9757 23.1384C47.9775 22.4607 48.7277 21.4715 49.1101 20.3241L49.1385 20.411V17.3586ZM60.5566 9.60477V7.55537H63.8243V3.51323H66.2987V7.55537H71.8897V9.60477H66.2987V20.5129C66.2434 21.4111 66.534 22.2965 67.1109 22.9873C67.4207 23.288 67.7899 23.5206 68.1949 23.6702C68.5998 23.8198 69.0316 23.8832 69.4625 23.8561C70.4556 23.894 71.4266 23.5569 72.1824 22.9117L73.0513 24.6872C72.5397 25.1235 71.9408 25.4455 71.2947 25.6316C70.6148 25.8579 69.905 25.982 69.1886 26C68.4673 26.0479 67.7437 25.9486 67.0618 25.7084C66.38 25.4681 65.754 25.0918 65.222 24.6022C64.735 24.0763 64.3599 23.4568 64.1196 22.7814C63.8793 22.106 63.7789 21.3888 63.8243 20.6734V9.60477H60.5566ZM84.6865 24.8006C86.1746 25.6109 87.8465 26.024 89.5408 26C91.0135 26.0411 92.4754 25.7371 93.8096 25.1123C95.0402 24.5201 96.0709 23.5813 96.7751 22.4112L94.8863 21.1646C94.3041 22.0354 93.4984 22.7335 92.5535 23.1856C91.5212 23.6571 90.3933 23.8821 89.2591 23.8428C88.1249 23.8034 87.0153 23.5009 86.0181 22.959C84.9791 22.372 84.1228 21.5091 83.5437 20.4657C82.9042 19.3106 82.5786 18.0081 82.5993 16.688C82.5786 15.3679 82.9042 14.0654 83.5437 12.9103C84.1206 11.8677 84.9777 11.0073 86.0181 10.4265C87.0153 9.8846 88.1249 9.58204 89.2591 9.5427C90.3933 9.50336 91.5212 9.72833 92.5535 10.1998C93.4908 10.6714 94.2788 11.394 94.8296 12.287L96.7184 11.0309C96.0201 9.85377 94.988 8.91043 93.7529 8.32041C92.4395 7.68787 90.9986 7.36479 89.5408 7.37599C87.8486 7.35045 86.1779 7.75676 84.6865 8.55652C83.2891 9.32027 82.1292 10.4541 81.3338 11.8337C80.5018 13.3072 80.081 14.9773 80.1155 16.6691C80.0844 18.3546 80.5051 20.0177 81.3338 21.4857C82.1276 22.8762 83.2871 24.0226 84.6865 24.8006ZM161.676 8.22593C160.469 7.6361 159.138 7.34461 157.794 7.37595C156.072 7.32883 154.375 7.80641 152.931 8.74537C151.961 9.37803 151.165 10.2328 150.603 11.2314C150.172 10.2385 149.487 9.36575 148.605 8.70759C147.264 7.79096 145.667 7.32158 144.044 7.36651C142.5 7.32705 140.975 7.71956 139.642 8.49981C138.682 9.07636 137.887 9.88506 137.329 10.8457V7.55539H134.958V25.8206H137.423V16.2158C137.387 14.9866 137.642 13.7664 138.169 12.6553C138.637 11.6996 139.385 10.9091 140.313 10.3887C141.306 9.85017 142.423 9.58 143.552 9.60479C144.266 9.5602 144.981 9.66764 145.65 9.91999C146.319 10.1723 146.927 10.5639 147.434 11.0686C148.449 12.2862 148.95 13.8511 148.832 15.4319V25.8206H151.297V16.2158C151.263 14.9859 151.522 13.7656 152.052 12.6553C152.516 11.6892 153.269 10.8907 154.205 10.3698C155.204 9.82808 156.328 9.5578 157.464 9.5859C158.179 9.5413 158.896 9.65057 159.565 9.90635C160.235 10.1621 160.842 10.5585 161.345 11.0686C162.342 12.2947 162.832 13.8559 162.715 15.4319V25.8206H165.189V15.2052C165.236 13.6894 164.911 12.1852 164.245 10.8231C163.677 9.71278 162.78 8.80549 161.676 8.22593ZM182.123 26C180.898 26.0284 179.681 25.7966 178.553 25.32C177.615 24.9277 176.811 24.2715 176.239 23.4312C175.698 22.6113 175.418 21.6464 175.436 20.664C175.426 19.753 175.661 18.8559 176.116 18.0668C176.648 17.2233 177.426 16.5638 178.345 16.178C179.665 15.6529 181.081 15.4116 182.501 15.4697H188.318V14.3741C188.361 13.7175 188.267 13.059 188.041 12.441C187.815 11.823 187.462 11.259 187.005 10.7853C185.926 9.88203 184.537 9.43485 183.133 9.5387C181.981 9.53398 180.836 9.73218 179.752 10.1242C178.759 10.4745 177.84 11.0061 177.042 11.692L175.927 9.80314C176.91 8.98239 178.042 8.36015 179.261 7.97095C180.588 7.54154 181.975 7.32479 183.369 7.32874C185.37 7.20716 187.342 7.85215 188.885 9.1326C190.144 10.3037 190.774 12.0855 190.774 14.478V25.8111L188.422 25.8206V22.9964C187.935 23.7965 187.259 24.4722 186.448 24.9611C185.135 25.7134 183.634 26.0739 182.123 26ZM182.576 17.3585H188.318V20.3712C187.901 21.5087 187.125 22.4798 186.108 23.1384C185.021 23.7929 183.769 24.1208 182.501 24.0828C181.291 24.1538 180.092 23.8216 179.091 23.1384C178.729 22.8544 178.432 22.495 178.223 22.0851C178.013 21.6751 177.895 21.2245 177.877 20.7644C177.859 20.3043 177.942 19.8459 178.119 19.4208C178.296 18.9958 178.563 18.6143 178.902 18.303C179.582 17.6702 180.81 17.3585 182.576 17.3585ZM202.579 0V25.8206H205.053V20.6169L209.365 16.6202L216.745 25.8206L219.777 25.8394L211.198 15.0212L219.012 7.55539H215.98L205.053 17.5212V0H202.579ZM239.563 23.1951C240.51 22.8012 241.349 22.1859 242.009 21.4007L243.407 23.0062C242.591 23.9832 241.551 24.7479 240.375 25.2351C239.109 25.7572 237.75 26.0174 236.38 26C234.641 26.0249 232.923 25.6124 231.384 24.8006C229.958 24.0349 228.776 22.8827 227.975 21.4763C227.15 20.01 226.73 18.3511 226.756 16.6691C226.728 14.997 227.128 13.3454 227.918 11.8715C228.662 10.4882 229.777 9.34007 231.139 8.55653C232.562 7.75767 234.172 7.35033 235.804 7.376C237.337 7.36374 238.848 7.75107 240.186 8.49986C241.487 9.23624 242.569 10.3053 243.322 11.5976C244.128 12.9682 244.57 14.5222 244.606 16.1119L229.495 19.0396C229.912 20.458 230.802 21.6911 232.017 22.534C233.302 23.4042 234.828 23.8501 236.38 23.809C237.472 23.8229 238.555 23.614 239.563 23.1951ZM232.328 10.3887C231.323 10.9759 230.501 11.833 229.958 12.8631C229.375 13.9849 229.083 15.2351 229.108 16.4991C229.089 16.7538 229.089 17.0095 229.108 17.2641L242.018 14.752C241.774 13.2829 241.022 11.9461 239.893 10.9743C238.736 9.97608 237.247 9.44714 235.719 9.49151C234.529 9.47987 233.357 9.78985 232.328 10.3887ZM254.683 7.55537V25.8205H257.138V16.4991C257.016 14.6851 257.602 12.8943 258.772 11.5031C259.364 10.9121 260.076 10.4547 260.86 10.1615C261.643 9.86827 262.48 9.74608 263.315 9.8031C263.406 9.79375 263.498 9.79375 263.589 9.8031H263.872V7.40426C262.301 7.35015 260.746 7.72915 259.377 8.49979C258.36 9.11741 257.551 10.0176 257.044 11.0842V7.55537H254.683ZM284.546 25.8206L295.68 1.4639H298.221L309.356 25.8206H306.645L296.95 4.16669L287.218 25.8206H284.546ZM318.469 1.4639V25.8206H321.048V1.4639H318.469Z"
                  fill="url(#paint0_linear_408_236)"
                />
                <defs>
                  <linearGradient
                    id="paint0_linear_408_236"
                    x1="-8.97203"
                    y1="13.222"
                    x2="331.965"
                    y2="13.222"
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop stop-color="var(--ion-text-color)" />
                    <stop offset="1" stop-color="var(--ion-color-primary)" />
                  </linearGradient>
                </defs>
              </svg>
            </div>
            <IonButtons className="gap-2 text-sm hidden lg:flex" slot="primary">
              <span>Dark</span>
              <label className="flex cursor-pointer select-none items-center">
                <div className="relative">
                  <input
                    type="checkbox"
                    checked={theme === "light"}
                    onChange={toggleTheme}
                    className="sr-only"
                  />
                  <div
                    className={`box block h-8 w-14 rounded-full bg-secondary`}
                  ></div>
                  <div
                    className={`absolute left-1 top-1 flex h-6 w-6 items-center justify-center rounded-full bg-gradient-to-r from-toggleOne to-toggleTwo transition
             ${theme === "light" ? "translate-x-full" : ""}`}
                  ></div>
                </div>
              </label>
              <span>Light</span>
              <div className="border border-primary py-4 px-8 text-base rounded-lg hidden leading-4 lg:block">
                Get Matched
              </div>
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
                  <div className="flex bg-secondaryBtn justify-between h-20 text-lg items-center p-2 rounded-lg">
                    <div className="flex justify-start gap-2 p-4">
                    {"+1 "} <Input
                      className="bg-secondaryBtn w-full border-none focus:outline-none"
                      country="US"
                      international
                      placeholder="201-555-5555"
                      onChange={() => {}}
                    />
                    </div>
                    <button className="hidden lg:block bg-primary text-primaryBtn rounded-lg py-5 px-10 min-w-[287px]">
                      {" "}
                      APPLY FOR MEMBERSHIP
                    </button>
                  </div>
                  <button className="mt-6 bg-primary w-full lg:hidden text-base py-4 px-10 rounded-lg">
                    APPLY FOR MEMBERSHIP
                  </button>
                </div>
              </div>
              <VideoThumbnail videoId={"LXb3EKWsInQ"} />
              <WaitingList />
              <Form />
              <Cards />
              <Accordions />
              <div className="flex flex-col lg:flex-row justify-between items-center bg-secondaryBtn rounded-2xl gap-10 p-10 w-full max-w-[1280px]">
                <div className="flex flex-col gap-2 justify-center text-left">
                  <h1 className="text-5xl">Find Your Perfect Match Today!</h1>
                  <p className="text-base">
                    Join Matchmaking AI and discover meaningful connections
                    tailored to you.
                  </p>
                </div>
                <button className="bg-primary text-primaryBtn py-7 leading-5 px-10 w-full text-lg rounded-lg lg:w-[282px]">
                  ADVANCE POSITION
                </button>
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
