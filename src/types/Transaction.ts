export type Category = 'Food' | 'Transport' | 'Books' | 'Entertainment' | 'Shopping' | 'Other';
export interface Transaction {
  id: number;
  name: string;
  date: string;
  category: Category;
  amount: number;
  details: string;
}
