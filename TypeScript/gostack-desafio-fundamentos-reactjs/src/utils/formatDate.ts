const formatValue = (value: Date): string =>
  Intl.DateTimeFormat('pt-BR').format(value);

export default formatValue;
