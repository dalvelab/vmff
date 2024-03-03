import type { StrapiEntityWrapper } from '@/shared';

export type Event = StrapiEntityWrapper<{
  title: string;
  age_limit: number;
  small_description: string;
  description: string;
  slug: string;
  location: {
    data: Location;
  } | null
}>

export type Afisha = StrapiEntityWrapper<{
  title: string;
  tickets: any;
  event: {
    data: Event;
  } | null
}>

export type Location = StrapiEntityWrapper<{
  name: string;
  link: string;
}>