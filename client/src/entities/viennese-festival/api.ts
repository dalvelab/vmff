import type { ApiResponse } from '@/shared';

import type { VienneseFestivalResponse } from './model';

export async function getVienneseFestival(): Promise<ApiResponse<VienneseFestivalResponse, null>> {
  const res = await fetch(`${process.env.DB_HOST}/viennese-festival`);

  return res.json()
}