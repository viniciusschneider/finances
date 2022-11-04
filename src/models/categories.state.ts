import { Unsubscribe } from 'firebase/firestore';
import { ICategoryItem } from './category-item.interface';

export interface ICategoriesState {
  items: ICategoryItem[];
  loading: boolean;
  unsubscribe: Unsubscribe | null;
}
