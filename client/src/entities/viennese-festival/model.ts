import { StrapiImage } from "@/shared";

export type VienneseFestivalResponse = {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  banner: StrapiImage;
  image_about: StrapiImage | null;
  galleries: {
    id: number;
    title: string;
    images: StrapiImage[]
  }[]
}