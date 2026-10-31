import { useEffect, useState } from 'react';
import { Bell, ChevronDown, Sparkles } from 'lucide-react';
import Sidebar, { type Page } from './components/Sidebar';
import TransactionModal from './components/TransactionModal';
import TransactionForm from './components/TransactionForm';
import Transactions from './pages/Transactions';
import Reports from './pages/Reports';
import type { Transaction } from './types/Transaction';
import './styles.css';

export default function App() {
  const [page, setPage] = useState<Page>('transactions');
  const [items, setItems] = useState<Transaction[]>([]);
  const [selected, setSelected] = useState<Transaction | null>(null);
  const [editing, setEditing] = useState<Transaction | null>(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    fetch('/transactions.json')
      .then(r => r.json())
      .then((data: Transaction[]) => setItems(data))
      .catch(() => setItems([]))
      .finally(() => setLoaded(true));
  }, []);

  function add(t: Transaction) {
    setItems(prev => [t, ...prev]);
    setPage('transactions');
  }

  function update(t: Transaction) {
    setItems(prev => prev.map(item => item.id === t.id ? t : item));
    setEditing(null);
    setSelected(null);
    setPage('transactions');
  }

  function remove(t: Transaction) {
    if (!window.confirm(`Delete "${t.name}"? This action cannot be undone.`)) return;
    setItems(prev => prev.filter(item => item.id !== t.id));
    setSelected(null);
  }

  function startEditing(t: Transaction) {
    setEditing(t);
    setSelected(null);
    setPage('edit');
  }

  return <div className="app-shell">
    <Sidebar page={page === 'edit' ? 'add' : page} onNavigate={p => { setEditing(null); setPage(p); }} />
    <main className="main-area">
      <header className="topbar">
        <div className="breadcrumb">Workspace <span>/</span> <strong>{page === 'transactions' ? 'Transactions' : page === 'add' ? 'Add transaction' : page === 'edit' ? 'Edit transaction' : 'Spending report'}</strong></div>
        <div className="topbar-right"><span className="semester"><Sparkles size={14}/> Fall semester</span><button className="bell-button" aria-label="Notifications"><Bell size={18}/><i/></button><div className="top-user"><div className="avatar small-avatar">JS</div><ChevronDown size={15}/></div></div>
      </header>
      <div className="content">
        {!loaded ? <div className="loading">Loading your transactions...</div>
          : page === 'transactions' ? <Transactions items={items} onSelect={setSelected} onAdd={() => { setEditing(null); setPage('add'); }} />
          : page === 'add' ? <><div className="page-heading"><div><span className="eyebrow">STAY ON TOP OF YOUR BUDGET</span><h1>Add transaction</h1><p>Enter the details of a purchase you've made.</p></div></div><TransactionForm onAdd={add}/></>
          : page === 'edit' && editing ? <><div className="page-heading"><div><span className="eyebrow">UPDATE YOUR RECORD</span><h1>Edit transaction</h1><p>Change the details of this purchase.</p></div></div><TransactionForm initial={editing} submitLabel="Save changes" onAdd={update}/></>
          : <Reports/>}
      </div>
      <footer className="footer">Made for student life <span>·</span> Budgeting By prototype</footer>
    </main>
    {selected && <TransactionModal item={selected} onClose={() => setSelected(null)} onEdit={() => startEditing(selected)} onDelete={() => remove(selected)}/>}
  </div>;
}
