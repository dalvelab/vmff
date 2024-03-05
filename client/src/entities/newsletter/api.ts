import type { ApiResponse } from "@/shared";

import type { SubscribeToNewsletterResponse } from './model';

export async function subscribeToNewsletter(email: string): Promise<ApiResponse<SubscribeToNewsletterResponse, null>> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_HOST}/newsletters`, {
    method: 'POST',
    cache: "no-cache", 
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      data: {email}
    })
  });

  return res.json()
}