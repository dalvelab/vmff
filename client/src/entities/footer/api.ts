import qs from 'qs';

import type { ApiResponse } from '@/shared'

import type { FooterResponse } from './model';

export async function getFooter(): Promise<ApiResponse<FooterResponse, null>> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_HOST}/footer`);

  return res.json()
}