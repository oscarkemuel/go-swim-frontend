interface ApiParams {
  url: string;
  options?: RequestInit;
  params?: Record<string, any>;
}

interface ApiError extends Error {
  status?: number;
  data?: any;
}

export interface ApiPaginationParams {
  page?: number;
  limit?: number;
}

export interface ApiResponseWithPagination{
  items: any[];
  meta: {
    currentPage: number;
    itemCount: number;
    itemsPerPage: number;
    totalItems: number;
    totalPages: number;
  };
}

export async function api<T>({
  url,
  options,
  params,
}: ApiParams): Promise<{ data: T | null; status: number }> {
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

  if (!res.ok) {
    const error: ApiError = new Error("Failed to fetch API");
    error.status = res.status;
    

    try {
      error.data = await res.json();
    } catch {
      error.data = null;
    }

    if (res.status === 401 && error.data?.error !== "Invalid credentials") {
      await fetch("/api/auth/clear", { method: "POST" });
    }

    throw error;
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
