const cardStyles = 'rounded-xl border border-slate-700 bg-slate-900 p-4 shadow';

export default function SummaryCards({ summary }) {
  const winRate =
    summary.totalTrades > 0 ? ((summary.wins / summary.totalTrades) * 100).toFixed(1) : '0.0';

  const metrics = [
    { label: 'Total Trades', value: summary.totalTrades },
    { label: 'Win Rate', value: `${winRate}%` },
    { label: 'Net PnL', value: `$${summary.netPnl.toFixed(2)}` },
    { label: 'Average PnL', value: `$${summary.avgPnl.toFixed(2)}` }
  ];

  return (
    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
      {metrics.map((metric) => (
        <div className={cardStyles} key={metric.label}>
          <p className="text-sm text-slate-400">{metric.label}</p>
          <p className="mt-1 text-xl font-semibold text-slate-100">{metric.value}</p>
        </div>
      ))}
    </div>
  );
}
