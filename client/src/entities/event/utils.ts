import type { Afisha } from "./model";

import { getformatDateLocale } from "@/shared";

export const getFilteredAfisha = (data: Afisha[], filter: string) => {
  if (filter === 'all') {
    return data;
  }

  return data.filter((event) => getformatDateLocale(event.tickets.date).split(',').toString().substring(3, 5) === filter);
}