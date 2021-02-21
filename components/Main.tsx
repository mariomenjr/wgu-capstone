import React from "react";

import { WeekDays } from "../model/config/config";

function DecorativeLegend({ currentCurrency }) {
  return <h4 className={`py-3`}>
    <span>It's better to buy </span>
    <span className={`italic font-semibold underline`}>
      {currentCurrency}
    </span>
    <span> on a...</span>
  </h4>;
}

function PredictedWeekday({ predictedDay }) {
  return <h1 className={`font-sans font-semibold text-5xl sm:text-8xl tracking-wide text-blue-500 text-center py-3`}>
    {predictedDay}
  </h1>;
}

function DomainInputs() {
  return <div className={`container w-full py-3`}>
    <div className={`grid grid-cols-1 sm:grid-cols-3 gap-2`}>
      <select
        className={`block px-3 py-2 rounded leading-tight focus:outline-none`}
      >
        <option value="btc">Bitcoin</option>
        <option value="eth">Etherum</option>
        <option value="dgc">Dogecoin</option>
      </select>
      <input
        type="text"
        className={`block px-3 py-2 rounded leading-tight focus:outline-none`}
      />
      <input
        type="text"
        className={`block px-3 py-2 rounded leading-tight focus:outline-none`}
      />
    </div>
  </div>;
}

export default function Main({ chances }) {
  const currentCurrency = `Bitcoin`;
  const { predictedDay, chancePercentage } = React.useMemo(() => {
    const [weekDayIndex, chancePercentage] = chances.reduce(
      (hold: number[], current: number, index: number) => {
        if (hold.length === 0) return [index, current];
        return current > hold[1] ? [index, current] : hold;
      },
      []
    );

    return {
      predictedDay: WeekDays[weekDayIndex],
      chancePercentage,
    };
  }, [chances]);

  console.log({ chancePercentage });

  return (
    <div className={`flex flex-col w-full md:w-8/12 px-12`}>
      <DomainInputs />
      <DecorativeLegend currentCurrency={currentCurrency} />
      <PredictedWeekday predictedDay={predictedDay} />
    </div>
  );
}
