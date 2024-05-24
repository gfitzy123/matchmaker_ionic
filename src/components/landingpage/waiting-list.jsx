import { femaleData, menData } from "./constant";
import {
    IonText,
    IonProgressBar,
  } from "@ionic/react";

const WaitingList = () => {
  return (
    <div className="flex flex-col gap-10 max-w-[1114px]">
      <div className="flex flex-col items-center gap-10 justify-center w-full">
        <div className="flex flex-col items-center justify-center max-w-[600px]">
          <IonText className="text-center justify-center text-wrap flex flex-col gap-3">
            <h2 className="text-lg text-primary">Waiting List</h2>
            <h1 className="text-3xl">Exclusive Matchmaking Awaits!</h1>
            <p className="text-justify text-base">
              join our waiting list for exclusive access to personalized
              matchmaking services. be among the first to compatible signals and
              embark on a journey to find your perfect match. Dont miss
              out-signup now and start your romantic adventure!
            </p>
          </IonText>
        </div>
        <div className="w-full pl-5 pr-5 flex flex-col justify-center items-center gap-5">
          <IonProgressBar
            className="h-3 rounded-3xl"
            value={150 / 500}
          ></IonProgressBar>
          <h1 className="text-5xl font-bold text-primary">150 / 500</h1>
          <h3 className="text-2xl">Users Joined</h3>
        </div>
      </div>
      <div className="flex justify-between flex-col lg:flex-row gap-16">
        <div className="w-full bg-itemBackground p-2 rounded-2xl">
          <div className="flex justify-center items-center gap-2 border-b-2 p-2">
            <img src={femaleData.image} alt="female" />
            <div className="flex w-full items-center justify-between">
              <div>
                <h1 className="text-3xl">{femaleData.title}</h1>
                <h2 className="text-base">{femaleData.subTitle}</h2>
              </div>
              <h1 className="text-3xl">
                {femaleData.count} / {femaleData.totalCount}
              </h1>
            </div>
          </div>
          <ul>
            {femaleData.list.map((list) => (
              <li className="flex items-center gap-4 border-b border-borderColor text-lg py-6 px-4 hover:bg-listHover hover:text-hoverColor">
                <span>{list.id}</span>
                <h4>{list.name}</h4>
              </li>
            ))}
          </ul>
        </div>
        <div className="w-full bg-itemBackground p-2 rounded-2xl">
          <div className="flex justify-center items-center gap-2 border-b-2 p-2">
            <img src={menData.image} alt="female" />
            <div className="flex w-full items-center justify-between">
              <div>
                <h1 className="text-3xl">{menData.title}</h1>
                <h2 className="text-base">{menData.subTitle}</h2>
              </div>
              <h1 className="text-3xl">
                {menData.count} / {menData.totalCount}
              </h1>
            </div>
          </div>
          <ul>
            {menData.list.map((list) => (
              <li className="flex items-center gap-4 border-b border-borderColor text-lg py-6 px-4 hover:bg-listHover hover:text-hoverColor">
                <span>{list.id}</span>
                <h4>{list.name}</h4>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="flex flex-col bg-secondaryBtn lg:flex-row justify-between items-center rounded-2xl gap-10 p-10">
            <div className="flex flex-col gap-2 justify-center text-left">
                <h1 className="text-2xl">Hi, Theresa! You are so close to exclusive matchmaking!</h1>
                <p className="text-base">You are 54 in line, out of 50 people that will be accepted into the initial beta user group. Increase your chances of being accepted by inviting your friends.</p>
            </div>
            <button className="w-full py-6 leading-5 px-14 lg:w-[282px] text-nowrap bg-primary rounded-md text-lg text-primaryBtn">ADVANCE POSITION</button>
        </div>
    </div>
  );
};

export default WaitingList;
