import Skeleton from "react-loading-skeleton";

export default function Loading() {
  return (
    <div className="flex flex-col">
      <div className="max-sm:block hidden">
        <Skeleton height={86} className="mb-4" />
        <Skeleton height={86} className="mb-4" />
        <Skeleton height={86} className="mb-4" />
        <Skeleton height={86} className="mb-4" />
        <Skeleton height={86} className="mb-4" />
        <Skeleton height={86} className="mb-4" />
        <Skeleton height={86} className="mb-4" />
        <Skeleton height={86} className="mb-4" />
        <Skeleton height={86} className="mb-4" />
        <Skeleton height={86} className="mb-4" />
        <Skeleton height={86} className="mb-4" />
      </div>

      <div className="max-sm:hidden block">
        <Skeleton height={57} className="mb-0.5" />
        <Skeleton height={67} className="mb-0.5" />
        <Skeleton height={67} className="mb-0.5" />
        <Skeleton height={67} className="mb-0.5" />
        <Skeleton height={67} className="mb-0.5" />
        <Skeleton height={67} className="mb-0.5" />
        <Skeleton height={67} className="mb-0.5" />
        <Skeleton height={67} className="mb-0.5" />
        <Skeleton height={67} className="mb-0.5" />
        <Skeleton height={67} className="mb-0.5" />
        <Skeleton height={67} className="mb-0.5" />
      </div>
    </div>
  );
}
