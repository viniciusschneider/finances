import { Unsubscribe } from 'firebase/firestore';
import { IFinanceItem } from './finance-item.interface';

export interface IFinancesState {
  items: IFinanceItem[];
  loading: boolean;
  unsubscribe: Unsubscribe | null;
}
