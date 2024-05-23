import { IonBackButton, IonButtons, IonHeader, IonToolbar } from '@ionic/react'
import { chevronBack } from 'ionicons/icons'
import React, { useState } from 'react'

function Confirmation() {
  
  return (
  <>
              <IonHeader>
              <IonToolbar>
                <IonButtons slot="start">
                  <IonBackButton
                    icon={chevronBack}
                    defaultHref=""
                  />
                </IonButtons>
              </IonToolbar>
            </IonHeader>
  </>
  )
}

export default Confirmation
