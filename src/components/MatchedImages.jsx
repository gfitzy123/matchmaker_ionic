import { IonButton, IonIcon } from "@ionic/react";
import { close, heartSharp } from "ionicons/icons";
import { useState } from "react";
import { IMAGE_URLS } from "../data";
import SwipImage from "./common/SwipImage";

function MatchedImages() {
  const [likedImages, setLikedImages] = useState(
    new Array(IMAGE_URLS.length).fill(false)
  );

  const toggleHeart = (index) => {
    const newLikedImages = [...likedImages];
    newLikedImages[index] = !newLikedImages[index];
    setLikedImages(newLikedImages);
  };

  return (
    <div className="flex flex-col gap-4 ">
      <SwipImage
        images={IMAGE_URLS}
        showHeart={false}
        showName={true}
        showDetails={true}
        showClose={false}
        likeData={{ likedImages, toggleHeart }}
     
     
      />
      <div className="flex gap-4 w-full">
        <IonButton
          className="w-full border border-light rounded-lg"
          fill="clear"
        >
          <IonIcon icon={close} />
        </IonButton>
        <IonButton
          className="w-full border border-primary rounded-lg"
          fill="clear"
        >
          <IonIcon icon={heartSharp} />
        </IonButton>
      </div>
    </div>
  );
}

export default MatchedImages;
