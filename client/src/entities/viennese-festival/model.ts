import { StrapiImage } from "@/shared";

export type VienneseFestivalResponse = {
  id: number;
  title: string;
  description: string;
  banner: StrapiImage;
  galleries: {
    id: number;
    title: string;
    images: StrapiImage[]
  }[]
}