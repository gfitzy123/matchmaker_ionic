import {
  IonAccordion,
  IonAccordionGroup,
  IonButton,
  IonChip,
  IonCol,
  IonIcon,
  IonItem,
  IonLabel,
  IonRow,
  useIonRouter,
} from "@ionic/react";
import { useEffect, useRef } from "react";
import {
  chevronDownOutline,
  checkmarkOutline,
  lockClosed,
} from "ionicons/icons";

function AccordionItem({ otherUser, data, handleSubscriptionModal }) {
  const router = useIonRouter();
  const accordionGroup = useRef(null);

  const handleEditClick = (section) => {
    if (section.value === "personal") {
      router.push("/editpersonalinfo");
    } else if (section.value === "appearance") {
      router.push("/editappearance");
    } else if (section.value === "hobbies") {
      router.push("/edithobbies");
    } else if (section.value === "career") {
      router.push("/editcareer");
    }
  };
  useEffect(() => {
    if (!accordionGroup.current) {
      return;
    }
    accordionGroup.current.value = ["personal"];
  }, []);

  return (
    <IonAccordionGroup ref={accordionGroup} multiple={true}>
      {data.map((section, index) => (
        <IonAccordion
          key={section.value}
          toggleIcon={otherUser && index > 1 ? lockClosed : chevronDownOutline}
          toggleIconSlot={otherUser ? "end" : "start"}
          value={section.value}
          readonly={otherUser && index > 1}
          onClick={()=> {otherUser && index > 1 ? handleSubscriptionModal() : ""}}
        >
          <IonItem slot="header" color="dark">
            <IonLabel>{section.header}</IonLabel>
            {otherUser ? ("") : (
              <IonButton
                slot="end"
                fill="clear"
                onClick={() => handleEditClick(section)}
              >
                Edit
              </IonButton>
            )}
          </IonItem>
          <IonCol className="flex flex-col gap-4 px-4" slot="content">
            {section.content.map((item, index) => (
              <IonRow
                className={`flex items-center ${
                  item.isIcon ? "justify-between" : ""
                }`}
                key={index}
              >
                <IonLabel
                  className={`${
                    item.label.length > 16 ? "w-full" : "w-1/4"
                  } text-xs text-textSecondary`}
                >
                  {item.label}:
                </IonLabel>
                {item.isIcon ? (
                  <IonIcon
                    color="primary"
                    className="w-6 h-6 px-2"
                    icon={checkmarkOutline}
                  ></IonIcon>
                ) : item.isChip ? (
                  <IonRow className="w-full">
                    {item.value.map((chip, chipIndex) => (
                      <IonChip
                        key={chipIndex}
                        className="bg-secondary text-light"
                      >
                        {chip}
                      </IonChip>
                    ))}
                  </IonRow>
                ) : (
                  <IonLabel className="text-sm">{item.value}</IonLabel>
                )}
              </IonRow>
            ))}
          </IonCol>
        </IonAccordion>
      ))}
    </IonAccordionGroup>
  );
}

export default AccordionItem;
