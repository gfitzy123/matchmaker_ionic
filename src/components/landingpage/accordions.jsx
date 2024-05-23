import AccordionItem from "../common/accordion";
import { accordionsData } from "./constant";

const Accordions = () => {
  return (
    <div className="w-full max-w-[1280px]">
      <div className="flex flex-col items-center gap-3">
        <h3 className="text-primary text-base">FAQ</h3>
        <h1 className="text-3xl">Have Questions? We've Got Answers!</h1>
      </div>

      <div className="w-full ">
        {accordionsData.map((item) => (
          <AccordionItem id={item.id} title={item.title}>
            <p>{item.section}</p>
          </AccordionItem>
        ))}
      </div>
    </div>
  );
};

export default Accordions;
