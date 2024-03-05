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

  return data.filter((event) => getformatDateLocale(event.tickets.date).split(',').toString().substring(3, 5) === filter.month);
}