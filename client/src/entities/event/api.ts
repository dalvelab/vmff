import qs from 'qs';

import type { ApiResponse, Meta } from '@/shared'

import type { Afisha, Slider } from './model';

interface DefaultParams {
  limit?: number;
}

export async function getAfisha(params: DefaultParams): Promise<ApiResponse<Afisha[], Meta>> {
  const query = qs.stringify(
    {
      pagination: {
        limit: params.limit || 100,
      }
    }
  )

  const res = await fetch(`${process.env.DB_HOST}/afishas?${query}`);

  return res.json()
}

interface GetSingleAfisha {
  id?: string;
}

export async function getSingleAfisha(params: GetSingleAfisha): Promise<ApiResponse<Afisha, null>> {
  const res = await fetch(`${process.env.DB_HOST}/afishas/${params.id}`);

  return res.json()
}

export async function getSlider(): Promise<ApiResponse<Slider, null>> {
  const res = await fetch(`${process.env.DB_HOST}/slider`);

  return res.json()
}