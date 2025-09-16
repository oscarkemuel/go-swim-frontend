import Skeleton from "react-loading-skeleton";

export default function Loading() {
  return (
    <div className="flex items-start gap-4 flex-wrap">
      <Skeleton height={168} width="100%" />
      <Skeleton height={168} width="100%" />
      <Skeleton height={168} width="100%" />
    </div>
  );
}
