import qs from 'qs';

import type { ApiResponse } from '@/shared'

import type { Footer } from './model';

export async function getFooter(): Promise<ApiResponse<Footer, null>> {
  const res = await fetch(`${process.env.DB_HOST}/footer`);

  return res.json()
}