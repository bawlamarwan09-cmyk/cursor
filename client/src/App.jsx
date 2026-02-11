import { useCallback, useEffect, useState } from 'react';
import axios from 'axios';
import SummaryCards from './components/SummaryCards';
import TradeForm from './components/TradeForm';
import TradesTable from './components/TradesTable';

const api = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/api`
});

const emptySummary = {
  totalTrades: 0,
  wins: 0,
  losses: 0,
  netPnl: 0,
  avgPnl: 0
};

export default function App() {
  const [trades, setTrades] = useState([]);
  const [summary, setSummary] = useState(emptySummary);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState('');

  const loadData = useCallback(async () => {
    try {
      const [tradesResponse, summaryResponse] = await Promise.all([
        api.get('/trades'),
        api.get('/summary')
      ]);
      setTrades(tradesResponse.data);
      setSummary({ ...emptySummary, ...summaryResponse.data });
      setError('');
    } catch {
      setError('Could not connect to API. Make sure Express + MongoDB are running.');
    }
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const saveTrade = async (trade) => {
    setIsSaving(true);
    try {
      await api.post('/trades', trade);
      await loadData();
    } catch {
      setError('Unable to save trade. Please check your form values.');
    } finally {
      setIsSaving(false);
    }
  };

  const removeTrade = async (id) => {
    try {
      await api.delete(`/trades/${id}`);
      await loadData();
    } catch {
      setError('Unable to delete trade right now.');
    }
  };

  return (
    <main className="mx-auto min-h-screen max-w-6xl px-4 py-8 text-slate-100">
      <header className="mb-8 space-y-2">
        <p className="text-sm uppercase tracking-widest text-blue-300">Trading Journal</p>
        <h1 className="text-3xl font-bold">Track your performance and psychology</h1>
        <p className="text-slate-400">
          Log every trade, review your setups, and identify emotional patterns that impact your results.
        </p>
      </header>

      {error ? <p className="mb-4 rounded border border-rose-700 bg-rose-950 px-4 py-2 text-rose-200">{error}</p> : null}

      <section className="space-y-6">
        <SummaryCards summary={summary} />
        <TradeForm isSaving={isSaving} onSubmit={saveTrade} />
        <TradesTable onDelete={removeTrade} trades={trades} />
      </section>
    </main>
  );
}
