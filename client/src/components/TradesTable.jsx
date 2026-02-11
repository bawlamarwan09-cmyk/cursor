export default function TradesTable({ trades, onDelete }) {
  if (!trades.length) {
    return (
      <div className="rounded-xl border border-dashed border-slate-700 bg-slate-900 p-6 text-center text-slate-400">
        No trades logged yet. Add your first trade above.
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-xl border border-slate-700">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-slate-700 bg-slate-900 text-sm">
          <thead className="bg-slate-800 text-left text-slate-300">
            <tr>
              <th className="px-3 py-2">Date</th>
              <th className="px-3 py-2">Symbol</th>
              <th className="px-3 py-2">Direction</th>
              <th className="px-3 py-2">Setup</th>
              <th className="px-3 py-2">PnL</th>
              <th className="px-3 py-2">Notes</th>
              <th className="px-3 py-2">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800">
            {trades.map((trade) => (
              <tr key={trade._id}>
                <td className="px-3 py-2">{new Date(trade.tradeDate).toLocaleDateString()}</td>
                <td className="px-3 py-2 font-semibold">{trade.symbol}</td>
                <td className="px-3 py-2">{trade.direction}</td>
                <td className="px-3 py-2">{trade.setup}</td>
                <td className={`px-3 py-2 font-semibold ${trade.pnl >= 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
                  ${trade.pnl.toFixed(2)}
                </td>
                <td className="max-w-xs truncate px-3 py-2 text-slate-400">{trade.notes}</td>
                <td className="px-3 py-2">
                  <button
                    className="rounded bg-rose-500 px-2 py-1 text-xs font-medium text-white hover:bg-rose-400"
                    onClick={() => onDelete(trade._id)}
                    type="button"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
