export const rusMonths = [
  'январь',
  'февраль',
  'март',
  'апрель',
  'май',
  'июнь',
  'июль',
  'август',
  'сентябрь',
  'октябрь',
  'ноябрь',
  'декабрь'
]

export const genetiveRusMonths = [
  'января',
  'февраля',
  'марта',
  'апреля',
  'мая',
  'июня',
  'июля',
  'августа',
  'сентября',
  'октября',
  'ноября',
  'декабря'
]

export const shortRusDayNames = [
  'вс',
  'пн',
  'вт',
  'ср',
  'чт',
  'пт',
  'сб',
];

export function getGenetiveRusMonth(month: number) {
  return genetiveRusMonths[month - 1];
}

export function getformatDateLocale(date: Date, timeZone: string = 'Asia/Yekaterinburg' ) {
  return new Date(date).toLocaleString('ru-RU', { timeZone }).split(',')[0];
}

export function getformatDateLocaleTime(date: Date, timeZone: string = 'Asia/Yekaterinburg' ) {
  return new Date(date).toLocaleString('ru-RU', { timeZone }).split(',')[1].trim().substring(0, 5)
}