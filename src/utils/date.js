const dateUtils = {
  MASK: 'DD/MM/YYYY',
  LOCALE:
        {
          days: [
            'Domingo',
            'Segunda',
            'Terça',
            'Quarta',
            'Quinta',
            'Sexta',
            'Sábado',
          ],
          daysShort: [
            'Dom',
            'Seg',
            'Ter',
            'Qua',
            'Qui',
            'Sex',
            'Sab',
          ],
          months: [
            'Janeiro',
            'Fevereiro',
            'Março',
            'Abril',
            'Maio',
            'Junho',
            'Julho',
            'Agosto',
            'Setembro',
            'Outubro',
            'Novembro',
            'Dezembro',
          ],
          monthsShort: [
            'Jan',
            'Fev',
            'Mar',
            'Abr',
            'Mai',
            'Jun',
            'Jul',
            'Ago',
            'Set',
            'Out',
            'Nov',
            'Dez',
          ],
          firstDayOfWeek: 0,
        },
  toString: (value) => {
    if (value) {
      const date = new Date();
      const fields = [...value.split('/')];
      date.setDate(fields[0]);
      date.setMonth(fields[1] - 1);
      date.setYear(fields[2]);
      date.setHours(0);
      date.setMinutes(0);
      date.setSeconds(0);
      date.setMilliseconds(0);
      return date.toISOString();
    }
    return null;
  },
};

export default dateUtils;
