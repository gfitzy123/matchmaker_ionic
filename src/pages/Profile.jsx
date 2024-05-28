import React, { useEffect, useRef, useState } from "react";
import {
  IonContent,
  IonPage,
  IonLabel,
  IonItem,
  IonAccordion,
  IonAccordionGroup,
  IonRow,
  IonCol,
  IonIcon,
  IonChip,
  IonImg,
  IonButton,
  IonProgressBar,
  useIonRouter,
} from "@ionic/react";
import { caretDown, addCircleOutline, pencilOutline } from "ionicons/icons";
import "tailwindcss/tailwind.css";
import Check from "../../public/assets/Check.svg";
import { Swiper, SwiperSlide } from "swiper/react";
import {
  Autoplay,
  Keyboard,
  Pagination,
  Scrollbar,
  Zoom,
  Navigation,
} from "swiper/modules";
import "swiper/swiper-bundle.css";
import { IMAGE_URLS, ACCORDION_DATA } from "../data";
import NavBar from "../components/common/NavBar";
import Pencil from "../../public/assets/Pencil.svg";

const Profile = () => {
  const accordionGroup = useRef(null);
  const router = useIonRouter();

  const handleback = () => {
    router.push("/assessvoicecommunication");
  };

  const handleEditClick = (section) => {
    if (section.value === "personal") {
      router.push("/editpersonalinfo");
    } else if (section.value === "appearance") {
      router.push("/editappearance");
    } else if (section.value === "hobbies") {
      router.push("/edithobbies");
    } else if (section.value === "career") {
      router.push("/editcareer");
    }
  };
  useEffect(() => {
    if (!accordionGroup.current) {
      return;
    }

    accordionGroup.current.value = ["personal"];
  }, []);

  return (
    <IonPage>
      <NavBar backbutton={handleback} title="Profile" vertical />
      <IonContent className="p-4">
        <div className="flex flex-col items-start gap-10 w-full">
          <Swiper
            modules={[
              Autoplay,
              Keyboard,
              Pagination,
              Scrollbar,
              Zoom,
              Navigation,
            ]}
            spaceBetween={50}
            slidesPerView={1}
            navigation
            pagination={{ clickable: true }}
            className="w-full"
          >
            {IMAGE_URLS.map((url, index) => (
              <SwiperSlide key={index}>
                <IonImg
                  src={url}
                  alt={`Image ${index + 1}`}
                  className="w-full h-[300px]"
                />
              </SwiperSlide>
            ))}
            <SwiperSlide>
              <div className="w-full h-[300px] flex flex-col items-center justify-center">
                <IonLabel className="w-2/4 text-center">
                  Upload Photo to your Profile
                </IonLabel>
                <IonIcon
                  className="w-24 h-24 mt-4"
                  icon={addCircleOutline}
                ></IonIcon>
              </div>
            </SwiperSlide>
          </Swiper>
          <div className="relative pl-4 w-full">
            <div className="absolute w-1/4  right-3  bottom-9 z-10">
              <IonIcon
                size="large"
                className="p-3 rounded-full bg-secondary"
                icon={Pencil}
              />
            </div>
            <p className="text-gray-500">
              80% profile completed.{" "}
              <span className="font-bold text-primary">Edit with AI</span>
            </p>
            <IonProgressBar value={0.8} />
          </div>
        </div>

        <IonAccordionGroup ref={accordionGroup} multiple={true}>
          {ACCORDION_DATA.map((section) => (
            <IonAccordion
              key={section.value}
              toggleIcon={caretDown}
              toggleIconSlot="start"
              value={section.value}
            >
              <IonItem slot="header" color="dark">
                <IonLabel>{section.header}</IonLabel>
                <IonButton
                  slot="end"
                  fill="clear"
                  onClick={() => handleEditClick(section)}
                >
                  Edit
                </IonButton>
              </IonItem>
              <IonCol className="flex flex-col gap-4 px-4" slot="content">
                {section.content.map((item, index) => (
                  <IonRow
                    className={`flex pl-4 ${
                      item.isIcon ? "justify-between" : ""
                    }`}
                    key={index}
                  >
                    <IonLabel
                      className={item.label.length > 16 ? "w-full" : "w-2/4"}
                    >
                      {item.label}:
                    </IonLabel>
                    {item.isIcon ? (
                      <IonIcon className="w-8 h-8" icon={Check}></IonIcon>
                    ) : item.isChip ? (
                      <IonRow className="w-full">
                        {item.value.map((chip, chipIndex) => (
                          <IonChip key={chipIndex} className="bg-secondary">
                            {chip}
                          </IonChip>
                        ))}
                      </IonRow>
                    ) : (
                      <IonLabel className="text-sm">{item.value}</IonLabel>
                    )}
                  </IonRow>
                ))}
              </IonCol>
            </IonAccordion>
          ))}
        </IonAccordionGroup>
      </IonContent>
    </IonPage>
  );
};

export default Profile;
