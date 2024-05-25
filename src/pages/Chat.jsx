import {
  IonButton,
  IonContent,
  IonIcon, IonInput,
  IonItem,
  IonLabel,
  IonList,
  IonPage,
  IonPopover,
  IonProgressBar,
  useIonRouter
} from '@ionic/react';
import { arrowBackOutline, copyOutline, person, volumeMediumOutline } from 'ionicons/icons';
import { useRef, useState } from 'react';
import SelectionPlus from '../../public/assets/SelectionPlus.svg';
import message from '../../public/assets/msg.svg';
import sender from '../../public/assets/sender.svg';
import thumbsdown from '../../public/assets/thumb down.svg';
import thumbsup from '../../public/assets/thumb up.svg';

import 'tailwindcss/tailwind.css';
import NavBar from '../components/common/NavBar';
import Slider from '../components/slider';

const Chat = () => {
  const [inputValue, setInputValue] = useState('');
  const router = useIonRouter();
  const [showPopover, setShowPopover] = useState(false);
  const [popoverEvent, setPopoverEvent] = useState(null);
  const popoverRef = useRef(null);

  const handlevoice = () => {
    router.push('/voicecommunication')
  };

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleLongPress = (e) => {
    setPopoverEvent(e.detail);
    setShowPopover(true);
  };
  const handlePopoverDismiss = () => {
    setShowPopover(false);
  };
  const handleMenuItemClick = (action) => {
    console.log('Clicked:', action);
    setShowPopover(false);
  };
  return (
    <>
      <IonPage>
        <NavBar />
        <IonContent >
          <div className=" p-4 ">
            <div className="flex items-center justify-center  text-sm mb-2  ">
              <div className="flex items-center  ">
                <span className="mr-2"><b>10% </b>profile completed</span>
                <div className="flex ">
                  <img src={person} alt="User 1" className="w-6 h-6 rounded-full border-2 border-gray-900" />
                  <img src={person} alt="User 2" className="w-6 h-6 rounded-full border-2 border-gray-900" />
                  <img src={person} alt="User 3" className="w-6 h-6 rounded-full border-2 border-gray-900" />
                </div>
              </div>
              <span>120 matches</span>
            </div>
            <IonProgressBar value={0.10}></IonProgressBar>
          </div>

          <div className="p-4 ">
            <div className="flex items-center mb-4 ">
              <div className="flex-grow overflow-scroll whitespace-nowrap hide-scrollbar">
                <div className="bg-gray-800 p-4 ">
                  <div className='flex gap-2'>
                    <IonIcon icon={person} className='border rounded-full'></IonIcon>
                    <p className="text-sm mb-2">
                      <b>Matchmaker AI</b>
                    </p>
                  </div>
                  <p className="text-sm" onClick={handleLongPress}>
                    Could you please provide some information about your appearance and health? Height, build, hair color, eye color, physical description.
                  </p>
                </div>
                <div className="flex items-center mt-2">
                  <IonButton fill="clear" size="small" className="mr-2">
                    <IonIcon icon={thumbsup} slot="icon-only" />
                  </IonButton>
                  <IonButton fill="clear" size="small">
                    <IonIcon icon={thumbsdown} slot="icon-only" />
                  </IonButton>
                </div>
                <Slider />
              </div>
            </div>

            <div className='text-primary border-b border-primary mb-2'>
              <h4>PERSONAL INFORMATION</h4>
            </div>
            <div className="flex items-center mb-4 ">
              <div className="flex-grow text-left">
                <div className="bg-gray-700 p-4 ">
                  <div className='flex gap-2'>
                    <IonIcon icon={person} className='border rounded-full'></IonIcon>
                    <p className="text-sm mb-2">
                      <strong>You</strong>
                    </p>
                  </div>
                  <p className="text-sm">
                    Yeah, sure. So, I'm about 6 feet tall, got a medium build, kinda average, I guess. My hair's dark brown, like really dark, almost black. Eyes? They're hazel, you know, a mix of green and brown. As for my physical description, well, I'm pretty active, hit the gym a couple of times a week, so I'd say I'm in decent shape overall.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="fixed inset-x-0 bottom-0 p-4 ">
            <div className="flex items-center gap-3">
              <IonInput
                placeholder="Write a message..."
                className="flex-grow text-white border rounded-full px-4 py-2"
                value={inputValue}
                onIonInput={handleInputChange}
              />
              {inputValue ? (
                <IonIcon size="large" className="border p-2 rounded-full bg-primaryBtn" icon={sender} />
              ) : (
                <IonIcon size="large" onClick={handlevoice} className="border p-2 rounded-full bg-primaryBtn" icon={message} />
              )}
            </div>
          </div>
        </IonContent>
      </IonPage>

      <div onContextMenu={(e) => e.preventDefault()} onLongPress={handleLongPress}>
        <IonPopover
          ref={popoverRef}
          event={popoverEvent}
          isOpen={showPopover}
          onIonPopoverDidDismiss={handlePopoverDismiss}
        >
          <IonList>
            <IonItem button onClick={() => handleMenuItemClick('Copy')}>
              <IonIcon color='white'  size='large' icon={copyOutline}></IonIcon>
              <IonLabel className='ml-3'>Copy</IonLabel>
            </IonItem>
            <IonItem button onClick={() => handleMenuItemClick('SelectText')}>
              <IonIcon color='white'  size='large' icon={SelectionPlus}></IonIcon>
              <IonLabel className='ml-3'>Select Text</IonLabel>
            </IonItem>
            <IonItem button onClick={() => handleMenuItemClick('ReadAloud')}>
              <IonIcon color='white'  size='large' icon={volumeMediumOutline}></IonIcon>
              <IonLabel className='ml-3'>Read Aloud</IonLabel>
            </IonItem>
            <IonItem button onClick={() => handleMenuItemClick('Close')}>
              <IonIcon color='white' size='large' icon={arrowBackOutline}></IonIcon>
              <IonLabel className='ml-3'>Close</IonLabel>
            </IonItem>
          </IonList>
        </IonPopover>
      </div>
    </>
  );
};

export default Chat;