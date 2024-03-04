import type { Location } from '@/shared';

export type FooterResponse = {
  phone: string;
  email: string;
  locations: Location[] | null;
  socials: {
    id: number;
    type: 'vk' | 'telegram';
    link: string;
  }[]
}