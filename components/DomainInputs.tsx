import React from "react";

import { PriceCollection } from "../model/config/config";
import { debounce } from "../model/utils/typing";

import modelscrape from "modelscrape";
import coinMarketScrapper from "../scrapers/coinmarketcap.json";

export default function DomainInputs({ query }) {
  const [increase, increaseSet] = React.useState(query.increase ?? 0);

  const debounceSubmit = React.useCallback(debounce(e => e.target.form.submit()), []);

  const increaseTheme = React.useMemo(() => {
    return increase > 0
      ? `bg-green-100 text-green-600`
      : increase < 0
      ? `bg-red-100 text-red-600`
      : `bg-yellow-100 text-yellow-600`;
  }, [increase]);

  const marketCap = React.useEffect(() => {
    (async function () {
      try {
        const w = await modelscrape(coinMarketScrapper);
        console.log({ w });
      } catch (error) {}
    })();
  }, [query.currency]);
  
  return <div className={`container w-full py-6`}>
    <form className={`grid grid-cols-1 sm:grid-cols-4 gap-2`} method="GET">
      <select
        name="currency"
        className={`h-full py-1 pr-3 border-transparent bg-transparent sm:text-md rounded-md font-semibold`}        
        defaultValue={query.currency ?? 0}
        onChange={debounceSubmit}
      >
        {PriceCollection.map((price, key) => <option key={key} value={price.category}>{price.label}</option>)}
      </select>
      <div></div>
      <div className={`grid grid-cols-2 col-span-2 gap-2`}>
        <input
          name="volume"
          type="number"
          className={`h-full py-1 border-transparent sm:text-md rounded-md font-semibold text-center sm:text-right bg-gray-100 text-gray-600`}
          defaultValue={query.volume ?? 0}
          onChange={debounceSubmit}
        />
        <input
          name="increase"
          type="number"
          className={`h-full py-1 border-transparent sm:text-md rounded-md font-semibold text-center sm:text-right ${increaseTheme}`}
          value={increase}
          onChange={e => {
            increaseSet(+e.target.value);
            debounceSubmit(e);
          }}          
        />
        <button type="submit" hidden />
      </div>
    </form>
  </div>;
}