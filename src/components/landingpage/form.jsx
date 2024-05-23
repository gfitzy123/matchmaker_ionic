import { IonButton } from "@ionic/react";

const Form = () => {
  return (
    <div className="flex flex-col lg:flex-row items-center lg:justify-between gap-10 w-full max-w-[1280px]">
      <div className="flex flex-col gap-10 w-full max-w-[519px]">
        <h1 className="text-5xl">Why join the Matchmaker AI?</h1>
        <p className="text-base text-primary italic">
          If you value precision, efficiency, and cherish your time, joining our
          platform is the perfect fit for you. As a member, you'll experience
          heightened accuracy, faster connections, and an elevated caliber of
          matches.
        </p>
        <p className="text-base">
          Members contribute to our goal of maintaining Matchmaker AI as a
          discerning and top-tier dating and social networking hub. Our
          community encompasses individuals of various backgrounds, ages,
          orientations, and educational achievements, united by their ambition
          and determination to succeed. Naturally, they seek partners who share
          these qualities. Is there a quest more vital in life? We doubt it.
          Certain pursuits demand meticulous attention, and we firmly believe
          that optimizing your chances of finding The One is an investment in
          yourself that's truly invaluable.
        </p>
      </div>
      <div className="flex flex-col gap-5 justify-between p-10 border rounded-2xl w-full max-w-[640px]">
        <div className="flex w-full justify-between gap-7">
          <div className="h-16 flex justify-center items-center gap-3 py-2 px-14 bg-secondaryBlack rounded-lg">
            <input className="w-6 h-6" type="radio" /> <span>Female</span>
          </div>
          <div className="h-16 flex justify-center items-center gap-3 py-2 px-14 bg-secondaryBlack rounded-lg">
            <input className="w-6 h-6" type="radio" /> <span>Male</span>
          </div>
        </div>
        <div className="flex flex-col">
          <span className="text-sm">First name</span>
          <input
            className="border rounded-lg p-2"
            type="text"
            placeholder="Enter your first name"
          />
        </div>
        <div className="flex flex-col">
          <span className="text-sm">Phone number</span>
          <input
            className="border rounded-lg p-2"
            type="tel"
            placeholder="201-555-5555"
          />
        </div>

        <IonButton className="w-full">Submit</IonButton>
      </div>
    </div>
  );
};

export default Form;
