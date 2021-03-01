import React from "react";

import { WeekDays, PriceCollection } from "../../model/config/config";

import DomainInputs from "../DomainInputs";
import DecorativeLegend from "../DecorativeLegend";
import PredictedWeekday from "../PredictedWeekday";

export default function Main({ chances, query }) {
  const currentCurrency = React.useMemo(
    () => PriceCollection.find((price) => price.category === +(query.currency ?? `0`)),
    [query.currency]
  );

  const predictionLimits = React.useMemo(() => {
    
    const [greaterIndex, greaterChance] = chances.slice(7, 14).reduce(
      (hold: number[], current: number, index: number) => {
        if (hold.length === 0) return [index + 7, current];
        return current > hold[1] ? [index + 7, current] : hold;
      },
      []
    );

    const [lesserIndex, lesserChance] = chances.slice(0, 7).reduce(
      (hold: number[], current: number, index: number) => {
        if (hold.length === 0) return [index, current];
        return current > hold[1] ? [index, current] : hold;
      },
      []
    );

    return {
      greaterDay: WeekDays[greaterIndex],
      greaterChance: +greaterChance,
      lesserDay: WeekDays[lesserIndex], 
      lesserChance: +lesserChance
    };
  }, [chances]);

  return <div className={`flex flex-col w-full md:w-8/12 px-12`}>
    <DecorativeLegend {...{ currentCurrency }} />
    <PredictedWeekday {...predictionLimits} />
    <DomainInputs {...{ query }} />
  </div>;
}
