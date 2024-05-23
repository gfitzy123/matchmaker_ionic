import {
    IonBackButton,
    IonButton,
    IonButtons,
    IonCol,
    IonContent,
    IonGrid,
    IonHeader,
    IonIcon,
    IonItem,
    IonLabel,
    IonList,
    IonModal,
    IonPage,
    IonRow,
    IonToolbar,
    useIonRouter,
} from '@ionic/react';
import { chevronBack } from 'ionicons/icons';
import profile from '../../public/assets/UserSquare.svg'
import Insta from '../../public/assets/insta.svg'
import { useRef, useState } from 'react';

function Profile() {
    const modal = useRef(null);
    const [showModal, setShowModal] = useState(false);
    const router = useIonRouter();

    const handleConfirm = () => {
        router.push('/accountsetup');
    };

    function handleOpenModal() {
        setShowModal(true);
    }

    function handleCloseModal() {
        setShowModal(false);
    }

    return (
        <IonPage>
            <IonButtons slot="start">
                <IonBackButton
                    icon={chevronBack}
                    defaultHref=""
                    onClick={handleConfirm}
                />
            </IonButtons>

            <IonContent>
                <IonGrid className="ion-justify-content-center ion-align-items-center ">
                    <IonRow className="ion-justify-content-center ion-align-items-center">
                        <div className="flex flex-col items-center gap-48 ">
                            <div className="flex flex-col items-center">
                                <IonIcon size="large" icon={profile} className="z-10 w-20 h-20" />
                                <IonLabel className="text-4xl w-full">
                                    <h1 className="text-lg">Upload photo on your profile</h1>
                                </IonLabel>
                            </div>


                            <div className="flex flex-col items-center gap-6">
                                <IonItem
                                    className="border border-bg-primary rounded-full w-72 text-center"
                                    lines="none"
                                    button
                                    detail={false}
                                    onClick={handleOpenModal}
                                >
                                    <IonLabel>Take Photo</IonLabel>
                                </IonItem>

                                <IonItem
                                    className="border border-bg-primary rounded-full w-72 text-center"
                                    lines="none"
                                    button
                                    detail={false}
                                    onClick={handleOpenModal}
                                >
                                    <IonLabel>Choose From Camera Roll</IonLabel>
                                </IonItem>

                                <IonItem
                                    className="border border-bg-primary rounded-full w-72"
                                    lines="none"
                                    button
                                    detail={false}
                                    onClick={handleOpenModal}
                                >
                                    <IonIcon className="mr-6 w-8 h-8" icon={Insta}></IonIcon>
                                    <IonLabel>Use From Your Instagram</IonLabel>
                                </IonItem>
                            </div>
                        </div>
                    </IonRow>
                </IonGrid>

                <IonModal isOpen={showModal} onDidDismiss={handleCloseModal} ref={modal}>
                    <IonList className="ion-justify-content-center ion-align-items-center h-full ">
                        <div className="flex flex-col w-full justify-between items-center ">
                            <div>
                                    <IonLabel className="text-4xl w-full">
                                        <h1 className="text-lg text-center">
                                            "Matchmaker AI" Would Like To Access The Camera
                                        </h1>
                                    </IonLabel>

                                    <IonLabel className="text-4xl w-64">
                                        <h2 className="text-lg text-center">
                                            This lets you do things take and share photos, record videos, and use other special features and effects.
                                        </h2>
                                    </IonLabel>
                            </div>

                           <div>
                           <IonGrid className="w-full">
                                <IonRow className="flex items-center justify-center  gap-10">
                                    <IonCol size="auto">
                                        <IonItem
                                            className="w-full whitespace-nowrap"
                                            lines="none"
                                            button={true}
                                            detail={false}
                                            onClick={handleCloseModal}
                                        >
                                            <IonLabel onClick={handleConfirm}>Don't Allow</IonLabel>
                                        </IonItem>
                                    </IonCol>

                                    <IonCol size="auto">
                                        <IonItem
                                            className="w-full"
                                            lines="none"
                                            button={true}
                                            detail={false}
                                            onClick={handleCloseModal}
                                        >
                                            <IonLabel onClick={handleCloseModal}>Ok</IonLabel>
                                        </IonItem>
                                    </IonCol>
                                </IonRow>
                            </IonGrid>
                           </div>

                        </div>
                    </IonList>
                </IonModal>
            </IonContent>
        </IonPage>
    );
}

export default Profile;
