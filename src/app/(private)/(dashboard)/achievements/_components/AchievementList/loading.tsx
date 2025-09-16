import Skeleton from "react-loading-skeleton";

export default function Loading() {
  return (
    <div className="flex flex-col gap-4">
      <Skeleton height={82} />
      <Skeleton height={82} />
      <Skeleton height={82} />
      <Skeleton height={82} />
      <Skeleton height={82} />
      <Skeleton height={82} />
      <Skeleton height={82} />
      <Skeleton height={82} />
    </div>
  )
}