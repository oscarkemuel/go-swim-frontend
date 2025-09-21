interface apiParams {
  url: string;
  options?: RequestInit;
  params?: Record<string, any>;
}

export async function api<T>({
  url,
  options,
  params,
}: apiParams): Promise<{ data: T | null; status: number }> {
  const res = await fetch(
    `/api${url}${params ? `?${new URLSearchParams(params)}` : ""}`,
    {
      ...options,
      headers: {
        "Content-Type": "application/json",
        ...(options?.headers || {}),
      },
      credentials: "include",
      cache: "no-store",
    }
  );

  if (res.status === 401) {
    await fetch("/api/auth/clear", { method: "POST", credentials: "include" });
    return { data: null, status: 401 };
  }

  if (!res.ok) {
    throw new Error("Failed to fetch API");
  }

  let data: T | null = null;
  if (res.status !== 204) {
    const text = await res.text();
    if (text) {
      data = JSON.parse(text) as T;
    }
  }

  return { data, status: res.status };
}
