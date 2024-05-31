import { IonIcon, IonImg, IonLabel, IonText } from "@ionic/react";
import {
  addCircleOutline,
  closeOutline,
  heartOutline,
  heartSharp,
} from "ionicons/icons";
import "swiper/css";
import {
  A11y,
  Autoplay,
  Keyboard,
  Navigation,
  Pagination,
  Scrollbar,
  Zoom,
} from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.css";
import "tailwindcss/tailwind.css";

function SwipImage({
  images,
  showHeart,
  showName,
  showDetails,
  upload,
  showClose,
  likeData = {},
  pagination,
  swiperConfig = {},
}) {
  const { likedImages = [], toggleHeart = () => {} } = likeData;
  
  const defaultSwiperConfig = {
    horizontal: {
      slidesPerView: 1.2,
      centeredSlides: false,
      spaceBetween: 16,
    },
    vertical: {
      slidesPerView: 10,
      centeredSlides: false,
      spaceBetween: 16,
    },
    default: {
      slidesPerView: 1,
      centeredSlides: false,
      spaceBetween: 0,
    }
  };

  const direction = swiperConfig.direction;
  const currentConfig = defaultSwiperConfig[direction] || defaultSwiperConfig.default;

  const {
    slidesPerView = currentConfig.slidesPerView,
    centeredSlides = currentConfig.centeredSlides,
    spaceBetween = currentConfig.spaceBetween,
  } = swiperConfig;

  const modules = [Autoplay, Keyboard, Navigation, Scrollbar, Zoom, A11y];
  if (pagination) {
    modules.push(Pagination);
  }

  return (
    <Swiper
      modules={modules}
      direction={direction}
      slidesPerView={slidesPerView}
      centeredSlides={centeredSlides}
      spaceBetween={spaceBetween}
      navigation
      pagination={{ clickable: true }}
     className={`w-full ${direction==='vertical' && 'h-[400px]'} ${direction==='horizontal' && "rounded-lg"}`}
    >
      {images.map((image, index) => (
        <SwiperSlide key={index}>
          <div className="relative">
            <IonImg
              src={image.url}
              alt={`Image ${index + 1}`}
              className="w-full h-[300px] rounded-full object-cover "
            />
            {showHeart && (
              <IonIcon
                icon={likedImages[index] ? heartSharp : heartOutline}
                className={`absolute top-4 right-4 text-3xl p-4 bg-opacity-50 backdrop-blur-lg rounded-full`}
                onClick={() => toggleHeart(index)}
              />
            )}
            {showClose && (
              <IonIcon
                icon={closeOutline}
                className="absolute top-4 left-4 text-white text-3xl"
              />
            )}
            {showName && (
              <div className="absolute bottom-0 w-full text-white p-2 bg-black bg-opacity-50 backdrop-blur-lg rounded-lg flex flex-col gap-1">
                <IonText className="text-lg font-semibold">
                  {image.name}
                </IonText>
                {showDetails && (
                  <IonText className="text-sm text-customTextGray">
                    {image.details}
                  </IonText>
                )}
              </div>
            )}
          </div>
        </SwiperSlide>
      ))}
      {upload && (
        <SwiperSlide>
          <div className="w-full h-[300px] flex flex-col items-center justify-center bg-gray-200">
            <IonLabel className="w-2/4 text-center">
              Upload Photo to your Profile
            </IonLabel>
            <IonIcon
              className="w-24 h-24 mt-4 "
              icon={addCircleOutline}
              color="primary"
            />
          </div>
        </SwiperSlide>
      )}
    </Swiper>
  );
}

export default SwipImage;
