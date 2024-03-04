import type { Location } from '@/shared';

export type Footer = {
  phone: string;
  email: string;
  locations: Location[];
  socials: {
    id: number;
    type: 'vk' | 'telegram';
    link: string;
  }
}