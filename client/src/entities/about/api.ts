import type { ApiResponse } from "@/shared";

import type { AboutSectionResponse } from "./model";

export async function getAbout(): Promise<ApiResponse<AboutSectionResponse, null>> {
  const res = await fetch(`${process.env.DB_HOST}/about`);

  return res.json()
}