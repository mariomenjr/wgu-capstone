export default function DecorativeLegend({ currentCurrency }) {
  return <h4 className={`py-3`}>
    <span>It's better to buy </span>
    <span className={`italic font-semibold underline`}>
      {currentCurrency.label}
    </span>
    <span> on a...</span>
  </h4>;
}