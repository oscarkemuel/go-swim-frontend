import Skeleton from "react-loading-skeleton";

export default function Loading() {
  return (
    <div className="flex items-start gap-4">
      <Skeleton height={168} width={288} />
      <Skeleton height={168} width={288} />
      <Skeleton height={168} width={288} />
    </div>
  );
}
