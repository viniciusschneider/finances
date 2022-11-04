import { ICategoriesState } from './categories.state';
import { IFinancesState } from './finances.state';
import { IMonthsState } from './months.state';
import { IUiState } from './ui.state';
import { IUserState } from './user.state';

export interface IState {
  categories: ICategoriesState;
  finances: IFinancesState;
  months: IMonthsState;
  ui: IUiState;
  user: IUserState;
}
