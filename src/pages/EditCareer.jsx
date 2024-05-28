import {
  IonButton,
  IonContent,
  IonInput,
  IonLabel,
  IonPage,
  IonRange,
  useIonRouter,
} from "@ionic/react";
import React, { useState } from "react";
import NavBar from "../components/common/NavBar";

function EditCareer() {
  const router = useIonRouter();
  const [rangeValue, setRangeValue] = useState({ lower: 130, upper: 180 });

  const handleRangeChange = (e) => {
    setRangeValue(e.detail.value);
  };

  const handleback = () => {
    router.push("/profile");
  };

  return (
    <IonPage>
      <NavBar backbutton={handleback} title="Career and Achievements" />
      <IonContent className="p-4 bg-gray-900 text-white">
        <div className="flex flex-col p-4 gap-4">
          <div className="w-full flex flex-col gap-4">
            <IonRange
              min={50}
              max={250}
              dualKnobs={true}
              pin={true}
              ticks={true}
              value={rangeValue}
              onIonChange={handleRangeChange}
              className="range-custom"
            />
            <div className="relative w-full h-8 ">
              <div className="absolute left-0  ">$50k</div>
              <div
                className="absolute  text-primary"
                style={{
                  left: `${((rangeValue.lower - 50) / 200) * 100}%`,
                  transform: "translateX(-50%)",
                }}
              >
                ${rangeValue.lower}k
              </div>
              <div
                className="absolute  text-primary"
                style={{
                  left: `${((rangeValue.upper - 50) / 200) * 100}%`,
                  transform: "translateX(-50%)",
                }}
              >
                ${rangeValue.upper}k
              </div>
              <div className="absolute right-0  text-white">$250k</div>
            </div>

            <IonInput
              label="Company"
              labelPlacement="stacked"
              className="border-b border-bg-primary"
            />

            <IonInput
              label="Job title"
              labelPlacement="stacked"
              className="border-b border-bg-primary"
            />
          </div>
          <IonButton
            expand="block"
            className="bg-yellow-500 text-black font-semibold rounded-lg"
          >
            SAVE
          </IonButton>
        </div>
      </IonContent>
    </IonPage>
  );
}

export default EditCareer;
