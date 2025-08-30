interface apiParams {
  url: string,
  options?: RequestInit
}

export async function api<T>({ url, options }: apiParams): Promise<T> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}${url}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...(options?.headers || {})
    },
    cache: 'no-store'
  })

  if (!res.ok) {
    throw new Error('Failed to fetch API')
  }

  return res.json()
}