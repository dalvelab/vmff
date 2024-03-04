import type { StrapiImage, Location } from '@/shared';

export type Event = {
  id: number;
  title: string;
  age_limit: number;
  small_description: string;
  description: string;
  slug: string;
  image: StrapiImage;
}

export type Afisha = {
  title: string;
  tickets: Ticket;
  event: Event | null;
  location: Location | null
}

export type Slider = {
  slides: {
    id: number;
    title: string;
    location: Afisha["location"];
    tickets: Afisha["tickets"];
    event: Event
  }[];
}

export type Ticket = {
  id: number;
  date: Date;
  title: string;
  link: string;
}