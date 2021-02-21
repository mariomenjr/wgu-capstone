export default function Main() {
  const currentCurrency = `Bitcoin`;
  const predictedDay = `Wednesday`;
  return (
    <div className={`flex flex-col px-16`}>
      <h4 className={`py-3`}>
        <span>It's better to buy </span>
        <span className={`italic font-semibold underline`}>
          {currentCurrency}
        </span>
        <span> on a...</span>
      </h4>
      <h1
        className={`font-sans font-semibold text-4xl sm:text-8xl tracking-wide text-blue-500 text-center py-3`}
      >
        {predictedDay}
      </h1>
      <div className={`container w-full py-3`}>
        <div className={`grid grid-cols-1 sm:grid-cols-3  gap-2`}>
          <select
            className={`block px-3 py-2 rounded leading-tight focus:outline-none sm:text-sm md:text-md`}
          >
            <option value="btc">Bitcoin</option>
            <option value="eth">Etherum</option>
            <option value="dgc">Dogecoin</option>
          </select>
          <input
            type="text"
            className={`block px-3 py-2 rounded leading-tight focus:outline-none sm:text-sm md:text-md`}
          />
          <input
            type="text"
            className={`block px-3 py-2 rounded leading-tight focus:outline-none sm:text-sm md:text-md`}
          />
        </div>
      </div>
    </div>
  );
}
