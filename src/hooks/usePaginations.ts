import { useQueryState, parseAsInteger, createParser } from "nuqs";

const DEFAULT_LIMIT = 10;
const MAX_LIMIT = 100;

const pageSizeParser = createParser<number>({
  parse(queryValue) {
    const parsed = Number(queryValue);

    if (isNaN(parsed) || parsed < 1) {
      return DEFAULT_LIMIT;
    }

    if (parsed > MAX_LIMIT) {
      return MAX_LIMIT;
    }

    return parsed;
  },
  serialize(value) {
    return String(value);
  },
});

export function usePagination() {
  const [page, setPage] = useQueryState("page", parseAsInteger.withDefault(1));
  const [limit, setLimit] = useQueryState(
    "limit",
    pageSizeParser.withDefault(DEFAULT_LIMIT)
  );

  return { page, setPage, limit, setLimit };
}
