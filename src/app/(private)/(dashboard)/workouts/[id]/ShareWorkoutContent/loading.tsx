import Skeleton from "react-loading-skeleton";

export default function Loading() {
  return (
    <div>
      <Skeleton width="100%" height={40} count={3} />
      <Skeleton width="100%" height={330} />
    </div>
  )
}
