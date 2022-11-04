import { ICategoryItem } from './category-item.interface';
import { IMonthItem } from './month-item.interface';

export interface IFinanceItem {
  category: ICategoryItem;
  description: string;
  id: string;
  month: IMonthItem;
  value: number;
}
