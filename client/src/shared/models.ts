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
  meta: Meta;
}

export type StrapiImage = {
  data: {
    id: number;
    attributes: {
      name: string;
      url: string;
      width?: number;
      height: number;
    }
  }
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