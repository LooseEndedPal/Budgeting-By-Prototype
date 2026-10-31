import { X, CalendarDays, Tag, Wallet, Pencil, Trash2 } from 'lucide-react';
import type { Transaction } from '../types/Transaction';

export default function TransactionModal({ item, onClose, onEdit, onDelete }: {
  item: Transaction;
  onClose: () => void;
  onEdit: () => void;
  onDelete: () => void;
}) {
  return <div className="modal-backdrop" onMouseDown={onClose}>
    <section className="modal" onMouseDown={e => e.stopPropagation()}>
      <div className="modal-head"><div><span className="eyebrow">TRANSACTION DETAILS</span><h2>{item.name}</h2></div><button className="icon-button" onClick={onClose} aria-label="Close"><X/></button></div>
      <div className="modal-amount">${item.amount.toFixed(2)}</div>
      <div className="detail-grid"><div><CalendarDays/><small>Date</small><strong>{new Date(item.date+'T12:00:00').toLocaleDateString('en-CA',{month:'long',day:'numeric',year:'numeric'})}</strong></div><div><Tag/><small>Category</small><strong>{item.category}</strong></div><div><Wallet/><small>Payment</small><strong>Student spending</strong></div></div>
      <div className="notes"><small>NOTES</small><p>{item.details || 'No additional details provided.'}</p></div>
      <div className="form-actions modal-actions">
        <button className="secondary-button" onClick={onEdit}><Pencil size={15}/> Edit</button>
        <button className="secondary-button delete-button" onClick={onDelete}><Trash2 size={15}/> Delete</button>
        <button className="primary-button" onClick={onClose}>Done</button>
      </div>
    </section>
  </div>;
}
