import { useState } from 'react';

const defaultState = {
  tradeDate: '',
  symbol: '',
  direction: 'LONG',
  entryPrice: '',
  exitPrice: '',
  positionSize: '',
  pnl: '',
  setup: '',
  emotions: '',
  notes: '',
  tags: ''
};

const inputStyles =
  'w-full rounded-md border border-slate-700 bg-slate-950 px-3 py-2 text-slate-100 placeholder:text-slate-500 focus:border-blue-400 focus:outline-none';

export default function TradeForm({ onSubmit, isSaving }) {
  const [form, setForm] = useState(defaultState);

  const updateField = (event) => {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
  };

  const submit = (event) => {
    event.preventDefault();
    onSubmit({
      ...form,
      entryPrice: Number(form.entryPrice),
      exitPrice: Number(form.exitPrice),
      positionSize: Number(form.positionSize),
      pnl: Number(form.pnl)
    });
    setForm(defaultState);
  };

  return (
    <form className="space-y-3 rounded-xl border border-slate-700 bg-slate-900 p-5" onSubmit={submit}>
      <h2 className="text-lg font-semibold">Log a Trade</h2>
      <div className="grid gap-3 md:grid-cols-2">
        <label className="text-sm">
          Date
          <input className={inputStyles} name="tradeDate" onChange={updateField} required type="date" value={form.tradeDate} />
        </label>
        <label className="text-sm">
          Symbol
          <input className={inputStyles} name="symbol" onChange={updateField} placeholder="EURUSD" required value={form.symbol} />
        </label>
        <label className="text-sm">
          Direction
          <select className={inputStyles} name="direction" onChange={updateField} value={form.direction}>
            <option value="LONG">Long</option>
            <option value="SHORT">Short</option>
          </select>
        </label>
        <label className="text-sm">
          Setup
          <input className={inputStyles} name="setup" onChange={updateField} placeholder="Breakout" required value={form.setup} />
        </label>
        <label className="text-sm">
          Entry Price
          <input className={inputStyles} min="0" name="entryPrice" onChange={updateField} required step="any" type="number" value={form.entryPrice} />
        </label>
        <label className="text-sm">
          Exit Price
          <input className={inputStyles} min="0" name="exitPrice" onChange={updateField} required step="any" type="number" value={form.exitPrice} />
        </label>
        <label className="text-sm">
          Position Size
          <input className={inputStyles} min="0" name="positionSize" onChange={updateField} required step="any" type="number" value={form.positionSize} />
        </label>
        <label className="text-sm">
          Profit / Loss
          <input className={inputStyles} name="pnl" onChange={updateField} required step="any" type="number" value={form.pnl} />
        </label>
      </div>
      <label className="block text-sm">
        Tags (comma separated)
        <input className={inputStyles} name="tags" onChange={updateField} placeholder="NY session, revenge trade" value={form.tags} />
      </label>
      <label className="block text-sm">
        Emotions
        <input className={inputStyles} name="emotions" onChange={updateField} placeholder="Confident, patient" value={form.emotions} />
      </label>
      <label className="block text-sm">
        Notes
        <textarea className={inputStyles} name="notes" onChange={updateField} placeholder="Why this trade worked or failed" rows="3" value={form.notes} />
      </label>
      <button
        className="rounded-md bg-blue-500 px-4 py-2 font-medium text-white transition hover:bg-blue-400 disabled:cursor-not-allowed disabled:bg-blue-900"
        disabled={isSaving}
        type="submit"
      >
        {isSaving ? 'Saving...' : 'Save Trade'}
      </button>
    </form>
  );
}
