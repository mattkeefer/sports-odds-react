export default function MarketEntryTitle({marketEntry}: { marketEntry: any }) {
  return (
      <div className="row">
        <div className="col-3">{marketEntry.marketName}</div>
        <div className="col-2">{marketEntry.sideID.charAt(0).toUpperCase() + marketEntry.sideID.slice(1)}</div>
        <div className="col">
          Fair: {marketEntry.fairOdds > 0 && '+'}{marketEntry.fairOdds}
          {marketEntry.fairOverUnder && `, o/u: ${marketEntry.fairOverUnder}`}
        </div>
        <div className="col">
          Avg: {marketEntry.bookOdds > 0 && '+'}{marketEntry.bookOdds}
          {marketEntry.bookOverUnder && `, o/u: ${marketEntry.bookOverUnder}`}
        </div>
      </div>
  );
}