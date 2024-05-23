import { IonBackButton, IonButtons, IonContent, IonHeader, IonIcon, IonItem, IonLabel, IonList, IonPage, IonToolbar, useIonRouter, IonGrid, IonRow, IonCol } from '@ionic/react'
import { chevronBack } from 'ionicons/icons'
import checkmark from '../../public/assets/done.svg'

function AccountSetup() {
    const router = useIonRouter();

    const handleConfirm = () => {
        router.push('/profile');
    };
    const handleBack = () => {
        router.push('/login');
    };

    return (
        <IonPage>
            <IonContent>
                <IonHeader>
                    <IonToolbar>
                        <IonButtons slot="start">
                            <IonBackButton
                                icon={chevronBack}
                                defaultHref=""
                                onClick={handleBack}
                            />
                        </IonButtons>
                    </IonToolbar>
                </IonHeader>

                <IonGrid className="h-full ion-justify-content-center ion-align-items-center">
                    <IonRow className="flex flex-col gap-72">

                        <div>
                            <IonRow className="ion-align-items-center ion-justify-content-center">
                                <IonCol size="auto">
                                    <IonIcon
                                        size="large"
                                        icon={checkmark}
                                        className="z-10 w-12 h-12"
                                    ></IonIcon>
                                </IonCol>
                            </IonRow>

                            <IonRow className="ion-align-items-center ion-justify-content-center">
                                <IonCol size="auto">
                                    <IonLabel className="text-4xl w-full">
                                        <h1 className="text-lg">
                                            Your account is set up
                                        </h1>
                                    </IonLabel>
                                </IonCol>
                            </IonRow>
                        </div>

                        <IonRow className="ion-align-items-center ion-justify-content-center">
                            <IonCol size="auto">
                                <IonItem
                                    className="border border-bg-primary rounded-full w-64 text-center"
                                    lines="none"
                                    button={true}
                                    detail={false}
                                    onClick={handleConfirm}
                                >
                                    <IonLabel>Continue</IonLabel>
                                </IonItem>
                            </IonCol>
                        </IonRow>
                    </IonRow>
                </IonGrid>
            </IonContent>
        </IonPage>
    )
}

export default AccountSetup
