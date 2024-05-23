import { IonBackButton, IonButtons, IonContent, IonHeader, IonIcon, IonItem, IonLabel, IonList, IonPage, IonToolbar, useIonRouter, IonGrid, IonRow, IonCol } from '@ionic/react'
import { chevronBack } from 'ionicons/icons'
import checkmark from '../../public/assets/done.svg'

function AccountSetup() {
    const router = useIonRouter();

    const handleConfirm = () => {
        router.push('/profile');
    };
    const handleBack = () => {
        router.push('/joinnow');
    };

    return (
        <IonPage>
            <IonButtons slot="start">
                <IonBackButton
                    icon={chevronBack}
                    defaultHref=""
                    onClick={handleBack}
                />
            </IonButtons>
            <IonContent>
                <IonGrid className="flex flex-col h-full justify-between ">

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

                    <div>
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
                    </div>
                </IonGrid>
            </IonContent>
        </IonPage>
    )
}

export default AccountSetup
