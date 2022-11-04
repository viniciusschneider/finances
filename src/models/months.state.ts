import { Unsubscribe } from 'firebase/firestore';
import { IMonthItem } from './month-item.interface';

export interface IMonthsState {
  items: IMonthItem[];
  loading: boolean;
  unsubscribe: Unsubscribe | null;
}
