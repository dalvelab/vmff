import type { Afisha } from "./model";

import { getformatDateLocale } from "@/shared";

export type Filter = {
  month: string;
  location: string;
}

export const getFilteredAfisha = (data: Afisha[], filter: Filter) => {
  if (filter.month === 'all' && filter.location === 'all') {
    return data;
  }

  if (filter.month === 'all' && filter.location !== 'all') {
    return data.filter((event) => event.location?.name === filter.location);
  }

  if (filter.month !== 'all' && filter.location === 'all') {
    return data.filter((event) => getformatDateLocale(event.tickets.date).split(',').toString().substring(3, 5) === filter.month);
  }

  return data.filter((event) => {
    const isDateEqual = getformatDateLocale(event.tickets.date).split(',').toString().substring(3, 5) === filter.month;
    const isLocationEqual = event.location?.name === filter.location;

    return isDateEqual && isLocationEqual;
  });
}