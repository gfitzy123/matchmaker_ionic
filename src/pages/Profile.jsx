import {
    IonContent,
    IonHeader,
    IonPage,
    IonTitle,
    IonToolbar,
    IonBackButton,
    IonButtons,
    IonLabel,
    IonItem,
    IonAvatar,
    IonAccordion,
    IonAccordionGroup,
    IonRow,
    IonCol,
    IonIcon,
    IonChip,
    IonImg,
    IonProgressBar,
    IonButton,
} from "@ionic/react";
import { addCircleOutline, caretDown } from "ionicons/icons";
import React, { useEffect, useRef } from "react";
import "tailwindcss/tailwind.css";
import Check from '../../public/assets/Check.svg';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Keyboard, Pagination, Scrollbar, Zoom, Navigation } from 'swiper/modules';
import 'swiper/swiper-bundle.css';
import Profilepic from '../../public/assets/profilepic.png';
import Profilepic2 from '../../public/assets/p2.jpg';
import { IMAGE_URLS } from '../data';

const Profile = () => {
    const accordionGroup = useRef(null);

    useEffect(() => {
        if (!accordionGroup.current) {
            return;
        }

        accordionGroup.current.value = ["first", "second", "third"];
    }, []);

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonButtons slot="start">
                        <IonBackButton />
                    </IonButtons>
                    <IonTitle>Profile</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent className="p-4">
                <div className="flex flex-col items-start">
                    <Swiper
                        modules={[Autoplay, Keyboard, Pagination, Scrollbar, Zoom, Navigation]}
                        spaceBetween={50}
                        slidesPerView={1}
                        navigation
                        pagination={{ clickable: true }}
                        className="w-full"
                    >
                        {IMAGE_URLS.map((url, index) => (
                            <SwiperSlide key={index}>
                                <IonImg src={url} alt={`Image ${index + 1}`} className="w-full h-[300px]" />
                            </SwiperSlide>
                        ))}
                        <SwiperSlide>
                            <div className="w-full h-[300px] flex flex-col items-center justify-center">
                                <IonLabel className="w-2/4 text-center text-2xl">Upload Photo on your Profile</IonLabel>
                                <IonIcon className="w-24 h-24 mt-4" icon={addCircleOutline}></IonIcon>
                            </div>
                        </SwiperSlide>
                    </Swiper>

                </div>
                <IonRow className="pl-4">
                    <p className="mb-4">80% profile completed. <span className="text-primary font-bold">Edit with AI</span></p>
                    <IonProgressBar value={0.80}></IonProgressBar>
                </IonRow>
                <IonAccordionGroup ref={accordionGroup} multiple={true}>
                    <IonAccordion
                        toggleIcon={caretDown}
                        toggleIconSlot="start"
                        value="first"
                    >
                        <IonItem slot="header" color="dark">
                            <IonLabel>Personal Information</IonLabel>
                            <IonButton slot="end" fill="clear">Edit</IonButton>
                        </IonItem>
                        <IonCol className="flex flex-col gap-4 px-4" slot="content">
                            <IonRow className="flex gap-4 pl-4">
                                <IonLabel className="w-1/4">Name:</IonLabel>
                                <IonLabel className="text-sm"> Devon Lane</IonLabel>
                            </IonRow>
                            <IonRow className="flex gap-4 pl-4">
                                <IonLabel className="w-1/4">Gender:</IonLabel>
                                <IonLabel className="text-sm"> Male</IonLabel>
                            </IonRow>
                            <IonRow className="flex gap-4 pl-4">
                                <IonLabel className="w-1/4">Birthday:</IonLabel>
                                <IonLabel className="text-sm"> 03/17/1987</IonLabel>
                            </IonRow>
                            <IonRow className="flex gap-4 pl-4">
                                <IonLabel className="w-1/4">Age:</IonLabel>
                                <IonLabel className="text-sm"> 29</IonLabel>
                            </IonRow>
                            <IonRow className="flex gap-4 pl-4">
                                <IonLabel className="w-1/4">Ethnicity:</IonLabel>
                                <IonLabel className="text-sm"> Italian</IonLabel>
                            </IonRow>
                            <IonRow className="flex gap-4 pl-4">
                                <IonLabel className="w-1/4">City:</IonLabel>
                                <IonLabel className="text-sm">New York</IonLabel>
                            </IonRow>
                            <IonRow className="flex gap-4 pl-4">
                                <IonLabel className="w-1/4">Address:</IonLabel>
                                <IonLabel className="text-sm"> New York,NY 10118 </IonLabel>
                            </IonRow>
                        </IonCol>
                    </IonAccordion>

                    <IonAccordion
                        toggleIcon={caretDown}
                        toggleIconSlot="start"
                        value="second"
                    >
                        <IonItem slot="header" color="dark">
                            <IonLabel>Appearance and Health</IonLabel>
                            <IonButton slot="end" fill="clear">Edit</IonButton>
                        </IonItem>
                        <IonCol className="flex flex-col gap-4 px-4 " slot="content">
                            <IonRow className="flex gap-4 pl-4">
                                <IonLabel className="w-1/4">Height:</IonLabel>
                                <IonLabel className="text-sm"> 6 feets 2 inches</IonLabel>
                            </IonRow>
                            <IonRow className="flex gap-4 pl-4">
                                <IonLabel className="w-1/4">Build:</IonLabel>
                                <IonLabel className="text-sm"> Athletic</IonLabel>
                            </IonRow>
                            <IonRow className="flex gap-4 pl-4">
                                <IonLabel className="w-1/4">Hair color:</IonLabel>
                                <IonLabel className="text-sm"> Dark brown</IonLabel>
                            </IonRow>
                            <IonRow className="flex gap-4 pl-4">
                                <IonLabel className="w-1/4">Eye color:</IonLabel>
                                <IonLabel className="text-sm"> blue</IonLabel>
                            </IonRow>
                            <IonRow className="flex flex-col gap-4 pl-4">
                                <IonLabel className="w-full">Physical description:</IonLabel>
                                <IonLabel className="w-full">
                                    I have an athletic build with broad shoulders. My hair is dark
                                    brown and usually kept short. My eyes are blue and often
                                    described as piercing. I enjoy staying active and hitting the
                                    gym regularly to maintain my fitness.
                                </IonLabel>
                            </IonRow>
                            <IonRow className="flex justify-between pl-4">
                                <IonLabel className="w-2/4">COVID Vaccinated:</IonLabel>
                                <IonIcon className="mr-6 w-8 h-8" icon={Check}></IonIcon>
                            </IonRow>
                            <IonRow className="flex justify-between pl-4">
                                <IonLabel className="w-2/4">Smoking:</IonLabel>
                                <IonIcon className="mr-6 w-8 h-8" icon={Check}></IonIcon>
                            </IonRow>
                        </IonCol>
                    </IonAccordion>

                    <IonAccordion
                        toggleIcon={caretDown}
                        toggleIconSlot="start"
                        value="third"
                    >
                        <IonItem slot="header" color="dark">
                            <IonLabel>Interests and Hobbies</IonLabel>
                            <IonButton slot="end" fill="clear">Edit</IonButton>
                        </IonItem>
                        <IonCol className="flex flex-col gap-4 px-4 " slot="content">
                            <IonRow className="flex flex-col gap-4 pl-4">
                                <IonLabel className="w-full">Favorite activities</IonLabel>
                                <IonRow className="w-full">
                                    <IonChip className="bg-pausebutton">Art</IonChip>
                                    <IonChip className="bg-pausebutton">Bicycle tours</IonChip>
                                    <IonChip className="bg-pausebutton">Bicycle tours</IonChip>
                                    <IonChip className="bg-pausebutton">Bicycle tours</IonChip>
                                    <IonChip className="bg-pausebutton">BusinessNetworking</IonChip>
                                </IonRow>
                            </IonRow>

                            <IonRow className="flex flex-col gap-4 pl-4">
                                <IonLabel className="w-full">Celebrities I Like</IonLabel>
                                <IonLabel className="w-full">
                                    I have an athletic build with broad shoulders.
                                </IonLabel>
                            </IonRow>
                        </IonCol>
                    </IonAccordion>
                </IonAccordionGroup>

            </IonContent>
        </IonPage>
    );
};

export default Profile;
