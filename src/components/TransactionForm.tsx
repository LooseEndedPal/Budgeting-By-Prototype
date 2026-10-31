import { useState } from 'react';
import type { Category, Transaction } from '../types/Transaction';

const categories: Category[] = ['Food', 'Transport', 'Books', 'Entertainment', 'Shopping', 'Other'];

export default function TransactionForm({ onAdd, initial, submitLabel = 'Save transaction' }: {
  onAdd: (t: Transaction) => void;
  initial?: Transaction;
  submitLabel?: string;
}) {
  const [name, setName] = useState(initial?.name ?? '');
  const [date, setDate] = useState(initial?.date ?? new Date().toISOString().slice(0, 10));
  const [category, setCategory] = useState<Category>(initial?.category ?? 'Food');
  const [amount, setAmount] = useState(initial ? String(initial.amount) : '');
  const [details, setDetails] = useState(initial?.details ?? '');
  const [saved, setSaved] = useState(false);

  function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim() || !amount || Number(amount) <= 0) return;
    onAdd({ id: initial?.id ?? Date.now(), name: name.trim(), date, category, amount: Number(amount), details });
    if (!initial) { setName(''); setAmount(''); setDetails(''); }
    setSaved(true);
  }

  return <div className="form-layout">
    <div className="form-intro"><span className="eyebrow">{initial ? 'UPDATE EXPENSE' : 'NEW EXPENSE'}</span><h2>{initial ? 'Edit transaction details' : 'Record a transaction'}</h2><p>{initial ? 'Update the information below and save your changes.' : 'Keep track of where your money goes. Add the details below to update your transaction history.'}</p><div className="tip-card"><strong>A little tip</strong><p>Recording small purchases regularly makes your monthly spending report more useful.</p></div></div>
    <form className="transaction-form" onSubmit={submit}>
      <label>Transaction name<input required value={name} onChange={e => setName(e.target.value)} placeholder="e.g. Lunch at campus cafe"/></label>
      <div className="form-row"><label>Date<input required type="date" value={date} onChange={e => setDate(e.target.value)}/></label><label>Category<select value={category} onChange={e => setCategory(e.target.value as Category)}>{categories.map(c => <option key={c}>{c}</option>)}</select></label></div>
      <label>Cost (CAD)<div className="money-input"><span>$</span><input required type="number" min="0.01" step="0.01" value={amount} onChange={e => setAmount(e.target.value)} placeholder="0.00"/></div></label>
      <label>Additional details <span className="optional">OPTIONAL</span><textarea rows={4} value={details} onChange={e => setDetails(e.target.value)} placeholder="Add a note about this purchase..."/></label>
      <div className="form-actions"><button type="button" className="secondary-button" onClick={() => { if (initial) { setName(initial.name); setDate(initial.date); setCategory(initial.category); setAmount(String(initial.amount)); setDetails(initial.details); } else { setName(''); setAmount(''); setDetails(''); } }}>Reset</button><button className="primary-button" type="submit">{submitLabel} <span>→</span></button></div>
      {saved && <p className="success-message">✓ {initial ? 'Transaction updated.' : 'Transaction added to your list.'}</p>}
    </form>
  </div>;
}
