import {
    IonMenu,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonList,
    IonItem,
    IonIcon,
    IonLabel,
    IonMenuToggle,
    IonAvatar,
    IonButton
  } from '@ionic/react';
  import { chatboxEllipses, options, settings, helpCircle } from 'ionicons/icons';
  
  const SideMenu = () => {
    return (
      <IonMenu side="start" menuId="first" contentId="main-content">
        <IonHeader>
          <IonToolbar>
            <IonTitle>Matchmaker AI</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent className="bg-gray-900 text-white">
          <IonList className="p-4">
            <IonMenuToggle autoHide={false}>
              <IonItem button>
                <IonIcon icon={chatboxEllipses} slot="start" />
                <IonLabel>Chat with AI</IonLabel>
              </IonItem>
              <IonItem button>
                <IonIcon icon={options} slot="start" />
                <IonLabel>My preferences</IonLabel>
              </IonItem>
              <IonItem button>
                <IonIcon icon={settings} slot="start" />
                <IonLabel>Settings</IonLabel>
              </IonItem>
              <IonItem button>
                <IonIcon icon={helpCircle} slot="start" />
                <IonLabel>Support</IonLabel>
              </IonItem>
            </IonMenuToggle>
          </IonList>
          <IonList className="p-4 border-t border-gray-700">
            <IonItem button>
              <IonAvatar slot="start">
                <img src="https://via.placeholder.com/150" alt="Devon Lane" />
              </IonAvatar>
              <IonLabel>Devon Lane</IonLabel>
            </IonItem>
          </IonList>
          <div className="p-4 text-center bg-gray-800 border-t border-gray-700">
            <p>Enjoy All Benefits!</p>
            <p>Find ideal partners with no restrictions on any parameters!</p>
            <IonButton expand="block" color="tertiary" className="mt-2">
              GET PREMIUM
            </IonButton>
          </div>
        </IonContent>
      </IonMenu>
    );
  };
  
  export default SideMenu;
  