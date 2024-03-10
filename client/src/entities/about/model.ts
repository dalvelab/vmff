import { StrapiImage } from "@/shared";

export type AboutSectionResponse = {
  id: number;
  title: string;
  description: string;
  images: StrapiImage[];
}