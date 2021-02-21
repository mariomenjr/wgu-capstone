import React from "react";

import { WeekDays } from "../../model/config/config";

import DomainInputs from "../DomainInputs";
import DecorativeLegend from "../DecorativeLegend";
import PredictedWeekday from "../PredictedWeekday";

export default function Main({ chances, query }) {
  const currentCurrency = `Bitcoin`;
  const { predictedDay, chancePercentage } = React.useMemo(() => {
    console.debug({ chances, query });
    
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

  return <div className={`flex flex-col w-full md:w-8/12 px-12`}>
    <DecorativeLegend {...{ currentCurrency }} />
    <PredictedWeekday {...{ predictedDay, chancePercentage: +chancePercentage }} />
    <DomainInputs {...{ query }} />
  </div>;
}
