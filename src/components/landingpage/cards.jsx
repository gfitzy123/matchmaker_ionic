import React from "react";

const Cards = () => {
  return (
<div className="flex flex-col gap-10 items-center justify-between lg:flex-row w-full max-w-[1280px]">
<div className="flex gap-2 items-start lg:max-w-[280px]">
<img className="p-2" src="glass.svg" alt="" />
    <div className="flex flex-col gap-5">
<h1 className="text-3xl">Smart Compatibility</h1>
<p className="text-sm">
Our matchmaking AI intelligently analyzes your preferences and behavior to find the perfect match tailored just for you.
</p>
    </div>
</div>  
<div className="flex gap-2 items-start lg:max-w-[280px]">
<img className="p-2" src="rocket.svg" alt="" />
    <div className="flex flex-col gap-5">
<h1 className="text-3xl">Effortless Connections</h1>
<p className="text-sm">
With our AI-driven matchmaking, effortlessly connect with like-minded individuals who share your interests and values, saving you time and energy in your search for love.
</p>
    </div>
</div>  
<div className="flex gap-2 items-start lg:max-w-[280px]">
<img className="p-2" src="target.svg" alt="" />
    <div className="flex flex-col gap-5">
<h1 className="text-3xl">Personalized Matches</h1>
<p className="text-sm">
Experience personalized matchmaking tailored to your unique personality and desires, ensuring every match has the potential for a meaningful connection.
</p>
    </div>
</div>  
</div>
)
};

export default Cards;
