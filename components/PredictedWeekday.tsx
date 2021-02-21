import React from "react";

export default function PredictedWeekday({
  predictedDay,
  chancePercentage,
}: {
  predictedDay: string
  chancePercentage: number
}) {
  const colorByChance = React.useMemo(() => {
    return [
      {
        color: `text-red-600`,
        check: (chance: number): boolean => chance >= 0 && chance < 0.05,
      },
      {
        color: `text-red-300`,
        check: (chance: number): boolean => chance >= 0.05 && chance < 0.10,
      },
      {
        color: `text-yellow-600`,
        check: (chance: number): boolean => chance >= 0.10 && chance < 0.15,
      },
      {
        color: `text-green-300`,
        check: (chance: number): boolean => chance >= 0.15 && chance <= 0.20,
      },
      {
        color: `text-green-600`,
        check: (chance: number): boolean => chance >= 0.20,
      },
    ].find((section) => section.check(chancePercentage))?.color ?? ``;
  }, [chancePercentage]);
  return <h1 className={`font-sans font-semibold text-5xl sm:text-8xl tracking-wide text-center py-6 ${colorByChance}`}>
    {predictedDay}
  </h1>;
}