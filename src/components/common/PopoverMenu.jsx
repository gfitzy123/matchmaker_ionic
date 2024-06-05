import React from 'react';
import { IonPopover, IonList, IonItem, IonIcon, IonLabel } from '@ionic/react';
import { copyOutline,  volumeMediumOutline, arrowBackOutline } from 'ionicons/icons';
import SelectionPlus from "../../../public/assets/SelectionPlus.svg";

const PopoverMenu = ({ isOpen, event, onDidDismiss, handleMenuItemClick }) => {
  return (
    <IonPopover
      event={event}
      isOpen={isOpen}
      onDidDismiss={onDidDismiss}
    >
      <IonList>
        <IonItem button onClick={() => handleMenuItemClick("Copy")}>
          <IonIcon color="white" size="large" icon={copyOutline}></IonIcon>
          <IonLabel className="ml-3">Copy</IonLabel>
        </IonItem>
        <IonItem button onClick={() => handleMenuItemClick("SelectText")}>
          <IonIcon color="white" size="large" icon={SelectionPlus}></IonIcon>
          <IonLabel className="ml-3">Select Text</IonLabel>
        </IonItem>
        <IonItem button onClick={() => handleMenuItemClick("ReadAloud")}>
          <IonIcon color="white" size="large" icon={volumeMediumOutline}></IonIcon>
          <IonLabel className="ml-3">Read Aloud</IonLabel>
        </IonItem>
        <IonItem button onClick={() => handleMenuItemClick("Close")}>
          <IonIcon color="white" size="large" icon={arrowBackOutline}></IonIcon>
          <IonLabel className="ml-3">Close</IonLabel>
        </IonItem>
      </IonList>
    </IonPopover>
  );
};

export default PopoverMenu;
