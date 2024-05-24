import React, { useState, useEffect } from 'react';
import { IonContent, IonList, IonAvatar, IonButton } from '@ionic/react';

const Slider = () => {
  const [items, setItems] = useState([]);

  const generateItems = () => {
    const newItems = [];
    for (let i = 0; i < 10; i++) {
      newItems.push(`Item ${1 + items.length + i}`);
    }
    setItems([...items, ...newItems]);
  };

  useEffect(() => {
    generateItems();
  }, []);

  return (
    <IonContent >
      <IonList className="flex items-center gap-3 overflow-scroll whitespace-nowrap hide-scrollbar">
        {items.map((index) => (
          <IonAvatar className="h-full w-full" key={index} slot="start">
            <img className={"min-w-12 min-h-12" } src={'https://picsum.photos/80/80?random=' + index} alt="avatar" />
          </IonAvatar>
        ))}

            <IonButton className="w-full text-nowrap text-right py-2 text-sm leading-4" shape="round" fill="outline" onClick={()=> ""}>
             <span className="mr-1">See All</span> <img src="ArrowRight.svg" alt="" />
            </IonButton>
      </IonList>
    </IonContent>
  );
}

export default Slider;
