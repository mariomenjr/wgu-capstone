import React from "react";

export default function PredictedWeekday({
  greaterDay,
  greaterChance,
  lesserDay,
  lesserChance,
}: {
  greaterDay: string;
  greaterChance: number;
  lesserDay: string;
  lesserChance: number;
}) {
  
  const {
    mostLikelyDay,
    mostLikelyColor,
    leastLikelyDay,
    leastLikelyColor,
  } = React.useMemo(() => {
    return {
      // TODO: We'd like to have this detect if:
      // 1. Even though is still not a good idea to buy, which day would be less bad?
      mostLikelyDay: greaterDay,
      mostLikelyColor: `text-green-500`,
      leastLikelyDay: lesserDay,
      leastLikelyColor: `text-red-500`,
    };
  }, [greaterDay, greaterChance, lesserDay, lesserChance]);

  return (
    <>
      <h1
        className={`font-sans font-semibold text-5xl sm:text-8xl tracking-wide text-center pt-6 ${mostLikelyColor}`}
      >
        {mostLikelyDay}
      </h1>
      <h1
        className={`font-sans font-semibold text-xl sm:text-4xl tracking-wide text-center pb-6 ${leastLikelyColor}`}
      >
        {leastLikelyDay}
      </h1>
    </>
  );
}
