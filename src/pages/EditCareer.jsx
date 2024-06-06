import { useState } from "react";
import {
  IonButton,
  IonContent,
  IonInput,
  IonPage,
  IonRange,
  useIonRouter,
  IonText,
} from "@ionic/react";
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
        <div className="flex flex-col p-4 gap-10">
          <div className="w-full flex flex-col gap-4">
            <IonRange
            mode="md"
            label="Income Bracket"
            labelPlacement="stacked"
              min={50}
              max={250}
              dualKnobs={true}
              ticks={true}
              value={rangeValue}
              onIonInput={handleRangeChange
              }
              className="range-custom"
            />
            <div className="relative w-full h-8 ">
              <div className="absolute left-0 text-textSecondary">$50k</div>
              <div
                className="absolute text-primary bg-background z-10"
                style={{
                  left: `${((rangeValue.lower - 50) / 200) * 100}%`,
                  transform: "translateX(-50%)",
                }}
              >
                ${rangeValue.lower}k
              </div>
              <div
                className="absolute bg-background text-primary z-10"
                style={{
                  left: `${((rangeValue.upper - 50) / 200) * 100}%`,
                  transform: "translateX(-50%)",
                }}
              >
                ${rangeValue.upper}k
              </div>
              <div className="absolute right-0  text-textSecondary">$250k</div>
            </div>

            <IonInput
              label="Company"
              labelPlacement="floating"
              className="border-b h-16"
            />

            <IonInput
              label="Job title"
              labelPlacement="floating"
              className="border-b h-16"
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
