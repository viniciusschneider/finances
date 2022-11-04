import { format } from 'date-fns';

export const date = (_date: Date, dateFormat = 'dd/MM/yyyy'): string => {
  if (!_date) return '';

  if (!dateFormat) return _date.toString();

  return format(_date, dateFormat);
};

export const currency = (
  value: number | string,
  showCurrency = true
): string => {
  const config: Intl.NumberFormatOptions = {
    maximumFractionDigits: 2,
    minimumFractionDigits: 2
  };

  if (showCurrency) {
    config.currency = 'BRL';
    config.style = 'currency';
  }

  return value.toLocaleString('pt-br', config);
};
