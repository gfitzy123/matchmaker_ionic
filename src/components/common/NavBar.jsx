import { IonButton, IonContent, IonHeader, IonIcon, IonItem, IonNavLink, IonRow, IonTitle, IonToolbar } from '@ionic/react'
import React from 'react'
import namelogo from '../../../public/assets/namelogo.svg'
import menu from '../../../public/assets/menu.svg'
import verticalmenu from '../../../public/assets/DotsThreeVertical.svg'

function NavBar() {
    return (
        <>
            <IonHeader>
                <IonToolbar >
                    <IonRow
                        className="flex justify-between items-center flex-nowrap w-full "
                    >
                        <IonIcon menu="main-menu" className=" w-8 h-8" icon={menu}></IonIcon>
                        <IonIcon className="w-44 h-4" icon={namelogo}></IonIcon>
                        <IonIcon className="w-8 h-8" icon={verticalmenu}></IonIcon>
                    </IonRow>
                </IonToolbar>
            </IonHeader>

        </>
    )
}

export default NavBar
