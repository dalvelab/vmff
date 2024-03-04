export type Meta = {
  pagination: {
    page: number;
    pageSize: number;
    pageCount: number;
    total: number;
  }
}

export type StrapiEntityWrapper<Data> = {
  id: number;
  attributes: Data
}

export type ApiResponse<Data, Meta> = {
  data: Data;
  meta: Meta | null;
}

export type StrapiImage = {
  id: number;
  name: string;
  url: string;
  caption: string | null,
  width: number;
  height: number;
  formats: {
    thumbnail: StrapiImageFormat;
    small: StrapiImageFormat;
    medium: StrapiImageFormat;
    large: StrapiImageFormat;
  }
}

export type StrapiImageFormat = {
  name: string;
  hash: string;
  ext: string;
  mime: string;
  path: string | null;
  width: number;
  height: number;
  size: number;
  url: string;
}

export type StrapiFile = {
  id: number;
  attributes: {
    name: string;
    url: string;
    size: number;
    mime: string;
  }
}

export type Location = {
  id: number;
  name: string;
  link: string;
  address: string;
}